/**
 * GET /api/trial
 * Returns shared trial proxy credentials (Romania residential, Decodo).
 * No auth — no KYC, POST requests supported.
 */
export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const host = process.env.DECODO_HOST || 'ro.decodo.com';
  const port = process.env.DECODO_PORT || '13001';
  const user = process.env.DECODO_USER || 'spikfblbkh';
  const pass = process.env.DECODO_PASS || 'pe4tpmWY=7bb89YdWd';

  res.status(200).json({
    trial: true,
    plan: 'trial',
    country: 'ro',
    note: 'Shared trial — Romania residential IP. Upgrade at humanbrowser.dev for a dedicated plan.',
    proxy_host: host,
    proxy_port: port,
    proxy_user: user,
    proxy_pass: pass,
    upgrade_url: 'https://humanbrowser.dev',
    quickstart: [
      `export PROXY_HOST=${host}`,
      `export PROXY_PORT=${port}`,
      `export PROXY_USER="${user}"`,
      `export PROXY_PASS="${pass}"`,
    ].join('\n'),
  });
}
