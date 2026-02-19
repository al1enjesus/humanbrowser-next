import Head from 'next/head';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Use Playwright with Residential Proxy in 2026",
      "description": "Set up Playwright with a residential proxy in 2026. Authentication, country selection, iPhone fingerprint. Complete code examples.",
      "url": "https://humanbrowser.dev/blog/playwright-residential-proxy",
      "datePublished": "2026-02-19",
      "dateModified": "2026-02-19",
      "image": "https://humanbrowser.dev/og-image.jpg",
      "author": { "@type": "Organization", "name": "Virix Labs", "url": "https://virixlabs.com" },
      "publisher": { "@type": "Organization", "name": "Human Browser", "url": "https://humanbrowser.dev" }
    },
    {
      "@type": "HowTo",
      "name": "How to set up Playwright with a residential proxy in 2026",
      "step": [
        { "@type": "HowToStep", "name": "Install human-browser", "text": "Run npm install human-browser in your project directory." },
        { "@type": "HowToStep", "name": "Get residential proxy credentials", "text": "Subscribe at humanbrowser.dev from $13.99/mo to get your proxy username and password." },
        { "@type": "HowToStep", "name": "Set environment variables", "text": "Add PROXY_USER, PROXY_PASS, PROXY_HOST, PROXY_PORT to your .env file." },
        { "@type": "HowToStep", "name": "Launch browser with launchHuman()", "text": "Use const { page } = await launchHuman({ country: 'ro' }) to start a browser with residential IP." }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I add a proxy to Playwright?",
          "acceptedAnswer": { "@type": "Answer", "text": "Use the proxy option in chromium.launch() or newContext(). For residential proxies with authentication, pass server, username, and password. The human-browser package handles this automatically with launchHuman()." }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a datacenter proxy and a residential proxy in Playwright?",
          "acceptedAnswer": { "@type": "Answer", "text": "A datacenter proxy routes your traffic through a server farm. Sites like Cloudflare, Instagram, and LinkedIn instantly detect and block these. A residential proxy routes through a real home internet connection — it's indistinguishable from a normal user browsing from their home." }
        },
        {
          "@type": "Question",
          "name": "Which countries work best for Playwright residential proxy?",
          "acceptedAnswer": { "@type": "Answer", "text": "Romania is the most cost-effective and works for most use cases. US IPs work well for US-specific content. UK IPs are useful for geo-locked content. Human Browser supports RO, US, UK, DE, NL, and JP." }
        },
        {
          "@type": "Question",
          "name": "Does Playwright support proxy authentication?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Playwright supports proxy authentication via the proxy.username and proxy.password fields in the context options. The human-browser package sets this up automatically from environment variables." }
        }
      ]
    }
  ]
};

