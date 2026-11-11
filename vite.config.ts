import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Path relatif agar bisa dibuka dari GitHub Pages maupun WebView Capacitor.
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      manifest: {
        name: 'GarisKu — Belajar Persamaan Garis Lurus',
        short_name: 'GarisKu',
        description: 'Belajar Persamaan Garis Lurus langkah demi langkah untuk siswa SMP.',
        lang: 'id',
        theme_color: '#2563EB',
        background_color: '#F8F9FB',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        icons: [
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        // woff2 didukung semua browser modern (termasuk iOS Safari), jadi woff/ttf tidak perlu disimpan offline.
        globPatterns: ['**/*.{js,css,html,svg,woff2,json}'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          katex: ['katex'],
          zod: ['zod'],
        },
      },
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
