import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Hamburger menu
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // ── COUNTRY PICKER ──────────────────────────────
  const COUNTRIES = {
    ro: {
      flag: '🇷🇴', name: 'Romania', isp: 'DIGI Romania / WS Telecom (Residential)',
      price: '$13.99', note: 'Best price · Most popular · DIGI Romania residential ISP',
    },
    us: {
      flag: '🇺🇸', name: 'United States', isp: 'AT&T / Comcast / Verizon (Residential)',
      price: '$29.99', note: 'Required for US-only services · Banks, streaming, DoorDash',
    },
    gb: {
      flag: '🇬🇧', name: 'United Kingdom', isp: 'BT / Virgin Media (Residential)',
      price: '$24.99', note: 'EU-adjacent · Great for crypto & prediction markets',
    },
    de: {
      flag: '🇩🇪', name: 'Germany', isp: 'Deutsche Telekom / Vodafone (Residential)',
      price: '$22.99', note: 'EU-compliant · GDPR-friendly · Strong for EU services',
    },
    nl: {
      flag: '🇳🇱', name: 'Netherlands', isp: 'KPN / Ziggo (Residential)',
      price: '$22.99', note: 'Privacy-friendly · Popular for crypto & web3',
    },
    jp: {
      flag: '🇯🇵', name: 'Japan', isp: 'NTT / SoftBank (Residential)',
      price: '$26.99', note: 'Japanese content · Line · Yahoo Japan',
    },
  };

  const SERVICES = [
    { icon: '📊', name: 'Polymarket',   note: 'Prediction market',   status: { ro:'ok', us:'bad',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  }, label: { us:'US blocked' } },
    { icon: '📸', name: 'Instagram',    note: 'Scraping & automation', status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '💼', name: 'LinkedIn',     note: 'Profile & lead scraping', status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '🛒', name: 'Amazon',       note: 'Price monitoring',     status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '🐦', name: 'Twitter / X',  note: 'Automation & scraping', status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '🔶', name: 'Binance',      note: 'Crypto exchange',      status: { ro:'ok', us:'bad',  gb:'warn',de:'ok',  nl:'ok',  jp:'ok'  }, label: { us:'US blocked', gb:'Limited' } },
    { icon: '🎵', name: 'TikTok',       note: 'Content & automation', status: { ro:'ok', us:'warn', gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  }, label: { us:'Restrictions' } },
    { icon: '🎬', name: 'Netflix US',   note: 'US content library',   status: { ro:'bad', us:'ok', gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US only', gb:'US only', de:'US only', nl:'US only', jp:'US only' } },
    { icon: '🏦', name: 'US Banks',     note: 'Chase, BoA, etc.',     status: { ro:'bad', us:'ok', gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US IP only', gb:'US IP only', de:'US IP only' } },
    { icon: '🍔', name: 'DoorDash',     note: 'US food delivery',     status: { ro:'bad', us:'ok', gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US only' } },
    { icon: '🛡️', name: 'Cloudflare',  note: 'Any CF-protected site', status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '🤖', name: 'OpenAI API',  note: 'GPT / DALL-E access',  status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '💜', name: 'Airbnb',      note: 'Listing scraping',      status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '🌐', name: 'DataDome',    note: 'Protected sites',       status: { ro:'ok', us:'ok',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
  ];

  function renderCountry(code) {
    const c = COUNTRIES[code];
    document.getElementById('country-meta').innerHTML = `
      <div class="cm-flag">${c.flag}</div>
      <div class="cm-info">
        <h3>${c.flag} ${c.name}</h3>
        <p>${c.isp}</p>
        <p style="margin-top:0.2rem;color:var(--accent);font-size:0.78rem;">${c.note}</p>
      </div>
      <div class="cm-price">${c.price}<span>/ month</span></div>
    `;

    const grid = document.getElementById('service-grid');
    grid.innerHTML = SERVICES.map(s => {
      const st = s.status[code] || 'ok';
      const lbl = (s.label && s.label[code]) || (st === 'ok' ? 'Works' : st === 'warn' ? 'Limited' : 'Blocked');
      const cls = st === 'ok' ? 'ok' : st === 'warn' ? 'warn' : 'bad';
      const badgeCls = st === 'ok' ? 'badge-ok' : st === 'warn' ? 'badge-warn' : 'badge-bad';
      return `
        <div class="svc-card ${cls}">
          <div class="svc-icon">${s.icon}</div>
          <div class="svc-info">
            <div class="svc-name">${s.name}</div>
            <div class="svc-note">${s.note}</div>
          </div>
          <span class="svc-badge ${badgeCls}">${lbl}</span>
        </div>`;
    }).join('');
  }

  document.querySelectorAll('.ctab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCountry(tab.dataset.country);
    });
  });
  renderCountry('ro'); // default

  // Rotating hero title
  const phrases = [
    'thinks it\'s human',
    'bypasses Cloudflare',
    'has no IP to ban',
    'types like a person',
    'runs on any server',
    'never gets detected',
  ];
  let i = 0;
  const el = document.getElementById('hero-rotating');

  function rotate() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 320);
  }

  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  setInterval(rotate, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>Human Browser — Stealth Playwright Browser with Residential Proxy | No Mac Mini | Virix Labs</title>
        <meta name="description" content="Run a human-like stealth browser on any server — no Mac Mini, no desktop required. Residential proxy (Romania, US, UK, DE). Bypasses Cloudflare, DataDome & PerimeterX. OpenClaw skill. From $13.99/mo. Accepts crypto + card." />
        <meta name="keywords" content="human browser, stealth browser, residential proxy, playwright anti-bot, bypass cloudflare bypass datadome, ai agent browser, openclaw skill, web scraping no ban, headless browser server, no mac mini browser, cloud browser playwright, instagram scraper, linkedin automation, polymarket bot" />
        <meta name="author" content="Virix Labs" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://humanbrowser.dev" />
        <meta property="og:title" content="Human Browser — Stealth Browser for AI Agents | Virix Labs" />
        <meta property="og:description" content="No Mac Mini. No local machine. Playwright + residential IP that looks 100% human. Bypasses any anti-bot. From $13.99/mo." />
        <meta property="og:url" content="https://humanbrowser.dev" />
        <meta property="og:image" content="https://virixlabs.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Human Browser — Stealth Browser for AI Agents" />
        <meta name="twitter:description" content="Residential proxy + iPhone 15 fingerprint + Bezier mouse. Bypasses Cloudflare, DataDome, PerimeterX." />
        <link rel="icon" href="https://virixlabs.com/favicon.ico" />
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
      <span class="nav-badge">OpenClaw</span>
    </a>

    <nav class="nav-links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#how">How it works</a>
      <a href="https://t.me/virixlabs" target="_blank" class="btn btn-primary nav-cta">Get Started →</a>
    </nav>

    <button class="nav-hamburger" id="hamburger" aria-label="Menu">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
  <div class="nav-mobile-menu" id="mobile-menu">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="#how">How it works</a>
    <a href="https://clawhub.ai/al1enjesus/human-browser" target="_blank">ClawHub Skill (free)</a>
    <div class="mobile-cta">
      <a href="https://t.me/virixlabs" target="_blank" class="btn btn-primary" style="width:100%;justify-content:center;">Get Started →</a>
    </div>
  </div>
</header>

<!-- ── HERO ─────────────────────────────────────────── -->
<div class="hero">
  <div class="hero-pill">
    <span class="live-dot"></span>
    Live · Romania Residential IP · Zero bans
  </div>

  <h1>
    The browser that<br>
    <span class="hero-rotating" id="hero-rotating">thinks it's human</span>
  </h1>

  <p>No Mac Mini. No local setup. A full Playwright browser that runs on any server, looks like an iPhone 15, and bypasses every bot detection system alive.</p>

  <div class="hero-btns">
    <a href="#pricing" class="btn btn-primary btn-lg">Start for $13.99/mo →</a>
    <a href="https://clawhub.ai/al1enjesus/human-browser" target="_blank" class="btn btn-secondary btn-lg">Install Free Skill</a>
  </div>
</div>

<!-- ── TRUST BAR ───────────────────────────────────── -->
<div class="trust-bar">
  <div class="trust-item"><span class="ck">✓</span> Bypasses Cloudflare</div>
  <div class="trust-item"><span class="ck">✓</span> Bypasses DataDome</div>
  <div class="trust-item"><span class="ck">✓</span> Bypasses PerimeterX</div>
  <div class="trust-item"><span class="ck">✓</span> Romania Residential IP</div>
  <div class="trust-item"><span class="ck">✓</span> Any Linux server</div>
  <div class="trust-item"><span class="ck">✓</span> OpenClaw native skill</div>
</div>

<!-- ── CODE PREVIEW ────────────────────────────────── -->
<div class="code-wrap">
  <div class="code-label">5 lines · any server · zero bans</div>
  <div class="code-window">
    <div class="code-bar">
      <div class="cd cd-r"></div><div class="cd cd-y"></div><div class="cd cd-g"></div>
      <span class="code-fname">scraper.js</span>
    </div>
    <pre><span class="kw">const</span> { <span class="fn">launchHuman</span> } = <span class="kw">require</span>(<span class="str">'human-browser'</span>);

<span class="kw">const</span> { page, humanType, humanScroll } = <span class="kw">await</span> <span class="fn">launchHuman</span>();
<span class="kw">await</span> page.<span class="fn">goto</span>(<span class="str">'https://instagram.com'</span>);
<span class="kw">await</span> <span class="fn">humanScroll</span>(page, <span class="str">'down'</span>);   <span class="cm">// smooth scroll with jitter</span>
<span class="kw">await</span> <span class="fn">humanType</span>(page, <span class="str">'input'</span>, <span class="str">'query'</span>);  <span class="cm">// 60–220ms/char</span>

<span class="cm">// ✅ Romanian IP · iPhone 15 fingerprint · webdriver=false</span></pre>
  </div>
</div>

<hr class="divider" style="margin-top:5rem;"/>

<!-- ── NO MAC MINI CALLOUT ─────────────────────────── -->
<div class="callout-wrap">
  <div class="callout">
    <div>
      <h2>Stop buying <span class="grad">hardware</span><br>for your AI agent</h2>
      <p>Most browser automation guides assume you have a Mac Mini, a desktop VPS, or a $500/mo cloud browser subscription. Human Browser runs on a $5 Linux VPS. Nothing else.</p>
      <ul class="callout-checks">
        <li>No display server, no VNC, no desktop required</li>
        <li>Chromium headless + residential proxy = real human fingerprint</li>
        <li>iPhone 15 Pro UA · Romania IP · Bucharest geolocation</li>
        <li>Bezier mouse · human-speed typing · natural scroll</li>
        <li>Works in Docker, GitHub Actions, any CI/CD pipeline</li>
      </ul>
    </div>
    <div>
      <div class="compare">
        <div class="cmp-head">
          <div class="cmp-cell">Solution</div>
          <div class="cmp-cell">Cost</div>
          <div class="cmp-cell">Anti-bot</div>
        </div>
        <div class="cmp-row">
          <div class="cmp-cell">Mac Mini</div>
          <div class="cmp-cell c-bad">$600 upfront</div>
          <div class="cmp-cell c-bad">Data center IP</div>
        </div>
        <div class="cmp-row">
          <div class="cmp-cell">Browserless.io</div>
          <div class="cmp-cell c-bad">$500+/mo</div>
          <div class="cmp-cell c-ok">Partial</div>
        </div>
        <div class="cmp-row">
          <div class="cmp-cell">Plain Playwright</div>
          <div class="cmp-cell c-ok">Free</div>
          <div class="cmp-cell c-bad">Instant ban</div>
        </div>
        <div class="cmp-row highlight">
          <div class="cmp-cell">Human Browser</div>
          <div class="cmp-cell c-good">$13.99/mo</div>
          <div class="cmp-cell c-good">✓ Full bypass</div>
        </div>
      </div>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── COUNTRY PICKER ────────────────────────────────── -->
<div id="countries" class="country-section">
  <div class="container">
    <div class="section-eyebrow">Residential IPs</div>
    <div class="section-title">Pick your country — see what works</div>
    <div class="section-sub">Different services block different IPs. Choose a location and instantly see which platforms are accessible. Your agent picks the right country automatically.</div>

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

    <p class="country-note">* Compatibility based on typical residential IP behavior. Some services may vary by specific ISP or account status.</p>
  </div>
</div>

<hr class="divider"/>

<!-- ── FEATURES ─────────────────────────────────────── -->
<div id="features" class="features-section">
  <div class="section-eyebrow">Features</div>
  <div class="section-title">Everything bots look for — covered</div>
  <div class="section-sub">Every signal Cloudflare, DataDome, and PerimeterX check. Handled before you write a line of code.</div>

  <div class="features-grid">
    <div class="feat"><div class="feat-icon">🇷🇴</div><h3>Romania Residential IP</h3><p>DIGI Romania & WS Telecom ISP. Real residential ASN. Looks like a person browsing from Bucharest.</p></div>
    <div class="feat"><div class="feat-icon">📱</div><h3>iPhone 15 Pro Fingerprint</h3><p>iOS 17.4.1 Safari UA, correct viewport, pixel ratio, touch events, platform string. Passes every fingerprint check.</p></div>
    <div class="feat"><div class="feat-icon">🖱️</div><h3>Bezier Mouse Curves</h3><p>Movement along randomized curved paths. Humans never go in straight lines — neither does this browser.</p></div>
    <div class="feat"><div class="feat-icon">⌨️</div><h3>Human Typing Speed</h3><p>60–220ms per keystroke with mid-word pauses. Works with React inputs where <code>page.fill()</code> silently fails.</p></div>
    <div class="feat"><div class="feat-icon">📜</div><h3>Natural Scroll Behavior</h3><p>Scrolls in smooth steps with random jitter. Pauses to "read" content. Looks exactly like a real user.</p></div>
    <div class="feat"><div class="feat-icon">🛡️</div><h3>Full Anti-Detection</h3><p><code>webdriver=false</code>, no automation flags, real plugin list, canvas fingerprint, real timezone & geo.</p></div>
    <div class="feat"><div class="feat-icon">🦅</div><h3>OpenClaw Native Skill</h3><p>One command install: <code>clawhub install al1enjesus/human-browser</code>. Your agent gets it instantly.</p></div>
    <div class="feat"><div class="feat-icon">🖥️</div><h3>Desktop Mode</h3><p>Switch to Windows Chrome fingerprint when needed: <code>launchHuman({ mobile: false })</code>.</p></div>
    <div class="feat"><div class="feat-icon">⚡</div><h3>Any Server, Zero Setup</h3><p>Bare Linux, Docker, CI/CD. Just Node.js + Chromium. No display server, no VNC, no X11.</p></div>
  </div>
</div>

<hr class="divider"/>

<!-- ── HOW IT WORKS ──────────────────────────────────── -->
<div id="how" class="how-section">
  <div class="how-grid">
    <div>
      <div class="section-eyebrow">How it works</div>
      <div class="section-title">Built for AI agents,<br>not just humans</div>
      <p class="section-sub">The API speaks agent. Pay with crypto. Get credentials programmatically. No dashboards to click.</p>
      <div class="steps">
        <div class="step">
          <div class="step-n">1</div>
          <div class="step-body">
            <h3>Agent calls <code>GET /plans</code></h3>
            <p>Sees pricing, bandwidth, and supported currencies. Machine-readable JSON.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">2</div>
          <div class="step-body">
            <h3>Agent calls <code>POST /buy</code></h3>
            <p>Picks plan + currency (USDT, ETH, BTC, or card). Gets payment address back.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">3</div>
          <div class="step-body">
            <h3>Payment auto-confirmed</h3>
            <p>0xProcessing or Stripe webhook fires. Credentials provisioned in seconds.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-n">4</div>
          <div class="step-body">
            <h3>Agent polls <code>GET /status/:id</code></h3>
            <p>Gets proxy credentials + API key. Drops into <code>.env</code>. Starts browsing.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="code-label" style="margin-top:0.5rem;">Agent purchase flow</div>
      <div class="agent-box">
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">GET /plans</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt">{ starter: <span class="af-ok">$13.99</span>, pro: $49.99 }</span></div>
        <div class="af-sep"></div>
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">POST /buy { plan: "starter", currency: "USDT" }</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt">{ address: <span class="af-addr">"0x4a3f…"</span>, amount: "13.99 USDT" }</span></div>
        <div class="af-sep"></div>
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">sends 13.99 USDT on-chain</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt"><span class="af-ok">✓ confirmed</span> · credentials ready</span></div>
        <div class="af-sep"></div>
        <div class="af"><span class="af-who ag">agent →</span><span class="af-txt">GET /status/inv_…</span></div>
        <div class="af"><span class="af-who sv">server ←</span><span class="af-txt">{ proxy_user: "…", proxy_pass: "…", <span class="af-ok">status: "active"</span> }</span></div>
      </div>
      <p style="font-size:0.75rem;color:var(--muted);margin-top:0.75rem;">Or pay with card — same flow, Stripe checkout link returned instead.</p>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── PRICING ───────────────────────────────────────── -->
<div id="pricing" class="pricing-section">
  <div class="section-eyebrow">Pricing</div>
  <div class="section-title">Simple, transparent pricing</div>
  <div class="section-sub">All plans include proxy credentials + OpenClaw skill + Telegram support. Cancel anytime.</div>

  <div class="pricing-grid">
    <div class="plan">
      <div class="plan-tier">Starter</div>
      <div class="plan-price">$13.99<sub>/mo</sub></div>
      <div class="plan-usage">2 GB bandwidth · $2.50/GB after</div>
      <ul class="plan-feats">
        <li>Romania residential IP</li>
        <li>iPhone 15 Pro + Desktop</li>
        <li>OpenClaw skill + credentials</li>
        <li>Cloudflare / DataDome bypass</li>
        <li>Telegram support</li>
        <li class="off">Multi-country rotation</li>
        <li class="off">CDP / Scraping Browser</li>
      </ul>
      <a href="https://t.me/virixlabs" target="_blank" class="plan-btn ghost">Get Started →</a>
    </div>

    <div class="plan popular">
      <div class="pop-tag">Most Popular</div>
      <div class="plan-tier">Pro</div>
      <div class="plan-price">$49.99<sub>/mo</sub></div>
      <div class="plan-usage">20 GB bandwidth · $2.00/GB after</div>
      <ul class="plan-feats">
        <li>Everything in Starter</li>
        <li>Multi-country IP rotation</li>
        <li>Scraping Browser CDP access</li>
        <li>Custom fingerprints</li>
        <li>Agent-native payment API</li>
        <li>Priority Telegram support</li>
      </ul>
      <a href="https://t.me/virixlabs" target="_blank" class="plan-btn solid">Get Started →</a>
    </div>

    <div class="plan">
      <div class="plan-tier">Enterprise</div>
      <div class="plan-price">$199<sub>/mo</sub></div>
      <div class="plan-usage">Unlimited · Dedicated zone</div>
      <ul class="plan-feats">
        <li>Everything in Pro</li>
        <li>Dedicated Romania zone</li>
        <li>White-label API endpoint</li>
        <li>1-on-1 onboarding call</li>
        <li>SLA guarantee</li>
        <li>Custom skill development</li>
      </ul>
      <a href="https://t.me/virixlabs" target="_blank" class="plan-btn ghost">Contact Us →</a>
    </div>
  </div>

  <div class="pay-note">
    💳 Stripe &nbsp;·&nbsp; 💵 USDT &nbsp;·&nbsp; ⟠ ETH &nbsp;·&nbsp; ₿ BTC &nbsp;·&nbsp;
    Questions? <a href="https://t.me/virixlabs" target="_blank">@virixlabs on Telegram</a>
  </div>
</div>

<hr class="divider"/>

<!-- ── FREE VS PAID ──────────────────────────────────── -->
<div class="fvp-section">
  <div class="container">
    <div class="section-eyebrow">What's included</div>
    <div class="section-title">Free vs Paid — no tricks</div>
    <div class="section-sub">The skill and code are open and free. You pay only for the residential proxy — the IP that makes everything work.</div>

    <div class="fvp-grid">
      <div class="fvp-card free">
        <div class="fvp-header">
          <span class="fvp-tag free-tag">FREE forever</span>
          <h3>OpenClaw Skill + Script</h3>
          <p>Everything you need to run the browser. No credit card, no account.</p>
        </div>
        <ul class="fvp-list">
          <li>✅ <code>browser-human.js</code> — full source code</li>
          <li>✅ Human mouse, typing, scroll logic</li>
          <li>✅ iPhone 15 Pro + Desktop fingerprints</li>
          <li>✅ Anti-detection stack (webdriver=false, etc.)</li>
          <li>✅ OpenClaw skill via clawhub</li>
          <li>✅ All future updates to the script</li>
          <li class="fvp-dim">⚠️ You need your own residential proxy</li>
          <li class="fvp-dim">⚠️ Without residential IP — sites will block you</li>
        </ul>
        <div class="fvp-install">
          <span class="fvp-install-label">Install free skill</span>
          <code style="font-size:0.82rem;padding:0.5rem 0.75rem;border-radius:8px;display:block;background:#0a0a0a;">clawhub install al1enjesus/human-browser</code>
        </div>
      </div>

      <div class="fvp-card paid">
        <div class="fvp-header">
          <span class="fvp-tag paid-tag">from $13.99/mo</span>
          <h3>Residential Proxy Credentials</h3>
          <p>The missing piece. A real home IP that makes your browser invisible to anti-bot systems.</p>
        </div>
        <ul class="fvp-list">
          <li>✅ Romania / US / UK / DE / NL / JP IPs</li>
          <li>✅ Real residential ISP (DIGI, AT&T, BT…)</li>
          <li>✅ Instant credential delivery after payment</li>
          <li>✅ Works out of the box with <code>browser-human.js</code></li>
          <li>✅ No Bright Data account needed</li>
          <li>✅ Telegram support included</li>
          <li>✅ Cancel anytime — no long-term contract</li>
        </ul>
        <a href="#pricing" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:auto;">See Plans →</a>
      </div>
    </div>

    <div class="fvp-why">
      <div class="fvp-why-icon">💡</div>
      <div>
        <strong>Why do you need a residential IP at all?</strong>
        <p>Data center IPs (from AWS, DigitalOcean, Hetzner — your regular VPS) are instantly recognized and blocked by Cloudflare, Instagram, LinkedIn, and most modern sites. A residential IP comes from a real home internet connection — it looks exactly like a normal person browsing. That's the only difference between getting blocked in 2 seconds and scraping forever.</p>
      </div>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── HOW TO PAY ─────────────────────────────────────── -->
<div class="pay-section">
  <div class="container">
    <div class="section-eyebrow">Payment</div>
    <div class="section-title">How to get started in 5 minutes</div>
    <div class="section-sub">Pick your country, choose how to pay, get credentials instantly. No bureaucracy.</div>

    <div class="pay-methods-grid">
      <div class="pay-method">
        <div class="pay-method-icon">💳</div>
        <h3>Credit / Debit Card</h3>
        <p>Processed by Stripe. Visa, Mastercard, Amex. Subscription auto-renews monthly. Cancel anytime from Telegram.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> DM <a href="https://t.me/virixlabs" target="_blank">@virixlabs</a> on Telegram</div>
          <div class="pay-step"><span class="ps-n">2</span> Receive a Stripe payment link</div>
          <div class="pay-step"><span class="ps-n">3</span> Pay — get credentials in 2 min</div>
        </div>
      </div>

      <div class="pay-method">
        <div class="pay-method-icon">💵</div>
        <h3>USDT (TRC-20 or ERC-20)</h3>
        <p>Most popular crypto option. Send exactly the amount shown. Processed by 0xProcessing — automatic confirmation.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> DM <a href="https://t.me/virixlabs" target="_blank">@virixlabs</a> or call <code>POST /buy</code></div>
          <div class="pay-step"><span class="ps-n">2</span> Receive USDT wallet address + amount</div>
          <div class="pay-step"><span class="ps-n">3</span> Send — credentials auto-delivered</div>
        </div>
      </div>

      <div class="pay-method">
        <div class="pay-method-icon">⟠</div>
        <h3>ETH / BTC</h3>
        <p>Ethereum and Bitcoin also accepted. Same automatic flow — no manual approval needed.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> Choose currency when buying</div>
          <div class="pay-step"><span class="ps-n">2</span> Get network-specific address</div>
          <div class="pay-step"><span class="ps-n">3</span> Send → credentials in ~10 min</div>
        </div>
      </div>

      <div class="pay-method">
        <div class="pay-method-icon">🤖</div>
        <h3>AI Agent (API)</h3>
        <p>Your agent can buy credentials programmatically. No human needed. Full JSON API — machine-readable responses.</p>
        <div class="pay-steps">
          <div class="pay-step"><span class="ps-n">1</span> Agent: <code>GET /plans</code></div>
          <div class="pay-step"><span class="ps-n">2</span> Agent: <code>POST /buy {currency:"USDT"}</code></div>
          <div class="pay-step"><span class="ps-n">3</span> Agent pays → polls <code>GET /status/:id</code></div>
        </div>
      </div>
    </div>

    <div class="pay-guarantee">
      <span>🔒 Credentials delivered within 10 minutes of payment confirmation.</span>
      <span>❌ Not satisfied? Full refund within 24h — no questions asked.</span>
    </div>
  </div>
</div>

<hr class="divider"/>

<!-- ── FAQ ───────────────────────────────────────────── -->
<div class="faq-section">
  <div class="container" style="max-width:720px;">
    <div class="section-eyebrow">FAQ</div>
    <div class="section-title">Common questions</div>

    <div class="faq-list">
      <details class="faq-item">
        <summary>Do I need a Mac Mini or desktop computer?</summary>
        <p>No. Human Browser runs on any Linux VPS, Docker container, or cloud server. A $5/mo Hetzner or Contabo VPS is all you need. No display server, no VNC, no X11 — just Node.js and Chromium.</p>
      </details>
      <details class="faq-item">
        <summary>What exactly is free and what costs money?</summary>
        <p>The <code>browser-human.js</code> script and the OpenClaw skill are completely free — open source, install anytime. The paid subscription gives you <strong>residential proxy credentials</strong>: a real home IP address from DIGI Romania, AT&T, BT, etc. Without a residential IP, anti-bot systems will block your VPS's data center IP instantly.</p>
      </details>
      <details class="faq-item">
        <summary>Why Romania? Can I use other countries?</summary>
        <p>Romania is the cheapest option and works for most tasks — Instagram, LinkedIn, Binance, Polymarket, Cloudflare sites. We also offer USA, UK, Germany, Netherlands, and Japan. Use the country picker above to see which services work where. Different services have different geo-restrictions.</p>
      </details>
      <details class="faq-item">
        <summary>How quickly do I get credentials after paying?</summary>
        <p>Card payments via Stripe: 2–3 minutes. Crypto (USDT/ETH): 5–10 minutes after on-chain confirmation. AI agent API: fully automatic, no human in the loop.</p>
      </details>
      <details class="faq-item">
        <summary>Can my AI agent buy this automatically?</summary>
        <p>Yes — that's the whole point. Call <code>GET /plans</code>, then <code>POST /buy</code> with your preferred currency. You'll get a crypto payment address. Your agent sends the payment, polls <code>GET /status/:id</code>, and receives proxy credentials in the response. Zero human involvement required.</p>
      </details>
      <details class="faq-item">
        <summary>Will this bypass Cloudflare / DataDome / PerimeterX?</summary>
        <p>Yes, in the vast majority of cases. The combination of a residential IP + realistic browser fingerprint (iPhone 15 Pro) + human behavior simulation (Bezier mouse, natural typing, scroll patterns) passes all major anti-bot systems. We've tested against all three.</p>
      </details>
      <details class="faq-item">
        <summary>What's an OpenClaw skill?</summary>
        <p>OpenClaw is an AI agent platform. Skills are reusable capability packages — install one and your agent gains specialized knowledge and tools. The Human Browser skill gives your OpenClaw agent the ability to launch a stealth browser with one function call: <code>launchHuman()</code>.</p>
      </details>
      <details class="faq-item">
        <summary>What if I want to cancel?</summary>
        <p>DM <a href="https://t.me/virixlabs" target="_blank">@virixlabs</a> on Telegram. We'll cancel your subscription immediately. If you're within 24h of purchase, you'll get a full refund — no questions.</p>
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
      <h3>Built by Virix Labs</h3>
      <p>AI-powered venture studio building focused products at scale. Human Browser is part of the OpenClaw skill ecosystem — tools that let AI agents work without human bottlenecks.</p>
    </div>
    <a href="https://virixlabs.com" target="_blank" class="btn btn-secondary">virixlabs.com ↗</a>
  </div>
</div>

<!-- ── FOOTER ────────────────────────────────────────── -->
<footer class="footer">
  <div class="footer-logo">
    <img src="https://virixlabs.com/logo.png" alt="Virix Labs"/>
    <span>Human Browser · Virix Labs</span>
  </div>
  <div class="footer-links">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a href="https://clawhub.ai/al1enjesus/human-browser" target="_blank">ClawHub</a>
    <a href="https://openclaw.ai" target="_blank">OpenClaw</a>
    <a href="https://virixlabs.com" target="_blank">Virix Labs</a>
    <a href="https://t.me/virixlabs" target="_blank">Support</a>
  </div>
  <p class="footer-copy">© 2026 Virix Labs · No Mac Mini needed · Runs on any server</p>
</footer>

<!-- ── SCRIPTS ───────────────────────────────────────── -->`;
