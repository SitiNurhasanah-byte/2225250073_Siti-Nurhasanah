import { Fraction } from './fraction';
import type { GeneralLine } from './parse';

export interface Point {
  x: Fraction;
  y: Fraction;
}

/** Garis y = mx + c. Garis vertikal (x = k) dinyatakan terpisah. */
export type Line = { kind: 'slope'; m: Fraction; c: Fraction } | { kind: 'vertical'; x: Fraction };

export function pt(x: number | Fraction, y: number | Fraction): Point {
  return { x: Fraction.from(x), y: Fraction.from(y) };
}

/** y = m·x + c */
export function evaluate(m: Fraction | number, c: Fraction | number, x: Fraction | number): Fraction {
  return Fraction.from(m).mul(x).add(c);
}

/** Menyelesaikan m·x + c = y untuk x. Null jika m = 0. */
export function solveForX(m: Fraction | number, c: Fraction | number, y: Fraction | number): Fraction | null {
  const mf = Fraction.from(m);
  if (mf.isZero()) return null;
  return Fraction.from(y).sub(c).div(mf);
}

/** Gradien dari dua titik. Null jika garis vertikal (x sama). */
export function slopeFromTwoPoints(p1: Point, p2: Point): Fraction | null {
  const dx = p2.x.sub(p1.x);
  if (dx.isZero()) return null;
  return p2.y.sub(p1.y).div(dx);
}

/** Gradien dari bentuk ax + by + c = 0, yaitu m = −a/b. Null jika b = 0. */
export function slopeFromGeneralForm(a: Fraction | number, b: Fraction | number): Fraction | null {
  const bf = Fraction.from(b);
  if (bf.isZero()) return null;
  return Fraction.from(a).neg().div(bf);
}

export function lineFromPointSlope(p: Point, m: Fraction | number): Line {
  const mf = Fraction.from(m);
  return { kind: 'slope', m: mf, c: p.y.sub(mf.mul(p.x)) };
}

export function lineFromTwoPoints(p1: Point, p2: Point): Line | null {
  if (p1.x.equals(p2.x) && p1.y.equals(p2.y)) return null;
  const m = slopeFromTwoPoints(p1, p2);
  if (m === null) return { kind: 'vertical', x: p1.x };
  return lineFromPointSlope(p1, m);
}

export function isPointOnLine(p: Point, line: Line): boolean {
  if (line.kind === 'vertical') return p.x.equals(line.x);
  return evaluate(line.m, line.c, p.x).equals(p.y);
}

/** Titik potong dua garis bergradien. Null jika sejajar/berimpit. */
export function intersect(l1: { m: Fraction; c: Fraction }, l2: { m: Fraction; c: Fraction }): Point | null {
  const dm = l1.m.sub(l2.m);
  if (dm.isZero()) return null;
  const x = l2.c.sub(l1.c).div(dm);
  return { x, y: evaluate(l1.m, l1.c, x) };
}

export function isParallel(m1: Fraction | number, m2: Fraction | number): boolean {
  return Fraction.from(m1).equals(m2);
}

export function isPerpendicular(m1: Fraction | number, m2: Fraction | number): boolean {
  return Fraction.from(m1).mul(m2).equals(-1);
}

/** Mengubah bentuk umum ax + by + c = 0 menjadi Line. */
export function toLine(g: GeneralLine): Line {
  if (g.b.isZero()) return { kind: 'vertical', x: g.c.neg().div(g.a) };
  return { kind: 'slope', m: g.a.neg().div(g.b), c: g.c.neg().div(g.b) };
}

/** Teks persamaan untuk tampilan, mis. "y = 2x − 1", "y = −x", "y = 3". */
export function formatSlopeIntercept(m: Fraction, c: Fraction): string {
  let mPart: string;
  if (m.isZero()) mPart = '';
  else if (m.equals(1)) mPart = 'x';
  else if (m.equals(-1)) mPart = '−x';
  else mPart = `${m.toDisplay()}x`;

  if (!mPart) return `y = ${c.toDisplay()}`;
  if (c.isZero()) return `y = ${mPart}`;
  const sign = c.num < 0 ? '−' : '+';
  return `y = ${mPart} ${sign} ${c.num < 0 ? c.neg().toDisplay() : c.toDisplay()}`;
}
