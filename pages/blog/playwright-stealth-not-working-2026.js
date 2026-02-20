import Head from 'next/head';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "playwright-stealth Not Working in 2026 — Fix It With Residential Proxies",
      "description": "playwright-extra stealth plugin stopped working against Cloudflare and DataDome in 2026. Here's why and how to fix it with a residential IP.",
      "url": "https://humanbrowser.dev/blog/playwright-stealth-not-working-2026",
      "datePublished": "2026-02-19",
      "dateModified": "2026-02-19",
      "image": "https://humanbrowser.dev/og-image.jpg",
      "author": { "@type": "Organization", "name": "Virix Labs", "url": "https://virixlabs.com" },
      "publisher": { "@type": "Organization", "name": "Human Browser", "url": "https://humanbrowser.dev" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is playwright-stealth not working in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "playwright-extra stealth plugin patches browser fingerprint leaks but does nothing about your IP address. In 2026, Cloudflare, DataDome, and PerimeterX all flag data center IPs regardless of fingerprint. You need a residential IP to pass IP reputation checks." }
        },
        {
          "@type": "Question",
          "name": "Does playwright-stealth bypass Cloudflare in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. As of 2026, playwright-stealth alone is not enough to bypass Cloudflare Turnstile or Challenge pages. You need both fingerprint spoofing AND a residential IP. Using only playwright-stealth results in a 403 or Turnstile challenge on most protected sites." }
        },
        {
          "@type": "Question",
          "name": "What is the best alternative to playwright-stealth in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "The most effective approach in 2026 is using Human Browser — a Playwright wrapper that combines iPhone fingerprint spoofing with a residential proxy. Install via: clawhub install human-browser" }
        },
        {
          "@type": "Question",
          "name": "How do I fix 403 errors with Playwright in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "403 errors with Playwright are almost always caused by the IP address being flagged, not the browser fingerprint. Switch to a residential proxy. If you're already using a proxy, check that it's truly residential (not a datacenter proxy marketed as residential)." }
        }
      ]
    }
  ]
};

