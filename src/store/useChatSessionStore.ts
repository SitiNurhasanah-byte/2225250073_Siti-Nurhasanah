import { create } from 'zustand';
import type { ChatTurn } from '../lib/ai/prompt';

/**
 * Riwayat percakapan Gari AI selama sesi belajar (TIDAK disimpan permanen; hilang saat aplikasi ditutup).
 * Kunci: modul:soal:tahap:mode, sehingga setiap langkah punya utas sendiri.
 * Catatan permanen untuk peneliti tetap ada di `aiLogs` (useProgressStore).
 */
interface ChatSessionState {
  threads: Record<string, ChatTurn[]>;
  append: (key: string, turns: ChatTurn[]) => void;
}

export const useChatSessionStore = create<ChatSessionState>()((set) => ({
  threads: {},
  append: (key, turns) => set((s) => ({ threads: { ...s.threads, [key]: [...(s.threads[key] ?? []), ...turns] } })),
}));

export function threadKey(moduleId: string, itemId: string | undefined, stage: number | undefined, mode: string): string {
  return `${moduleId}:${itemId ?? 'jurnal'}:${stage ?? 0}:${mode}`;
}
