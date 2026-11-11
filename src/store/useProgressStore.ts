import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Indicator } from '../lib/content/schema';

export type Phase = 'kartu' | 'contoh' | 'latihan' | 'usaha' | 'selesai';

export interface ModuleProgress {
  phase: Phase;
  cardIndex: number;
  practiceIndex: number;
  completed: boolean;
  updatedAt: string;
}

export interface Attempt {
  itemId: string;
  moduleId: string;
  stage: number;
  stepIndex: number;
  answer: string;
  correct: boolean;
  misconceptionCode?: string;
  hintsUsed: number;
  viewedSolution: boolean;
  durationMs: number;
  stageScore: number;
  timestamp: string;
}

export interface EffortRating {
  moduleId: string;
  score: number;
  timestamp: string;
}

export interface ResearchScore {
  test: 'pretest' | 'posttest';
  itemId: string;
  indicator: Indicator;
  stageScores: number[];
  total: number;
  enteredAt: string;
}

export interface ProgressState {
  studentCode: string | null;
  className: string;
  modules: Record<string, ModuleProgress>;
  attempts: Attempt[];
  efforts: EffortRating[];
  lastModuleId: string | null;
  researchMode: boolean;
  pretestDoneAt: string | null;
  posttestDoneAt: string | null;
  researchScores: ResearchScore[];
}

interface ProgressActions {
  setStudent: (code: string, className: string) => void;
  updateModule: (id: string, patch: Partial<ModuleProgress>) => void;
  addAttempt: (attempt: Attempt) => void;
  addEffort: (moduleId: string, score: number) => void;
  setResearchMode: (on: boolean) => void;
  markTest: (test: 'pretest' | 'posttest', done: boolean) => void;
  saveResearchScore: (score: ResearchScore) => void;
  resetAll: () => void;
}

const now = () => new Date().toISOString();

export const defaultModuleProgress: ModuleProgress = {
  phase: 'kartu',
  cardIndex: 0,
  practiceIndex: 0,
  completed: false,
  updatedAt: '',
};

const initialState: ProgressState = {
  studentCode: null,
  className: '',
  modules: {},
  attempts: [],
  efforts: [],
  lastModuleId: null,
  researchMode: false,
  pretestDoneAt: null,
  posttestDoneAt: null,
  researchScores: [],
};

/**
 * Data belajar disimpan hanya di perangkat (localStorage), keluar hanya lewat ekspor manual.
 * Tidak ada nama lengkap — hanya kode siswa (CLAUDE.md §Privasi).
 */
export const useProgressStore = create<ProgressState & ProgressActions>()(
  persist(
    (set) => ({
      ...initialState,
      setStudent: (code, className) => set({ studentCode: code.trim().toUpperCase(), className: className.trim() }),
      updateModule: (id, patch) =>
        set((state) => ({
          lastModuleId: id,
          modules: {
            ...state.modules,
            [id]: { ...defaultModuleProgress, ...state.modules[id], ...patch, updatedAt: now() },
          },
        })),
      addAttempt: (attempt) => set((state) => ({ attempts: [...state.attempts, attempt] })),
      addEffort: (moduleId, score) =>
        set((state) => ({ efforts: [...state.efforts, { moduleId, score, timestamp: now() }] })),
      setResearchMode: (on) => set({ researchMode: on }),
      markTest: (test, done) =>
        set(test === 'pretest' ? { pretestDoneAt: done ? now() : null } : { posttestDoneAt: done ? now() : null }),
      saveResearchScore: (score) =>
        set((state) => ({
          researchScores: [
            ...state.researchScores.filter((s) => !(s.test === score.test && s.itemId === score.itemId)),
            score,
          ],
        })),
      resetAll: () => set({ ...initialState }),
    }),
    { name: 'garisku-progress', version: 1, storage: createJSONStorage(() => localStorage) },
  ),
);

export function selectModule(state: ProgressState, id: string): ModuleProgress {
  return state.modules[id] ?? defaultModuleProgress;
}

export function modulesLocked(state: ProgressState): boolean {
  return state.researchMode && !state.pretestDoneAt;
}
