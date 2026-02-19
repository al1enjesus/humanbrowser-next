import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  starter:    { name: 'Human Browser Starter',    usd: 13.99, price: 1399, bandwidth: '2GB' },
  pro:        { name: 'Human Browser Pro',        usd: 69.99, price: 6999, bandwidth: '20GB' },
  enterprise: { name: 'Human Browser Enterprise', usd: 299,  price: 29900, bandwidth: 'Unlimited' },
};

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
        // No payment_method_types — let Stripe show Card + Apple Pay + Google Pay automatically
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
  const VALID_CRYPTO = ['USDT', 'ETH', 'BTC', 'SOL', 'USDTTRC', 'USDTERC'];
  const cur = currency.toUpperCase();
  if (!VALID_CRYPTO.includes(cur)) {
    return res.status(400).json({ error: 'Invalid currency. Use: card, USDT, ETH, BTC, SOL' });
  }

  const merchantId = process.env.OX_MERCHANT_ID;
  const apiKey     = process.env.OX_API_KEY;

  if (!merchantId || !apiKey) {
    return res.status(503).json({ error: 'Crypto payments temporarily unavailable' });
  }

  try {
    // 0xProcessing: form POST with ReturnUrl=true → returns { redirectUrl }
    const params = new URLSearchParams({
      AmountUSD:  p.usd.toString(),
      Currency:   cur,
      Email:      email || 'customer@humanbrowser.dev',
      ClientId:   orderId,
      MerchantId: merchantId,
      BillingId:  orderId,
      SuccessUrl: 'https://humanbrowser.dev/success',
      CancelUrl:  'https://humanbrowser.dev/#pricing',
      ReturnUrl:  'true',
      AutoReturn: 'true',
    });

    const oxRes = await fetch('https://app.0xprocessing.com/Payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const oxData = await oxRes.json();
    const redirectUrl = oxData.redirectUrl || oxData.url || oxData.payment_url;

    if (!redirectUrl) {
      console.error('[0xProcessing]', JSON.stringify(oxData));
      return res.status(502).json({ error: '0xProcessing: no redirect URL', detail: oxData });
    }

    return res.status(200).json({
      payment_url: redirectUrl,
      order_id: orderId,
      currency: cur,
      method: '0xprocessing',
    });
  } catch (e) {
    console.error('[0xProcessing error]', e.message);
    return res.status(500).json({ error: e.message });
  }
}
