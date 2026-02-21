import React from 'react';
import Head from 'next/head';

export async function getServerSideProps({ query }) {
  const sessionId = query.session || query.inv || null;
  const method    = query.method || 'stripe';
  const orderId   = query.order  || null;
  const plan      = query.plan   || 'starter';

  // ── Crypto payment success (0xProcessing) ──────────────────
  if (method === 'crypto' && orderId) {
    // Try to fetch credentials from VPS (stored by webhook)
    let cryptoCreds = null;
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://humanbrowser.dev';
      const r = await fetch(`${baseUrl}/api/hb-creds?order_id=${encodeURIComponent(orderId)}`);
      const d = await r.json();
      if (d.ok && d.status === 'paid') cryptoCreds = d;
    } catch (_) {}

    return {
      props: {
        creds:    null,
        error:    null,
        sessionId: null,
        cryptoSuccess: true,
        cryptoCreds,
        orderId,
        plan,
      },
    };
  }

  if (!sessionId) {
    return { props: { error: 'No session found', creds: null, cryptoSuccess: false } };
  }

  try {
    // ── Stripe payment — retrieve credentials ───────────────
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://humanbrowser.dev';

    const res = await fetch(`${baseUrl}/api/credentials?session=${sessionId}`);
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    return { props: { creds: data, error: null, sessionId, cryptoSuccess: false } };
  } catch (e) {
    return { props: { creds: null, error: 'Loading credentials...', sessionId, cryptoSuccess: false } };
  }
}

