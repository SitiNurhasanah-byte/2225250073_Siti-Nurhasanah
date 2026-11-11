# GarisKu — Aplikasi Belajar Persamaan Garis Lurus untuk Siswa SMP

> Aplikasi web + Android (PWA → APK via Capacitor) untuk membantu siswa SMP memahami
> **Persamaan Garis Lurus** dengan desain yang **mengelola beban kognitif** (Cognitive Load Theory).
> Dikembangkan dengan model **ADDIE**.

**Pengembang:** Siti Nurhasanah (2225250073) — S1 Pendidikan Matematika
**Status:** Tahap *Development* — versi MVP 0.1.0 (6 modul, 10 soal, Lab Garis, menu peneliti) sudah bisa dijalankan.

> "GarisKu" adalah nama kerja; silakan diganti.

---

## Menjalankan Aplikasi

Prasyarat: **Node.js 20+** (sudah terpasang: v26). Jalankan perintah dari folder ini.

```bash
npm install          # sekali saja, memasang paket
npm run dev          # mode pengembangan → buka http://localhost:5173
npm run dev:hp       # sama, tapi bisa dibuka dari HP Android di Wi-Fi yang sama
                     # (buka alamat "Network: http://192.168.x.x:5173" yang muncul di terminal)
npm run test         # 59 unit test (matematika, umpan balik, validasi konten)
npm run build        # build produksi ke folder dist/
npm run preview      # mencoba hasil build → http://localhost:4173
```

### Alamat web

**https://sitinurhasanah-byte.github.io/2225250073_Siti-Nurhasanah/**

Setiap `git push` ke branch `main` otomatis menjalankan tes, membangun, dan memperbarui alamat di atas
(lihat tab **Actions** di GitHub). Di HP Android: buka alamat itu di Chrome → menu ⋮ → **Instal aplikasi**.

### Satu kode untuk semua perangkat

| Platform | Cara memakai | Yang dibutuhkan |
|---|---|---|
| **Web (semua OS)** | Unggah isi `dist/` ke hosting statis (GitHub Pages, Netlify, Vercel), lalu buka alamatnya di browser | Hosting gratis |
| **Windows / macOS / Linux / ChromeOS** | Buka alamat web di Chrome/Edge → ikon **Instal** di bilah alamat. Aplikasi muncul di menu Start/Dock dan berjalan offline | Browser Chrome/Edge |
| **Android** (cara cepat) | Buka alamat web di Chrome → menu ⋮ → **Instal aplikasi / Tambahkan ke layar utama** | — |
| **Android** (APK / Play Store) | `npx cap add android` (sekali) → `npm run cap:sync` → `npx cap open android` → di Android Studio: *Build → Generate Signed APK* | Android Studio |
| **iPhone / iPad** (cara cepat) | Buka alamat web di Safari → tombol **Bagikan** → **Tambah ke Layar Utama** | — |
| **iPhone / iPad** (App Store) | Di komputer **Mac**: `npx cap add ios` → `npm run build && npx cap sync ios` → `npx cap open ios` → build di Xcode | Mac + Xcode + akun Apple Developer |

Setelah dibuka sekali, seluruh materi dan latihan **bisa dipakai tanpa internet** (Service Worker).
Data belajar tersimpan hanya di perangkat; peneliti mengambilnya lewat **Pengaturan → Ekspor JSON/CSV**.

### Struktur kode singkat

```
content/        materi (modules/), soal (bank/), glosarium, miskonsepsi, rubrik penelitian
src/lib/        logika murni + unit test: math/, feedback/, content/, progress/, export/
src/components/ CartesianPlane, MathText (KaTeX), Gari (maskot), Banana, HintPanel, Feedback
src/features/   home, lesson, worked-example, practice, lab, progress, settings, research
```

Menambah/mengubah soal cukup lewat file JSON di `content/bank/`; jalankan `npm run validate:content`
untuk memastikan kunci jawabannya benar.

--- 

## Peta Dokumen Perencanaan

| No | File | Isi | Tahap ADDIE |
|----|------|-----|-------------|
| 1 | [PRD.md](PRD.md) | Product Requirements Document: masalah, tujuan, persona, fitur, kebutuhan fungsional & non-fungsional, kriteria sukses | Analysis → Design |
| 2 | [CLAUDE.md](CLAUDE.md) | Panduan untuk AI coding assistant (Claude Code): konteks proyek, aturan kode, aturan pedagogis | Development |
| 3 | [docs/01-analisis-kebutuhan.md](docs/01-analisis-kebutuhan.md) | Sintesis hasil wawancara → temuan IL/EL/GL → implikasi desain | Analysis |
| 4 | [docs/02-desain-pembelajaran.md](docs/02-desain-pembelajaran.md) | Tujuan pembelajaran, alur belajar, prinsip CLT yang diterapkan | Design |
| 5 | [docs/03-konten-materi.md](docs/03-konten-materi.md) | Struktur materi, contoh soal, bank soal, format data konten | Design |
| 6 | [docs/04-desain-ui-ux.md](docs/04-desain-ui-ux.md) | Design system, warna, tipografi, wireframe tiap layar | Design |
| 7 | [docs/05-arsitektur-teknis.md](docs/05-arsitektur-teknis.md) | Tech stack, struktur folder, model data, build web & Android | Development |
| 8 | [docs/06-roadmap.md](docs/06-roadmap.md) | Jadwal, milestone, sprint, checklist rilis | Semua |
| 9 | [docs/07-rencana-evaluasi.md](docs/07-rencana-evaluasi.md) | Validasi ahli, uji kepraktisan, uji efektivitas, instrumen beban kognitif | Implementation → Evaluation |
| 10 | [docs/08-pengujian.md](docs/08-pengujian.md) | Strategi testing perangkat lunak & kasus uji | Development |
| 11 | [docs/09-risiko-dan-etika.md](docs/09-risiko-dan-etika.md) | Risiko proyek, privasi data anak, etika penelitian | Semua |
| 12 | [docs/10-bank-soal.md](docs/10-bank-soal.md) | Bank soal: kelompok pembelajaran (BS, LT) dan penelitian (pretest BS, posttest PT), kisi-kisi Mathematical Literacy, rubrik | Design → Evaluation |

## Urutan Membaca yang Disarankan

1. `docs/01-analisis-kebutuhan.md` — *mengapa* aplikasi ini dibuat
2. `PRD.md` — *apa* yang dibuat
3. `docs/02` s.d. `docs/04` — *bagaimana* pembelajarannya dirancang
4. `docs/05`, `CLAUDE.md` — *bagaimana* aplikasinya dibangun
5. `docs/06` s.d. `docs/09` — *kapan* dan *bagaimana menilainya*

## Ringkasan Satu Paragraf

Wawancara dengan siswa kelas IX (S01) menunjukkan kesulitan utama pada **menentukan titik koordinat**,
**operasi hitung saat substitusi**, **menentukan gradien/persamaan garis**, dan **soal cerita**
(beban intrinsik tinggi), diperparah oleh **penjelasan guru yang terlalu cepat** dan **penjelasan
panjang-rumit** (beban ekstrinsik). Siswa terbantu oleh **grafik/visualisasi**, **contoh soal sebelum
latihan**, **petunjuk bertahap**, dan **video tutorial**, serta menginginkan **tampilan sederhana
tanpa warna mencolok**. GarisKu menjawab itu dengan: contoh soal bertahap (*worked example*) →
latihan dengan petunjuk yang memudar (*fading*), grafik interaktif yang terhubung langsung dengan
persamaan, kecepatan belajar dikendalikan siswa, dan tampilan minimalis.
