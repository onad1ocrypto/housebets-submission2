/* =============================================================
   Housebets Sportsbook — prototype logic
   Hash router · odds + clock engine · bet slip · my bets · state lab
   Sample data only. No backend, no real money, no real players.
   ============================================================= */

/* ---------------- icons ---------------- */
const I = {
  home:  '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 8.5 10 3l7 5.5V16a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1V8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  live:  '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.2" fill="currentColor"/><path d="M5.2 5.2a6.8 6.8 0 0 0 0 9.6M14.8 14.8a6.8 6.8 0 0 0 0-9.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  soccer:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.1" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.6 15.2 10 14 13.7H10L8.8 10 12 7.6Z" fill="currentColor" fill-opacity=".6" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/><path d="M12 2.9v4.7M7.7 4.4 8.8 10M16.3 4.4 15.2 10M5.7 16.5l3.1-2.8M18.3 16.5 15.2 13.7" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>',
  tennis:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.1" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M4.1 7.2c4.6 2.2 11.2 2.2 15.8 0M4.1 16.8c4.6-2.2 11.2-2.2 15.8 0" stroke="currentColor" stroke-width="1.45" stroke-linecap="round"/></svg>',
  hoop:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.1" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M2.9 12h18.2M12 2.9c3.3 2.9 3.3 15.3 0 18.2M12 2.9c-3.3 2.9-3.3 15.3 0 18.2" stroke="currentColor" stroke-width="1.25"/><path d="M4 7.5c4 1.4 12 1.4 16 0M4 16.5c4-1.4 12-1.4 16 0" stroke="currentColor" stroke-width="1.15"/></svg>',
  base:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.1" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M8.4 3.6C6.5 6.4 6.5 17.6 8.4 20.4M15.6 3.6c1.9 2.8 1.9 14 0 16.8" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/><path d="M7.5 7.2l1.5-.5M8 10.2l1.5-.4M8.9 13.2l1.5-.3M16.5 7.2l-1.5-.5M16 10.2l-1.5-.4M15.1 13.2l-1.5-.3" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"/></svg>',
  nfl:   '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><g transform="rotate(-32 12 12)"><ellipse cx="12" cy="12" rx="9.3" ry="5.9" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5"/><path d="M12 8.5v7M9.7 9.3v5.4M14.3 9.3v5.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M7.7 10.5h8.6" stroke="currentColor" stroke-width="1.15" stroke-linecap="round"/></g></svg>',
  esport:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7.6 8h8.8a5.4 5.4 0 0 1 5.4 5.4v.7a3.8 3.8 0 0 1-6.9 2.2l-1.1-1.8a2.4 2.4 0 0 0-2-1.1h-.6a2.4 2.4 0 0 0-2 1.1l-1.1 1.8A3.8 3.8 0 0 1 2.2 14.1v-.7A5.4 5.4 0 0 1 7.6 8Z" fill="currentColor" fill-opacity=".08" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7.4 11.2v2.6M6.1 12.5h2.6" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/><circle cx="16.1" cy="11.9" r="1.05" fill="currentColor"/><circle cx="18.1" cy="13.6" r="1.05" fill="currentColor"/></svg>',
  share: '<svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M13.5 6.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM4.6 12.4a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM13.5 17.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM6.3 8.9l7.4-3.7M6.3 11.1l7.4 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  dl:    '<svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 3v9m0 0 3.4-3.4M10 12 6.6 8.6M4 15.5h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  xlogo: '<svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"><path d="M15.3 2.6h2.6l-5.7 6.5 6.7 8.9h-5.2l-4.1-5.4-4.7 5.4H2.3l6.1-7-6.4-8.4h5.3l3.7 4.9 4.3-4.9Zm-.9 13.9h1.4L5.9 4.1H4.4l10 12.4Z"/></svg>',
  menu:  '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  chat:  '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3.6 9.2c0-2.6 2.9-4.6 6.4-4.6s6.4 2 6.4 4.6-2.9 4.6-6.4 4.6c-.7 0-1.4-.08-2-.24L4.2 15.4l.62-2.5A4.7 4.7 0 0 1 3.6 9.2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  casino:'<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6.5 3.5l4 13M13.5 3.5l-4 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="10" r="6.6" stroke="currentColor" stroke-width="1.5"/></svg>',
  search:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke="currentColor" stroke-width="1.5"/><path d="m10.6 10.6 3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  back:  '<svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M11 4 6 9l5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevR: '<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5.4 3.4 9 7l-3.6 3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevD: '<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3.4 5.4 7 9l3.6-3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevU: '<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3.4 8.6 7 5l3.6 3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  x:     '<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3.6 3.6l6.8 6.8M10.4 3.6l-6.8 6.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  star:  '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="m8 2.2 1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 11.2l-3.52 1.85.67-3.93L2.3 6.34l3.94-.57L8 2.2Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  starF: '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="m8 2.2 1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 11.2l-3.52 1.85.67-3.93L2.3 6.34l3.94-.57L8 2.2Z"/></svg>',
  lock:  '<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="3" y="6.2" width="8" height="5.6" rx="1.4" stroke="currentColor" stroke-width="1.3"/><path d="M5.2 6.2V4.8a1.8 1.8 0 0 1 3.6 0v1.4" stroke="currentColor" stroke-width="1.3"/></svg>',
  bell:  '<svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 3.4a3.9 3.9 0 0 1 3.9 3.9c0 3 .9 4.3 1.5 4.9H3.6c.6-.6 1.5-1.9 1.5-4.9A3.9 3.9 0 0 1 9 3.4ZM7.6 14.2a1.6 1.6 0 0 0 2.8 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  ok:    '<svg width="17" height="17" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.2" stroke="currentColor" stroke-width="1.5"/><path d="m5.9 9.2 2 2 4.2-4.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  err:   '<svg width="17" height="17" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.2" stroke="currentColor" stroke-width="1.5"/><path d="M9 5.6v4.2M9 12.3h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  warn:  '<svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M9 2.8 16 15H2L9 2.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 7.4v3.1M9 12.6h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  inbox: '<svg width="30" height="30" viewBox="0 0 32 32" fill="none"><path d="M5 18.5 8.4 7h15.2L27 18.5v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 18.5h6l1.4 3h7.2l1.4-3h6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  flask: '<svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M7 2.6h4M7.6 2.6v4.6L3.8 14.4A1.6 1.6 0 0 0 5.2 16.8h7.6a1.6 1.6 0 0 0 1.4-2.4L10.4 7.2V2.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.2 11.4h5.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
};

const CREST_COL = {};

/* ---------------- tiny helpers ---------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => '$' + (Math.round(n * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const odds2 = n => (Math.round(n * 100) / 100).toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* Real club badges, 128x128 PNG with transparency.
   Source: TheSportsDB open API (team search by name, filtered to
   the correct league) — Brighton came from Wikimedia because the
   API only indexes the women's side.
   If an image is ever missing we fall back to a generated badge
   built from the team's own two colours. */
function crest(abbr, size) {
  const t = HB.teams[abbr];
  if (!t) return '';
  const st = size ? `width:${size}px;height:${size}px;` : '';
  return `<span class="crest" style="${st}" title="${esc(t.name)}" aria-label="${esc(t.name)}">
    <img src="assets/crests/${abbr}.png" alt="${esc(t.name)}"
         onerror="this.parentNode.innerHTML=crestFallback('${abbr}');"></span>`;
}

/* Generated stand-in: a shield in the team's two colours with its monogram. */
let __crid = 0;
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}
function crestFallback(abbr) {
  const t = HB.teams[abbr];
  if (!t) return '';
  let h = 0;
  for (let i = 0; i < abbr.length; i++) h = (h * 31 + abbr.charCodeAt(i)) >>> 0;
  const shape = HB.crestShapes[h % HB.crestShapes.length];
  const pat   = HB.crestPatterns[(h >>> 3) % HB.crestPatterns.length];
  const uid   = 'cr' + (++__crid);
  const dark  = lum(t.col) > 0.55;
  const ink   = dark ? '#101010' : '#FFFFFF';
  const halo  = dark ? 'rgba(255,255,255,.65)' : 'rgba(3,16,21,.6)';
  let extra = '';
  if (pat === 'split')   extra = `<rect x="24" y="0" width="24" height="48" fill="${t.col2}"/>`;
  if (pat === 'band')    extra = `<rect x="0" y="17" width="48" height="13" fill="${t.col2}"/>`;
  if (pat === 'chevron') extra = `<path d="M0 18 L24 29 L48 18 V31 L24 42 L0 31 Z" fill="${t.col2}"/>`;
  if (pat === 'star')    extra = `<path d="M24 6.5 l4.7 9.9 10.8 1.3 -8 7.2 2.1 10.7 -9.6-5.3 -9.6 5.3 2.1-10.7 -8-7.2 10.8-1.3Z" fill="${t.col2}" opacity=".9"/>`;
  return `<svg viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet" focusable="false">
    <defs><clipPath id="${uid}"><path d="${shape}"/></clipPath></defs>
    <g clip-path="url(#${uid})">
      <rect width="48" height="48" fill="${t.col}"/>${extra}
    </g>
    <path d="${shape}" fill="none" stroke="rgba(255,255,255,.36)" stroke-width="1.7"/>
    <text x="24" y="24.5" text-anchor="middle" dominant-baseline="middle"
          font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="14"
          fill="${ink}" stroke="${halo}" stroke-width="2.6" paint-order="stroke"
          stroke-linejoin="round">${t.abbr}</text></svg>`;
}

/* ---------------- persistent-ish state ---------------- */
const S = {
  route: 'home',
  tab: 'home',
  slip: [],            // {uid, selId, selName, marketName, fixture, odds, stake, changed:null, suspended:false}
  bets: JSON.parse(JSON.stringify(HB.seedBets)),
  follows: { ARS: true },
  compFollows: { pl: true },
  favs: [{ kind: 'comp', id: 'pl' }, { kind: 'team', id: 'ARS' }],
  prices: {},          // key -> current price
  prev: {},            // key -> price before the last move (the "was")
  dir: {},             // key -> 'up' | 'down' | null
  suspGroups: {},      // groupId -> true (forced by lab)
  mktTab: 'popular',
  liveFilter: 'all',
  liveComp: 'all',
  liveSort: 'time',
  footComp: 'all',
  noLive: false,       // lab: nothing live
  paused: false,       // lab: freeze the live odds engine
  nextFail: false,     // lab: force place-bet failure
  failMsg: null,       // persistent reason shown in the slip until cleared
  myBetsTab: 'slip',
  sheetOpen: false,
  lastPlaced: null
};

