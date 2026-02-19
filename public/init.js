// ─────────────────────────────────────────────────────────────
//  init.js v8 — Human Browser
//  • i18n (EN / RU / ES / ZH) — auto-detect + manual toggle
//  • Hero rotating phrases
//  • Country picker (fixed selectors)
//  • Hamburger, copy, payment sheet
// ─────────────────────────────────────────────────────────────

var STRIPE_PK = 'pk_live_51R5830GI1G0ctYHF3neTcrY2NsNZQqNfDVB6zVnVGuWWa66eFfk8qit16zL9RD2YutczWoQOxCB3Lx5ytrZEO0bR00Ne5VPCHR';

// ═══════════════════════════════════════════════════════════════
//  TRANSLATIONS
// ═══════════════════════════════════════════════════════════════

var TRANSLATIONS = {
  en: {
    hero_pill:     'Any country · Residential IP · Zero bans',
    hero_prefix:   'The browser that',
    hero_desc:     'No Mac Mini. No local setup. A full Playwright browser that runs on any server, looks like a real device, and bypasses every bot detection system alive.',
    install_available: 'Available on',
    nav_features:  'Features',
    nav_pricing:   'Pricing',
    nav_how:       'How it works',
    nav_cta:       'Get Started →',
    countries_eyebrow: 'Residential IPs',
    countries_title:   'Pick your country — see what works',
    countries_sub:     'Different services block different IPs. Choose a location and instantly see which platforms are accessible. Your agent picks the right country automatically.',
    features_eyebrow:  'Features',
    features_title:    'Everything bots look for — covered',
    features_sub:      'Every signal Cloudflare, DataDome, and PerimeterX check. Handled before you write a line of code.',
    rotating: [
      "thinks it's human",
      "passes every fingerprint check",
      "moves like a real person",
      "bypasses Cloudflare, always",
      "has no idea it's a bot",
      "reads, scrolls, types — just like you",
      "lives rent-free on your server",
      "never triggers a CAPTCHA",
    ],
  },
  ru: {
    hero_pill:     'Любая страна · Резидентный IP · Ноль банов',
    hero_prefix:   'Браузер, который',
    hero_desc:     'Без Mac Mini. Без локальной настройки. Полноценный Playwright-браузер на любом сервере — выглядит как реальное устройство и обходит любую защиту от ботов.',
    install_available: 'Доступно на',
    nav_features:  'Функции',
    nav_pricing:   'Тарифы',
    nav_how:       'Как это работает',
    nav_cta:       'Начать →',
    countries_eyebrow: 'Резидентные IP',
    countries_title:   'Выбери страну — смотри что работает',
    countries_sub:     'Разные сервисы блокируют разные IP. Выбери регион и мгновенно увидишь, какие платформы доступны. Агент сам выбирает нужную страну.',
    features_eyebrow:  'Возможности',
    features_title:    'Всё что ищут антиботы — перекрыто',
    features_sub:      'Каждый сигнал Cloudflare, DataDome и PerimeterX. Обрабатывается до того, как ты напишешь строку кода.',
    rotating: [
      "думает, что он человек",
      "проходит любой fingerprint-чек",
      "двигается как живой",
      "обходит Cloudflare всегда",
      "понятия не имеет, что он бот",
      "читает, скроллит, печатает — как ты",
      "живёт на твоём сервере бесплатно",
      "никогда не триггерит CAPTCHA",
    ],
  },
  es: {
    hero_pill:     'Cualquier país · IP residencial · Cero bloqueos',
    hero_prefix:   'El navegador que',
    hero_desc:     'Sin Mac Mini. Sin configuración local. Un navegador Playwright completo que corre en cualquier servidor, parece un dispositivo real y evita todo sistema anti-bot.',
    install_available: 'Disponible en',
    nav_features:  'Características',
    nav_pricing:   'Precios',
    nav_how:       'Cómo funciona',
    nav_cta:       'Empezar →',
    countries_eyebrow: 'IPs Residenciales',
    countries_title:   'Elige tu país — ve qué funciona',
    countries_sub:     'Diferentes servicios bloquean diferentes IPs. Elige una ubicación y ve al instante qué plataformas son accesibles. Tu agente elige el país automáticamente.',
    features_eyebrow:  'Características',
    features_title:    'Todo lo que detectan los bots — cubierto',
    features_sub:      'Cada señal que Cloudflare, DataDome y PerimeterX comprueban. Gestionada antes de escribir una línea de código.',
    rotating: [
      "cree que es humano",
      "pasa cada verificación de huella digital",
      "se mueve como una persona real",
      "evita Cloudflare siempre",
      "no sabe que es un bot",
      "lee, hace scroll, escribe — como tú",
      "vive gratis en tu servidor",
      "nunca activa un CAPTCHA",
    ],
  },
  zh: {
    hero_pill:     '任意国家 · 住宅IP · 零封禁',
    hero_prefix:   '这个浏览器',
    hero_desc:     '无需Mac Mini，无需本地配置。完整的Playwright浏览器，可在任何服务器上运行，看起来像真实设备，绕过所有反爬虫系统。',
    install_available: '可用平台',
    nav_features:  '功能',
    nav_pricing:   '定价',
    nav_how:       '工作原理',
    nav_cta:       '立即开始 →',
    countries_eyebrow: '住宅IP',
    countries_title:   '选择国家 — 查看可用服务',
    countries_sub:     '不同服务封锁不同IP。选择地区，即时查看哪些平台可访问。您的Agent自动选择合适的国家。',
    features_eyebrow:  '功能特点',
    features_title:    '反检测全覆盖',
    features_sub:      'Cloudflare、DataDome和PerimeterX检测的每个信号，在您写代码之前就已处理完毕。',
    rotating: [
      "以为自己是人类",
      "通过所有指纹检测",
      "移动方式像真人",
      "始终绕过 Cloudflare",
      "完全不知道自己是机器人",
      "阅读、滚动、输入——就像你",
      "免费住在你的服务器上",
      "从不触发验证码",
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════

var currentLang              = 'en';
var currentRotatingPhrases   = TRANSLATIONS.en.rotating;
var rotIdx                   = 0;
var currentPayPlan           = 'starter';
var activePayTab             = 'card';
var stripeInstance           = null;
var embeddedCheckout         = null;

var PLAN_NAMES  = { starter: 'Starter',  pro: 'Pro',     enterprise: 'Enterprise' };
var PLAN_PRICES = { starter: '$13.99',   pro: '$49.99',  enterprise: '$199' };

// ═══════════════════════════════════════════════════════════════
//  i18n
// ═══════════════════════════════════════════════════════════════

function detectLang() {
  try {
    var saved = localStorage.getItem('hb_lang');
    if (saved && TRANSLATIONS[saved]) return saved;
  } catch(e) {}
  var lang = ((navigator.languages && navigator.languages[0]) || navigator.language || 'en').toLowerCase().slice(0, 2);
  if (lang === 'ru') return 'ru';
  if (lang === 'es') return 'es';
  if (lang === 'zh') return 'zh';
  return 'en';
}

function applyLang(lang) {
  var t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  currentLang = lang;

  // Apply data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.classList.toggle('lang-active', b.getAttribute('data-lang') === lang);
  });

  // Update rotating phrases
  currentRotatingPhrases = t.rotating || TRANSLATIONS.en.rotating;
  rotIdx = 0;
  var rotEl = document.getElementById('hero-rotating');
  if (rotEl) { rotEl.style.opacity = '0'; rotEl.textContent = currentRotatingPhrases[0]; rotEl.style.opacity = '1'; }

  try { localStorage.setItem('hb_lang', lang); } catch(e) {}
}

function setLang(lang) { applyLang(lang); }

// ═══════════════════════════════════════════════════════════════
//  COUNTRY PICKER DATA
// ═══════════════════════════════════════════════════════════════

var COUNTRIES = {
  ro: { flag: '🇷🇴', name: 'Romania',        isp: 'DIGI Romania / WS Telecom',   price: '$13.99', note: 'Best price · Most popular' },
  us: { flag: '🇺🇸', name: 'United States',  isp: 'AT&T / Comcast / Verizon',    price: '$29.99', note: 'Required for US-only services' },
  gb: { flag: '🇬🇧', name: 'United Kingdom', isp: 'BT / Virgin Media',           price: '$24.99', note: 'EU-adjacent · Crypto & markets' },
  de: { flag: '🇩🇪', name: 'Germany',        isp: 'Deutsche Telekom / Vodafone', price: '$22.99', note: 'EU-compliant · GDPR-friendly' },
  nl: { flag: '🇳🇱', name: 'Netherlands',    isp: 'KPN / Ziggo',                 price: '$22.99', note: 'Privacy-friendly · Web3' },
  jp: { flag: '🇯🇵', name: 'Japan',          isp: 'NTT / SoftBank',              price: '$26.99', note: 'Japanese content · Line' },
};

var SERVICES = [
  { icon: '📊', name: 'Polymarket',  status: { ro:'ok', us:'bad',  gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  }, note: { us:'Blocked in US' } },
  { icon: '📸', name: 'Instagram',   status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
  { icon: '💼', name: 'LinkedIn',    status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
  { icon: '🔶', name: 'Binance',     status: { ro:'ok', us:'bad',  gb:'warn',de:'ok',  nl:'ok',  jp:'ok'  }, note: { us:'Blocked in US', gb:'Limited' } },
  { icon: '🎬', name: 'Netflix US',  status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, note: { ro:'US IP required' } },
  { icon: '🏦', name: 'US Banking',  status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, note: { ro:'US IP only' } },
  { icon: '🍔', name: 'DoorDash',    status: { ro:'bad',us:'ok',   gb:'bad', de:'bad', nl:'bad', jp:'bad' }, note: { ro:'US only' } },
  { icon: '🛡️', name: 'Cloudflare', status: { ro:'ok', us:'ok',   gb:'ok',  de:'ok',  nl:'ok',  jp:'ok'  } },
];

// ═══════════════════════════════════════════════════════════════
//  DOM READY
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  // ── Detect & apply language ──────────────────────────────────
  applyLang(detectLang());

  // ── Hero rotating text ───────────────────────────────────────
  setInterval(function() {
    rotIdx = (rotIdx + 1) % currentRotatingPhrases.length;
    var el = document.getElementById('hero-rotating');
    if (!el) return;
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '0';
    setTimeout(function() {
      el.textContent = currentRotatingPhrases[rotIdx];
      el.style.opacity = '1';
    }, 300);
  }, 3200);

  // ── Hamburger ────────────────────────────────────────────────
  var hbtn = document.getElementById('hamburger');
  var hmenu = document.getElementById('mobile-menu');
  if (hbtn && hmenu) {
    hbtn.addEventListener('click', function() { hmenu.classList.toggle('open'); });
    hmenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { hmenu.classList.remove('open'); });
    });
  }

  // ── Country picker ───────────────────────────────────────────
  function renderCountry(code) {
    var c = COUNTRIES[code];
    if (!c) return;

    // Highlight active tab — HTML uses class "ctab"
    document.querySelectorAll('.ctab').forEach(function(t) {
      t.classList.toggle('active', t.getAttribute('data-country') === code);
    });

    // Country meta info — HTML has id="country-meta"
    var meta = document.getElementById('country-meta');
    if (meta) {
      meta.innerHTML =
        '<div class="cm-flag">' + c.flag + '</div>' +
        '<div class="cm-info">' +
          '<h3>' + c.name + '</h3>' +
          '<p>' + c.isp + ' · ' + c.note + '</p>' +
        '</div>' +
        '<div class="cm-price">' + c.price + '<span>/mo</span></div>';
    }

    // Service grid — CSS uses .svc-card, .ok/.warn/.bad, .svc-badge
    var grid = document.getElementById('service-grid');
    if (grid) {
      grid.innerHTML = SERVICES.map(function(s) {
        var st  = s.status[code] || 'ok';
        var noteText = (s.note && s.note[code]) ? s.note[code] : (st === 'ok' ? 'Available' : st === 'warn' ? 'Limited' : 'Blocked');
        var badgeCls = st === 'ok' ? 'badge-ok' : st === 'warn' ? 'badge-warn' : 'badge-bad';
        var badgeTxt = st === 'ok' ? '✓' : st === 'warn' ? '~' : '✗';
        return (
          '<div class="svc-card ' + st + '">' +
            '<span class="svc-icon">' + s.icon + '</span>' +
            '<div class="svc-info">' +
              '<div class="svc-name">' + s.name + '</div>' +
              '<div class="svc-note">' + noteText + '</div>' +
            '</div>' +
            '<span class="svc-badge ' + badgeCls + '">' + badgeTxt + '</span>' +
          '</div>'
        );
      }).join('');
    }
  }

  // Bind tab clicks
  document.querySelectorAll('.ctab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      renderCountry(this.getAttribute('data-country'));
    });
  });

  // Initial render
  renderCountry('ro');

  // Auto-rotate countries (slower — 4s)
  var countryKeys = Object.keys(COUNTRIES);
  var cpIdx = 0;
  setInterval(function() {
    cpIdx = (cpIdx + 1) % countryKeys.length;
    renderCountry(countryKeys[cpIdx]);
  }, 4000);

}); // end DOMContentLoaded


