// ─────────────────────────────────────────────────────────────
//  init.js v5 — Human Browser landing page
//  • Hamburger menu
//  • Country picker + service matrix
//  • Payment bottom sheet (Stripe Embedded + Crypto inline)
// ─────────────────────────────────────────────────────────────

var STRIPE_PK = 'pk_live_51R5830GI1G0ctYHF3neTcrY2NsNZQqNfDVB6zVnVGuWWa66eFfk8qit16zL9RD2YutczWoQOxCB3Lx5ytrZEO0bR00Ne5VPCHR';

// ── STATE ─────────────────────────────────────────────────────
var currentPayPlan   = 'starter';
var activePayTab     = 'card';
var stripeInstance   = null;
var embeddedCheckout = null;

var PLAN_NAMES  = { starter: 'Starter',  pro: 'Pro',     enterprise: 'Enterprise' };
var PLAN_PRICES = { starter: '$13.99',   pro: '$49.99',  enterprise: '$199' };

// ── DOM READY ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // ── HAMBURGER ───────────────────────────────────────────────
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  // ── COUNTRY PICKER ──────────────────────────────────────────
  var COUNTRIES = {
    ro: { flag: '🇷🇴', name: 'Romania',        isp: 'DIGI Romania / WS Telecom',   price: '$13.99', note: 'Best price · Most popular' },
    us: { flag: '🇺🇸', name: 'United States',  isp: 'AT&T / Comcast / Verizon',    price: '$29.99', note: 'Required for US-only services' },
    gb: { flag: '🇬🇧', name: 'United Kingdom', isp: 'BT / Virgin Media',           price: '$24.99', note: 'EU-adjacent · Crypto & markets' },
    de: { flag: '🇩🇪', name: 'Germany',        isp: 'Deutsche Telekom / Vodafone', price: '$22.99', note: 'EU-compliant · GDPR-friendly' },
    nl: { flag: '🇳🇱', name: 'Netherlands',    isp: 'KPN / Ziggo',                 price: '$22.99', note: 'Privacy-friendly · Web3' },
    jp: { flag: '🇯🇵', name: 'Japan',          isp: 'NTT / SoftBank',              price: '$26.99', note: 'Japanese content · Line' },
  };

  var SERVICES = [
    { icon: '📊', name: 'Polymarket',  status: { ro:'ok', us:'bad',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  }, label: { us:'US blocked' } },
    { icon: '📸', name: 'Instagram',   status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '💼', name: 'LinkedIn',    status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '🔶', name: 'Binance',     status: { ro:'ok', us:'bad',  gb:'warn',de:'ok',  nl:'ok',  jp:'ok'  }, label: { us:'US blocked', gb:'Limited' } },
    { icon: '🎬', name: 'Netflix US',  status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US only' } },
    { icon: '🏦', name: 'US Banks',    status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US IP only' } },
    { icon: '🍔', name: 'DoorDash',    status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US only' } },
    { icon: '🛡️', name: 'Cloudflare', status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
  ];

  var activeCountry = 'ro';

  function renderCountry(code) {
    var c = COUNTRIES[code];
    if (!c) return;
    activeCountry = code;

    document.querySelectorAll('.country-tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.country === code);
    });

    var info = document.getElementById('country-info');
    if (info) {
      info.innerHTML =
        '<div class="ci-flag">' + c.flag + '</div>' +
        '<div><strong>' + c.name + '</strong> · ' + c.isp + '</div>' +
        '<div class="ci-price">' + c.price + '/mo</div>' +
        '<div class="ci-note">' + c.note + '</div>';
    }

    var grid = document.getElementById('service-grid');
    if (grid) {
      grid.innerHTML = SERVICES.map(function (s) {
        var st  = s.status[code] || 'ok';
        var lbl = (s.label && s.label[code]) ? s.label[code] : (st === 'ok' ? '✓' : st === 'warn' ? '~' : '✗');
        var cls = st === 'ok' ? 'svc-ok' : st === 'warn' ? 'svc-warn' : 'svc-bad';
        return '<div class="svc-item ' + cls + '">' +
               '<span class="svc-icon">' + s.icon + '</span>' +
               '<span class="svc-name">' + s.name + '</span>' +
               '<span class="svc-status">' + lbl + '</span></div>';
      }).join('');
    }
  }

  document.querySelectorAll('.country-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { renderCountry(this.dataset.country); });
  });

  renderCountry('ro');

  var countries = Object.keys(COUNTRIES);
  var cpIdx = 0;
  setInterval(function () {
    cpIdx = (cpIdx + 1) % countries.length;
    renderCountry(countries[cpIdx]);
  }, 3000);

}); // end DOMContentLoaded


