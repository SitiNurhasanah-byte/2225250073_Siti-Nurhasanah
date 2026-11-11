import { Fraction } from './fraction';

/**
 * Membaca jawaban angka siswa dengan format Indonesia (docs/05 §4):
 * - awalan "Rp" dan spasi diabaikan
 * - titik + kelompok 3 digit = pemisah ribuan  ("17.000", "1.250.000")
 * - koma = desimal ("0,5")
 * - titik yang bukan pola ribuan = desimal ("0.5")
 * - pecahan "a/b", tanda minus "-" atau "−"
 * Mengembalikan null jika tidak terbaca.
 */
export function parseNumber(raw: string): Fraction | null {
  let s = normalize(raw).replace(/^rp\.?/, '');
  if (s === '') return null;

  if (s.includes('/')) {
    const parts = s.split('/');
    if (parts.length !== 2) return null;
    const a = parseNumber(parts[0]);
    const b = parseNumber(parts[1]);
    if (!a || !b || b.isZero()) return null;
    return a.div(b);
  }

  let sign = 1;
  if (s.startsWith('-')) {
    sign = -1;
    s = s.slice(1);
  } else if (s.startsWith('+')) {
    s = s.slice(1);
  }

  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) {
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (/^\d+,\d+$/.test(s)) {
    s = s.replace(',', '.');
  } else if (!/^\d+(\.\d+)?$/.test(s)) {
    return null;
  }

  const [intPart, decPart = ''] = s.split('.');
  const den = 10 ** decPart.length;
  const num = Number(intPart + decPart);
  if (!Number.isSafeInteger(num)) return null;
  return new Fraction(sign * num, den);
}

/** Huruf kecil, tanpa spasi, minus unicode → "-", tanda kali "×"/"·" → "*". */
export function normalize(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/[×·]/g, '*');
}

/** Garis dalam bentuk umum a·x + b·y + c = 0. */
export interface GeneralLine {
  a: Fraction;
  b: Fraction;
  c: Fraction;
}

interface Linear {
  x: Fraction;
  y: Fraction;
  k: Fraction;
}

const zero = () => new Fraction(0);

function addLinear(p: Linear, q: Linear): Linear {
  return { x: p.x.add(q.x), y: p.y.add(q.y), k: p.k.add(q.k) };
}

function scaleLinear(p: Linear, f: Fraction): Linear {
  return { x: p.x.mul(f), y: p.y.mul(f), k: p.k.mul(f) };
}

/** Memecah ekspresi menjadi suku-suku pada tanda +/- di luar kurung. */
function splitTerms(expr: string): string[] | null {
  const terms: string[] = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (depth < 0) return null;
    const prev = expr[i - 1];
    const isSplit = (ch === '+' || ch === '-') && depth === 0 && i > 0 && prev !== '*' && prev !== '/';
    if (isSplit) {
      terms.push(current);
      current = ch;
    } else {
      current += ch;
    }
  }
  if (depth !== 0) return null;
  terms.push(current);
  return terms.filter((t) => t !== '' && t !== '+');
}

/** Membaca koefisien: "", "+", "-", "2", "-2.000", "1/2", "2*". */
function parseCoefficient(text: string): Fraction | null {
  const t = text.replace(/\*$/, '');
  if (t === '' || t === '+') return new Fraction(1);
  if (t === '-') return new Fraction(-1);
  return parseNumber(t);
}

function parseLinearExpression(expr: string): Linear | null {
  const terms = splitTerms(expr);
  if (!terms || terms.length === 0) return null;
  let total: Linear = { x: zero(), y: zero(), k: zero() };
  for (const term of terms) {
    const parsed = parseTerm(term);
    if (!parsed) return null;
    total = addLinear(total, parsed);
  }
  return total;
}

function parseTerm(term: string): Linear | null {
  // Bentuk koefisien(ekspresi), mis. "2(x-1)" atau "-(x+3)"
  const paren = term.match(/^([+-]?[^()]*)\((.+)\)$/);
  if (paren) {
    const coef = parseCoefficient(paren[1]);
    const inner = parseLinearExpression(paren[2]);
    if (!coef || !inner) return null;
    return scaleLinear(inner, coef);
  }
  const variable = term.match(/^([+-]?[^xy]*)([xy])$/);
  if (variable) {
    const coef = parseCoefficient(variable[1]);
    if (!coef) return null;
    return variable[2] === 'x'
      ? { x: coef, y: zero(), k: zero() }
      : { x: zero(), y: coef, k: zero() };
  }
  const value = parseNumber(term);
  if (!value) return null;
  return { x: zero(), y: zero(), k: value };
}

/**
 * Membaca persamaan garis seperti "y = 2x - 1", "2x - y + 1 = 0",
 * "y = 2.000x + 5.000", atau "y - 3 = 2(x - 2)". Null jika bukan persamaan linear dua variabel.
 */
export function parseLinearEquation(raw: string): GeneralLine | null {
  const s = normalize(raw);
  const sides = s.split('=');
  if (sides.length !== 2 || !sides[0] || !sides[1]) return null;
  const left = parseLinearExpression(sides[0]);
  const right = parseLinearExpression(sides[1]);
  if (!left || !right) return null;
  const a = left.x.sub(right.x);
  const b = left.y.sub(right.y);
  const c = left.k.sub(right.k);
  if (a.isZero() && b.isZero()) return null;
  return { a, b, c };
}
