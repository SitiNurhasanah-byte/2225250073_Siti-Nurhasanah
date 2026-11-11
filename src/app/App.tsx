import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useProgressStore } from '../store/useProgressStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { Welcome } from '../features/onboarding/Welcome';
import { Home } from '../features/home/Home';
import { ModulePage } from '../features/module/ModulePage';
import { LineLab } from '../features/lab/LineLab';
import { RecapPage } from '../features/progress/RecapPage';
import { SettingsPage } from '../features/settings/SettingsPage';
import { ResearchPage } from '../features/research/ResearchPage';
import { useNativeBackButton } from './useNativeBackButton';

function useAppearance() {
  const { theme, fontScale } = useSettingsStore();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('font-large', fontScale === 'large');
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => root.classList.toggle('dark', theme === 'dark' || (theme === 'system' && media.matches));
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme, fontScale]);
}

function AppRoutes() {
  const studentCode = useProgressStore((s) => s.studentCode);
  useNativeBackButton();
  if (!studentCode) return <Welcome />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modul/:id/:phase?" element={<ModulePage />} />
      <Route path="/lab" element={<LineLab />} />
      <Route path="/rekap" element={<RecapPage />} />
      <Route path="/pengaturan" element={<SettingsPage />} />
      <Route path="/penelitian" element={<ResearchPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * HashRouter dipakai agar aplikasi berjalan sama di web statis (GitHub Pages),
 * PWA terpasang, dan WebView Capacitor (Android/iOS) tanpa konfigurasi server.
 */
export function App() {
  useAppearance();
  return (
    <HashRouter>
      <main className="relative mx-auto min-h-dvh max-w-xl px-4 pb-16 lg:max-w-5xl">
        <AppRoutes />
      </main>
    </HashRouter>
  );
}