// ═══════════════════════════════════════════════════════════════
//  COPY INSTALL COMMAND
// ═══════════════════════════════════════════════════════════════

function copyInstallCmd() {
  var cmd = 'clawhub install al1enjesus/human-browser';
  var btn = document.getElementById('heroInstallCopy');
  navigator.clipboard.writeText(cmd).then(function() {
    if (btn) {
      btn.classList.add('copied');
      btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(function() {
        btn.classList.remove('copied');
        btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
      }, 2000);
    }
  }).catch(function() {
    var el = document.getElementById('heroInstallCmd');
    if (el) { var r = document.createRange(); r.selectNodeContents(el); window.getSelection().removeAllRanges(); window.getSelection().addRange(r); }
  });
}


// ═══════════════════════════════════════════════════════════════
//  PAYMENT BOTTOM SHEET
// ═══════════════════════════════════════════════════════════════

function openPayModal(plan) { openPaySheet(plan); }

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
  document.body.style.overflow = 'hidden';
  switchPayTab('card');
}

function closePaySheet() {
  var backdrop = document.getElementById('payBackdrop');
  var sheet    = document.getElementById('paySheet');
  if (backdrop) backdrop.classList.remove('open');
  if (sheet)    sheet.classList.remove('open');
  document.body.style.overflow = '';
  if (embeddedCheckout) { try { embeddedCheckout.destroy(); } catch(e) {} embeddedCheckout = null; }
  var inv = document.getElementById('cryptoInvoice');
  if (inv) inv.innerHTML = '';
  document.querySelectorAll('.ccoin').forEach(function(b) { b.classList.remove('ccoin-active'); });
}

