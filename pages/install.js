import Head from 'next/head';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "name": "How to Install Human Browser",
      "description": "Install Human Browser — the stealth Playwright browser with residential proxy for AI agents.",
      "url": "https://humanbrowser.dev/install",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Install via OpenClaw/ClawHub", "text": "Run: clawhub install human-browser" },
        { "@type": "HowToStep", "position": 2, "name": "Install via npm", "text": "Run: npm install human-browser" },
        { "@type": "HowToStep", "position": 3, "name": "Get proxy credentials", "text": "Purchase residential proxy credentials at humanbrowser.dev from $13.99/mo" },
        { "@type": "HowToStep", "position": 4, "name": "Launch the browser", "text": "Call launchHuman() in your Node.js code" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How do I install Human Browser?", "acceptedAnswer": { "@type": "Answer", "text": "Install Human Browser via npm (npm install human-browser), via OpenClaw (clawhub install human-browser), or via skild.sh (skild install al1enjesus/human-browser)." } },
        { "@type": "Question", "name": "Is Human Browser free?", "acceptedAnswer": { "@type": "Answer", "text": "The Human Browser script is 100% free and open source on GitHub. The paid part is the residential proxy credentials (starting at $13.99/mo) which give you a real home IP address." } },
        { "@type": "Question", "name": "What does Human Browser require?", "acceptedAnswer": { "@type": "Answer", "text": "Node.js, Playwright (npm install playwright && npx playwright install chromium), and a residential proxy subscription from humanbrowser.dev." } }
      ]
    }
  ]
};

