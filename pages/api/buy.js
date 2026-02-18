import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  starter: { name: 'Human Browser Starter', price: 1399, bandwidth: '2GB', country: 'ro' },
  pro:     { name: 'Human Browser Pro',     price: 4999, bandwidth: '20GB', country: 'multi' },
  enterprise: { name: 'Human Browser Enterprise', price: 19900, bandwidth: 'Unlimited', country: 'all' },
};

// Generate proxy credentials for a plan
function generateCredentials(plan, orderId) {
  const customer = process.env.BD_CUSTOMER || 'brd-customer-hl_b1694dd8';
  const zone = process.env.BD_ZONE || 'mcp_unlocker';
  const pass = process.env.BD_ZONE_PASS;
  const country = PLANS[plan]?.country === 'multi' ? '' : `-country-${PLANS[plan]?.country || 'ro'}`;

  return {
    proxy_server: 'http://brd.superproxy.io:22225',
    proxy_username: `${customer}-zone-${zone}${country}`,
    proxy_password: pass,
    cdp_url: `wss://${customer}-zone-${process.env.BD_BROWSER || 'mcp_browser'}${country}:${process.env.BD_BROWSER_PASS}@brd.superproxy.io:9222`,
    order_id: orderId,
    plan,
    bandwidth: PLANS[plan]?.bandwidth,
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    skill_install: 'clawhub install al1enjesus/human-browser',
    docs: 'https://humanbrowser.dev/docs',
    support: 'https://t.me/virixlabs',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { plan = 'starter', currency = 'card', email, agent_id } = req.body || {};

  if (!PLANS[plan]) return res.status(400).json({ error: 'Invalid plan. Choose: starter, pro, enterprise' });

  const p = PLANS[plan];
  const orderId = `hb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    // Card payment via Stripe
    if (currency === 'card') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: p.name, description: p.bandwidth + ' bandwidth/mo' },
            unit_amount: p.price,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }],
        customer_email: email,
        metadata: { plan, order_id: orderId, agent_id: agent_id || '' },
        success_url: `https://humanbrowser.dev/success?session={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://humanbrowser.dev/#pricing`,
      });

      return res.status(200).json({
        payment_url: session.url,
        order_id: orderId,
        method: 'stripe',
        note: 'Complete payment at payment_url. Credentials delivered after payment.',
      });
    }

    // Crypto via 0xProcessing
    if (['usdt', 'eth', 'btc', 'USDT', 'ETH', 'BTC'].includes(currency)) {
      const oxKey = process.env.OX_API_KEY;
      if (!oxKey) return res.status(503).json({ error: 'Crypto payments temporarily unavailable' });

      const oxResp = await axios.post('https://api.0xprocessing.com/payment/create', {
        api_key: oxKey,
        amount: p.price / 100,
        currency: currency.toUpperCase(),
        order_id: orderId,
        callback_url: `https://humanbrowser.dev/api/webhook/0xprocessing`,
        success_url: `https://humanbrowser.dev/success`,
        description: p.name,
      });

      return res.status(200).json({
        payment_url: oxResp.data.payment_url,
        wallet_address: oxResp.data.address,
        amount_crypto: oxResp.data.amount,
        currency: currency.toUpperCase(),
        order_id: orderId,
        expires_at: oxResp.data.expires_at,
        method: '0xprocessing',
      });
    }

    return res.status(400).json({ error: 'Invalid currency. Use: card, USDT, ETH, BTC' });

  } catch (e) {
    console.error('[buy]', e.message);
    return res.status(500).json({ error: e.message });
  }
}
