# 10 — Bank Soal

Bank soal dipakai untuk **dua kelompok penggunaan**:

| Kelompok | Tujuan | Isi | Tempat dipakai |
|---|---|---|---|
| **A. Pembelajaran** | Contoh soal dan latihan siswa | BS-1 s.d. BS-4 + LT-M1-1 s.d. LT-M3-2 | Di dalam aplikasi (modul M1–M6) |
| **B. Penelitian** | Instrumen pretest & posttest untuk mengukur **Mathematical Literacy** | Pretest: BS-1 s.d. BS-4 · Posttest: PT-1 s.d. PT-4 | Lembar tes (disarankan kertas) |

### Kode soal

| Kode | Arti | Status |
|---|---|---|
| **BS-1 … BS-4** | Bank soal inti, disusun oleh Siti Nurhasanah | Final penyusun, menunggu validasi ahli |
| **PT-1 … PT-4** | Soal paralel posttest (struktur & indikator sama dengan BS) | **DRAF**, perlu validasi |
| **LT-Mx-n** | Soal latihan untuk modul M1–M3 yang belum memiliki soal | **DRAF**, perlu validasi |

> Semua soal berstatus **DRAF** disusun oleh AI assistant mengikuti format dan gaya BS-1 s.d. BS-4.
> Soal DRAF wajib diperiksa penyusun dan divalidasi ahli materi sebelum dipakai.

---

## 1. Alur Penggunaan dalam Penelitian

```
 PRETEST                 PEMBELAJARAN (aplikasi)                      POSTTEST
 BS-1 … BS-4    ──►   M1–M3: LT-M1-1 … LT-M3-2               ──►   PT-1 … PT-4
 (tanpa petunjuk,      M4–M6: BS-1 … BS-4 sebagai contoh            (paralel BS,
  tanpa pembahasan)           & latihan bertahap                    tanpa petunjuk)
```

**Mengapa BS boleh dipakai di pretest dan pembelajaran?** Pretest diberikan **sebelum** siswa
belajar, jadi siswa belum pernah melihat pembahasannya. Setelah pretest, kunci dan pembahasan
**tidak** dibagikan. Siswa baru menjumpainya di aplikasi.

**Mengapa posttest memakai PT (paralel), bukan BS?** Setelah pembelajaran, siswa sudah mengerjakan
BS-1 s.d. BS-4 dengan petunjuk dan pembahasan. Jika posttest memakai soal yang sama, kenaikan skor
bisa jadi karena **hafal jawaban**, bukan karena kemampuan literasi meningkat (efek paparan butir).
Soal paralel menjaga validitas hasil N-gain.

> Jika dosen pembimbing tetap meminta pretest dan posttest memakai soal yang sama (BS), hal ini
> **harus ditulis sebagai keterbatasan penelitian** (ancaman validitas internal: *testing effect*).

**Mengapa disarankan di kertas?** Di aplikasi, soal disajikan per tahap dengan petunjuk. Tahapan itu
sendiri adalah bantuan (scaffolding). Instrumen penelitian harus berupa soal uraian utuh tanpa
tahapan, agar yang terukur adalah kemampuan siswa sendiri. Jawaban dinilai manual dengan rubrik.

---

## 2. Kisi-kisi Instrumen Mathematical Literacy

| No | Indikator (proses matematis) | Pretest | Posttest | Konsep | Skor maks |
|---|---|---|---|---|---|
| 1 | **Mathematical Reasoning**: mengidentifikasi hubungan, membandingkan alternatif, memberi alasan, mengambil keputusan | BS-1 Sewa Sepeda | PT-1 Tarif Ojek | 2 model linear, substitusi, membandingkan | 6 |
| 2 | **Formulating Situations Mathematically**: mengidentifikasi informasi, menentukan besaran, membuat model | BS-2 Biaya Fotokopi | PT-2 Cetak Foto | gradien dari 2 data, c, model, substitusi | 6 |
| 3 | **Employing Concepts, Facts, and Procedures**: memilih dan menggunakan prosedur | BS-3 Garis pada Peta | PT-3 Kabel pada Denah | gradien 2 titik, c (negatif), persamaan, substitusi | 6 |
| 4 | **Interpreting, Applying, and Evaluating Outcomes**: menafsirkan, menilai kewajaran, memutuskan | BS-4 Tabungan Buku | PT-4 Bak Air | substitusi, membandingkan, `mx + c = k`, menilai klaim | 6 |
| | | | | **Total** | **24** |

