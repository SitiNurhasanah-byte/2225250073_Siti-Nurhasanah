# 05 — Arsitektur Teknis

## 1. Keputusan Utama

| Keputusan | Pilihan | Alasan | Alternatif yang ditolak |
|---|---|---|---|
| Satu basis kode untuk web & Android | **PWA (React + Vite) + Capacitor** | Satu kode, bisa di-install dari browser, dan dibungkus jadi APK untuk Play Store/sideload | Flutter (kurva belajar Dart), React Native (web kurang matang), Kotlin native (tidak ada versi web) |
| Bahasa | **TypeScript** | Tipe aman untuk logika matematika | JavaScript murni |
| UI | **React 18 + Tailwind CSS** | Ekosistem besar, mudah dibantu AI | — |
| Grafik | **SVG kustom** | Ringan, kendali penuh atas highlight & interaksi | JSXGraph/GeoGebra embed (berat, sulit dikustom, GeoGebra butuh online) |
| Matematika | **KaTeX** | Cepat, bisa offline | MathJax (lebih berat) |
| State | **Zustand** | Sederhana | Redux (berlebihan) |
| Penyimpanan | **IndexedDB via Dexie** | Offline, kapasitas cukup | localStorage (terbatas, sinkron) |
| Backend | **Tidak ada (v1)** | Privasi, offline, tanpa biaya server | Firebase/Supabase (v2 untuk dasbor guru) |
| Hosting web | **GitHub Pages / Netlify / Vercel** (gratis) | Statis | — |

## 2. Diagram Arsitektur

```
┌──────────────────────── Perangkat Siswa ───────────────────────┐
│  ┌──────────── UI (React) ────────────┐                          │
│  │ features/lesson  lab  practice ... │                          │
│  └──────┬─────────────────┬───────────┘                          │
│         │                 │                                       │
│  ┌──────▼──────┐   ┌──────▼──────────┐   ┌───────────────────┐   │
│  │ store       │   │ lib/math        │   │ content/*.json    │   │
│  │ (Zustand)   │   │ lib/feedback    │◄──┤ (dibundel, Zod)   │   │
│  └──────┬──────┘   └─────────────────┘   └───────────────────┘   │
│  ┌──────▼──────────────┐   ┌───────────────────────────────┐     │
│  │ lib/db (Dexie)      │   │ Service Worker (vite-plugin-pwa)│    │
│  │ IndexedDB lokal     │   │ cache aset & konten → offline  │    │
│  └──────┬──────────────┘   └───────────────────────────────┘     │
│         └──► Ekspor JSON/CSV (manual) ──► Peneliti               │
│  Web: browser   |   Android: Capacitor WebView (APK)             │
└──────────────────────────────────────────────────────────────────┘
```

## 3. Struktur Folder

```
garisku/
├── CLAUDE.md
├── PRD.md
├── docs/
├── content/
│   ├── glossary.json
│   ├── modules/
│   │   ├── m1-titik-koordinat.json
│   │   ├── m2-persamaan-ke-grafik.json
│   │   └── ...
│   ├── bank/             # BS-1…BS-4, LT-* (group: "learning")
│   ├── research/         # PT-1…PT-4 (group: "research-posttest") — TIDAK dibundel ke aplikasi
│   └── misconceptions.json
├── public/
│   ├── icons/            # ikon PWA & Android
│   └── videos/           # (opsional)
├── src/
│   ├── main.tsx
│   ├── app/              # App.tsx, router.tsx, Layout.tsx
│   ├── features/
│   │   ├── home/
│   │   ├── lesson/       # LessonPlayer, LessonCard
│   │   ├── lab/          # LineLab, SlopeTriangle, ValueTable
│   │   ├── worked-example/
│   │   ├── practice/     # PracticeSession, question-types/*
│   │   ├── story/        # StoryAnnotator
│   │   ├── progress/     # Recap, MentalEffortScale
│   │   ├── research/     # Status penelitian & input skor tes kertas (untuk peneliti)
│   │   └── settings/     # Settings, DataExport
│   ├── components/       # Button, Card, MathText, Keypad, HintPanel, Feedback, CartesianPlane
│   ├── lib/
│   │   ├── math/         # fraction.ts, line.ts, slope.ts, parse.ts, equivalence.ts
│   │   ├── feedback/     # diagnose.ts
│   │   ├── content/      # schema.ts (Zod), loader.ts
│   │   └── db/           # db.ts, repositories
│   ├── store/            # useProgressStore.ts, useSettingsStore.ts
│   └── styles/index.css
├── tests/e2e/
├── capacitor.config.ts
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## 4. Modul Logika Matematika (`src/lib/math`)

| File | Fungsi utama |
|---|---|
| `fraction.ts` | `Fraction` (pembilang/penyebut, sederhanakan, operasi +−×÷, `toString()` → "1/3", "−2") |
| `parse.ts` | `parseNumber("0,5" \| "1/2" \| "−3" \| "17.000" \| "Rp17.000")`, `parseLinearEquation("y = 2.000x + 5.000")` → `{a, b, c}` |
| `line.ts` | `evaluate(m, c, x)`, `solveForX(m, c, y)`, `lineFromPointSlope(p, m)`, `lineFromTwoPoints(p1, p2)`, `intersect(l1, l2)`, `isPointOnLine` |
| `slope.ts` | `slopeFromTwoPoints`, `slopeFromGeneralForm(a, b)`, `isParallel`, `isPerpendicular` |
| `equivalence.ts` | `areEquivalentLines(input, expected)` — normalisasi ke `ax + by + c = 0` dengan FPB |

Garis vertikal (`x = k`, gradien tak terdefinisi) harus ditangani eksplisit.

**Aturan `parseNumber` (format Indonesia):** awalan `Rp` dan spasi diabaikan. Titik diikuti tepat
3 digit berulang (`1.000`, `17.000`, `1.250.000`) dibaca sebagai **pemisah ribuan**. Koma dibaca sebagai
**desimal** (`0,5`). Titik yang tidak mengikuti pola ribuan (`0.5`, `2.25`) dibaca sebagai desimal.
Pecahan `a/b` dan minus `−`/`-` diterima. Karena soal bank memakai nilai rupiah, kasus `1.000` **selalu**
dibaca seribu.

## 5. Model Data (IndexedDB)

```ts
interface Student {         // satu per perangkat (v1)
  code: string;             // "S01" — tanpa nama
  createdAt: string;        // ISO
  className?: string;       // "IX-A" (opsional)
}