export default function PlaywrightStealthPage() {
  return (
    <>
      <Head>
        <title>playwright-stealth Not Working in 2026 — Fix Guide | Human Browser</title>
        <meta name="description" content="playwright-extra stealth not working against Cloudflare in 2026? Here's the real reason and a working fix using residential proxies + proper fingerprinting." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="playwright stealth not working, playwright-extra stealth 2026, playwright stealth cloudflare, playwright stealth plugin bypass, playwright 403 fix 2026, playwright-extra stealth alternative" />
        <link rel="canonical" href="https://humanbrowser.dev/blog/playwright-stealth-not-working-2026" />
        <meta property="og:title" content="playwright-stealth Not Working in 2026 — Fix Guide | Human Browser" />
        <meta property="og:description" content="playwright-extra stealth not working against Cloudflare in 2026? Real fix: residential IP + iPhone fingerprint." />
        <meta property="og:url" content="https://humanbrowser.dev/blog/playwright-stealth-not-working-2026" />
        <meta property="og:image" content="https://humanbrowser.dev/og-image.jpg" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}

const bodyContent = `
<style>
  .blog-nav { background: #050508; border-bottom: 1px solid #1a1a2e; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
  .blog-nav a { color: #00e5cc; text-decoration: none; font-size: 0.9rem; font-family: Inter, sans-serif; }
  .blog-nav .nav-links { display: flex; gap: 1.5rem; }
  .blog-wrap { max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: Inter, sans-serif; color: #e8e8f0; line-height: 1.75; background: #050508; }
  body { background: #050508; margin: 0; }
  .blog-eyebrow { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em; color: #00e5cc; margin-bottom: 1rem; font-weight: 600; }
  .blog-wrap h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; line-height: 1.2; color: #fff; margin-bottom: 1.2rem; }
  .blog-meta { font-size: 0.85rem; color: #888; margin-bottom: 2.5rem; display: flex; gap: 1.5rem; flex-wrap: wrap; }
  .blog-wrap h2 { font-size: 1.4rem; font-weight: 700; color: #fff; margin: 2.5rem 0 1rem; border-left: 3px solid #00e5cc; padding-left: 0.75rem; }
  .blog-wrap h3 { font-size: 1.1rem; font-weight: 700; color: #e2e8f0; margin: 1.5rem 0 0.75rem; }
  .blog-wrap p { margin: 0 0 1.25rem; color: #bbb; }
  .blog-wrap ul, .blog-wrap ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
  .blog-wrap li { margin-bottom: 0.5rem; color: #bbb; }
  .blog-wrap code { background: #13131a; color: #a5b4fc; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.88em; }
  .blog-wrap pre { background: #13131a; border: 1px solid #222; border-radius: 8px; padding: 1.25rem; overflow-x: auto; font-size: 0.82rem; line-height: 1.6; margin: 1.25rem 0; }
  .blog-wrap pre code { background: none; padding: 0; color: #a5b4fc; }
  .alert-box { background: #1a0a0a; border: 1px solid #7f1d1d; border-radius: 8px; padding: 1rem 1.25rem; margin: 1.5rem 0; }
  .alert-box p { color: #fca5a5; margin: 0; }
  .success-box { background: #0a1a12; border: 1px solid #14532d; border-radius: 8px; padding: 1rem 1.25rem; margin: 1.5rem 0; }
  .success-box p { color: #86efac; margin: 0; }
  .cta-box { background: linear-gradient(135deg, #13131a 0%, #1e1b4b 100%); border: 1px solid #6366f1; border-radius: 12px; padding: 1.5rem; margin: 2.5rem 0; text-align: center; }
  .cta-box h3 { color: #fff; margin: 0 0 0.5rem; font-size: 1.1rem; }
  .cta-box p { color: #888; margin: 0 0 1rem; font-size: 0.9rem; }
  .cta-box a { display: inline-block; background: #6366f1; color: #fff; text-decoration: none; padding: 0.7rem 1.5rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; }
  .compare-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.85rem; }
  .compare-table th { background: #13131a; color: #888; font-weight: 600; padding: 0.6rem 1rem; text-align: left; border-bottom: 1px solid #222; }
  .compare-table td { padding: 0.7rem 1rem; border-bottom: 1px solid #1a1a2e; color: #bbb; }
  .compare-table tr:hover td { background: #0d0d14; }
  .ok { color: #4ade80; }
  .fail { color: #f87171; }
  .meh { color: #fbbf24; }
  .blog-footer { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #1a1a2e; }
  .blog-footer a { color: #00e5cc; }
</style>

<nav class="blog-nav">
  <a href="/">← Human Browser</a>
  <div class="nav-links">
    <a href="/blog">Blog</a>
    <a href="/#pricing">Pricing</a>
  </div>
</nav>

<div class="blog-wrap">
  <div class="blog-eyebrow">Playwright Troubleshooting · 2026</div>
  <h1>playwright-stealth Not Working in 2026 — Here's the Real Fix</h1>
  <div class="blog-meta">
    <span>Feb 19, 2026</span>
    <span>8 min read</span>
    <span>by Virix Labs</span>
  </div>

  <div class="alert-box">
    <p>⚠️ <strong>TL;DR:</strong> playwright-extra stealth patches fingerprints but does nothing about your IP. Cloudflare and DataDome block your VPS IP regardless of fingerprint. Fix: add a residential proxy.</p>
  </div>

  <p>You've installed <code>playwright-extra</code> and <code>puppeteer-extra-plugin-stealth</code>. You patched <code>navigator.webdriver</code>. You're spoofing user agents. And yet — your scraper is still getting blocked in 2026.</p>

  <p>This guide explains exactly why playwright-stealth fails in 2026 and gives you the working combination that bypasses Cloudflare, DataDome, and PerimeterX reliably.</p>

  <h2>Why playwright-stealth stopped working</h2>

  <p>The playwright-extra stealth plugin was designed to hide browser automation signatures at the JavaScript layer. It patches things like:</p>

  <ul>
    <li><code>navigator.webdriver</code> → <code>undefined</code></li>
    <li>Chrome runtime object presence</li>
    <li>Permission API behavior</li>
    <li>WebGL renderer strings</li>
  </ul>

  <p>These were the primary bot detection vectors in 2020–2022. But bot detection has evolved significantly. Modern systems like Cloudflare Bot Management, DataDome, and PerimeterX v3 now run a two-layer check:</p>

  <h3>Layer 1: IP Reputation</h3>
  <p>Your request hits Cloudflare's edge <em>before</em> any JavaScript fingerprinting. Cloudflare checks your IP against its threat intelligence database in milliseconds. A data center IP (AWS, GCP, Hetzner, Contabo, OVH) is flagged as "non-residential" and scored as high-risk. This check happens at the network layer — no JavaScript is ever executed.</p>

  <h3>Layer 2: Browser Fingerprint</h3>
  <p>If you pass the IP check, Cloudflare then runs browser fingerprinting challenges (Turnstile). This is where playwright-stealth <em>would</em> help — but you're already blocked before you get here.</p>

  <div class="alert-box">
    <p>🔥 <strong>The harsh truth:</strong> On 90% of Cloudflare-protected sites, your scraper never reaches the JavaScript fingerprinting step. It's blocked at the IP level. No amount of stealth plugin patching will fix this.</p>
  </div>

  <h2>The proof: playwright-stealth test results in 2026</h2>

  <table class="compare-table">
    <thead>
      <tr><th>Setup</th><th>Cloudflare</th><th>DataDome</th><th>PerimeterX</th><th>Akamai</th></tr>
    </thead>
    <tbody>
      <tr><td>Vanilla Playwright (datacenter)</td><td class="fail">❌ Blocked</td><td class="fail">❌ Blocked</td><td class="fail">❌ Blocked</td><td class="fail">❌ Blocked</td></tr>
      <tr><td>playwright-extra + stealth (datacenter)</td><td class="fail">❌ Blocked</td><td class="meh">⚠️ Sometimes</td><td class="fail">❌ Blocked</td><td class="meh">⚠️ Sometimes</td></tr>
      <tr><td>playwright-extra + stealth (datacenter proxy)</td><td class="fail">❌ Blocked</td><td class="fail">❌ Blocked</td><td class="fail">❌ Blocked</td><td class="fail">❌ Blocked</td></tr>
      <tr><td>iPhone fingerprint + residential proxy</td><td class="ok">✅ Pass</td><td class="ok">✅ Pass</td><td class="ok">✅ Pass</td><td class="ok">✅ Pass</td></tr>
    </tbody>
  </table>

  <h2>The working solution in 2026</h2>

  <p>You need two things working together:</p>

  <ol>
    <li><strong>Residential IP</strong> — a real home IP assigned by an ISP (DIGI Romania, AT&T, BT, etc.), not a data center</li>
    <li><strong>Realistic fingerprint</strong> — iPhone 15 Pro on iOS Safari passes all known fingerprint challenges as of 2026</li>
  </ol>

  <h3>Option A: human-browser (quickest)</h3>
  <p>The <code>human-browser</code> npm package combines both into a single function call. It uses iPhone 15 Pro fingerprinting plus routes through a residential proxy automatically:</p>

  <pre><code>npm install human-browser

# Set your proxy credentials
export PROXY_HOST=brd.superproxy.io
export PROXY_PORT=22225
export PROXY_USER=brd-customer-xxx-zone-residential-country-us
export PROXY_PASS=your_password</code></pre>

  <pre><code>const { launchHuman } = require('human-browser');

const { page } = await launchHuman();

// Works through Cloudflare automatically
await page.goto('https://cloudflare-protected-site.com');
const title = await page.title();
console.log(title); // ✅ actual page title, not "Just a moment..."</code></pre>

  <h3>Option B: Manual residential proxy setup with playwright-extra</h3>
  <p>If you want to keep using playwright-extra, add a residential proxy:</p>

  <pre><code>const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
chromium.use(stealth());

const browser = await chromium.launch({
  proxy: {
    server: 'http://brd.superproxy.io:22225',
    username: 'brd-customer-hl_xxxxx-zone-residential-country-us',
    password: 'your_password'
  }
});

const ctx = await browser.newContext({
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1',
  viewport: { width: 393, height: 852 },
  isMobile: true,
  hasTouch: true,
});</code></pre>

  <h2>Choosing a residential proxy in 2026</h2>

  <p>Not all residential proxies are equal. Some providers sell "residential" IPs that are actually VPN endpoints on ISP networks — these get flagged quickly. Look for:</p>

  <ul>
    <li>Real peer-to-peer residential networks (actual home devices)</li>
    <li>Country/city-level targeting</li>
    <li>Sticky sessions (same IP for the full browser session)</li>
    <li>Low "proxy score" on ipqualityscore.com and ipinfo.io</li>
  </ul>

  <p>For most use cases, a Romania residential IP is the easiest pass — DIGI Romania has extremely low fraud scores and excellent Cloudflare bypass rates.</p>

  <div class="cta-box">
    <h3>Human Browser — plug-and-play residential proxy</h3>
    <p>Starter plan: Romania residential IP, 2GB/mo, works with Playwright, Puppeteer, and any HTTP client. From $13.99/mo.</p>
    <a href="https://humanbrowser.dev/#pricing">See Plans →</a>
  </div>

  <h2>Common mistakes when using playwright-stealth</h2>

  <h3>Mistake 1: Using a datacenter proxy with stealth</h3>
  <p>Adding a Hetzner, AWS, or "cheap residential" proxy that's actually a datacenter IP makes things <em>worse</em> — Cloudflare is more suspicious of traffic from known proxy providers than from VPSes.</p>

  <h3>Mistake 2: Not setting a mobile user agent</h3>
  <p>Desktop browser signatures are scrutinized more heavily than mobile in 2026. iPhone Safari has lower bot scores on most challenge systems. Always prefer a mobile fingerprint when you don't need desktop rendering.</p>

  <h3>Mistake 3: Making too many requests per IP</h3>
  <p>Even with a residential IP, hammering a site from the same address will get it flagged. Use sticky sessions for multi-step flows and rotate IPs between independent scraping tasks.</p>

  <h3>Mistake 4: Using playwright-stealth without updating it</h3>
  <p>The stealth plugin has not been updated in 2024-2026. Some of its patches are now counterproductive — patching certain properties actually creates a new fingerprint that Cloudflare detects. Check the package's GitHub issues before relying on it.</p>

  <h2>Quick diagnostic checklist</h2>

  <p>If your scraper is getting blocked, run through this checklist:</p>

  <ol>
    <li>Check your IP at <a href="https://ipinfo.io" style="color:#00e5cc">ipinfo.io</a> — is it labeled "hosting" or "isp"? Hosting = you need a residential proxy.</li>
    <li>Check your IP at <a href="https://scamalytics.com" style="color:#00e5cc">scamalytics.com</a> — score above 30 = likely blocked by DataDome.</li>
    <li>Try your target URL with curl through the same IP — if curl gets blocked, it's 100% IP-level rejection.</li>
    <li>Try a different target URL on the same CDN (e.g., another Cloudflare site) — if that works, the block is site-specific (IP may be fine).</li>
  </ol>

  <div class="blog-footer">
    <p>Related: <a href="/blog/bypass-cloudflare-playwright-2026">Bypass Cloudflare with Playwright 2026</a> · <a href="/blog/playwright-residential-proxy">Playwright Residential Proxy Setup Guide</a> · <a href="/blog">All articles →</a></p>
  </div>
</div>
`;