### Penskoran & analisis

- Skor per tahap **1** (benar dan lengkap) atau **0**. Tahap 2 pada BS-1/PT-1 bernilai **2**
  (1 per persamaan).
- Skor per indikator: 0–6. Skor total: 0–24. **Nilai = skor total / 24 × 100.**
- **N-gain** dihitung untuk skor total **dan per indikator**, agar terlihat proses literasi mana
  yang paling meningkat.
- Kategori kemampuan Mathematical Literacy (contoh acuan, sesuaikan dengan referensi skripsi):
  nilai ≥ 80 tinggi; 60–79 sedang; < 60 rendah.
- Sebagian jawaban (mis. 20%) dinilai oleh 2 penilai untuk mengecek konsistensi penskoran.

---

## 3. Kelompok B-Pretest & Kelompok A — Bank Soal Inti (BS)

### BS-1 — Pilihan Paket Sewa Sepeda · *Mathematical Reasoning*

**Soal:** Sebuah tempat penyewaan sepeda menawarkan dua pilihan tarif. Paket A menetapkan biaya awal
Rp5.000 dan biaya tambahan Rp2.000 untuk setiap jam pemakaian. Paket B menetapkan biaya awal Rp1.000
dan biaya tambahan Rp3.000 untuk setiap jam pemakaian. Rani ingin menyewa sepeda selama 6 jam. Paket
manakah yang sebaiknya dipilih Rani agar biaya sewanya lebih murah? Jelaskan alasan matematis Anda
dengan menggunakan persamaan garis lurus.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Paket A: biaya awal Rp5.000, tarif Rp2.000/jam. Paket B: biaya awal Rp1.000, tarif Rp3.000/jam. Lama sewa 6 jam. Ditanya: paket yang lebih murah. | 1 |
| 2 | x = lama sewa (jam), y = total biaya. Paket A: `y = 2.000x + 5.000`. Paket B: `y = 3.000x + 1.000`. | 2 |
| 3 | A: `2.000(6) + 5.000 = 12.000 + 5.000 = Rp17.000`. B: `3.000(6) + 1.000 = 18.000 + 1.000 = Rp19.000`. | 1 |
| 4 | Rp17.000 < Rp19.000, sehingga Paket A lebih murah. | 1 |
| 5 | Rani sebaiknya memilih Paket A karena untuk 6 jam biayanya lebih rendah, yaitu Rp17.000. | 1 |
| | **Skor maksimum** | **6** |

### BS-2 — Biaya Fotokopi · *Formulating Situations Mathematically*

**Soal:** Sebuah tempat fotokopi mengenakan biaya tetap untuk administrasi dan biaya yang sama untuk
setiap lembar yang difotokopi. Diketahui bahwa biaya untuk 2 lembar adalah Rp5.000, sedangkan biaya
untuk 5 lembar adalah Rp8.000. Misalkan x menyatakan banyak lembar fotokopi dan y menyatakan total
biaya. Susunlah persamaan garis lurus yang menggambarkan hubungan banyak lembar dan total biaya
tersebut. Kemudian, tentukan biaya untuk memfotokopi 8 lembar.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Dua pasangan nilai (2, 5.000) dan (5, 8.000); x = banyak lembar, y = total biaya. Ditanya: persamaan dan biaya 8 lembar. | 1 |
| 2 | `m = (8.000 − 5.000)/(5 − 2) = 3.000/3 = 1.000`. Biaya bertambah Rp1.000 per lembar. | 1 |
| 3 | `5.000 = 1.000(2) + c`, sehingga `c = 3.000`. | 1 |
| 4 | `y = 1.000x + 3.000`. | 1 |
| 5 | `y = 1.000(8) + 3.000 = 8.000 + 3.000 = Rp11.000`. | 1 |
| 6 | Persamaan `y = 1.000x + 3.000`; biaya 8 lembar Rp11.000. | 1 |
| | **Skor maksimum** | **6** |

