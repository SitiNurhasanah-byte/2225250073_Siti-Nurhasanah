# PRD — GarisKu: Aplikasi Belajar Persamaan Garis Lurus

| Atribut | Isi |
|---|---|
| Versi dokumen | 1.0 (draf) |
| Tanggal | 11 November 2026 |
| Penyusun | Siti Nurhasanah (2225250073) |
| Model pengembangan | ADDIE |
| Landasan teori | Cognitive Load Theory (Sweller): beban Intrinsik (IL), Ekstrinsik (EL), Germane (GL) |
| Platform | Web (PWA) & Android (APK via Capacitor) |
| Sasaran | Siswa SMP kelas VIII–IX (Kurikulum Merdeka, Fase D) |

---

## 1. Latar Belakang & Masalah

Persamaan Garis Lurus (PGL) adalah materi kelas VIII yang tetap dibutuhkan di kelas IX (fungsi kuadrat,
SPLDV). Wawancara dengan siswa S01 (kelas IX, 6 Nov 2026) menunjukkan bahwa meskipun siswa **mengenali
istilah** (bentuk garis lurus, gradien, grafik di bidang Cartesius — K03), siswa masih:

| Kode | Masalah | Jenis beban |
|---|---|---|
| IL01, IL05 | Kesulitan menentukan persamaan garis dan gradien dari soal | Intrinsik |
| IL02 | Bingung menentukan nilai/titik koordinat | Intrinsik |
| IL03 | Lupa menjumlah/mengalikan saat substitusi nilai | Intrinsik (kapasitas memori kerja) |
| IL04 | Bingung jika langkah latihan berbeda dari contoh (transfer) | Intrinsik |
| EL01, EL05 | Penjelasan panjang-rumit; soal cerita sulit diurai | Ekstrinsik |
| EL04 | Penjelasan guru terlalu cepat, tertinggal | Ekstrinsik |
| DS03 | Warna mencolok & penjelasan panjang mengganggu | Ekstrinsik |
| GL02, GL04 | Menjawab "semampunya", tidak mampu menjelaskan cara | Germane rendah |

Sumber belajar yang ada (papan tulis + buku catatan) **tidak bisa diulang dengan kecepatan sendiri**,
**tidak interaktif**, dan **tidak memberi umpan balik langsung** saat siswa salah hitung.

**Pernyataan masalah:** *Siswa SMP kesulitan menghubungkan persamaan, titik koordinat, gradien, dan
grafik garis lurus karena beban intrinsik materi tinggi dan penyajian yang menambah beban ekstrinsik
(cepat, panjang, tidak visual-interaktif), sehingga siswa belum mampu menyelesaikan maupun menjelaskan
penyelesaian soal secara mandiri.*

## 2. Tujuan Produk

| ID | Tujuan | Indikator keberhasilan |
|---|---|---|
| T1 | Meningkatkan kemampuan **Mathematical Literacy** siswa pada materi PGL | Rata-rata *gain* ternormalisasi (N-gain) pretest–posttest ≥ 0,3 (sedang) |
| T2 | Menurunkan beban kognitif yang dirasakan | Skor *mental effort* (skala Paas 1–9) pada latihan turun dibanding pembelajaran biasa |
| T3 | Aplikasi praktis digunakan siswa | Skor kepraktisan angket siswa ≥ 80% (kategori praktis) / SUS ≥ 70 |
| T4 | Konten valid secara materi & media | Skor validasi ahli materi dan ahli media ≥ 3,4 dari 4 (sangat valid) |
| T5 | Dapat dipakai di HP Android spek rendah & offline | Berjalan di Android 8+, RAM 2 GB, tanpa internet setelah instalasi |

### Non-tujuan (di luar cakupan v1)
- Bukan LMS: tidak ada manajemen kelas, absensi, atau penilaian rapor.
- Tidak ada fitur sosial/chat/forum.
- Tidak mencakup materi lain selain PGL (relasi-fungsi, SPLDV menyusul di versi berikutnya).
- Tidak ada AI chatbot tutor pada v1.
- Tidak ada akun/login wajib pada v1.

