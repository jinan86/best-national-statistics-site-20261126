// Page renderers for Statistik Indonesia. Each route returns an HTML
// string; main.js puts it in #view and wires up the controls. All figures
// come from data.js (BPS).
import {
  HEADLINES, SERIES, DEMOGRAFI, PROVINSI, WILAYAH, EKONOMI,
  KETENAGAKERJAAN, KEMISKINAN_IPM, SUMBER, formatShare, META,
} from './data.js';
import { lineChart, barChart } from './charts.js';

function kpiCards() {
  return HEADLINES.map((h) => `
    <a class="kpi" href="${h.route}">
      <span class="kpi-label">${h.label}</span>
      <span class="kpi-value">${h.value}</span>
      <span class="kpi-unit">${h.unit}</span>
      <span class="kpi-change">${h.change}</span>
      <span class="kpi-note">${h.note}</span>
    </a>`).join('');
}

function chartCard(title, subtitle, chartHtml, toggleHtml = '') {
  return `<section class="card chart-card">
    <div class="card-head"><h3>${title}</h3><span class="card-sub">${subtitle}</span></div>
    ${toggleHtml}
    <div class="chart-wrap">${chartHtml}</div>
  </section>`;
}

function factList(items) {
  return `<ul class="facts">${items.map((f) => `
    <li><span class="fact-value">${f.value}</span>
    <span class="fact-body"><strong>${f.label}</strong> — ${f.detail}</span></li>`).join('')}</ul>`;
}

function sourceLine(series) {
  return `<p class="source">Sumber: ${series.source}</p>`;
}

function seriesToggle(group, options, active) {
  return `<div class="toggle" role="group" aria-label="Pilih seri grafik">${options.map((o) => `
    <button type="button" data-series-toggle="${group}" data-series="${o.key}"
      class="${o.key === active ? 'active' : ''}" aria-pressed="${o.key === active}">${o.label}</button>`).join('')}</div>`;
}

function typeToggle(group, active) {
  return `<div class="toggle" role="group" aria-label="Jenis grafik">${['garis', 'batang'].map((t) => `
    <button type="button" data-type-toggle="${group}" data-type="${t}"
      class="${t === active ? 'active' : ''}" aria-pressed="${t === active}">${t === 'garis' ? 'Garis' : 'Batang'}</button>`).join('')}</div>`;
}

export function viewHome() {
  return `
  <section class="hero">
    <p class="eyebrow">Portal Data Nasional &middot; Tahun data ${META.year}</p>
    <h1>Indonesia dalam angka, <em>di satu tempat.</em></h1>
    <p class="lede">Penduduk, ekonomi, pekerjaan, kemiskinan, dan pembangunan manusia —
      angka resmi Badan Pusat Statistik yang diperbarui tiap rilis, disajikan
      supaya siapa pun bisa membaca arah negeri ini dalam hitungan menit.</p>
    <p class="hero-meta">Sumber: ${META.source} &middot; Diperbarui ${META.updated} &middot; Semua grafik dibuat dari data di halaman ini, tanpa unduhan luar.</p>
    <nav class="quick-links" aria-label="Jalan pintas">
      <a href="#/demografi">Demografi</a><a href="#/ekonomi">Ekonomi</a>
      <a href="#/ketenagakerjaan">Ketenagakerjaan</a><a href="#/kemiskinan">Kemiskinan &amp; IPM</a>
      <a href="#/provinsi">Provinsi</a>
    </nav>
  </section>

  <section aria-label="Angka utama 2025">
    <h2 class="section-title">Angka utama ${META.year}</h2>
    <div class="kpi-grid">${kpiCards()}</div>
    <p class="source">Ketuk kartu untuk membuka halaman detailnya. Sumber: BPS, Berita Resmi Statistik 2025.</p>
  </section>

  <div class="chart-grid">
    ${chartCard('Pertumbuhan ekonomi', 'PDB, % per tahun', barChart(SERIES.pdbTumbuh))}
    ${chartCard('Penduduk terus bertambah', 'Juta jiwa, 2010–2025', lineChart(SERIES.penduduk, { color: '#0e7c6b' }))}
  </div>
  ${sourceLine(SERIES.pdbTumbuh)}

  <section class="card">
    <div class="card-head"><h3>Sekilas Indonesia</h3></div>
    <div class="glance">
      <div><strong>55,65%</strong><span>penduduk tinggal di Pulau Jawa</span></div>
      <div><strong>46,9%</strong><span>penduduk berusia di bawah 30 tahun</span></div>
      <div><strong>38</strong><span>provinsi, 514 kabupaten/kota</span></div>
      <div><strong>17.508</strong><span>pulau membentang di tiga zona waktu</span></div>
    </div>
  </section>

  <section>
    <h2 class="section-title">Jelajahi datanya</h2>
    <div class="explore-grid">
      <a class="explore" href="#/demografi"><strong>Demografi</strong><span>284,44 juta jiwa dan penyebarannya</span></a>
      <a class="explore" href="#/ekonomi"><strong>Ekonomi</strong><span>PDB, inflasi, dan perdagangan 2024–2025</span></a>
      <a class="explore" href="#/ketenagakerjaan"><strong>Ketenagakerjaan</strong><span>Pengangguran 4,85% dan 147,91 juta pekerja</span></a>
      <a class="explore" href="#/kemiskinan"><strong>Kemiskinan &amp; IPM</strong><span>8,25% miskin, IPM 75,90 dan terus naik</span></a>
      <a class="explore" href="#/provinsi"><strong>Provinsi</strong><span>Tabel provinsi terpadat yang bisa diurutkan</span></a>
      <a class="explore" href="#/sumber"><strong>Sumber Data</strong><span>Rilis BPS di balik setiap angka</span></a>
    </div>
  </section>`;
}

