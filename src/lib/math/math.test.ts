import { describe, expect, it } from 'vitest';
import { Fraction, F } from './fraction';
import { parseLinearEquation, parseNumber } from './parse';
import {
  evaluate,
  formatSlopeIntercept,
  intersect,
  isParallel,
  isPerpendicular,
  isPointOnLine,
  lineFromPointSlope,
  lineFromTwoPoints,
  pt,
  slopeFromGeneralForm,
  slopeFromTwoPoints,
  solveForX,
  toLine,
} from './line';
import { areEquivalentLines } from './equivalence';

const s = (f: Fraction | null) => (f === null ? null : f.toString());

describe('Fraction', () => {
  it('menyederhanakan dan menormalkan tanda', () => {
    expect(new Fraction(4, 8).toString()).toBe('1/2');
    expect(new Fraction(3, -6).toString()).toBe('-1/2');
    expect(new Fraction(0, -5).toString()).toBe('0');
  });
  it('operasi dasar', () => {
    expect(F(1, 2).add(F(1, 3)).toString()).toBe('5/6');
    expect(F(1, 2).sub(1).toString()).toBe('-1/2');
    expect(F(2, 3).mul(F(3, 4)).toString()).toBe('1/2');
    expect(F(1).div(3).toString()).toBe('1/3');
  });
  it('dari desimal', () => {
    expect(Fraction.from(0.5).toString()).toBe('1/2');
    expect(Fraction.from(-2.25).toString()).toBe('-9/4');
  });
  it('tampilan Indonesia', () => {
    expect(F(17000).toDisplay()).toBe('17.000');
    expect(F(-1, 2).toDisplay()).toBe('−1/2');
  });
  it('menolak penyebut nol', () => {
    expect(() => new Fraction(1, 0)).toThrow();
  });
});

describe('parseNumber (UT07, UT07b, UT08)', () => {
  it('desimal koma, pecahan, minus, spasi', () => {
    expect(s(parseNumber('0,5'))).toBe('1/2');
    expect(s(parseNumber('1/2'))).toBe('1/2');
    expect(s(parseNumber('−3'))).toBe('-3');
    expect(s(parseNumber(' 7 '))).toBe('7');
  });
  it('format rupiah dan ribuan', () => {
    expect(s(parseNumber('17.000'))).toBe('17000');
    expect(s(parseNumber('Rp17.000'))).toBe('17000');
    expect(s(parseNumber('Rp 17.000'))).toBe('17000');
    expect(s(parseNumber('17000'))).toBe('17000');
    expect(s(parseNumber('1.000'))).toBe('1000');
    expect(s(parseNumber('1.250.000'))).toBe('1250000');
    expect(s(parseNumber('0.5'))).toBe('1/2');
    expect(s(parseNumber('-1/2'))).toBe('-1/2');
  });
  it('menolak masukan tidak valid', () => {
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('')).toBeNull();
    expect(parseNumber('1/0')).toBeNull();
    expect(parseNumber('1..2')).toBeNull();
  });
});

