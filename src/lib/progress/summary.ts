import type { Attempt, EffortRating } from '../../store/useProgressStore';

/** Skor terbaik per langkah (itemId + stepIndex) untuk satu modul. */
export function bestStepScores(attempts: Attempt[], moduleId: string): Map<string, number> {
  const best = new Map<string, number>();
  for (const a of attempts) {
    if (a.moduleId !== moduleId) continue;
    const k = `${a.itemId}#${a.stepIndex}`;
    best.set(k, Math.max(best.get(k) ?? 0, a.stageScore));
  }
  return best;
}

export function sumScores(scores: Map<string, number>): number {
  let total = 0;
  for (const v of scores.values()) total += v;
  return total;
}

/** Jumlah petunjuk maksimum yang dipakai per soal di satu modul. */
export function hintsUsed(attempts: Attempt[], moduleId: string): number {
  const perItem = new Map<string, number>();
  for (const a of attempts) {
    if (a.moduleId !== moduleId) continue;
    perItem.set(a.itemId, Math.max(perItem.get(a.itemId) ?? 0, a.hintsUsed));
  }
  let total = 0;
  for (const v of perItem.values()) total += v;
  return total;
}

/** Kode miskonsepsi yang paling sering muncul (untuk "konsep yang perlu diulang"). */
export function topMisconceptions(attempts: Attempt[], moduleId?: string, limit = 3): Array<{ code: string; count: number }> {
  const counts = new Map<string, number>();
  for (const a of attempts) {
    if (!a.misconceptionCode || (moduleId && a.moduleId !== moduleId)) continue;
    counts.set(a.misconceptionCode, (counts.get(a.misconceptionCode) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code))
    .slice(0, limit);
}

/** Skor usaha mental terakhir untuk modul (skala Paas 1–9). */
export function lastEffort(efforts: EffortRating[], moduleId: string): number | null {
  for (let i = efforts.length - 1; i >= 0; i--) if (efforts[i].moduleId === moduleId) return efforts[i].score;
  return null;
}
