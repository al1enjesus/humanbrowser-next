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
  // Decodo residential proxy (primary since 2026-02-21)
  const host = process.env.DECODO_HOST || 'ro.decodo.com';
  const port = process.env.DECODO_PORT || '13001';
  const user = process.env.DECODO_USER || 'spikfblbkh';
  const pass = process.env.DECODO_PASS || 'pe4tpmWY=7bb89YdWd';

  // Unique sticky session per order (port 10001-49999)
  const session = 10001 + Math.abs(sessionId?.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 39999 || 0);

  return {
    proxy_host:  host,
    proxy_port:  String(session),
    proxy_user:  user,
    proxy_pass:  pass,
    cdp_url:     null,
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