interface LessonProgress {
  moduleId: string;         // "M3"
  lastCardIndex: number;
  completed: boolean;
  updatedAt: string;
}

interface Attempt {
  id?: number;
  itemId: string;           // "M2-L03"
  moduleId: string;
  context: "practice";      // pretest/posttest dikerjakan di kertas
  stage?: number;           // tahap pada soal bertahap (BS/LT)
  stageScore?: number;      // skor tahap sesuai rubrik
  answer: string;
  correct: boolean;
  misconceptionCode?: string;
  hintsUsed: 0 | 1 | 2 | 3;
  viewedSolution: boolean;
  durationMs: number;
  timestamp: string;
}

interface EffortRating {
  id?: number;
  moduleId: string;
  setId: string;
  score: 1|2|3|4|5|6|7|8|9; // skala Paas
  timestamp: string;
}

interface ResearchScore {   // diinput peneliti dari lembar tes kertas (opsional)
  id?: number;
  test: "pretest" | "posttest";
  itemId: string;           // "BS-1" … "BS-4" atau "PT-1" … "PT-4"
  indicator: "reason" | "formulate" | "employ" | "interpret";
  stageScores: number[];    // mis. [1, 2, 1, 0, 1]
  total: number;            // 0–6
  enteredAt: string;
}

interface Settings {
  fontScale: "normal" | "large";
  theme: "light" | "dark" | "system";
  sound: boolean;
}
```

Ekspor CSV: satu file `attempts.csv`, satu file `effort.csv`, masing-masing berkolom `studentCode` di awal.
Sertakan `schemaVersion` dan `appVersion` pada ekspor JSON.

## 6. PWA & Offline

- `vite-plugin-pwa` dengan strategi `generateSW`, precache seluruh aset + `content/*.json`.
- Video: `CacheFirst` dengan batas jumlah; tidak di-precache (unduh saat ditonton pertama kali).
- `manifest.webmanifest`: nama "GarisKu", `display: standalone`, `orientation: portrait`, ikon 192/512.
- Banner pembaruan: "Versi baru tersedia — muat ulang" (tidak memaksa).

## 7. Build Android (Capacitor)

```bash
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap init GarisKu id.ac.<kampus>.garisku --web-dir=dist
npm run build && npx cap add android
npx cap sync android && npx cap open android   # Build → Generate Signed APK/AAB
```

- `minSdkVersion` 26 (Android 8.0). Simpan keystore di luar repo.
- Ekspor file di Android memakai `@capacitor/filesystem` + `@capacitor/share` (pengganti unduhan browser).
- Tombol "kembali" Android ditangani dengan `@capacitor/app` (`backButton` → navigasi mundur).

## 8. Kualitas & Tooling

- ESLint + Prettier; `tsc --noEmit` di CI.
- GitHub Actions: lint → test → build pada setiap push; deploy otomatis ke GitHub Pages dari `main`.
- Skrip `validate:content` memvalidasi semua JSON terhadap skema Zod dan memastikan setiap `answer`
  benar menurut `lib/math` (konten tidak boleh salah kunci).

## 9. Rencana v2 (di luar MVP)

- Backend Supabase: akun guru, kelas, sinkronisasi data siswa, dasbor guru.
- Modul tambahan: Relasi & Fungsi, SPLDV.
- Penyesuaian adaptif (tingkat fading berdasarkan performa).