export function viewDemografi() {
  return `
  <section class="page-head">
    <p class="eyebrow">Penduduk</p>
    <h1>Demografi</h1>
    <p class="lede">Indonesia berpenduduk 284,44 juta jiwa pada 2025 — negara keempat
      terpadat di dunia — dan masih tumbuh sekitar satu persen per tahun.</p>
  </section>
  ${chartCard('Jumlah penduduk, 2010–2025', 'Juta jiwa', lineChart(SERIES.penduduk, { color: '#0e7c6b' }))}
  ${sourceLine(SERIES.penduduk)}
  <section class="card"><div class="card-head"><h3>Yang perlu diketahui</h3></div>${factList(DEMOGRAFI)}</section>
  <section class="card">
    <div class="card-head"><h3>Provinsi terpadat</h3><span class="card-sub">2024, BPS</span></div>
    <p>Tiga provinsi terpadat — Jawa Barat, Jawa Timur, dan Jawa Tengah — semuanya
      di Pulau Jawa. Tabel lengkapnya ada di halaman <a href="#/provinsi">Provinsi</a>.</p>
  </section>`;
}

export function viewEkonomi(state) {
  const key = state.ekonomiSeries || 'pdbTumbuh';
  const series = SERIES[key];
  const type = state.ekonomiType || 'batang';
  const chart = type === 'garis' ? lineChart(series) : barChart(series);
  return `
  <section class="page-head">
    <p class="eyebrow">PDB &middot; Inflasi &middot; Perdagangan</p>
    <h1>Ekonomi</h1>
    <p class="lede">Perekonomian tumbuh 5,11% pada 2025 dengan PDB Rp23.821,1 triliun.
      Inflasi 2,92% dan neraca perdagangan 2024 surplus sekitar US$31 miliar.</p>
  </section>
  ${chartCard(series.title, series.unit, chart,
    seriesToggle('ekonomi', [
      { key: 'pdbTumbuh', label: 'Pertumbuhan PDB' },
      { key: 'inflasi', label: 'Inflasi' },
    ], key) + typeToggle('ekonomi', type))}
  ${sourceLine(series)}
  <section class="card"><div class="card-head"><h3>Perdagangan luar negeri</h3></div>${factList(EKONOMI.perdagangan)}</section>
  <div class="two-col">
    <section class="card"><div class="card-head"><h3>Sektor terbesar PDB</h3></div>
      <ol class="ranked">${EKONOMI.sektor.map((s, i) => `<li><span>${i + 1}</span> ${s}</li>`).join('')}</ol></section>
    <section class="card"><div class="card-head"><h3>Komoditas ekspor utama</h3></div>
      <ol class="ranked">${EKONOMI.eksporKomoditas.map((s, i) => `<li><span>${i + 1}</span> ${s}</li>`).join('')}</ol>
      <p class="source">Tujuan ekspor utama: ${EKONOMI.eksporTujuan.join(', ')}.</p></section>
  </div>`;
}

