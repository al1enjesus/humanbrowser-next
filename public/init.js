function initPage() {

  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Human Browser",
    "description": "A stealth Playwright browser with residential proxy that acts like a real human. Runs on any Linux server without a Mac Mini or desktop. Bypasses Cloudflare, DataDome and PerimeterX. Official OpenClaw skill.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Linux, Windows, macOS",
    "url": "https://humanbrowser.dev",
    "offers": {
      "@type": "Offer",
      "price": "13.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-01-01"
    },
    "publisher": { "@type": "Organization", "name": "Virix Labs", "url": "https://virixlabs.com" }
  }
  

  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is Human Browser?", "acceptedAnswer": { "@type": "Answer", "text": "Human Browser is a Playwright-based browser automation tool that uses residential proxy IPs and mimics real human behavior (mouse movement, typing speed, scroll patterns) to bypass anti-bot systems like Cloudflare, DataDome, and PerimeterX." } },
      { "@type": "Question", "name": "Do I need a Mac Mini to run it?", "acceptedAnswer": { "@type": "Answer", "text": "No. Human Browser runs on any Linux server, VPS, Docker container, or CI/CD pipeline. No display server, no VNC, no desktop environment required — just Node.js and Chromium." } },
      { "@type": "Question", "name": "What is free and what is paid?", "acceptedAnswer": { "@type": "Answer", "text": "The OpenClaw skill and browser-human.js script are completely free to install and use. The paid plans ($13.99/mo and up) provide residential proxy credentials — the IP address that makes the browser appear human. Without a residential IP, most anti-bot systems will block requests." } },
      { "@type": "Question", "name": "How do I pay?", "acceptedAnswer": { "@type": "Answer", "text": "We accept Stripe (credit/debit card), USDT, ETH, and Bitcoin. Crypto payments are processed via 0xProcessing and credentials are delivered automatically within minutes." } },
      { "@type": "Question", "name": "Which countries are supported?", "acceptedAnswer": { "@type": "Answer", "text": "Currently Romania (from $13.99/mo), USA ($29.99/mo), UK ($24.99/mo), Germany ($22.99/mo), Netherlands ($22.99/mo), and Japan ($26.99/mo). Each country has different service compatibility — see the country picker on our site." } }
    ]
  }
  

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

async function buyPlan(plan, currency) {
  const modal = document.getElementById('payModal');
  const content = document.getElementById('payModalContent');
  modal.classList.add('open');
  content.innerHTML = '<div class="pay-spinner"></div><p style="color:#999;font-size:0.9rem;">Creating payment...</p>';

  try {
    const res = await fetch('https://humanbrowser.dev/api/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, currency, email: '' })
    });
    const data = await res.json();

    if (currency === 'card') {
      // Redirect to Stripe Checkout
      modal.classList.remove('open');
      window.location.href = data.payment_url;
      return;
    }

    // Crypto modal
    const labels = { USDT: '💵 USDT', ETH: '⟠ ETH', BTC: '₿ BTC' };
    const planNames = { starter: 'Starter $13.99', pro: 'Pro $49.99', enterprise: 'Enterprise $199' };
    content.innerHTML = \`
      <h3>\${labels[currency] || currency} Payment</h3>
      <p style="color:#999;font-size:0.85rem;margin-bottom:0.5rem;">\${planNames[plan] || plan} · 1 month</p>
      <div class="amount-big">\${data.amount_crypto} \${currency}</div>
      <p style="color:#666;font-size:0.78rem;">Send exactly this amount to:</p>
      <div class="wallet-addr" onclick="navigator.clipboard.writeText('\${data.wallet_address}');this.textContent='✅ Copied!'">
        \${data.wallet_address}
      </div>
      <p style="color:#666;font-size:0.75rem;">Click address to copy · Order: \${data.order_id}</p>
      <p style="color:#06b6d4;font-size:0.8rem;">⏱ Credentials delivered automatically after confirmation</p>
      <button class="close-btn" onclick="document.getElementById('payModal').classList.remove('open')">Close</button>
    \`;
  } catch(e) {
    content.innerHTML = \`<p style="color:#ef4444;">Error: \${e.message}</p>
      <button class="close-btn" onclick="document.getElementById('payModal').classList.remove('open')">Close</button>\`;
  }
}

// Close modal on overlay click
document.getElementById('payModal').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('open');
});


}
