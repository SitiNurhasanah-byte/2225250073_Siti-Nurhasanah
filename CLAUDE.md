# CLAUDE.md

Panduan untuk Claude Code (dan AI coding assistant lain) saat bekerja di repositori ini.
Baca file ini sebelum menulis kode apa pun.

## Konteks Proyek

**GarisKu** adalah aplikasi belajar *Persamaan Garis Lurus* untuk siswa SMP (kelas VIII–IX),
dijalankan sebagai **PWA di web** dan **APK Android via Capacitor**. Aplikasi dirancang berdasarkan
**Cognitive Load Theory** dan hasil wawancara siswa (lihat `docs/01-analisis-kebutuhan.md`).
Pengembang adalah mahasiswa S1 Pendidikan Matematika; ini proyek pendidikan/skripsi, bukan produk komersial.

Dokumen acuan (baca sesuai kebutuhan, jangan menebak):
- Kebutuhan & cakupan fitur → `PRD.md`
- Prinsip pedagogis → `docs/02-desain-pembelajaran.md`
- Isi materi, soal, dan pola miskonsepsi → `docs/03-konten-materi.md`
- Warna, tipografi, komponen → `docs/04-desain-ui-ux.md`
- Arsitektur, struktur folder, model data → `docs/05-arsitektur-teknis.md`
- Strategi pengujian → `docs/08-pengujian.md`

## Tech Stack

- **React 18 + TypeScript (strict) + Vite**
- **Tailwind CSS** untuk styling (token warna di `tailwind.config.ts`, jangan hardcode hex di komponen)
- **KaTeX** (`react-katex` atau render manual) untuk notasi matematika
- **SVG kustom** untuk bidang Cartesius (komponen `CartesianPlane`) — jangan menambah library grafik berat
- **Zustand** untuk state; **Dexie (IndexedDB)** untuk penyimpanan lokal
- **vite-plugin-pwa** untuk offline; **Capacitor** untuk build Android
- **Vitest + Testing Library** untuk unit/komponen; **Playwright** untuk E2E

## Perintah

```bash
npm install            # pasang dependensi
npm run dev            # server pengembangan (http://localhost:5173)
npm run build          # build produksi ke dist/
npm run preview        # pratinjau build
npm run test           # unit test (Vitest)
npm run test:e2e       # E2E (Playwright)
npm run lint           # ESLint + cek tipe (tsc --noEmit)
npm run validate:content  # validasi skema semua file konten JSON
npx cap sync android   # salin build web ke proyek Android
npx cap open android   # buka di Android Studio untuk build APK
```

## Struktur Folder (ringkas)

```
src/
  app/            # routing, layout, provider
  features/       # per fitur: lesson/, lab/, practice/, worked-example/, progress/, test/, settings/
  components/     # komponen UI umum (Button, Card, HintPanel, MathText, CartesianPlane)
  lib/math/       # LOGIKA MATEMATIKA MURNI (tanpa React) — gradien, persamaan, pemeriksa jawaban
  lib/feedback/   # pencocokan miskonsepsi → pesan umpan balik
  lib/db/         # Dexie: skema & repository
  store/          # Zustand store
content/          # materi & soal dalam JSON (sumber kebenaran konten)
tests/            # E2E
```

## Aturan Kode

1. **Logika matematika dipisah dari UI.** Semua perhitungan (gradien, substitusi, pemeriksaan
   ekuivalensi persamaan) ada di `src/lib/math/` sebagai fungsi murni dan **wajib punya unit test**.
2. **Gunakan pecahan eksak, bukan float**, untuk gradien dan hasil hitung (`Fraction` di `lib/math/fraction.ts`).
   Contoh: gradien `1/3` tidak boleh ditampilkan `0.3333`.
