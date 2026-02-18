// ── HAMBURGER MENU ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function() { menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { menu.classList.remove('open'); });
    });
  }

  // ── COUNTRY PICKER ────────────────────────────────────────
  var COUNTRIES = {
    ro: { flag: '🇷🇴', name: 'Romania',        isp: 'DIGI Romania / WS Telecom',   price: '$13.99', note: 'Best price · Most popular' },
    us: { flag: '🇺🇸', name: 'United States',  isp: 'AT&T / Comcast / Verizon',    price: '$29.99', note: 'Required for US-only services' },
    gb: { flag: '🇬🇧', name: 'United Kingdom', isp: 'BT / Virgin Media',           price: '$24.99', note: 'EU-adjacent · Crypto & markets' },
    de: { flag: '🇩🇪', name: 'Germany',        isp: 'Deutsche Telekom / Vodafone', price: '$22.99', note: 'EU-compliant · GDPR-friendly' },
    nl: { flag: '🇳🇱', name: 'Netherlands',    isp: 'KPN / Ziggo',                 price: '$22.99', note: 'Privacy-friendly · Web3' },
    jp: { flag: '🇯🇵', name: 'Japan',          isp: 'NTT / SoftBank',              price: '$26.99', note: 'Japanese content · Line' },
  };

  var SERVICES = [
    { icon: '📊', name: 'Polymarket',   status: { ro:'ok', us:'bad',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  }, label: { us:'US blocked' } },
    { icon: '📸', name: 'Instagram',    status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '💼', name: 'LinkedIn',     status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
    { icon: '🔶', name: 'Binance',      status: { ro:'ok', us:'bad',  gb:'warn',de:'ok',  nl:'ok',  jp:'ok'  }, label: { us:'US blocked', gb:'Limited' } },
    { icon: '🎬', name: 'Netflix US',   status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US only' } },
    { icon: '🏦', name: 'US Banks',     status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US IP only' } },
    { icon: '🍔', name: 'DoorDash',     status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, label: { ro:'US only' } },
    { icon: '🛡️', name: 'Cloudflare',  status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
  ];

  var activeCountry = 'ro';

  function renderCountry(code) {
    var c = COUNTRIES[code];
    if (!c) return;
    activeCountry = code;

    // Update tabs
    document.querySelectorAll('.country-tab').forEach(function(t) {
      t.classList.toggle('active', t.dataset.country === code);
    });

    // Update info
    var info = document.getElementById('country-info');
    if (info) {
      info.innerHTML =
        '<div class="ci-flag">' + c.flag + '</div>' +
        '<div><strong>' + c.name + '</strong> · ' + c.isp + '</div>' +
        '<div class="ci-price">' + c.price + '/mo</div>' +
        '<div class="ci-note">' + c.note + '</div>';
    }

    // Update service grid
    var grid = document.getElementById('service-grid');
    if (grid) {
      grid.innerHTML = SERVICES.map(function(s) {
        var st = s.status[code] || 'ok';
        var lbl = (s.label && s.label[code]) ? s.label[code] : (st === 'ok' ? '✓' : st === 'warn' ? '~' : '✗');
        var cls = st === 'ok' ? 'svc-ok' : st === 'warn' ? 'svc-warn' : 'svc-bad';
        return '<div class="svc-item ' + cls + '"><span class="svc-icon">' + s.icon + '</span>' +
               '<span class="svc-name">' + s.name + '</span>' +
               '<span class="svc-status">' + lbl + '</span></div>';
      }).join('');
    }
  }

  // Bind tabs
  document.querySelectorAll('.country-tab').forEach(function(tab) {
    tab.addEventListener('click', function() { renderCountry(this.dataset.country); });
  });

  // Initial render
  renderCountry('ro');

  // Auto-rotate
  var countries = Object.keys(COUNTRIES);
  var idx = 0;
  setInterval(function() {
    idx = (idx + 1) % countries.length;
    renderCountry(countries[idx]);
  }, 3000);

  // ── PAYMENT MODAL ─────────────────────────────────────────
  var payModal = document.getElementById('payModal');
  if (payModal) {
    payModal.addEventListener('click', function(e) {
      if (e.target === this) closePayModal();
    });
  }
});

// ── GLOBAL PAYMENT FUNCTIONS ──────────────────────────────────

var currentPlan = 'starter';
var planPrices = { starter: '$13.99', pro: '$49.99', enterprise: '$199' };
var planNames  = { starter: 'Starter', pro: 'Pro', enterprise: 'Enterprise' };

function openPayModal(plan) {
  currentPlan = plan;
  var modal = document.getElementById('payModal');
  var content = document.getElementById('payModalContent');
  if (!modal || !content) return;
  modal.classList.add('open');
  content.innerHTML =
    '<h3 style="margin-bottom:0.5rem;font-size:1.1rem;">Choose payment method</h3>' +
    '<p style="color:#999;font-size:0.85rem;margin-bottom:1.25rem;">' + planNames[plan] + ' — ' + planPrices[plan] + '/mo</p>' +

    // ── Stripe big button ──
    '<button class="pay-opt pay-opt-stripe" onclick="buyPlan(\'' + plan + '\',\'card\')">' +
      '<span class="pay-opt-main-label">Pay With Stripe</span>' +
      '<span class="pay-opt-badges">' +
        '<span class="pay-badge">🍎 Apple Pay</span>' +
        '<span class="pay-badge">🤖 Google Pay</span>' +
        '<span class="pay-badge">💳 Visa</span>' +
        '<span class="pay-badge">Mastercard</span>' +
      '</span>' +
    '</button>' +

    // ── Divider ──
    '<div class="pay-divider"><span>or pay with crypto</span></div>' +

    // ── Crypto grid ──
    '<div class="pay-crypto-grid">' +
      '<button class="pay-crypto-btn pay-crypto-usdt" onclick="buyPlan(\'' + plan + '\',\'USDT\')">' +
        '<span class="pcc-icon">💵</span>' +
        '<span class="pcc-name">USDT</span>' +
        '<span class="pcc-net">TRC20</span>' +
      '</button>' +
      '<button class="pay-crypto-btn" onclick="buyPlan(\'' + plan + '\',\'BTC\')">' +
        '<span class="pcc-icon">₿</span>' +
        '<span class="pcc-name">BTC</span>' +
        '<span class="pcc-net">Bitcoin</span>' +
      '</button>' +
      '<button class="pay-crypto-btn" onclick="buyPlan(\'' + plan + '\',\'ETH\')">' +
        '<span class="pcc-icon">⟠</span>' +
        '<span class="pcc-name">ETH</span>' +
        '<span class="pcc-net">ERC20</span>' +
      '</button>' +
      '<button class="pay-crypto-btn" onclick="buyPlan(\'' + plan + '\',\'SOL\')">' +
        '<span class="pcc-icon">◎</span>' +
        '<span class="pcc-name">SOL</span>' +
        '<span class="pcc-net">Solana</span>' +
      '</button>' +
    '</div>';
}

function closePayModal() {
  var modal = document.getElementById('payModal');
  if (modal) modal.classList.remove('open');
}

async function buyPlan(plan, currency) {
  var content = document.getElementById('payModalContent');
  if (!content) return;
  content.innerHTML =
    '<div class="pay-spinner"></div>' +
    '<p style="color:#999;font-size:0.9rem;margin-top:1rem;">Creating payment...</p>';

  try {
    var res = await fetch('/api/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: plan, currency: currency })
    });
    var data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Server error');

    if (currency === 'card') {
      window.location.href = data.payment_url;
      return;
    }

    var coinLabels = { USDT: '💵 USDT', ETH: '⟠ ETH', BTC: '₿ BTC', SOL: '◎ SOL' };
    var addr = data.wallet_address || '';
    var amt  = data.amount_crypto || planPrices[plan].replace('$','');

    content.innerHTML =
      '<h3 style="margin-bottom:0.25rem;">' + (coinLabels[currency] || currency) + ' Payment</h3>' +
      '<p style="color:#999;font-size:0.82rem;margin-bottom:1rem;">' + planNames[plan] + ' · ' + planPrices[plan] + '/mo</p>' +
      '<div class="pay-amount">' + amt + ' ' + currency + '</div>' +
      '<p style="color:#666;font-size:0.78rem;margin-bottom:0.4rem;">Send exactly this amount to:</p>' +
      '<div class="wallet-addr" id="walletAddrEl">' + (addr || 'Loading address...') + '</div>' +
      '<p style="color:#555;font-size:0.72rem;margin-bottom:1rem;">Click to copy · Order: ' + (data.order_id || '') + '</p>' +
      '<p style="color:#06b6d4;font-size:0.8rem;margin-bottom:1rem;">⏱ Credentials delivered automatically after confirmation</p>' +
      '<button class="pay-back-btn" onclick="openPayModal(\'' + plan + '\')">← Back</button>';

    // Copy on click
    var addrEl = document.getElementById('walletAddrEl');
    if (addrEl && addr) {
      addrEl.style.cursor = 'pointer';
      addrEl.addEventListener('click', function() {
        navigator.clipboard.writeText(addr).then(function() {
          addrEl.textContent = '✅ Copied!';
          setTimeout(function() { addrEl.textContent = addr; }, 2000);
        });
      });
    }
  } catch(e) {
    content.innerHTML =
      '<p style="color:#ef4444;margin-bottom:1rem;">Error: ' + e.message + '</p>' +
      '<button class="pay-back-btn" onclick="openPayModal(\'' + plan + '\')">← Try again</button>';
  }
}

// ── DIRECT PAY (no modal) ──────────────────────────────────────
function goPay(plan, currency) {
  // Show loading overlay
  var overlay = document.getElementById('payLoading');
  var msg     = document.getElementById('payLoadingMsg');
  if (overlay) overlay.classList.add('show');
  if (msg) msg.textContent = currency === 'card'
    ? 'Opening Stripe Checkout...'
    : 'Creating ' + currency + ' payment...';

  fetch('/api/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan: plan, currency: currency })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.payment_url) {
      window.location.href = data.payment_url;
    } else {
      if (overlay) overlay.classList.remove('show');
      alert('Error: ' + (data.error || 'Unknown error'));
    }
  })
  .catch(function(e) {
    if (overlay) overlay.classList.remove('show');
    alert('Network error: ' + e.message);
  });
}
