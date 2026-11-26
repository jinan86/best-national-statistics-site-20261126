// Data for Statistik Indonesia. Every figure comes from BPS (Badan Pusat
// Statistik) releases as summarised in the brief; see the Sumber Data page
// for the release behind each number. Nothing here is invented.

export const META = {
  country: 'Indonesia',
  year: 2025,
  source: 'Badan Pusat Statistik (BPS)',
  updated: '26 November 2026',
};

// Headline cards on the home page.
export const HEADLINES = [
  { key: 'penduduk', label: 'Penduduk', value: '284,44 jt', unit: 'jiwa', change: '+1,01% dari 2024', note: '55,65% tinggal di Pulau Jawa', route: '#/demografi' },
  { key: 'pdb', label: 'PDB', value: 'Rp23.821,1 T', unit: 'harga berlaku', change: 'Tumbuh 5,11%', note: '2024: Rp22.139,0 T (+5,03%)', route: '#/ekonomi' },
  { key: 'pdbKapita', label: 'PDB per Kapita', value: 'Rp83,7 jt', unit: 'US$5.083,4', change: '2024: Rp78,6 jt', note: 'US$4.960,3 pada 2024', route: '#/ekonomi' },
  { key: 'inflasi', label: 'Inflasi (yoy)', value: '2,92%', unit: 'akhir 2025', change: '2024: 1,57%', note: 'Inflasi tahun kalender 2025', route: '#/ekonomi' },
  { key: 'tpt', label: 'Pengangguran Terbuka', value: '4,85%', unit: 'Agu 2025', change: 'Agu 2024: 4,91%', note: 'Nov 2025: 4,74%', route: '#/ketenagakerjaan' },
  { key: 'miskin', label: 'Kemiskinan', value: '8,25%', unit: 'Sep 2025', change: '23,36 juta orang', note: 'Garis kemiskinan Rp641.443/kapita/bulan', route: '#/kemiskinan' },
  { key: 'ipm', label: 'Indeks Pembangunan Manusia', value: '75,90', unit: 'kategori Tinggi', change: '2024: 75,02', note: 'Umur harapan hidup 74,47 tahun', route: '#/kemiskinan' },
  { key: 'ekspor', label: 'Ekspor', value: 'US$264,70 M', unit: 'tahun 2024', change: '+2,29% dari 2023', note: 'Nonmigas US$248,83 M; surplus ±US$31 M', route: '#/ekonomi' },
];

// Chart series. Each series: { label, unit, points: [{ x, y }] }.
export const SERIES = {
  penduduk: {
    title: 'Jumlah Penduduk',
    unit: 'juta jiwa',
    source: 'BPS — SP2010, SUPAS 2015, SP2020, dan rilis penduduk 2024–2025',
    points: [
      { x: '2010', y: 237.64 }, { x: '2015', y: 255.18 }, { x: '2020', y: 270.2 },
      { x: '2024', y: 281.6 }, { x: '2025', y: 284.44 },
    ],
  },
  pdbTumbuh: {
    title: 'Pertumbuhan PDB',
    unit: '% (yoy)',
    source: 'BPS — Berita Resmi Statistik PDB',
    points: [
      { x: '2019', y: 5.02 }, { x: '2020', y: -2.07 }, { x: '2021', y: 3.7 },
      { x: '2022', y: 5.31 }, { x: '2023', y: 5.05 }, { x: '2024', y: 5.03 },
      { x: '2025', y: 5.11 },
    ],
  },
  inflasi: {
    title: 'Inflasi Akhir Tahun',
    unit: '% (yoy)',
    source: 'BPS — Berita Resmi Statistik Inflasi',
    points: [
      { x: '2022', y: 5.51 }, { x: '2023', y: 2.61 },
      { x: '2024', y: 1.57 }, { x: '2025', y: 2.92 },
    ],
  },
  kemiskinan: {
    title: 'Tingkat Kemiskinan',
    unit: '% penduduk',
    source: 'BPS — Berita Resmi Statistik Kemiskinan',
    points: [
      { x: 'Mar 2023', y: 9.36 }, { x: 'Mar 2024', y: 9.03 }, { x: 'Sep 2024', y: 8.57 },
      { x: 'Mar 2025', y: 8.47 }, { x: 'Sep 2025', y: 8.25 },
    ],
  },
  ipm: {
    title: 'Indeks Pembangunan Manusia',
    unit: 'skor 0–100',
    source: 'BPS — Berita Resmi Statistik IPM',
    points: [
      { x: '2022', y: 73.77 }, { x: '2023', y: 74.39 },
      { x: '2024', y: 75.02 }, { x: '2025', y: 75.9 },
    ],
  },
  tpt: {
    title: 'Tingkat Pengangguran Terbuka',
    unit: '% angkatan kerja',
    source: 'BPS — Berita Resmi Statistik Ketenagakerjaan (Sakernas)',
    points: [
      { x: 'Agu 2023', y: 5.32 }, { x: 'Agu 2024', y: 4.91 }, { x: 'Agu 2025', y: 4.85 },
    ],
  },
};

