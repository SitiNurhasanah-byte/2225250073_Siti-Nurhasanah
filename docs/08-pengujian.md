# 08 — Strategi Pengujian Perangkat Lunak

## 1. Piramida Pengujian

| Lapisan | Alat | Cakupan | Target |
|---|---|---|---|
| Unit | Vitest | `lib/math`, `lib/feedback`, `lib/content` | ≥ 90% baris |
| Komponen | Vitest + Testing Library | Keypad, HintPanel, CartesianPlane, tipe soal | Perilaku utama |
| Konten | Skrip `validate:content` | Skema JSON + kebenaran kunci | 100% butir |
| E2E | Playwright (viewport 360 px & 1280 px) | Alur utama | 5 skenario |
| Manual | HP Android nyata | Offline, kinerja, tombol back, ekspor | Checklist rilis |

## 2. Kasus Uji Unit Penting (`lib/math`)

| ID | Fungsi | Input | Harapan |
|---|---|---|---|
| UT01 | `evaluate` | m=2, c=−1, x=5 | 9 (Bank Soal 3c) |
| UT02 | `evaluate` | m=2000, c=5000, x=6 dan m=3000, c=1000, x=6 | 17000 dan 19000 (Bank Soal 1) |
| UT03 | `slopeFromTwoPoints` | (2,3), (4,7) | 2 (Bank Soal 3a) |
| UT03b | `lineFromTwoPoints` | (2,3), (4,7) | y = 2x − 1 (Bank Soal 3b) |
| UT03c | `lineFromTwoPoints` | (2,5000), (5,8000) | y = 1000x + 3000; evaluate x=8 → 11000 (Bank Soal 2) |
| UT03d | `solveForX` | m=5000, c=20000, y=60000 | 8 (Bank Soal 4) |
| UT03e | `intersect` | y=2000x+5000 dan y=3000x+1000 | (4, 13000) |
| UT04 | `slopeFromTwoPoints` | (0,0), (3,1) | 1/3 (pecahan, bukan 0.333) |
| UT05 | `slopeFromTwoPoints` | (2,1), (2,5) | tak terdefinisi (garis vertikal) |
| UT06 | `slopeFromGeneralForm` | 2x + 4y − 8 = 0 | −1/2 |
| UT07 | `parseNumber` | "0,5", "1/2", "−3", " 7 " | 1/2, 1/2, −3, 7 |
| UT07b | `parseNumber` | "17.000", "Rp17.000", "17000", "1.000", "1.250.000", "0.5" | 17000, 17000, 17000, 1000, 1250000, 1/2 |
| UT08 | `parseNumber` | "abc", "" , "1/0" | error/null |
| UT09 | `areEquivalentLines` | "y=2x+1" vs "2x-y+1=0" | true |
| UT10 | `areEquivalentLines` | "y=2x+1" vs "4x-2y+2=0" | true |
| UT11 | `areEquivalentLines` | "y=2x+1" vs "y=2x-1" | false |
| UT12 | `lineFromPointSlope` | (2,−3), m=4 | y = 4x − 11 |
| UT13 | `lineFromTwoPoints` | (1,2), (3,6) | y = 2x |
| UT14 | `isPerpendicular` | 2 dan −1/2 | true |
| UT15 | `isParallel` | 3 dan 3 | true |

## 3. Kasus Uji Umpan Balik (`lib/feedback/diagnose`)

| ID | Soal | Jawaban siswa | Kode diharapkan |
|---|---|---|---|
| FB01 | Soal 3 T5: y=2x−1, x=5 | 10 | M-OP-02 (lupa −1) |
| FB02 | Soal 3 T5: y=2x−1, x=5 | 8 | M-OP-01 (2×(5−1)) |
| FB03 | Soal 3 T2: m dari (2,3),(4,7) | 1/2 | M-GRAD-01 |
| FB04 | Soal 3 T3: 3 = 2(2) + c | 7 | M-ALJ-01 |
| FB05 | Soal 2 T3: c | 5000 | M-MODEL-02 |
| FB06 | Soal 2 T2: m | 2500 | M-GRAD-06 |
| FB07 | Soal 4 T4: x | 12 | M-INTERP-01 |
| FB08 | Soal 1 T5: pilihan paket | B | M-KEP-01 |
| FB09 | Soal 1 T3: biaya Paket A | 12000 | M-OP-02 |
| FB10 | Plot (3,1) | (1,3) | M-KOOR-01 |

## 4. Skenario E2E

| ID | Skenario |
|---|---|
| E2E01 | Pengguna baru mengisi kode S01 → masuk Beranda; tidak ada satu pun butir PT-* yang dapat dibuka |
| E2E02 | Membuka M2 → menyelesaikan kartu → contoh → latihan dengan 1 jawaban salah + petunjuk → rekap |
| E2E03 | Lab Garis: ubah m ke −1 → persamaan & tabel ikut berubah |
| E2E04 | Tutup dan buka ulang → "Lanjutkan" membuka kartu terakhir |
| E2E05 | Mode offline (Playwright `context.setOffline(true)`) → semua modul tetap bisa dibuka |

## 5. Pengujian Perangkat

| Perangkat | Spesifikasi | Status |
|---|---|---|
| HP Android A | Android 8–10, RAM 2 GB | ☐ |
| HP Android B | Android 12+, RAM 4 GB | ☐ |
| HP Android C | Tablet / layar besar | ☐ |
| Laptop Chrome | 1366×768 | ☐ |
| Laptop Firefox | 1920×1080 / proyektor | ☐ |

Periksa: waktu buka < 3 detik, scroll & slider lancar, keypad tidak tertutup, tombol back Android, ekspor/bagikan file.

## 6. Uji Aksesibilitas

- Lighthouse (Accessibility ≥ 90, PWA lulus, Performance ≥ 80 di mode mobile).
- Cek kontras dengan axe DevTools.
- Uji dengan ukuran huruf "besar".
