# 06 — Roadmap & Jadwal (ADDIE)

Asumsi: dikerjakan 1 orang, ±10–15 jam/minggu, mulai **16 November 2026**. Sesuaikan dengan kalender
akademik dan jadwal sekolah uji coba.

## 1. Gambaran Fase

| Fase ADDIE | Minggu | Periode (perkiraan) | Keluaran |
|---|---|---|---|
| **A**nalysis | 0–1 | s.d. 22 Nov 2026 | Wawancara tambahan, analisis kurikulum, docs/01 final |
| **D**esign | 2–3 | 23 Nov – 6 Des 2026 | PRD final, desain pembelajaran, konten modul, wireframe, prototipe kertas diuji |
| **D**evelopment | 4–11 | 7 Des 2026 – 31 Jan 2027 | Aplikasi MVP, konten lengkap, validasi ahli + revisi |
| **I**mplementation | 12–14 | Feb 2027 | Uji coba kelompok kecil → uji lapangan |
| **E**valuation | 15–16 | Mar 2027 | Analisis data, laporan |

> Evaluasi **formatif** dilakukan di setiap fase (revisi berulang), evaluasi **sumatif** di akhir.

## 2. Rincian Development (Sprint 1 minggu)

| Sprint | Fokus | Tugas | Selesai jika |
|---|---|---|---|
| S1 | Fondasi | Inisialisasi Vite+React+TS, Tailwind, routing, layout, design tokens, ESLint, Vitest, CI | App kosong ter-deploy ke GitHub Pages |
| S2 | Logika matematika | `fraction`, `parse`, `line`, `slope`, `equivalence` + unit test ≥ 90% | Semua test lulus |
| S3 | Konten & skema | Skema Zod, loader, `validate:content`, konten M1–M2 | M1–M2 tervalidasi |
| S4 | Grafik | `CartesianPlane` (grid, sumbu, titik, garis, zoom), Lab Garis + slider + tabel sinkron | US01, US11 |
| S5 | Pelajaran & contoh | LessonPlayer, MathText, glosarium, WorkedExample | US04, US06 |
| S6 | Latihan | Tipe soal (MC, numeric, stepwise, plot-point), HintPanel, umpan balik diagnostik | US02, US03, US05 |
| S7 | Data & rekap | Dexie, progress, mental effort, rekap, layar Status Penelitian, ekspor JSON/CSV | US10 |
| S8 | PWA, Android, konten | Offline, manifest, Capacitor APK, konten M3–M6, Bedah Soal Cerita | APK terpasang di HP uji, offline OK |
| — | Validasi ahli | Kirim ke ahli materi & media (paralel dengan S7–S8) | Skor & saran diterima |
| S9 (buffer) | Revisi | Perbaikan berdasarkan validasi ahli & bug | Kriteria rilis terpenuhi |

## 3. Milestone

| ID | Milestone | Target |
|---|---|---|
| MS1 | Dokumen perencanaan disetujui dosen pembimbing | 6 Des 2026 |
| MS2 | Prototipe Lab Garis bisa dicoba | Akhir S4 |
| MS3 | MVP lengkap M1–M2 end-to-end | Akhir S6 |
| MS4 | Versi validasi (semua modul) | Akhir S8 |
| MS5 | Versi uji coba (setelah revisi ahli) | Awal Feb 2027 |
| MS6 | Laporan evaluasi | Mar 2027 |

## 4. Checklist Rilis Uji Coba

- [ ] Semua modul M1–M6 tersedia; soal grup `research-posttest` tidak ada di build aplikasi
- [ ] Lembar pretest (BS-1–BS-4) & posttest (PT-1–PT-4) dicetak; PT sudah divalidasi kesetaraannya
- [ ] `validate:content` lulus, kunci jawaban sudah dicek ahli materi
- [ ] Skor validasi ahli materi & media ≥ 3,4/4 (atau revisi telah dilakukan)
- [ ] Diuji di minimal 3 HP Android berbeda (termasuk RAM 2 GB) dan 2 browser desktop
- [ ] Mode offline teruji (mode pesawat)
- [ ] Ekspor data teruji dan terbaca di Excel/SPSS
- [ ] Surat izin sekolah & persetujuan orang tua/wali tersedia (docs/09)
- [ ] Panduan singkat penggunaan untuk siswa dan guru (1 halaman)

## 5. Backlog Prioritas (MoSCoW)

- **Must**: F1, F2, F3, F4, F5, F9, F10, F11, offline, Android APK
- **Should**: F6 Bedah Soal Cerita, F7 Video, F8 Jelaskan Caramu
- **Could**: F14 Lencana non-kompetitif, mode proyektor khusus, suara narasi
- **Won't (v1)**: dasbor guru, login, sinkronisasi cloud, leaderboard, AI chatbot
