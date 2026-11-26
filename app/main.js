// Router and controls for Statistik Indonesia. Hash routes only, no
// network: the page is rendered from views.js into #view, and every control
// on the page (chart series toggles, chart type toggles, the province table
// search and sort) is wired here.
import {
  viewHome, viewDemografi, viewEkonomi, viewKetenagakerjaan,
  viewKemiskinan, viewProvinsi, viewSumber, viewNotFound,
} from './views.js';

const ROUTES = {
  '': { render: viewHome, title: 'Statistik Indonesia — Portal Data Nasional' },
  '/': { render: viewHome, title: 'Statistik Indonesia — Portal Data Nasional' },
  '/demografi': { render: viewDemografi, title: 'Demografi — Statistik Indonesia' },
  '/ekonomi': { render: viewEkonomi, title: 'Ekonomi — Statistik Indonesia' },
  '/ketenagakerjaan': { render: viewKetenagakerjaan, title: 'Ketenagakerjaan — Statistik Indonesia' },
  '/kemiskinan': { render: viewKemiskinan, title: 'Kemiskinan & IPM — Statistik Indonesia' },
  '/provinsi': { render: viewProvinsi, title: 'Provinsi — Statistik Indonesia' },
  '/sumber': { render: viewSumber, title: 'Sumber Data — Statistik Indonesia' },
};

// UI state kept for the session: which chart series/type is shown, and the
// province table's search text and sort order.
const state = {
  ekonomiSeries: 'pdbTumbuh',
  ekonomiType: 'batang',
  kemiskinanSeries: 'kemiskinan',
  kemiskinanType: 'garis',
  provinsiSort: 'penduduk-desc',
  provinsiQuery: '',
};

const view = document.getElementById('view');
const navLinks = Array.from(document.querySelectorAll('[data-route]'));

function currentRoute() {
  const hash = window.location.hash || '#/';
  return hash.slice(1) || '/';
}

function render() {
  const route = currentRoute();
  const entry = ROUTES[route] || { render: viewNotFound, title: 'Halaman tidak ditemukan — Statistik Indonesia' };
  view.innerHTML = entry.render(state);
  document.title = entry.title;
  navLinks.forEach((a) => {
    const active = a.getAttribute('data-route') === route
      || (route === '/' && a.getAttribute('data-route') === '/');
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireControls();
  window.scrollTo(0, 0);
}

function rerenderKeepFocus() {
  const search = document.getElementById('provinsi-search');
  const hadFocus = document.activeElement === search;
  const pos = search ? search.selectionStart : 0;
  render();
  if (hadFocus) {
    const next = document.getElementById('provinsi-search');
    if (next) {
      next.focus();
      next.setSelectionRange(pos, pos);
    }
  }
}

function wireControls() {
  view.querySelectorAll('[data-series-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-series-toggle');
      state[`${group}Series`] = btn.getAttribute('data-series');
      render();
    });
  });
  view.querySelectorAll('[data-type-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-type-toggle');
      state[`${group}Type`] = btn.getAttribute('data-type');
      render();
    });
  });
  const search = document.getElementById('provinsi-search');
  if (search) {
    search.addEventListener('input', () => {
      state.provinsiQuery = search.value;
      rerenderKeepFocus();
    });
  }
  const sort = document.getElementById('provinsi-sort');
  if (sort) {
    sort.addEventListener('change', () => {
      state.provinsiSort = sort.value;
      render();
    });
  }
}

window.addEventListener('hashchange', render);
render();
