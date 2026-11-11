# 03 — Konten Materi, Bank Soal & Miskonsepsi

## 1. Struktur Modul

| Modul | Judul | Kartu konsep (ringkas) | TP | Soal bank |
|---|---|---|---|---|
| **M1** | Titik di Bidang Cartesius | sumbu-x & sumbu-y; titik (x, y): absis dulu, ordinat kemudian; 4 kuadran; titik pada sumbu | TP1 | — |
| **M2** | Dari Persamaan ke Grafik | apa itu persamaan garis; substitusi x → y; tabel nilai; plot ≥ 2 titik; hubungkan jadi garis | TP2, TP3 | — |
| **M3** | Makna Gradien & Konstanta | gradien = kemiringan; "naik/maju"; m positif/negatif/nol; c = titik potong sumbu-y (0, c) | TP4 | — |
| **M4** | Menghitung Gradien | dari `y = mx + c`; dari `ax + by + c = 0` (m = −a/b); dari dua titik `(y₂−y₁)/(x₂−x₁)`; dari grafik | TP5 | Soal 3 (a) |
| **M5** | Menentukan Persamaan Garis | `y = mx + c` dari dua titik (cari m, lalu c); `y − y₁ = m(x − x₁)`; garis sejajar & tegak lurus | TP6, TP7 | Soal 3, Soal 2 |
| **M6** | Soal Cerita Garis Lurus | membedah soal; menyusun model; menafsirkan m (laju) & c (nilai awal); membandingkan dua model; menilai pernyataan | TP8 | Soal 1, 2, 4 |

Glosarium (pre-training): **absis, ordinat, koordinat, kuadran, sumbu, persamaan, variabel, konstanta,
koefisien, gradien/kemiringan, titik potong, sejajar, tegak lurus, model matematika**.

> Catatan: M1–M3 belum memiliki soal dari bank soal. Soal untuk modul ini perlu disusun dengan format
> yang sama (indikator, soal, kisi-kisi per tahap, skor).

## 2. Contoh Kartu Konsep (M3, dari soal pemicu wawancara)

> **Kartu 1 — Apa arti angka 2?**
> Pada `y = 2x + 1`, angka **2** adalah **gradien**.
> Artinya: setiap x bertambah 1, y bertambah 2.
> *[Grafik: segitiga kecil "maju 1, naik 2" di antara (0,1) dan (1,3)]*

> **Kartu 2 — Apa arti angka 1?**
> Angka **1** adalah **konstanta**.
> Garis memotong sumbu-y di titik **(0, 1)**.
> *[Grafik: titik (0,1) di-highlight]*

## 3. Bank Soal

Bank soal lengkap (soal, kisi-kisi per tahap, skor) ada di **[docs/10-bank-soal.md](10-bank-soal.md)**.
Bank soal dipakai untuk dua kelompok:

| Kelompok | Penggunaan | Butir |
|---|---|---|
| **A. Pembelajaran** | Contoh soal & latihan di aplikasi | BS-1 s.d. BS-4 (M4–M6) + LT-M1-1 s.d. LT-M3-2 (M1–M3, DRAF) |
| **B. Penelitian** | Instrumen Mathematical Literacy | Pretest: BS-1 s.d. BS-4 · Posttest: PT-1 s.d. PT-4 (paralel, DRAF) |

Pada dokumen ini, **"Soal 1–4" = BS-1 s.d. BS-4**.

| Kode | Judul | Indikator (proses) | Modul | TP |
|---|---|---|---|---|
| BS-1 | Pilihan Paket Sewa Sepeda | Mathematical Reasoning | M6 | TP2, TP8 |
| BS-2 | Biaya Fotokopi | Formulating Situations Mathematically | M5, M6 | TP5, TP6, TP8 |
| BS-3 | Menentukan Persamaan Garis pada Peta | Employing Concepts, Facts, and Procedures | M4, M5 | TP2, TP5, TP6 |
| BS-4 | Tabungan untuk Membeli Buku | Interpreting, Applying, and Evaluating Outcomes | M6 | TP2, TP8 |

> Peluang visualisasi BS-1 di Lab Garis: kedua garis berpotongan di x = 4 (biaya sama, Rp13.000).
> Untuk x < 4 Paket B lebih murah, untuk x > 4 Paket A lebih murah. Cocok untuk prompt
> "Jelaskan Caramu" (F8): *"Apakah Paket A selalu lebih murah?"*

> **Saran bahasa:** soal memakai kata "Anda". Untuk siswa SMP 13–15 tahun, pertimbangkan "kamu".

## 4. Penyajian Soal Bank di Aplikasi

### Sebagai contoh soal bertahap (worked example) — contoh: Soal 3

