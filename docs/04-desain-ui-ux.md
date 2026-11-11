# 04 — Desain UI/UX

Prinsip utama: **tenang, jelas, satu fokus** (DS03, EL01). Setiap elemen visual harus menyampaikan
makna; jika tidak, hapus.

## 1. Design Tokens

### Warna (mode terang)

| Token | Hex | Fungsi |
|---|---|---|
| `bg` | `#F8F9FB` | Latar halaman |
| `surface` | `#FFFFFF` | Kartu |
| `text` | `#1F2933` | Teks utama (kontras 14:1) |
| `text-muted` | `#52606D` | Teks sekunder (kontras 6.4:1) |
| `border` | `#D9DEE4` | Garis tepi, grid sekunder |
| `accent` | `#2563EB` | **Satu-satunya warna aksen**: tombol utama, highlight, garis grafik |
| `accent-soft` | `#E0EAFE` | Latar highlight |
| `success` | `#15803D` | Benar (selalu + ikon ✓ + teks) |
| `error` | `#B91C1C` | Salah (selalu + ikon ✕ + teks) |
| `hint` | `#92400E` di atas `#FEF3C7` | Panel petunjuk |

Mode gelap: `bg #111827`, `surface #1F2937`, `text #F3F4F6`, `accent #60A5FA`.

Aturan: **dilarang** gradasi warna, warna neon, lebih dari satu warna aksen per layar.
Grafik: garis utama `accent`, garis kedua (perbandingan) `text-muted` putus-putus — bukan warna baru.

### Tipografi

| Elemen | Ukuran | Bobot |
|---|---|---|
| Judul layar | 22 px | 600 |
| Teks kartu | 17 px (besar: 20 px) | 400 |
| Matematika (KaTeX) | 1.15× teks | — |
| Label tombol | 16 px | 600 |

Font: **Inter** atau sistem (`system-ui`); disimpan lokal untuk offline. Tinggi baris 1.5.
Maksimal ±60 karakter per baris.

### Ruang & bentuk
Spasi kelipatan 4 px (4, 8, 12, 16, 24, 32). Radius kartu 12 px. Target sentuh ≥ 44 × 44 px.
Animasi hanya transisi 150–250 ms yang dipicu siswa; hormati `prefers-reduced-motion`.

## 2. Daftar Layar

| Kode | Layar | Fitur |
|---|---|---|
| L01 | Sambutan + isi kode siswa | F11 |
| L02 | Beranda / Peta Belajar | F1 |
| L03 | Kartu Pelajaran | F2 |
| L04 | Lab Garis | F3 |
| L05 | Contoh Soal Bertahap | F4 |
| L06 | Latihan | F5, F8 |
| L07 | Bedah Soal Cerita | F6 |
| L08 | Skala Mental Effort | F9 |
| L09 | Rekap Modul / Kemajuan | F9 |
| L10 | Status Penelitian (peneliti: tandai pretest, input skor tes kertas) | F10 |
| L11 | Pengaturan & Ekspor | F11 |
| L12 | Glosarium (pop-up) | F2 |

## 3. Wireframe (HP 360 px)

### L02 — Beranda
```
┌──────────────────────────────┐
│ GarisKu              ⚙        │
│ Halo, S01 👋                  │
│ ┌──────────────────────────┐ │
│ │ Lanjutkan: M3 Gradien     │ │
│ │ Kartu 2 dari 5   [Lanjut]│ │
│ └──────────────────────────┘ │
│ Peta Belajar                 │
│ ● M1 Titik Koordinat    ✓    │
│ ● M2 Persamaan→Grafik   ✓    │
│ ◐ M3 Makna Gradien     40%   │
│ ○ M4 Menghitung Gradien      │
│ ○ M5 Persamaan Garis         │
│ ○ M6 Soal Cerita             │
│                              │
│ [🧪 Lab Garis]  [📊 Rekap]   │
└──────────────────────────────┘
```

