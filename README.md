# Statistik Indonesia — Portal Data Nasional

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/jinan86/best-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/jinan86/best-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Portal statistik nasional Indonesia yang berjalan sepenuhnya luring dari
file statis: penduduk, ekonomi, ketenagakerjaan, kemiskinan, IPM, dan
provinsi — semua angka resmi **Badan Pusat Statistik (BPS) 2025**, dengan
sumber tiap angka tercantum di halaman Sumber Data.

Dibuat untuk kompetisi make.fun
[“Make the best national statistics site”](https://make.fun/c/best-national-statistics-site-20261126-0539).

## Isi situs

- **Beranda** — delapan kartu angka utama 2025, grafik pertumbuhan PDB dan
  penduduk, serta jalan pintas ke semua halaman.
- **Demografi** — penduduk 284,44 juta jiwa, seri 2010–2025, dan fakta
  penyebaran penduduk.
- **Ekonomi** — grafik pertumbuhan PDB dan inflasi yang bisa diganti serinya
  (tombol seri + jenis grafik garis/batang), perdagangan luar negeri,
  sektor dan komoditas ekspor utama.
- **Ketenagakerjaan** — TPT 4,85% (Agu 2025), TPAK 70,95%, 147,91 juta
  pekerja.
- **Kemiskinan & IPM** — grafik kemiskinan dan IPM yang bisa diganti serinya,
  komponen IPM 2025, dan Gini ratio 0,363.
- **Provinsi** — tabel tujuh provinsi terpadat (BPS 2024) yang bisa dicari
  dan diurutkan berdasarkan nama atau jumlah penduduk.
- **Sumber Data** — rilis BPS di balik setiap angka.

## Menjalankan

```sh
node serve.ts        # http://localhost:8080
```

Situs ini statis dan luring: tanpa CDN, tanpa font eksternal, tanpa
`fetch`, tanpa `eval`, tanpa service worker, tanpa cookie. Semua grafik
adalah SVG murni yang dibuat dari data lokal di `app/data.js`.

## Struktur

```
main.ts            # program penyerahan (Node 22, stdlib only)
serve.ts           # server statis untuk pengembangan
app/
  index.html       # kerangka halaman + navigasi
  style.css        # desain original
  main.js          # router hash + pengendali kontrol
  views.js         # perender tiap halaman
  charts.js        # grafik garis/batang SVG murni
  data.js          # angka BPS 2025 + seri grafik
screenshots/        # tangkapan layar situs yang sedang berjalan
vendor/
  makefun-frontend.ts   # pustaka make.fun dari kit (tidak diubah)
```

## Lisensi

MIT — lihat `LICENSE`.
