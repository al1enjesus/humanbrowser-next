/**
 * POST /api/ppr/webhook
 * 0xProcessing webhook for Pay-per-Request payments
 * On payment confirmed: store PPR order in edge-compatible KV (or memory for now)
 */

// Simple in-memory store for PPR orders (TODO: replace with Vercel KV or Upstash)
// This won't persist across serverless function restarts — replace ASAP
if (!global._pprOrders) global._pprOrders = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const body = req.body || {};
  const { order_id, status, amount, currency } = body;

  // ── Route Clawster crypto payments ────────────────────────────────────────
  const meta = body.metadata || {};
  const isClawster = meta.product === 'clawster' || String(order_id || '').startsWith('clawster-');
  if (isClawster) {
    const isPaid = status === 'confirmed' || status === 'paid' || status === 'completed';
    if (isPaid && meta.tg_user_id && meta.bot_token) {
      try {
        await fetch('https://getclawster.dev/api/webhooks/crypto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: meta.webhook_secret || process.env.CLAWSTER_CRYPTO_SECRET || 'clawster-crypto-hook-2026',
            tg_user_id: meta.tg_user_id,
            bot_token: meta.bot_token,
            bot_username: meta.bot_username,
            plan: meta.plan,
            order_id,
          }),
        });
        console.log(`[ppr/webhook] Clawster order routed: ${order_id}`);
      } catch (e) {
        console.error('[ppr/webhook] Clawster route error:', e);
      }
    }
    return res.status(200).json({ ok: true, routed: 'clawster' });
  }
  // ─────────────────────────────────────────────────────────────────────────

  if (!order_id) return res.status(400).json({ error: 'missing order_id' });

  const isPaid = status === 'confirmed' || status === 'paid' || status === 'completed';

  if (isPaid) {
    // Parse requests count from order_id metadata or amount
    // For now: derive from amount (USD) at $0.003/req
    const usdAmount = parseFloat(amount) || 3.00;
    const requests = Math.floor(usdAmount / 0.003);
    const validHours = Math.max(2, Math.floor(requests / 1000) * 24);

    global._pprOrders.set(order_id, {
      status: 'paid',
      requests,
      remaining: requests,
      paid_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + validHours * 60 * 60 * 1000).toISOString(),
      currency,
      amount_usd: usdAmount,
    });

    console.log(`[ppr/webhook] paid: ${order_id} → ${requests} requests`);

    // Notify owner
    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_OWNER_ID || '399089761';
    if (token) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `💎 PPR payment!\nOrder: ${order_id}\nRequests: ${requests}\nAmount: $${usdAmount} ${currency}`,
        }),
      }).catch(() => {});
    }
  }

  return res.status(200).json({ ok: true });
}
