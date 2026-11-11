import { parseLinearEquation, type GeneralLine } from './parse';

/** Dua persamaan menyatakan garis yang sama jika koefisiennya sebanding. */
export function sameLine(p: GeneralLine, q: GeneralLine): boolean {
  return (
    p.a.mul(q.b).equals(q.a.mul(p.b)) &&
    p.a.mul(q.c).equals(q.a.mul(p.c)) &&
    p.b.mul(q.c).equals(q.b.mul(p.c))
  );
}

/**
 * Apakah persamaan masukan siswa ekuivalen dengan kunci?
 * Contoh: "y=2x+1" ≡ "2x - y + 1 = 0" ≡ "4x - 2y + 2 = 0".
 */
export function areEquivalentLines(input: string, expected: string): boolean {
  const p = parseLinearEquation(input);
  const q = parseLinearEquation(expected);
  if (!p || !q) return false;
  return sameLine(p, q);
}
