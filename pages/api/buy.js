import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  starter:    { name: 'Human Browser Starter',    usd: 13.99, price: 1399, bandwidth: '2GB' },
  pro:        { name: 'Human Browser Pro',        usd: 69.99, price: 6999, bandwidth: '20GB' },
  enterprise: { name: 'Human Browser Enterprise', usd: 299,  price: 29900, bandwidth: 'Unlimited' },
};

// In-memory order store for crypto payments (survives within same serverless instance)
// ⚠️ Not persistent across cold starts — upgrade to Vercel KV for production
if (!global._cryptoOrders) global._cryptoOrders = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { plan = 'starter', currency = 'card', email = '' } = req.body || {};
  if (!PLANS[plan]) return res.status(400).json({ error: 'Invalid plan' });

  const p = PLANS[plan];
  const orderId = `hb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // ── CARD via Stripe Embedded Checkout ──────────────────────
  if (currency === 'card') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        ui_mode: 'embedded',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: p.name, description: p.bandwidth + ' bandwidth/mo' },
            unit_amount: p.price,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }],
        ...(email ? { customer_email: email } : {}),
        metadata: { plan, order_id: orderId },
        return_url: `https://humanbrowser.dev/success?session={CHECKOUT_SESSION_ID}`,
      });
      return res.status(200).json({
        client_secret: session.client_secret,
        order_id: orderId,
        method: 'stripe',
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // ── CRYPTO via 0xProcessing ─────────────────────────────────
  const CURRENCY_MAP = {
    'USDT':    'USDT (TRC20)',
    'USDTTRC': 'USDT (TRC20)',
    'USDTERC': 'USDT',
    'ETH':     'ETH',
    'BTC':     'BTC',
    'SOL':     'SOL',
  };
  const inputCur = currency.toUpperCase();
  if (!CURRENCY_MAP[inputCur]) {
    return res.status(400).json({ error: 'Invalid currency. Use: card, USDT, ETH, BTC, SOL' });
  }
  const cur = CURRENCY_MAP[inputCur];

  const merchantId = process.env.OX_MERCHANT_ID;
  const apiKey     = process.env.OX_API_KEY;

  if (!merchantId || !apiKey) {
    return res.status(503).json({ error: 'Crypto payments temporarily unavailable' });
  }

  // Store order so webhook can look it up
  const customerEmail = email || null;
  global._cryptoOrders.set(orderId, {
    plan,
    email: customerEmail,
    currency: cur,
    usd: p.usd,
    created: Date.now(),
  });

  // Success URL carries order context for the success page
  const successUrl = `https://humanbrowser.dev/success?order=${orderId}&method=crypto&plan=${plan}`;

  try {
    const params = new URLSearchParams({
      AmountUSD:  p.usd.toString(),
      Amount:     p.usd.toString(),
      Currency:   cur,
      Email:      customerEmail || 'customer@humanbrowser.dev',
      ClientId:   orderId,
      ClientID:   orderId,
      MerchantId: merchantId,
      BillingId:  orderId,
      SuccessUrl: successUrl,
      SuccessURL: successUrl,
      CancelUrl:  'https://humanbrowser.dev/#pricing',
      FailURL:    'https://humanbrowser.dev/#pricing',
      ReturnUrl:  'true',
      AutoReturn: 'true',
    });
    if (apiKey) params.append('api_key', apiKey);

    const oxRes = await fetch('https://app.0xprocessing.com/Payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const contentType = oxRes.headers.get('content-type') || '';
    let oxData = {};
    if (contentType.includes('application/json')) {
      oxData = await oxRes.json();
    } else {
      const text = await oxRes.text();
      try { oxData = JSON.parse(text); } catch { oxData = {}; }
    }

    const redirectUrl =
      oxData.redirectUrl || oxData.redirect_url || oxData.url ||
      oxData.payment_url || oxData.paymentUrl || oxData.PaymentUrl ||
      oxData.link || oxData.checkout_url;

    if (!redirectUrl) {
      console.error('[0xProcessing]', JSON.stringify(oxData));
      // Fallback: direct URL
      const fallback = `https://app.0xprocessing.com/Payment?MerchantId=${encodeURIComponent(merchantId)}&AmountUSD=${p.usd}&Currency=${encodeURIComponent(cur)}&ClientId=${orderId}&SuccessUrl=${encodeURIComponent(successUrl)}&CancelUrl=${encodeURIComponent('https://humanbrowser.dev/#pricing')}`;
      return res.status(200).json({ payment_url: fallback, order_id: orderId, currency: cur, method: '0xprocessing' });
    }

    return res.status(200).json({ payment_url: redirectUrl, order_id: orderId, currency: cur, method: '0xprocessing' });
  } catch (e) {
    console.error('[0xProcessing error]', e.message);
    return res.status(500).json({ error: e.message });
  }
}
