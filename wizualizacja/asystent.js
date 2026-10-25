// Asystent OES: FAQ w formie czatu w prawym dolnym rogu (bez AI)
// Treści (FAQ, biura, cennik, terminy) są w asystent-dane.js i ładują się dopiero przy pierwszym otwarciu.
(() => {
  const PHONE = '501 294 854';
  // pytania na start; id z FAQ albo pytania-akcje asystenta (zapis, terminy, tematy)
  const START = ['032', '058', '068', 'terminy', 'zapis'];
  // przyciski pod odpowiedzią zależnie od działu FAQ
  const LINKS = {
    'Ceny kat. B': [['Zapisz się', 'zapis.html']], 'Ceny motocyklowe': [['Zapisz się', 'zapis.html']], 'Ceny pozostałe': [['Zapisz się', 'zapis.html']],
    'Promocje': [['Zapisz się online', 'zapis.html']], 'Terminy': [['Zapisz się', 'zapis.html']], 'Kontakt': [['Pokaż biura', 'index.html#biura']],
    'Formalności i PKK': [['Droga do prawa jazdy', 'droga.html']], 'Wiek i uprawnienia': [['Droga do prawa jazdy', 'droga.html']],
    'Przebieg kursu': [['Droga do prawa jazdy', 'droga.html']], 'O szkole': [['O nas', 'onas.html']],
  };
  // dział z pytaniami, na które szkoła musi jeszcze dać odpowiedzi: nie pokazujemy go w spisie tematów
  const HIDDEN = 'Do uzupełnienia przez OES';
  const ZAPIS_KAT = ['AM', 'A1', 'A2', 'A', 'B1', 'B', 'B+E', 'C1', 'C1+E', 'C', 'C+E', 'T'];
  // słowa, które znaczą to samo dla wyszukiwania (porównujemy początki słów)
  const SYN = {
    KOSZT: ['cen', 'koszt', 'drog', 'tani', 'zlot', 'zl', 'pln', 'kasy'],
    TERMIN: ['termin', 'kiedy', 'start', 'rozpocz', 'zaczyn', 'najbliz', 'data', 'daty', 'grafik', 'kalendar'],
    BIURO: ['biur', 'oddzial', 'placowk', 'filia', 'filii', 'adres', 'lokaliz'],
    KONTAKT: ['telefon', 'zadzwon', 'kontakt', 'mail'],
    WIEK: ['wiek', 'lat', 'latk', 'letn', 'pelnolet', 'niepelnolet', 'urodzin'],
    MOTO: ['motocykl', 'motor', 'skuter'],
    GODZ: ['otwar', 'czynn'],
  };
  const STOP = new Set('czy jak jest sa sie w we na do i a o z ze mi mnie moj moja moge mozna mam to ten ta te co od po za u dla oes prosze jaki jaka jakie jakim ktory ktora ktore tez juz bo by nie tak ja ty wy my kurs kursu kursie prawo jazdy jazda jazde prawa macie mamy oferujecie prowadzicie organizujecie moze musze trzeba potrzebuje chce chcialbym chcialabym jakis jakies'.split(' '));
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = n => n.toLocaleString('pl-PL') + ' zł';
  const telHref = t => 'tel:+48' + t.replace(/\D/g, '');

  const css = `
  .ai-fab { position: fixed; right: max(18px, env(safe-area-inset-right, 0px)); bottom: calc(var(--ai-bottom, 18px) + env(safe-area-inset-bottom, 0px)); z-index: 90; display: flex; align-items: center; gap: 10px; border: 0; cursor: pointer; padding: 0; background: none; font-family: var(--font-body, system-ui); }
  .ai-fab .ai-bub { order: -1; background: #fff; color: #0b1633; font-weight: 700; font-size: 14px; padding: 10px 14px; border-radius: 14px 14px 4px 14px; box-shadow: 0 10px 28px -8px rgba(7,18,51,.45); opacity: 0; transform: translateY(6px); transition: opacity .3s, transform .3s; pointer-events: none; white-space: nowrap; }
  .ai-fab.hello .ai-bub { opacity: 1; transform: none; }
  .ai-fab .ai-ico { position: relative; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(145deg, #2a6cf0, #1546a8); color: #fff; display: grid; place-items: center; box-shadow: 0 14px 30px -8px rgba(29,91,216,.75), inset 0 0 0 2px rgba(255,255,255,.18); transition: transform .2s; }
  .ai-fab:hover .ai-ico { transform: scale(1.06); }
  .ai-fab .ai-ico::after { content: ""; position: absolute; top: 3px; right: 3px; width: 13px; height: 13px; border-radius: 50%; background: #2fd47a; border: 2px solid #fff; }
  .ai-fab[aria-expanded="true"] { opacity: 0; pointer-events: none; }
  .ai-panel { position: fixed; right: max(18px, env(safe-area-inset-right, 0px)); bottom: calc(var(--ai-bottom, 18px) + env(safe-area-inset-bottom, 0px)); z-index: 91; width: min(390px, calc(100vw - 36px)); height: min(600px, calc(100vh - 110px)); display: flex; flex-direction: column; background: #f2f6fc; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 70px -20px rgba(7,18,51,.6); font-family: var(--font-body, system-ui); color: #0b1633; margin: 0; padding: 0; transform-origin: 100% 100%; animation: aiIn .28s cubic-bezier(.2,.9,.3,1.15); }
  .ai-panel[hidden] { display: none; }
  @keyframes aiIn { from { opacity: 0; transform: scale(.85) translateY(14px); } }
  .ai-head { display: flex; align-items: center; gap: 12px; padding: 14px 14px 14px 16px; background: #071233; color: #fff; }
  .ai-av { flex: none; width: 38px; height: 38px; border-radius: 10px; background: #1d5bd8; display: grid; place-items: center; font: 900 20px var(--font-display, system-ui); box-shadow: inset 0 0 0 2px rgba(255,255,255,.35); }
  .ai-head b { display: block; font-size: 16px; }
  .ai-head small { color: #9fb2d9; font-size: 12.5px; display: flex; align-items: center; gap: 6px; }
  .ai-head small::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #2fd47a; }
  .ai-hbtn { flex: none; width: 36px; height: 36px; border: 0; border-radius: 10px; background: rgba(255,255,255,.1); color: #fff; font-size: 20px; cursor: pointer; display: grid; place-items: center; }
  .ai-hbtn:hover { background: rgba(255,255,255,.2); }
  .ai-hbtn.ai-home { margin-left: auto; }
  .ai-log { position: relative; flex: 1; overflow-y: auto; padding: 16px 14px 8px; display: flex; flex-direction: column; gap: 10px; overscroll-behavior: contain; }
  .ai-msg { max-width: 88%; padding: 10px 13px; border-radius: 16px; font-size: 14.5px; line-height: 1.5; animation: aiMsg .25s ease-out; overflow-wrap: anywhere; }
  @keyframes aiMsg { from { opacity: 0; transform: translateY(6px); } }
  .ai-msg.bot { align-self: flex-start; background: #fff; border: 1px solid #d6dff0; border-bottom-left-radius: 5px; }
  .ai-msg.me { align-self: flex-end; background: #1d5bd8; color: #fff; border-bottom-right-radius: 5px; font-weight: 600; }
  .ai-msg.wide { max-width: 100%; width: 100%; }
  .ai-msg a.ai-in { color: #1d5bd8; font-weight: 700; }
  .ai-msg .ai-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
  .ai-msg .ai-links a { font-size: 13px; font-weight: 700; color: #1d5bd8; text-decoration: none; padding: 6px 10px; border-radius: 8px; background: #edf3ff; }
  .ai-msg .ai-links a:hover { background: #dce8ff; }
  .ai-tag { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 800; letter-spacing: .02em; text-transform: uppercase; color: #8a5a00; background: #fff3d6; border-radius: 6px; padding: 3px 7px; margin-bottom: 7px; }
  .ai-kick { display: block; font-size: 11.5px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #6b7fa8; margin-bottom: 4px; }
  .ai-note { display: block; margin-top: 7px; font-size: 12.5px; color: #5b6b8c; line-height: 1.45; }
  .ai-fa { display: inline-block; width: 1em; height: 1em; fill: currentColor; vertical-align: -.125em; }
  .ai-wave { color: #f5b301; transform-origin: 70% 90%; animation: aiWave 1.6s ease-in-out 2; }
  @keyframes aiWave { 0%, 60%, 100% { transform: none; } 10%, 30% { transform: rotate(14deg); } 20%, 40% { transform: rotate(-8deg); } }
  .ai-promo { display: block; margin-top: 8px; padding: 8px 10px; border-radius: 10px; background: #edf3ff; color: #12398f; font-size: 13px; font-weight: 600; line-height: 1.4; }
  .ai-rows { display: grid; gap: 1px; margin: 8px 0 2px; background: #e3e9f5; border-radius: 10px; overflow: hidden; }
  .ai-rows div { display: flex; justify-content: space-between; gap: 10px; padding: 7px 10px; background: #f7f9fd; font-size: 13.5px; }
  .ai-rows div > span:last-child { text-align: right; }
  .ai-rows b { white-space: nowrap; }
  .ai-rows s { display: block; color: #8494b5; font-size: 12px; }
  .ai-rows small { display: block; color: #6b7fa8; font-size: 12px; }
  .ai-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; }
  .ai-grid button, .ai-qlist button { border: 1.5px solid #d6dff0; background: #f7f9fd; color: #0b1633; font: 700 13px var(--font-body, system-ui); padding: 9px 10px; border-radius: 10px; cursor: pointer; text-align: left; line-height: 1.3; }
  .ai-grid button span { display: block; font-weight: 600; font-size: 11.5px; color: #6b7fa8; margin-top: 2px; }
  .ai-grid button:hover, .ai-qlist button:hover { border-color: #1d5bd8; background: #f1f6ff; }
  .ai-qlist { display: grid; gap: 5px; margin-top: 8px; }
  .ai-qlist button { font-weight: 600; color: #1d5bd8; }
  .ai-typing { align-self: flex-start; display: flex; gap: 4px; padding: 13px 14px; background: #fff; border: 1px solid #d6dff0; border-radius: 16px 16px 16px 5px; }
  .ai-typing i { width: 7px; height: 7px; border-radius: 50%; background: #9fb2d9; animation: aiDot 1s infinite; }
  .ai-typing i:nth-child(2) { animation-delay: .15s; } .ai-typing i:nth-child(3) { animation-delay: .3s; }
  @keyframes aiDot { 0%, 60%, 100% { transform: none; opacity: .5; } 30% { transform: translateY(-4px); opacity: 1; } }
  .ai-chips { display: flex; gap: 7px; padding: 4px 14px 10px; overflow-x: auto; scrollbar-width: none; }
  .ai-chips::-webkit-scrollbar { display: none; }
  .ai-chips button { flex: none; border: 1.5px solid #c4d4f2; background: #fff; color: #1d5bd8; font: 700 13px var(--font-body, system-ui); padding: 8px 11px; border-radius: 999px; cursor: pointer; white-space: nowrap; }
  .ai-chips button.all { background: #1d5bd8; border-color: #1d5bd8; color: #fff; }
  .ai-chips button:hover { border-color: #1d5bd8; }
  .ai-form { display: flex; gap: 8px; padding: 10px 12px 12px; background: #fff; border-top: 1px solid #d6dff0; }
  .ai-form input { flex: 1; min-width: 0; font: 500 15px var(--font-body, system-ui); padding: 11px 13px; border: 1.5px solid #d6dff0; border-radius: 12px; background: #f7f9fd; color: #0b1633; }
  .ai-form input:focus { outline: none; border-color: #1d5bd8; background: #fff; }
  .ai-form button { flex: none; width: 44px; border: 0; border-radius: 12px; background: #1d5bd8; color: #fff; cursor: pointer; display: grid; place-items: center; }
  @media (max-width: 560px) {
    .ai-panel { right: 0; left: 0; bottom: 0; width: 100%; height: min(86vh, 680px); border-radius: 20px 20px 0 0; padding-bottom: env(safe-area-inset-bottom, 0px); }
    .ai-fab .ai-ico { width: 54px; height: 54px; }
  }
  @media (prefers-reduced-motion: reduce) { .ai-panel, .ai-msg, .ai-typing i, .ai-wave { animation: none; } }`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

  // ikony: Font Awesome Free 6.5.2 (https://fontawesome.com, licencja ikon CC BY 4.0), wklejone jako SVG
  const handIco = '<svg class="ai-fa ai-wave" viewBox="0 0 512 512" aria-hidden="true"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/></svg>';
  const tagsIco = '<svg class="ai-fa" viewBox="0 0 512 512" aria-hidden="true"><path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>';
  const warnIco = '<svg class="ai-fa" viewBox="0 0 512 512" aria-hidden="true"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>';
  const chatIco = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" stroke-width="2.6"/></svg>';
  const sendIco = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg>';
  const listIco = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>';
  document.body.insertAdjacentHTML('beforeend', `
    <button class="ai-fab" type="button" aria-expanded="false" aria-controls="aiPanel" aria-label="Otwórz asystenta OES"><span class="ai-ico">${chatIco}</span><span class="ai-bub">${handIco} Masz pytanie?</span></button>
    <div class="ai-panel" id="aiPanel" role="dialog" aria-label="Asystent OES" hidden>
      <div class="ai-head"><span class="ai-av">L</span><div><b>Asystent OES</b><small>odpowiada od razu</small></div><button class="ai-hbtn ai-home" type="button" aria-label="Wszystkie tematy" title="Wszystkie tematy">${listIco}</button><button class="ai-hbtn ai-x" type="button" aria-label="Zamknij">×</button></div>
      <div class="ai-log" aria-live="polite"></div>
      <div class="ai-chips"></div>
      <form class="ai-form"><input type="text" placeholder="Napisz pytanie, np. ile kosztuje A2?" aria-label="Twoje pytanie" autocomplete="off" enterkeyhint="send"><button type="submit" aria-label="Wyślij">${sendIco}</button></form>
    </div>`);
  const fab = document.querySelector('.ai-fab'), panel = document.getElementById('aiPanel');
  const log = panel.querySelector('.ai-log'), chips = panel.querySelector('.ai-chips'), form = panel.querySelector('.ai-form'), input = form.querySelector('input');
  const asked = new Set();
  let D = null, IDX = null, topics = [];
  const byId = {};

  // na telefonie w zapisie nie zasłaniaj dolnego paska z przyciskiem „Wyślij”
  const mini = document.getElementById('miniBar');
  const place = () => document.documentElement.style.setProperty('--ai-bottom', mini && getComputedStyle(mini).display !== 'none' && !mini.hidden ? (mini.offsetHeight + 14) + 'px' : '18px');
  place(); addEventListener('resize', place);

  // ---------- dane i wyszukiwanie ----------
  function load() {
    if (window.OES_DANE) return Promise.resolve(window.OES_DANE);
    return new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = 'asystent-dane.js';
      s.onload = () => window.OES_DANE ? res(window.OES_DANE) : rej(); s.onerror = rej; document.head.appendChild(s);
    });
  }
  // kategorie prawa jazdy w tekście: „kat. B”, „A2”, „B+E”, „na C”, samo „B” na końcu pytania
  function cats(raw) {
    const t = ' ' + norm(raw).replace(/\s*\+\s*/g, '+') + ' ', out = [];
    const re = /(?:^|[^a-z0-9+])(am|a1|a2|b1|b\+e|be|c1\+e|c1|c\+e|ce|(?:kat\.?\s*|kategori\w*\s+|na\s+)(?:a|b|c|d|t))(?=$|[^a-z0-9+])/g;
    let m; while ((m = re.exec(t))) out.push(m[1].replace(/^(kat\.?\s*|kategori\w*\s+|na\s+)/, ''));
    const end = t.match(/(?:^|\s)(a|b|c|d|t)\s*\?*\s*$/); if (end) out.push(end[1]);
    return [...new Set(out.map(c => c.toUpperCase().replace(/^BE$/, 'B+E').replace(/^CE$/, 'C+E')))];
  }
  function terms(raw) {
    const out = cats(raw).map(c => 'K_' + c);
    const words = norm(raw).replace(/[^a-z0-9+ ]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w));
    for (const w of words) {
      if (/^(am|a1|a2|b1|b\+e|c1|c\+e|c1\+e)$/.test(w) || w.length < 2) continue;
      const syn = Object.keys(SYN).find(k => SYN[k].some(p => w.startsWith(p)));
      out.push(syn || (w.length > 5 ? w.slice(0, 5) : w));
    }
    return out;
  }
  function index() {
    const docs = D.faq.map(f => ({ id: f[0], dzial: f[1], q: f[2], a: f[3], ok: f[4], tq: new Set(terms(f[2])), ta: new Set(terms(f[3])) }));
    const df = {}; docs.forEach(d => new Set([...d.tq, ...d.ta]).forEach(t => { df[t] = (df[t] || 0) + 1; }));
    const idf = t => Math.log(1 + docs.length / (df[t] || 0.5));
    docs.forEach(d => { byId[d.id] = d; });
    topics = [...new Set(docs.map(d => d.dzial))].filter(t => t !== HIDDEN);
    return { docs, idf };
  }
  function search(raw) {
    const q = [...new Set(terms(raw))]; if (!q.length) return [];
    return IDX.docs.map(d => {
      let s = 0; for (const t of q) s += d.tq.has(t) ? IDX.idf(t) * 2 : d.ta.has(t) ? IDX.idf(t) * 0.6 : 0;
      return { d, s: s / (1 + 0.04 * d.tq.size) * (d.ok ? 1.15 : 1) };
    }).filter(r => r.s > 0).sort((a, b) => b.s - a.s);
  }
  const office = raw => { const t = norm(raw); return D.biura.findIndex(b => b.k.some(k => t.includes(k))); };

  // ---------- czat ----------
  // długą odpowiedź (lista tematów, cennik) pokazujemy od początku, krótką przewijamy na dół
  let big = null;
  const scroll = () => { log.scrollTop = big ? big.offsetTop - 56 : log.scrollHeight; };
  const add = (html, who, wide) => {
    const d = document.createElement('div'); d.className = 'ai-msg ' + who + (wide ? ' wide' : ''); d.innerHTML = html; log.appendChild(d);
    big = null; scroll(); big = d.offsetHeight > log.clientHeight * 0.7 ? d : null; scroll(); return d;
  };
  // w odpowiedziach z FAQ zamieniamy adresy stron, maile i telefony na linki
  const rich = s => esc(s)
    .replace(/https?:\/\/[^\s,;)]+[^\s,;).]/g, u => `<a class="ai-in" href="${u}" target="_blank" rel="noopener">${u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>`)
    .replace(/[\w.-]+@[\w.-]+\.[a-z]{2,}/g, m => `<a class="ai-in" href="mailto:${m}">${m}</a>`)
    .replace(/(?<![\d.])(\d{3} \d{3} \d{3}|12 \d{3} \d{2} \d{2})(?!\d)/g, t => `<a class="ai-in" href="${telHref(t)}">${t}</a>`);
  const linksHtml = links => links && links.length ? `<div class="ai-links">${links.map(([l, h]) => `<a href="${h}">${l} →</a>`).join('')}</div>` : '';
  const reply = (html, links, wide, wait = 550) => new Promise(res => {
    const t = document.createElement('div'); t.className = 'ai-typing'; t.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(t); big = null; scroll();
    setTimeout(() => { t.remove(); add(html + linksHtml(links), 'bot', wide); res(); }, wait);
  });
  const callLink = b => ['Zadzwoń ' + (b ? b.tel : PHONE), telHref(b ? b.tel : PHONE)];
  const plDate = iso => iso.split('-').reverse().join('.');

  function setChips(list) {
    chips.innerHTML = list.map(([l, a, cls]) => `<button type="button" data-act="${esc(a)}"${cls ? ` class="${cls}"` : ''}>${esc(l)}</button>`).join('');
    chips.scrollLeft = 0; scroll();
  }
  const label = a => a === 'terminy' ? 'Najbliższe terminy' : a === 'zapis' ? 'Jak się zapisać?' : a === 'tematy' ? 'Wszystkie tematy' : byId[a] ? byId[a].q : a;
  function defaultChips(extra = []) {
    const pick = [...extra, ...START.filter(a => !asked.has(a) && !extra.includes(a))].slice(0, 4);
    setChips([['Wszystkie tematy', 'tematy', 'all'], ...pick.map(a => [label(a), a])]);
  }
  // podobne pytania, których jeszcze nie było
  const related = d => search(d.q).map(r => r.d).filter(x => x.id !== d.id && !asked.has(x.id)).slice(0, 3).map(x => x.id);

  // przy cenach zawsze dopisek o zniżkach: szkoła często daje promocje indywidualnie (prośba Piotra)
  const PROMO = `<span class="ai-promo">${tagsIco} O zniżki i aktualne promocje zapytaj w biurze. Zadzwoń albo przyjdź, a podamy Ci najlepszą cenę.</span>`;
  const isPrice = d => d.dzial.startsWith('Ceny') || d.dzial === 'Promocje' || /cennik/i.test(d.a);
  async function showFaq(d) {
    asked.add(d.id);
    const tag = d.ok ? '' : `<span class="ai-tag">${warnIco} do potwierdzenia w biurze</span><br>`;
    const links = [...(LINKS[d.dzial] || [])];
    if (!d.ok || isPrice(d)) links.unshift(callLink());
    await reply(tag + rich(d.a) + (isPrice(d) ? PROMO : ''), links);
  }
  const rowsHtml = rows => `<div class="ai-rows">${rows.join('')}</div>`;
  async function showPrices(cs) {
    const rows = D.cennik.filter(r => r[0].split(' + ').some(k => cs.includes(k)));
    if (!rows.length) return false;
    const h = rows.map(r => `<div><span>${esc(r[0])} · ${esc(r[1])}${r[5] ? `<small>${r[4] ? r[4] + ' h teorii, ' : 'bez teorii, '}${r[5]} h jazd</small>` : ''}</span><span><b>${fmt(r[2])}</b>${r[3] > r[2] ? `<s>${fmt(r[3])}</s>` : ''}</span></div>`);
    const zk = cs.find(c => ZAPIS_KAT.includes(c));
    await reply(`<span class="ai-kick">Cennik kat. ${esc(cs.join(', '))}</span>${rowsHtml(h)}<span class="ai-note">Ceny z cennika OES na ${plDate(D.stan)}. Mogą się zmienić przed opłaceniem kursu.</span>${PROMO}`,
      [callLink(), ...(zk ? [['Zapisz się na kat. ' + zk, 'zapis.html?kat=' + encodeURIComponent(zk)]] : [])], true);
    return true;
  }
  async function showOffice(i) {
    const b = D.biura[i];
    await reply(`<span class="ai-kick">Biuro ${esc(b.nazwa)}</span><b>${esc(b.adres)}</b><br>Tel. ${rich(b.tel)}${b.tel2 ? ', ' + rich(b.tel2) : ''}<br>${rich(b.email)}<span class="ai-note">Godziny biur: ${esc(D.godziny)}. Wyjątki świąteczne sprawdź w biurze.</span>`,
      [callLink(b), ['Zapisz się tutaj', 'zapis.html?biuro=' + i]]);
  }
  async function showDates(i) {
    const b = D.biura[i], today = new Date().toISOString().slice(0, 10);
    const modes = [['weekendowego', 'Kurs weekendowy'], ['dwutygodniowego', 'Kurs dwutygodniowy']];
    const h = modes.map(([k, name]) => {
      const ds = D.terminy.filter(t => t[1] === b.id && t[0].includes(k) && t[2] >= today).slice(0, 3);
      return ds.length ? `<div><span>${name}<small>start o ${esc(ds[0][3])}</small></span><span><b>${ds.map(t => plDate(t[2]).slice(0, 5) + (t[2].endsWith('12-25') ? '*' : '')).join(', ')}</b></span></div>` : '';
    }).filter(Boolean);
    if (!h.length) return reply(`Nie widzę już ogłoszonych terminów dla biura ${esc(b.nazwa)}. Najbliższy start potwierdzi biuro.`, [callLink(b)]);
    const xmas = h.some(r => r.includes('*'));
    await reply(`<span class="ai-kick">Najbliższe starty · ${esc(b.nazwa)}</span>${rowsHtml(h)}<span class="ai-note">To terminy ogłoszone w kalendarzu OES, a nie potwierdzone wolne miejsca.${xmas ? ' * 25.12 to święto, ten termin trzeba potwierdzić telefonicznie.' : ''}</span>`,
      [callLink(b), ['Zapisz się tutaj', 'zapis.html?biuro=' + i]], true);
  }
  const pickOffice = what => reply(`${what === 'terminy' ? 'Terminy zależą od biura.' : 'Mamy 6 biur.'} Które cię interesuje?<div class="ai-grid">${D.biura.map((b, i) => `<button type="button" data-act="${what}:${i}">${esc(b.nazwa.replace('Kraków – ', ''))}<span>${b.nazwa.startsWith('Kraków') ? 'Kraków' : esc(b.adres.split(' (')[0])}</span></button>`).join('')}</div>`, null, true);
  function showTopics() {
    const n = t => IDX.docs.filter(d => d.dzial === t).length;
    const word = k => k === 1 ? 'pytanie' : k % 10 >= 2 && k % 10 <= 4 && (k % 100 < 10 || k % 100 >= 20) ? 'pytania' : 'pytań';
    return reply(`Wybierz temat, a pokażę wszystkie pytania z niego.<div class="ai-grid">${topics.map(t => `<button type="button" data-act="temat:${esc(t)}">${esc(t)}<span>${n(t)} ${word(n(t))}</span></button>`).join('')}</div>`, null, true);
  }
  function showTopic(t) {
    const ds = IDX.docs.filter(d => d.dzial === t);
    return reply(`<span class="ai-kick">${esc(t)}</span>Kliknij pytanie:<div class="ai-qlist">${ds.map(d => `<button type="button" data-act="${d.id}">${esc(d.q)}</button>`).join('')}</div>`, null, true);
  }
  function showSignup() {
    asked.add('zapis');
    return reply(`Najszybciej online: formularz zajmuje około minuty, a biuro oddzwoni i ustali termin startu. Możesz też zadzwonić pod ${rich(PHONE)} albo przyjść do jednego z 6 biur.`, [['Zapisz się online', 'zapis.html'], callLink()]);
  }

  // klik w przycisk: pytanie z FAQ, temat, biuro albo akcja asystenta
  async function act(a, text) {
    chips.innerHTML = '';
    add(esc(text), 'me');
    await ready;
    if (a === 'tematy') await showTopics();
    else if (a === 'zapis') await showSignup();
    else if (a === 'terminy') { asked.add('terminy'); await pickOffice('terminy'); }
    else if (a.startsWith('terminy:')) await showDates(+a.split(':')[1]);
    else if (a.startsWith('temat:')) await showTopic(a.slice(6));
    else if (byId[a]) { await showFaq(byId[a]); return defaultChips(related(byId[a])); }
    defaultChips();
  }
  // wpisane pytanie: najpierw terminy, ceny i biura z danych, potem szukanie w FAQ
  async function askText(v) {
    chips.innerHTML = '';
    add(esc(v), 'me');
    await ready;
    const t = new Set(terms(v)), cs = cats(v), oi = office(v), res = search(v);
    const best = res[0], strong = best && best.s >= 3;
    const generic = [...t].every(x => x === 'TERMIN' || x.startsWith('K_'));
    if (t.has('TERMIN') && oi >= 0) await showDates(oi);
    else if (t.has('KOSZT') && cs.length && await showPrices(cs)) { /* cennik pokazany */ }
    else if (oi >= 0 && (t.has('BIURO') || t.has('KONTAKT') || t.has('GODZ') || t.size <= 2)) await showOffice(oi);
    else if (t.has('TERMIN') && (generic || !strong || best.d.id === '092')) { asked.add('terminy'); await pickOffice('terminy'); }
    else if (/zapis|zglos/.test(norm(v)) && (!strong || best.s < 5)) await showSignup();
    else if (strong) { await showFaq(best.d); return defaultChips(related(best.d)); }
    else {
      const near = res.slice(0, 3).map(r => r.d);
      await reply(`Nie mam gotowej odpowiedzi na to pytanie. Zadzwoń do biura: ${rich(PHONE)} (${esc(D.godziny)})${near.length ? ' albo sprawdź, czy chodziło ci o jedno z tych pytań:' + `<div class="ai-qlist">${near.map(d => `<button type="button" data-act="${d.id}">${esc(d.q)}</button>`).join('')}</div>` : ', albo przejrzyj wszystkie tematy.'}`, [callLink()], near.length > 0);
    }
    defaultChips();
  }

  let started = false, ready = null;
  function open() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); fab.classList.remove('hello');
    if (!started) {
      started = true;
      add(`${handIco} Cześć! Jestem asystentem szkoły jazdy OES. Wybierz pytanie, przejrzyj tematy albo napisz własne.`, 'bot');
      ready = load().then(d => {
        D = d; IDX = index();
        add(`<span class="ai-kick">Najczęściej pytacie</span><div class="ai-qlist">${START.map(a => `<button type="button" data-act="${a}">${esc(label(a))}</button>`).join('')}</div>`, 'bot', true);
        defaultChips();
      })
        .catch(() => { ready = null; add(`Nie udało się wczytać odpowiedzi. Zadzwoń do biura: ${rich(PHONE)}.`, 'bot'); });
    }
    if (matchMedia('(min-width: 561px)').matches) input.focus();
  }
  const close = () => { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.focus(); };
  fab.addEventListener('click', open);
  panel.querySelector('.ai-x').addEventListener('click', close);
  panel.querySelector('.ai-home').addEventListener('click', () => { if (D) act('tematy', 'Wszystkie tematy'); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });
  // przyciski z pytaniami, tematami i biurami (w dolnym pasku i w wiadomościach)
  panel.addEventListener('click', e => {
    const b = e.target.closest('button[data-act]'); if (!b || !D) return;
    const a = b.dataset.act;
    act(a, a.startsWith('terminy:') ? 'Terminy: ' + b.firstChild.textContent : a.startsWith('temat:') ? a.slice(6) : label(a));
  });
  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value.trim(); if (!v || !D) return; input.value = ''; askText(v); });
  // linki z odpowiedzi do miejsc na tej samej stronie zamykają okno
  log.addEventListener('click', e => { const a = e.target.closest('a'); if (a && a.hash && a.pathname === location.pathname) close(); });
  setTimeout(() => { if (!started) fab.classList.add('hello'); }, 2500);
  setTimeout(() => fab.classList.remove('hello'), 9000);
})();
