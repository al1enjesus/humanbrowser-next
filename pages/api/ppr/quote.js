/**
 * POST /api/ppr/quote
 * Pay-per-Request API v1 — generate a payment quote
 *
 * Body: { requests: number, currency?: 'USDT' | 'ETH' | 'BTC' | 'SOL' }
 * Returns: { order_id, price_usd, price_crypto, wallet, currency, requests, valid_hours, expires_at }
 */

const PRICING = {
  100:    { usd: 0.50,  label: '~$0.005/req', valid_hours: 2 },
  500:    { usd: 2.00,  label: '~$0.004/req', valid_hours: 12 },
  1000:   { usd: 3.00,  label: '$0.003/req',  valid_hours: 24 },
  5000:   { usd: 10.00, label: '$0.002/req',  valid_hours: 72 },
  10000:  { usd: 15.00, label: '$0.0015/req', valid_hours: 168 },
  50000:  { usd: 50.00, label: '$0.001/req',  valid_hours: 720 },
};

// Approximate crypto conversion (update via live API in production)
const CRYPTO_RATES = { USDT: 1, ETH: 0.00031, BTC: 0.0000115, SOL: 0.0095 };

function genOrderId() {
  return 'ppr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { requests = 1000, currency = 'USDTTRC' } = req.body || {};
  const reqCount = parseInt(requests, 10);

  // Find nearest tier or calculate custom price
  let tier = PRICING[reqCount];
  if (!tier) {
    // Custom pricing: $0.003/req for any amount
    const usd = Math.round(reqCount * 0.003 * 100) / 100;
    tier = { usd, label: '$0.003/req', valid_hours: Math.max(2, Math.floor(reqCount / 1000) * 24) };
  }

  const orderId = genOrderId();
  const rate = CRYPTO_RATES[currency] || 1;
  const cryptoAmount = (tier.usd * rate).toFixed(currency === 'BTC' ? 8 : 4);

  // Map PPR currency to 0xProcessing format
  const OX_CURRENCY_MAP = {
    USDTTRC: 'USDT (TRC20)',
    USDT:    'USDT (TRC20)',
    ETH:     'ETH',
    BTC:     'BTC',
    SOL:     'SOL',
  };
  const oxCurrency = OX_CURRENCY_MAP[currency] || 'USDT (TRC20)';
  const merchantId = process.env.OX_MERCHANT_ID;
  const apiKey     = process.env.OX_API_KEY;

  // Create 0xProcessing invoice via form POST
  let walletAddress = null;
  let invoiceUrl = null;

  if (merchantId) {
    try {
      const params = new URLSearchParams({
        AmountUSD:  tier.usd.toString(),
        Amount:     tier.usd.toString(),
        Currency:   oxCurrency,
        Email:      'ppr@humanbrowser.dev',
        ClientId:   orderId,
        ClientID:   orderId,
        MerchantId: merchantId,
        BillingId:  orderId,
        SuccessUrl: `https://humanbrowser.dev/ppr?order=${orderId}&status=paid`,
        SuccessURL: `https://humanbrowser.dev/ppr?order=${orderId}&status=paid`,
        CancelUrl:  'https://humanbrowser.dev/ppr',
        FailURL:    'https://humanbrowser.dev/ppr',
        ReturnUrl:  'true',
        AutoReturn: 'true',
      });
      if (apiKey) params.append('api_key', apiKey);

      const oxResp = await fetch('https://app.0xprocessing.com/Payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const contentType = oxResp.headers.get('content-type') || '';
      let oxData = {};
      if (contentType.includes('application/json')) {
        oxData = await oxResp.json();
      } else {
        const text = await oxResp.text();
        try { oxData = JSON.parse(text); } catch { oxData = {}; }
      }

      walletAddress = oxData.wallet_address || oxData.address || null;
      invoiceUrl = oxData.redirectUrl || oxData.redirect_url || oxData.url ||
                   oxData.payment_url || oxData.paymentUrl || oxData.link || null;
    } catch (e) {
      console.warn('[ppr/quote] 0xProcessing error:', e.message);
    }
  }

  // Fallback: direct 0xProcessing payment URL
  if (!invoiceUrl && !walletAddress && merchantId) {
    invoiceUrl = `https://app.0xprocessing.com/Payment?MerchantId=${encodeURIComponent(merchantId)}&AmountUSD=${tier.usd}&Currency=${encodeURIComponent(oxCurrency)}&ClientId=${orderId}&SuccessUrl=${encodeURIComponent(`https://humanbrowser.dev/ppr?order=${orderId}&status=paid`)}&CancelUrl=${encodeURIComponent('https://humanbrowser.dev/ppr')}&ReturnUrl=false`;
  }

  return res.status(200).json({
    order_id: orderId,
    requests: reqCount,
    price_usd: tier.usd,
    price_crypto: cryptoAmount,
    currency,
    label: tier.label,
    valid_hours: tier.valid_hours,
    wallet: walletAddress,
    invoice_url: invoiceUrl,
    expires_at: new Date(Date.now() + tier.valid_hours * 60 * 60 * 1000).toISOString(),
    status: 'pending_payment',
    // Agent-native: poll /api/ppr/status?order=ORDER_ID to check payment
    poll_url: `https://humanbrowser.dev/api/ppr/status?order=${orderId}`,
    // After payment, call /api/ppr/creds?order=ORDER_ID
    creds_url: `https://humanbrowser.dev/api/ppr/creds?order=${orderId}`,
  });
}