// Demography facts.
export const DEMOGRAFI = [
  { label: 'Pertumbuhan penduduk 2024–2025', value: '1,01%', detail: 'Dari 281,6 juta jiwa (2024) menjadi 284,44 juta jiwa (2025).' },
  { label: 'Penduduk di Pulau Jawa', value: '55,65%', detail: 'Lebih dari separuh penduduk Indonesia tinggal di Pulau Jawa.' },
  { label: 'Penduduk berusia di bawah 30 tahun', value: '46,9%', detail: 'Hampir separuh penduduk masih berusia muda.' },
  { label: 'Rasio ketergantungan', value: '45,05', detail: 'Setiap 100 penduduk usia produktif menanggung sekitar 45 penduduk nonproduktif.' },
];

// Largest provinces by population, 2024 (BPS). Only the seven the brief
// verifies are listed; the rest of the 38 provinces are summarised below.
export const PROVINSI = [
  { rank: 1, nama: 'Jawa Barat', penduduk: 50.35, pulau: 'Jawa' },
  { rank: 2, nama: 'Jawa Timur', penduduk: 41.81, pulau: 'Jawa' },
  { rank: 3, nama: 'Jawa Tengah', penduduk: 37.89, pulau: 'Jawa' },
  { rank: 4, nama: 'Sumatera Utara', penduduk: 15.59, pulau: 'Sumatera' },
  { rank: 5, nama: 'Banten', penduduk: 12.4, pulau: 'Jawa' },
  { rank: 6, nama: 'DKI Jakarta', penduduk: 10.6, pulau: 'Jawa' },
  { rank: 7, nama: 'Sulawesi Selatan', penduduk: 9.4, pulau: 'Sulawesi' },
];

export const WILAYAH = [
  { label: 'Provinsi', value: '38' },
  { label: 'Kabupaten / kota', value: '514' },
  { label: 'Pulau', value: '17.508' },
  { label: 'Luas daratan', value: '±1,9 jt km²' },
];

// Economy facts.
export const EKONOMI = {
  sektor: ['Industri pengolahan', 'Perdagangan', 'Pertanian', 'Pertambangan', 'Konstruksi'],
  eksporKomoditas: ['Batu bara', 'Minyak sawit (CPO)', 'Besi dan baja', 'Kendaraan', 'Alas kaki', 'Elektronik'],
  eksporTujuan: ['Tiongkok', 'Amerika Serikat', 'India'],
  perdagangan: [
    { label: 'Ekspor 2024', value: 'US$264,70 miliar', detail: 'Naik 2,29% dari 2023; nonmigas US$248,83 miliar.' },
    { label: 'Impor 2024', value: 'US$233,66 miliar', detail: 'Neraca perdagangan surplus sekitar US$31 miliar.' },
    { label: 'PDB 2025', value: 'Rp23.821,1 triliun', detail: 'Tumbuh 5,11% (yoy), naik dari Rp22.139,0 triliun pada 2024.' },
    { label: 'PDB per kapita 2025', value: 'Rp83,7 juta', detail: 'Setara US$5.083,4; pada 2024 Rp78,6 juta (US$4.960,3).' },
  ],
};

