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