## 3. Pengguna (Persona)

### Persona utama — "Sinta", siswa kelas VIII/IX (berdasarkan S01)
- Pernah belajar PGL, punya buku catatan, mengenali istilah tapi ragu pada grafik dan gradien.
- Belajar dengan **membaca ulang materi, melihat contoh soal dulu, lalu latihan** (GL01).
- Terbantu **video tutorial** (GL03) dan **grafik + penjelasan tertulis** (EL02, EL03).
- Sering **tertinggal** saat guru menjelaskan cepat (EL04).
- Butuh **petunjuk soal & contoh soal** (DS01), langkah **perlahan dan bertahap** khususnya gradien (DS02).
- Tidak suka **warna mencolok dan teks panjang** (DS03).
- Perangkat: HP Android kelas menengah-bawah, kuota internet terbatas.

### Persona sekunder — Guru Matematika SMP
- Ingin media pendamping yang bisa dipakai di kelas (proyektor) dan sebagai tugas rumah.
- Butuh melihat ringkasan kemajuan siswa (v1: siswa menunjukkan layar "Rekap"; v2: dasbor guru).

## 4. Prinsip Desain (Turunan dari Wawancara)

| # | Prinsip | Dasar temuan | Prinsip CLT |
|---|---|---|---|
| P1 | **Satu langkah per layar**; teks ≤ 3 kalimat per blok | EL01, DS03 | *Segmenting*, kurangi EL |
| P2 | **Siswa mengendalikan kecepatan** (tombol Lanjut/Ulang, tanpa autoplay) | EL04 | *Learner pacing* |
| P3 | **Contoh dulu, baru latihan** — *worked example* → *completion problem* → soal mandiri | GL01, DS01 | *Worked-example effect*, *fading* |
| P4 | **Grafik selalu berdampingan** dengan persamaan dan tabel nilai, ter-*highlight* sinkron | EL02, EL03, IL02 | *Split-attention*, *multimedia* |
| P5 | **Petunjuk bertingkat** (hint 1 → 2 → 3) bukan langsung kunci jawaban | DS01, DS02, GL02 | *Scaffolding* |
| P6 | **Umpan balik per langkah hitung** untuk menangkap salah tambah/kali | IL03 | Kurangi beban memori kerja |
| P7 | **Variasi bentuk soal** dengan konsep sama, diberi label "konsepnya sama" | IL04 | *Variability effect* |
| P8 | **Soal cerita dibedah**: tandai "yang diketahui" & "yang ditanya" | EL05, GL05 | Kurangi EL, dorong GL |
| P9 | **Minta siswa menjelaskan** (pilih alasan / susun langkah) | GL04 | *Self-explanation* (GL) |
| P10 | **Tampilan tenang**: 1 warna aksen, latar netral, tanpa animasi berlebihan | DS03 | *Coherence principle* |

## 5. Ruang Lingkup Fitur

Prioritas: **M** = Must (MVP), **S** = Should, **C** = Could, **W** = Won't (v1).

### F1. Beranda & Peta Belajar — **M**
- Menampilkan 6 modul berurutan (lihat `docs/03-konten-materi.md`) dengan status: belum / sedang / selesai.
- Tombol "Lanjutkan belajar" ke posisi terakhir.
- Modul berikutnya **tidak dikunci** (siswa boleh memilih), tetapi diberi saran urutan.

### F2. Pelajaran Bertahap (Micro-lesson) — **M**
- Tiap modul berisi 4–8 "kartu" pendek; satu konsep per kartu.
- Navigasi: Kembali / Lanjut / Ulangi kartu. Tidak ada auto-advance.
- Notasi matematika dirender rapi (KaTeX).
- Istilah kunci (gradien, ordinat, absis, konstanta) dapat diketuk untuk melihat definisi singkat (glosarium pop-up).

