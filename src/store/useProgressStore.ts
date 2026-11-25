import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Indicator } from '../lib/content/schema';

/** Alur modul RMT: alat → kartu → contoh → latihan → jurnal → usaha → selesai (docs/11 §5). */
export type Phase = 'alat' | 'kartu' | 'contoh' | 'latihan' | 'jurnal' | 'usaha' | 'selesai';

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

/** Jurnal refleksi RMT (docs/11 §3): metakognisi setelah latihan. */
export interface JournalEntry {
  moduleId: string;
  functions: string[];
  explanation: string;
  toolId: string;
  toolReason: string;
  easiest: string;
  hardest: string;
  aiFeedback?: string;
  timestamp: string;
}

export type AiMode = 'hint' | 'evidence' | 'journal';

/** Catatan percakapan dengan Gari AI (tanpa identitas siswa). */
export interface AiLog {
  moduleId: string;
  itemId?: string;
  stage?: number;
  mode: AiMode;
  question: string;
  reply: string;
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
  journals: JournalEntry[];
  toolChecks: Record<string, boolean>;
  aiLogs: AiLog[];
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
  saveJournal: (entry: Omit<JournalEntry, 'timestamp'>) => void;
  markToolChecked: (toolId: string, correct: boolean) => void;
  addAiLog: (log: Omit<AiLog, 'timestamp'>) => void;
  setResearchMode: (on: boolean) => void;
  markTest: (test: 'pretest' | 'posttest', done: boolean) => void;
  saveResearchScore: (score: ResearchScore) => void;
  resetAll: () => void;
}

const now = () => new Date().toISOString();

export const defaultModuleProgress: ModuleProgress = {
  phase: 'alat',
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
  journals: [],
  toolChecks: {},
  aiLogs: [],
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
      saveJournal: (entry) =>
        set((state) => ({
          journals: [...state.journals.filter((j) => j.moduleId !== entry.moduleId), { ...entry, timestamp: now() }],
        })),
      markToolChecked: (toolId, correct) =>
        set((state) => ({ toolChecks: { ...state.toolChecks, [toolId]: state.toolChecks[toolId] || correct } })),
      addAiLog: (log) => set((state) => ({ aiLogs: [...state.aiLogs, { ...log, timestamp: now() }].slice(-200) })),
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