export default function InstallPage() {
  return (
    <>
      <Head>
        <title>Install Human Browser — Stealth Playwright Browser | npm & OpenClaw</title>
        <meta name="description" content="Install Human Browser in seconds. npm install human-browser · clawhub install human-browser. Stealth Playwright browser with residential proxy from $13.99/mo." />
        <meta name="keywords" content="install human browser, human browser npm, human browser openClaw, human browser install guide, npm install human browser, clawhub human browser" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://humanbrowser.dev/install" />
        <meta property="og:title" content="Install Human Browser — 3 Ways" />
        <meta property="og:description" content="npm, OpenClaw, or skild.sh. Human Browser installs in seconds. Stealth Playwright browser with residential proxy." />
        <meta property="og:url" content="https://humanbrowser.dev/install" />
        <meta property="og:image" content="https://humanbrowser.dev/og-image.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}

const body = `
<style>
  .page-wrap { max-width: 860px; margin: 0 auto; padding: 0 1.5rem 5rem; font-family: 'Inter', sans-serif; color: #e8e8f0; }
  .page-nav { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 3.5rem; }
  .page-nav a { color: #a78bfa; text-decoration: none; font-size: 0.9rem; font-weight: 600; }
  .page-nav .logo { font-size: 1.1rem; font-weight: 800; color: #fff; }
  .page-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em; color: #a78bfa; text-transform: uppercase; margin-bottom: 0.8rem; }
  h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 1rem; }
  .page-lead { font-size: 1.1rem; color: rgba(255,255,255,0.6); line-height: 1.7; max-width: 580px; margin-bottom: 3rem; }
  .install-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 3rem; }
  .install-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 1.5rem; }
  .install-card.primary { border-color: rgba(167,139,250,0.4); background: rgba(167,139,250,0.05); }
  .install-card-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.4); margin-bottom: 0.5rem; }
  .install-card-label.rec { color: #a78bfa; }
  .install-card h3 { font-size: 1rem; font-weight: 700; color: #fff; margin: 0 0 1rem; }
  pre { background: #0a0a12; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 0.9rem 1rem; margin: 0; overflow-x: auto; cursor: pointer; }
  pre code { color: #c4b5fd; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; }
  .install-card-note { font-size: 0.78rem; color: rgba(255,255,255,0.35); margin-top: 0.75rem; }
  h2 { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 3rem 0 1rem; letter-spacing: -0.02em; }
  p { line-height: 1.75; color: rgba(255,255,255,0.68); margin: 0 0 1.2rem; }
  code { background: rgba(167,139,250,0.12); color: #c4b5fd; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.87em; font-family: 'JetBrains Mono', monospace; }
  .step-list { counter-reset: steps; list-style: none; padding: 0; margin: 0 0 2rem; }
  .step-list li { counter-increment: steps; display: flex; gap: 1rem; align-items: flex-start; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .step-list li:last-child { border-bottom: none; }
  .step-list li::before { content: counter(steps); background: #7c3aed; color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800; flex-shrink: 0; margin-top: 2px; }
  .step-list li div strong { display: block; color: #fff; font-size: 0.95rem; margin-bottom: 0.25rem; }
  .step-list li div span { color: rgba(255,255,255,0.5); font-size: 0.85rem; }
  .compat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.6rem; margin: 1rem 0 2rem; }
  .compat-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 0.7rem 0.9rem; font-size: 0.82rem; color: rgba(255,255,255,0.65); display: flex; align-items: center; gap: 0.4rem; }
  .compat-item .dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; flex-shrink: 0; }
  .cta-box { background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(167,139,250,0.06)); border: 1px solid rgba(139,92,246,0.25); border-radius: 16px; padding: 2rem 2.5rem; text-align: center; margin-top: 3rem; }
  .cta-box h3 { color: #fff; font-size: 1.2rem; margin: 0 0 0.5rem; }
  .cta-box p { color: rgba(255,255,255,0.5); font-size: 0.9rem; margin: 0 0 1.5rem; }
  .btn { display: inline-block; background: #7c3aed; color: #fff; padding: 0.7rem 1.75rem; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 0.95rem; margin: 0 0.4rem; }
  .btn.sec { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); }
  .faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 1.2rem 0; }
  .faq-item h3 { font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0 0 0.5rem; }
  .faq-item p { font-size: 0.88rem; color: rgba(255,255,255,0.55); margin: 0; }
  body { background: #050508; }
</style>

<div class="page-wrap">
  <nav class="page-nav">
    <a href="/" class="logo">Human Browser</a>
    <div style="display:flex;gap:1.5rem;align-items:center;">
      <a href="/blog">Blog</a>
      <a href="/" style="background:#7c3aed;color:#fff;padding:0.4rem 1rem;border-radius:6px;">Get Started →</a>
    </div>
  </nav>

  <div class="page-eyebrow">Installation</div>
  <h1>Install Human Browser</h1>
  <p class="page-lead">
    Human Browser is a free, open-source Playwright wrapper with residential proxy support. The script installs in seconds — pick your method below.
  </p>

  <div class="install-grid">
    <div class="install-card primary">
      <div class="install-card-label rec">⭐ Recommended · OpenClaw</div>
      <h3>AI Agent Install</h3>
      <pre onclick="navigator.clipboard.writeText(this.querySelector('code').textContent)"><code>clawhub install human-browser</code></pre>
      <div class="install-card-note">Installs skill + full context for AI agents. Tap to copy.</div>
    </div>
    <div class="install-card">
      <div class="install-card-label">npm</div>
      <h3>Node.js / npm</h3>
      <pre onclick="navigator.clipboard.writeText(this.querySelector('code').textContent)"><code>npm install human-browser</code></pre>
      <div class="install-card-note">Works in any Node.js project. Tap to copy.</div>
    </div>
    <div class="install-card">
      <div class="install-card-label">skild.sh · Multi-platform</div>
      <h3>Claude, Cursor, Copilot</h3>
      <pre onclick="navigator.clipboard.writeText(this.querySelector('code').textContent)"><code>skild install al1enjesus/human-browser</code></pre>
      <div class="install-card-note">Works across all major AI coding tools. Tap to copy.</div>
    </div>
    <div class="install-card">
      <div class="install-card-label">GitHub</div>
      <h3>Clone / Fork</h3>
      <pre onclick="navigator.clipboard.writeText(this.querySelector('code').textContent)"><code>git clone https://github.com/al1enjesus/human-browser</code></pre>
      <div class="install-card-note">Full source code. MIT license. Tap to copy.</div>
    </div>
  </div>

  <h2>Prerequisites</h2>
  <ol class="step-list">
    <li><div><strong>Node.js 18+</strong><span>Check with <code>node --version</code></span></div></li>
    <li><div><strong>Install Playwright + Chromium</strong><span><code>npm install playwright && npx playwright install chromium --with-deps</code></span></div></li>
    <li><div><strong>Get residential proxy credentials</strong><span>Purchase at <a href="https://humanbrowser.dev" style="color:#a78bfa;">humanbrowser.dev</a> — from $13.99/mo. Credentials arrive automatically after payment.</span></div></li>
    <li><div><strong>Add credentials to your environment</strong><span><code>PROXY_USER=... PROXY_PASS=... PROXY_HOST=brd.superproxy.io PROXY_PORT=22225</code></span></div></li>
  </ol>

  <h2>Quick start</h2>
  <pre style="border-radius:12px;padding:1.5rem;margin-bottom:2rem;"><code>const { launchHuman } = require('human-browser');

// Romania residential IP + iPhone 15 Pro fingerprint (default)
const { browser, page, humanType, humanScroll } = await launchHuman();

await page.goto('https://instagram.com', { waitUntil: 'domcontentloaded' });
await humanScroll(page, 'down');

// US residential IP + desktop Chrome fingerprint
const { page: usPage } = await launchHuman({ country: 'us', mobile: false });

// All supported options:
// country: 'ro' | 'us' | 'gb' | 'de' | 'nl' | 'jp' | 'fr' | 'ca' | 'sg' | 'au'
// mobile: true (iPhone 15 Pro) | false (Windows Chrome)</code></pre>

  <h2>Works with</h2>
  <div class="compat-grid">
    <div class="compat-item"><div class="dot"></div>OpenClaw</div>
    <div class="compat-item"><div class="dot"></div>Claude Code</div>
    <div class="compat-item"><div class="dot"></div>Cursor</div>
    <div class="compat-item"><div class="dot"></div>GitHub Copilot</div>
    <div class="compat-item"><div class="dot"></div>Docker</div>
    <div class="compat-item"><div class="dot"></div>GitHub Actions</div>
    <div class="compat-item"><div class="dot"></div>Railway</div>
    <div class="compat-item"><div class="dot"></div>Render</div>
    <div class="compat-item"><div class="dot"></div>Any Linux VPS</div>
    <div class="compat-item"><div class="dot"></div>LangChain</div>
    <div class="compat-item"><div class="dot"></div>AutoGPT</div>
    <div class="compat-item"><div class="dot"></div>Vercel (Serverless)</div>
  </div>

  <h2>FAQ</h2>
  <div class="faq-item">
    <h3>Is Human Browser free?</h3>
    <p>The script is 100% free and MIT-licensed. The paid part is the residential proxy credentials ($13.99/mo Starter) — a real home IP address that gets you past bot detection.</p>
  </div>
  <div class="faq-item">
    <h3>Does Human Browser work without a proxy?</h3>
    <p>The script itself works, but without a residential proxy your server's data center IP will be blocked by Cloudflare, Instagram, etc. The proxy is what makes it actually bypass detection.</p>
  </div>
  <div class="faq-item">
    <h3>How is Human Browser different from Playwright-stealth or puppeteer-extra?</h3>
    <p>Those plugins only handle fingerprint flags inside the browser. Human Browser also fixes the IP layer (residential proxy), adds human-like mouse/typing behavior, and is packaged as an AI agent skill. It's the complete solution.</p>
  </div>
  <div class="faq-item">
    <h3>Where are the proxy credentials stored?</h3>
    <p>In your environment variables. Human Browser reads PROXY_USER, PROXY_PASS, PROXY_HOST, PROXY_PORT from process.env. If you bought via the agent API, they're delivered via webhook.</p>
  </div>

  <div class="cta-box">
    <h3>Ready to install Human Browser?</h3>
    <p>Script is free. Residential proxy from $13.99/mo. Get started in under 5 minutes.</p>
    <a href="/" class="btn">Get Proxy Credentials →</a>
    <a href="https://github.com/al1enjesus/human-browser" target="_blank" rel="noopener noreferrer" class="btn sec">View on GitHub</a>
  </div>
</div>
`;