export function viewKetenagakerjaan() {
  return `
  <section class="page-head">
    <p class="eyebrow">Sakernas</p>
    <h1>Ketenagakerjaan</h1>
    <p class="lede">Pengangguran terbuka turun ke 4,85% pada Agustus 2025. Sebanyak
      147,91 juta orang bekerja dan partisipasi angkatan kerja mencapai 70,95%.</p>
  </section>
  ${chartCard('Tingkat Pengangguran Terbuka', '% angkatan kerja', barChart(SERIES.tpt, { color: '#0e7c6b' }))}
  ${sourceLine(SERIES.tpt)}
  <section class="card"><div class="card-head"><h3>Angka kunci</h3></div>${factList(KETENAGAKERJAAN)}</section>
  <section class="card"><div class="card-head"><h3>Membaca angkanya</h3></div>
    <p>TPT mengukur penduduk angkatan kerja yang tidak bekerja dan sedang mencari
      pekerjaan. Angka Agustus 2025 (4,85%) lebih rendah dari Agustus 2024 (4,91%)
      dan Agustus 2023 (5,32%) — tren penurunan tiga tahun berturut-turut. Pada
      November 2025 TPT tercatat 4,74%.</p></section>`;
}

export function viewKemiskinan(state) {
  const key = state.kemiskinanSeries || 'kemiskinan';
  const series = SERIES[key];
  const type = state.kemiskinanType || 'garis';
  const chart = type === 'garis' ? lineChart(series, { color: key === 'ipm' ? '#0f2a43' : '#b3402e' }) : barChart(series, { color: key === 'ipm' ? '#0f2a43' : '#b3402e' });
  return `
  <section class="page-head">
    <p class="eyebrow">Kesejahteraan</p>
    <h1>Kemiskinan &amp; IPM</h1>
    <p class="lede">Kemiskinan turun ke 8,25% pada September 2025 — terendah dalam
      seri ini — sementara IPM naik ke 75,90, masuk kategori Tinggi.</p>
  </section>
  ${chartCard(series.title, series.unit, chart,
    seriesToggle('kemiskinan', [
      { key: 'kemiskinan', label: 'Kemiskinan' },
      { key: 'ipm', label: 'IPM' },
    ], key) + typeToggle('kemiskinan', type))}
  ${sourceLine(series)}
  <div class="two-col">
    <section class="card"><div class="card-head"><h3>Kemiskinan</h3></div>${factList(KEMISKINAN_IPM.kemiskinan)}</section>
    <section class="card"><div class="card-head"><h3>Komponen IPM 2025</h3></div>${factList(KEMISKINAN_IPM.ipm)}</section>
  </div>
  <section class="card"><div class="card-head"><h3>Membaca angkanya</h3></div>
    <p>Garis kemiskinan September 2025 adalah Rp641.443 per kapita per bulan.
      Penduduk dengan pengeluaran di bawah garis itu dihitung miskin: 23,36 juta
      orang, turun dari 24,06 juta pada September 2024. Gini ratio 0,363 berarti
      ketimpangan pengeluaran menyempit dibanding Maret 2025 (0,375).</p></section>`;
}

function provinceRows(list, query) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? list.filter((p) => p.nama.toLowerCase().includes(q) || p.pulau.toLowerCase().includes(q))
    : list;
  if (filtered.length === 0) {
    return `<tr><td colspan="4" class="empty">Tidak ada provinsi yang cocok dengan “${query}”.</td></tr>`;
  }
  return filtered.map((p) => `
    <tr><td>${p.rank}</td><td>${p.nama}</td><td>${p.pulau}</td>
    <td class="num">${p.penduduk.toFixed(2).replace('.', ',')}</td>
    <td class="num">${formatShare(p.penduduk)}</td></tr>`).join('');
}

