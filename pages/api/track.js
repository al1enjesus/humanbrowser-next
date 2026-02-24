/**
 * POST /api/track — analytics proxy → VPS SQLite (site=hb)
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const VPS_URL = process.env.VPS_URL || 'http://109.123.239.20:3050';
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || '';
  const { event, page, ref } = req.body || {};

  if (!event) return res.status(400).json({ ok: false });

  try {
    await fetch(`${VPS_URL}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
      body: JSON.stringify({
        event,
        page: page || '/',
        ref: ref || '',
        ua: req.headers['user-agent'] || '',
        site: 'hb',
      }),
    });
  } catch (_) { /* non-fatal */ }

  return res.status(200).json({ ok: true });
}
