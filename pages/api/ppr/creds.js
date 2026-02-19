/**
 * GET /api/ppr/creds?order=ORDER_ID
 * Returns proxy credentials for a paid PPR order.
 * Agent-native: call this after /api/ppr/status returns { status: 'paid' }
 */
export default function handler(req, res) {
  const { order } = req.query;
  if (!order) return res.status(400).json({ error: 'order required' });

  const pprOrders = global._pprOrders;
  const record = pprOrders?.get(order);

  if (!record || record.status !== 'paid') {
    return res.status(402).json({
      error: 'Payment not confirmed yet',
      poll: `https://humanbrowser.dev/api/ppr/status?order=${order}`,
    });
  }

  const expired = new Date(record.expires_at) < new Date();
  if (expired) {
    return res.status(410).json({ error: 'Order expired. Purchase a new PPR pack.' });
  }

  const customer = process.env.BD_CUSTOMER || 'brd-customer-hl_b1694dd8';
  const zone     = process.env.BD_ZONE     || 'mcp_unlocker';
  const pass     = process.env.BD_ZONE_PASS || '';

  return res.status(200).json({
    // Proxy credentials
    proxy_host: 'brd.superproxy.io',
    proxy_port: '22225',
    proxy_user: `${customer}-zone-${zone}`,
    proxy_pass: pass,
    // Session info
    order_id: order,
    requests_purchased: record.requests,
    requests_remaining: record.remaining,
    valid_until: record.expires_at,
    // Quick start
    env_export: [
      `export PROXY_HOST=brd.superproxy.io`,
      `export PROXY_PORT=22225`,
      `export PROXY_USER="${customer}-zone-${zone}"`,
      `export PROXY_PASS="${pass}"`,
    ].join('\n'),
  });
}