### BS-3 — Menentukan Persamaan Garis pada Peta · *Employing Concepts, Facts, and Procedures*

**Soal:** Pada sebuah bidang koordinat Cartesius, terdapat dua titik yang dilalui sebuah jalan lurus,
yaitu titik A(2, 3) dan titik B(4, 7). Tentukan: (a) gradien garis yang melalui kedua titik tersebut;
(b) persamaan garisnya dalam bentuk y = mx + c; dan (c) nilai y ketika x = 5. Tunjukkan langkah
perhitungan Anda.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | A(2, 3) dan B(4, 7). Ditanya: gradien, persamaan, nilai y saat x = 5. | 1 |
| 2 | `m = (7 − 3)/(4 − 2) = 4/2 = 2`. | 1 |
| 3 | `3 = 2(2) + c`, sehingga `c = −1`. | 1 |
| 4 | `y = 2x − 1`. | 1 |
| 5 | `y = 2(5) − 1 = 10 − 1 = 9`. | 1 |
| 6 | Gradien 2, persamaan `y = 2x − 1`, nilai y saat x = 5 adalah 9. | 1 |
| | **Skor maksimum** | **6** |

### BS-4 — Tabungan untuk Membeli Buku · *Interpreting, Applying, and Evaluating Outcomes*

**Soal:** Dita memiliki tabungan awal Rp20.000. Setiap hari ia menambahkan tabungannya sebesar
Rp5.000. Hubungan jumlah tabungan (y) setelah x hari dinyatakan dengan persamaan y = 5.000x + 20.000.
Dita ingin membeli buku seharga Rp60.000. Seorang teman menyatakan bahwa Dita sudah dapat membeli
buku tersebut setelah 7 hari karena tabungannya telah mencapai Rp60.000. Apakah pernyataan teman Dita
benar? Periksa dengan perhitungan dan jelaskan berapa hari paling sedikit yang dibutuhkan Dita untuk
membeli buku tersebut.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Tabungan awal Rp20.000, tambahan Rp5.000/hari, model `y = 5.000x + 20.000`, harga buku Rp60.000. Ditanya: kebenaran pernyataan dan waktu minimum. | 1 |
| 2 | `y = 5.000(7) + 20.000 = 35.000 + 20.000 = Rp55.000`. | 1 |
| 3 | Rp55.000 < Rp60.000, setelah 7 hari belum cukup. | 1 |
| 4 | `5.000x + 20.000 = 60.000`; `5.000x = 40.000`; `x = 8` hari. | 1 |
| 5 | Pernyataan teman tidak benar: setelah 7 hari tabungan baru Rp55.000, kurang Rp5.000. | 1 |
| 6 | Dita membutuhkan paling sedikit 8 hari. | 1 |
| | **Skor maksimum** | **6** |

---

## 4. Kelompok B-Posttest — Soal Paralel (PT) · **DRAF**

Prinsip penyusunan: indikator, jumlah tahap, skor, dan jenis operasi **sama** dengan pasangan BS-nya.
Konteks dan angka **berbeda**. Tingkat kesulitan angka dibuat setara (kelipatan ribuan bulat, c negatif
pada pasangan BS-3/PT-3).

### PT-1 — Pilihan Tarif Ojek · *Mathematical Reasoning* · DRAF (paralel BS-1)

