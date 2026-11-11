import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type FontScale = 'normal' | 'large';
export type Theme = 'system' | 'light' | 'dark';

interface SettingsState {
  fontScale: FontScale;
  theme: Theme;
  setFontScale: (v: FontScale) => void;
  setTheme: (v: Theme) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      fontScale: 'normal',
      theme: 'system',
      setFontScale: (fontScale) => set({ fontScale }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'garisku-settings', storage: createJSONStorage(() => localStorage) },
  ),
);