### F3. Grafik Interaktif (Lab Garis) — **M**
- Bidang Cartesius dengan grid, sumbu berlabel, zoom/geser sederhana.
- Siswa mengatur **m** dan **c** pada `y = mx + c` melalui slider/tombol ±, grafik berubah langsung.
- Tabel nilai `x → y` otomatis, baris tabel ↔ titik di grafik ter-*highlight* bersamaan saat diketuk.
- Mode "Plot titik": siswa mengetuk grid untuk menaruh titik; aplikasi memeriksa apakah titik benar.
- Visualisasi gradien sebagai "naik ... / maju ..." (segitiga Δy/Δx).

### F4. Contoh Soal Bertahap (Worked Example) — **M**
- Penyelesaian ditampilkan **langkah demi langkah**, siswa menekan "Langkah berikutnya".
- Tiap langkah: apa yang dilakukan + mengapa (1 kalimat).
- Pasangan contoh: contoh A (dibahas penuh) → soal B serupa (siswa melengkapi).

### F5. Latihan dengan Scaffolding & Fading — **M**
- Tipe soal: pilihan ganda, isian angka, isian bertahap (per langkah), plot titik di grafik, susun langkah (drag/urutkan).
- **Fading**: Soal 1 = sebagian besar langkah sudah terisi → Soal 2 = sebagian → Soal 3 = mandiri.
- **Petunjuk 3 tingkat**: (1) pengingat konsep, (2) langkah pertama, (3) contoh mirip. Kunci jawaban baru muncul setelah 2 kali salah atau siswa memilih "Lihat pembahasan".
- **Umpan balik diagnostik**: jawaban salah dicocokkan ke pola miskonsepsi umum (lihat `docs/03`) → pesan spesifik, mis. "Sepertinya 2 × 1 belum dikalikan. Coba hitung 2 × 1 dulu."
- Kalkulator langkah opsional untuk substitusi (`y = 2(…) + 1`) yang memperlihatkan urutan kali → tambah (IL03).

### F6. Bedah Soal Cerita — **S**
- Siswa menandai/mengetuk informasi "Diketahui" dan "Ditanya" dari teks soal.
- Aplikasi membantu mengubah ke bentuk matematika langkah demi langkah.

### F7. Video Singkat — **S**
- Video penjelasan 1–3 menit per modul (opsional ditonton), dapat dijeda/ulang.
- Disimpan lokal (ukuran kecil) atau tautan YouTube bila online; ada ringkasan teks sebagai alternatif.

### F8. Jelaskan Caramu (Self-explanation) — **S**
- Setelah menjawab benar, sesekali siswa diminta memilih alasan yang tepat atau mengurutkan langkah.

### F9. Rekap Kemajuan — **M**
- Per modul: persentase selesai, skor latihan, jumlah petunjuk dipakai.
- Daftar "konsep yang perlu diulang" berdasarkan pola kesalahan.
- Skala *mental effort* 1–9 singkat setelah setiap set latihan (data untuk penelitian).

### F10. Dukungan Pretest–Posttest Penelitian — **M**
- Instrumen penelitian (Mathematical Literacy) dikerjakan di **lembar tes kertas** sebagai soal uraian
  utuh, tanpa tahapan dan tanpa petunjuk, lalu dinilai manual dengan rubrik (`docs/10-bank-soal.md`).
  Alasan: penyajian bertahap di aplikasi sudah merupakan bantuan, sehingga tidak cocok untuk mengukur kemampuan.
- Pretest memakai BS-1 s.d. BS-4 (sebelum belajar). Posttest memakai PT-1 s.d. PT-4 (paralel).
- Aplikasi **tidak memuat** soal posttest (grup `research-posttest` ditolak loader).
- Aplikasi menyediakan layar "Status Penelitian" untuk peneliti: tandai pretest sudah dilakukan
  (modul baru bisa dibuka setelahnya) dan input skor per tahap dari lembar tes (opsional, **S**)
  agar ikut terekspor bersama data belajar.