function closePayModal() { closePaySheet(); }

// ── Tabs ─────────────────────────────────────────────────────

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
  if (tab === 'card') initStripeCheckout();
}

// ── Stripe Embedded ──────────────────────────────────────────

async function initStripeCheckout() {
  var container = document.getElementById('stripe-checkout');
  if (!container) return;
  container.innerHTML = '<div class="psc-placeholder"><div class="pay-spinner"></div><p>Loading secure checkout…</p></div>';
  try {
    if (embeddedCheckout) { try { embeddedCheckout.destroy(); } catch(e) {} embeddedCheckout = null; }
    var res  = await fetch('/api/buy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: currentPayPlan, currency: 'card' }) });
    var data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Server error');
    var stripe = await waitForStripe();
    embeddedCheckout = await stripe.initEmbeddedCheckout({ clientSecret: data.client_secret });
    container.innerHTML = '';
    embeddedCheckout.mount('#stripe-checkout');
  } catch(e) {
    container.innerHTML =
      '<p style="color:#ef4444;padding:2rem;text-align:center;font-size:0.9rem;">⚠ ' + e.message + '</p>' +
      '<p style="text-align:center;"><button class="pay-back-btn" onclick="initStripeCheckout()">↺ Retry</button></p>';
  }
}

function waitForStripe(n) {
  n = n || 0;
  return new Promise(function(resolve, reject) {
    if (typeof Stripe !== 'undefined') {
      if (!stripeInstance) stripeInstance = Stripe(STRIPE_PK);
      return resolve(stripeInstance);
    }
    if (n > 20) return reject(new Error('Stripe.js failed to load'));
    setTimeout(function() { waitForStripe(n + 1).then(resolve).catch(reject); }, 300);
  });
}

// ── Crypto ───────────────────────────────────────────────────

async function selectCoin(coin) {
  document.querySelectorAll('.ccoin').forEach(function(b) {
    b.classList.toggle('ccoin-active',
      b.getAttribute('onclick') && b.getAttribute('onclick').indexOf("'" + coin + "'") !== -1);
  });
  var invoice = document.getElementById('cryptoInvoice');
  if (!invoice) return;
  invoice.innerHTML = '<div class="psc-placeholder"><div class="pay-spinner"></div><p>Creating invoice…</p></div>';
  try {
    var res  = await fetch('/api/buy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: currentPayPlan, currency: coin }) });
    var data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Server error');
    var addr = data.wallet_address || '';
    // 0xProcessing returns payment_url (redirect) → load in iframe
    if (data.payment_url && !addr) {
      invoice.innerHTML =
        '<div class="crypto-iframe-wrap">' +
          '<iframe src="' + data.payment_url + '" class="crypto-iframe" allow="payment *" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"></iframe>' +
          '<p class="cib-hint" style="text-align:center;margin-top:0.5rem;">Order: <code>' + (data.order_id || '') + '</code> · <a href="' + data.payment_url + '" target="_blank" style="color:#06b6d4;">Open in browser ↗</a></p>' +
        '</div>';
      return;
    }
    // Direct wallet address
    var coinLabels = { USDT: 'USDT TRC20', BTC: 'Bitcoin', ETH: 'Ethereum', SOL: 'Solana' };
    var amt = data.amount_crypto || PLAN_PRICES[currentPayPlan].replace('$', '');
    invoice.innerHTML =
      '<div class="crypto-invoice-box">' +
        '<div class="cib-title">' + (coinLabels[coin] || coin) + '</div>' +
        '<div class="cib-amount">' + amt + ' ' + coin + '</div>' +
        '<p class="cib-label">Send to this address:</p>' +
        '<div class="cib-addr" id="cryptoAddrEl">' + addr + '</div>' +
        '<p class="cib-hint">Tap to copy · Order: <code>' + (data.order_id || '') + '</code></p>' +
        '<p class="cib-confirm">⏱ Credentials delivered automatically after on-chain confirmation</p>' +
      '</div>';
    var addrEl = document.getElementById('cryptoAddrEl');
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
    invoice.innerHTML = '<p style="color:#ef4444;padding:1.5rem;text-align:center;">⚠ ' + e.message + '</p><button class="pay-back-btn" onclick="selectCoin(\'' + coin + '\')">↺ Retry</button>';
  }
}

// ── Legacy compat ────────────────────────────────────────────

function goPay(plan, currency) {
  openPaySheet(plan);
  if (currency !== 'card') {
    setTimeout(function() { switchPayTab('crypto'); setTimeout(function() { selectCoin(currency); }, 100); }, 200);
  }
}

function buyPlan(plan, currency) {
  if (currency === 'card') { openPaySheet(plan); }
  else { openPaySheet(plan); setTimeout(function() { switchPayTab('crypto'); setTimeout(function() { selectCoin(currency); }, 200); }, 300); }
}
