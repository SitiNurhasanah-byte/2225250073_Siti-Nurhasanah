import { describe, expect, it } from 'vitest';
import { checkStep } from './diagnose';
import { formatAnswer, prettifyEquation } from './format';
import { content, getItem } from '../content/loader';
import type { Step } from '../content/schema';

const catalog = content.misconceptions;

function step(itemId: string, stage: number, nth = 0): Step {
  const item = getItem(itemId);
  if (!item) throw new Error(`Butir ${itemId} tidak ada`);
  return item.steps.filter((s) => s.stage === stage)[nth];
}

describe('checkStep — kasus docs/08 §3', () => {
  it('FB01 BS-3 T5: 10 → lupa −1 (M-OP-02)', () => {
    expect(checkStep(step('BS-3', 5), { kind: 'number', text: '10' }, catalog).code).toBe('M-OP-02');
  });
  it('FB02 BS-3 T5: 8 → M-OP-01', () => {
    expect(checkStep(step('BS-3', 5), { kind: 'number', text: '8' }, catalog).code).toBe('M-OP-01');
  });
  it('FB03 BS-3 T2: 1/2 → gradien terbalik', () => {
    expect(checkStep(step('BS-3', 2), { kind: 'number', text: '1/2' }, catalog).code).toBe('M-GRAD-01');
    expect(checkStep(step('BS-3', 2), { kind: 'number', text: '0,5' }, catalog).code).toBe('M-GRAD-01');
  });
  it('FB04 BS-3 T3: 7 → salah pindah ruas', () => {
    expect(checkStep(step('BS-3', 3), { kind: 'number', text: '7' }, catalog).code).toBe('M-ALJ-01');
  });
  it('FB05/FB06 BS-2', () => {
    expect(checkStep(step('BS-2', 3), { kind: 'number', text: 'Rp5.000' }, catalog).code).toBe('M-MODEL-02');
    expect(checkStep(step('BS-2', 2), { kind: 'number', text: '2.500' }, catalog).code).toBe('M-GRAD-06');
  });
  it('FB07 BS-4 T4: 12 → mengabaikan tabungan awal', () => {
    expect(checkStep(step('BS-4', 4), { kind: 'number', text: '12' }, catalog).code).toBe('M-INTERP-01');
  });
  it('FB08 BS-1 T5: memilih Paket B → M-KEP-01', () => {
    expect(checkStep(step('BS-1', 5), { kind: 'choice', index: 1 }, catalog).code).toBe('M-KEP-01');
  });
  it('FB09 BS-1 T3: 12.000 → lupa biaya awal', () => {
    expect(checkStep(step('BS-1', 3), { kind: 'number', text: '12.000' }, catalog).code).toBe('M-OP-02');
  });
  it('FB10 plot tertukar x–y → M-KOOR-01', () => {
    const plot = step('LT-M1-2', 2);
    expect(checkStep(plot, { kind: 'plot', points: [[-5, 3]] }, catalog).code).toBe('M-KOOR-01');
    expect(checkStep(plot, { kind: 'plot', points: [[3, 5]] }, catalog).code).toBe('M-KOOR-02');
    expect(checkStep(plot, { kind: 'plot', points: [[3, -5]] }, catalog).status).toBe('correct');
  });
  it('jawaban benar dalam berbagai format', () => {
    expect(checkStep(step('BS-1', 3), { kind: 'number', text: 'Rp17.000' }, catalog).status).toBe('correct');
    expect(checkStep(step('BS-1', 3), { kind: 'number', text: '17000' }, catalog).status).toBe('correct');
    expect(checkStep(step('BS-3', 4), { kind: 'equation', text: '2x - y - 1 = 0' }, catalog).status).toBe('correct');
    expect(checkStep(step('BS-1', 2, 0), { kind: 'equation', text: 'y = 2.000x + 5.000' }, catalog).status).toBe('correct');
  });
  it('persamaan yang tertukar m dan c dikenali', () => {
    expect(checkStep(step('BS-1', 2, 0), { kind: 'equation', text: 'y=5000x+2000' }, catalog).code).toBe('M-MODEL-01');
  });
  it('masukan tidak terbaca tidak dihitung salah', () => {
    expect(checkStep(step('BS-3', 5), { kind: 'number', text: 'sembilan' }, catalog).status).toBe('invalid');
    expect(checkStep(step('BS-3', 4), { kind: 'equation', text: '2x + 1' }, catalog).status).toBe('invalid');
  });
  it('salah tanpa pola memberi pesan umum yang ramah', () => {
    const result = checkStep(step('BS-3', 5), { kind: 'number', text: '42' }, catalog);
    expect(result.status).toBe('wrong');
    expect(result.code).toBeUndefined();
    expect(result.message).toMatch(/^Belum tepat\./);
  });
});

describe('format', () => {
  it('kunci jawaban tampil dalam format Indonesia', () => {
    expect(formatAnswer(step('BS-1', 3))).toBe('Rp17.000');
    expect(formatAnswer(step('BS-4', 4))).toBe('8 hari');
    expect(formatAnswer(step('BS-3', 4))).toBe('y = 2x − 1');
    expect(prettifyEquation('y = -2x + 20')).toBe('y = −2x + 20');
    expect(prettifyEquation('y = 2000x + 5000')).toBe('y = 2.000x + 5.000');
  });
});
