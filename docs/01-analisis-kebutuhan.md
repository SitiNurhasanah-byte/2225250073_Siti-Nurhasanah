# 01 — Analisis Kebutuhan (Tahap *Analysis* ADDIE)

## 1. Data Sumber

| Item | Isi |
|---|---|
| Responden | S01, siswa kelas IX |
| Tanggal | 6 November 2026, ±40 menit, dengan persetujuan rekaman |
| Pewawancara | Siti Nurhasanah |
| Materi | Persamaan Garis Lurus (dipelajari di kelas VIII) |
| Bukti | Buku catatan siswa, jawaban soal pemicu |
| Soal pemicu | `y = 2x + 1`: (1) arti angka 2 dan 1; (2) nilai y jika x = 1; (3) cara menggambar garis di bidang Cartesius |
| Instrumen | Pedoman wawancara Cognitive Load: kode K (konteks), IL, EL, GL, DS (desain) |

> **Catatan koreksi data:** pada K01 siswa menyatakan "pernah belajar di kelas 8", tetapi catatan
> interpretasi tertulis "kelas IX". Sebaiknya direvisi menjadi *"pernah mempelajari materi di kelas VIII"*
> agar konsisten.

## 2. Analisis Konteks Pembelajaran (K)

| Kode | Temuan | Implikasi |
|---|---|---|
| K01 | Materi dipelajari di kelas VIII; masih diingat sebagian di kelas IX | Aplikasi juga berfungsi sebagai **remedial/pengulangan** untuk kelas IX, bukan hanya pembelajaran awal |
| K02 | Guru menjelaskan di papan tulis, siswa diminta membaca materi dulu | Siswa terbiasa membaca dulu → kartu materi pendek sebelum latihan cocok |
| K03 | Siswa mengenali istilah: bentuk garis lurus, gradien, grafik; **masih ragu pada grafik gradien** | Fokus pada **makna** gradien secara visual, bukan sekadar rumus |

## 3. Analisis Beban Intrinsik (IL) — kesulitan pada materinya

| Kode | Kutipan inti | Masalah konseptual | Kebutuhan fitur |
|---|---|---|---|
| IL01 | "menentukan persamaan garis lurus dari beberapa soal" | Belum menguasai prosedur `y − y₁ = m(x − x₁)` / dari dua titik | Contoh bertahap + fading (F4, F5) |
| IL02 | "bingung menentukan nilai/titik koordinat" | Belum lancar membaca/plot titik (x, y); mungkin tertukar x–y | Lab plot titik dengan umpan balik (F3) |
| IL03 | "lupa menjumlahkan atau mengalikan nilai" | Beban memori kerja saat substitusi bertingkat | Isian per langkah + kalkulator langkah (F5) |
| IL04 | "langkah latihan berbeda dengan yang dijelaskan" | Lemah dalam transfer: konsep sama, bentuk beda | Variasi soal berlabel "konsep sama" (P7) |
| IL05 | "penggunaan rumus dan menentukan titik gradien di bidang koordinat" | Gradien belum dimaknai sebagai Δy/Δx di grafik | Segitiga gradien interaktif (F3) |

**Elemen interaktif materi PGL** (sumber IL tinggi) — jumlah elemen yang harus diproses bersamaan:
`persamaan` ↔ `nilai x` ↔ `operasi hitung` ↔ `nilai y` ↔ `pasangan titik` ↔ `posisi di grid` ↔ `garis` ↔ `kemiringan`.
Strategi: **pecah dan urutkan** (sequencing) — kuasai tiap elemen terpisah, lalu gabungkan.

## 4. Analisis Beban Ekstrinsik (EL) — kesulitan dari cara penyajian

| Kode | Temuan | Penyebab EL | Solusi desain |
|---|---|---|---|
| EL01 | Penjelasan soal rumit & panjang menyulitkan | Teks berlebihan, *redundancy* | Kartu ≤ 3 kalimat; langkah dipecah |
| EL02 | Grafik + penjelasan tertulis jelas dan mudah diingat | (faktor pendukung) | Grafik selalu berdampingan dengan teks |
| EL03 | Tampilan visual **membantu**, tidak membingungkan | (faktor pendukung) | Visual jadi tulang punggung |
| EL04 | Penjelasan guru cepat, siswa tertinggal | Tidak ada kendali tempo | Siswa mengatur tempo, tombol ulang |
| EL05 | Sulit mencari nilai inti soal cerita | Informasi relevan tercampur teks | Fitur "Bedah Soal Cerita" (F6) |
| DS03 | Warna mencolok & penjelasan panjang-rumit mengganggu | Elemen dekoratif | Palet tenang, 1 aksen |

