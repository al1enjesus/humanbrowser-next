import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Human Browser — Stealth Playwright Browser with Residential Proxy | Virix Labs</title>
        <meta name="description" content="Stealth browser for AI agents. Residential proxy from $13.99/mo. Bypasses Cloudflare, DataDome, PerimeterX. Apple Pay, Google Pay, USDT, ETH, BTC, SOL." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="stealth browser, residential proxy, playwright proxy, bypass cloudflare, bypass datadome, bypass perimeter x, anti bot bypass, ai agent browser, headless browser residential ip, playwright stealth, instagram scraping, web scraping proxy, playwright residential, human browser, cloudflare bypass playwright, browser automation residential ip" />
        <link rel="canonical" href="https://humanbrowser.dev" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Human Browser",
          "url": "https://humanbrowser.dev",
          "description": "Stealth Playwright browser with residential proxy for AI agents. Bypasses Cloudflare, DataDome, PerimeterX.",
          "potentialAction": { "@type": "SearchAction", "target": "https://humanbrowser.dev/?q={search_term_string}", "query-input": "required name=search_term_string" },
          "publisher": { "@type": "Organization", "name": "Human Browser", "url": "https://humanbrowser.dev", "logo": { "@type": "ImageObject", "url": "https://humanbrowser.dev/og-image.jpg" }, "sameAs": ["https://github.com/al1enjesus/human-browser", "https://www.npmjs.com/package/human-browser", "https://clawhub.ai/al1enjesus/human-browser"] }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Human Browser",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Linux, Docker, macOS, Windows",
          "description": "Stealth Playwright browser with residential proxy for AI agents. Bypasses Cloudflare, DataDome, PerimeterX. iPhone 15 Pro fingerprint. Runs on any $5 Linux VPS.",
          "url": "https://humanbrowser.dev",
          "screenshot": "https://humanbrowser.dev/og-image.jpg",
          "offers": [
            { "@type": "Offer", "name": "Starter", "price": "13.99", "priceCurrency": "USD", "description": "Romania residential IP, 2GB bandwidth" },
            { "@type": "Offer", "name": "Pro", "price": "49.99", "priceCurrency": "USD", "description": "10+ countries, 20GB bandwidth" },
            { "@type": "Offer", "name": "Enterprise", "price": "199.00", "priceCurrency": "USD", "description": "Unlimited bandwidth, dedicated zone" }
          ],
          "author": { "@type": "Organization", "name": "Virix Labs", "url": "https://virixlabs.com" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "38" }
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Does it bypass Cloudflare?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Human Browser uses a residential IP address (real ISP, not data center) combined with a real iPhone 15 Pro fingerprint. Cloudflare's bot score is based on IP reputation + browser fingerprint — both are covered." } },
            { "@type": "Question", "name": "Can I use it without a Mac or local machine?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Human Browser runs on any Linux VPS, Docker container, or CI/CD pipeline. No display server, no VNC, no X11 needed. A $5/mo DigitalOcean droplet is enough." } },
            { "@type": "Question", "name": "What is the difference between free and paid?", "acceptedAnswer": { "@type": "Answer", "text": "The browser-human.js script and the OpenClaw skill are completely free and open source. The paid subscription gives you residential proxy credentials — a real home IP address from Romania, US, UK, etc. Without it, your VPS data center IP gets blocked instantly." } },
            { "@type": "Question", "name": "Which countries are available?", "acceptedAnswer": { "@type": "Answer", "text": "Romania (default), United States, United Kingdom, Germany, Netherlands, Japan, France, Canada, Singapore, Australia. Different countries work for different services — see the compatibility matrix on the website." } },
            { "@type": "Question", "name": "Does it work with OpenClaw?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it is an OpenClaw native skill. Install with: clawhub install al1enjesus/human-browser. Your agent gains the ability to launch a stealth browser with one function call: launchHuman()." } }
          ]
        }) }} />
        <meta property="og:title" content="Human Browser — The browser that has no idea it's a bot" />
        <meta property="og:description" content="No Mac Mini. No local setup. A full Playwright browser that runs on any server, looks like a real device, and bypasses every bot detection system alive." />
        <meta property="og:url" content="https://humanbrowser.dev" />
        <meta property="og:image" content="https://humanbrowser.dev/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Human Browser — The browser that has no idea it's a bot" />
        <meta name="twitter:description" content="Residential proxy from $13.99/mo. Bypasses Cloudflare, DataDome, PerimeterX. Runs on any $5 Linux VPS." />
        <meta name="twitter:image" content="https://humanbrowser.dev/og-image.jpg" />
        <meta name="twitter:site" content="@virixlabs" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </>
  );
}

