// Asystent OES: FAQ w formie czatu w prawym dolnym rogu (bez AI)
(() => {
  // przykładowe pytania i odpowiedzi do podmiany na treści od szkoły: q = pytanie, k = słowa kluczowe, a = odpowiedź, links = przyciski pod odpowiedzią
  const FAQ = [
    { q: 'Ile kosztuje kurs kat. B?', k: ['koszt', 'cena', 'cen', 'ile kosztuje', 'zl', 'zlot', 'drogo', 'kasa', 'placi'],
      a: 'Kurs kat. B w OES kosztuje <b>4500 zł</b> (cena regularna 4700 zł). Do tego dochodzą opłaty poza szkołą: badanie lekarskie do 200 zł, egzamin w MORD 50 zł za teorię i 200 zł za praktykę oraz 100,50 zł za wydanie prawa jazdy. Razem wychodzi około <b>5050 zł</b> plus zdjęcie.',
      links: [['Zobacz wszystkie koszty', 'droga.html']] },
    { q: 'Co to jest PKK i jak je zdobyć?', k: ['pkk', 'profil', 'kandydat', 'wniosek', 'wydzial', 'urzad'],
      a: 'PKK to <b>Profil Kandydata na Kierowcę</b>, numer potrzebny do kursu i egzaminu. Najpierw robisz badanie lekarskie, potem składasz w wydziale komunikacji wniosek z orzeczeniem, zdjęciem 35 × 45 mm i dowodem osobistym (jeśli nie masz 18 lat, także ze zgodą rodzica). Numer jest bezpłatny, zwykle trwa to 1–2 tygodnie. Pomożemy ci z dokumentami.',
      links: [['Krok po kroku', 'droga.html']] },
    { q: 'Czy mogę zacząć kurs bez PKK?', k: ['bez pkk', 'nie mam pkk', 'zaczac bez'],
      a: 'Do formalnego rozpoczęcia szkolenia numer PKK jest potrzebny. Termin kursu możesz jednak ustalić z nami wcześniej, a my podpowiemy, jak szybko załatwić PKK.' },
    { q: 'Od ilu lat mogę zrobić prawo jazdy?', k: ['wiek', 'lat', 'ile mam miec', 'od ilu', '17', 'nieletni', 'pelnolet'],
      a: 'Kat. <b>B od 17 lat</b> (osoby niepełnoletnie potrzebują zgody opiekuna i mają kilka ograniczeń w prowadzeniu). AM od 14 lat, A1 i B1 od 16, A2, B+E i C1 od 18, C i C+E od 21, a A od 24 lat albo wcześniej, jeśli masz już A2 od 2 lat. Kurs możesz zacząć do 3 miesięcy przed wymaganym wiekiem.' },
    { q: 'Ile trwa kurs kat. B?', k: ['ile trwa', 'czas', 'dlugo', 'jak szybko', 'miesiac', 'godzin'],
      a: 'Kurs kat. B to <b>30 godzin teorii i 30 godzin jazd</b>. Jazdy ustalasz z instruktorem w godzinach, które ci pasują, więc całość zwykle zajmuje około 2–3 miesięcy. Jest też kurs przyspieszony.' },
    { q: 'Gdzie są wasze biura?', k: ['biur', 'gdzie', 'adres', 'lokaliz', 'krakow', 'wieliczk', 'zabierz', 'blisko', 'otwarte', 'godziny otwarcia'],
      a: 'Mamy 6 biur: Kraków – ul. Wrocławska 48, ul. Czarnowiejska 13/9, ul. Kalwaryjska 51/4, ul. Jerzmanowskiego 37/106, Wieliczka – ul. Reymonta 1/3 i Zabierzów – ul. Krakowska 26. Biura są czynne <b>pn–pt 10:00–18:00</b> i <b>sob 9:00–13:00</b>.',
      links: [['Pokaż biura', 'index.html#biura']] },
    { q: 'Jak wygląda egzamin?', k: ['egzamin', 'mord', 'word', 'teori', 'prakty', 'plac', 'pytan'],
      a: 'Egzaminy w Krakowie prowadzi MORD. <b>Teoria</b> (50 zł): 32 pytania w 25 minut, zdajesz od 68 na 74 punkty. <b>Praktyka</b> (200 zł): przygotowanie auta, plac manewrowy i co najmniej 25 minut jazdy w mieście.',
      links: [['Zajrzyj pod maskę', 'index.html#pod-maska']] },
    { q: 'Co, jeśli nie zdam egzaminu?', k: ['nie zdam', 'oblal', 'poprawk', 'ponown', 'drugi raz'],
      a: 'Spokojnie, to się zdarza. Zapisujesz się na kolejny termin i płacisz za tę część jeszcze raz: 50 zł za teorię albo 200 zł za praktykę. Przed poprawką możesz dokupić w OES jazdy doszkalające.' },
    { q: 'Jak się zapisać?', k: ['zapis', 'zapisac', 'jak zaczac', 'formularz', 'chce zaczac'],
      a: 'Najszybciej online: wypełnienie formularza zajmuje około minuty, a biuro oddzwoni i ustali termin. Możesz też zadzwonić pod <b>501 294 854</b> albo przyjść do biura.',
      links: [['Zapisz się online', 'zapis.html']] },
    { q: 'Jakie kategorie prowadzicie?', k: ['kategori', 'motocykl', 'ciezarow', 'traktor', 'ciagnik', 'przyczep', 'skuter', 'quad'],
      a: 'Szkolimy na kategorie <b>AM, A1, A2, A, B1, B, B+E, C1, C1+E, C, C+E oraz T</b>, czyli od skutera i quada, przez samochód, po ciężarówkę z przyczepą i ciągnik.',
      links: [['Wybierz pojazd', 'index.html#start']] },
    { q: 'Czy okulary przeszkadzają?', k: ['okular', 'soczew', 'wzrok'],
      a: 'Nie. Lekarz może tylko wpisać obowiązek jazdy w okularach lub soczewkach. Na egzamin zabierz je ze sobą.' },
  ];
  const START = [0, 1, 4, 5, 8];
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l');
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const css = `
  .ai-fab { position: fixed; right: max(18px, env(safe-area-inset-right, 0px)); bottom: calc(var(--ai-bottom, 18px) + env(safe-area-inset-bottom, 0px)); z-index: 90; display: flex; align-items: center; gap: 10px; border: 0; cursor: pointer; padding: 0; background: none; font-family: var(--font-body, system-ui); }
  .ai-fab .ai-bub { order: -1; background: #fff; color: #0b1633; font-weight: 700; font-size: 14px; padding: 10px 14px; border-radius: 14px 14px 4px 14px; box-shadow: 0 10px 28px -8px rgba(7,18,51,.45); opacity: 0; transform: translateY(6px); transition: opacity .3s, transform .3s; pointer-events: none; white-space: nowrap; }
  .ai-fab.hello .ai-bub { opacity: 1; transform: none; }
  .ai-fab .ai-ico { position: relative; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(145deg, #2a6cf0, #1546a8); color: #fff; display: grid; place-items: center; box-shadow: 0 14px 30px -8px rgba(29,91,216,.75), inset 0 0 0 2px rgba(255,255,255,.18); transition: transform .2s; }
  .ai-fab:hover .ai-ico { transform: scale(1.06); }
  .ai-fab .ai-ico::after { content: ""; position: absolute; top: 3px; right: 3px; width: 13px; height: 13px; border-radius: 50%; background: #2fd47a; border: 2px solid #fff; }
  .ai-fab[aria-expanded="true"] { opacity: 0; pointer-events: none; }
  .ai-panel { position: fixed; right: max(18px, env(safe-area-inset-right, 0px)); bottom: calc(var(--ai-bottom, 18px) + env(safe-area-inset-bottom, 0px)); z-index: 91; width: min(380px, calc(100vw - 36px)); height: min(580px, calc(100vh - 120px)); display: flex; flex-direction: column; background: #f2f6fc; border-radius: 20px; overflow: hidden; box-shadow: 0 30px 70px -20px rgba(7,18,51,.6); font-family: var(--font-body, system-ui); color: #0b1633; margin: 0; padding: 0; transform-origin: 100% 100%; animation: aiIn .28s cubic-bezier(.2,.9,.3,1.15); }
  .ai-panel[hidden] { display: none; }
  @keyframes aiIn { from { opacity: 0; transform: scale(.85) translateY(14px); } }
  .ai-head { display: flex; align-items: center; gap: 12px; padding: 14px 14px 14px 16px; background: #071233; color: #fff; }
  .ai-av { flex: none; width: 38px; height: 38px; border-radius: 10px; background: #1d5bd8; display: grid; place-items: center; font: 900 20px var(--font-display, system-ui); box-shadow: inset 0 0 0 2px rgba(255,255,255,.35); }
  .ai-head b { display: block; font-size: 16px; }
  .ai-head small { color: #9fb2d9; font-size: 12.5px; display: flex; align-items: center; gap: 6px; }
  .ai-head small::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #2fd47a; }
  .ai-x { margin-left: auto; width: 36px; height: 36px; border: 0; border-radius: 10px; background: rgba(255,255,255,.1); color: #fff; font-size: 20px; cursor: pointer; }
  .ai-x:hover { background: rgba(255,255,255,.2); }
  .ai-log { flex: 1; overflow-y: auto; padding: 16px 14px 8px; display: flex; flex-direction: column; gap: 10px; overscroll-behavior: contain; }
  .ai-msg { max-width: 86%; padding: 10px 13px; border-radius: 16px; font-size: 14.5px; line-height: 1.5; animation: aiMsg .25s ease-out; }
  @keyframes aiMsg { from { opacity: 0; transform: translateY(6px); } }
  .ai-msg.bot { align-self: flex-start; background: #fff; border: 1px solid #d6dff0; border-bottom-left-radius: 5px; }
  .ai-msg.me { align-self: flex-end; background: #1d5bd8; color: #fff; border-bottom-right-radius: 5px; font-weight: 600; }
  .ai-msg .ai-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
  .ai-msg .ai-links a { font-size: 13px; font-weight: 700; color: #1d5bd8; text-decoration: none; padding: 6px 10px; border-radius: 8px; background: #edf3ff; }
  .ai-msg .ai-links a:hover { background: #dce8ff; }
  .ai-typing { align-self: flex-start; display: flex; gap: 4px; padding: 13px 14px; background: #fff; border: 1px solid #d6dff0; border-radius: 16px 16px 16px 5px; }
  .ai-typing i { width: 7px; height: 7px; border-radius: 50%; background: #9fb2d9; animation: aiDot 1s infinite; }
  .ai-typing i:nth-child(2) { animation-delay: .15s; } .ai-typing i:nth-child(3) { animation-delay: .3s; }
  @keyframes aiDot { 0%, 60%, 100% { transform: none; opacity: .5; } 30% { transform: translateY(-4px); opacity: 1; } }
  .ai-chips { display: flex; flex-wrap: wrap; gap: 7px; padding: 4px 14px 10px; }
  .ai-chips button { border: 1.5px solid #c4d4f2; background: #fff; color: #1d5bd8; font: 700 13px var(--font-body, system-ui); padding: 8px 11px; border-radius: 999px; cursor: pointer; text-align: left; }
  .ai-chips button:hover { border-color: #1d5bd8; background: #f1f6ff; }
  .ai-form { display: flex; gap: 8px; padding: 10px 12px 12px; background: #fff; border-top: 1px solid #d6dff0; }
  .ai-form input { flex: 1; min-width: 0; font: 500 15px var(--font-body, system-ui); padding: 11px 13px; border: 1.5px solid #d6dff0; border-radius: 12px; background: #f7f9fd; color: #0b1633; }
  .ai-form input:focus { outline: none; border-color: #1d5bd8; background: #fff; }
  .ai-form button { flex: none; width: 44px; border: 0; border-radius: 12px; background: #1d5bd8; color: #fff; cursor: pointer; display: grid; place-items: center; }
  @media (max-width: 560px) {
    .ai-panel { right: 0; left: 0; bottom: 0; width: 100%; height: min(82vh, 640px); border-radius: 20px 20px 0 0; padding-bottom: env(safe-area-inset-bottom, 0px); }
    .ai-fab .ai-ico { width: 54px; height: 54px; }
  }
  @media (prefers-reduced-motion: reduce) { .ai-panel, .ai-msg, .ai-typing i { animation: none; } }`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

  const chatIco = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" stroke-width="2.6"/></svg>';
  const sendIco = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg>';
  document.body.insertAdjacentHTML('beforeend', `
    <button class="ai-fab" type="button" aria-expanded="false" aria-controls="aiPanel" aria-label="Otwórz asystenta OES"><span class="ai-ico">${chatIco}</span><span class="ai-bub">Masz pytanie? 👋</span></button>
    <div class="ai-panel" id="aiPanel" role="dialog" aria-label="Asystent OES" hidden>
      <div class="ai-head"><span class="ai-av">L</span><div><b>Asystent OES</b><small>odpowiada od razu</small></div><button class="ai-x" type="button" aria-label="Zamknij">×</button></div>
      <div class="ai-log" aria-live="polite"></div>
      <div class="ai-chips"></div>
      <form class="ai-form"><input type="text" placeholder="Napisz pytanie…" aria-label="Twoje pytanie" autocomplete="off"><button type="submit" aria-label="Wyślij">${sendIco}</button></form>
    </div>`);
  const fab = document.querySelector('.ai-fab'), panel = document.getElementById('aiPanel');
  const log = panel.querySelector('.ai-log'), chips = panel.querySelector('.ai-chips'), form = panel.querySelector('.ai-form'), input = form.querySelector('input');
  const asked = new Set();

  // na telefonie w zapisie nie zasłaniaj dolnego paska z przyciskiem „Wyślij”
  const mini = document.getElementById('miniBar');
  const place = () => document.documentElement.style.setProperty('--ai-bottom', mini && getComputedStyle(mini).display !== 'none' && !mini.hidden ? (mini.offsetHeight + 14) + 'px' : '18px');
  place(); addEventListener('resize', place);

  const scroll = () => { log.scrollTop = log.scrollHeight; };
  const add = (html, who) => { const d = document.createElement('div'); d.className = 'ai-msg ' + who; d.innerHTML = html; log.appendChild(d); scroll(); return d; };
  const answer = (html, links) => new Promise(res => {
    const t = document.createElement('div'); t.className = 'ai-typing'; t.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(t); scroll();
    setTimeout(() => { t.remove(); add(html + (links ? `<div class="ai-links">${links.map(([l, h]) => `<a href="${h}">${l} →</a>`).join('')}</div>` : ''), 'bot'); res(); }, 650);
  });
  function showChips() {
    const left = FAQ.map((f, i) => i).filter(i => !asked.has(i));
    const pick = [...START.filter(i => !asked.has(i)), ...left.filter(i => !START.includes(i))].slice(0, 4);
    chips.innerHTML = pick.map(i => `<button type="button" data-i="${i}">${FAQ[i].q}</button>`).join('');
  }
  async function ask(i, text) {
    chips.innerHTML = '';
    add(esc(text || FAQ[i].q), 'me');
    if (i === -1) await answer('Na to pytanie nie mam jeszcze gotowej odpowiedzi. Zadzwoń do biura: <b>501 294 854</b> (pn–pt 10–18, sob 9–13) albo wybierz jedno z pytań poniżej.', [['Zadzwoń', 'tel:+48501294854'], ['Zapisz się', 'zapis.html']]);
    else { asked.add(i); await answer(FAQ[i].a, FAQ[i].links); }
    showChips(); scroll();
  }
  // dopasowanie wpisanego pytania do FAQ po słowach kluczowych
  function match(text) {
    const t = norm(text); let best = -1, score = 0;
    FAQ.forEach((f, i) => { const s = f.k.reduce((n, k) => n + (t.includes(norm(k)) ? k.length : 0), 0); if (s > score) { score = s; best = i; } });
    return best;
  }
  let started = false;
  function open() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); fab.classList.remove('hello');
    if (!started) { started = true; add('Cześć! 👋 Jestem asystentem szkoły jazdy OES. Wybierz pytanie albo napisz własne.', 'bot'); showChips(); }
    if (matchMedia('(min-width: 561px)').matches) input.focus();
  }
  const close = () => { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.focus(); };
  fab.addEventListener('click', open);
  panel.querySelector('.ai-x').addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) close(); });
  chips.addEventListener('click', e => { const b = e.target.closest('button'); if (b) ask(+b.dataset.i); });
  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value.trim(); if (!v) return; input.value = ''; ask(match(v), v); });
  // linki z odpowiedzi do miejsc na tej samej stronie zamykają okno
  log.addEventListener('click', e => { const a = e.target.closest('a'); if (a && a.hash && a.pathname === location.pathname) close(); });
  setTimeout(() => { if (!started) fab.classList.add('hello'); }, 2500);
  setTimeout(() => fab.classList.remove('hello'), 9000);
})();
