/**
 * GET /api/hb-creds?order_id=ORDER_ID
 * Proxy to VPS — returns proxy credentials for a confirmed HB order.
 * Success page polls this until status=paid, then shows creds on screen.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { order_id } = req.query;
  if (!order_id) return res.status(400).json({ ok: false, error: 'Missing order_id' });

  const VPS = process.env.VPS_URL || 'http://109.123.239.20:3050';
  try {
    const r = await fetch(`${VPS}/api/hb/get-creds?order_id=${encodeURIComponent(order_id)}`, {
      signal: AbortSignal.timeout(5000),
    });
    const d = await r.json();
    return res.status(r.status).json(d);
  } catch (e) {
    return res.status(200).json({ ok: false, status: 'pending', error: 'VPS unreachable' });
  }
}
