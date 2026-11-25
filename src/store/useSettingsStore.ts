import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FontScale = 'normal' | 'large';
export type Theme = 'system' | 'light' | 'dark';

interface SettingsState {
  fontScale: FontScale;
  theme: Theme;
  /**
   * Gari AI (Google Gemini) — MODE UJI, bawaan nonaktif. Ketentuan Gemini API melarang pemakaian oleh
   * pengguna di bawah 18 tahun, jadi hanya guru/peneliti dewasa yang mengaktifkannya (docs/09 §2a).
   */
  aiEnabled: boolean;
  /** Kode uji dari pengelola (dicocokkan dengan GARI_TEST_TOKEN di server). Disimpan hanya di perangkat ini. */
  aiTestToken: string;
  setAiEnabled: (v: boolean) => void;
  setAiTestToken: (v: string) => void;
  setFontScale: (v: FontScale) => void;
  setTheme: (v: Theme) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      fontScale: 'normal',
      theme: 'system',
      aiEnabled: false,
      aiTestToken: '',
      setAiEnabled: (aiEnabled) => set({ aiEnabled }),
      setAiTestToken: (aiTestToken) => set({ aiTestToken: aiTestToken.trim() }),
      setFontScale: (fontScale) => set({ fontScale }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'garisku-settings', storage: createJSONStorage(() => localStorage) },
  ),
);
