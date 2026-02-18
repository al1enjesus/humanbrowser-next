
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




var currentPlan = 'starter';
var planPrices = { starter: '$13.99', pro: '$49.99', enterprise: '$199' };
var planNames  = { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };

function openPayModal(plan) {
  currentPlan = plan;
  document.getElementById('payModal').classList.add('open');
  document.getElementById('payModalContent').innerHTML =
    '<h3 style="margin-bottom:1rem;font-size:1.1rem;">Choose payment method</h3>' +
    '<p style="color:#999;font-size:0.85rem;margin-bottom:1.5rem;">' + planNames[plan] + ' — ' + planPrices[plan] + '/mo</p>' +
    '<div class="pay-options">' +
      '<button class="pay-opt" onclick="buyPlan('' + plan + '','card')">' +
        '<span class="pay-opt-icons">🍎 🤖 💳</span>' +
        '<span class="pay-opt-label">Apple Pay / Google Pay / Card</span>' +
        '<span class="pay-opt-sub">via Stripe</span>' +
      '</button>' +
      '<button class="pay-opt" onclick="buyPlan('' + plan + '','USDT')">' +
        '<span class="pay-opt-icons">💵</span>' +
        '<span class="pay-opt-label">USDT</span>' +
        '<span class="pay-opt-sub">TRC-20 or ERC-20</span>' +
      '</button>' +
      '<button class="pay-opt" onclick="buyPlan('' + plan + '','ETH')">' +
        '<span class="pay-opt-icons">⟠</span>' +
        '<span class="pay-opt-label">Ethereum</span>' +
        '<span class="pay-opt-sub">ERC-20</span>' +
      '</button>' +
      '<button class="pay-opt" onclick="buyPlan('' + plan + '','BTC')">' +
        '<span class="pay-opt-icons">₿</span>' +
        '<span class="pay-opt-label">Bitcoin</span>' +
        '<span class="pay-opt-sub">BTC mainnet</span>' +
      '</button>' +
      '<button class="pay-opt" onclick="buyPlan('' + plan + '','SOL')">' +
        '<span class="pay-opt-icons">◎</span>' +
        '<span class="pay-opt-label">Solana</span>' +
        '<span class="pay-opt-sub">SOL mainnet</span>' +
      '</button>' +
    '</div>';
}

function closePayModal() {
  document.getElementById('payModal').classList.remove('open');
}

async function buyPlan(plan, currency) {
  var content = document.getElementById('payModalContent');
  content.innerHTML = '<div class="pay-spinner"></div><p style="color:#999;font-size:0.9rem;margin-top:1rem;">Creating payment...</p>';

  try {
    var res = await fetch('/api/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: plan, currency: currency })
    });
    var data = await res.json();

    if (currency === 'card') {
      window.location.href = data.payment_url;
      return;
    }

    var coinLabels = { USDT: '💵 USDT', ETH: '⟠ ETH', BTC: '₿ BTC', SOL: '◎ SOL' };
    content.innerHTML =
      '<h3 style="margin-bottom:0.25rem;">' + (coinLabels[currency] || currency) + ' Payment</h3>' +
      '<p style="color:#999;font-size:0.82rem;margin-bottom:1rem;">' + planNames[plan] + ' · ' + planPrices[plan] + '/mo</p>' +
      '<div class="pay-amount">' + (data.amount_crypto || planPrices[plan].replace('$','')) + ' ' + currency + '</div>' +
      '<p style="color:#666;font-size:0.78rem;margin-bottom:0.4rem;">Send exactly this amount to:</p>' +
      '<div class="wallet-addr" onclick="copyAddr(this,'' + (data.wallet_address||'') + '')">' + (data.wallet_address || 'Address loading...') + '</div>' +
      '<p style="color:#555;font-size:0.72rem;margin-bottom:1rem;">Click to copy · Order: ' + (data.order_id||'') + '</p>' +
      '<p style="color:#06b6d4;font-size:0.8rem;margin-bottom:1rem;">⏱ Credentials delivered automatically after confirmation</p>' +
      '<button class="pay-back-btn" onclick="openPayModal('' + plan + '')">← Back</button>';
  } catch(e) {
    content.innerHTML =
      '<p style="color:#ef4444;margin-bottom:1rem;">Error: ' + e.message + '</p>' +
      '<button class="pay-back-btn" onclick="openPayModal('' + plan + '')">← Try again</button>';
  }
}

function copyAddr(el, addr) {
  navigator.clipboard.writeText(addr).then(function() {
    el.textContent = '✅ Copied!';
    setTimeout(function() { el.textContent = addr; }, 2000);
  });
}