export default function PlaywrightResidentialProxyPage() {
  return (
    <>
      <Head>
        <title>Playwright with Residential Proxy: Setup Guide 2026 | Human Browser</title>
        <meta name="description" content="Set up Playwright with a residential proxy in 2026. Authentication, country selection, iPhone fingerprint. Complete code examples." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="playwright residential proxy, playwright proxy setup, playwright proxy authentication 2026, playwright proxy configuration, residential proxy playwright" />
        <link rel="canonical" href="https://humanbrowser.dev/blog/playwright-residential-proxy" />
        <meta property="og:title" content="Playwright with Residential Proxy: Setup Guide 2026 | Human Browser" />
        <meta property="og:description" content="Set up Playwright with a residential proxy in 2026. Authentication, country selection, iPhone fingerprint. Complete code examples." />
        <meta property="og:url" content="https://humanbrowser.dev/blog/playwright-residential-proxy" />
        <meta property="og:image" content="https://humanbrowser.dev/og-image.jpg" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Playwright with Residential Proxy: Setup Guide 2026" />
        <meta name="twitter:image" content="https://humanbrowser.dev/og-image.jpg" />
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
  .blog-nav a:hover { text-decoration: underline; }
  .blog-nav .nav-links { display: flex; gap: 1.5rem; }
  .blog-wrap { max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: Inter, sans-serif; color: #e8e8f0; line-height: 1.75; }
  .blog-eyebrow { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em; color: #00e5cc; margin-bottom: 1rem; font-weight: 600; }
  .blog-wrap h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.2; color: #fff; margin-bottom: 1.2rem; }
  .blog-meta { font-size: 0.85rem; color: #888; margin-bottom: 2.5rem; display: flex; gap: 1.5rem; flex-wrap: wrap; }
  .blog-wrap h2 { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 2.5rem 0 1rem; border-left: 3px solid #00e5cc; padding-left: 0.75rem; }
  .blog-wrap h3 { font-size: 1.1rem; font-weight: 600; color: #e0e0f0; margin: 1.5rem 0 0.5rem; }
  .blog-wrap p { margin-bottom: 1.2rem; color: #c8c8d8; }
  .blog-wrap ul, .blog-wrap ol { margin: 1rem 0 1.5rem 1.5rem; color: #c8c8d8; }
  .blog-wrap li { margin-bottom: 0.5rem; }
  .blog-wrap a { color: #00e5cc; text-decoration: none; }
  .blog-wrap a:hover { text-decoration: underline; }
  .code-block { background: #0a0a12; border: 1px solid #1e1e3a; border-radius: 10px; padding: 1.5rem; margin: 1.5rem 0; overflow-x: auto; }
  .code-block pre { margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; line-height: 1.7; color: #c8c8d8; }
  .code-block .kw { color: #c792ea; }
  .code-block .str { color: #c3e88d; }
  .code-block .cm { color: #546e7a; font-style: italic; }
  .code-block .fn { color: #82aaff; }
  .code-block .num { color: #f78c6c; }
  .code-label { font-size: 0.75rem; color: #555; font-family: 'JetBrains Mono', monospace; margin-bottom: 0.4rem; }
  .cta-box { background: linear-gradient(135deg, #0d1b2a 0%, #0a1628 100%); border: 1px solid #00e5cc33; border-radius: 12px; padding: 2rem; margin: 2.5rem 0; text-align: center; }
  .cta-box h3 { color: #fff; margin: 0 0 0.75rem; font-size: 1.3rem; }
  .cta-box p { color: #aaa; margin: 0 0 1.25rem; }
  .cta-btn { display: inline-block; background: #00e5cc; color: #050508; font-weight: 700; padding: 0.8rem 2rem; border-radius: 8px; text-decoration: none; font-size: 0.95rem; transition: opacity 0.2s; }
  .cta-btn:hover { opacity: 0.85; text-decoration: none; }
  .country-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
  .country-table th { background: #0f0f1a; color: #fff; padding: 0.75rem 1rem; text-align: left; border-bottom: 2px solid #1e1e3a; }
  .country-table td { padding: 0.7rem 1rem; border-bottom: 1px solid #1a1a2e; color: #c8c8d8; }
  .country-table .good { color: #4ade80; }
  .country-table .ok { color: #fbbf24; }
  .country-table .bad { color: #f87171; }
  .error-box { background: #12080a; border: 1px solid #7f1d1d; border-radius: 8px; padding: 1rem 1.25rem; margin: 1rem 0; }
  .error-box .error-label { color: #f87171; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-bottom: 0.5rem; font-weight: 600; }
  .error-box .error-fix { color: #6ee7b7; font-size: 0.85rem; margin-top: 0.5rem; }
  .faq-block { margin: 2rem 0; }
  .faq-block details { border: 1px solid #1e1e3a; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 0.75rem; background: #0a0a12; }
  .faq-block summary { cursor: pointer; font-weight: 600; color: #e0e0f0; font-size: 0.95rem; list-style: none; }
  .faq-block summary::-webkit-details-marker { display: none; }
  .faq-block summary::before { content: '+ '; color: #00e5cc; }
  .faq-block details[open] summary::before { content: '− '; }
  .faq-block details p { margin: 0.75rem 0 0; color: #aaa; font-size: 0.92rem; }
  .tip-box { background: #0a1a12; border: 1px solid #064e3b; border-radius: 8px; padding: 1rem 1.25rem; margin: 1.5rem 0; font-size: 0.9rem; color: #6ee7b7; }
  .tip-box strong { color: #34d399; }
  .steps-list { counter-reset: step-counter; list-style: none; margin: 1rem 0 1.5rem; padding: 0; }
  .steps-list li { counter-increment: step-counter; display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.25rem; }
  .steps-list li::before { content: counter(step-counter); background: #00e5cc; color: #050508; font-weight: 800; font-size: 0.85rem; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.1rem; }
  .steps-list li div { color: #c8c8d8; }
  .steps-list li strong { color: #fff; }
  .related-posts { margin: 3rem 0; padding-top: 2rem; border-top: 1px solid #1e1e3a; }
  .related-posts h3 { color: #fff; font-size: 1.1rem; margin-bottom: 1rem; }
  .related-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
  .related-card { background: #0a0a12; border: 1px solid #1e1e3a; border-radius: 10px; padding: 1.25rem; text-decoration: none; transition: border-color 0.2s; }
  .related-card:hover { border-color: #00e5cc; text-decoration: none; }
  .related-card .rc-tag { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: #00e5cc; margin-bottom: 0.4rem; }
  .related-card h4 { color: #fff; font-size: 0.9rem; margin: 0; font-weight: 600; }
  .blog-footer { background: #050508; border-top: 1px solid #1a1a2e; padding: 2rem; text-align: center; font-family: Inter, sans-serif; }
  .blog-footer a { color: #00e5cc; text-decoration: none; margin: 0 0.75rem; font-size: 0.85rem; }
  .blog-footer p { color: #555; font-size: 0.8rem; margin-top: 1rem; }
</style>

<nav class="blog-nav">
  <a href="https://humanbrowser.dev" style="font-weight:700;font-size:1rem;">⬅ Human Browser</a>
  <div class="nav-links">
    <a href="/blog">Blog</a>
    <a href="https://humanbrowser.dev/#pricing">Pricing</a>
    <a href="https://t.me/virixlabs" target="_blank" rel="noopener noreferrer">Support</a>
  </div>
</nav>

<div class="blog-wrap">
  <div class="blog-eyebrow">Playwright · Residential Proxy · Setup Guide</div>
  <h1>How to Use Playwright with Residential Proxy in 2026</h1>
  <div class="blog-meta">
    <span>📅 February 19, 2026</span>
    <span>⏱ 6 min read</span>
    <span>👤 Virix Labs</span>
  </div>

  <p>Using a residential proxy with Playwright is no longer optional for serious web scraping in 2026. Anti-bot systems have gotten good enough that a data center IP — no matter how well you spoof the browser — will get blocked. This guide covers the complete setup: authentication, country selection, fingerprint matching, and common errors with fixes.</p>

  <p>We'll use the <a href="https://humanbrowser.dev">human-browser</a> package which handles all the proxy wiring and fingerprint setup automatically. If you just want to wire up the proxy yourself, we cover the raw Playwright proxy config too.</p>

  <h2>Why You Need a Residential Proxy with Playwright</h2>

  <p>Every time you make an HTTP request from a VPS, your IP address comes from an ASN (Autonomous System Number) that identifies your traffic as originating from a data center. Cloudflare, Meta, LinkedIn, and dozens of other services maintain real-time databases of these ASNs and block them automatically.</p>

  <p>A residential proxy routes your traffic through a real home internet connection — someone's Comcast, DIGI Romania, or BT broadband. To any website, your traffic looks indistinguishable from a real person sitting at home browsing the web.</p>

  <p>In 2026, here's what happens without a residential proxy:</p>
  <ul>
    <li><strong>Cloudflare:</strong> Challenge page or 403 within 1–2 seconds</li>
    <li><strong>Instagram:</strong> Rate limit and account flag within minutes</li>
    <li><strong>LinkedIn:</strong> CAPTCHA or block after first request</li>
    <li><strong>Most modern SaaS sites:</strong> Silent 403 or empty response</li>
  </ul>

  <h2>Data Center IP vs Residential IP: The Real Difference</h2>

  <p>It's not just about IP reputation. There are several signals that distinguish data center traffic from residential traffic:</p>

  <ul>
    <li><strong>ASN classification:</strong> AWS (AS16509), Hetzner (AS24940), DigitalOcean (AS14061) are instantly flagged</li>
    <li><strong>IP history:</strong> Data center IPs are shared across thousands of users and accumulate bad reputation</li>
    <li><strong>Reverse DNS:</strong> Data center IPs often resolve to hostnames like <code>ec2-xxx.compute.amazonaws.com</code></li>
    <li><strong>Connection patterns:</strong> Data center connections have lower latency variance and higher throughput than residential connections</li>
    <li><strong>Geolocation mismatch:</strong> A browser claiming to be in Bucharest but connecting from a Frankfurt Hetzner node raises flags</li>
  </ul>

  <p>A good residential proxy solves all of these at once. The IP genuinely belongs to a home ISP and has a clean history.</p>

  <h2>How to Configure Playwright Proxy Authentication</h2>

  <h3>Option A: Using human-browser (recommended)</h3>
  <p>The <code>human-browser</code> package handles all proxy configuration automatically, including authentication, fingerprint matching, and human behavior simulation:</p>

  <div class="code-label">install</div>
  <div class="code-block"><pre>npm install human-browser</pre></div>

  <div class="code-label">scraper.js</div>
  <div class="code-block"><pre><span class="kw">const</span> { <span class="fn">launchHuman</span> } = <span class="kw">require</span>(<span class="str">'human-browser'</span>);

<span class="cm">// Proxy credentials set via environment variables:</span>
<span class="cm">// PROXY_USER, PROXY_PASS, PROXY_HOST, PROXY_PORT</span>

<span class="kw">const</span> { browser, page, humanScroll } = <span class="kw">await</span> <span class="fn">launchHuman</span>({
  country: <span class="str">'ro'</span>,   <span class="cm">// Romania residential IP</span>
  mobile: <span class="kw">true</span>    <span class="cm">// iPhone 15 Pro fingerprint</span>
});

<span class="kw">await</span> page.<span class="fn">goto</span>(<span class="str">'https://example.com'</span>);
<span class="kw">await</span> <span class="fn">humanScroll</span>(page, <span class="str">'down'</span>);
<span class="kw">await</span> browser.<span class="fn">close</span>();</pre></div>

  <h3>Option B: Raw Playwright proxy configuration</h3>
  <p>If you want to wire up the proxy manually without the human-browser abstraction:</p>

  <div class="code-label">raw-proxy.js</div>
  <div class="code-block"><pre><span class="kw">const</span> { chromium } = <span class="kw">require</span>(<span class="str">'playwright'</span>);

<span class="kw">const</span> browser = <span class="kw">await</span> chromium.<span class="fn">launch</span>({
  headless: <span class="kw">true</span>,
  proxy: {
    server: <span class="str">'http://brd.superproxy.io:22225'</span>,
    username: process.env.PROXY_USER,
    password: process.env.PROXY_PASS
  }
});

<span class="kw">const</span> context = <span class="kw">await</span> browser.<span class="fn">newContext</span>({
  userAgent: <span class="str">'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15'</span>,
  viewport: { width: <span class="num">393</span>, height: <span class="num">852</span> },
  deviceScaleFactor: <span class="num">3</span>,
  isMobile: <span class="kw">true</span>,
  hasTouch: <span class="kw">true</span>,
  locale: <span class="str">'ro-RO'</span>,
  timezoneId: <span class="str">'Europe/Bucharest'</span>,
  geolocation: { latitude: <span class="num">44.4268</span>, longitude: <span class="num">26.1025</span> },
  permissions: [<span class="str">'geolocation'</span>]
});

<span class="kw">const</span> page = <span class="kw">await</span> context.<span class="fn">newPage</span>();
<span class="kw">await</span> page.<span class="fn">goto</span>(<span class="str">'https://example.com'</span>);
<span class="kw">await</span> browser.<span class="fn">close</span>();</pre></div>

  <div class="tip-box">
    <strong>💡 Pro tip:</strong> The raw Playwright approach still uses a data center IP with residential proxy routing, but without <code>webdriver=false</code> and other anti-detection patches, you'll fail fingerprint checks. Human Browser handles all 12+ anti-detection signals automatically.
  </div>

  <h2>Multi-Country Setup (Romania, US, UK, Germany, Japan)</h2>

  <p>Different websites work better with different country IPs. Here's a compatibility overview for 2026:</p>

  <table class="country-table">
    <tr>
      <th>Country</th>
      <th>Cloudflare Sites</th>
      <th>Instagram</th>
      <th>LinkedIn</th>
      <th>Price Tier</th>
    </tr>
    <tr>
      <td>🇷🇴 Romania</td>
      <td class="good">✅ Excellent</td>
      <td class="good">✅ Excellent</td>
      <td class="good">✅ Good</td>
      <td>Starter ($13.99)</td>
    </tr>
    <tr>
      <td>🇺🇸 USA</td>
      <td class="good">✅ Excellent</td>
      <td class="ok">⚠️ Rate limited faster</td>
      <td class="good">✅ Excellent</td>
      <td>Pro ($49.99)</td>
    </tr>
    <tr>
      <td>🇬🇧 UK</td>
      <td class="good">✅ Excellent</td>
      <td class="ok">⚠️ Good</td>
      <td class="good">✅ Excellent</td>
      <td>Pro ($49.99)</td>
    </tr>
    <tr>
      <td>🇩🇪 Germany</td>
      <td class="good">✅ Excellent</td>
      <td class="ok">⚠️ Good</td>
      <td class="good">✅ Good</td>
      <td>Pro ($49.99)</td>
    </tr>
    <tr>
      <td>🇯🇵 Japan</td>
      <td class="good">✅ Excellent</td>
      <td class="ok">⚠️ Good</td>
      <td class="ok">⚠️ Good</td>
      <td>Pro ($49.99)</td>
    </tr>
  </table>

  <p>Romania is the best value option — the cheapest plan and one of the cleanest residential IP pools. It works for almost every use case. For US-specific content or LinkedIn scraping, US IPs are worth the upgrade.</p>

  <h2>Working Code Examples</h2>

  <h3>Instagram with Romanian IP</h3>
  <div class="code-label">instagram.js</div>
  <div class="code-block"><pre><span class="kw">const</span> { <span class="fn">launchHuman</span> } = <span class="kw">require</span>(<span class="str">'human-browser'</span>);

<span class="kw">async function</span> <span class="fn">scrapeInstagram</span>(username) {
  <span class="kw">const</span> { browser, page, humanRead, humanScroll } = <span class="kw">await</span> <span class="fn">launchHuman</span>({
    country: <span class="str">'ro'</span>,
    mobile: <span class="kw">true</span>
  });

  <span class="kw">try</span> {
    <span class="kw">await</span> page.<span class="fn">goto</span>(<span class="str">\`https://www.instagram.com/\${username}/\`</span>, {
      waitUntil: <span class="str">'domcontentloaded'</span>
    });

    <span class="kw">await</span> <span class="fn">humanRead</span>(page);   <span class="cm">// Pause like a real user</span>
    <span class="kw">await</span> <span class="fn">humanScroll</span>(page, <span class="str">'down'</span>);

    <span class="kw">const</span> data = <span class="kw">await</span> page.<span class="fn">evaluate</span>(() => ({
      followerCount: document.<span class="fn">querySelector</span>(<span class="str">'[data-testid="follower-count"]'</span>)?.<span class="fn">textContent</span>,
      bio: document.<span class="fn">querySelector</span>(<span class="str">'.-vDIg span'</span>)?.<span class="fn">textContent</span>
    }));

    <span class="kw">return</span> data;
  } <span class="kw">finally</span> {
    <span class="kw">await</span> browser.<span class="fn">close</span>();
  }
}</pre></div>

  <h3>Multi-country rotation</h3>
  <div class="code-label">multi-country.js</div>
  <div class="code-block"><pre><span class="kw">const</span> { <span class="fn">launchHuman</span> } = <span class="kw">require</span>(<span class="str">'human-browser'</span>);

<span class="kw">const</span> countries = [<span class="str">'ro'</span>, <span class="str">'us'</span>, <span class="str">'gb'</span>, <span class="str">'de'</span>, <span class="str">'jp'</span>];

<span class="kw">async function</span> <span class="fn">scrapeWithRotation</span>(urls) {
  <span class="kw">for</span> (<span class="kw">const</span> [i, url] <span class="kw">of</span> urls.<span class="fn">entries</span>()) {
    <span class="kw">const</span> country = countries[i % countries.length];
    <span class="kw">const</span> { browser, page, humanRead } = <span class="kw">await</span> <span class="fn">launchHuman</span>({ country });

    <span class="kw">await</span> page.<span class="fn">goto</span>(url, { waitUntil: <span class="str">'domcontentloaded'</span> });
    <span class="kw">await</span> <span class="fn">humanRead</span>(page);

    <span class="kw">const</span> result = <span class="kw">await</span> page.<span class="fn">evaluate</span>(() => document.title);
    console.<span class="fn">log</span>(<span class="str">\`[\${country.toUpperCase()}] \${result}\`</span>);

    <span class="kw">await</span> browser.<span class="fn">close</span>();
    <span class="cm">// Rate limiting: wait 2–5 seconds between requests</span>
    <span class="kw">await</span> <span class="kw">new</span> <span class="fn">Promise</span>(r => <span class="fn">setTimeout</span>(r, <span class="num">2000</span> + Math.<span class="fn">random</span>() * <span class="num">3000</span>));
  }
}</pre></div>

  <h2>Common Errors and Fixes</h2>

  <div class="error-box">
    <div class="error-label">Error: net::ERR_PROXY_CONNECTION_FAILED</div>
    <div class="error-fix">✅ Fix: Check your PROXY_HOST and PROXY_PORT environment variables. Make sure the proxy server address is correct and the port is open. Try ping brd.superproxy.io to confirm connectivity.</div>
  </div>

  <div class="error-box">
    <div class="error-label">Error: 407 Proxy Authentication Required</div>
    <div class="error-fix">✅ Fix: Your PROXY_USER or PROXY_PASS is incorrect. Double-check your credentials from the humanbrowser.dev dashboard. Note that usernames are case-sensitive.</div>
  </div>

  <div class="error-box">
    <div class="error-label">Error: Timeout 30000ms exceeded (on Cloudflare sites)</div>
    <div class="error-fix">✅ Fix: Cloudflare challenge is taking too long to resolve. Increase timeout to 60000ms and add await sleep(5000) after page.goto(). If persistent, the IP may need to warm up — try a different country.</div>
  </div>

  <div class="error-box">
    <div class="error-label">Error: 403 Forbidden despite residential IP</div>
    <div class="error-fix">✅ Fix: Some sites block based on both IP and fingerprint. Make sure mobile: true is set in launchHuman() and you're not loading the page with waitUntil: 'networkidle' which triggers bot heuristics on some sites. Use 'domcontentloaded' instead.</div>
  </div>

  <div class="error-box">
    <div class="error-label">Error: Bandwidth quota exceeded</div>
    <div class="error-fix">✅ Fix: You've exceeded your monthly bandwidth. Upgrade to the Pro plan ($49.99/mo for 20GB) or add more bandwidth at $2.50/GB. Be mindful of loading heavy pages with many images — block unnecessary resources when possible.</div>
  </div>

  <h2>FAQ</h2>
  <div class="faq-block">
    <details>
      <summary>How do I add a proxy to Playwright?</summary>
      <p>Use the proxy option in chromium.launch() or newContext(). For residential proxies with authentication, pass server, username, and password. The human-browser package handles this automatically with launchHuman().</p>
    </details>
    <details>
      <summary>What is the difference between a datacenter proxy and a residential proxy?</summary>
      <p>A datacenter proxy routes through a server farm. Sites like Cloudflare, Instagram, and LinkedIn instantly detect and block these. A residential proxy routes through a real home internet connection — it's indistinguishable from a normal user browsing from their home.</p>
    </details>
    <details>
      <summary>Which countries work best for Playwright residential proxy?</summary>
      <p>Romania is the most cost-effective and works for most use cases. US IPs work well for US-specific content. UK IPs are useful for geo-locked content. Human Browser supports RO, US, UK, DE, NL, and JP.</p>
    </details>
    <details>
      <summary>Does Playwright support proxy authentication?</summary>
      <p>Yes. Playwright supports proxy authentication via the proxy.username and proxy.password fields in the context options. The human-browser package sets this up automatically from environment variables.</p>
    </details>
    <details>
      <summary>How do I block images to save bandwidth?</summary>
      <p>Use page.route() to intercept and abort image requests: await page.route('**/*.{png,jpg,gif,svg}', r => r.abort()). This can reduce bandwidth usage by 60–80% for text-heavy sites.</p>
    </details>
  </div>

  <div class="cta-box">
    <h3>Get residential proxy credentials</h3>
    <p>Get started at humanbrowser.dev — residential proxy from $13.99/mo. Romania residential IP, iPhone 15 Pro fingerprint, bypasses Cloudflare out of the box.</p>
    <a href="https://humanbrowser.dev/#pricing" class="cta-btn" target="_blank" rel="noopener noreferrer">Get Started — $13.99/mo →</a>
  </div>

  <div class="related-posts">
    <h3>Related Articles</h3>
    <div class="related-grid">
      <a href="/blog/bypass-cloudflare-playwright-2026" class="related-card">
        <div class="rc-tag">Cloudflare Bypass</div>
        <h4>How to Bypass Cloudflare with Playwright in 2026</h4>
      </a>
      <a href="/blog/ai-agent-browser-automation-openClaw" class="related-card">
        <div class="rc-tag">AI Agents</div>
        <h4>Browser Automation for AI Agents: OpenClaw + Playwright 2026</h4>
      </a>
      <a href="/blog/scrape-instagram-without-ban" class="related-card">
        <div class="rc-tag">Instagram</div>
        <h4>How to Scrape Instagram Without Getting Banned in 2026</h4>
      </a>
    </div>
  </div>
</div>

<footer class="blog-footer">
  <div>
    <a href="https://humanbrowser.dev">humanbrowser.dev</a>
    <a href="/blog">Blog</a>
    <a href="/blog/bypass-cloudflare-playwright-2026">Cloudflare Bypass</a>
    <a href="/blog/scrape-instagram-without-ban">Instagram Scraping</a>
    <a href="/blog/ai-agent-browser-automation-openClaw">AI Agents</a>
    <a href="https://t.me/virixlabs" target="_blank" rel="noopener noreferrer">Support</a>
  </div>
  <p>© 2026 Virix Labs · Human Browser · Residential proxy from $13.99/mo</p>
</footer>
`;