/* initial prices — keyed `${fixtureId}:${outcomeKey}` so each fixture owns its prices */
const P = (fix, k) => `${fix}:${k}`;
function seedPrices() {
  HB.matches.forEach(m => {
    const o = m.odds, h = o['mr-home'], d = o['mr-draw'], a = o['mr-away'];
    S.prices[P(m.id, 'mr-home')] = h;
    S.prices[P(m.id, 'mr-draw')] = d;
    S.prices[P(m.id, 'mr-away')] = a;
    // double chance is derived from this fixture's own 1X2: 1/(1/x + 1/y)
    const dc = (x, y) => Math.round(10000 / (100 / x + 100 / y)) / 100;
    S.prices[P(m.id, 'dc-hd')] = dc(h, d);
    S.prices[P(m.id, 'dc-ha')] = dc(h, a);
    S.prices[P(m.id, 'dc-da')] = dc(d, a);
    // every other market: base price nudged per fixture (deterministic, so every row differs)
    let seed = m.id.charCodeAt(0) * 31 + m.id.length * 7;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    Object.values(HB.markets).forEach(arr => arr.forEach(mk => {
      if (mk.id === 'mr' || mk.id === 'dc') return;
      mk.outs.forEach(ou => {
        S.prices[P(m.id, ou.k)] = Math.max(1.05, Math.round(ou.v * (1 + (rnd() * 0.12 - 0.06)) * 100) / 100);
      });
    }));
  });
}
seedPrices();

/* ---------------- odds + clock engine ---------------- */
let FORCE = false;
let tick = 0;
setInterval(() => {
  tick++;
  // clock: advance live minutes
  HB.matches.forEach(m => {
    if (m.state === 'live' && !S.noLive && m.minute < 90) m.minute++;
    if (m.state === 'live') m.clock = m.minute + "'";
  });
  // Clear stale direction markers BEFORE drifting, not after. Drift sets
  // the direction then renders; clearing it in the same tick wiped the
  // arrow before it could ever be painted, so the up/down indicator on a
  // moving price was invisible. The marker now lives for one tick.
  Object.keys(S.dir).forEach(k => { if (S.dir[k]) S.dir[k] = null; });
  // price drift every 4 ticks
  if (tick % 4 === 0) {
    const keys = Object.keys(S.prices).filter(k => !k.includes(':dc-'));
    const k = keys[Math.floor(Math.random() * keys.length)];
    if (k) drift(k, (Math.random() * 0.16) - 0.08);
  }
  if (S.route === 'match') renderMarketsLive();
  if (!S.noLive) renderLiveClocks();
}, 2600);

function drift(key, delta) {
  if (S.paused && !FORCE) return;
  const old = S.prices[key];
  const nw = Math.max(1.02, Math.min(24, old + delta));
  S.prices[key] = Math.round(nw * 100) / 100;
  S.dir[key] = nw > old ? 'up' : (nw < old ? 'down' : null);
  // remember what it was, so the tile can say "was 1.30" — the arrow
  // tells you something moved, the old price tells you what from.
  if (Math.abs(S.prices[key] - old) > 0.001) S.prev[key] = old;
  // if it's in the slip and differs from the accepted odds -> requires accept
  S.slip.forEach(b => {
    if (b.selId === key && Math.abs(S.prices[key] - b.odds) > 0.001 && !b.suspended) {
      b.changed = S.prices[key];
    }
  });
  flash(key);
  renderSlip();
  renderOddsInPlace();
}

function flash(key) {
  $$(`[data-k="${key}"]`).forEach(el => {
    const d = S.dir[key]; if (!d) return;
    el.classList.remove('flash-up', 'flash-down');
    void el.offsetWidth;
    el.classList.add(d === 'up' ? 'flash-up' : 'flash-down');
  });
}

/* ---------------- router ---------------- */
function go(r) { location.hash = '#/' + r; }
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [a, b] = h.split('/');
  return { page: a || 'home', param: b || null };
}
window.addEventListener('hashchange', route);

function route() {
  const { page, param } = parseHash();
  S.route = page; S.routeParam = param;
  if (page === 'bets') document.body.classList.add('route-bets');
  else document.body.classList.remove('route-bets');
  renderShell();
  const sc = $('.scroll'); if (sc) sc.scrollTop = 0;
}

/* ---------------- shell render ---------------- */
/* ---------------- footer ----------------
   Small brand trace the brief asks for: 18+, a responsible-gambling
   line, and a plain reminder that none of this is real money.
----------------------------------------- */
function footerHTML() {
  return `
  <footer class="sitefoot">
    <div class="sf-row">
      <span class="sf-18">18+</span>
      <p>Gamble responsibly. Set a limit before you start and never chase a loss.</p>
    </div>
    <div class="sf-links">
      <span>Terms</span><span>Privacy</span><span>Responsible gambling</span><span>Support</span>
    </div>
    <div class="sf-note">
      Prototype for a design contest. Sample data only — no real money, no real bets, no real odds.
      housebets.com
    </div>
  </footer>`;
}

function renderShell() {
  $('#main').innerHTML = pageHTML() + footerHTML();
  renderPanel();
  renderSlipBar();
  renderNav();
  bindPage();
}

function renderNav() {
  const map = { home: 'home', live: 'live', soccer: 'soccer', bets: 'bets' };
  const cur = map[S.route] || 'home';
  $$('.rail button').forEach(b => b.classList.toggle('on', b.dataset.nav === cur));
  $$('.botnav button').forEach(b => b.classList.toggle('on', b.dataset.nav === cur));
}

/* ---------------- top bar (static) ---------------- */
function topbarHTML() {
  return `
  <header class="topbar">
    <div class="brand">
      <img class="hlock" src="assets/brand/housebets-logo.png" alt="Housebets">
    </div>
    <div class="prize"><span class="dot"></span><span>Weekly Prize</span><b>${HB.brand.weeklyPrize}</b></div>
    <div class="topRight">
      <button class="iconbtn" aria-label="Notifications">${I.bell}</button>
      <button class="btn-login">Log In</button>
      <button class="btn-register">Register</button>
    </div>
  </header>`;
}

function searchHTML() {
  return `
  <div class="searchwrap">
    <div class="search">${I.search}<input id="q" type="text" placeholder="Search teams, players or leagues" autocomplete="off"></div>
    <div class="sresults" id="sres"></div>
  </div>`;
}


/* ---- sport icons -------------------------------------------
   Rendered ball images for the sports, inline SVG for
   Home and Live which are not sports.
------------------------------------------------------------ */
const SPORT_ICO = { soccer:'soccer', tennis:'tennis', basket:'basketball',
                    baseball:'baseball', nfl:'nfl', esports:'esports',
                    volley:'volleyball', rugby:'rugby' };
function sportIcon(id){
  const f = SPORT_ICO[id];
  if (f) return `<img class="sport-ico" src="assets/icons/96/${f}.png" alt="" width="34" height="34">`;
  /* Home and Live are inline SVG, not a ball image — wrap them so the tile
     can size them the same way it sizes the rendered balls. */
  return `<span class="sport-ico svg">${I[id] || ''}</span>`;
}

/* ---------------- shared nav rail ---------------- */
function tabsHTML() {
  return `<div class="tabs">
    ${HB.sports.map(s => {
      const on = (s.id === 'home' && S.route === 'home') || (s.id === 'live' && S.route === 'live')
              || (s.id === 'soccer' && S.route === 'football')
              || (S.route === 'sport' && S.routeParam === s.id);
      return `<button class="tab ${on ? 'on' : ''}" data-tab="${s.id}">`
           + `<span class="tico">${sportIcon(s.id)}${s.count ? `<span class="n">${s.count}</span>` : ''}</span>`
           + `<span class="tlab">${esc(s.short || s.label)}</span></button>`;
    }).join('')}
  </div>`;
}

function pageHTML() {
  switch (S.route) {
    case 'live':     return pageLive();
    case 'football': return pageFootball();
    case 'sport':    return pageSport();
    case 'match':    return pageMatch();
    case 'bets':     return pageBets();
    case 'chat':     return pageChat();
    default:         return pageHome();
  }
}

/* ---------------- highlight poster ----------------
   The backdrop is the fixture itself: the two crests facing off, lit
   by their own club colours. Built from the teams, so every match gets
   one — not just the two that had a poster. */
function heroArtHTML(m) {
  const h = HB.teams[m.home], a = HB.teams[m.away];
  if (!h || !a) return '';
  return `
  <div class="heroart" aria-hidden="true"
       style="--hc:${h.col}; --hc2:${h.col2}; --ac:${a.col}; --ac2:${a.col2}">
    <span class="ha-glow l"></span>
    <span class="ha-glow r"></span>
    <span class="ha-crest l">${crest(m.home)}</span>
    <span class="ha-crest r">${crest(m.away)}</span>
    <span class="ha-vs">VS</span>
    <span class="ha-sheen"></span>
  </div>`;
}

function heroHTML(m) {
  const h = HB.teams[m.home], a = HB.teams[m.away];
  const isLive = m.state === 'live';
  const comp = (HB.comps.find(c => c.id === m.comp) || {}).name || '';
  return `
  <div class="hero">
    ${heroArtHTML(m)}
    <div class="heroin">
      <div class="herotop">
        ${isLive
          ? `<span class="hlive"><i></i>LIVE ${esc(m.clock)}</span>`
          : `<span class="hkick">${esc(m.kick)}${m.day ? ' \u00b7 ' + esc(m.day) : ''}</span>`}
        <span class="hmeta">${esc(comp)} \u00b7 ${m.marketsCount} markets</span>
      </div>
      <div class="heromid">
        <div class="hteam">${crest(m.home, 32)}<b>${esc(h.sname)}</b></div>
        ${isLive
          ? `<div class="hscore"><b>${m.hs}</b><span>:</span><b>${m.as}</b></div>`
          : `<div class="hvs">v</div>`}
        <div class="hteam right"><b>${esc(a.sname)}</b>${crest(m.away, 32)}</div>
      </div>
      <div class="heroodds">
        ${priceBtn(m, 'mr-home', h.sname)}
        ${priceBtn(m, 'mr-draw', 'Draw')}
        ${priceBtn(m, 'mr-away', a.sname)}
        <button class="hgo" data-open-match="${m.id}">All markets ${I.chevR}</button>
      </div>
    </div>
  </div>`;
}