### F11. Pengaturan — **M**
- Ukuran huruf (normal/besar), mode gelap, nyalakan/matikan suara.
- Kode siswa (mis. S01) diisi manual untuk keperluan penelitian; **tanpa nama lengkap**.
- Ekspor data hasil (file JSON/CSV) untuk diserahkan ke peneliti.

### F12. Dasbor Guru & Sinkronisasi Cloud — **W** (v2)
### F13. Gamifikasi kompetitif (leaderboard) — **W** (bertentangan dengan prinsip ketenangan & dapat menambah EL)
### F14. Penanda capaian "pisang terkumpul" (non-kompetitif) — **C**
- Satu ikon pisang per modul selesai, hanya terlihat oleh siswa sendiri (lihat `docs/04` §7.2a).

## 6. User Stories Utama

| ID | Sebagai | Saya ingin | Agar | Fitur |
|---|---|---|---|---|
| US01 | siswa | melihat arti `m` dan `c` dengan menggeser slider dan melihat garisnya berubah | paham makna gradien & titik potong (soal pemicu no. 1) | F3 |
| US02 | siswa | menghitung `y` untuk `x` tertentu dengan langkah dicek satu per satu | tidak lupa mengalikan/menjumlah (IL03) | F5 |
| US03 | siswa | menaruh titik di grafik dan langsung tahu benar/salah | yakin dalam menentukan titik koordinat (IL02) | F3, F5 |
| US04 | siswa | melihat contoh soal penuh sebelum latihan | bisa meniru langkahnya (GL01) | F4 |
| US05 | siswa | meminta petunjuk tanpa langsung diberi jawaban | tetap berpikir sendiri (DS01) | F5 |
| US06 | siswa | mengulang penjelasan sesuka hati | tidak tertinggal (EL04) | F2, F7 |
| US07 | siswa | dibantu memilah informasi pada soal cerita | tahu nilai apa yang dicari (EL05, GL05) | F6 |
| US08 | siswa | melihat soal dengan bentuk berbeda tapi diberi tahu konsepnya sama | tidak bingung saat soal berbeda dari contoh (IL04) | F5 |
| US09 | siswa | memakai aplikasi tanpa internet | hemat kuota | NFR |
| US10 | peneliti | mengekspor data skor & mental effort per kode siswa | menganalisis efektivitas | F9, F11 |
| US11 | guru | menampilkan Lab Garis di proyektor | menjelaskan di kelas secara visual | F3 |

## 7. Kebutuhan Fungsional (ringkas)

| ID | Kebutuhan |
|---|---|
| FR01 | Sistem menampilkan konten pelajaran dari file data (JSON/Markdown), bukan ditulis langsung di kode. |
| FR02 | Sistem merender ekspresi matematika (LaTeX) dengan benar di semua layar. |
| FR03 | Sistem menggambar garis `y = mx + c`, garis dari dua titik, dan garis bentuk `ax + by = c`. |
| FR04 | Sistem memeriksa jawaban numerik dengan toleransi dan menerima bentuk ekuivalen (mis. `1/2` = `0,5` = `0.5`). |
| FR05 | Sistem memeriksa persamaan garis yang diketik dalam bentuk ekuivalen (mis. `y=2x+1`, `2x - y + 1 = 0`). |
| FR06 | Sistem menyediakan 3 tingkat petunjuk per soal dan mencatat penggunaannya. |
| FR07 | Sistem mencocokkan jawaban salah ke pola miskonsepsi dan memberi umpan balik spesifik. |
| FR08 | Sistem menyimpan kemajuan secara lokal dan memulihkannya saat aplikasi dibuka kembali. |
| FR09 | Sistem merekam skor, waktu pengerjaan, jumlah petunjuk, dan skor mental effort per set. |
| FR10 | Sistem mengekspor data ke JSON dan CSV. |
| FR11 | Sistem menolak memuat butir bergrup `research-posttest` dan mencatat status pretest/posttest serta skor tes yang diinput peneliti. |

## 8. Kebutuhan Non-Fungsional