## 5. Analisis Beban Germane (GL) — usaha membangun skema

| Kode | Temuan | Interpretasi | Strategi |
|---|---|---|---|
| GL01 | Membaca ulang, lihat contoh soal dulu, baru latihan | Strategi belajar sudah baik | Fasilitasi alur contoh → latihan |
| GL02 | "Tidak tahu, menjawab semampunya" | Skema belum terbentuk; menebak | Petunjuk bertingkat, bukan jawaban langsung |
| GL03 | Bantuan video tutorial | Butuh penjelasan yang bisa diulang | Video pendek opsional (F7) |
| GL04 | Tidak pernah menjelaskan ke teman karena kurang paham | Belum mampu verbalisasi | Fitur "Jelaskan Caramu" (F8) bertahap |
| GL05 | Paham setelah mengetahui nilai yang dicari | Identifikasi tujuan soal membantu | Selalu tampilkan "Yang ditanya" |

## 6. Masukan Desain dari Siswa (DS)

| Kode | Masukan | Fitur |
|---|---|---|
| DS01 | Butuh petunjuk soal dan penjelasan contoh soal | F4, F5 (petunjuk 3 tingkat) |
| DS02 | Langkah perlahan dan bertahap saat menentukan gradien | Modul gradien dipecah paling detail |
| DS03 | Hindari warna mencolok & penjelasan panjang | Design system tenang (docs/04) |

## 7. Analisis Jawaban Soal Pemicu (perlu dilengkapi)

Dari foto jawaban siswa, lengkapi tabel berikut agar pola miskonsepsi bisa diprogram ke umpan balik:

| Soal | Jawaban benar | Jawaban siswa | Benar/Salah | Dugaan miskonsepsi |
|---|---|---|---|---|
| 1. Arti 2 dan 1 | 2 = gradien (kemiringan; setiap x naik 1, y naik 2); 1 = titik potong sumbu-y (0, 1) | *(isi dari foto: tertulis "2 = gradien, 1 = konstanta"?)* | | |
| 2. y jika x = 1 | y = 2(1) + 1 = 3 → titik (1, 3) | *(isi)* | | |
| 3. Cara menggambar | Buat tabel ≥ 2 titik, mis. (0,1) & (1,3); plot; hubungkan dengan garis lurus | *(isi; grafik pada foto tampak menurun/tidak melalui (0,1)?)* | | |

> Tips: jika grafik siswa memiliki kemiringan yang salah arah atau tidak melalui (0,1), itu bukti kuat
> untuk IL02/IL05 dan masuk ke bank miskonsepsi `M-GRAF-*` di `docs/03`.

## 8. Analisis Karakteristik Pengguna & Lingkungan

| Aspek | Temuan / asumsi | Konsekuensi |
|---|---|---|
| Usia | 13–15 tahun | Bahasa sederhana, kalimat pendek |
| Gaya belajar | Visual + membaca + contoh | Multimedia, worked example |
| Perangkat | HP Android (asumsi; **perlu dikonfirmasi**) | Mobile-first, ringan, offline |
| Internet | Terbatas (asumsi; **perlu dikonfirmasi**) | PWA offline, video opsional |
| Lingkungan | Kelas + rumah | Mode proyektor (layar lebar) & mode mandiri |

## 9. Rekomendasi Sebelum Tahap Desain

1. **Tambah responden**: 3–5 siswa dengan kemampuan berbeda (tinggi–sedang–rendah) dan 1 guru matematika,
   agar temuan S01 dapat dikonfirmasi (triangulasi sumber). Gunakan pedoman yang sama.
2. **Survei singkat perangkat** ke satu kelas: jenis HP, versi Android, akses internet.
3. **Analisis kurikulum**: petakan Capaian Pembelajaran Fase D elemen Aljabar → Tujuan Pembelajaran (docs/02).
4. **Lengkapi tabel Bagian 7** dari foto jawaban soal pemicu.

## 10. Kesimpulan Analisis

Kebutuhan utama siswa adalah **media yang memecah materi PGL menjadi langkah-langkah kecil, menautkan
persamaan–tabel–grafik secara visual, memberi contoh sebelum latihan, menyediakan petunjuk bertingkat
dan umpan balik spesifik, serta dapat diulang dengan tempo sendiri dalam tampilan yang sederhana.**
Kebutuhan ini menjadi dasar seluruh fitur di `PRD.md`.