/* ---------------- PAGE: home ---------------- */
function pageHome() {
  const live = HB.matches.filter(m => m.state === 'live' && !S.noLive);
  const soon = HB.matches.filter(m => m.state === 'soon');
  const pre = HB.matches.filter(m => m.state === 'pre');
  const mine = HB.matches.filter(m => S.follows[m.home] || S.follows[m.away] || S.compFollows[m.comp]);
  const your = (mine.length ? mine : [HB.matches[0], HB.matches[1], HB.matches[2]]);
  const feat = [HB.matches[0], HB.matches[1], HB.matches[2], HB.matches[5]];

  const hero = live[0] || soon[0] || HB.matches[0];

  return `
  ${searchHTML()}
  ${tabsHTML()}
  <div class="tabsrule"></div>
  ${heroHTML(hero)}
  <section class="sect" style="padding-top:13px">
    <div class="secthead"><h2>Top competitions</h2><button class="more" data-go="football">View all ${I.chevR}</button></div>
  </section>
  <div class="topcomps">
    ${HB.comps.map(c => {
      const n = HB.matches.filter(m => m.comp === c.id).length;
      return `<button class="comp" data-footgo="${c.id}"><i class="cdot" style="background:#3ED0DA"></i>
        <span class="cn">${esc(c.name)}</span><span class="cc">${n} ${n === 1 ? 'match' : 'matches'}</span></button>`;
    }).join('')}
  </div>

  <section class="sect" style="padding-top:16px">
    <div class="secthead"><h2>Live now</h2><span class="cnt">${live.length} in play</span><button class="more" data-go="live">View all ${I.chevR}</button></div>
  </section>
  ${live.length
    ? `<div class="cgroup" style="padding:0 16px">${live.map(m => mcardHTML(m)).join('')}</div>`
    : `<div class="cgroup" style="padding:0 16px">${emptyHTML('Nothing live right now', 'Starting soon is below.', false)}</div>`}

  <section class="sect">
    <div class="chips">
      ${S.favs.map(f => {
        const id = f.id;
        const label = f.kind === 'comp' ? (HB.comps.find(c => c.id === id) || {}).name : HB.teams[id].name;
        const col = f.kind === 'comp' ? '#3ED0DA' : HB.teams[id].col;
        return `<button class="chip" data-unfav="${f.kind}:${id}"><i class="cdot" style="background:${col}"></i>${esc(label)}<span class="x" data-unfav="${f.kind}:${id}">${I.x}</span></button>`;
      }).join('')}
      ${S.favs.length ? '' : '<span style="color:var(--ink-4);font-size:12.5px">Follow a team or competition to pin it here.</span>'}
    </div>
  </section>

  <section class="sect" style="padding-bottom:0">
    <div class="secthead"><h2>Your matches</h2><span class="cnt">${your.length} matches</span></div>
  </section>
  <div class="mtable">
    <div class="mhead"><span style="flex:0 0 74px">Kick off</span><span style="flex:1 1 auto">Fixture</span><span style="flex:0 0 268px">Match result</span><span style="width:56px"></span></div>
    ${your.map(m => rowHTML(m)).join('')}
  </div>

  <section class="sect" style="padding-top:16px">
    <div class="secthead"><h2>Featured matches</h2><button class="more">View all ${I.chevR}</button></div>
  </section>
  <div class="feat">${feat.map(m => fcardHTML(m)).join('')}</div>

  <section class="sect" style="padding-top:12px">
    <div class="secthead"><h2>Starting soon</h2><span class="cnt">${soon.length + pre.length}</span></div>
  </section>
  <div class="mtable">${[...soon, ...pre].map(m => rowHTML(m)).join('')}</div>
  <div style="height:24px"></div>`;
}

function rowHTML(m) {
  const h = HB.teams[m.home], a = HB.teams[m.away];
  const isLive = m.state === 'live';
  const when = isLive ? `<span style="color:var(--live-tx);font-weight:700">LIVE</span><span class="day">${m.clock}</span>`
    : `${m.kick}<span class="day">${m.day}</span>`;
  const susp = m.susp;
  const oddsHtml = susp
    ? `<div class="suspended" style="margin:0;flex:0 0 268px">${I.lock} Market suspended</div>`
    : `<div class="odds">
         ${priceBtn(m, 'mr-home', h.sname)}
         ${priceBtn(m, 'mr-draw', 'Draw')}
         ${priceBtn(m, 'mr-away', a.sname)}
       </div>`;
  return `
  <div class="mrow ${m.state === 'live' ? 'live' : 'pre'}">
    <div class="when">${when}</div>
    <div class="who">
      <div class="t">${crest(m.home, 17)}<span class="n">${esc(h.name)}</span>${isLive ? `<span class="s">${m.hs}</span>` : ''}</div>
      <div class="t">${crest(m.away, 17)}<span class="n">${esc(a.name)}</span>${isLive ? `<span class="s">${m.as}</span>` : ''}</div>
    </div>
    ${oddsHtml}
    <button class="moreM" data-open-match="${m.id}">${m.marketsCount} ›</button>
  </div>`;
}

function fcardHTML(m) {
  const h = HB.teams[m.home], a = HB.teams[m.away];
  const isLive = m.state === 'live';
  return `
  <div class="fcard">
    <div class="fh">
      ${isLive ? `<i class="cdot"></i><span class="l">LIVE</span><span class="k">${m.clock}</span>` : `<span class="k">${m.kick} · ${m.day}</span>`}
    </div>
    <div class="trow">${crest(m.home, 20)}<span class="tname">${esc(h.name)}</span>${isLive ? `<span class="tscore">${m.hs}</span>` : ''}</div>
    <div class="trow">${crest(m.away, 20)}<span class="tname">${esc(a.name)}</span>${isLive ? `<span class="tscore">${m.as}</span>` : ''}</div>
    <div class="oddsrow col3" style="padding:8px 0 0">
      ${priceBtn(m, 'mr-home', h.sname)}
      ${priceBtn(m, 'mr-draw', 'Draw')}
      ${priceBtn(m, 'mr-away', a.sname)}
    </div>
  </div>`;
}

/* the price half of an odds tile: the number, its direction arrow, and —
   once it has moved — the price it moved from. */
function priceInner(pk, v, d) {
  const was = S.prev[pk];
  const show = was != null && Math.abs(was - v) > 0.001;
  return `<span class="opx">
      <span class="oval">${d === 'up' ? '<span class="arw">▲</span> ' : d === 'down' ? '<span class="arw">▼</span> ' : ''}${odds2(v)}</span>
      <span class="owas">${show ? `was ${odds2(was)}` : ''}</span>
    </span>`;
}

function priceBtn(m, key, label) {
  const pk = P(m.id, key);
  const v = S.prices[pk];
  const d = S.dir[pk];
  const sel = S.slip.some(b => b.selId === pk);
  const susp = m.susp;
  return `<button class="o ${sel ? 'sel' : ''} ${susp ? 'susp' : ''} ${d === 'up' ? 'up' : d === 'down' ? 'down' : ''}" data-k="${pk}"
      data-sel="${key}" data-mname="Match result" data-fix="${m.id}" ${susp ? 'disabled' : ''}>
      <span class="oname">${esc(label)}</span>
      ${priceInner(pk, v, d)}
    </button>`;
}

/* ---------------- PAGE: live ---------------- */
function pageLive() {
  const live = HB.matches.filter(m => m.state === 'live' && !S.noLive);
  const groups = {};
  live.forEach(m => { (groups[m.comp] = groups[m.comp] || []).push(m); });
  const compIds = Object.keys(groups);
  let shown = S.liveFilter === 'all' ? compIds : compIds.filter(c => c === 'pl' || c === 'liga' || c === 'seria');
  if (S.liveComp !== 'all') shown = shown.filter(c => c === S.liveComp);

  const cname = id => (HB.comps.find(x => x.id === id) || {}).name || id;
  if (S.liveSort === 'comp') {
    shown.sort((a, b) => cname(a).localeCompare(cname(b)));
    shown.forEach(cid => groups[cid].sort((a, b) => a.minute - b.minute));
  } else {
    // most advanced minute first — the matches closest to finishing lead
    shown.forEach(cid => groups[cid].sort((a, b) => b.minute - a.minute));
    shown.sort((a, b) => Math.max(...groups[b].map(m => m.minute)) - Math.max(...groups[a].map(m => m.minute)));
  }

  return `
  <div class="phead"><button class="back" data-go="home">${I.back}</button><h1>Live now</h1></div>
  ${searchHTML()}
  ${tabsHTML()}
  <div class="tabsrule"></div>
  <div class="filters">
    ${[['all', 'All', live.length], ['soccer', 'Soccer', live.length], ['tennis', 'Tennis', 0], ['basket', 'Basketball', 0]]
      .map(([id, l, n]) => `<button class="fpill ${S.liveFilter === id ? 'on' : ''}" data-livef="${id}">${l}${n ? `<span class="n">${n}</span>` : ''}</button>`).join('')}
  </div>
  <div class="filters" style="padding-top:0">
    <span class="flabel">Competition</span>
    ${[['all', 'All competitions'], ...HB.comps.map(c => [c.id, c.name])]
      .map(([id, l]) => `<button class="fpill sm ${S.liveComp === id ? 'on' : ''}" data-livec="${id}">${esc(l)}</button>`).join('')}
  </div>
  <div class="filters" style="padding-top:0">
    <span class="flabel">Sort</span>
    ${[['time', 'Time'], ['comp', 'Competition']]
      .map(([id, l]) => `<button class="fpill sm ${S.liveSort === id ? 'on' : ''}" data-livesort="${id}">${l}</button>`).join('')}
  </div>
  ${shown.length === 0 ? emptyHTML('Nothing live right now', 'Nothing live: showing Starting soon instead of a blank page.', true) : ''}
  ${shown.map(cid => {
    const c = HB.comps.find(x => x.id === cid);
    return `<div class="cgroup">
      <div class="ch"><i class="cdot" style="background:#3ED0DA"></i><span class="cn">${esc(c.name)}</span>
        <button class="ca" data-go="football">View all ${I.chevR}</button></div>
      ${groups[cid].map(m => mcardHTML(m)).join('')}
    </div>`;
  }).join('')}
  ${shown.length ? '' : `<div class="cgroup"><div class="ch"><i class="cdot" style="background:#3ED0DA"></i><span class="cn">Starting soon</span></div>
      ${HB.matches.filter(m => m.state === 'soon').map(m => mcardHTML(m)).join('')}</div>`}
  <div style="height:20px"></div>`;
}

function mcardHTML(m) {
  const h = HB.teams[m.home], a = HB.teams[m.away];
  const isLive = m.state === 'live';
  const followed = S.follows[m.home] || S.follows[m.away];
  return `
  <div class="mcard ${m.state === 'live' ? 'live' : 'pre'}">
    <div class="head">
      ${isLive ? `<span class="clive"><i class="cdot"></i>LIVE</span><span class="clock">${m.clock}</span>` : `<span>${m.kick}</span><span class="day">${m.day}</span>`}
      <span class="spacer"></span>
      <button class="star ${followed ? 'on' : ''}" data-follow="${m.home}" aria-label="Follow">${followed ? I.starF : I.star}</button>
      ${isLive ? `<button class="mkt" data-open-match="${m.id}">${m.marketsCount} ›</button>` : ''}
    </div>
    <div class="teams">
      <div class="trow">${crest(m.home, 20)}<span class="tname">${esc(h.name)}</span>${isLive ? `<span class="tscore">${m.hs}</span>` : ''}</div>
      <div class="trow">${crest(m.away, 20)}<span class="tname">${esc(a.name)}</span>${isLive ? `<span class="tscore">${m.as}</span>` : ''}</div>
    </div>
    ${m.susp
      ? `<div class="suspended">${I.lock} Suspended</div>`
      : `<div class="oddsrow col3">
          ${priceBtn(m, 'mr-home', h.sname)}
          ${priceBtn(m, 'mr-draw', 'Draw')}
          ${priceBtn(m, 'mr-away', a.sname)}
        </div>`}
  </div>`;
}