| Langkah (layar) | Tampilan | Alasan (1 kalimat) |
|---|---|---|
| 1 | **Diketahui:** A(2, 3), B(4, 7). **Ditanya:** m, persamaan, y saat x = 5. Titik A dan B menyala di grafik. | Tulis dulu apa yang diketahui dan ditanya. |
| 2 | `m = (7 − 3)/(4 − 2) = 4/2 = 2`, dengan segitiga "maju 2, naik 4" di grafik | Gradien = perubahan y ÷ perubahan x. |
| 3 | `3 = 2(2) + c` → `3 = 4 + c` → `c = −1` | Masukkan salah satu titik untuk mencari c. |
| 4 | `y = 2x − 1`, garis tergambar melalui A dan B | Gabungkan m dan c. |
| 5 | `y = 2(5) − 1 = 10 − 1 = 9`, titik (5, 9) menyala | Kalikan dulu, baru kurangi. |
| 6 | Kesimpulan: m = 2, `y = 2x − 1`, y(5) = 9 | Jawab semua yang ditanya. |

### Sebagai latihan dengan fading — contoh: Soal 2 setelah Soal 3

- **Fading level 1:** Tahap 1–3 sudah terisi, siswa mengisi Tahap 4–6.
- **Fading level 2:** hanya Tahap 1 terisi.
- **Fading level 3:** siswa mengerjakan semua tahap, petunjuk tetap tersedia.
- Label *"Konsep sama dengan Soal 3: dua titik → gradien → c → persamaan"* (prinsip variabilitas, IL04).

### Sebagai soal cerita (F6 Bedah Soal Cerita) — Soal 1, 2, 4

Siswa mengetuk bagian teks dan menandainya sebagai **Diketahui** atau **Ditanya**. Contoh Soal 4:
Diketahui → "tabungan awal Rp20.000" (c), "Rp5.000 setiap hari" (m), "Rp60.000" (target);
Ditanya → "apakah pernyataan benar", "berapa hari paling sedikit".

## 5. Format Data Konten (JSON)

Semua konten disimpan di `content/` dan divalidasi dengan Zod. Contoh Soal 3 (BS-3):

```json
{
  "id": "BS-3",
  "group": "learning",
  "module": "M5",
  "type": "stepwise",
  "title": "Menentukan Persamaan Garis pada Peta",
  "indicator": "employ",
  "objectives": ["TP2", "TP5", "TP6"],
  "maxScore": 6,
  "prompt": "Pada sebuah bidang koordinat Cartesius, terdapat dua titik yang dilalui sebuah jalan lurus, yaitu titik $A(2, 3)$ dan titik $B(4, 7)$. Tentukan: (a) gradien garis yang melalui kedua titik tersebut; (b) persamaan garisnya dalam bentuk $y = mx + c$; dan (c) nilai $y$ ketika $x = 5$.",
  "given": ["$A(2, 3)$", "$B(4, 7)$"],
  "asked": ["gradien", "persamaan garis", "nilai $y$ saat $x = 5$"],
  "graph": { "points": [[2, 3], [4, 7]], "line": { "m": "2", "c": "-1" } },
  "steps": [
    { "stage": 1, "score": 1, "label": "Informasi", "kind": "identify",
      "answer": { "given": ["A(2,3)", "B(4,7)"] } },
    { "stage": 2, "score": 1, "label": "Gradien", "kind": "number",
      "display": "$m = \\dfrac{7 - 3}{4 - 2} = [\\,?\\,]$", "answer": "2",
      "misconceptions": [{ "value": "1/2", "code": "M-GRAD-01" }] },
    { "stage": 3, "score": 1, "label": "Konstanta", "kind": "number",
      "display": "$3 = 2(2) + c \\Rightarrow c = [\\,?\\,]$", "answer": "-1",
      "misconceptions": [{ "value": "7", "code": "M-ALJ-01" }, { "value": "1", "code": "M-ALJ-01" }] },
    { "stage": 4, "score": 1, "label": "Persamaan", "kind": "equation",
      "answer": "y = 2x - 1" },
    { "stage": 5, "score": 1, "label": "Nilai y", "kind": "number",
      "display": "$y = 2(5) - 1 = [\\,?\\,]$", "answer": "9",
      "misconceptions": [{ "value": "8", "code": "M-OP-01" }, { "value": "10", "code": "M-OP-02" }] },
    { "stage": 6, "score": 1, "label": "Kesimpulan", "kind": "multiple-choice",
      "options": ["m = 2; y = 2x − 1; y = 9", "m = 1/2; y = ½x + 2; y = 4,5", "m = 2; y = 2x + 1; y = 11"],
      "answer": 0 }
  ],
  "hints": [
    "Gradien = (selisih y) ÷ (selisih x) dari dua titik.",
    "Hitung $(7 - 3) \\div (4 - 2)$ dulu, lalu masukkan titik A ke $y = mx + c$ untuk mencari $c$.",
    "Contoh mirip: titik (1, 2) dan (3, 6) → $m = 4 \\div 2 = 2$, lalu $2 = 2(1) + c$ → $c = 0$."
  ],
  "explanation": "$m = 2$, $c = -1$, jadi $y = 2x - 1$. Saat $x = 5$: $y = 10 - 1 = 9$.",
  "sameConceptAs": ["BS-2"]
}
```

