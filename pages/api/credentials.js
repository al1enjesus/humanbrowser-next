/**
 * GET /api/credentials?session=SESSION_ID
 * Retrieves proxy credentials after successful Stripe payment.
 * Credentials are deterministically derived from the verified Stripe session.
 */
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  starter:    { name: 'Starter',    bandwidth: '2GB',      price: 13.99 },
  pro:        { name: 'Pro',        bandwidth: '20GB',     price: 69.99 },
  enterprise: { name: 'Enterprise', bandwidth: 'Unlimited', price: 299.00 },
};

function makeCredentials(plan, sessionId) {
  const customer = process.env.BD_CUSTOMER || 'brd-customer-hl_b1694dd8';
  const zone     = process.env.BD_ZONE     || 'mcp_unlocker';
  const pass     = process.env.BD_ZONE_PASS;
  const browser  = process.env.BD_BROWSER;
  const bpass    = process.env.BD_BROWSER_PASS;

  // Country targeting: starter = RO only, pro/enterprise = all
  const country = (plan === 'starter') ? '-country-ro' : '';

  return {
    proxy_host:  'brd.superproxy.io',
    proxy_port:  '22225',
    proxy_user:  `${customer}-zone-${zone}${country}`,
    proxy_pass:  pass,
    cdp_url:     browser ? `wss://${customer}-zone-${browser}${country}:${bpass}@brd.superproxy.io:9222` : null,
    plan_key:    plan,
    plan_name:   PLANS[plan]?.name || plan,
    bandwidth:   PLANS[plan]?.bandwidth || '2GB',
    expires_at:  new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString(),
    order_ref:   sessionId?.slice(-8),
  };
}

export default async function handler(req, res) {
  const { session } = req.query;
  if (!session) return res.status(400).json({ error: 'session required' });

  try {
    // Retrieve Stripe session and verify it's paid
    const stripeSession = await stripe.checkout.sessions.retrieve(session);

    if (stripeSession.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not confirmed yet. Please wait a moment and refresh.' });
    }

    const plan  = stripeSession.metadata?.plan || 'starter';
    const email = stripeSession.customer_email || stripeSession.customer_details?.email;

    const creds = makeCredentials(plan, session);
    creds.email = email;

    return res.status(200).json(creds);
  } catch (e) {
    console.error('[credentials]', e.message);
    return res.status(404).json({ error: 'Session not found or expired' });
  }
}