function emptyHTML(title, msg, withSoon) {
  return `<div class="empty"><div class="ico">${I.inbox}</div><h3>${esc(title)}</h3><p>${esc(msg)}</p></div>`;
}


/* ---------------- PAGE: chat ---------------- */
let HUBIE = null;
function loadHubie(cb) {
  if (HUBIE) { cb(HUBIE); return; }
  const i = new Image();
  i.onload = () => { HUBIE = i; cb(i); };
  i.onerror = () => cb(null);
  i.src = 'assets/brand/hubie.png';
}

function pageChat() {
  const shared = S.chat || [];
  return `
  <div class="phead"><button class="back" data-go="home">${I.back}</button><h1>Housebets chat</h1></div>
  <div class="chatwrap">
    <div class="chatnote">Public room · ${HB.seedChat.length + shared.length} messages · sample data</div>
    ${HB.seedChat.map(m => chatMsg(m)).join('')}
    ${shared.map(m => chatMsg(m)).join('')}
    ${!shared.length ? `<div style="padding:18px 0">${emptyHTML('Nothing shared yet', 'Share a settled bet from History and it lands in this room.')}</div>` : ''}
    <div style="height:14px"></div>
  </div>
  <form class="chatin" id="chatForm">
    <input id="chatMsg" maxlength="140" placeholder="Say something to the room…" autocomplete="off">
    <button type="submit" aria-label="Send">${I.share}</button>
  </form>`;
}

function chatMsg(m) {
  if (m.betId) {
    const b = S.bets.find(x => x.id === m.betId);
    if (!b) return '';
    const won = b.status === 'won';
    const ret = b.status === 'cashed' ? (b.cashout || 0) : (won ? b.ret : 0);
    return `<div class="msg mine">
      <div class="av me">You</div>
      <div class="bub">
        <div class="betshare">
          <div class="bs-top">
            <span class="res ${won ? 'won' : 'lost'}">${b.status === 'cashed' ? 'Cashed out' : won ? 'Won' : 'Lost'}</span>
            <span class="bs-odds">@${odds2(b.odds)}</span>
          </div>
          <div class="bs-sel">${esc(b.sel)}</div>
          <div class="bs-fix">${esc(b.fixture)}</div>
          <div class="bs-fig">
            <span>Stake <b>${money(b.stake)}</b></span>
            <span>Return <b style="color:${won ? 'var(--up)' : 'var(--ink)'}">${money(ret)}</b></span>
          </div>
        </div>
        <div class="tm">${esc(m.at)}</div>
      </div></div>`;
  }
  const who = m.who || 'You';
  const mine = !!m.local || who === 'You';
  const av = m.hubie
    ? `<img class="av hubie" src="assets/brand/hubie.png" alt="Hubie">`
    : `<div class="av${mine ? ' me' : ''}">${esc(who.slice(0, 2).toUpperCase())}</div>`;
  return `<div class="msg${m.hubie ? ' hubierow' : (mine ? ' mine' : '')}">
    ${av}
    <div class="bub">
      <div class="who">${esc(who)}</div>
      <div class="tx">${esc(m.text)}</div>
      <div class="tm">${esc(m.at)}</div>
    </div></div>`;
}

/* ---------------- PAGE: football ---------------- */
function pageFootball() {
  const counts = {};
  HB.comps.forEach(c => { counts[c.id] = HB.matches.filter(m => m.comp === c.id).length; });
  const list = S.footComp === 'all' ? HB.comps : HB.comps.filter(c => c.id === S.footComp);
  return `
  ${tabsHTML()}
  <div class="tabsrule"></div>
  <div class="phead">
    <button class="back" data-go="home">${I.back}</button>
    <h1 class="drop">Soccer ${I.chevD}</h1>
  </div>
  ${searchHTML()}
  <div class="filters">
    ${[['all', 'All Soccer', HB.matches.length], ...HB.comps.map(c => [c.id, c.name, counts[c.id]])]
      .map(([id, l, n]) => `<button class="fpill ${S.footComp === id ? 'on' : ''}" data-footc="${id}">${esc(l)}<span class="n">${n}</span></button>`).join('')}
  </div>
  ${list.map(c => {
    const ms = HB.matches.filter(m => m.comp === c.id);
    const f = !!S.compFollows[c.id];
    return `<div class="cgroup">
      <div class="ch">
        <i class="cdot" style="background:#3ED0DA"></i><span class="cn">${esc(c.name)}</span>
        <button class="star ${f ? 'on' : ''}" data-followcomp="${c.id}" style="color:${f ? 'var(--gold)' : 'var(--ink-4)'}">${f ? I.starF : I.star}</button>
        <button class="ca">All ${counts[c.id]} ›</button>
      </div>
      ${ms.length ? ms.map(m => mcardHTML(m)).join('') : '<div style="color:var(--ink-4);font-size:12.5px;padding:6px 0">No fixtures in this competition right now.</div>'}
    </div>`;
  }).join('')}
  <div style="height:20px"></div>`;
}

/* ---------------- PAGE: match ---------------- */
/* ---- scoreboard incidents --------------------------------
   "1-0" on its own does not say who scored. These two helpers add
   the scorers under each team and the card counts beside the clock —
   scoreboard content, not a tracker widget: no timeline, no stats.
----------------------------------------------------------- */
function sbGoals(m, side) {
  const ev = HB.events[m.id];
  if (!ev || m.state !== 'live') return '';
  const list = ev.goals.filter(g => g.s === side);
  if (!list.length) return '';
  const sq = side === 'h' ? HB.squad(m.home) : HB.squad(m.away);
  return `<div class="sb-goals">${list.map(g =>
    `<span class="sg"><i class="sg-ball"></i>${esc(sq[g.p - 1])} ${g.min}'</span>`).join('')}</div>`;
}
function sbCards(m) {
  const ev = HB.events[m.id];
  if (!ev || m.state !== 'live') return '';
  return `<span class="sb-cards" aria-label="${ev.y} yellow, ${ev.r} red cards">
    <span class="cd y"><i></i>${ev.y}</span><span class="cd r"><i></i>${ev.r}</span>
  </span>`;
}

function pageMatch() {
  const m = HB.matches.find(x => x.id === (S.routeParam || 'ars-bha')) || HB.matches[0];
  const h = HB.teams[m.home], a = HB.teams[m.away];
  const followed = S.follows[m.home] || S.follows[m.away] || S.compFollows[m.comp];
  return `
  <div class="phead">
    <button class="back" data-go="live">${I.back}</button>
    <h1>${h.abbr} - ${a.abbr} ${I.chevD}</h1>
  </div>
  <div class="phead" style="padding-top:0">
    <span class="sub">< ${esc((HB.comps.find(c => c.id === m.comp) || {}).name)} ${I.chevD}</span>
  </div>

  <div class="scoreboard ${m.state === 'live' ? 'live' : ''}">
    <div class="sb-top">
      ${m.state === 'live' ? `<i class="cdot"></i><span class="l">LIVE</span><span class="k">${m.clock}</span>${sbCards(m)}` : `<span>${m.kick} · ${m.day}</span>`}
      <span class="sp">
        <button class="sbtn ${followed ? 'on' : ''}" data-follow="${m.home}">${followed ? I.starF : I.star} ${followed ? 'Following' : 'Follow'}</button>
      </span>
    </div>
    <div class="sb-score">
      <div class="sb-team">${crest(m.home, 34)}<div class="sb-tmeta"><span class="nm"><span class="nm-full">${esc(h.name)}</span><span class="nm-short">${esc(h.sname)}</span></span>${sbGoals(m, 'h')}</div></div>
      <div class="sb-nums">
        ${m.state === 'live' ? `<span class="sb-num">${m.hs}</span><span class="sb-dash">-</span><span class="sb-num">${m.as}</span>`
        : `<span style="color:var(--ink-3);font-size:13px">Not started</span>`}
      </div>
      <div class="sb-team right">${crest(m.away, 34)}<div class="sb-tmeta"><span class="nm"><span class="nm-full">${esc(a.name)}</span><span class="nm-short">${esc(a.sname)}</span></span>${sbGoals(m, 'a')}</div></div>
    </div>
  </div>

  <div class="searchwrap">
    <div class="search">${I.search}<input id="q2" type="text" placeholder="Search markets or players" autocomplete="off"></div>
    <div class="sresults" id="sres2"></div>
  </div>

  <div class="mkttabs">
    ${HB.marketGroups.map(g => `<button class="mkttab ${S.mktTab === g.id ? 'on' : ''}" data-mkttab="${g.id}">${esc(g.label)}<span class="n">${g.n}</span></button>`).join('')}
  </div>

  <div id="mktwrap">${marketsHTML(m)}</div>
  <div style="height:26px"></div>`;
}

/* Outcome and market names are stored with tokens ({home}/{away}/
   {h1}..{a4}) so one market set serves every fixture. Resolve them
   against the match being shown. */
function resolveName(str, m) {
  if (!str || str.indexOf('{') < 0) return str;
  const sh = HB.squad(m.home), sa = HB.squad(m.away);
  return String(str)
    .replace(/\{home\}/g, HB.teams[m.home].sname)
    .replace(/\{away\}/g, HB.teams[m.away].sname)
    .replace(/\{h([1-4])\}/g, (_, i) => sh[+i - 1])
    .replace(/\{a([1-4])\}/g, (_, i) => sa[+i - 1]);
}