export function viewProvinsi(state) {
  const sorted = [...PROVINSI];
  const sort = state.provinsiSort || 'penduduk-desc';
  if (sort === 'nama-asc') sorted.sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
  if (sort === 'nama-desc') sorted.sort((a, b) => b.nama.localeCompare(a.nama, 'id'));
  if (sort === 'penduduk-asc') sorted.sort((a, b) => a.penduduk - b.penduduk);
  if (sort === 'penduduk-desc') sorted.sort((a, b) => b.penduduk - a.penduduk);
  const query = state.provinsiQuery || '';
  return `
  <section class="page-head">
    <p class="eyebrow">Wilayah</p>
    <h1>Provinsi</h1>
    <p class="lede">Indonesia punya 38 provinsi. Tujuh provinsi terpadat menurut BPS
      (2024) tercantum di bawah — ketujuh provinsi ini menampung lebih dari
      separuh penduduk Indonesia.</p>
  </section>
  <section class="card">
    <div class="card-head"><h3>Provinsi terpadat, 2024</h3><span class="card-sub">Juta jiwa &middot; BPS</span></div>
    <div class="table-tools">
      <label class="search-label">Cari provinsi
        <input type="search" id="provinsi-search" placeholder="Mis. Jawa, Sumatera…" value="${query.replace(/"/g, '&quot;')}" autocomplete="off">
      </label>
      <label class="sort-label">Urutkan
        <select id="provinsi-sort">
          <option value="penduduk-desc" ${sort === 'penduduk-desc' ? 'selected' : ''}>Penduduk: terbanyak dulu</option>
          <option value="penduduk-asc" ${sort === 'penduduk-asc' ? 'selected' : ''}>Penduduk: tersedikit dulu</option>
          <option value="nama-asc" ${sort === 'nama-asc' ? 'selected' : ''}>Nama: A–Z</option>
          <option value="nama-desc" ${sort === 'nama-desc' ? 'selected' : ''}>Nama: Z–A</option>
        </select>
      </label>
    </div>
    <div class="table-scroll">
    <table class="data-table">
      <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th class="num">Penduduk (jt)</th><th class="num">Pangsa nasional</th></tr></thead>
      <tbody id="provinsi-body">${provinceRows(sorted, query)}</tbody>
    </table>
    </div>
    <p class="source">Sumber: BPS, tabel jumlah penduduk menurut provinsi 2024. Pangsa dihitung terhadap penduduk 2024 (281,6 juta jiwa). Angka Banten, DKI Jakarta, dan Sulawesi Selatan dibulatkan ke satu desimal oleh BPS.</p>
  </section>
  <section class="card"><div class="card-head"><h3>Wilayah Indonesia</h3></div>
    <div class="glance">${WILAYAH.map((w) => `<div><strong>${w.value}</strong><span>${w.label}</span></div>`).join('')}</div>
    <p class="source">Mata uang Rupiah (Rp). Bahasa Indonesia. Zona waktu WIB, WITA, dan WIT.</p>
  </section>`;
}

export function viewSumber() {
  return `
  <section class="page-head">
    <p class="eyebrow">Transparansi</p>
    <h1>Sumber Data</h1>
    <p class="lede">Setiap angka di situs ini berasal dari rilis resmi Badan Pusat
      Statistik. Tabel di bawah menautkan tiap kelompok angka ke rilisnya —
      tidak ada angka yang dikarang.</p>
  </section>
  <section class="card">
    <div class="table-scroll">
    <table class="data-table sources">
      <thead><tr><th>Angka</th><th>Sumber</th><th>Rilis</th></tr></thead>
      <tbody>${SUMBER.map((s) => `<tr><td>${s.angka}</td><td>${s.sumber}</td><td>${s.tautan}</td></tr>`).join('')}</tbody>
    </table>
    </div>
  </section>
  <section class="card"><div class="card-head"><h3>Catatan metode</h3></div>
    <p>Angka headline memakai tahun data 2025 (atau 2024 bila rilis 2025 belum
      terbit, seperti perdagangan luar negeri). Seri historis memakai titik
      waktu yang sama seperti yang diterbitkan BPS. Bila BPS merevisi suatu
      angka pada rilis berikutnya, angka di sini mengikuti rilis yang dikutip.</p>
    <p class="source">Situs ini bukan situs resmi BPS dan tidak berafiliasi dengan BPS.
      Desain dan teksnya original. Data: Badan Pusat Statistik — bps.go.id.</p></section>`;
}

export function viewNotFound() {
  return `
  <section class="page-head">
    <p class="eyebrow">Halaman tidak ditemukan</p>
    <h1>Halaman itu tidak ada</h1>
    <p class="lede">Tautan yang Anda buka tidak mengarah ke halaman mana pun di situs
      ini. Coba salah satu halaman di bawah.</p>
    <nav class="quick-links"><a href="#/">Beranda</a><a href="#/demografi">Demografi</a>
    <a href="#/ekonomi">Ekonomi</a><a href="#/provinsi">Provinsi</a></nav>
  </section>`;
}