// Labour facts.
export const KETENAGAKERJAAN = [
  { label: 'Tingkat Pengangguran Terbuka (TPT)', value: '4,85%', detail: 'Agustus 2025; turun dari 4,91% pada Agustus 2024. November 2025: 4,74%.' },
  { label: 'Penduduk bekerja', value: '147,91 jt', detail: 'Jumlah penduduk yang bekerja pada November 2025.' },
  { label: 'Tingkat Partisipasi Angkatan Kerja (TPAK)', value: '70,95%', detail: 'Proporsi penduduk usia kerja yang aktif secara ekonomi.' },
];

// Poverty and human development facts.
export const KEMISKINAN_IPM = {
  kemiskinan: [
    { label: 'Penduduk miskin, Sep 2025', value: '8,25%', detail: '23,36 juta orang; garis kemiskinan Rp641.443 per kapita per bulan.' },
    { label: 'Penduduk miskin, Mar 2025', value: '8,47%', detail: '23,85 juta orang; garis kemiskinan Rp609.160 per kapita per bulan.' },
    { label: 'Penduduk miskin, Sep 2024', value: '8,57%', detail: '24,06 juta orang.' },
    { label: 'Gini ratio, Sep 2025', value: '0,363', detail: 'Turun dari 0,375 pada Maret 2025 — ketimpangan menyempit.' },
  ],
  ipm: [
    { label: 'Umur harapan hidup', value: '74,47 th', detail: 'Komponen kesehatan IPM 2025.' },
    { label: 'Harapan lama sekolah', value: '13,30 th', detail: 'Komponen pendidikan IPM 2025.' },
    { label: 'Rata-rata lama sekolah', value: '9,07 th', detail: 'Komponen pendidikan IPM 2025.' },
    { label: 'Pengeluaran riil per kapita', value: 'Rp12,8 jt/th', detail: 'Komponen standar hidup layak IPM 2025.' },
  ],
};

// Sources page: one row per figure group.
export const SUMBER = [
  { angka: 'Penduduk 2025 — 284,44 juta jiwa', sumber: 'BPS, rilis jumlah penduduk 2025; SP2010, SUPAS 2015, SP2020 untuk seri historis', tautan: 'bps.go.id' },
  { angka: 'PDB 2025 — Rp23.821,1 triliun, tumbuh 5,11%', sumber: 'BPS, Berita Resmi Statistik PDB 2025', tautan: 'bps.go.id' },
  { angka: 'PDB per kapita 2025 — Rp83,7 juta (US$5.083,4)', sumber: 'BPS, Berita Resmi Statistik PDB 2025', tautan: 'bps.go.id' },
  { angka: 'Inflasi 2025 — 2,92% (yoy)', sumber: 'BPS, Berita Resmi Statistik Inflasi 2025', tautan: 'bps.go.id' },
  { angka: 'TPT Agustus 2025 — 4,85%; TPAK 70,95%; bekerja 147,91 juta', sumber: 'BPS, Berita Resmi Statistik Ketenagakerjaan / Sakernas 2025', tautan: 'bps.go.id' },
  { angka: 'Kemiskinan September 2025 — 8,25% (23,36 juta orang)', sumber: 'BPS, Berita Resmi Statistik Kemiskinan September 2025', tautan: 'bps.go.id' },
  { angka: 'Gini ratio September 2025 — 0,363', sumber: 'BPS, Berita Resmi Statistik Kemiskinan September 2025', tautan: 'bps.go.id' },
  { angka: 'IPM 2025 — 75,90 (kategori Tinggi)', sumber: 'BPS, Berita Resmi Statistik IPM 2025', tautan: 'bps.go.id' },
  { angka: 'Ekspor 2024 — US$264,70 miliar; impor US$233,66 miliar', sumber: 'BPS, Berita Resmi Statistik Perdagangan Luar Negeri 2024', tautan: 'bps.go.id' },
  { angka: 'Provinsi terpadat 2024 — Jawa Barat 50,35 juta jiwa, dst.', sumber: 'BPS, tabel jumlah penduduk menurut provinsi 2024', tautan: 'bps.go.id' },
  { angka: 'Wilayah — 38 provinsi, 514 kabupaten/kota, 17.508 pulau', sumber: 'BPS, data wilayah administrasi Indonesia', tautan: 'bps.go.id' },
];

export function formatShare(pendudukJuta) {
  return ((pendudukJuta / 281.6) * 100).toFixed(1).replace('.', ',') + '%';
}