Tipe soal (`type`): `multiple-choice`, `numeric`, `stepwise`, `plot-point`, `draw-line`,
`equation-input`, `order-steps`, `story-annotate`, `self-explain`.
Nilai `indicator`: `reason`, `formulate`, `employ`, `interpret`.
Nilai `group`: `learning` atau `research-posttest` (lihat §8).

### Format angka rupiah

Soal bank memakai angka ribuan (Rp17.000). Ikuti konvensi Indonesia: **titik = pemisah ribuan,
koma = desimal**. Input `17.000`, `17000`, dan `Rp17.000` semuanya dibaca 17000. Lihat aturan parser
di `docs/05-arsitektur-teknis.md`.

## 6. Kesalahan yang Diantisipasi per Soal

Dugaan berdasarkan temuan wawancara (IL03, IL04, EL05). **Perlu dikonfirmasi** saat uji coba.

| Soal/Tahap | Jawaban keliru yang mungkin | Kode |
|---|---|---|
| 1 / T2 | Paket A ditulis `y = 5.000x + 2.000` (biaya awal dan tarif tertukar) | M-MODEL-01 |
| 1 / T3 | `2.000 × 6 = 1.200` atau lupa menambah biaya awal (Rp12.000) | M-OP-02, M-OP-05 |
| 1 / T5 | Memilih Paket B karena "biaya awalnya lebih murah" tanpa menghitung | M-KEP-01 |
| 2 / T2 | `m = 5.000 / 2 = 2.500` atau `m = 8.000 / 5 = 1.600` (membagi satu titik saja) | M-GRAD-06 |
| 2 / T3 | `c = 5.000` (mengambil biaya 2 lembar sebagai biaya tetap) | M-MODEL-02 |
| 3 / T2 | `m = (4 − 2)/(7 − 3) = 1/2` | M-GRAD-01 |
| 3 / T3 | `c = 7` atau `c = 1` (salah memindahkan ruas) | M-ALJ-01 |
| 3 / T5 | `y = 2(5 − 1) = 8` | M-OP-01 |
| 4 / T2 | `5.000 × 7 = 35.000` saja, tabungan awal tidak ditambahkan | M-OP-02 |
| 4 / T4 | `x = 60.000 / 5.000 = 12` (mengabaikan tabungan awal) | M-INTERP-01 |
| 4 / T5 | Menyetujui pernyataan teman tanpa memeriksa | M-INTERP-02 |

## 7. Katalog Miskonsepsi (untuk umpan balik diagnostik)