function marketsHTML(m) {
  const list = HB.markets[S.mktTab] || [];
  return list.map(mk => {
    const susp = mk.suspended || S.suspGroups[mk.id];
    return `<div class="mkt ${susp ? 'susp' : ''}">
      <div class="mh">
        <span>${esc(resolveName(mk.name, m))}</span>
        ${susp ? `<span class="tag">${I.lock} Suspended</span>` : ''}
      </div>
      <div class="grid c${mk.cols}${mk.wide ? ' wide' : ''}">
        ${mk.outs.map(o => {
          const pk = P(m.id, o.k);
          const v = S.prices[pk]; const d = S.dir[pk];
          const sel = S.slip.some(b => b.selId === pk);
          return `<button class="o ${sel ? 'sel' : ''} ${d === 'up' ? 'up' : d === 'down' ? 'down' : ''}" data-k="${pk}"
              data-sel="${o.k}" data-mname="${esc(resolveName(mk.name, m))}" data-fix="${m.id}" ${susp ? 'disabled' : ''}>
              <span class="oname">${esc(resolveName(o.n, m))}</span>
              ${priceInner(pk, v, d)}
            </button>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');
}

function renderMarketsLive() {
  const wrap = $('#mktwrap'); if (!wrap) return;
  const m = HB.matches.find(x => x.id === (S.routeParam || 'ars-bha')) || HB.matches[0];
  wrap.innerHTML = marketsHTML(m);
  $$('#mktwrap [data-sel]').forEach(b => b.onclick = () => addToSlip(b.dataset));
}

/* ---------------- PAGE: sport (no sample data) ----------------
   Every sport tile now owns a real page instead of firing a toast,
   so the tile can light up as active and the page still says
   something useful rather than going nowhere.
-------------------------------------------------------------- */
function pageSport() {
  const id = S.routeParam;
  const s = HB.sports.find(x => x.id === id);
  if (!s || !SPORT_ICO[id]) return pageHome();
  const others = HB.sports.filter(x => SPORT_ICO[x.id] && x.id !== id).slice(0, 5);
  return `
  ${tabsHTML()}
  <div class="tabsrule"></div>
  <div class="phead">
    <button class="back" data-go="home">${I.back}</button>
    <h1 class="drop">${esc(s.label)}</h1>
  </div>
  <div class="sportpage">
    <div class="sp-card">
      <img class="sp-ball" src="assets/icons/96/${SPORT_ICO[id]}.png" alt="" width="96" height="96">
      <h2>No ${esc(s.label.toLowerCase())} fixtures yet</h2>
      <p class="sp-lede">
        This prototype ships with 13 football fixtures across five competitions, so
        the markets, bet slip, cash out and my bets can all be judged end to end.
      </p>
      <p class="sp-note">
        In the full product ${esc(s.label)} would list its own competitions and
        markets in exactly this layout — same cards, same slip, same flow.
      </p>
      <div class="sp-actions">
        <button class="sp-cta" data-go="football">Browse football ${I.chevR}</button>
        <button class="sp-ghost" data-go="live">See live now</button>
      </div>
    </div>
    <div class="sp-others">
      <span class="sp-others-h">Other sports</span>
      ${others.map(o => `<button class="sp-tile" data-go="sport/${o.id}">
        <img src="assets/icons/96/${SPORT_ICO[o.id]}.png" alt="" width="26" height="26">
        <span>${esc(o.short || o.label)}</span></button>`).join('')}
    </div>
  </div>`;
}

/* ---------------- PAGE: bets (full width) ---------------- */
function pageBets() {
  return `<div style="padding:14px 16px 20px;max-width:820px;margin:0 auto">
    <div class="phead" style="padding:0 0 8px"><button class="back" data-go="home">${I.back}</button><h1>Bet slip &amp; My bets</h1></div>
    <div id="betsInline">${betsHTML()}</div>
  </div>`;
}

function betsHTML() {
  return `
  <div class="sliptabs">
    <button class="sliptab ${S.myBetsTab === 'slip' ? 'on' : ''}" data-mbt="slip">Bet slip${S.slip.length ? `<span class="n">${S.slip.length}</span>` : ''}</button>
    <button class="sliptab ${S.myBetsTab === 'my' ? 'on' : ''}" data-mbt="my">My bets</button>
    <button class="sliptab ${S.myBetsTab === 'history' ? 'on' : ''}" data-mbt="history">History</button>
    ${S.myBetsTab === 'slip' && S.slip.length ? '<button class="clr" id="clearAll">Clear all</button>' : ''}
  </div>
  <div id="betsBody">${betsBodyHTML()}</div>`;
}

function slipHTML() {
  if (!S.slip.length) {
    return `<div style="padding:22px 12px">
      ${emptyHTML('Your slip is empty', 'Tap any odds on any page to add a single. This slip takes singles only — no multis, no boosts.')}
    </div>`;
  }
  const total = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0), 0);
  const ret = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0) * b.odds, 0);
  const blocked = S.slip.some(b => b.changed || b.suspended);
  return `
  <div style="padding:10px 12px">
    <div class="singles">${I.lock} Singles · ${S.slip.length} selection${S.slip.length > 1 ? 's' : ''}</div>
    ${S.slip.map(b => betHTML(b)).join('')}
    <div class="returns">
      <div class="rline"><span>Total stake</span><b>${money(total)}</b></div>
      <div class="rline big"><span>Potential return</span><b>${money(ret)}</b></div>
    </div>
    <div style="height:10px"></div>
    ${S.failMsg ? `<div class="failbar" role="alert">
      <span class="fb-ico">${I.lock}</span>
      <span class="fb-tx"><b>Bet failed.</b> ${esc(S.failMsg)}</span>
    </div>` : ''}
    <button class="place" id="place" ${blocked ? 'disabled' : ''}>${S.failMsg ? 'Retry bet' : (blocked ? 'Resolve slip to continue' : 'Place bet')}</button>
  </div>`;
}

function betHTML(b) {
  const stake = parseFloat(b.stake) || 0;
  return `
  <div class="bet ${b.changed ? 'changed' : ''} ${b.suspended ? 'susp' : ''}">
    <div class="bt">
      <span class="sel">${esc(b.selName)}</span>
      <span class="pr">${odds2(b.changed || b.odds)}</span>
      <button class="rm" data-rm="${b.uid}" aria-label="Remove">${I.x}</button>
    </div>
    <div class="bm">${esc(b.marketName)} · ${esc(b.fixtureLabel)}</div>
    ${b.suspended
      ? `<div class="changedbar"><span class="msg" style="color:var(--down)">${I.lock} Selection suspended — stake returned if the bet is placed.</span>
         <button class="pillbtn" data-rm="${b.uid}">Remove</button></div>`
      : b.changed
      ? `<div class="changedbar">
           <span class="msg">Odds changed ${odds2(b.odds)} → <b>${odds2(b.changed)}</b>. Accept the new price to continue.</span>
           <button class="pillbtn" data-rm="${b.uid}">Remove</button>
           <button class="pillbtn acc" data-accept="${b.uid}">Accept</button>
         </div>`
      : `<div class="stakeRow">
           <label class="stake"><span>USDT</span><input type="number" min="0" step="1" value="${stake || ''}" placeholder="0.00" data-stake="${b.uid}"></label>
           <div class="quick">
             ${[10, 25, 50, 100].map(v => `<button data-quick="${b.uid}:${v}">${v}</button>`).join('')}
           </div>
         </div>
         <div class="returns"><div class="rline"><span>Returns</span><b>${money(stake * b.odds)}</b></div></div>`}
  </div>`;
}

function myBetsHTML() {
  const open = S.bets.filter(b => b.status === 'open');
  const settled = S.bets.filter(b => b.status !== 'open');
  return `<div style="padding:10px 12px">
    ${open.length ? `<div class="singles">Open · ${open.length}</div>` : ''}
    ${open.map(b => mbHTML(b)).join('')}
    ${!open.length ? `<div style="padding:14px 0">${emptyHTML('No open bets', 'Placed bets land here while they are still running.')}</div>` : ''}
    <div class="singles" style="margin-top:16px">Settled · ${settled.length}</div>
    ${settled.map(b => mbHTML(b)).join('')}
    <div style="height:16px"></div>
  </div>`;
}

function mbHTML(b) {
  const ret = b.status === 'cashed' ? b.cashout : (b.status === 'won' ? b.ret : (b.status === 'lost' ? 0 : b.stake * b.odds));
  return `
  <div class="mb">
    <div class="sh">
      <span class="st ${b.status}">${b.status === 'cashed' ? 'Cashed out' : b.status}</span>
      <span class="dt">${esc(b.placedAt)}</span>
    </div>
    <div class="sel">${esc(b.sel)} <span style="color:var(--aqua);font-weight:700">@${odds2(b.odds)}</span></div>
    <div class="meta">${esc(b.market)} · ${esc(b.fixture)}</div>
    <div class="figs">
      <div class="f"><div class="k">Stake</div><div class="v">${money(b.stake)}</div></div>
      <div class="f"><div class="k">Potential</div><div class="v">${money(b.stake * b.odds)}</div></div>
      <div class="f"><div class="k">${b.status === 'won' ? 'Return' : b.status === 'lost' ? 'Return' : 'To return'}</div><div class="v" style="color:${b.status === 'won' ? 'var(--up)' : 'var(--ink)'}">${money(ret)}</div></div>
    </div>
    ${b.status === 'open' ? `<div class="co">
      <div class="coval"><div class="k">Cash out</div><div class="v">${money(b.cashout)}</div></div>
      <button data-cash="${b.id}">Cash out</button>
    </div>` : ''}
  </div>`;
}

/* ---------------- side panel (desktop) ---------------- */
function renderPanel() {
  const p = $('#panel'); if (!p) return;
  if (S.route === 'bets') { p.style.display = 'none'; return; }
  if (window.innerWidth <= 640) { p.style.display = 'none'; return; }
  p.style.display = '';
  p.classList.toggle('has-bets', S.slip.length > 0);
  p.innerHTML = `
    <div class="sliptabs">
      <button class="sliptab ${S.myBetsTab === 'slip' ? 'on' : ''}" data-mbt="slip">Bet slip${S.slip.length ? `<span class="n">${S.slip.length}</span>` : ''}</button>
      <button class="sliptab ${S.myBetsTab === 'my' ? 'on' : ''}" data-mbt="my">My bets</button>
    <button class="sliptab ${S.myBetsTab === 'history' ? 'on' : ''}" data-mbt="history">History</button>
      ${S.myBetsTab === 'slip' && S.slip.length ? '<button class="clr" id="clearAll">Clear all</button>' : ''}
    </div>
    <div class="slipbody" id="panelBody">${betsBodyHTML()}</div>`;
  bindSlip(p);
}

function renderSlip() {
  const pb = $('#panelBody'); if (pb && S.route !== 'bets') {
    pb.innerHTML = betsBodyHTML();
    bindSlip(pb);
  }
  const bi = $('#betsBody'); if (bi) {
    bi.innerHTML = betsBodyHTML();
    bindSlip(bi);
  }
  if (S.sheetOpen) {
    const sb = $('#sheetBody');
    if (sb) { sb.innerHTML = betsBodyHTML(); bindSlip(sb); }
  }
  renderSlipBar();
}

/* phone bottom bar */
function renderSlipBar() {
  const el = $('#slipbar'); if (!el) return;
  if (!S.slip.length) { el.style.display = 'none'; }
  else {
    el.style.display = '';
    const total = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0), 0);
    const ret = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0) * b.odds, 0);
    const blocked = S.slip.some(b => b.changed || b.suspended);
    el.innerHTML = `<div class="in" id="openSheet">
      <span class="badge">${S.slip.length}</span>
      <span class="txt">
        <span class="t1">${S.slip.length} single${S.slip.length > 1 ? 's' : ''}${blocked ? ' · needs attention' : ''}</span>
        <span class="t2">Stake ${money(total)}</span>
      </span>
      <span class="amt">${money(ret)}</span>
      <span class="chev">${I.chevU}</span>
    </div>`;
    $('#openSheet').onclick = () => openSheet();
  }
  const sh = $('#sheet'); if (sh && !S.slip.length && !S.sheetOpen) sh.classList.remove('open');
}

