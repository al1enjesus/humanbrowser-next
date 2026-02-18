export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;
  console.log('[0xprocessing webhook]', JSON.stringify(data));

  // Validate status
  if (data.status === 'completed' || data.status === 'paid') {
    const { order_id, amount, currency } = data;
    console.log(`✅ Crypto payment: ${amount} ${currency} | order=${order_id}`);

    // Notify owner
    const tgOwner = process.env.TG_OWNER_ID;
    if (tgOwner) {
      const msg = `🔐 Crypto payment!\nOrder: ${order_id}\nAmount: ${amount} ${currency}`;
      await fetch(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgOwner, text: msg }),
      }).catch(() => {});
    }
  }

  // Must respond 200 within 3 seconds
  res.status(200).json({ ok: true });
}
