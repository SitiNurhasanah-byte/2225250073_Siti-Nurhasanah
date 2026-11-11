import { describe, expect, it } from 'vitest';
import { bestStepScores, hintsUsed, lastEffort, sumScores, topMisconceptions } from './summary';
import { csvEscape, toCsv } from '../export/exportData';
import type { Attempt } from '../../store/useProgressStore';

const base: Attempt = {
  itemId: 'BS-3', moduleId: 'M5', stage: 2, stepIndex: 1, answer: '', correct: false,
  hintsUsed: 0, viewedSolution: false, durationMs: 1000, stageScore: 0, timestamp: '',
};

describe('ringkasan kemajuan', () => {
  const attempts: Attempt[] = [
    { ...base, misconceptionCode: 'M-GRAD-01', hintsUsed: 1 },
    { ...base, correct: true, stageScore: 1, hintsUsed: 2 },
    { ...base, stepIndex: 2, misconceptionCode: 'M-GRAD-01' },
    { ...base, stepIndex: 2, misconceptionCode: 'M-ALJ-01' },
    { ...base, moduleId: 'M4', misconceptionCode: 'M-OP-01' },
  ];
  it('skor terbaik per langkah', () => {
    expect(sumScores(bestStepScores(attempts, 'M5'))).toBe(1);
  });
  it('petunjuk maksimum per soal', () => {
    expect(hintsUsed(attempts, 'M5')).toBe(2);
  });
  it('miskonsepsi terbanyak', () => {
    expect(topMisconceptions(attempts, 'M5')).toEqual([
      { code: 'M-GRAD-01', count: 2 },
      { code: 'M-ALJ-01', count: 1 },
    ]);
    expect(topMisconceptions(attempts).length).toBe(3);
  });
  it('usaha mental terakhir', () => {
    expect(lastEffort([{ moduleId: 'M1', score: 4, timestamp: '' }, { moduleId: 'M1', score: 6, timestamp: '' }], 'M1')).toBe(6);
    expect(lastEffort([], 'M1')).toBeNull();
  });
});

describe('CSV', () => {
  it('meng-escape koma, kutip, dan baris baru', () => {
    expect(csvEscape('a,b')).toBe('"a,b"');
    expect(csvEscape('kata "x"')).toBe('"kata ""x"""');
    expect(csvEscape(undefined)).toBe('');
    expect(toCsv(['a', 'b'], [[1, 'y = 2x, x = 5']])).toBe('a,b\n1,"y = 2x, x = 5"');
  });
});
