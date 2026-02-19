/**
 * GET /api/ppr/status?order=ORDER_ID
 * Check payment status for a PPR order (agent polling endpoint)
 */
export default function handler(req, res) {
  const { order } = req.query;
  if (!order) return res.status(400).json({ error: 'order required' });

  const pprOrders = global._pprOrders;
  if (!pprOrders) return res.status(404).json({ status: 'pending', message: 'Order not found yet. Still waiting for payment.' });

  const record = pprOrders.get(order);

  if (!record) {
    return res.status(200).json({
      order_id: order,
      status: 'pending',
      message: 'Payment not confirmed yet. Check back in 30-60 seconds.',
    });
  }

  if (record.status === 'paid') {
    const expired = new Date(record.expires_at) < new Date();
    return res.status(200).json({
      order_id: order,
      status: expired ? 'expired' : 'paid',
      requests: record.requests,
      remaining: record.remaining,
      expires_at: record.expires_at,
      creds_url: `https://humanbrowser.dev/api/ppr/creds?order=${order}`,
    });
  }

  return res.status(200).json({ order_id: order, status: record.status });
}
