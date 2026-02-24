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

const PLANS = {
  starter:    { name: 'Starter',     bandwidth: '2GB',      country: 'Romania' },
  pro:        { name: 'Pro',         bandwidth: '20GB',     country: 'Multi-country (10+)' },
  enterprise: { name: 'Enterprise',  bandwidth: 'Unlimited', country: 'All countries' },
};

function makeCredentials(plan) {
  return {
    proxy_host: process.env.DECODO_HOST || 'ro.decodo.com',
    proxy_port: process.env.DECODO_PORT || '13001',
    proxy_user: process.env.DECODO_USER || 'spikfblbkh',
    proxy_pass: process.env.DECODO_PASS || 'pe4tpmWY=7bb89YdWd',
    cdp_url:    null,
  };
}

async function sendCredentialEmail({ email, plan, sessionId, creds }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[webhook] RESEND_API_KEY not set — skipping email');
    return;
  }

  const planInfo = PLANS[plan] || PLANS.starter;
  const successUrl = `https://humanbrowser.dev/success?session=${sessionId}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="background:#0a0a0f;margin:0;padding:40px 20px;font-family:Inter,Arial,sans-serif;color:#e2e8f0;">
  <div style="max-width:560px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:28px;font-weight:800;color:#fff;margin:0 0 8px">🎉 Welcome to Human Browser!</h1>
      <p style="color:#888;font-size:15px;margin:0">Your <strong style="color:#6366f1">${planInfo.name}</strong> plan is now active.</p>
    </div>

    <div style="background:#13131a;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:20px;">
      <h2 style="color:#fff;font-size:15px;font-weight:700;margin:0 0 16px">🔑 Your Proxy Credentials</h2>
      ${[
        ['PROXY_HOST', creds.proxy_host],
        ['PROXY_PORT', creds.proxy_port],
        ['PROXY_USER', creds.proxy_user],
        ['PROXY_PASS', creds.proxy_pass],
      ].map(([label, value]) => `
      <div style="background:#0a0a0f;border-radius:8px;padding:10px 14px;margin-bottom:10px;">
        <div style="color:#555;font-size:10px;font-family:monospace;margin-bottom:4px">${label}</div>
        <div style="color:#a5b4fc;font-size:13px;font-family:monospace;word-break:break-all">${value || 'see dashboard'}</div>
      </div>`).join('')}
    </div>

    ${creds.cdp_url ? `
    <div style="background:#13131a;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:20px;">
      <h2 style="color:#fff;font-size:15px;font-weight:700;margin:0 0 12px">🌐 Browser CDP URL</h2>
      <div style="background:#0a0a0f;border-radius:8px;padding:12px;word-break:break-all;font-family:monospace;font-size:12px;color:#a5b4fc;line-height:1.5">${creds.cdp_url}</div>
    </div>` : ''}

    <div style="background:#13131a;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:20px;">
      <h2 style="color:#fff;font-size:15px;font-weight:700;margin:0 0 12px">🚀 Quick Start</h2>
      <pre style="background:#0a0a0f;border-radius:8px;padding:14px;font-size:12px;color:#a5b4fc;overflow:auto;line-height:1.6">export PROXY_HOST=${creds.proxy_host}
export PROXY_PORT=${creds.proxy_port}
export PROXY_USER="${creds.proxy_user}"
export PROXY_PASS="${creds.proxy_pass}"

clawhub install human-browser</pre>
    </div>

    <div style="text-align:center;margin-bottom:24px;">
      <a href="${successUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;border-radius:8px;padding:12px 28px;font-weight:700;font-size:14px">
        View Credentials Page →
      </a>
    </div>

    <div style="text-align:center;color:#555;font-size:13px;line-height:1.6;">
      <p>Plan: <strong style="color:#fff">${planInfo.name}</strong> · ${planInfo.bandwidth}/mo · ${planInfo.country}</p>
      <p>Need help? <a href="https://t.me/virixlabs" style="color:#6366f1">@virixlabs</a> on Telegram</p>
    </div>
  </div>
</body>
</html>`;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Human Browser <noreply@humanbrowser.dev>',
        to: [email],
        subject: `🎉 Your Human Browser ${planInfo.name} credentials`,
        html,
      }),
    });
    const result = await resp.json();
    console.log('[email sent]', result.id || result);
  } catch (e) {
    console.error('[email error]', e.message);
  }
}

async function notifyOwner({ plan, email, sessionId }) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_OWNER_ID || '399089761';
  if (!token) return;
  const text = `💰 New sale!\nPlan: ${plan}\nEmail: ${email}\nSession: ${sessionId?.slice(-8)}\nPage: https://humanbrowser.dev/success?session=${sessionId}`;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(() => {});
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
    const plan    = session.metadata?.plan || 'starter';
    const email   = session.customer_email || session.customer_details?.email;
    const sessionId = session.id;

    console.log(`✅ Payment: plan=${plan} email=${email}`);

    const creds = makeCredentials(plan);

    // 1. Send credentials email
    if (email) {
      await sendCredentialEmail({ email, plan, sessionId, creds });
    }

    // 2. Notify owner on Telegram
    await notifyOwner({ plan, email, sessionId });
  }

  res.status(200).json({ received: true });
}