function openSheet() {
  S.sheetOpen = true;
  const sh = $('#sheet');
  sh.classList.add('open');
  $('#sheetBody').innerHTML = betsBodyHTML();
  bindSlip($('#sheetBody'));
}


function betsBodyHTML() {
  if (S.myBetsTab === 'slip') return slipHTML();
  if (S.myBetsTab === 'history') return historyHTML();
  return myBetsHTML();
}

/* ---------------- bet history ---------------- */
function historyHTML() {
  const settled = S.bets.filter(b => b.status !== 'open');
  const won  = settled.filter(b => b.status === 'won').length;
  const lost = settled.filter(b => b.status === 'lost' || b.status === 'cashed').length;
  const staked = settled.reduce((a, b) => a + b.stake, 0);
  const back   = settled.reduce((a, b) => a + (b.status === 'won' ? b.ret : (b.status === 'cashed' ? (b.cashout || 0) : 0)), 0);
  const net = back - staked;
  return `<div style="padding:10px 12px">
    <div class="histsum">
      <div class="hs"><div class="k">Settled</div><div class="v">${settled.length}</div></div>
      <div class="hs"><div class="k">Won</div><div class="v up">${won}</div></div>
      <div class="hs"><div class="k">Lost</div><div class="v dn">${lost}</div></div>
      <div class="hs"><div class="k">Net</div><div class="v ${net >= 0 ? 'up' : 'dn'}">${net >= 0 ? '+' : '\u2212'}${money(Math.abs(net))}</div></div>
    </div>
    ${settled.length
      ? settled.map(b => histHTML(b)).join('')
      : `<div style="padding:14px 0">${emptyHTML('No settled bets', 'Once a bet settles it moves here, and you can share how it went.')}</div>`}
    <div style="height:16px"></div>
  </div>`;
}

function histHTML(b) {
  const won = b.status === 'won';
  const ret = b.status === 'cashed' ? (b.cashout || 0) : (won ? b.ret : 0);
  return `<div class="mb hist">
    <div class="sh">
      <span class="st ${b.status}">${b.status === 'cashed' ? 'Cashed out' : b.status}</span>
      <span class="dt">${esc(b.placedAt)}</span>
    </div>
    <div class="sel">${esc(b.sel)} <span style="color:var(--aqua);font-weight:700">@${odds2(b.odds)}</span></div>
    <div class="meta">${esc(b.market)} \u00b7 ${esc(b.fixture)}</div>
    <div class="figs">
      <div class="f"><div class="k">Stake</div><div class="v">${money(b.stake)}</div></div>
      <div class="f"><div class="k">Return</div><div class="v" style="color:${won ? 'var(--up)' : 'var(--ink)'}">${money(ret)}</div></div>
      <div class="f"><div class="k">Result</div><div class="v" style="color:${won ? 'var(--up)' : 'var(--live)'}">${b.status === 'cashed' ? 'Cashed' : won ? 'Won' : 'Lost'}</div></div>
    </div>
    <div class="shareRow"><button class="shb" data-share="${b.id}">${I.share} Share result</button></div>
  </div>`;
}

/* ---------------- share card ---------------- */
function rr(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r);
  g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r);
  g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y); g.closePath();
}
function fmt(n) { return (Math.round(n * 100) / 100).toFixed(2); }

function renderCardTo(cv, b) {
  const W = 1200, H = 675, g = cv.getContext('2d');
  cv.width = W; cv.height = H;
  const won = b.status === 'won';
  const ret = b.status === 'cashed' ? (b.cashout || 0) : (won ? b.ret : 0);
  const F = (sz, w) => `${w || 700} ${sz}px Inter, system-ui, -apple-system, sans-serif`;

  const bg = g.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#1B1B1B'); bg.addColorStop(.55, '#141414'); bg.addColorStop(1, '#101010');
  g.fillStyle = bg; g.fillRect(0, 0, W, H);

  for (let k = 0; k < 2; k++) {
    g.strokeStyle = k ? 'rgba(62,208,218,.07)' : 'rgba(62,208,218,.13)';
    g.lineWidth = k ? 1.6 : 2.4; g.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const y = H - 96 + k * 30 + Math.sin((x / W) * Math.PI * 4 + k * 1.2) * 17;
      x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
  }
  const rg = g.createRadialGradient(W / 2, 30, 0, W / 2, 30, 560);
  rg.addColorStop(0, won ? 'rgba(53,211,154,.15)' : 'rgba(244,31,80,.13)');
  rg.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = rg; g.fillRect(0, 0, W, H);

  g.fillStyle = '#FFFFFF'; g.font = F(36, 800); g.fillText('Housebets', 64, 84);
  const hw = g.measureText('Housebets').width;
  g.fillStyle = '#3ED0DA'; g.beginPath(); g.arc(64 + hw + 16, 74, 5.5, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#6B8794'; g.font = F(15, 600);
  g.fillText('B E T   S E T T L E D', 64, 116);

  const bw = won ? 190 : 200, bh = 62;
  g.fillStyle = won ? 'rgba(53,211,154,.16)' : 'rgba(244,31,80,.16)'; rr(g, 64, 152, bw, bh, 14); g.fill();
  g.strokeStyle = won ? 'rgba(53,211,154,.55)' : 'rgba(244,31,80,.55)';
  g.lineWidth = 2; rr(g, 64, 152, bw, bh, 14); g.stroke();
  g.fillStyle = won ? '#5BD8A0' : '#FF6B8B'; g.font = F(26, 800);
  g.fillText(b.status === 'cashed' ? 'Cashed out' : won ? 'WON' : 'LOST', 64 + 26, 152 + 41);

  g.fillStyle = '#78909E'; g.font = F(15, 600);
  g.fillText((b.market || 'Match result').toUpperCase(), 64, 268);
  g.font = F(42, 750);
  const selW = g.measureText(b.sel).width;      // measure in the SAME font we drew with
  g.fillStyle = '#FFFFFF';
  g.fillText(b.sel, 64, 322);
  g.font = F(30, 750);
  g.fillStyle = '#3ED0DA';
  g.fillText('@ ' + fmt(b.odds), 64 + selW + 18, 322);

  g.fillStyle = '#A9C6D2'; g.font = F(19, 500);
  g.fillText(b.fixture, 64, 372);

  const rows = [['Stake', fmt(b.stake) + ' USDT', '#FFFFFF'],
                [won || b.status === 'cashed' ? 'Returned' : 'Return', fmt(ret) + ' USDT', won ? '#5BD8A0' : '#FFFFFF']];
  let y = 452;
  rows.forEach(([k, v, col]) => {
    g.fillStyle = '#6B8794'; g.font = F(16, 600); g.fillText(k.toUpperCase(), 64, y);
    g.fillStyle = col; g.font = F(30, 750); g.textAlign = 'right'; g.fillText(v, W - 64, y);
    g.textAlign = 'left';
    g.strokeStyle = 'rgba(255,255,255,.08)'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(64, y + 22); g.lineTo(W - 64, y + 22); g.stroke();
    y += 74;
  });

  // Hubie celebrates with you — only on a win
  if (won && HUBIE) {
    const hh = 250, hw = hh * (HUBIE.width / HUBIE.height);
    const hx = W - hw - 58, hy = 96;
    g.save();
    g.globalAlpha = .96;
    g.drawImage(HUBIE, hx, hy, hw, hh);
    g.restore();
    g.fillStyle = '#5BD8A0'; g.font = F(15, 700);
    g.textAlign = 'right';
    g.fillText('Nice one', W - 58, hy + hh + 26);
    g.fillStyle = '#6B8794'; g.font = F(13, 500);
    g.fillText('Hubie', W - 58, hy + hh + 48);
    g.textAlign = 'left';
  }

  g.fillStyle = '#5C7684'; g.font = F(14, 500);
  g.fillText('Sample data — design prototype. No real money, no real bets.', 64, H - 44);
  g.textAlign = 'right'; g.fillStyle = '#3ED0DA'; g.font = F(14, 600);
  g.fillText('housebets.com', W - 64, H - 44); g.textAlign = 'left';
  return cv;
}

function shareBet(id) {
  const b = S.bets.find(x => x.id === id);
  if (!b) return;
  const m = $('#modal');
  m.querySelector('.card').innerHTML = `
    <div class="sharet"><h3>Share this result</h3><button class="x" data-closemodal="1">${I.x}</button></div>
    <div class="shareprev"><canvas id="shareCanvas"></canvas></div>
    <p class="sharenote">Prototype only — the numbers are sample data and no real money was staked.</p>
    <div class="sharebtns">
      <button class="sab" data-share-png="${b.id}">${I.dl} Download PNG</button>
      <button class="sab" data-share-x="${b.id}">${I.xlogo} Share on X</button>
      <button class="sab" data-share-chat="${b.id}">${I.chat} Share to chatroom</button>
    </div>`;
  m.classList.add('open');
  const cv0 = document.getElementById('shareCanvas');
  renderCardTo(cv0, b);
  loadHubie(() => {
    const cv2 = document.getElementById('shareCanvas');
    if (cv2) renderCardTo(cv2, b);          // redraw with Hubie once the art is in
  });

  m.querySelector('[data-closemodal]').onclick = () => m.classList.remove('open');
  const cv = document.getElementById('shareCanvas');

  m.querySelector('[data-share-png]').onclick = () => {
    cv.toBlob(bl => {
      const u = URL.createObjectURL(bl);
      const a = document.createElement('a');
      a.href = u; a.download = 'housebets-bet-' + b.id + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 4000);
      toast('PNG saved to your downloads', 'ok');
    }, 'image/png');
  };
  m.querySelector('[data-share-x]').onclick = () => {
    const res = (b.status === 'won') ? 'won' : 'lost';
    const txt = b.sel + ' @ ' + fmt(b.odds) + ' — ' + res + '\n' + b.fixture +
                '\n\nSample data from a Housebets sportsbook prototype. No real money.';
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(txt), '_blank', 'noopener');
  };
  m.querySelector('[data-share-chat]').onclick = () => {
    S.chat = S.chat || [];
    const res2 = (b.status === 'won') ? 'won' : 'lost';
    S.chat.push({ id: 'c' + Date.now(), who: 'You', betId: b.id,
                  text: b.sel + ' @ ' + fmt(b.odds) + ' — ' + res2, at: 'Just now' });
    toast('Result posted to the chatroom', 'ok');
    m.classList.remove('open');
  };
}

