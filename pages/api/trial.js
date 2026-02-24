/**
 * GET /api/trial
 * Free trial — 1GB Romania residential proxy + 10 captcha solves.
 * No signup. No KYC. Everything works out of the box.
 *
 * Returns: proxy creds + trial_token + captcha endpoint URL
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const VPS_URL = process.env.VIRIX_API_URL || 'http://109.123.239.20:3000';
  const INTERNAL_SECRET = process.env.INTERNAL_SECRET || 'clawster-deploy-secret-2026';

  const host = process.env.DECODO_HOST || 'ro.decodo.com';
  const port = process.env.DECODO_PORT || '13001';
  const user = process.env.DECODO_USER || 'spikfblbkh';
  const pass = process.env.DECODO_PASS || 'pe4tpmWY=7bb89YdWd';

  // Register trial session on VPS to get trial_token
  let trial_token = null;
  let captcha_solves_remaining = 10;
  try {
    const regResp = await fetch(`${VPS_URL}/internal/trial/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${INTERNAL_SECRET}`,
      },
      signal: AbortSignal.timeout(5000),
    });
    const regData = await regResp.json();
    if (regData.ok && regData.trial_token) {
      trial_token = regData.trial_token;
      captcha_solves_remaining = regData.captcha_limit || 10;
    }
  } catch (_) {
    // VPS unreachable — still return proxy creds, captcha just won't work
  }

  res.status(200).json({
    trial: true,
    plan: 'trial',
    country: 'ro',
    note: 'Free trial — 1GB Romania residential IP + 10 captcha solves. Upgrade at humanbrowser.dev.',
    // Proxy credentials
    proxy_host: host,
    proxy_port: port,
    proxy_user: user,
    proxy_pass: pass,
    proxy_limit_gb: 1,
    // Captcha
    captcha_url: trial_token ? `${VPS_URL}/api/captcha` : null,
    captcha_token: trial_token,
    captcha_solves_remaining,
    // Upgrade
    upgrade_url: 'https://humanbrowser.dev',
    quickstart: [
      `export PROXY_HOST=${host}`,
      `export PROXY_PORT=${port}`,
      `export PROXY_USER="${user}"`,
      `export PROXY_PASS="${pass}"`,
      trial_token ? `export CAPTCHA_URL="${VPS_URL}/api/captcha"` : '',
      trial_token ? `export CAPTCHA_TOKEN="${trial_token}"` : '',
    ].filter(Boolean).join('\n'),
  });
}
