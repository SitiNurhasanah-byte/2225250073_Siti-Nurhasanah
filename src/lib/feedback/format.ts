import { parseNumber } from '../math/parse';
import type { Step } from '../content/schema';
import type { StepInput } from './diagnose';

/** Mengubah angka ≥ 4 digit dalam teks menjadi format ribuan Indonesia dan minus menjadi "−". */
export function prettifyEquation(text: string): string {
  return text
    .replace(/\d{4,}/g, (d) => Number(d).toLocaleString('id-ID'))
    .replace(/-/g, '−')
    .replace(/\s*([=+−])\s*/g, ' $1 ')
    .replace(/^\s*−\s*/, '−')
    .replace(/=\s+−\s+/g, '= −')
    .trim();
}

export function formatPoints(points: Array<[number, number]>): string {
  return points.map(([x, y]) => `(${x}, ${y})`.replace(/-/g, '−')).join(', ');
}

/** Kunci jawaban sebuah langkah dalam bentuk yang mudah dibaca siswa. */
export function formatAnswer(step: Step): string {
  switch (step.kind) {
    case 'number': {
      const value = parseNumber(step.answer)?.toDisplay() ?? step.answer;
      return [step.prefix, value, step.suffix].filter(Boolean).join(step.prefix ? '' : ' ').replace(/^Rp/, 'Rp');
    }
    case 'equation':
      return prettifyEquation(step.answer);
    case 'choice':
      return step.options[step.answer];
    case 'plot':
      return formatPoints(step.answer);
  }
}

/** Jawaban siswa sebagai teks (untuk riwayat dan ekspor data). */
export function formatInput(step: Step, input: StepInput): string {
  if (input.kind === 'choice') return step.kind === 'choice' ? step.options[input.index] ?? '' : '';
  if (input.kind === 'plot') return formatPoints(input.points);
  return input.text.trim();
}