**Soal:** Sebuah layanan ojek menawarkan dua pilihan tarif. Tarif A menetapkan biaya awal Rp4.000 dan
biaya tambahan Rp3.000 untuk setiap kilometer. Tarif B menetapkan biaya awal Rp8.000 dan biaya
tambahan Rp2.000 untuk setiap kilometer. Budi akan menempuh perjalanan sejauh 7 km. Tarif manakah
yang sebaiknya dipilih Budi agar biayanya lebih murah? Jelaskan alasan matematis Anda dengan
menggunakan persamaan garis lurus.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Tarif A: biaya awal Rp4.000, Rp3.000/km. Tarif B: biaya awal Rp8.000, Rp2.000/km. Jarak 7 km. Ditanya: tarif yang lebih murah. | 1 |
| 2 | x = jarak (km), y = total biaya. Tarif A: `y = 3.000x + 4.000`. Tarif B: `y = 2.000x + 8.000`. | 2 |
| 3 | A: `3.000(7) + 4.000 = 21.000 + 4.000 = Rp25.000`. B: `2.000(7) + 8.000 = 14.000 + 8.000 = Rp22.000`. | 1 |
| 4 | Rp22.000 < Rp25.000, sehingga Tarif B lebih murah. | 1 |
| 5 | Budi sebaiknya memilih Tarif B karena untuk 7 km biayanya lebih rendah, yaitu Rp22.000. | 1 |
| | **Skor maksimum** | **6** |

> Sengaja dibuat jawabannya **tarif dengan biaya awal lebih mahal**, kebalikan dari BS-1. Siswa yang
> hanya menghafal "pilih A" atau "pilih yang biaya awalnya murah" akan terdeteksi (M-KEP-01).

### PT-2 — Biaya Cetak Foto · *Formulating Situations Mathematically* · DRAF (paralel BS-2)

**Soal:** Sebuah studio foto mengenakan biaya tetap untuk pengeditan dan biaya yang sama untuk setiap
lembar foto yang dicetak. Diketahui bahwa biaya untuk mencetak 3 lembar adalah Rp9.000, sedangkan
biaya untuk 6 lembar adalah Rp15.000. Misalkan x menyatakan banyak lembar foto dan y menyatakan total
biaya. Susunlah persamaan garis lurus yang menggambarkan hubungan banyak lembar dan total biaya
tersebut. Kemudian, tentukan biaya untuk mencetak 10 lembar.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Dua pasangan nilai (3, 9.000) dan (6, 15.000); x = banyak lembar, y = total biaya. Ditanya: persamaan dan biaya 10 lembar. | 1 |
| 2 | `m = (15.000 − 9.000)/(6 − 3) = 6.000/3 = 2.000`. Biaya bertambah Rp2.000 per lembar. | 1 |
| 3 | `9.000 = 2.000(3) + c`, sehingga `c = 3.000`. | 1 |
| 4 | `y = 2.000x + 3.000`. | 1 |
| 5 | `y = 2.000(10) + 3.000 = 20.000 + 3.000 = Rp23.000`. | 1 |
| 6 | Persamaan `y = 2.000x + 3.000`; biaya 10 lembar Rp23.000. | 1 |
| | **Skor maksimum** | **6** |

### PT-3 — Menentukan Persamaan Jalur Kabel pada Denah · *Employing* · DRAF (paralel BS-3)

**Soal:** Pada denah sebuah gedung yang digambar di bidang koordinat Cartesius, sebuah kabel listrik
dipasang lurus melalui titik P(1, 1) dan titik Q(3, 7). Tentukan: (a) gradien garis yang melalui kedua
titik tersebut; (b) persamaan garisnya dalam bentuk y = mx + c; dan (c) nilai y ketika x = 6.
Tunjukkan langkah perhitungan Anda.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | P(1, 1) dan Q(3, 7). Ditanya: gradien, persamaan, nilai y saat x = 6. | 1 |
| 2 | `m = (7 − 1)/(3 − 1) = 6/2 = 3`. | 1 |
| 3 | `1 = 3(1) + c`, sehingga `c = −2`. | 1 |
| 4 | `y = 3x − 2`. | 1 |
| 5 | `y = 3(6) − 2 = 18 − 2 = 16`. | 1 |
| 6 | Gradien 3, persamaan `y = 3x − 2`, nilai y saat x = 6 adalah 16. | 1 |
| | **Skor maksimum** | **6** |

