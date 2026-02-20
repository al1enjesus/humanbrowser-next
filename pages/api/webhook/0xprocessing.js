// Shared credentials builder (mirrors /api/webhook/stripe.js)
function makeCredentials(plan) {
  const customer = process.env.BD_CUSTOMER || 'brd-customer-hl_b1694dd8';
  const zone     = process.env.BD_ZONE     || 'mcp_unlocker';
  const pass     = process.env.BD_ZONE_PASS || '';
  const browser  = process.env.BD_BROWSER  || '';
  const bpass    = process.env.BD_BROWSER_PASS || '';
  const country  = (plan === 'starter') ? '-country-ro' : '';
  return {
    proxy_host: 'brd.superproxy.io',
    proxy_port: '22225',
    proxy_user: `${customer}-zone-${zone}${country}`,
    proxy_pass: pass,
    cdp_url:    browser ? `wss://${customer}-zone-${browser}${country}:${bpass}@brd.superproxy.io:9222` : null,
  };
}

const PLAN_NAMES = { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };
const PLAN_BW    = { starter: '2GB', pro: '20GB', enterprise: 'Unlimited' };

async function sendCredentialEmail({ email, plan, orderId, creds }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !email) return;

  const planName = PLAN_NAMES[plan] || plan;
  const html = `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="background:#0a0a0f;margin:0;padding:40px 20px;font-family:Inter,Arial,sans-serif;color:#e2e8f0;">
<div style="max-width:560px;margin:0 auto;">
  <h1 style="font-size:26px;font-weight:800;color:#fff;margin:0 0 8px;text-align:center">🎉 Human Browser — Credentials</h1>
  <p style="color:#888;text-align:center;margin:0 0 24px">Your <strong style="color:#6366f1">${planName}</strong> plan is active.</p>
  <div style="background:#13131a;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:20px;">
    <h2 style="color:#fff;font-size:14px;margin:0 0 14px">🔑 Proxy Credentials</h2>
    ${[['PROXY_HOST',creds.proxy_host],['PROXY_PORT',creds.proxy_port],['PROXY_USER',creds.proxy_user],['PROXY_PASS',creds.proxy_pass]]
      .map(([l,v])=>`<div style="background:#0a0a0f;border-radius:8px;padding:10px 14px;margin-bottom:8px;"><div style="color:#555;font-size:10px;font-family:monospace">${l}</div><div style="color:#a5b4fc;font-size:12px;font-family:monospace;word-break:break-all">${v||'see dashboard'}</div></div>`).join('')}
  </div>
  <div style="background:#13131a;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:20px;">
    <h2 style="color:#fff;font-size:14px;margin:0 0 12px">🚀 Quick Start</h2>
    <pre style="background:#0a0a0f;border-radius:8px;padding:14px;font-size:11px;color:#a5b4fc;overflow:auto">export PROXY_HOST=${creds.proxy_host}
export PROXY_PORT=${creds.proxy_port}
export PROXY_USER="${creds.proxy_user}"
export PROXY_PASS="${creds.proxy_pass}"

clawhub install human-browser</pre>
  </div>
  <p style="text-align:center;color:#555;font-size:13px">Order: <code>${orderId}</code> · Need help? <a href="https://t.me/virixlabs" style="color:#6366f1">@virixlabs</a></p>
</div></body></html>`;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Human Browser <noreply@humanbrowser.dev>',
        to: [email],
        subject: `🔑 Your Human Browser ${planName} credentials`,
        html,
      }),
    });
    console.log('[0x webhook] email sent:', (await resp.json()).id);
  } catch (e) {
    console.error('[0x webhook] email error:', e.message);
  }
}

async function notifyOwner({ orderId, amount, currency, plan, email }) {
  const token  = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_OWNER_ID || '399089761';
  if (!token) return;
  const text = `💰 Crypto payment!\nPlan: ${plan || '?'}\nAmount: ${amount} ${currency}\nEmail: ${email || 'unknown'}\nOrder: ${orderId}`;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(() => {});
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  // Validate webhook password
  const webhookPass = process.env.OX_WEBHOOK_PASSWORD;
  if (webhookPass && data.webhook_password !== webhookPass) {
    console.warn('[0x webhook] Invalid password');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[0x webhook]', JSON.stringify(data));

  if (data.status === 'completed' || data.status === 'paid') {
    const orderId  = data.order_id || data.client_id || data.clientId || '';
    const amount   = data.amount   || data.AmountUSD || '';
    const currency = data.currency || data.Currency  || '';

    // Look up stored order (plan + email)
    const stored = global._cryptoOrders?.get(orderId);
    const plan   = stored?.plan  || 'starter';
    const email  = stored?.email || data.email || data.Email || null;

    console.log(`✅ Crypto paid: ${amount} ${currency} | order=${orderId} | plan=${plan} | email=${email}`);

    const creds = makeCredentials(plan);

    // 1. Send credentials email
    if (email) {
      await sendCredentialEmail({ email, plan, orderId, creds });
    }

    // 2. Notify owner on Telegram
    await notifyOwner({ orderId, amount, currency, plan, email });

    // Clean up stored order
    global._cryptoOrders?.delete(orderId);
  }

  res.status(200).json({ ok: true });
}