3. **Konten tidak ditulis di komponen.** Teks pelajaran, soal, petunjuk, dan umpan balik berasal dari
   `content/*.json` yang lolos validasi skema (Zod). Jika menambah soal, tambahkan ke JSON.
   **Soal posttest penelitian (grup `research-posttest`, PT-1 s.d. PT-4) tidak boleh dibundel atau
   ditampilkan di aplikasi.** Lihat `docs/10-bank-soal.md`.
4. TypeScript strict; hindari `any`. Nama variabel/fungsi dalam bahasa Inggris; **teks yang dilihat
   pengguna dalam Bahasa Indonesia**.
5. Komponen kecil (< 200 baris), satu tanggung jawab. Gunakan function component + hooks.
6. Input angka mengikuti format Indonesia: **titik = pemisah ribuan** (`17.000`), **koma = desimal** (`0,5`);
   juga menerima awalan `Rp`, pecahan `a/b`, dan tanda minus `−`/`-`. Aturan lengkap ada di `docs/05` §4.
   Soal bank memakai nilai rupiah, jadi `1.000` harus dibaca seribu.
7. Jangan menambah dependensi baru tanpa alasan kuat; pertimbangkan ukuran bundel (NFR02 < 400 KB gzip).
8. Semua fitur harus berfungsi **offline**. Jangan memanggil API eksternal pada alur belajar inti.

## Aturan Pedagogis (WAJIB dipatuhi saat membuat UI/konten)

Aturan ini berasal dari temuan wawancara. Melanggarnya berarti menambah beban kognitif ekstrinsik.

| Aturan | Alasan (kode temuan) |
|---|---|
| Satu konsep / satu langkah per layar atau kartu; maks. 3 kalimat per blok teks | EL01, DS03 |
| **Tidak ada** auto-advance, timer hitung mundur, atau animasi yang berjalan sendiri lebih dari 1 detik | EL04 |
| Contoh soal **selalu** sebelum latihan untuk konsep baru | GL01, DS01 |
| Grafik, persamaan, dan tabel nilai yang saling terkait **ditampilkan berdekatan** dan ter-*highlight* bersama (jangan pisah halaman) | EL02, IL02 (split-attention) |
| Petunjuk bertingkat (3 level); kunci jawaban tidak langsung diberikan | DS01, GL02 |
| Umpan balik salah harus spesifik (sebut langkah yang keliru), ramah, tanpa kata "bodoh"/"gagal" | IL03 |
| Palet: latar netral + 1 warna aksen; hijau/merah hanya untuk status benar/salah dan **selalu disertai ikon + teks** | DS03, aksesibilitas |
| Jangan menambahkan leaderboard, ranking, atau elemen kompetitif | menambah EL & kecemasan |
| Bahasa sederhana untuk anak 13–15 tahun; istilah teknis diberi glosarium pop-up | EL01 |

## Privasi

- Jangan pernah mengumpulkan nama lengkap, email, foto, lokasi, atau nomor HP siswa.
- Identitas hanya **kode siswa** (mis. `S01`) yang diisi manual.
- Tidak ada analitik pihak ketiga (Google Analytics, dsb.). Data hanya keluar melalui ekspor manual.

## Definisi Selesai (Definition of Done)

Sebuah tugas dianggap selesai jika:
- [ ] `npm run lint` dan `npm run test` lulus
- [ ] Fungsi baru di `lib/math` atau `lib/feedback` memiliki unit test
- [ ] Tampilan dicek pada lebar 360 px dan 1280 px
- [ ] Bekerja dalam mode offline (DevTools → Network → Offline)
- [ ] Mematuhi tabel Aturan Pedagogis di atas
- [ ] Teks pengguna dalam Bahasa Indonesia dan sudah dicek ejaannya

## Git

- Pesan commit Bahasa Indonesia, format: `jenis: deskripsi` (jenis: `feat`, `fix`, `konten`, `docs`, `test`, `refactor`, `style`).
- Satu commit untuk satu perubahan logis. Jangan commit file `.env`, `node_modules/`, `dist/`, `android/app/build/`.