### L03 — Kartu Pelajaran
```
┌──────────────────────────────┐
│ ← M3 Makna Gradien    2 / 5  │
│ ▬▬▬▬▬▬▬▬░░░░░░░░░░░░         │
│                              │
│   Apa arti angka 2?          │
│                              │
│   Pada  y = 2x + 1 ,         │
│   angka 2 adalah [gradien].  │  ← istilah dapat diketuk (glosarium)
│   Setiap x naik 1,           │
│   y naik 2.                  │
│   ┌────────────────────────┐ │
│   │   grafik + segitiga     │ │
│   │   "maju 1, naik 2"      │ │
│   └────────────────────────┘ │
│  [▶ Video 2 mnt] (opsional)  │
│                              │
│ [ ← Kembali ]   [ Lanjut → ] │
└──────────────────────────────┘
```

### L04 — Lab Garis
```
┌──────────────────────────────┐
│ ← Lab Garis       [Plot titik]│
│   y = [ 2 ] x + [ 1 ]        │  ← m dan c di-highlight bila diubah
│ ┌────────────────────────┐   │
│ │        │      /         │   │
│ │        │    ●(1,3)      │   │
│ │        ●(0,1)           │   │
│ │ ───────┼/────────       │   │
│ │       /│                │   │
│ └────────────────────────┘   │
│ m: [−] ━━━━●━━━━ [+]   2     │
│ c: [−] ━━━━━●━━━ [+]   1     │
│ ┌─────┬────┬────┬────┐       │
│ │  x  │ −1 │  0 │  1 │       │  ← ketuk kolom → titik grafik menyala
│ │  y  │ −1 │  1 │  3 │       │
│ └─────┴────┴────┴────┘       │
│ [☐ tampilkan segitiga gradien]│
└──────────────────────────────┘
```
Pada layar lebar (≥ 900 px / proyektor): grafik di kiri, kontrol + tabel di kanan.

### L06 — Latihan (stepwise, fading level 2)
```
┌──────────────────────────────┐
│ ← Soal 3 · Tahap 5     5/6   │
│ Diketahui y = 2x − 1, x = 5. │
│ Ditanya: nilai y.            │
│                              │
│ y = 2 × 5 − 1      (terisi)  │
│ y = [ 10 ] − 1     ✓         │
│ y = [ 10 ]         ✕         │
│ ┌──────────────────────────┐ │
│ │ ✕ Belum tepat.            │ │
│ │ Masih ada "− 1" yang      │ │
│ │ belum dikurangkan.        │ │
│ └──────────────────────────┘ │
│ [💡 Petunjuk 1/3]  [Periksa] │
└──────────────────────────────┘
```
Keypad angka kustom (0–9, −, koma, /, hapus) agar tidak memunculkan keyboard penuh.

### L08 — Skala Mental Effort
```
┌──────────────────────────────┐
│ Seberapa besar usaha         │
│ pikiranmu untuk latihan tadi?│
│ 1  2  3  4  5  6  7  8  9    │
│ ○  ○  ○  ○  ○  ○  ○  ○  ○    │
│ sangat         sangat        │
│ ringan          berat        │
│              [Simpan]        │
└──────────────────────────────┘
```

## 4. Pola Interaksi

- **Navigasi**: tombol Kembali selalu di kiri atas; aksi utama selalu di kanan bawah.
- **Progress bar** per modul di atas kartu (orientasi, mengurangi kecemasan).
- **Highlight sinkron**: mengetuk titik/baris tabel/bagian persamaan menyorot pasangannya di dua tempat lainnya.
- **Tidak ada pop-up mengejutkan**; konfirmasi hanya untuk keluar dari tes.
- **Status kosong** yang ramah, mis. "Belum ada rekap. Yuk mulai dari M1!"

## 5. Aksesibilitas