### PT-4 — Mengisi Bak Penampung Air · *Interpreting, Applying, and Evaluating* · DRAF (paralel BS-4)

**Soal:** Sebuah bak penampung mula-mula berisi 40 liter air. Air kemudian dialirkan ke dalam bak
sehingga volumenya bertambah 15 liter setiap menit. Hubungan volume air (y) setelah x menit dinyatakan
dengan persamaan y = 15x + 40. Bak dikatakan penuh jika berisi 175 liter. Seorang teman menyatakan
bahwa bak sudah penuh setelah 8 menit. Apakah pernyataan teman tersebut benar? Periksa dengan
perhitungan dan jelaskan berapa menit paling sedikit yang dibutuhkan agar bak penuh.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Volume awal 40 liter, bertambah 15 liter/menit, model `y = 15x + 40`, bak penuh 175 liter. Ditanya: kebenaran pernyataan dan waktu minimum. | 1 |
| 2 | `y = 15(8) + 40 = 120 + 40 = 160` liter. | 1 |
| 3 | 160 < 175, setelah 8 menit bak belum penuh. | 1 |
| 4 | `15x + 40 = 175`; `15x = 135`; `x = 9` menit. | 1 |
| 5 | Pernyataan teman tidak benar: setelah 8 menit volume baru 160 liter, kurang 15 liter. | 1 |
| 6 | Bak membutuhkan paling sedikit 9 menit untuk penuh. | 1 |
| | **Skor maksimum** | **6** |

> Konteks bukan uang (volume) dipilih untuk menguji transfer (IL04). Jika ahli menilai ini membuat
> PT-4 tidak setara dengan BS-4, ganti dengan konteks tabungan/uang dengan angka berbeda.

### Tabel kesetaraan BS ↔ PT (untuk validasi ahli)

| Pasangan | Indikator sama | Tahap & skor sama | Operasi sama | Perbedaan |
|---|---|---|---|---|
| BS-1 ↔ PT-1 | ✓ | ✓ (5 tahap, 6) | 2 model, substitusi, banding | Jawaban benar paket dengan biaya awal lebih mahal |
| BS-2 ↔ PT-2 | ✓ | ✓ (6 tahap, 6) | gradien 2 data, c, substitusi | m = 2.000 (BS: 1.000) |
| BS-3 ↔ PT-3 | ✓ | ✓ (6 tahap, 6) | gradien 2 titik, c negatif, substitusi | m = 3 (BS: 2) |
| BS-4 ↔ PT-4 | ✓ | ✓ (6 tahap, 6) | substitusi, `mx + c = k` | Konteks volume (BS: uang) |

Uji kesetaraan empiris (disarankan): berikan BS dan PT ke kelas **di luar sampel**, lalu bandingkan
rata-rata skor (tidak berbeda signifikan) dan korelasi skor kedua set.

---

## 5. Kelompok A — Soal Latihan Modul M1–M3 (LT) · **DRAF**

M4–M6 memakai BS-1 s.d. BS-4 (lihat §6). Soal LT mengisi modul yang belum punya soal dan menutup
TP1, TP3, TP4, dan TP7 yang belum terwakili di bank soal.

### LT-M1-1 — Denah Sekolah · *Employing* · TP1 · DRAF

**Soal:** Pada denah sebuah sekolah, gerbang terletak di titik (0, 0). Letak beberapa tempat adalah
Kantin K(3, 2), Perpustakaan P(−2, 4), Musala M(−4, −1), dan Lapangan L(2, −3). (a) Tentukan kuadran
letak setiap tempat. (b) Gambarlah keempat titik tersebut pada bidang koordinat Cartesius. (c) Andi
menuliskan letak perpustakaan sebagai (4, −2). Apakah tulisan Andi benar? Jelaskan.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Menuliskan keempat titik; arti angka pertama (x: kanan/kiri) dan kedua (y: atas/bawah). | 1 |
| 2 | K kuadran I, P kuadran II, M kuadran III, L kuadran IV. | 1 |
| 3 | Keempat titik digambar tepat pada bidang Cartesius. | 1 |
| 4 | Tidak benar. (4, −2) berarti 4 ke kanan dan 2 ke bawah (kuadran IV). Perpustakaan (−2, 4) berarti 2 ke kiri dan 4 ke atas. Andi menukar urutan x dan y. | 1 |
| | **Skor maksimum** | **4** |

