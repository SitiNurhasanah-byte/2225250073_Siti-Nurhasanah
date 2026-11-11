# 07 — Rencana Evaluasi (Tahap *Implementation* & *Evaluation*)

Kualitas produk dinilai dari tiga kriteria (Nieveen): **kevalidan**, **kepraktisan**, **keefektifan**,
ditambah **beban kognitif** sebagai fokus penelitian.

## 1. Kevalidan — Validasi Ahli

| Validator | Jumlah | Aspek |
|---|---|---|
| Ahli materi | 2 (dosen pend. matematika + guru SMP) | Kesesuaian CP/TP, kebenaran konsep, kebenaran kunci, bahasa, urutan materi, kualitas petunjuk & umpan balik |
| Ahli media | 1–2 (dosen TIK/teknologi pendidikan) | Tampilan, navigasi, keterbacaan, konsistensi, kinerja, prinsip multimedia/CLT |

Skala Likert 1–4. Rumus rata-rata skor; kriteria:

| Rata-rata | Kategori |
|---|---|
| 3,26 – 4,00 | Sangat valid |
| 2,51 – 3,25 | Valid |
| 1,76 – 2,50 | Kurang valid |
| 1,00 – 1,75 | Tidak valid |

Contoh butir ahli media terkait CLT: "Satu layar hanya memuat satu konsep", "Grafik dan teks terkait
ditampilkan berdekatan", "Warna tidak berlebihan", "Siswa dapat mengatur kecepatan belajar".

## 2. Kepraktisan

| Tahap | Subjek | Instrumen |
|---|---|---|
| Uji perorangan (*one-to-one*) | 3 siswa (kemampuan tinggi/sedang/rendah) | Observasi *think-aloud*, wawancara singkat |
| Uji kelompok kecil | 6–10 siswa | Angket kepraktisan + **SUS** |
| Uji lapangan | 1 kelas (±30 siswa) | Angket kepraktisan, SUS, angket guru |

Kriteria kepraktisan (persentase): ≥ 81% sangat praktis; 61–80% praktis.
SUS: ≥ 68 di atas rata-rata; target ≥ 70.

## 3. Keefektifan

- **Desain**: *one group pretest–posttest* (minimal) atau kuasi-eksperimen dengan kelas kontrol (lebih kuat).
- **Variabel yang diukur**: kemampuan **Mathematical Literacy** (4 proses: reasoning, formulate, employ, interpret).
- **Instrumen**: pretest BS-1 s.d. BS-4 dan posttest paralel PT-1 s.d. PT-4, berupa soal uraian
  kontekstual di kertas (skor maks 24; kisi-kisi dan rubrik per tahap di `docs/10-bank-soal.md`).
  BS-1 s.d. BS-4 juga dipakai sebagai contoh/latihan di aplikasi, sehingga posttest **wajib** memakai PT
  agar kenaikan skor tidak disebabkan hafalan soal. N-gain dilaporkan total dan per indikator. Instrumen diuji validitas
  isi (ahli), validitas butir, dan reliabilitas (Cronbach's alpha untuk soal uraian). Skor dinilai oleh
  2 penilai pada sebagian jawaban untuk mengecek konsistensi penskoran.
- **Analisis**: N-gain `g = (post − pre) / (skor maks − pre)`; g ≥ 0,7 tinggi, 0,3–0,7 sedang, < 0,3 rendah.
  Uji-t berpasangan (atau Wilcoxon bila tidak normal); bila ada kelas kontrol, uji-t independen pada N-gain.
- Ketuntasan klasikal: persentase siswa mencapai KKTP sekolah.

## 4. Pengukuran Beban Kognitif

| Instrumen | Kapan | Keterangan |
|---|---|---|
| **Skala Paas (1–9)** mental effort | Setelah setiap set latihan (di aplikasi) | Ringkas, berulang, langsung terekam |
| **Angket CLT (Leppink dkk., 2013)** 10 butir, skala 0–10 | Setelah uji coba | Mengukur IL, EL, GL terpisah; adaptasi Bahasa Indonesia, perlu validasi bahasa |
| **Wawancara lanjutan** (pedoman sama dengan S01) | Setelah uji coba, 3–5 siswa termasuk S01 bila memungkinkan | Membandingkan IL/EL/GL sebelum vs sesudah |
| **Data log** | Otomatis | Jumlah petunjuk, waktu, pola miskonsepsi per modul |

Hipotesis kualitatif yang diharapkan:
- EL turun (penjelasan tidak terlalu cepat/panjang; tampilan tenang).
- GL naik (siswa mampu menjelaskan langkah, tidak "menjawab semampunya").
- IL tetap sesuai materi, tetapi terkelola (petunjuk menurun antar-latihan).

**Efisiensi instruksional** (Paas & van Merriënboer): `E = (Z_performa − Z_usaha) / √2`
— nilai E positif menunjukkan performa tinggi dengan usaha rendah.

## 5. Evaluasi Formatif (Tessmer)

```
Self-evaluation ─► Expert review ─► One-to-one ─► Small group ─► Field test
   (pengembang)     (validasi ahli)   (3 siswa)     (6–10 siswa)   (1 kelas)
        └──────────────── revisi di setiap tahap ─────────────────┘
```

Catat setiap revisi dalam tabel: *Saran — Sumber — Tindakan — Bukti (screenshot sebelum/sesudah)*.

## 6. Lampiran Instrumen yang Perlu Disusun

- [ ] Lembar validasi ahli materi
- [ ] Lembar validasi ahli media
- [ ] Angket kepraktisan siswa + SUS (versi Bahasa Indonesia)
- [ ] Angket respons guru
- [x] Soal pretest (BS-1 s.d. BS-4) + kisi-kisi + rubrik — `docs/10-bank-soal.md`
- [ ] Soal posttest paralel (PT-1 s.d. PT-4) — draf tersedia, perlu validasi kesetaraan
- [ ] Lembar tes kertas (layout cetak pretest & posttest)
- [ ] Angket beban kognitif (adaptasi Leppink)
- [ ] Pedoman wawancara lanjutan
- [ ] Lembar observasi one-to-one