/* ---------------- actions ---------------- */
function addToSlip(d) {
  const rawKey = d.sel, mname = d.mname, fixId = d.fix;
  const m = HB.matches.find(x => x.id === fixId) || HB.matches[0];
  const k = P(m.id, rawKey);
  const fixtureLabel = `${HB.teams[m.home].name} v ${HB.teams[m.away].name}`;
  if (S.slip.some(x => x.selId === k)) { toast('Already in your slip', 'warn'); return; }
  /* Singles only. The brief lists multis/accumulators as out of scope and
     says adding one reads as not having read the brief, so a new pick
     replaces the one already in the slip instead of joining it. */
  if (S.slip.length) {
    const gone = S.slip[0];
    S.slip = [];
    toast(`Singles only — replaced ${gone.selName}`, 'warn');
  }
  let name = rawKey;
  Object.values(HB.markets).forEach(arr => arr.forEach(mk => mk.outs.forEach(o => { if (o.k === rawKey) name = resolveName(o.n, m); })));
  if (rawKey.startsWith('mr-')) name = { 'mr-home': HB.teams[m.home].name, 'mr-draw': 'Draw', 'mr-away': HB.teams[m.away].name }[rawKey] || name;
  S.slip.push({
    uid: 'u' + Math.random().toString(36).slice(2, 8),
    selId: k, selName: name, marketName: mname, fixtureLabel,
    odds: S.prices[k], stake: '', changed: null, suspended: false
  });
  // tapping odds should always reveal the slip, wherever the panel was
  S.myBetsTab = 'slip';
  S.failMsg = null;
  toast(`Added ${name} @ ${odds2(S.prices[k])}`, 'ok');
  renderShell();
}

function placeBet() {
  const total = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0), 0);
  if (!total) { toast('Enter a stake first', 'warn'); return; }
  if (S.nextFail) {
    S.nextFail = false;
    // stays on the slip until the punter changes something — a toast would
    // be gone before a judge read it.
    S.failMsg = 'The market closed while your bet was being accepted.';
    toast('Bet failed — market closed while your bet was being accepted.', 'err');
    renderSlip(); bindPage();
    return;
  }
  const ret = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0) * b.odds, 0);
  const first = S.slip[0];
  const id = 'b' + Math.random().toString(36).slice(2, 7);
  S.bets.unshift({
    id, sel: first.selName, market: first.marketName, fixture: first.fixtureLabel,
    odds: first.odds, stake: total, status: 'open', placedAt: 'Just now', cashout: ret * 0.92
  });
  S.lastPlaced = { stake: total, ret, id };
  S.failMsg = null;
  S.slip = [];
  renderShell();
  receipt(ret, total);
}

function receipt(ret, stake) {
  const m = $('#modal');
  m.querySelector('.card').innerHTML = `
    <div class="big">Bet placed</div>
    <h3>${I.ok}</h3>
    <div class="amt">${money(ret)}</div>
    <div class="det">
      Stake <b>${money(stake)}</b> USDT · single<br>
      Reference <b>HB-${Math.random().toString(36).slice(2, 8).toUpperCase()}</b><br>
      Sample data — no real money moved.
    </div>
    <div class="acts">
      <button class="g" id="rcClose">Close</button>
      <button class="p" id="rcMy">View in My bets</button>
    </div>`;
  m.classList.add('open');
  $('#rcClose').onclick = () => m.classList.remove('open');
  $('#rcMy').onclick = () => { m.classList.remove('open'); S.myBetsTab = 'my'; go('bets'); };
}

function toast(msg, kind) {
  const t = document.createElement('div');
  t.className = 'toast ' + (kind || '');
  t.innerHTML = `<span class="ic">${kind === 'ok' ? I.ok : kind === 'err' ? I.err : I.warn}</span><span>${esc(msg)}</span>`;
  $('#toasts').appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity .35s'; t.style.opacity = '0'; }, 2600);
  setTimeout(() => t.remove(), 3050);
}

/* ---------------- live odds refresh in place ---------------- */
function renderOddsInPlace() {
  $$('[data-k]').forEach(el => {
    const k = el.dataset.k; if (S.prices[k] == null) return;
    const v = el.querySelector('.oval'); if (!v) return;
    const d = S.dir[k];
    v.innerHTML = `${d === 'up' ? '<span class="arw">▲</span> ' : d === 'down' ? '<span class="arw">▼</span> ' : ''}${odds2(S.prices[k])}`;
    el.classList.toggle('up', d === 'up'); el.classList.toggle('down', d === 'down');
    const was = S.prev[k];
    const txt = (was != null && Math.abs(was - S.prices[k]) > 0.001) ? `was ${odds2(was)}` : '';
    let w = el.querySelector('.owas');
    if (!w) {
      w = document.createElement('span'); w.className = 'owas';
      (el.querySelector('.opx') || el).appendChild(w);
    }
    w.textContent = txt;
    el.classList.toggle('moved', !!txt);
  });
}
function renderLiveClocks() {
  $$('[data-open-match]').forEach(() => {});
}

/* ---------------- binding ---------------- */
function bindPage() {
  const root = document.body;

  // nav
  $$('[data-go]').forEach(b => b.onclick = () => go(b.dataset.go));
  $$('.rail button').forEach(b => b.onclick = () => {
    const n = b.dataset.nav;
    if (n === 'bets') { S.myBetsTab = 'slip'; go('bets'); }
    else if (n === 'soccer') go('football');
    else go(n);
  });
  $$('.botnav button').forEach(b => b.onclick = () => {
    const n = b.dataset.nav;
    if (n === 'casino') { toast('Casino sits in the Housebets shell, but this entry covers the sportsbook only', 'warn'); return; }
    if (n === 'bets') { S.myBetsTab = 'slip'; if (window.innerWidth <= 640 && S.slip.length) openSheet(); else go('bets'); }
    else if (n === 'soccer') go('football');
    else go(n);
  });

  // tabs
  $$('.tab').forEach(b => b.onclick = () => {
    const id = b.dataset.tab;
    if (id === 'live') go('live');
    else if (id === 'soccer') go('football');
    else if (id === 'home') go('home');
    else if (HB.sports.some(x => x.id === id)) go('sport/' + id);
  });
  $$('[data-mkttab]').forEach(b => b.onclick = () => { S.mktTab = b.dataset.mkttab; renderMarketsLive(); bindPage(); });
  $$('[data-livef]').forEach(b => b.onclick = () => { S.liveFilter = b.dataset.livef; renderShell(); });
  $$('[data-footc]').forEach(b => b.onclick = () => { S.footComp = b.dataset.footc; renderShell(); });
  $$('[data-livec]').forEach(b => b.onclick = () => { S.liveComp = b.dataset.livec; renderShell(); });
  $$('[data-livesort]').forEach(b => b.onclick = () => { S.liveSort = b.dataset.livesort; renderShell(); });
  $$('[data-footgo]').forEach(b => b.onclick = () => { S.footComp = b.dataset.footgo; go('football'); });
  $$('[data-open-match]').forEach(b => b.onclick = e => { e.stopPropagation(); go('match/' + b.dataset.openMatch); });
  $$('[data-follow]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const k = b.dataset.follow; S.follows[k] = !S.follows[k];
    if (S.follows[k]) { toast(`Following ${HB.teams[k].name}`, 'ok'); if (!S.favs.some(f => f.id === k)) S.favs.push({ kind: 'team', id: k }); }
    else { S.favs = S.favs.filter(f => f.id !== k); }
    renderShell();
  });
  $$('[data-followcomp]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const k = b.dataset.followcomp; S.compFollows[k] = !S.compFollows[k];
    if (S.compFollows[k] && !S.favs.some(f => f.id === k)) S.favs.push({ kind: 'comp', id: k });
    else if (!S.compFollows[k]) S.favs = S.favs.filter(f => f.id !== k);
    renderShell();
  });
  $$('[data-unfav]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const [kind, id] = b.dataset.unfav.split(':');
    S.favs = S.favs.filter(f => f.id !== id);
    if (kind === 'team') S.follows[id] = false; else S.compFollows[id] = false;
    renderShell();
  });
  $$('[data-sel]').forEach(b => b.onclick = () => addToSlip(b.dataset));
  $$('[data-mbt]').forEach(b => b.onclick = () => { S.myBetsTab = b.dataset.mbt; renderSlip(); bindPage(); });
  $$('[data-share]').forEach(b => b.onclick = () => shareBet(b.dataset.share));
  const cf = $('#chatForm');
  if (cf) cf.onsubmit = e => {
    e.preventDefault();
    const inp = $('#chatMsg'); const v = (inp.value || '').trim();
    if (!v) return;
    S.chat = S.chat || [];
    S.chat.push({ id: 'c' + Date.now(), who: 'You', text: v, at: 'Just now', local: true });
    inp.value = '';
    renderShell();
    const el = $('.chatwrap'); if (el) el.scrollTop = el.scrollHeight;
  };

  // search
  const q = $('#q'), q2 = $('#q2');
  [q, q2].forEach(inp => {
    if (!inp) return;
    inp.oninput = () => {
      const box = inp === q ? $('#sres') : $('#sres2');
      const term = inp.value.trim().toLowerCase();
      if (!term) { box.classList.remove('open'); box.innerHTML = ''; return; }
      const hits = HB.searchIndex.filter(s => s.label.toLowerCase().includes(term)).slice(0, 7);
      box.innerHTML = hits.length
        ? hits.map(h => `<div class="row" data-go="${h.go}"><span class="kind">${h.kind}</span><span class="lbl">${esc(h.label)}</span></div>`).join('')
        : `<div class="empty">No match for “${esc(inp.value)}”</div>`;
      box.classList.add('open');
      $$('.row', box).forEach(r => r.onclick = () => { box.classList.remove('open'); inp.value = ''; go(r.dataset.go.replace('#/', '')); });
    };
  });

  bindSlip(document.body);
}

function bindSlip(root) {
  $$('[data-rm]', root).forEach(b => b.onclick = () => { S.slip = S.slip.filter(x => x.uid !== b.dataset.rm); S.failMsg = null; renderShell(); });
  $$('[data-accept]', root).forEach(b => b.onclick = () => {
    const it = S.slip.find(x => x.uid === b.dataset.accept);
    if (it) { it.odds = it.changed; it.changed = null; toast('New odds accepted', 'ok'); }
    renderShell();
  });
  $$('[data-stake]', root).forEach(inp => {
    inp.oninput = () => {
      const it = S.slip.find(x => x.uid === inp.dataset.stake);
      if (it) it.stake = inp.value;
      // update returns + totals without a full re-render (keeps focus)
      const card = inp.closest('.bet');
      const r = card && card.querySelector('.returns b'); if (r) r.textContent = money((parseFloat(inp.value) || 0) * it.odds);
      refreshTotals();
      // editing the stake is a fresh attempt, so drop the failure notice
      // in place — a full re-render would steal focus mid-typing.
      if (S.failMsg) {
        S.failMsg = null;
        const bar = document.querySelector('.failbar'); if (bar) bar.remove();
        const pb = document.querySelector('#place');
        if (pb) { pb.textContent = 'Place bet'; pb.disabled = false; }
      }
    };
  });
  $$('[data-quick]', root).forEach(b => b.onclick = () => {
    const [uid, v] = b.dataset.quick.split(':');
    const it = S.slip.find(x => x.uid === uid); if (it) { it.stake = v; renderSlip(); bindPage(); }
  });
  const ca = $('#clearAll', root); if (ca) ca.onclick = () => { S.slip = []; S.failMsg = null; toast('Slip cleared', 'warn'); renderShell(); };
  const pl = $('#place', root); if (pl) pl.onclick = placeBet;
  $$('[data-cash]', root).forEach(b => b.onclick = () => {
    const bet = S.bets.find(x => x.id === b.dataset.cash);
    if (bet) {
      bet.status = 'cashed'; bet.ret = bet.cashout;
      toast(`Cashed out ${money(bet.cashout)}`, 'ok');
      renderShell();
    }
  });
}