// ── BOTTOM SHEET ──────────────────────────────────────────────

function openPayModal(plan) { openPaySheet(plan); } // backwards compat

function openPaySheet(plan) {
  currentPayPlan = plan || 'starter';

  var nameEl  = document.getElementById('pshPlanName');
  var priceEl = document.getElementById('pshPlanPrice');
  if (nameEl)  nameEl.textContent  = PLAN_NAMES[currentPayPlan]  + ' Plan';
  if (priceEl) priceEl.textContent = PLAN_PRICES[currentPayPlan] + '/mo';

  var backdrop = document.getElementById('payBackdrop');
  var sheet    = document.getElementById('paySheet');
  if (backdrop) backdrop.classList.add('open');
  if (sheet)    sheet.classList.add('open');

  // Lock body scroll
  document.body.style.overflow = 'hidden';

  // Default: card tab
  switchPayTab('card');
}

function closePaySheet() {
  var backdrop = document.getElementById('payBackdrop');
  var sheet    = document.getElementById('paySheet');
  if (backdrop) backdrop.classList.remove('open');
  if (sheet)    sheet.classList.remove('open');
  document.body.style.overflow = '';

  // Destroy embedded checkout if active
  if (embeddedCheckout) {
    try { embeddedCheckout.destroy(); } catch(e) {}
    embeddedCheckout = null;
  }
  // Reset crypto invoice
  var inv = document.getElementById('cryptoInvoice');
  if (inv) inv.innerHTML = '';
  document.querySelectorAll('.ccoin').forEach(function (b) {
    b.classList.remove('ccoin-active');
  });
}

function closePayModal() { closePaySheet(); } // backwards compat

// ── TABS ──────────────────────────────────────────────────────

function switchPayTab(tab) {
  activePayTab = tab;

  var cardTab   = document.getElementById('tabCard');
  var cryptoTab = document.getElementById('tabCrypto');
  var cardPane  = document.getElementById('tabContentCard');
  var cryptPane = document.getElementById('tabContentCrypto');

  if (cardTab)   cardTab.classList.toggle('pst-active',   tab === 'card');
  if (cryptoTab) cryptoTab.classList.toggle('pst-active', tab === 'crypto');
  if (cardPane)  cardPane.classList.toggle('psc-hidden',  tab !== 'card');
  if (cryptPane) cryptPane.classList.toggle('psc-hidden', tab !== 'crypto');

  if (tab === 'card') {
    initStripeCheckout();
  }
}

// ── STRIPE EMBEDDED CHECKOUT ─────────────────────────────────

async function initStripeCheckout() {
  var container = document.getElementById('stripe-checkout');
  if (!container) return;

  // Show spinner
  container.innerHTML =
    '<div class="psc-placeholder"><div class="pay-spinner"></div>' +
    '<p>Loading secure checkout…</p></div>';

  try {
    // Destroy old instance
    if (embeddedCheckout) {
      try { embeddedCheckout.destroy(); } catch(e) {}
      embeddedCheckout = null;
    }

    // Create checkout session → get client_secret
    var res  = await fetch('/api/buy', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ plan: currentPayPlan, currency: 'card' }),
    });
    var data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Server error');

    // Wait for Stripe.js
    var stripe = await waitForStripe();

    // Mount embedded checkout
    embeddedCheckout = await stripe.initEmbeddedCheckout({
      clientSecret: data.client_secret,
    });

    container.innerHTML = '';
    embeddedCheckout.mount('#stripe-checkout');

  } catch (e) {
    container.innerHTML =
      '<p style="color:#ef4444;padding:2rem;text-align:center;font-size:0.9rem;">' +
      '⚠ ' + e.message + '</p>' +
      '<p style="text-align:center;margin-top:0.5rem;">' +
      '<button class="pay-back-btn" onclick="initStripeCheckout()">↺ Retry</button></p>';
  }
}