| Kode | Miskonsepsi | Pesan umpan balik |
|---|---|---|
| M-KOOR-01 | Menukar x dan y saat plot | "Ingat: angka pertama untuk arah kanan/kiri (x), angka kedua untuk atas/bawah (y)." |
| M-KOOR-02 | Salah tanda pada kuadran | "x bernilai negatif, jadi geser ke **kiri** dari titik 0." |
| M-OP-01 | Menjumlah/mengurang sebelum mengali (`2(5 − 1) = 8`) | "Kalikan dulu 2 × 5, baru kurangi 1." |
| M-OP-02 | Lupa menambah/mengurangi konstanta (`2 × 5 = 10`) | "Masih ada '− 1' (atau '+ c') yang belum dihitung." (IL03) |
| M-OP-03 | `2x` dibaca `2 + x` | "2x artinya 2 **dikali** x." |
| M-OP-04 | Salah tanda bilangan negatif | "2 × (−1) = −2. Lalu −2 + 1 = −1." |
| M-OP-05 | Salah jumlah nol pada ribuan (`2.000 × 6 = 1.200`) | "2 ribu × 6 = 12 ribu. Hitung 2 × 6 dulu, lalu tambahkan tiga nol." |
| M-GRAD-01 | Gradien dihitung Δx/Δy (terbalik) | "Gradien = perubahan y ÷ perubahan x (naik ÷ maju)." |
| M-GRAD-02 | Mengira konstanta adalah gradien | "Gradien adalah angka yang menempel pada x." |
| M-GRAD-03 | Bentuk ax + by + c = 0: m = a (lupa −a/b) | "Ubah dulu ke bentuk y = …, atau pakai m = −a/b." |
| M-GRAD-04 | Urutan titik tidak konsisten | "Kurangi dengan urutan yang sama: titik 2 − titik 1, di atas dan di bawah." |
| M-GRAD-05 | Gradien negatif = garis naik | "Gradien negatif: garis **turun** dari kiri ke kanan." |
| M-GRAD-06 | Gradien = y ÷ x dari satu titik | "Gradien butuh **dua** titik: selisih y dibagi selisih x." |
| M-ALJ-01 | Salah memindahkan ruas saat mencari c | "3 = 4 + c. Bilangan berapa yang ditambah 4 hasilnya 3? Kurangi kedua ruas dengan 4." |
| M-GRAF-01 | Garis tidak melalui (0, c) | "Cek titik potong sumbu-y: saat x = 0, y = c." |
| M-GRAF-02 | Titik tidak dihubungkan / dihubungkan zig-zag | "Semua titik segaris; hubungkan dengan satu garis lurus." |
| M-PERS-01 | `y − y₁ = m(x − x₁)` tanda keliru | "y₁ = −3, jadi y − (−3) = y + 3." |
| M-PERS-02 | Sejajar dianggap m₁ × m₂ = −1 | "Sejajar: gradien **sama**. Tegak lurus: hasil kali −1." |
| M-MODEL-01 | Nilai awal (c) dan laju (m) tertukar | "Yang dikali x adalah yang bertambah **setiap** jam/lembar/hari. Biaya awal hanya sekali." |
| M-MODEL-02 | Mengambil nilai y sebuah data sebagai c | "Rp5.000 itu biaya untuk 2 lembar, bukan biaya tetap. c adalah biaya saat x = 0." |
| M-KEP-01 | Memutuskan tanpa menghitung | "Biaya awal kecil belum tentu total lebih murah. Hitung biaya 6 jam untuk kedua paket." |
| M-INTERP-01 | Mengabaikan nilai awal saat mencari x | "Dita sudah punya Rp20.000. Kekurangannya tinggal 60.000 − 20.000." |
| M-INTERP-02 | Menerima klaim tanpa memeriksa | "Periksa dulu: berapa tabungan Dita tepat setelah 7 hari?" |

## 8. Jumlah Butir

| Kelompok | Tersedia (bank) | Target MVP | Keterangan |
|---|---|---|---|
| M1–M3 (titik, grafik, makna gradien) | LT-M1-1 s.d. LT-M3-2 (6, DRAF) | ±30 | Tambah variasi angka |
| M4–M5 (gradien & persamaan) | BS-3, BS-2 | ±25 | Variasi angka mengikuti struktur BS-2 dan BS-3 |
| M6 (soal cerita) | BS-1, BS-2, BS-4 | ±12 | Variasi konteks mengikuti struktur BS-1, BS-2, BS-4 |
| Penelitian: pretest | BS-1 s.d. BS-4 | 4 | Dikerjakan **sebelum** pembelajaran |
| Penelitian: posttest | PT-1 s.d. PT-4 (DRAF) | 4 | Paralel BS; **tidak dimuat di aplikasi** |

Setiap butir di `content/` memiliki field `group`: `learning` (boleh tampil di aplikasi) atau
`research-posttest` (ditolak oleh loader aplikasi). BS-1 s.d. BS-4 bergrup `learning`; untuk
pretest, soal yang sama dicetak di lembar tes. Rincian alur di `docs/10-bank-soal.md` §1.

## 9. Video (opsional, F7)

| Modul | Judul video | Durasi |
|---|---|---|
| M1 | Cara menaruh titik (x, y) | 1,5 menit |
| M2 | Menggambar garis dari tabel nilai | 2,5 menit |
| M3 | Arti gradien: naik ÷ maju | 2 menit |
| M4 | Gradien dari dua titik: A(2, 3) dan B(4, 7) | 2,5 menit |
| M5 | Dari dua titik ke persamaan `y = mx + c` | 3 menit |
| M6 | Membedah soal cerita: sewa sepeda & tabungan | 3 menit |

Format: MP4 480p, H.264, ≤ 5 MB per video; sertakan teks ringkasan sebagai alternatif.

## 10. Validasi Konten

Seluruh konten, termasuk bank soal dan kisi-kisinya, divalidasi oleh **ahli materi** (dosen pendidikan
matematika + guru SMP) sebelum uji coba, menggunakan instrumen di `docs/07-rencana-evaluasi.md`.
