# 09 — Risiko, Privasi & Etika Penelitian

## 1. Register Risiko

| ID | Risiko | Peluang | Dampak | Mitigasi |
|---|---|---|---|---|
| R01 | Temuan kebutuhan bias karena hanya 1 responden | Tinggi | Tinggi | Tambah 3–5 siswa + 1 guru (docs/01 §9) |
| R02 | Cakupan fitur terlalu besar untuk 1 pengembang | Tinggi | Tinggi | Patuhi MoSCoW; F6–F8 hanya jika MVP selesai; sprint buffer |
| R03 | Kunci jawaban/konten salah | Sedang | Tinggi | `validate:content` otomatis + validasi ahli materi |
| R04 | HP siswa tidak mendukung / memori penuh | Sedang | Sedang | PWA ringan sebagai alternatif APK; uji di HP RAM 2 GB |
| R05 | Tidak ada internet di sekolah | Sedang | Sedang | Offline-first; bagikan APK lewat kabel/Bluetooth/flashdisk |
| R06 | Jadwal uji coba bentrok dengan ujian sekolah | Sedang | Tinggi | Koordinasi dengan sekolah sejak tahap Design |
| R07 | Data penelitian hilang di perangkat siswa | Sedang | Tinggi | Ekspor data di akhir setiap sesi uji coba; siapkan HP cadangan |
| R08 | Ketergantungan berlebih pada AI coding assistant tanpa memahami kode | Sedang | Sedang | Baca & uji setiap kode; logika matematika wajib unit test; catat keputusan |
| R09 | Video melanggar hak cipta | Rendah | Sedang | Buat video sendiri atau minta izin tertulis |
| R11 | Memakai gambar karakter berhak cipta (mis. Minions) sebagai dekorasi | Sedang | Tinggi | Maskot orisinal "Gari" (`docs/04` §7.1); hanya aset buatan sendiri atau berlisensi bebas |
| R12 | Dekorasi berlebihan menambah beban ekstrinsik | Sedang | Sedang | Batasan per layar (`docs/04` §7.3); evaluasi saat uji one-to-one |
| R10 | Siswa menebak tanpa berpikir | Sedang | Sedang | Petunjuk bertingkat, tidak menampilkan kunci langsung, prompt self-explanation |

## 2. Privasi Data Anak

- Subjek adalah anak di bawah umur → **data minimal**.
- Hanya **kode siswa** (S01, S02, …); daftar pemetaan kode ↔ nama disimpan terpisah oleh peneliti
  (offline, terkunci), tidak pernah di dalam aplikasi.
- Tidak ada login, tidak ada analitik pihak ketiga, tidak ada iklan.
- Data tersimpan di perangkat; keluar hanya melalui ekspor manual oleh peneliti.
- Foto dokumentasi (seperti di laporan wawancara S01): gunakan hanya untuk laporan, pertimbangkan
  mengaburkan wajah bila dipublikasikan.
- Rekaman wawancara disimpan aman dan dihapus setelah penelitian selesai sesuai kesepakatan.

## 2a. Risiko Gari AI (Google Gemini)

> **Temuan penting** (diperiksa 25-11-2026; Gemini API Additional Terms, berlaku sejak 23-03-2026):
> - *"You must be 18 years of age or older to use the APIs. You also will not use the Services as part of a
>   website, application, or other service … that is directed towards or is likely to be accessed by
>   individuals under the age of 18."*
> - Pada versi gratis (*Unpaid Services*), Google memakai isi permintaan dan jawabannya untuk mengembangkan
>   produk. Peninjau manusia dapat membacanya, dan Google meminta agar tidak mengirim informasi pribadi.
>
> **Keputusan:** Gari AI berjalan dalam **mode uji**.
> - Bawaan nonaktif; server menolak permintaan tanpa kode `GARI_TEST_TOKEN`.
> - Kode uji hanya diberikan kepada guru/peneliti dewasa.
> - Pemakaian oleh siswa perlu dibahas dengan dosen pembimbing, dan memerlukan penyedia/ketentuan yang
>   mengizinkan pengguna di bawah 18 tahun.

| Risiko | Mitigasi |
|---|---|
| Melanggar ketentuan Gemini API (pengguna < 18 tahun) | Mode uji dengan kode yang dicek di server; bawaan nonaktif; kode tidak dibagikan ke siswa |
| Teks terkirim ke layanan AI pihak ketiga dan dipakai Google (versi gratis) | Tanpa kode siswa; email/nomor HP disamarkan di perangkat dan server; peringatan "jangan tulis data pribadi"; hanya diuji oleh orang dewasa |
| AI membocorkan jawaban sehingga mengurangi usaha berpikir | Prompt sistem melarang; kunci tidak dikirim pada mode *Tanya Gari*; penyaring kebocoran di perangkat |
| AI memberi penjelasan keliru | Tanggapan singkat berupa pertanyaan; konten inti tetap dari JSON tervalidasi; guru meninjau `*-ai.csv` |
| Penyalahgunaan endpoint / kuota gratis habis | Kode uji, daftar origin, batas teks, `maxOutputTokens` 512, batas laju per IP, model cadangan; **jangan menautkan billing** agar tetap di Free Tier tanpa biaya |
| Kunci API bocor | Hanya di env var Netlify; tidak ada di repo, bundel, atau APK; ganti kunci jika dicurigai bocor |
| Tidak ada internet | Gari AI menampilkan pesan ramah; petunjuk bertingkat tetap tersedia offline |
| Bias perlakuan dalam penelitian | Catat apakah Gari AI aktif per kelas; pakai pengaturan yang sama untuk semua siswa satu kelompok |

## 3. Etika Penelitian

- [ ] Surat izin penelitian dari kampus → sekolah
- [ ] Persetujuan kepala sekolah & guru mata pelajaran
- [ ] *Informed consent* orang tua/wali dan *assent* (persetujuan) siswa, dengan bahasa yang mudah dipahami
- [ ] Siswa boleh menolak/berhenti kapan saja tanpa konsekuensi nilai
- [ ] Hasil aplikasi **tidak** dipakai untuk nilai rapor
- [ ] Rekaman hanya dengan persetujuan (sudah dilakukan untuk S01 ✓)

## 4. Lisensi

- Kode: lisensi terbuka (mis. MIT) bila ingin dibagikan.
- Konten (teks/soal/video): CC BY-SA 4.0 atau sesuai kebijakan kampus.
- Font & ikon: gunakan yang berlisensi bebas (Inter — OFL; ikon Lucide — ISC).