| ID | Kategori | Kebutuhan |
|---|---|---|
| NFR01 | Platform | Berjalan di Chrome/Edge/Firefox terbaru dan Android 8.0+ (WebView). |
| NFR02 | Kinerja | Muat awal < 3 detik di 4G; ukuran bundel awal (JS) < 400 KB gzip; APK < 25 MB tanpa video. |
| NFR03 | Offline | Seluruh pelajaran & latihan dapat diakses offline setelah pemuatan pertama (Service Worker). |
| NFR04 | Responsif | Layout optimal 360 px (HP) hingga 1366 px (laptop/proyektor); orientasi potret utama. |
| NFR05 | Aksesibilitas | Kontras teks ≥ 4.5:1 (WCAG AA); target sentuh ≥ 44 px; tidak bergantung pada warna saja (benar/salah juga memakai ikon & teks). |
| NFR06 | Bahasa | Bahasa Indonesia baku sederhana, kalimat pendek; angka mengikuti format Indonesia (titik = ribuan, koma = desimal, awalan "Rp" diterima). |
| NFR07 | Privasi | Tidak mengumpulkan nama lengkap, foto, lokasi, atau kontak; data tetap di perangkat kecuali diekspor manual. |
| NFR08 | Keterpeliharaan | TypeScript strict, cakupan uji unit logika matematika ≥ 90%. |
| NFR09 | Visual | Maksimal 1 warna aksen + warna status (benar/salah); tanpa animasi berkedip (DS03). |

## 9. Alur Pengguna Utama

```
[Kertas] Pretest BS-1–BS-4 ─► Buka aplikasi ─► Isi kode siswa ─► Beranda/Peta Belajar
   └► Pilih modul ─► Kartu pelajaran (ulang/lanjut) ─► Lab Garis (eksplorasi)
        └► Contoh soal bertahap ─► Latihan (fading + petunjuk + umpan balik)
             └► Skala mental effort ─► Rekap modul ─► Modul berikutnya
                  └► (semua modul selesai) ─► Rekap akhir ─► Ekspor data
                       └► [Kertas] Posttest PT-1–PT-4 ─► (opsional) peneliti input skor ─► Ekspor
```

Penggunaan bank soal (pembelajaran vs penelitian) dijelaskan di `docs/10-bank-soal.md`.

## 10. Metrik Sukses Produk

| Metrik | Target | Cara ukur |
|---|---|---|
| N-gain Mathematical Literacy | ≥ 0,3 (total dan per indikator) | Pretest BS-1–4 & posttest PT-1–4, tes tertulis |
| Mental effort rata-rata latihan | ≤ 5 dari 9 | Skala Paas di aplikasi |
| Kepraktisan (angket siswa) | ≥ 80% | Angket kepraktisan |
| SUS (System Usability Scale) | ≥ 70 | Angket SUS |
| Penyelesaian modul | ≥ 70% siswa menyelesaikan seluruh modul | Data ekspor |
| Rata-rata petunjuk per soal turun dari modul awal ke akhir | Menurun | Data ekspor |

## 11. Asumsi & Batasan

- Data analisis kebutuhan baru dari **1 siswa (S01)**; disarankan menambah 2–5 siswa dan 1 guru sebelum desain final agar temuan tidak bias (lihat `docs/01`).
- Siswa memiliki akses ke HP Android atau komputer di sekolah.
- Pengembangan dilakukan satu orang dengan bantuan AI coding assistant; cakupan MVP harus realistis untuk ±10–12 minggu.
- Materi mengacu Kurikulum Merdeka Fase D (elemen Aljabar: relasi, fungsi, persamaan garis lurus).

## 12. Pertanyaan Terbuka

1. Apakah uji coba akan memakai kelas VIII (materi sedang dipelajari) atau kelas IX (remedial/pengulangan)?
2. Apakah video dibuat sendiri (rekaman layar) atau memakai video yang sudah ada (perlu izin)?
3. Apakah ada kebutuhan dasbor guru untuk keperluan skripsi, atau cukup ekspor data?
4. Desain penelitian evaluasi: *one group pretest-posttest* atau dengan kelas kontrol?
