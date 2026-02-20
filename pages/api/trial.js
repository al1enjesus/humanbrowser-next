/**
 * GET /api/trial
 * Returns shared trial proxy credentials (Romania, shared 1GB pool).
 * No auth, no tracking — first-come-first-served until budget runs out.
 */
export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const customer = process.env.BD_CUSTOMER    || 'brd-customer-hl_b1694dd8';
  const zone     = process.env.BD_ZONE        || 'mcp_unlocker';
  const pass     = process.env.BD_ZONE_PASS   || '';
  const browser  = process.env.BD_BROWSER     || '';
  const bpass    = process.env.BD_BROWSER_PASS || '';

  if (!pass) {
    return res.status(503).json({ error: 'Trial temporarily unavailable. Try again later.' });
  }

  res.status(200).json({
    trial: true,
    plan: 'trial',
    country: 'ro',
    note: 'Shared trial — Romania residential IP. Upgrade at humanbrowser.dev for a personal plan.',
    troubleshoot: 'If proxy times out, your host may block port 22225. Try PROXY_PORT=33335 instead.',
    proxy_host: 'brd.superproxy.io',
    proxy_port: '22225',
    proxy_port_alt: '33335',  // fallback if 22225 is blocked
    proxy_user: `${customer}-zone-${zone}-country-ro`,
    proxy_pass: pass,
    cdp_url: browser
      ? `wss://${customer}-zone-${browser}-country-ro:${bpass}@brd.superproxy.io:9222`
      : null,
    upgrade_url: 'https://humanbrowser.dev',
    quickstart: [
      `export PROXY_HOST=brd.superproxy.io`,
      `export PROXY_PORT=22225`,
      `export PROXY_USER="${customer}-zone-${zone}-country-ro"`,
      `export PROXY_PASS="${pass}"`,
    ].join('\n'),
  });
}