### LT-M1-2 — Mencari Harta Karun · *Interpreting* · TP1 · DRAF

**Soal:** Dalam sebuah permainan, Rina mulai dari titik (0, 0). Ia berjalan 3 satuan ke kanan, lalu
5 satuan ke bawah, kemudian 6 satuan ke kiri. Tentukan koordinat posisi akhir Rina dan di kuadran
berapa posisi tersebut berada.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Ke kanan/kiri mengubah x; ke atas/bawah mengubah y. | 1 |
| 2 | Setelah ke kanan 3 dan ke bawah 5: (3, −5). | 1 |
| 3 | Setelah ke kiri 6: x = 3 − 6 = −3, posisi akhir (−3, −5). | 1 |
| 4 | x negatif dan y negatif, sehingga berada di kuadran III. | 1 |
| | **Skor maksimum** | **4** |

### LT-M2-1 — Menggambar Garis y = 2x − 1 · *Employing* · TP2, TP3 · DRAF

**Soal:** Diketahui persamaan garis y = 2x − 1. (a) Lengkapi tabel nilai untuk x = −1, 0, 1, 2, 3.
(b) Gambarlah garis tersebut pada bidang koordinat Cartesius. (c) Apakah titik (5, 9) terletak pada
garis tersebut? Jelaskan.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Substitusi tiap x, mis. `y = 2(−1) − 1 = −2 − 1 = −3`. | 1 |
| 2 | Tabel: x = −1, 0, 1, 2, 3 → y = −3, −1, 1, 3, 5. | 1 |
| 3 | Pasangan titik: (−1, −3), (0, −1), (1, 1), (2, 3), (3, 5). | 1 |
| 4 | Titik digambar dan dihubungkan menjadi satu garis lurus. | 1 |
| 5 | `y = 2(5) − 1 = 9`, sehingga (5, 9) terletak pada garis. | 1 |
| | **Skor maksimum** | **5** |

> Sengaja memakai garis yang sama dengan BS-3 agar siswa melihat hubungan grafik dan persamaan
> sebelum mempelajari cara mencari persamaan dari dua titik.

### LT-M2-2 — Lilin yang Menyala · *Formulating* · TP2, TP3 · DRAF

**Soal:** Sebuah lilin mula-mula tingginya 20 cm. Setelah dinyalakan, lilin memendek 2 cm setiap jam.
Misalkan x menyatakan lama lilin menyala (jam) dan y menyatakan tinggi lilin (cm). (a) Tuliskan
persamaan garis lurusnya. (b) Buat tabel nilai untuk x = 0, 2, 4, 6. (c) Gambarlah grafiknya.
(d) Setelah berapa jam lilin habis?

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Tinggi awal 20 cm, berkurang 2 cm/jam. Ditanya: persamaan, tabel, grafik, waktu habis. | 1 |
| 2 | `y = −2x + 20` (gradien negatif karena tinggi berkurang). | 1 |
| 3 | Tabel: x = 0, 2, 4, 6 → y = 20, 16, 12, 8. | 1 |
| 4 | Grafik berupa garis **turun** melalui (0, 20). | 1 |
| 5 | `0 = −2x + 20`; `2x = 20`; `x = 10`. | 1 |
| 6 | Lilin habis setelah 10 jam. | 1 |
| | **Skor maksimum** | **6** |

### LT-M3-1 — Arti Angka pada Tarif Parkir · *Interpreting* · TP4 · DRAF