describe('garis lurus (UT01–UT15, bank soal)', () => {
  it('UT01 Bank Soal 3c: y = 2x − 1, x = 5 → 9', () => {
    expect(s(evaluate(2, -1, 5))).toBe('9');
  });
  it('UT02 Bank Soal 1: biaya 6 jam', () => {
    expect(s(evaluate(2000, 5000, 6))).toBe('17000');
    expect(s(evaluate(3000, 1000, 6))).toBe('19000');
  });
  it('UT03 gradien dari dua titik', () => {
    expect(s(slopeFromTwoPoints(pt(2, 3), pt(4, 7)))).toBe('2');
  });
  it('UT03b/UT13 persamaan dari dua titik', () => {
    const line = lineFromTwoPoints(pt(2, 3), pt(4, 7));
    expect(line?.kind).toBe('slope');
    if (line?.kind === 'slope') {
      expect(formatSlopeIntercept(line.m, line.c)).toBe('y = 2x − 1');
    }
    const l2 = lineFromTwoPoints(pt(1, 2), pt(3, 6));
    if (l2?.kind === 'slope') expect(formatSlopeIntercept(l2.m, l2.c)).toBe('y = 2x');
  });
  it('UT03c Bank Soal 2: fotokopi', () => {
    const line = lineFromTwoPoints(pt(2, 5000), pt(5, 8000));
    expect(line?.kind).toBe('slope');
    if (line?.kind === 'slope') {
      expect(s(line.m)).toBe('1000');
      expect(s(line.c)).toBe('3000');
      expect(s(evaluate(line.m, line.c, 8))).toBe('11000');
    }
  });
  it('UT03d Bank Soal 4: x untuk tabungan 60.000', () => {
    expect(s(solveForX(5000, 20000, 60000))).toBe('8');
    expect(solveForX(0, 1, 5)).toBeNull();
  });
  it('UT03e titik potong paket sewa', () => {
    const p = intersect({ m: F(2000), c: F(5000) }, { m: F(3000), c: F(1000) });
    expect(p && [s(p.x), s(p.y)]).toEqual(['4', '13000']);
    expect(intersect({ m: F(2), c: F(1) }, { m: F(2), c: F(3) })).toBeNull();
  });
  it('UT04 gradien pecahan tetap eksak', () => {
    expect(s(slopeFromTwoPoints(pt(0, 0), pt(3, 1)))).toBe('1/3');
  });
  it('UT05 garis vertikal', () => {
    expect(slopeFromTwoPoints(pt(2, 1), pt(2, 5))).toBeNull();
    expect(lineFromTwoPoints(pt(2, 1), pt(2, 5))?.kind).toBe('vertical');
  });
  it('UT06 gradien bentuk umum 2x + 4y − 8 = 0', () => {
    expect(s(slopeFromGeneralForm(2, 4))).toBe('-1/2');
  });
  it('UT12 persamaan dari titik dan gradien', () => {
    const line = lineFromPointSlope(pt(2, -3), 4);
    if (line.kind === 'slope') expect(formatSlopeIntercept(line.m, line.c)).toBe('y = 4x − 11');
  });
  it('UT14/UT15 tegak lurus dan sejajar', () => {
    expect(isPerpendicular(2, F(-1, 2))).toBe(true);
    expect(isPerpendicular(2, -1)).toBe(false);
    expect(isParallel(3, 3)).toBe(true);
  });
  it('titik pada garis', () => {
    const line = lineFromTwoPoints(pt(2, 3), pt(4, 7))!;
    expect(isPointOnLine(pt(5, 9), line)).toBe(true);
    expect(isPointOnLine(pt(5, 10), line)).toBe(false);
  });
});

describe('parseLinearEquation & ekuivalensi (UT09–UT11)', () => {
  it('membaca berbagai bentuk', () => {
    const line = toLine(parseLinearEquation('y = 2.000x + 5.000')!);
    expect(line.kind === 'slope' && [s(line.m), s(line.c)]).toEqual(['2000', '5000']);
    const pointSlope = toLine(parseLinearEquation('y - 3 = 2(x - 2)')!);
    expect(pointSlope.kind === 'slope' && [s(pointSlope.m), s(pointSlope.c)]).toEqual(['2', '-1']);
    const negative = toLine(parseLinearEquation('y = −x + 1')!);
    expect(negative.kind === 'slope' && s(negative.m)).toBe('-1');
    const half = toLine(parseLinearEquation('y = 1/2x + 2')!);
    expect(half.kind === 'slope' && s(half.m)).toBe('1/2');
  });
  it('UT09–UT11 ekuivalensi', () => {
    expect(areEquivalentLines('y=2x+1', '2x-y+1=0')).toBe(true);
    expect(areEquivalentLines('y=2x+1', '4x-2y+2=0')).toBe(true);
    expect(areEquivalentLines('y=2x+1', 'y=2x-1')).toBe(false);
    expect(areEquivalentLines('Y = 2X − 1', 'y=2x-1')).toBe(true);
    expect(areEquivalentLines('y = 1000x + 3000', 'y = 1.000x + 3.000')).toBe(true);
  });
  it('menolak yang bukan persamaan garis', () => {
    expect(parseLinearEquation('2x + 1')).toBeNull();
    expect(parseLinearEquation('y = x*x')).toBeNull();
    expect(parseLinearEquation('3 = 3')).toBeNull();
    expect(parseLinearEquation('y = 2(x')).toBeNull();
  });
});