- Kontras ≥ 4.5:1; ukuran huruf dapat diperbesar.
- Benar/salah tidak hanya warna (ikon + teks).
- Semua tombol berlabel (aria-label); grafik memiliki deskripsi teks alternatif (mis. "Garis naik melalui (0,1) dan (1,3)").
- Mendukung navigasi keyboard di web (Tab/Enter, panah untuk slider).

## 6. Prototipe

Buat prototipe *low-fidelity* (kertas/Figma) dari L02–L06, uji ke 2–3 siswa (*think-aloud* 10 menit)
sebelum pengembangan. Catat kebingungan sebagai revisi desain.


## 7. Elemen Dekoratif Aplikasi

Elemen dekoratif digunakan untuk memperindah tampilan aplikasi agar lebih menarik dan nyaman digunakan
oleh siswa. Elemen ini tidak berfungsi sebagai materi pembelajaran, melainkan sebagai pendukung visual.

Elemen dekoratif yang digunakan:

1. Karakter maskot dengan mata besar yang ekspresif pada halaman utama.
2. Ornamen geometris sebagai latar belakang.
3. Ikon dekoratif pada menu aplikasi.
4. Gambar pendukung pada halaman materi dan kuis, dengan batasan pada §7.3.

Pemilihan elemen dekoratif disesuaikan dengan tema warna dan karakteristik siswa SMP agar tampilan
aplikasi terlihat menarik, sederhana, dan tidak mengganggu fokus belajar.

### 7.1 Maskot: karakter orisinal, bukan Minions

Karakter Minions (dan karakter kartun terkenal lainnya) adalah milik pemegang hak cipta dan merek
dagang. Gambarnya **tidak boleh** dipakai di aplikasi yang dibagikan sebagai APK, PWA publik, atau
dilampirkan di skripsi yang dipublikasikan, termasuk untuk tujuan pendidikan. Gantinya, buat
**maskot orisinal** yang tetap memakai ide "mata besar yang ekspresif".

Usulan: **"Gari"**, karakter berbentuk **segitiga gradien** (segitiga siku-siku "maju–naik") dengan
dua mata bulat besar.
- **Bentuk:** sederhana dan datar (flat), garis tepi tebal, tanpa bayangan realistis.
- **Warna:** `accent` (biru) dan putih/netral sesuai palet §1. Hindari kuning mencolok.
- **Mata:** sumber ekspresi utama: senang, berpikir, semangat, tenang.
- **Makna:** bentuknya mengingatkan siswa pada konsep gradien (Δy/Δx), sehingga maskot tidak sekadar hiasan.
- **Pembuatan:** gambar sendiri (Figma/Inkscape/Canva), atau minta bantuan teman desain. Simpan sebagai SVG agar ringan dan offline.

| Ekspresi | Dipakai di |
|---|---|
| Melambai, mata senang | L01 Sambutan, L02 Beranda |
| Mata berpikir (melirik ke atas) | Tombol/panel Petunjuk |
| Tangan terangkat, mata berbinar | Selesai satu modul (L09 Rekap) |
| Mata tenang, senyum kecil | Status kosong, mis. "Belum ada rekap" |

> Tidak ada ekspresi sedih atau marah saat siswa salah, agar siswa tidak merasa dihakimi (GL02).

### 7.2 Ornamen geometris & ikon

- **Ornamen latar:** pola grid koordinat tipis, titik-titik, atau garis miring, dengan warna `border`
  dan opasitas ≤ 10%. Hanya di L01, L02, dan L09. Tidak dipakai di belakang teks atau grafik.
- **Ikon menu:** satu set ikon garis yang konsisten (mis. Lucide, lisensi ISC), dengan warna `text-muted`
  atau `accent`. Satu ikon per menu, tanpa animasi.

### 7.2a Ikon dekoratif pisang & mata bulat

**Pisang** (gaya stiker kartun: garis tepi hitam, isi kuning, bingkai putih) boleh dipakai karena
pisang adalah benda umum, bukan karakter berhak cipta. Syaratnya digambar sendiri atau diambil dari
aset berlisensi bebas, bukan diunduh dari situs stiker berbayar.

