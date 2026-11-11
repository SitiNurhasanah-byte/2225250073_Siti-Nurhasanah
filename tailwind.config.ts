import type { Config } from 'tailwindcss';

// Token warna diambil dari docs/04-desain-ui-ux.md §1 dan §7.2a.
// Nilai sebenarnya ada di src/styles/index.css (variabel CSS, mendukung mode gelap).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        text: token('text'),
        muted: token('muted'),
        border: token('border'),
        accent: token('accent'),
        'accent-soft': token('accent-soft'),
        success: token('success'),
        error: token('error'),
        'hint-fg': token('hint-fg'),
        'hint-bg': token('hint-bg'),
      },
      borderRadius: {
        card: '12px',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