export default function SuccessPage({ creds, error, sessionId, cryptoSuccess, cryptoCreds, orderId, plan }) {
  const [polling, setPolling] = React.useState(cryptoSuccess && !cryptoCreds);
  const [liveCreds, setLiveCreds] = React.useState(cryptoCreds);
  const [copied, setCopied] = React.useState({});

  const copy = (key, val) => {
    if (typeof navigator !== 'undefined') navigator.clipboard?.writeText(val);
    setCopied(p => ({ ...p, [key]: true }));
    setTimeout(() => setCopied(p => ({ ...p, [key]: false })), 1500);
  };

  React.useEffect(() => {
    if (!polling || liveCreds) return;
    const iv = setInterval(async () => {
      try {
        const r = await fetch(`/api/hb-creds?order_id=${encodeURIComponent(orderId)}`);
        const d = await r.json();
        if (d.ok && d.status === 'paid') { setLiveCreds(d); setPolling(false); }
      } catch (_) {}
    }, 4000);
    return () => clearInterval(iv);
  }, [polling, liveCreds, orderId]);

  // ── Crypto payment confirmed ────────────────────────────────
  if (cryptoSuccess) {
    const planNames = { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };
    const credData = liveCreds;

    return (
      <>
        <Head><title>Payment received — Human Browser</title></Head>
        <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif', padding: '2rem 1rem' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Payment received!</h1>
            <p style={{ color: '#888', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Your <strong style={{ color: '#6366f1' }}>{planNames[plan] || 'Human Browser'}</strong> plan is active.
            </p>

            {credData ? (
              /* ── Show credentials ───────────────────────────── */
              <>
                <div style={{ background: '#13131a', border: '1px solid #222', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>🔑 Your Proxy Credentials</h2>
                  {[
                    { label: 'PROXY_HOST', value: credData.proxy_host },
                    { label: 'PROXY_PORT', value: credData.proxy_port },
                    { label: 'PROXY_USER', value: credData.proxy_user },
                    { label: 'PROXY_PASS', value: credData.proxy_pass },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', background: '#0a0a0f', borderRadius: 8, padding: '0.6rem 0.85rem' }}>
                      <div>
                        <div style={{ color: '#888', fontSize: '0.68rem', fontFamily: 'monospace', marginBottom: '0.15rem' }}>{label}</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.82rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{value}</div>
                      </div>
                      <button onClick={() => copy(label, value)}
                        style={{ background: copied[label] ? '#22c55e22' : '#222', border: 'none', borderRadius: 6, color: copied[label] ? '#4ade80' : '#888', padding: '0.3rem 0.65rem', fontSize: '0.75rem', cursor: 'pointer', flexShrink: 0, marginLeft: '0.75rem', transition: 'all .2s' }}>
                        {copied[label] ? '✓' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#13131a', border: '1px solid #222', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🚀 Quick start</h2>
                  <pre style={{ background: '#0a0a0f', borderRadius: 8, padding: '1rem', color: '#a5b4fc', fontSize: '0.75rem', overflowX: 'auto', lineHeight: 1.7, margin: 0 }}>{`export PROXY_HOST=${credData.proxy_host}\nexport PROXY_PORT=${credData.proxy_port}\nexport PROXY_USER="${credData.proxy_user}"\nexport PROXY_PASS="${credData.proxy_pass}"\n\nclawhub install human-browser`}</pre>
                </div>
                <p style={{ color: '#555', fontSize: '0.78rem', marginBottom: '1rem' }}>
                  📌 Bookmark this page — your credentials are here.<br />
                  Order: <code style={{ color: '#64748b' }}>{orderId}</code>
                </p>
              </>
            ) : (
              /* ── Still waiting for on-chain confirmation ────── */
              <div style={{ background: '#13131a', border: '1px solid #222', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⏳</div>
                <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
                  Waiting for on-chain confirmation…<br />
                  <span style={{ color: '#555', fontSize: '0.85rem' }}>Credentials will appear here automatically. Keep this page open.</span>
                </p>
                <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '1rem', marginBottom: 0 }}>
                  Order: <code style={{ color: '#64748b' }}>{orderId}</code>
                </p>
              </div>
            )}

            <a href="https://t.me/virixlabs" target="_blank" rel="noopener noreferrer"
               style={{ display: 'inline-block', background: '#1e293b', color: '#06b6d4', textDecoration: 'none', borderRadius: 8, padding: '0.65rem 1.4rem', fontSize: '0.9rem', fontWeight: 600, border: '1px solid #334155' }}>
              💬 Contact support
            </a>
          </div>
        </div>
      </>
    );
  }

  // ── Stripe: still processing ────────────────────────────────
  if (error || !creds) {
    return (
      <>
        <Head><title>Processing payment — Human Browser</title></Head>
        <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ textAlign: 'center', color: '#fff', maxWidth: 480, padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Processing your payment…</h1>
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>This usually takes 10–30 seconds. Refresh in a moment.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Refresh ↻
            </button>
            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '2rem' }}>
              Questions? <a href="https://t.me/virixlabs" style={{ color: '#6366f1' }}>@virixlabs</a> on Telegram
            </p>
          </div>
        </div>
      </>
    );
  }

  const copyToClipboard = (text) => {
    if (typeof navigator !== 'undefined') navigator.clipboard?.writeText(text);
  };

  return (
    <>
      <Head>
        <title>Your credentials — Human Browser</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
            <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Payment successful!
            </h1>
            <p style={{ color: '#888', fontSize: '0.95rem' }}>
              Your <strong style={{ color: '#6366f1' }}>{creds.plan_name}</strong> is active. Credentials sent to <strong style={{ color: '#fff' }}>{creds.email || 'your email'}</strong>.
            </p>
          </div>

          {/* Credentials card */}
          <div style={{ background: '#13131a', border: '1px solid #222', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔑 Proxy Credentials
            </h2>
            {[
              { label: 'PROXY_HOST', value: creds.proxy_host || 'brd.superproxy.io' },
              { label: 'PROXY_PORT', value: creds.proxy_port || '22225' },
              { label: 'PROXY_USER', value: creds.proxy_user },
              { label: 'PROXY_PASS', value: creds.proxy_pass },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', background: '#0a0a0f', borderRadius: 8, padding: '0.6rem 0.85rem' }}>
                <div>
                  <div style={{ color: '#888', fontSize: '0.68rem', fontFamily: 'monospace', marginBottom: '0.15rem' }}>{label}</div>
                  <div style={{ color: '#e2e8f0', fontSize: '0.85rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{value}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(value)}
                  style={{ background: '#222', border: 'none', borderRadius: 6, color: '#888', padding: '0.3rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', flexShrink: 0, marginLeft: '0.75rem' }}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>

          {/* CDP URL */}
          {creds.cdp_url && (
            <div style={{ background: '#13131a', border: '1px solid #222', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>🌐 Browser CDP URL</h2>
              <div style={{ background: '#0a0a0f', borderRadius: 8, padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <code style={{ color: '#a5b4fc', fontSize: '0.75rem', wordBreak: 'break-all', lineHeight: 1.5 }}>{creds.cdp_url}</code>
                <button
                  onClick={() => copyToClipboard(creds.cdp_url)}
                  style={{ background: '#222', border: 'none', borderRadius: 6, color: '#888', padding: '0.3rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Quick start */}
          <div style={{ background: '#13131a', border: '1px solid #222', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>🚀 Quick Start</h2>
            <pre style={{ background: '#0a0a0f', borderRadius: 8, padding: '1rem', color: '#a5b4fc', fontSize: '0.78rem', overflowX: 'auto', lineHeight: 1.6 }}>{`# Set env vars
export PROXY_HOST=${creds.proxy_host || 'brd.superproxy.io'}
export PROXY_PORT=${creds.proxy_port || '22225'}
export PROXY_USER="${creds.proxy_user}"
export PROXY_PASS="${creds.proxy_pass}"

# Install skill
clawhub install human-browser`}</pre>
          </div>

          {/* Plan info + expiry */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 160, background: '#13131a', border: '1px solid #222', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#888', fontSize: '0.72rem', marginBottom: '0.3rem' }}>Plan</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{creds.plan_name || 'Starter'}</div>
            </div>
            <div style={{ flex: 1, minWidth: 160, background: '#13131a', border: '1px solid #222', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#888', fontSize: '0.72rem', marginBottom: '0.3rem' }}>Bandwidth</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{creds.bandwidth || '2GB'}/mo</div>
            </div>
            <div style={{ flex: 1, minWidth: 160, background: '#13131a', border: '1px solid #222', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#888', fontSize: '0.72rem', marginBottom: '0.3rem' }}>Valid until</div>
              <div style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.85rem' }}>
                {creds.expires_at ? new Date(creds.expires_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '30 days'}
              </div>
            </div>
          </div>

          {/* Support */}
          <div style={{ textAlign: 'center', color: '#555', fontSize: '0.82rem' }}>
            <p>Bookmark this page — your credentials are here. Also check your email.</p>
            <p style={{ marginTop: '0.5rem' }}>
              Need help? <a href="https://t.me/virixlabs" style={{ color: '#6366f1' }}>@virixlabs</a> on Telegram.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