| Penggunaan | Detail | Layar |
|---|---|---|
| Pola latar | Pisang kecil tersebar miring, opasitas 10–15%, menggantikan/menyertai ornamen geometris | L01, L02, L09 |
| Penanda capaian (F14) | Satu pisang "terkumpul" setiap modul selesai, ditampilkan di Peta Belajar. **Non-kompetitif:** hanya untuk diri sendiri, tanpa peringkat | L02, L09 |
| Ikon menu | Pisang kecil sebagai ikon "Rekap/Capaian" | L02 |
| Status kosong | "Belum ada pisang terkumpul. Yuk mulai dari M1!" | L09 |

**Mata bulat dalam bingkai** (seperti gambar referensi): kacamata pelindung dua lensa dengan tali hitam
adalah ciri khas karakter Minions, jadi **bentuk persis itu tidak dipakai**. Idenya dipakai pada maskot
Gari (§7.1): dua mata bulat besar dengan pupil cokelat, garis tepi abu-abu tipis, **tanpa tali hitam
dan tanpa badan kuning berbentuk kapsul**. Mata Gari boleh dipakai sendiri sebagai ikon kecil, mis.
pada tombol Petunjuk ("Gari sedang melihat…").

**Token warna dekoratif** (hanya untuk ilustrasi, **tidak boleh** untuk tombol, teks, atau status):

| Token | Hex | Fungsi |
|---|---|---|
| `decor-yellow` | `#F2C94C` | Isi pisang |
| `decor-yellow-dark` | `#D4A72C` | Bayangan pisang |
| `decor-outline` | `#2B2B2B` | Garis tepi ilustrasi |
| `decor-eye` | `#8B5A2B` | Pupil mata Gari |

Kuning dipakai lembut, tidak neon, dan tidak pernah di layar materi, latihan, atau Lab Garis
(DS03: warna mencolok mengganggu).

### 7.3 Batasan penempatan (berdasarkan temuan wawancara)

Siswa S01 menyatakan **warna mencolok mengganggu** (DS03). Teori beban kognitif juga menunjukkan
gambar menarik yang tidak berkaitan dengan materi (*seductive details*) dapat menurunkan pemahaman,
karena menambah beban ekstrinsik. Karena itu dekorasi diatur per layar:

| Layar | Maskot | Ornamen | Gambar pendukung |
|---|---|---|---|
| L01 Sambutan, L02 Beranda | ✓ ukuran besar | ✓ | ✓ |
| L09 Rekap, status kosong | ✓ | ✓ | — |
| L03 Kartu Pelajaran | Kecil (≤ 48 px), hanya di panel petunjuk | ✗ | Hanya gambar yang **menjelaskan materi** (grafik, ilustrasi konteks soal) |
| L04 Lab Garis | ✗ | ✗ | ✗ (grafik adalah fokus) |
| L05–L07 Contoh & Latihan | Kecil, hanya di panel petunjuk | ✗ | Hanya ilustrasi konteks soal cerita (mis. sepeda, mesin fotokopi), bergaya datar dan berwarna netral |
| L08 Mental Effort, L10 Penelitian | ✗ | ✗ | ✗ |

Aturan umum:
- Dekorasi **tidak bergerak sendiri**. Animasi maskot hanya muncul saat dipicu siswa, ≤ 1 detik (EL04).
- Dekorasi **tidak menambah warna aksen baru** (§1). Warna `decor-*` hanya untuk ilustrasi (§7.2a).
- Setiap gambar dekoratif memakai `alt=""` (diabaikan pembaca layar). Ilustrasi konteks soal memakai alt deskriptif.
- Saat uji one-to-one, tanyakan ke siswa apakah maskot dan ornamen membantu atau mengganggu, lalu catat sebagai bahan revisi.
