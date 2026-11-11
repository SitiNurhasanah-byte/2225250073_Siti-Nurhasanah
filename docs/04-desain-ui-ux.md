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


### Elemen Dekoratif Aplikasi

Elemen dekoratif digunakan untuk memperindah tampilan aplikasi agar lebih menarik dan nyaman digunakan oleh siswa. Elemen ini tidak berfungsi sebagai materi pembelajaran, melainkan sebagai pendukung visual.

Beberapa elemen dekoratif yang digunakan meliputi:

1. Ilustrasi atau karakter kartun pada halaman utama.
2. Ornamen geometris sebagai latar belakang.
3. Ikon dekoratif pada menu aplikasi.
4. Gambar pendukung untuk mempercantik halaman materi dan kuis.

Pemilihan elemen dekoratif disesuaikan dengan tema warna dan karakteristik siswa SMP agar tampilan aplikasi terlihat menarik, sederhana, dan tidak mengganggu fokus belajar.
