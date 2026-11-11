import { parseNumber } from '../math/parse';
import { areEquivalentLines } from '../math/equivalence';
import { parseLinearEquation } from '../math/parse';
import type { Step } from '../content/schema';

export type StepInput =
  | { kind: 'number'; text: string }
  | { kind: 'equation'; text: string }
  | { kind: 'choice'; index: number }
  | { kind: 'plot'; points: Array<[number, number]> };

export interface CheckResult {
  /** invalid = masukan belum terbaca (tidak dihitung sebagai salah). */
  status: 'correct' | 'wrong' | 'invalid';
  code?: string;
  message: string;
}

export type MisconceptionCatalog = Record<string, { title: string; message: string }>;

const GENERIC: Record<Step['kind'], string> = {
  number: 'Belum tepat. Cek lagi urutan hitungnya: kalikan dulu, baru tambah atau kurangi.',
  equation: 'Belum tepat. Cek lagi nilai gradien (m) dan konstanta (c).',
  choice: 'Belum tepat. Baca lagi pertanyaannya pelan-pelan, lalu coba pilihan lain.',
  plot: 'Beberapa titik belum tepat. Geser kanan/kiri dulu (x), baru atas/bawah (y).',
};

const key = (p: [number, number]) => `${p[0]},${p[1]}`;

function sameSet(a: Array<[number, number]>, b: Array<[number, number]>): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a.map(key));
  return b.every((p) => set.has(key(p)));
}

function diagnosePlot(answer: Array<[number, number]>, points: Array<[number, number]>): string | undefined {
  const swapped = answer.map(([x, y]) => [y, x] as [number, number]);
  if (sameSet(swapped, points)) return 'M-KOOR-01';
  const needed = new Set(answer.map(key));
  const wrong = points.filter((p) => !needed.has(key(p)));
  if (wrong.some(([x, y]) => needed.has(key([y, x])))) return 'M-KOOR-01';
  if (wrong.some(([x, y]) => needed.has(key([-x, y])) || needed.has(key([x, -y])) || needed.has(key([-x, -y])))) {
    return 'M-KOOR-02';
  }
  return undefined;
}

function matchMisconception(step: Step, input: StepInput): string | undefined {
  for (const m of step.misconceptions) {
    if (input.kind === 'number') {
      const a = parseNumber(input.text);
      const b = parseNumber(m.value);
      if (a && b && a.equals(b)) return m.code;
    } else if (input.kind === 'equation') {
      if (areEquivalentLines(input.text, m.value)) return m.code;
    } else if (input.kind === 'choice') {
      if (String(input.index) === m.value) return m.code;
    }
  }
  return undefined;
}

function isCorrect(step: Step, input: StepInput): boolean | null {
  switch (step.kind) {
    case 'number': {
      if (input.kind !== 'number') return null;
      const value = parseNumber(input.text);
      const expected = parseNumber(step.answer);
      if (!value || !expected) return null;
      return value.equals(expected);
    }
    case 'equation':
      if (input.kind !== 'equation' || !parseLinearEquation(input.text)) return null;
      return areEquivalentLines(input.text, step.answer);
    case 'choice':
      return input.kind === 'choice' ? input.index === step.answer : null;
    case 'plot':
      if (input.kind !== 'plot' || input.points.length === 0) return null;
      return sameSet(step.answer, input.points);
  }
}

const INVALID: Record<Step['kind'], string> = {
  number: 'Jawabanmu belum terbaca sebagai angka. Contoh penulisan: 17.000, −3, 1/2, atau 0,5.',
  equation: 'Tulis persamaannya seperti contoh ini: y = 2x − 1.',
  choice: 'Pilih salah satu jawaban dulu.',
  plot: 'Taruh titik dulu dengan mengetuk bidang Cartesius.',
};

/** Memeriksa satu langkah dan memberi umpan balik spesifik (docs/02 §5). */
export function checkStep(step: Step, input: StepInput, catalog: MisconceptionCatalog): CheckResult {
  const correct = isCorrect(step, input);
  if (correct === null) return { status: 'invalid', message: INVALID[step.kind] };
  if (correct) return { status: 'correct', message: 'Benar!' };

  let code = matchMisconception(step, input);
  if (!code && step.kind === 'plot' && input.kind === 'plot') {
    code = diagnosePlot(step.answer, input.points);
    if (!code && input.points.length !== step.answer.length) {
      return {
        status: 'wrong',
        message: `Jumlah titik belum sesuai. Kamu menaruh ${input.points.length} titik, yang diminta ${step.answer.length} titik.`,
      };
    }
  }
  const message = code && catalog[code] ? catalog[code].message : GENERIC[step.kind];
  return { status: 'wrong', code, message: `Belum tepat. ${message.replace(/^Belum tepat\.\s*/, '')}` };
}