**Soal:** Biaya parkir sebuah mal dinyatakan dengan persamaan y = 3.000x + 2.000, dengan x lama parkir
(jam) dan y total biaya (rupiah). (a) Apa arti angka 3.000? (b) Apa arti angka 2.000? (c) Di titik
mana garis tersebut memotong sumbu-y, dan apa artinya? (d) Jika lama parkir bertambah 1 jam, biaya
bertambah berapa?

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | Mengenali m = 3.000 dan c = 2.000 pada bentuk `y = mx + c`. | 1 |
| 2 | 3.000 adalah gradien: biaya bertambah Rp3.000 setiap jam. | 1 |
| 3 | 2.000 adalah konstanta: biaya awal saat parkir 0 jam. | 1 |
| 4 | Memotong sumbu-y di (0, 2.000): saat x = 0, biaya Rp2.000. | 1 |
| 5 | Biaya bertambah Rp3.000 (sama dengan gradien). | 1 |
| | **Skor maksimum** | **5** |

> Mengikuti pola soal pemicu wawancara ("apa arti angka 2 dan 1") dalam konteks nyata.

### LT-M3-2 — Membandingkan Tiga Garis · *Reasoning* · TP4, TP7 · DRAF

**Soal:** Diketahui tiga garis: g: y = 2x + 1, h: y = 2x − 3, dan k: y = −x + 1. (a) Tentukan gradien
dan titik potong sumbu-y setiap garis. (b) Garis mana yang sejajar? Berikan alasan. (c) Garis mana
yang turun dari kiri ke kanan? (d) Dua garis mana yang memotong sumbu-y di titik yang sama?
(e) Apakah garis g tegak lurus garis k? Jelaskan.

| Tahap | Kisi-kisi jawaban | Skor |
|---|---|---|
| 1 | g: m = 2, (0, 1). h: m = 2, (0, −3). k: m = −1, (0, 1). | 1 |
| 2 | g dan h sejajar karena gradiennya sama (2). | 1 |
| 3 | k turun karena gradiennya negatif (−1). | 1 |
| 4 | g dan k memotong sumbu-y di titik yang sama, (0, 1). | 1 |
| 5 | g tidak tegak lurus k karena `2 × (−1) = −2`, bukan −1. | 1 |
| 6 | Kesimpulan: gradien menentukan arah/kemiringan, konstanta menentukan titik potong sumbu-y. | 1 |
| | **Skor maksimum** | **6** |

---

## 6. Peta Penggunaan di Aplikasi (Kelompok A)

| Modul | Contoh soal (worked example) | Latihan (fading) | Variasi / konsep sama |
|---|---|---|---|
| M1 | LT-M1-1 | LT-M1-2 | — |
| M2 | LT-M2-1 | LT-M2-2 | LT-M2-2 (gradien negatif) |
| M3 | LT-M3-1 | LT-M3-2 | — |
| M4 | BS-3 tahap 1–2 (gradien) | BS-2 tahap 1–2 | "Konsep sama: selisih y ÷ selisih x" |
| M5 | BS-3 penuh | BS-2 penuh (fading level 1→3) | BS-2 ↔ BS-3 |
| M6 | BS-1 (Bedah Soal Cerita) | BS-4 | BS-1 ↔ BS-4: nilai awal + laju |

**PT-1 s.d. PT-4 tidak boleh dimasukkan ke aplikasi** (lihat penanda `group: "research-posttest"`
di data konten; aplikasi menolak memuat butir dengan grup tersebut).

> Jumlah ini (10 soal pembelajaran) masih di bawah target ±70 butir di `docs/03` §8. Untuk latihan
> tambahan, buat variasi angka dari soal-soal di atas dengan struktur yang sama.

## 7. Checklist Validasi Bank Soal

- [ ] Penyusun memeriksa semua soal DRAF (PT dan LT): bahasa, konteks, kunci
- [ ] Ahli materi menilai kesesuaian indikator Mathematical Literacy setiap soal
- [ ] Ahli materi menilai **kesetaraan** BS ↔ PT (tabel §4)
- [ ] Keputusan "Anda" vs "kamu" diterapkan konsisten
- [ ] Uji coba instrumen di kelas non-sampel: validitas butir, reliabilitas, kesetaraan
- [ ] Revisi dicatat (soal lama → soal baru, alasan)
