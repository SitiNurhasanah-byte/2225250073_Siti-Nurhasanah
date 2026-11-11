import type { ProgressState } from '../../store/useProgressStore';

export const APP_VERSION = '0.1.0';
export const SCHEMA_VERSION = 1;

export function csvEscape(value: unknown): string {
  const text = value === undefined || value === null ? '' : String(value);
  return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv(header: string[], rows: unknown[][]): string {
  return [header, ...rows].map((row) => row.map(csvEscape).join(',')).join('\n');
}

/** Semua data dalam satu file JSON (untuk arsip peneliti). */
export function buildJson(state: ProgressState): string {
  const { studentCode, className, modules, attempts, efforts, researchMode, pretestDoneAt, posttestDoneAt, researchScores } = state;
  return JSON.stringify(
    {
      schemaVersion: SCHEMA_VERSION,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      studentCode,
      className,
      modules,
      attempts,
      efforts,
      research: { researchMode, pretestDoneAt, posttestDoneAt, scores: researchScores },
    },
    null,
    2,
  );
}

/** File CSV terpisah yang mudah dibuka di Excel/SPSS. Kolom pertama selalu kode siswa. */
export function buildCsvFiles(state: ProgressState): Array<{ name: string; content: string }> {
  const code = state.studentCode ?? '';
  const prefix = code || 'siswa';
  return [
    {
      name: `${prefix}-attempts.csv`,
      content: toCsv(
        ['studentCode', 'moduleId', 'itemId', 'stage', 'stepIndex', 'answer', 'correct', 'misconceptionCode', 'hintsUsed', 'viewedSolution', 'durationMs', 'stageScore', 'timestamp'],
        state.attempts.map((a) => [code, a.moduleId, a.itemId, a.stage, a.stepIndex, a.answer, a.correct ? 1 : 0, a.misconceptionCode, a.hintsUsed, a.viewedSolution ? 1 : 0, a.durationMs, a.stageScore, a.timestamp]),
      ),
    },
    {
      name: `${prefix}-effort.csv`,
      content: toCsv(['studentCode', 'moduleId', 'score', 'timestamp'], state.efforts.map((e) => [code, e.moduleId, e.score, e.timestamp])),
    },
    {
      name: `${prefix}-research.csv`,
      content: toCsv(
        ['studentCode', 'test', 'itemId', 'indicator', 'stageScores', 'total', 'enteredAt'],
        state.researchScores.map((r) => [code, r.test, r.itemId, r.indicator, r.stageScores.join('|'), r.total, r.enteredAt]),
      ),
    },
  ];
}
