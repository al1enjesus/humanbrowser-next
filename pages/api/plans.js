export default function handler(req, res) {
  res.status(200).json({
    service: 'Human Browser by Virixlabs',
    description: 'Cloud-based stealth browser with residential proxy. No Mac Mini needed.',
    skill: 'clawhub install al1enjesus/human-browser',
    plans: {
      starter: {
        name: 'Human Browser Starter',
        price_usd: 13.99,
        bandwidth_gb: 2,
        overage_per_gb: 2.5,
        countries: ['ro'],
        description: 'Cloud browser with Romania residential IP. 2GB/mo included.',
      },
      pro: {
        name: 'Human Browser Pro',
        price_usd: 69.99,
        bandwidth_gb: 20,
        overage_per_gb: 2.0,
        countries: ['ro', 'us', 'uk', 'de', 'nl', 'jp', 'fr', 'ca', 'au', 'sg'],
        description: 'High-volume scraping. 20GB/mo + multi-country rotation.',
      },
      enterprise: {
        name: 'Human Browser Enterprise',
        price_usd: 299,
        bandwidth_gb: 999,
        overage_per_gb: 1.5,
        countries: ['all'],
        description: 'Unlimited sessions. Dedicated zone. SLA.',
      },
    },
    currencies: ['USDT', 'ETH', 'BTC', 'card'],
    buy: 'POST /api/buy',
  });
}