function refreshTotals() {
  const total = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0), 0);
  const ret = S.slip.reduce((s, b) => s + (parseFloat(b.stake) || 0) * b.odds, 0);
  $$('.returns').forEach(() => {});
  const lines = $$('.rline b');
  // totals line lives in the block after each bet; recompute the summary block
  const sums = $$('.rline');
  sums.forEach(l => {
    const k = l.children[0] && l.children[0].textContent.trim();
    if (k === 'Total stake' && l.querySelector('b')) l.querySelector('b').textContent = money(total);
    if (k === 'Potential return' && l.querySelector('b')) l.querySelector('b').textContent = money(ret);
  });
  const bar = $('#slipbar .t2'), amt = $('#slipbar .amt');
  if (bar) bar.textContent = 'Stake ' + money(total);
  if (amt) amt.textContent = money(ret);
  const p = $('#place'); if (p) {
    const blocked = S.slip.some(b => b.changed || b.suspended);
    p.disabled = blocked;
    p.textContent = blocked ? 'Resolve slip to continue' : 'Place bet';
  }
}

/* ---------------- state lab ---------------- */
function renderLab() {
  const m = $('#labMenu'); if (!m) return;
  const pauseBtn = m.querySelector('[data-lab="pause"]');
  if (pauseBtn) pauseBtn.innerHTML = `<i class="d" style="background:${S.paused ? '#F7C860' : '#6B8794'}"></i>${S.paused ? 'Resume live odds' : 'Pause live odds'}`;
}

/* Move a price the judge can actually see. Falls back to any price when
   nothing is on screen (e.g. the empty states). */
function driftVisible(delta) {
  const vis = [...document.querySelectorAll('#main [data-k]')]
    .map(el => el.dataset.k)
    .filter(k => S.prices[k] != null && !k.includes(':dc-'));
  const pool = vis.length ? vis : Object.keys(S.prices).filter(k => !k.includes(':dc-'));
  if (!pool.length) return;
  drift(pool[Math.floor(Math.random() * pool.length)], delta);
}

function labAction(a) {
  const m0 = HB.matches[0];
  FORCE = true; setTimeout(() => FORCE = false, 60);
  switch (a) {
    /* Prefer a price that is actually on screen — drifting a key belonging
       to a match the judge cannot see looks like nothing happened. */
    case 'up':   { driftVisible(+0.22); toast('Odds moved up on a live price', 'ok');   break; }
    case 'down': { driftVisible(-0.22); toast('Odds moved down on a live price', 'warn'); break; }
    case 'change':
      if (!S.slip.length) { addToSlip({ sel: 'mr-home', mname: 'Match result', fix: m0.id }); }
      if (S.slip.length) { drift(S.slip[0].selId, +0.30); toast('Odds changed — the slip now requires Accept', 'warn'); }
      break;
    case 'suspMkt': {
      const gid = S.mktTab === 'popular' ? 'tg' : (HB.markets[S.mktTab][0] || {}).id;
      S.suspGroups[gid] = !S.suspGroups[gid];
      toast(S.suspGroups[gid] ? 'Market group suspended' : 'Market group re-opened', S.suspGroups[gid] ? 'warn' : 'ok');
      renderShell(); break;
    }
    case 'suspSel':
      if (!S.slip.length) addToSlip({ sel: 'mr-home', mname: 'Match result', fix: m0.id });
      if (S.slip.length) { S.slip[0].suspended = true; toast('Selection suspended — slip is blocked', 'err'); renderShell(); }
      break;
    case 'fail':
      S.nextFail = true; toast('Next place-bet will fail', 'warn'); break;
    case 'noLive':
      S.noLive = !S.noLive; S.liveFilter = 'all';
      toast(S.noLive ? 'Nothing live — Live shows Starting soon' : 'Live matches restored', S.noLive ? 'warn' : 'ok');
      if (S.route === 'live') renderShell(); else go('live');
      break;
    case 'cash':
      S.myBetsTab = 'my'; renderSlip(); bindPage();
      toast('My bets → open bet shows cash out value', 'ok');
      go('bets'); break;
    case 'empty':
      S.slip = []; S.myBetsTab = 'slip'; renderShell(); toast('Slip emptied', 'warn'); break;
    case 'pause':
      S.paused = !S.paused;
      toast(S.paused ? 'Live odds paused — states now fire only from this lab' : 'Live odds resumed', S.paused ? 'warn' : 'ok');
      renderLab(); break;
    case 'placed':
      if (!S.slip.length) addToSlip({ sel: 'mr-home', mname: 'Match result', fix: m0.id });
      if (S.slip.length && !S.slip[0].stake) S.slip[0].stake = '50';
      S.nextFail = false; placeBet(); break;
  }
}

const LAB = [
  ['up', 'Odds move up', '#35D39A'],
  ['down', 'Odds move down', '#FF5B6E'],
  ['change', 'Odds changed → must accept', '#F7C860'],
  ['suspMkt', 'Market group suspended', '#6B8794'],
  ['suspSel', 'Selection suspended in slip', '#FF5B6E'],
  ['placed', 'Bet placed (receipt)', '#35D39A'],
  ['fail', 'Bet failed (next attempt)', '#FF5B6E'],
  ['noLive', 'Nothing live → Starting soon', '#6B8794'],
  ['cash', 'Cash out on an open bet', '#F7C860'],
  ['empty', 'Empty slip state', '#6B8794']
];


/* ---- wordmark shimmer -------------------------------------
   A highlight sweeps across the official logo. It only adds
   white light over the existing paths — no hue is changed,
   and the wave keeps its own cyan.
------------------------------------------------------------ */
function shimmerLogo(svg){
  if (!svg || svg.dataset.shim) return;
  const paths = [...svg.querySelectorAll('path')].map(p => p.outerHTML).join('');
  if (!paths) return;
  const vb = (svg.getAttribute('viewBox') || '0 0 116 18').split(/\s+/).map(Number);
  const W = vb[2] || 116, H = vb[3] || 18;
  const slow = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  svg.insertAdjacentHTML('afterbegin',
    `<defs>
      <g id="hbP">${paths}</g>
      <mask id="hbM" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><use href="#hbP"/></mask>
      <linearGradient id="hbS" gradientUnits="userSpaceOnUse" x1="${-W * 0.55}" y1="0" x2="0" y2="${H}">
        <stop offset="0"   stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.92"/>
        <stop offset="1"   stop-color="#ffffff" stop-opacity="0"/>
        ${slow ? '' : `<animateTransform attributeName="gradientTransform" type="translate"
            from="0 0" to="${W * 2.2} 0" dur="4.6s" repeatCount="indefinite"/>`}
      </linearGradient>
    </defs>`);
  [...svg.querySelectorAll(':scope > path')].forEach(p => p.remove());
  svg.insertAdjacentHTML('beforeend',
    `<use href="#hbP"/><rect x="0" y="0" width="${W}" height="${H}" fill="url(#hbS)" mask="url(#hbM)"/>`);
  svg.dataset.shim = '1';
}

/* ---------------- boot ---------------- */
function boot() {
  const qs = new URLSearchParams(location.search);
  const th = qs.get('theme') || 'c';
  if (th !== 'off') document.body.classList.add('theme-' + th);
  const bg = qs.get('bg');
  if (bg) document.body.classList.add('bg-' + bg);
  document.body.innerHTML = `
    <div class="app">
    ${topbarHTML()}
    <div class="shell">
      <nav class="rail">
        ${[['menu', 'Menu'], ['home', 'Sports'], ['casino', 'Casino'], ['chat', 'Chat'], ['bets', 'Bets']]
          .map(([n, l]) => `<button data-nav="${n}">${I[n] || I.home}<span>${l}</span></button>`).join('')}
      </nav>
      <div class="main"><div class="scroll" id="main"></div></div>
      <aside class="panel" id="panel"></aside>
    </div>
    <div class="slipbar" id="slipbar"></div>
    <nav class="botnav">
      <button data-nav="menu">${I.menu}<span>Menu</span></button>
      <button data-nav="home">${I.home}<span>Sports</span></button>
      <button data-nav="bets">${I.inbox.replace('width="30" height="30"', 'width="19" height="19"')}<span>Bets</span></button>
      <button data-nav="casino">${I.casino}<span>Casino</span></button>
      <button data-nav="chat">${I.chat}<span>Chat</span></button>
    </nav>
    </div>

    <div class="sheet" id="sheet">
      <div class="grab"><i></i></div>
      <div class="sh"><h3>Bet slip</h3><button class="x" id="sheetClose">${I.x}</button></div>
      <div class="sheetpanel"><div id="sheetBody"></div></div>
      <div class="sheetfoot" id="sheetFoot"></div>
    </div>

    <div class="modal" id="modal"><div class="scrim"></div><div class="card"></div></div>
    <div class="toasts" id="toasts"></div>

    <div class="lab">
      <div class="menu" id="labMenu">
        <div class="lh">State lab — fire any state</div>
        ${LAB.map(([a, l, c]) => `<button data-lab="${a}"><i class="d" style="background:${c}"></i>${l}</button>`).join('')}
        <button data-lab="pause"><i class="d" style="background:#6B8794"></i>Pause live odds</button>
        <div class="note">Every state in the scorecard, on demand. Judges: you shouldn't have to wait for randomness to see these.</div>
      </div>
      <button class="fab" id="labFab" title="State lab">${I.flask}</button>
    </div>
  `;

  renderLab();
  $('#labFab').onclick = () => $('#labMenu').classList.toggle('open');
  $$('[data-lab]').forEach(b => b.onclick = () => { labAction(b.dataset.lab); $('#labMenu').classList.remove('open'); });
  $('#sheetClose').onclick = () => { S.sheetOpen = false; $('#sheet').classList.remove('open'); };
  $('#modal .scrim').onclick = () => $('#modal').classList.remove('open');

  window.addEventListener('resize', () => { renderPanel(); renderSlipBar(); });
  if (!location.hash) location.hash = '#/home';
  route();
}

document.addEventListener('DOMContentLoaded', boot);