const bodyContent = `<!-- ── NAV ─────────────────────────────────────────── -->
<header class="nav">
  <div class="nav-inner">
    <a class="nav-brand" href="#">
      <img src="https://virixlabs.com/logo.png" alt="Virix Labs"/>
      <span class="nav-brand-name">Human Browser<span class="sep"> by </span>Virix Labs</span>
      <span class="nav-badge">
        <svg class="oc-badge-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff4d4d"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs>
          <path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z" fill="url(#lg1)"/>
          <path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z" fill="url(#lg1)"/>
          <path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z" fill="url(#lg1)"/>
          <circle cx="45" cy="35" r="6" fill="#050810"/><circle cx="75" cy="35" r="6" fill="#050810"/>
          <circle cx="46" cy="34" r="2.5" fill="#00e5cc"/><circle cx="76" cy="34" r="2.5" fill="#00e5cc"/>
        </svg>
        OpenClaw
      </span>
    </a>

    <nav class="nav-links">
      <a href="#features" data-i18n="nav_features">Features</a>
      <a href="#pricing" data-i18n="nav_pricing">Pricing</a>
      <a href="#how" data-i18n="nav_how">How it works</a>
      <button onclick="showAgentModal()" class="btn btn-primary nav-cta" data-i18n="nav_cta">Get Started →</button>
    </nav>

    <div class="lang-sel">
      <button class="lang-btn lang-active" data-lang="en" onclick="setLang('en')">EN</button>
      <button class="lang-btn" data-lang="ru" onclick="setLang('ru')">RU</button>
      <button class="lang-btn" data-lang="es" onclick="setLang('es')">ES</button>
      <button class="lang-btn" data-lang="zh" onclick="setLang('zh')">中文</button>
    </div>

    <button class="nav-hamburger" id="hamburger" aria-label="Menu">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
  <div class="nav-mobile-menu" id="mobile-menu">
    <a href="#features" data-i18n="nav_features">Features</a>
    <a href="#pricing" data-i18n="nav_pricing">Pricing</a>
    <a href="#how" data-i18n="nav_how">How it works</a>
    <a href="https://clawhub.ai/al1enjesus/human-browser" target="_blank" data-i18n="nav_mobile_skill">ClawHub Skill (free)</a>
    <div class="mobile-lang-row">
      <button class="lang-btn lang-active" data-lang="en" onclick="setLang('en');closeMobileMenu()">EN</button>
      <button class="lang-btn" data-lang="ru" onclick="setLang('ru');closeMobileMenu()">RU</button>
      <button class="lang-btn" data-lang="es" onclick="setLang('es');closeMobileMenu()">ES</button>
      <button class="lang-btn" data-lang="zh" onclick="setLang('zh');closeMobileMenu()">中文</button>
    </div>
    <div class="mobile-cta">
      <button onclick="showAgentModal();closeMobileMenu();" class="btn btn-primary" style="width:100%;justify-content:center;" data-i18n="nav_cta">Get Started →</button>
    </div>
  </div>
</header>

<!-- ── HERO ─────────────────────────────────────────── -->
<div class="hero">
  <div class="hero-pill">
    <span class="live-dot"></span>
    <span data-i18n="hero_pill">Any country · Residential IP · Zero bans</span>
  </div>

  <h1>
    <span class="hero-brand-label">Human Browser</span>
    <span data-i18n="hero_prefix">The browser that</span><br>
    <span class="hero-rotating" id="hero-rotating">thinks it's human</span>
  </h1>

  <p data-i18n="hero_desc">No Mac Mini. No local setup. A full Playwright browser that runs on any server, looks like a real device, and bypasses every bot detection system alive.</p>

  <!-- ── OpenClaw intro ── -->
  <div class="hero-oc-intro">
    <svg class="oc-intro-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff4d4d"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs>
      <path d="M60 10 C30 10 15 35 15 55 C15 75 30 95 45 100 L45 110 L55 110 L55 100 C55 100 60 102 65 100 L65 110 L75 110 L75 100 C90 95 105 75 105 55 C105 35 90 10 60 10Z" fill="url(#lg2)"/>
      <path d="M20 45 C5 40 0 50 5 60 C10 70 20 65 25 55 C28 48 25 45 20 45Z" fill="url(#lg2)"/>
      <path d="M100 45 C115 40 120 50 115 60 C110 70 100 65 95 55 C92 48 95 45 100 45Z" fill="url(#lg2)"/>
      <circle cx="45" cy="35" r="6" fill="#050810"/><circle cx="75" cy="35" r="6" fill="#050810"/>
      <circle cx="46" cy="34" r="2.5" fill="#00e5cc"/><circle cx="76" cy="34" r="2.5" fill="#00e5cc"/>
    </svg>
    <span data-i18n="install_intro">Built for OpenClaw — just send this to your agent, it handles everything</span>
  </div>

  <!-- ── Install command ── -->
  <div class="hero-install">
    <div class="hi-bar">
      <div class="hi-dots">
        <span class="hid hid-r"></span><span class="hid hid-y"></span><span class="hid hid-g"></span>
      </div>
      <span class="hi-title">terminal</span>
    </div>
    <div class="hi-body">
      <span class="hi-prompt">$</span>
      <span class="hi-cmd" id="heroInstallCmd">clawhub install al1enjesus/human-browser</span>
      <button class="hi-copy" id="heroInstallCopy" onclick="copyInstallCmd()" title="Copy command">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- ── Platform trust badges ── -->
  <div class="hero-platforms">
    <span class="hp-label" data-i18n="install_available">Available on</span>
    <a href="https://clawhub.ai/al1enjesus/human-browser" target="_blank" class="hp-badge">
      <span class="hp-icon">🦀</span> ClawHub
    </a>
    <a href="https://hub.skild.sh" target="_blank" class="hp-badge">
      <span class="hp-icon">⚡</span> skild.sh
    </a>
    <a href="https://github.com/al1enjesus/human-browser" target="_blank" class="hp-badge">
      <span class="hp-icon">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      </span> GitHub
    </a>
    <a href="https://www.npmjs.com/package/human-browser" target="_blank" class="hp-badge">
      <span class="hp-icon">📦</span> npm
    </a>
  </div>
</div>

<!-- ── TRUST BAR ───────────────────────────────────── -->
<div class="trust-bar">
  <div class="trust-item"><span class="ck">✓</span> <span data-i18n="trust_1">Bypasses Cloudflare</span></div>
  <div class="trust-item"><span class="ck">✓</span> <span data-i18n="trust_2">Bypasses DataDome</span></div>
  <div class="trust-item"><span class="ck">✓</span> <span data-i18n="trust_3">Bypasses PerimeterX</span></div>
  <div class="trust-item"><span class="ck">✓</span> <span data-i18n="trust_4">Residential IP</span></div>
  <div class="trust-item"><span class="ck">✓</span> <span data-i18n="trust_5">Any Linux server</span></div>
  <div class="trust-item"><span class="ck">✓</span> <span data-i18n="trust_6">OpenClaw native skill</span></div>
</div>

<!-- ── CODE PREVIEW ────────────────────────────────── -->
<div class="code-wrap">
  <div class="code-label" data-i18n="code_label">5 lines · any server · zero bans</div>
  <div class="code-window">
    <div class="code-bar">
      <div class="cd cd-r"></div><div class="cd cd-y"></div><div class="cd cd-g"></div>
      <span class="code-fname">scraper.js</span>
    </div>
    <pre><span class="kw">const</span> { <span class="fn">launchHuman</span> } = <span class="kw">require</span>(<span class="str">'human-browser'</span>);

<span class="kw">const</span> { page, humanType, humanScroll } = <span class="kw">await</span> <span class="fn">launchHuman</span>();
<span class="kw">await</span> page.<span class="fn">goto</span>(<span class="str">'https://instagram.com'</span>);
<span class="kw">await</span> <span class="fn">humanScroll</span>(page, <span class="str">'down'</span>);   <span class="cm">// <span data-i18n="code_c1">smooth scroll with jitter</span></span>
<span class="kw">await</span> <span class="fn">humanType</span>(page, <span class="str">'input'</span>, <span class="str">'query'</span>);  <span class="cm">// <span data-i18n="code_c2">60–220ms/char</span></span>

<span class="cm">// ✅ <span data-i18n="code_c3">Residential IP · iPhone 15 fingerprint · webdriver=false</span></span></pre>
  </div>
</div>

<hr class="divider" style="margin-top:5rem;"/>

<!-- ── NO MAC MINI CALLOUT ─────────────────────────── -->
<div class="callout-wrap">
  <div class="callout">
    <div>
      <h2 data-i18n-html="callout_h2">Stop buying <span class="grad">hardware</span><br>for your AI agent</h2>
      <p data-i18n="callout_p">Most browser automation guides assume you have a Mac Mini, a desktop VPS, or a $500/mo cloud browser subscription. Human Browser runs on a $5 Linux VPS. Nothing else.</p>
      <ul class="callout-checks">
        <li data-i18n="callout_li1">No display server, no VNC, no desktop required</li>
        <li data-i18n="callout_li2">Chromium headless + residential proxy = real human fingerprint</li>
        <li data-i18n="callout_li3">iPhone 15 Pro UA · Residential IP · Local geolocation</li>
        <li data-i18n="callout_li4">Bezier mouse · human-speed typing · natural scroll</li>
        <li data-i18n="callout_li5">Works in Docker, GitHub Actions, any CI/CD pipeline</li>
      </ul>
    </div>
    <div>
      <div class="compare">
        <div class="cmp-head">
          <div class="cmp-cell" data-i18n="cmp_h1">Solution</div>
          <div class="cmp-cell" data-i18n="cmp_h2">Cost</div>
          <div class="cmp-cell" data-i18n="cmp_h3">Anti-bot</div>
        </div>
        <div class="cmp-row">
          <div class="cmp-cell">Mac Mini</div>
          <div class="cmp-cell c-bad">$600 upfront</div>
          <div class="cmp-cell c-bad" data-i18n="cmp_r1_bot">Data center IP</div>
        </div>
        <div class="cmp-row">
          <div class="cmp-cell">Browserless.io</div>
          <div class="cmp-cell c-bad">$500+/mo</div>
          <div class="cmp-cell c-ok" data-i18n="cmp_r2_bot">Partial</div>
        </div>
        <div class="cmp-row">
          <div class="cmp-cell">Plain Playwright</div>
          <div class="cmp-cell c-ok">Free</div>
          <div class="cmp-cell c-bad" data-i18n="cmp_r3_bot">Instant ban</div>
        </div>
        <div class="cmp-row highlight">
          <div class="cmp-cell">Human Browser</div>
          <div class="cmp-cell c-good">$13.99/mo</div>
          <div class="cmp-cell c-good" data-i18n="cmp_r4_bot">✓ Full bypass</div>
        </div>
      </div>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── COUNTRY PICKER ────────────────────────────────── -->
<div id="countries" class="country-section">
  <div class="container">
    <div class="section-eyebrow" data-i18n="countries_eyebrow">Residential IPs</div>
    <div class="section-title" data-i18n="countries_title">Pick your country — see what works</div>
    <div class="section-sub" data-i18n="countries_sub">Different services block different IPs. Choose a location and instantly see which platforms are accessible. Your agent picks the right country automatically.</div>

    <div class="country-tabs">
      <button class="ctab active" data-country="ro">🇷🇴 Romania</button>
      <button class="ctab" data-country="us">🇺🇸 USA</button>
      <button class="ctab" data-country="gb">🇬🇧 UK</button>
      <button class="ctab" data-country="de">🇩🇪 Germany</button>
      <button class="ctab" data-country="nl">🇳🇱 Netherlands</button>
      <button class="ctab" data-country="jp">🇯🇵 Japan</button>
    </div>

    <div class="country-meta" id="country-meta">
      <!-- filled by JS -->
    </div>

    <div class="service-grid" id="service-grid">
      <!-- filled by JS -->
    </div>

    <p class="country-note" data-i18n="country_note">* Compatibility based on typical residential IP behavior. Some services may vary by specific ISP or account status.</p>
  </div>
</div>

<hr class="divider"/>

<!-- ── FEATURES ─────────────────────────────────────── -->
<div id="features" class="features-section">
  <div class="section-eyebrow" data-i18n="features_eyebrow">Features</div>
  <div class="section-title" data-i18n="features_title">Everything bots look for — covered</div>
  <div class="section-sub" data-i18n="features_sub">Every signal Cloudflare, DataDome, and PerimeterX check. Handled before you write a line of code.</div>

  <div class="features-grid">
    <div class="feat"><div class="feat-icon">🌍</div><h3 data-i18n="feat_1_h">Residential IP · 6 Countries</h3><p data-i18n="feat_1_p">Real home ISPs — Romania, US, UK, Germany, Netherlands &amp; Japan. Your agent looks like a local person browsing from home.</p></div>
    <div class="feat"><div class="feat-icon">📱</div><h3 data-i18n="feat_2_h">iPhone 15 Pro Fingerprint</h3><p data-i18n="feat_2_p">iOS 17.4.1 Safari UA, correct viewport, pixel ratio, touch events, platform string. Passes every fingerprint check.</p></div>
    <div class="feat"><div class="feat-icon">🖱️</div><h3 data-i18n="feat_3_h">Bezier Mouse Curves</h3><p data-i18n="feat_3_p">Movement along randomized curved paths. Humans never go in straight lines — neither does this browser.</p></div>
    <div class="feat"><div class="feat-icon">⌨️</div><h3 data-i18n="feat_4_h">Human Typing Speed</h3><p data-i18n-html="feat_4_p_html">60–220ms per keystroke with mid-word pauses. Works with React inputs where <code>page.fill()</code> silently fails.</p></div>
    <div class="feat"><div class="feat-icon">📜</div><h3 data-i18n="feat_5_h">Natural Scroll Behavior</h3><p data-i18n="feat_5_p">Scrolls in smooth steps with random jitter. Pauses to read content. Looks exactly like a real user.</p></div>
    <div class="feat"><div class="feat-icon">🛡️</div><h3 data-i18n="feat_6_h">Full Anti-Detection</h3><p data-i18n-html="feat_6_p_html"><code>webdriver=false</code>, no automation flags, real plugin list, canvas fingerprint, real timezone &amp; geo.</p></div>
    <div class="feat"><div class="feat-icon">🦅</div><h3 data-i18n="feat_7_h">OpenClaw Native Skill</h3><p data-i18n-html="feat_7_p_html">One command install: <code>clawhub install al1enjesus/human-browser</code>. Your agent gets it instantly.</p></div>
    <div class="feat"><div class="feat-icon">🖥️</div><h3 data-i18n="feat_8_h">Desktop Mode</h3><p data-i18n-html="feat_8_p_html">Switch to Windows Chrome fingerprint when needed: <code>launchHuman({ mobile: false })</code>.</p></div>
    <div class="feat"><div class="feat-icon">⚡</div><h3 data-i18n="feat_9_h">Any Server, Zero Setup</h3><p data-i18n="feat_9_p">Bare Linux, Docker, CI/CD. Just Node.js + Chromium. No display server, no VNC, no X11.</p></div>
  </div>
</div>

<hr class="divider"/>

<!-- ── HOW IT WORKS ──────────────────────────────────── -->
<div id="how" class="how-section">
  <div class="how-grid">
    <div>
      <div class="section-eyebrow" data-i18n="how_eyebrow">How it works</div>
      <div class="section-title" data-i18n-html="how_title">Built for AI agents,<br>not just humans</div>
      <p class="section-sub" data-i18n="how_sub">The API speaks agent. Pay with crypto. Get credentials programmatically. No dashboards to click.</p>
      <div class="steps">
        <div class="step">
          <div class="step-n">1</div>
          <div class="step-body">
            <h3 data-i18n-html="step_1_h_html">Agent calls <code>GET humanbrowser.dev/api/plans</code></h3>
            <p data-i18n="step_1_p">Sees pricing, bandwidth, and supported currencies. Machine-readable JSON.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">2</div>
          <div class="step-body">
            <h3 data-i18n-html="step_2_h_html">Agent calls <code>POST /buy</code></h3>
            <p data-i18n="step_2_p">Picks plan + currency (USDT, ETH, BTC, or card). Gets payment address back.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">3</div>
          <div class="step-body">
            <h3 data-i18n="step_3_h">Payment auto-confirmed</h3>
            <p data-i18n="step_3_p">0xProcessing or Stripe webhook fires. Credentials provisioned in seconds.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">4</div>
          <div class="step-body">
            <h3 data-i18n-html="step_4_h_html">Agent polls <code>GET /status/:id</code></h3>
            <p data-i18n-html="step_4_p_html">Gets proxy credentials + API key. Drops into <code>.env</code>. Starts browsing.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="code-label" style="margin-top:0.5rem;" data-i18n="how_code_label">Agent purchase flow</div>
      <div class="agent-box">
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">GET humanbrowser.dev/api/plans</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt">{ starter: <span class="af-ok">$13.99</span>, pro: $49.99 }</span></div>
        <div class="af-sep"></div>
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">POST humanbrowser.dev/api/buy</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt">{ address: <span class="af-addr">"0x4a3f…"</span>, amount: "13.99 USDT" }</span></div>
        <div class="af-sep"></div>
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">sends 13.99 USDT on-chain</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt"><span class="af-ok">✓ confirmed</span> · credentials ready</span></div>
        <div class="af-sep"></div>
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">GET humanbrowser.dev/api/status/:id</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt">{ proxy_user: "…", proxy_pass: "…", <span class="af-ok">status: "active"</span> }</span></div>
      </div>
      <p style="font-size:0.75rem;color:var(--muted);margin-top:0.75rem;" data-i18n="how_or_card">Or pay with card — same flow, Stripe checkout link returned instead.</p>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── PRICING ───────────────────────────────────────── -->
<div id="pricing" class="pricing-section">
  <div class="section-eyebrow" data-i18n="pricing_eyebrow">Pricing</div>
  <div class="section-title" data-i18n="pricing_title">Simple, transparent pricing</div>
  <div class="section-sub" data-i18n="pricing_sub">All plans include proxy credentials + OpenClaw skill. Card, Apple Pay, Google Pay or crypto. Cancel anytime.</div>

  <div class="pricing-grid">
    <div class="plan">
      <div class="plan-tier">Starter</div>
      <div class="plan-price">$13.99<sub>/mo</sub></div>
      <div class="plan-usage" data-i18n="plan_starter_usage">2 GB bandwidth · $2.50/GB after</div>
      <ul class="plan-feats">
        <li data-i18n="starter_li1">Romania residential IP</li>
        <li data-i18n="starter_li2">iPhone 15 Pro + Desktop</li>
        <li data-i18n="starter_li3">OpenClaw skill + credentials</li>
        <li data-i18n="starter_li4">Cloudflare / DataDome bypass</li>
        <li data-i18n="starter_li5">Email support</li>
        <li class="off" data-i18n="starter_li_off1">Multi-country rotation</li>
        <li class="off" data-i18n="starter_li_off2">CDP / Scraping Browser</li>
      </ul>
      <div class="plan-btns">
        <button onclick="goPay('starter','card')" class="plan-pay-btn stripe-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" height="18">
          <span class="btn-sub">Apple Pay · Google Pay · Card</span>
        </button>
        <div class="crypto-row">
          <button onclick="goPay('starter','USDT')" class="crypto-coin-btn" title="USDT"><img src="https://assets.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" width="24" height="24"><span>USDT</span></button>
          <button onclick="goPay('starter','ETH')"  class="crypto-coin-btn" title="ETH"><img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" width="24" height="24"><span>ETH</span></button>
          <button onclick="goPay('starter','BTC')"  class="crypto-coin-btn" title="BTC"><img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" width="24" height="24"><span>BTC</span></button>
          <button onclick="goPay('starter','SOL')"  class="crypto-coin-btn" title="SOL"><img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="SOL" width="24" height="24"><span>SOL</span></button>
        </div>
      </div>
    </div>

    <div class="plan popular">
      <div class="pop-tag" data-i18n="plan_pop_tag">Most Popular</div>
      <div class="plan-tier">Pro</div>
      <div class="plan-price">$49.99<sub>/mo</sub></div>
      <div class="plan-usage" data-i18n="plan_pro_usage">20 GB bandwidth · $2.00/GB after</div>
      <ul class="plan-feats">
        <li data-i18n="pro_li1">Everything in Starter</li>
        <li data-i18n="pro_li2">Multi-country IP rotation</li>
        <li data-i18n="pro_li3">Scraping Browser CDP access</li>
        <li data-i18n="pro_li4">Custom fingerprints</li>
        <li data-i18n="pro_li5">Agent-native payment API</li>
        <li data-i18n="pro_li6">Priority support</li>
      </ul>
      <div class="plan-btns">
        <button onclick="goPay('pro','card')" class="plan-pay-btn stripe-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" height="18">
          <span class="btn-sub">Apple Pay · Google Pay · Card</span>
        </button>
        <div class="crypto-row">
          <button onclick="goPay('pro','USDT')" class="crypto-coin-btn" title="USDT"><img src="https://assets.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" width="24" height="24"><span>USDT</span></button>
          <button onclick="goPay('pro','ETH')"  class="crypto-coin-btn" title="ETH"><img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" width="24" height="24"><span>ETH</span></button>
          <button onclick="goPay('pro','BTC')"  class="crypto-coin-btn" title="BTC"><img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" width="24" height="24"><span>BTC</span></button>
          <button onclick="goPay('pro','SOL')"  class="crypto-coin-btn" title="SOL"><img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="SOL" width="24" height="24"><span>SOL</span></button>
        </div>
      </div>
    </div>

    <div class="plan">
      <div class="plan-tier">Enterprise</div>
      <div class="plan-price">$199<sub>/mo</sub></div>
      <div class="plan-usage" data-i18n="plan_ent_usage">Unlimited · Dedicated zone</div>
      <ul class="plan-feats">
        <li data-i18n="ent_li1">Everything in Pro</li>
        <li data-i18n="ent_li2">Dedicated Romania zone</li>
        <li data-i18n="ent_li3">White-label API endpoint</li>
        <li data-i18n="ent_li4">1-on-1 onboarding call</li>
        <li data-i18n="ent_li5">SLA guarantee</li>
        <li data-i18n="ent_li6">Custom skill development</li>
      </ul>
      <div class="plan-btns">
        <button onclick="goPay('enterprise','card')" class="plan-pay-btn stripe-btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" height="18">
          <span class="btn-sub">Apple Pay · Google Pay · Card</span>
        </button>
        <div class="crypto-row">
          <button onclick="goPay('enterprise','USDT')" class="crypto-coin-btn" title="USDT"><img src="https://assets.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" width="24" height="24"><span>USDT</span></button>
          <button onclick="goPay('enterprise','ETH')"  class="crypto-coin-btn" title="ETH"><img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" width="24" height="24"><span>ETH</span></button>
          <button onclick="goPay('enterprise','BTC')"  class="crypto-coin-btn" title="BTC"><img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" width="24" height="24"><span>BTC</span></button>
          <button onclick="goPay('enterprise','SOL')"  class="crypto-coin-btn" title="SOL"><img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="SOL" width="24" height="24"><span>SOL</span></button>
        </div>
      </div>
    </div>
  </div>

  <div class="pay-note">
    <!-- Apple Pay — icon only (text is part of SVG shape) -->
    <span class="pn-item" title="Apple Pay"><img src="/icons/apple-pay.svg" alt="Apple Pay" height="22" class="pn-logo"></span>
    <span class="pn-sep">·</span>
    <!-- Google Pay -->
    <span class="pn-item" title="Google Pay"><img src="/icons/google-pay.svg" alt="Google Pay" height="22" class="pn-logo"></span>
    <span class="pn-sep">·</span>
    <!-- Visa card icon (flat design, self-contained) -->
    <span class="pn-item" title="Visa"><img src="/icons/visa.svg" alt="Visa" height="24" class="pn-logo pn-card-badge"></span>
    <!-- Mastercard -->
    <span class="pn-item" title="Mastercard"><img src="/icons/mastercard.svg" alt="Mastercard" height="24" class="pn-logo pn-card-badge"></span>
    <span class="pn-sep">·</span>
    <!-- Crypto coins -->
    <span class="pn-item" title="USDT"><img src="https://assets.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" width="22" height="22" class="pn-logo pn-round"></span>
    <span class="pn-item" title="ETH"><img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" width="22" height="22" class="pn-logo pn-round"></span>
    <span class="pn-item" title="BTC"><img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" width="22" height="22" class="pn-logo pn-round"></span>
    <span class="pn-item" title="SOL"><img src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="SOL" width="22" height="22" class="pn-logo pn-round"></span>
  </div>
</div>

<hr class="divider"/>

<!-- ── FREE VS PAID ──────────────────────────────────── -->
<div class="fvp-section">
  <div class="container">
    <div class="section-eyebrow" data-i18n="fvp_eyebrow">What's included</div>
    <div class="section-title" data-i18n="fvp_title">Free vs Paid — no tricks</div>
    <div class="section-sub" data-i18n="fvp_sub">The skill and code are open and free. You pay only for the residential proxy — the IP that makes everything work.</div>

    <div class="fvp-grid">
      <div class="fvp-card free">
        <div class="fvp-header">
          <span class="fvp-tag free-tag" data-i18n="free_tag">FREE forever</span>
          <h3 data-i18n="free_h3">OpenClaw Skill + Script</h3>
          <p data-i18n="free_p">Everything you need to run the browser. No credit card, no account.</p>
        </div>
        <ul class="fvp-list">
          <li data-i18n-html="free_li1_html">✅ <code>browser-human.js</code> — full source code</li>
          <li class="fvp-m-hide" data-i18n="free_li2">✅ Human mouse, typing, scroll logic</li>
          <li data-i18n="free_li3">✅ iPhone 15 Pro + Desktop fingerprints</li>
          <li data-i18n="free_li4">✅ Anti-detection stack (webdriver=false, etc.)</li>
          <li class="fvp-m-hide" data-i18n="free_li5">✅ OpenClaw skill via clawhub</li>
          <li class="fvp-m-hide" data-i18n="free_li6">✅ All future updates to the script</li>
          <li class="fvp-dim" data-i18n="free_li7">⚠️ Own residential proxy required</li>
          <li class="fvp-dim fvp-m-hide" data-i18n="free_li8">⚠️ Without residential IP — sites will block you</li>
        </ul>
        <div class="fvp-install">
          <span class="fvp-install-label">Install free skill</span>
          <code style="font-size:0.82rem;padding:0.5rem 0.75rem;border-radius:8px;display:block;background:#0a0a0a;">clawhub install al1enjesus/human-browser</code>
        </div>
      </div>

      <div class="fvp-card paid">
        <div class="fvp-header">
          <span class="fvp-tag paid-tag" data-i18n="paid_tag">from $13.99/mo</span>
          <h3 data-i18n="paid_h3">Residential Proxy Credentials</h3>
          <p data-i18n="paid_p">The missing piece. A real home IP that makes your browser invisible to anti-bot systems.</p>
        </div>
        <ul class="fvp-list">
          <li data-i18n="paid_li1">✅ RO / US / UK / DE / NL / JP IPs</li>
          <li data-i18n="paid_li2">✅ Real residential ISP (DIGI, AT&amp;T, BT…)</li>
          <li data-i18n="paid_li3">✅ Instant credential delivery</li>
          <li class="fvp-m-hide" data-i18n-html="paid_li4_html">✅ Works out of the box with <code>browser-human.js</code></li>
          <li data-i18n="paid_li5">✅ No Bright Data account needed</li>
          <li class="fvp-m-hide" data-i18n="paid_li6">✅ Email support included</li>
          <li class="fvp-m-hide" data-i18n="paid_li7">✅ Cancel anytime — no long-term contract</li>
        </ul>
        <a href="#pricing" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:auto;" data-i18n="paid_cta">See Plans →</a>
      </div>
    </div>

    <div class="fvp-why">
      <div class="fvp-why-icon">💡</div>
      <div>
        <strong data-i18n="fvp_why_h">Why do you need a residential IP at all?</strong>
        <p data-i18n="fvp_why_p">Data center IPs (from AWS, DigitalOcean, Hetzner — your regular VPS) are instantly recognized and blocked by Cloudflare, Instagram, LinkedIn, and most modern sites. A residential IP comes from a real home internet connection — it looks exactly like a normal person browsing. That's the only difference between getting blocked in 2 seconds and scraping forever.</p>
      </div>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── HOW TO PAY ─────────────────────────────────────── -->
<div class="pay-section">
  <div class="container">
    <div class="section-eyebrow" data-i18n="pay_eyebrow">Payment</div>
    <div class="section-title" data-i18n="pay_title">Pay any way you want</div>
    <div class="section-sub" data-i18n="pay_sub">Card, Apple Pay, Google Pay or crypto. Credentials delivered automatically.</div>

    <div class="pay-methods-grid">
      <div class="pay-method">
        <div class="pay-method-icon">💳</div>
        <h3 data-i18n="pm1_h">Card / Apple Pay / Google Pay</h3>
        <p data-i18n="pm1_p">Processed by Stripe. Visa, Mastercard, Amex. Apple Pay and Google Pay supported. Subscription renews monthly.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> <span data-i18n="pm1_s1">Click Get Started on any plan</span></div>
          <div class="pay-step"><span class="ps-n">2</span> <span data-i18n="pm1_s2">Choose Card / Apple Pay / Google Pay</span></div>
          <div class="pay-step"><span class="ps-n">3</span> <span data-i18n="pm1_s3">Pay → credentials delivered instantly</span></div>
        </div>
      </div>

      <div class="pay-method">
        <div class="pay-method-icon">💵</div>
        <h3 data-i18n="pm2_h">USDT (TRC-20 or ERC-20)</h3>
        <p data-i18n="pm2_p">Most popular crypto option. Exact amount to wallet address. Auto-confirmed by 0xProcessing.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> <span data-i18n="pm2_s1">Click Get Started → choose USDT</span></div>
          <div class="pay-step"><span class="ps-n">2</span> <span data-i18n="pm2_s2">Get wallet address + exact amount</span></div>
          <div class="pay-step"><span class="ps-n">3</span> <span data-i18n="pm2_s3">Send → credentials in ~2 min</span></div>
        </div>
      </div>

      <div class="pay-method">
        <div class="pay-method-icon">◎</div>
        <h3 data-i18n="pm3_h">Solana / ETH / BTC</h3>
        <p data-i18n="pm3_p">All major blockchains accepted. Same automatic flow — no manual approval.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> <span data-i18n="pm3_s1">Pick your coin in the payment panel</span></div>
          <div class="pay-step"><span class="ps-n">2</span> <span data-i18n="pm3_s2">Get network-specific address</span></div>
          <div class="pay-step"><span class="ps-n">3</span> <span data-i18n="pm3_s3">Send → credentials auto-delivered</span></div>
        </div>
      </div>

      <div class="pay-method">
        <div class="pay-method-icon">🤖</div>
        <h3 data-i18n="pm4_h">AI Agent (API)</h3>
        <p data-i18n="pm4_p">Your agent can buy credentials programmatically. Full JSON API — machine-readable responses.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> <span data-i18n-html="pm4_s1_html">Agent: <code>GET /api/plans</code></span></div>
          <div class="pay-step"><span class="ps-n">2</span> <span data-i18n-html="pm4_s2_html">Agent: <code>POST /api/buy {currency:"USDT"}</code></span></div>
          <div class="pay-step"><span class="ps-n">3</span> <span data-i18n-html="pm4_s3_html">Agent pays → polls <code>GET /api/status/:id</code></span></div>
        </div>
      </div>
    </div>

    <div class="pay-guarantee">
      <span data-i18n="pay_guar1">🔒 Credentials delivered within 10 minutes of payment confirmation.</span>
      <span data-i18n="pay_guar2">❌ Not satisfied? Full refund within 24h — no questions asked.</span>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── FAQ ───────────────────────────────────────────── -->
<div class="faq-section">
  <div class="container" style="max-width:720px;">
    <div class="section-eyebrow" data-i18n="faq_eyebrow">FAQ</div>
    <div class="section-title" data-i18n="faq_title">Common questions</div>

    <div class="faq-list">
      <details class="faq-item">
        <summary data-i18n="faq_1q">Do I need a Mac Mini or desktop computer?</summary>
        <p data-i18n="faq_1a">No. Human Browser runs on any Linux VPS, Docker container, or cloud server. A $5/mo Hetzner or Contabo VPS is all you need. No display server, no VNC, no X11 — just Node.js and Chromium.</p>
      </details>
      <details class="faq-item">
        <summary data-i18n="faq_2q">What exactly is free and what costs money?</summary>
        <p data-i18n-html="faq_2a_html">The browser-human.js script and the OpenClaw skill are completely free — open source, install anytime. The paid subscription gives you <strong>residential proxy credentials</strong>: a real home IP address from DIGI Romania, AT&T, BT, etc. Without a residential IP, anti-bot systems will block your VPS's data center IP instantly.</p>
      </details>
      <details class="faq-item">
        <summary data-i18n="faq_3q">Why Romania? Can I use other countries?</summary>
        <p data-i18n="faq_3a">Romania is the cheapest option and works for most tasks — Instagram, LinkedIn, Binance, Polymarket, Cloudflare sites. We also offer USA, UK, Germany, Netherlands, and Japan. Use the country picker above to see which services work where.</p>
      </details>
      <details class="faq-item">
        <summary data-i18n="faq_4q">How quickly do I get credentials after paying?</summary>
        <p data-i18n="faq_4a">Card payments via Stripe: 2–3 minutes. Crypto (USDT/ETH): 5–10 minutes after on-chain confirmation. AI agent API: fully automatic, no human in the loop.</p>
      </details>
      <details class="faq-item">
        <summary data-i18n="faq_5q">Can my AI agent buy this automatically?</summary>
        <p data-i18n-html="faq_5a_html">Yes — that's the whole point. Call <code>GET humanbrowser.dev/api/plans</code>, then <code>POST /buy</code> with your preferred currency. You'll get a crypto payment address. Your agent sends the payment, polls <code>GET /status/:id</code>, and receives proxy credentials in the response. Zero human involvement required.</p>
      </details>
      <details class="faq-item">
        <summary data-i18n="faq_6q">Will this bypass Cloudflare / DataDome / PerimeterX?</summary>
        <p data-i18n="faq_6a">Yes, in the vast majority of cases. The combination of a residential IP + realistic browser fingerprint (iPhone 15 Pro) + human behavior simulation (Bezier mouse, natural typing, scroll patterns) passes all major anti-bot systems. We've tested against all three.</p>
      </details>
      <details class="faq-item">
        <summary data-i18n="faq_7q">What's an OpenClaw skill?</summary>
        <p data-i18n-html="faq_7a_html">OpenClaw is an AI agent platform. Skills are reusable capability packages — install one and your agent gains specialized knowledge and tools. The Human Browser skill gives your OpenClaw agent the ability to launch a stealth browser with one function call: <code>launchHuman()</code>.</p>
      </details>
      <details class="faq-item">
        <summary data-i18n="faq_8q">What if I want to cancel?</summary>
        <p data-i18n-html="faq_8a_html">DM <a href="https://t.me/virixlabs" target="_blank">@virixlabs</a> on Telegram. We'll cancel your subscription immediately. If you're within 24h of purchase, you'll get a full refund — no questions.</p>
      </details>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── VIRIX BANNER ──────────────────────────────────── -->
<div class="vx-section" style="padding-top:3rem;">
  <div class="vx-card">
    <img src="https://virixlabs.com/logo.png" alt="Virix Labs"/>
    <div class="vx-info">
      <h3 data-i18n="vx_h3">Built by Virix Labs</h3>
      <p data-i18n="vx_p">AI-powered venture studio building focused products at scale. Human Browser is part of the OpenClaw skill ecosystem — tools that let AI agents work without human bottlenecks.</p>
    </div>
    <a href="https://virixlabs.com" target="_blank" class="btn btn-secondary">virixlabs.com ↗</a>
  </div>
</div>

<!-- ── AGENT INSTALL MODAL ──────────────────────────── -->
<div id="agent-modal" class="amodal-overlay" aria-hidden="true" onclick="handleModalOverlayClick(event)">
  <div class="amodal-box" role="dialog" aria-modal="true">
    <button class="amodal-close" onclick="closeAgentModal()" aria-label="Close">✕</button>

    <div class="amodal-icon">🦅</div>
    <h2 class="amodal-title" data-i18n="modal_title">Send this to your OpenClaw agent</h2>
    <p class="amodal-sub" data-i18n="modal_sub">Your agent will install the skill, pick a plan, and browse like a human — no manual setup needed.</p>

    <div class="amodal-section-label" data-i18n="modal_cmd_label">INSTALL COMMAND</div>
    <div class="amodal-cmd" id="amodal-cmd-box" onclick="copyModalCmd('clawhub install al1enjesus/human-browser','amodal-cmd-box')">
      <code>clawhub install al1enjesus/human-browser</code>
      <span class="amodal-copy-hint" data-i18n="modal_tap_copy">📋 tap to copy</span>
    </div>

    <div class="amodal-section-label" data-i18n="modal_msg_label">OR SEND THIS TO YOUR AGENT</div>
    <div class="amodal-msg" id="amodal-msg-box" onclick="copyModalCmd(document.getElementById('amodal-msg-text').textContent,'amodal-msg-box')">
      <p id="amodal-msg-text" data-i18n="modal_msg">Install the Human Browser skill and use it whenever I need to browse the web — Instagram, LinkedIn, Binance, Cloudflare-protected sites, or any page that blocks bots. It uses a real residential IP and iPhone 15 Pro fingerprint. Install with: clawhub install al1enjesus/human-browser</p>
      <span class="amodal-copy-hint" data-i18n="modal_tap_copy2">📋 tap to copy</span>
    </div>

    <div class="amodal-actions">
      <a href="https://clawhub.ai/al1enjesus/human-browser" target="_blank" class="btn btn-primary amodal-btn" data-i18n="modal_clawhub">View on ClawHub →</a>
      <a href="https://github.com/al1enjesus/human-browser" target="_blank" class="btn btn-secondary amodal-btn" data-i18n="modal_github">GitHub ↗</a>
    </div>

    <p class="amodal-support" data-i18n-html="modal_support_html">Need help? <a href="https://t.me/virixlabs" target="_blank">@virixlabs</a> on Telegram</p>
  </div>
</div>

<!-- ── FOOTER ────────────────────────────────────────── -->
<footer class="footer">
  <div class="footer-logo">
    <img src="https://virixlabs.com/logo.png" alt="Virix Labs"/>
    <span>Human Browser · Virix Labs</span>
  </div>
  <div class="footer-links">
    <a href="#features" data-i18n="nav_features">Features</a>
    <a href="#pricing" data-i18n="nav_pricing">Pricing</a>
    <a href="/blog" data-i18n="footer_blog">Blog</a>
    <a href="/install" data-i18n="footer_install">Install</a>
    <a href="https://clawhub.ai/al1enjesus/human-browser" target="_blank" data-i18n="footer_clawhub">ClawHub</a>
    <a href="https://openclaw.ai" target="_blank" data-i18n="footer_openclaw">OpenClaw</a>
    <a href="https://virixlabs.com" target="_blank" data-i18n="footer_virix">Virix Labs</a>
    <a href="https://t.me/virixlabs" target="_blank" data-i18n="footer_support">Support</a>
  </div>
  <p class="footer-copy" data-i18n="footer_copy">© 2026 Virix Labs · No Mac Mini needed · Runs on any server</p>
</footer>

<!-- ── SCRIPTS ───────────────────────────────────────── -->



<!-- ── PAYMENT BOTTOM SHEET ──────────────────────────── -->
<div class="pay-backdrop" id="payBackdrop" onclick="closePaySheet()"></div>
<div class="pay-sheet" id="paySheet">
  <div class="pay-sheet-bar"><div class="pay-sheet-handle"></div></div>
  <div class="pay-sheet-head">
    <div class="psh-info">
      <span class="psh-plan-name" id="pshPlanName">Starter</span>
      <span class="psh-sep"> — </span>
      <span class="psh-plan-price" id="pshPlanPrice">$13.99/mo</span>
    </div>
    <button class="psh-close" onclick="closePaySheet()">✕</button>
  </div>
  <div class="pay-sheet-tabs">
    <button class="pst pst-active" id="tabCard" onclick="switchPayTab('card')" data-i18n="sheet_tab_card">
      💳 Card · Apple Pay · Google Pay
    </button>
    <button class="pst" id="tabCrypto" onclick="switchPayTab('crypto')" data-i18n="sheet_tab_crypto">
      ₿ Crypto
    </button>
  </div>
  <div class="pay-sheet-body">
    <div id="tabContentCard" class="psc-pane">
      <div id="stripe-checkout">
        <div class="psc-placeholder"><div class="pay-spinner"></div><p data-i18n="sheet_loading">Loading secure checkout…</p></div>
      </div>
    </div>
    <div id="tabContentCrypto" class="psc-pane psc-hidden">
      <div class="crypto-coins">
        <button class="ccoin ccoin-usdt" onclick="selectCoin('USDT')">
          <img class="ccoin-img" src="https://assets.coingecko.com/coins/images/325/small/Tether.png" alt="USDT" loading="lazy"/>
          <span class="ccoin-name">USDT</span><span class="ccoin-net">TRC20</span>
        </button>
        <button class="ccoin" onclick="selectCoin('BTC')">
          <img class="ccoin-img" src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" loading="lazy"/>
          <span class="ccoin-name">BTC</span><span class="ccoin-net">Bitcoin</span>
        </button>
        <button class="ccoin" onclick="selectCoin('ETH')">
          <img class="ccoin-img" src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" loading="lazy"/>
          <span class="ccoin-name">ETH</span><span class="ccoin-net">ERC20</span>
        </button>
        <button class="ccoin" onclick="selectCoin('SOL')">
          <img class="ccoin-img" src="https://assets.coingecko.com/coins/images/4128/small/solana.png" alt="SOL" loading="lazy"/>
          <span class="ccoin-name">SOL</span><span class="ccoin-net">Solana</span>
        </button>
      </div>
      <div id="cryptoInvoice"></div>
    </div>
  </div>
</div>`;
