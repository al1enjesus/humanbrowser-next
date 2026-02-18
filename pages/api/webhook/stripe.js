import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function generateCredentials(plan, orderId) {
  const customer = process.env.BD_CUSTOMER || 'brd-customer-hl_b1694dd8';
  const zone = process.env.BD_ZONE || 'mcp_unlocker';
  const pass = process.env.BD_ZONE_PASS;
  const country = plan === 'pro' ? '' : '-country-ro';
  return {
    proxy_server: 'http://brd.superproxy.io:22225',
    proxy_username: `${customer}-zone-${zone}${country}`,
    proxy_password: pass,
    cdp_url: `wss://${customer}-zone-${process.env.BD_BROWSER}${country}:${process.env.BD_BROWSER_PASS}@brd.superproxy.io:9222`,
    order_id: orderId,
    plan,
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    console.error('[stripe webhook]', e.message);
    return res.status(400).json({ error: e.message });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { plan, order_id } = session.metadata || {};
    const email = session.customer_email;

    console.log(`✅ Payment success: plan=${plan} order=${order_id} email=${email}`);

    const creds = generateCredentials(plan, order_id);
    console.log('Credentials generated:', JSON.stringify(creds));

    // TODO: Send credentials via email / Telegram
    // For now: log + notify owner
    const tgOwner = process.env.TG_OWNER_ID;
    if (tgOwner) {
      const msg = `🎉 New sale!\nPlan: ${plan}\nEmail: ${email}\nOrder: ${order_id}`;
      await fetch(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgOwner, text: msg }),
      }).catch(() => {});
    }
  }

  res.status(200).json({ received: true });
}
