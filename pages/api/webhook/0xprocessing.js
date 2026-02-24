// Credentials builder — uses Decodo (Romania residential, GET+POST, no KYC)
function makeCredentials(plan) {
  return {
    proxy_host: process.env.DECODO_HOST || 'ro.decodo.com',
    proxy_port: process.env.DECODO_PORT || '13001',
    proxy_user: process.env.DECODO_USER || 'spikfblbkh',
    proxy_pass: process.env.DECODO_PASS || 'pe4tpmWY=7bb89YdWd',
    cdp_url:    null,
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
  // Accept both POST and GET (0xProcessing can use either)
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).end();

  const data = req.method === 'GET' ? req.query : (req.body || {});

  // Validate webhook password (0xProcessing sends it as Password or webhook_password)
  const webhookPass = process.env.OX_WEBHOOK_PASSWORD || 'b6BJHS2C1GiVu7Qw52U4Lsdr';
  const receivedPass = data.Password || data.webhook_password || data.password || '';
  if (webhookPass && receivedPass && receivedPass !== webhookPass) {
    console.warn('[0x webhook] Invalid password');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[0x webhook]', JSON.stringify(data));

  // Normalize fields (0xProcessing uses PascalCase in some modes)
  const status   = (data.Status   || data.status   || '').toLowerCase();
  const orderId  = data.OrderId   || data.order_id  || data.client_id || data.ClientId || data.clientId || '';
  const amount   = data.Amount    || data.amount    || data.AmountUSD || '';
  const currency = data.Currency  || data.currency  || '';

  if (status === 'completed' || status === 'paid') {
    console.log(`✅ Crypto paid: ${amount} ${currency} | order=${orderId}`);

    const VPS = process.env.VPS_URL || 'http://109.123.239.20:3050';
    const DEPLOY_SECRET = process.env.DEPLOY_SECRET || 'clawster-deploy-secret-2026';

    // ─── ROUTER: Clawster vs HumanBrowser ────────────────────────────────
    if (orderId.startsWith('clawster-')) {
      // === CLAWSTER ORDER ===
      console.log(`[0x webhook] Clawster order: ${orderId}`);
      try {
        // Look up session by order_id on VPS
        const lookupRes = await fetch(
          `${VPS}/internal/session-by-order?order_id=${encodeURIComponent(orderId)}`,
          { headers: { Authorization: `Bearer ${DEPLOY_SECRET}` }, signal: AbortSignal.timeout(5000) }
        );
        const lookupData = await lookupRes.json();

        if (!lookupData.ok || !lookupData.session_id) {
          console.error(`[0x webhook] Clawster session not found for ${orderId}:`, lookupData);
          return res.status(200).json({ ok: false, error: 'Session not found', order: orderId });
        }

        // Trigger deploy
        await fetch(`${VPS}/internal/deploy`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DEPLOY_SECRET}` },
          body: JSON.stringify({ session_id: lookupData.session_id, method: 'crypto' }),
          signal: AbortSignal.timeout(5000),
        });

        console.log(`[0x webhook] Clawster deploy triggered for session ${lookupData.session_id}`);
      } catch (e) {
        console.error('[0x webhook] Clawster deploy error:', e.message);
      }
    } else {
      // === HUMANBROWSER ORDER ===
      // Read metadata from VPS (persistent, survives cold starts)
      let plan  = 'starter';
      let email = data.email || data.Email || null;
      try {
        const metaRes = await fetch(
          `${VPS}/api/hb/order-meta?order_id=${encodeURIComponent(orderId)}`,
          { signal: AbortSignal.timeout(4000) }
        );
        const meta = await metaRes.json();
        if (meta.ok) {
          plan  = meta.plan  || plan;
          email = meta.email || email;
        }
      } catch (e) {
        console.warn('[0x webhook] VPS order-meta lookup failed:', e.message);
      }

      console.log(`[0x webhook] HumanBrowser order: ${orderId} | plan=${plan} | email=${email}`);

      const creds = makeCredentials(plan);

      // 1. Send credentials email
      if (email) {
        await sendCredentialEmail({ email, plan, orderId, creds });
      }

      // 2. Store creds on VPS (persistent SQLite)
      try {
        await fetch(`${VPS}/api/hb/store-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId, plan, email: email || null,
            proxy_host: creds.proxy_host, proxy_port: creds.proxy_port,
            proxy_user: creds.proxy_user, proxy_pass: creds.proxy_pass,
            cdp_url: creds.cdp_url || null, amount: String(amount), currency }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (e) { console.error('[0x webhook] VPS store error:', e.message); }

      // 3. Notify owner
      await notifyOwner({ orderId, amount, currency, plan, email });

      // (no in-memory cleanup needed — persistent storage on VPS)
    }
  }

  res.status(200).json({ ok: true });
}
