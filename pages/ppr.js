import Head from 'next/head';
import Link from 'next/link';

const TIERS = [
  { requests: 100,   usd: 0.50,  label: '~$0.005/req', popular: false },
  { requests: 500,   usd: 2.00,  label: '~$0.004/req', popular: false },
  { requests: 1000,  usd: 3.00,  label: '$0.003/req',  popular: true  },
  { requests: 5000,  usd: 10.00, label: '$0.002/req',  popular: false },
  { requests: 10000, usd: 15.00, label: '$0.0015/req', popular: false },
  { requests: 50000, usd: 50.00, label: '$0.001/req',  popular: false },
];

export default function PPRPage() {
  return (
    <>
      <Head>
        <title>Pay-per-Request API — Human Browser</title>
        <meta name="description" content="Buy Human Browser credits on demand. No subscription. Pay with USDT, ETH, BTC or SOL. Agent-native API." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>

        {/* Nav */}
        <nav style={{ borderBottom: '1px solid #1e293b', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ color: '#06b6d4', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>
            ← Human Browser
          </Link>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Pay-per-Request API <span style={{ background: '#312e81', color: '#a5b4fc', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '0.5rem' }}>Beta</span></span>
        </nav>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#f1f5f9', margin: '0 0 0.75rem' }}>
              Buy Request Credits
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
              No subscription. No monthly commitment. Pay crypto, get proxy credentials instantly.
            </p>
          </div>

          {/* Tier grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {TIERS.map((tier) => (
              <div
                key={tier.requests}
                id={`tier-${tier.requests}`}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    document.querySelectorAll('.ppr-tier-card').forEach(el => el.style.borderColor = '#1e293b');
                    document.getElementById(`tier-${tier.requests}`).style.borderColor = '#06b6d4';
                    document.getElementById('ppr-req-input').value = tier.requests;
                    document.getElementById('ppr-price-display').textContent = `$${tier.usd.toFixed(2)}`;
                    document.getElementById('ppr-label-display').textContent = tier.label;
                  }
                }}
                className="ppr-tier-card"
                style={{
                  background: tier.popular ? 'rgba(6,182,212,0.08)' : '#1e293b',
                  border: `1px solid ${tier.popular ? '#06b6d4' : '#1e293b'}`,
                  borderRadius: '12px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'border-color 0.15s',
                }}
              >
                {tier.popular && (
                  <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#06b6d4', color: '#0f172a', fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: '999px' }}>
                    POPULAR
                  </span>
                )}
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9' }}>
                  {tier.requests >= 1000 ? `${tier.requests / 1000}K` : tier.requests}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>requests</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>${tier.usd.toFixed(2)}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{tier.label}</div>
              </div>
            ))}
          </div>

          {/* Payment form */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 1.5rem' }}>Complete Purchase</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Request count</label>
              <input
                id="ppr-req-input"
                type="number"
                defaultValue={1000}
                min={100}
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.65rem 1rem', color: '#f1f5f9', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Email (for credential delivery)</label>
              <input
                id="ppr-email-input"
                type="email"
                placeholder="you@example.com"
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.65rem 1rem', color: '#f1f5f9', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Currency</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['USDTTRC', 'ETH', 'BTC', 'SOL'].map((cur) => (
                  <button
                    key={cur}
                    id={`ppr-cur-${cur}`}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        document.querySelectorAll('.ppr-cur-btn').forEach(b => {
                          b.style.background = '#0f172a';
                          b.style.borderColor = '#334155';
                          b.style.color = '#94a3b8';
                        });
                        const btn = document.getElementById(`ppr-cur-${cur}`);
                        btn.style.background = 'rgba(6,182,212,0.15)';
                        btn.style.borderColor = '#06b6d4';
                        btn.style.color = '#06b6d4';
                        document.getElementById('ppr-selected-cur').value = cur;
                      }
                    }}
                    className="ppr-cur-btn"
                    style={{
                      background: cur === 'USDTTRC' ? 'rgba(6,182,212,0.15)' : '#0f172a',
                      border: `1px solid ${cur === 'USDTTRC' ? '#06b6d4' : '#334155'}`,
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      color: cur === 'USDTTRC' ? '#06b6d4' : '#94a3b8',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    {cur === 'USDTTRC' ? 'USDT TRC-20' : cur}
                  </button>
                ))}
                <input type="hidden" id="ppr-selected-cur" defaultValue="USDTTRC" />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Total</span>
              <div>
                <span id="ppr-price-display" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f1f5f9' }}>$3.00</span>
                <span id="ppr-label-display" style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '0.5rem' }}>$0.003/req</span>
              </div>
            </div>

            <button
              id="ppr-pay-btn"
              onClick={async () => {
                if (typeof window === 'undefined') return;
                const btn = document.getElementById('ppr-pay-btn');
                const statusEl = document.getElementById('ppr-status');
                const requests = parseInt(document.getElementById('ppr-req-input').value, 10);
                const email = document.getElementById('ppr-email-input').value;
                const currency = document.getElementById('ppr-selected-cur').value;

                if (!requests || requests < 100) {
                  statusEl.textContent = '⚠ Minimum 100 requests';
                  statusEl.style.color = '#ef4444';
                  return;
                }

                btn.disabled = true;
                btn.textContent = 'Creating invoice…';
                statusEl.textContent = '';

                try {
                  const res = await fetch('/api/ppr/quote', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ requests, currency, email }),
                  });
                  const data = await res.json();

                  if (!res.ok) throw new Error(data.error || 'Server error');

                  if (data.invoice_url) {
                    window.open(data.invoice_url, '_blank', 'noopener,noreferrer');
                    statusEl.innerHTML =
                      '✅ Payment page opened in new tab. ' +
                      'Order ID: <code style="color:#06b6d4;">' + data.order_id + '</code>. ' +
                      'Your proxy credentials will be sent to you after on-chain confirmation. ' +
                      '<a href="' + data.invoice_url + '" target="_blank" style="color:#06b6d4;">Reopen ↗</a>';
                    statusEl.style.color = '#94a3b8';
                  } else if (data.wallet) {
                    statusEl.innerHTML =
                      '💳 Send <strong style="color:#f1f5f9;">' + data.price_crypto + ' ' + currency + '</strong> to:<br>' +
                      '<code style="color:#06b6d4;word-break:break-all;">' + data.wallet + '</code><br>' +
                      '<small style="color:#64748b;">Order: ' + data.order_id + '</small>';
                    statusEl.style.color = '#94a3b8';
                  } else {
                    statusEl.innerHTML = '⚠ Could not create invoice. <a href="mailto:support@humanbrowser.dev" style="color:#06b6d4;">Contact support</a>';
                    statusEl.style.color = '#ef4444';
                  }
                } catch (e) {
                  statusEl.textContent = '⚠ ' + (e.message || 'Unknown error');
                  statusEl.style.color = '#ef4444';
                } finally {
                  btn.disabled = false;
                  btn.textContent = '₿ Pay with Crypto';
                }
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0891b2, #6366f1)',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '0.75rem',
              }}
            >
              ₿ Pay with Crypto
            </button>

            <p id="ppr-status" style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', margin: 0, lineHeight: 1.5 }}></p>
          </div>

          {/* Agent API section */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '1rem' }}>Agent API</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
              AI agents can purchase credits and receive credentials programmatically — no human needed.
            </p>
            <pre style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '1.25rem', fontSize: '0.82rem', color: '#94a3b8', overflowX: 'auto', margin: 0 }}>{`# Step 1: Get payment address
curl -X POST https://humanbrowser.dev/api/ppr/quote \\
  -H "Content-Type: application/json" \\
  -d '{"requests": 1000, "currency": "USDTTRC"}'

# Step 2: Send USDT to returned wallet
# Step 3: Poll for confirmation
curl "https://humanbrowser.dev/api/ppr/status?order=ORDER_ID"

# Step 4: Get credentials
curl "https://humanbrowser.dev/api/ppr/creds?order=ORDER_ID"`}
            </pre>
          </div>

          {/* Footer note */}
          <div style={{ marginTop: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.82rem' }}>
            Credentials delivered automatically after on-chain confirmation · Questions? <a href="https://t.me/virixlabs" target="_blank" rel="noopener noreferrer" style={{ color: '#06b6d4' }}>@virixlabs</a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ppr-tier-card:hover { border-color: #334155 !important; }
        .ppr-cur-btn:hover { opacity: 0.85; }
      `}</style>
    </>
  );
}