function waitForStripe(attempts) {
  attempts = attempts || 0;
  return new Promise(function (resolve, reject) {
    if (typeof Stripe !== 'undefined') {
      if (!stripeInstance) stripeInstance = Stripe(STRIPE_PK);
      return resolve(stripeInstance);
    }
    if (attempts > 20) return reject(new Error('Stripe.js failed to load'));
    setTimeout(function () {
      waitForStripe(attempts + 1).then(resolve).catch(reject);
    }, 300);
  });
}

// ── CRYPTO INVOICE ────────────────────────────────────────────

async function selectCoin(coin) {
  // Highlight
  document.querySelectorAll('.ccoin').forEach(function (b) {
    b.classList.toggle('ccoin-active',
      b.getAttribute('onclick') && b.getAttribute('onclick').indexOf("'" + coin + "'") !== -1);
  });

  var invoice = document.getElementById('cryptoInvoice');
  if (!invoice) return;
  invoice.innerHTML =
    '<div class="psc-placeholder"><div class="pay-spinner"></div>' +
    '<p>Creating invoice…</p></div>';

  try {
    var res  = await fetch('/api/buy', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ plan: currentPayPlan, currency: coin }),
    });
    var data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Server error');

    var coinLabels = { USDT: '💵 USDT TRC20', BTC: '₿ Bitcoin', ETH: '⟠ Ethereum', SOL: '◎ Solana' };
    var addr = data.wallet_address || '';
    var amt  = data.amount_crypto  || PLAN_PRICES[currentPayPlan].replace('$', '');

    invoice.innerHTML =
      '<div class="crypto-invoice-box">' +
        '<div class="cib-title">' + (coinLabels[coin] || coin) + '</div>' +
        '<div class="cib-amount">' + amt + ' ' + coin + '</div>' +
        '<p class="cib-label">Send to this address:</p>' +
        '<div class="cib-addr" id="cryptoAddrEl">' + (addr || '—') + '</div>' +
        '<p class="cib-hint">Tap address to copy · Order: <code>' + (data.order_id || '') + '</code></p>' +
        '<p class="cib-confirm">⏱ Credentials delivered automatically after on-chain confirmation</p>' +
      '</div>';

    // Copy on tap
    var addrEl = document.getElementById('cryptoAddrEl');
    if (addrEl && addr) {
      addrEl.style.cursor = 'pointer';
      addrEl.addEventListener('click', function () {
        navigator.clipboard.writeText(addr).then(function () {
          addrEl.textContent = '✅ Copied!';
          setTimeout(function () { addrEl.textContent = addr; }, 2000);
        }).catch(function () {
          addrEl.textContent = addr; // fallback
        });
      });
    }

  } catch (e) {
    invoice.innerHTML =
      '<p style="color:#ef4444;padding:1.5rem;text-align:center;">⚠ ' + e.message + '</p>' +
      '<button class="pay-back-btn" onclick="selectCoin(\'' + coin + '\')">↺ Retry</button>';
  }
}

// ── LEGACY COMPAT (goPay) ─────────────────────────────────────
function goPay(plan, currency) {
  openPaySheet(plan);
  if (currency !== 'card') {
    setTimeout(function () {
      switchPayTab('crypto');
      setTimeout(function () { selectCoin(currency); }, 100);
    }, 200);
  }
}

// ── LEGACY buyPlan (still used in some buttons) ───────────────
function buyPlan(plan, currency) {
  if (currency === 'card') {
    openPaySheet(plan);
  } else {
    openPaySheet(plan);
    setTimeout(function () {
      switchPayTab('crypto');
      setTimeout(function () { selectCoin(currency); }, 200);
    }, 300);
  }
}
