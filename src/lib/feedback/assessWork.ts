/**
 * Menilai pekerjaan yang ditulis siswa di chat Gari AI terhadap kunci langkah (docs/11 §6).
 * Berjalan di perangkat: kunci jawaban TIDAK dikirim ke server, hanya hasil penilaiannya.
 * Murni (tanpa React); memakai pengurai angka format Indonesia dan pecahan eksak dari lib/math.
 */
import { Fraction } from '../math/fraction';
import { parseLinearEquation, parseNumber } from '../math/parse';
import { areEquivalentLines } from '../math/equivalence';
import type { Step } from '../content/schema';
import { checkStep, type CheckResult, type MisconceptionCatalog } from './diagnose';

export type WorkVerdict = 'correct' | 'wrong' | 'incomplete' | 'none';

export interface WorkAssessment {
  verdict: WorkVerdict;
  /** Baris hitungan siswa yang keliru (teks asli siswa). */
  errorAt?: string;
  /** Pesan diagnosis aplikasi (katalog miskonsepsi); tidak memuat kunci jawaban. */
  note?: string;
  /** true jika penilaian diambil dari pesan siswa sebelumnya (pesan sekarang hanya bertanya). */
  fromEarlier?: boolean;
}

const NONE: WorkAssessment = { verdict: 'none' };

type Op = '+' | '-' | '*' | '/' | '(' | ')';
type Token = { num: Fraction } | { op: Op };

function tokenize(expr: string): Token[] | null {
  const re = /\s*(?:(\d+(?:[.,]\d+)*)|([-+*/()]))/y;
  const tokens: Token[] = [];
  const s = expr.trim();
  let i = 0;
  while (i < s.length) {
    re.lastIndex = i;
    const m = re.exec(s);
    if (!m) return null;
    i = re.lastIndex;
    if (m[1]) {
      const num = parseNumber(m[1]);
      if (!num) return null;
      tokens.push({ num });
    } else tokens.push({ op: m[2] as Op });
  }
  return tokens;
}

const isOp = (t: Token | undefined, ...ops: Op[]): boolean => t !== undefined && 'op' in t && ops.includes(t.op);

/** Menghitung ekspresi aritmetika (+ − × : dan kurung, termasuk 5.000(7)) dengan pecahan eksak. */
export function evaluateArithmetic(expr: string): Fraction | null {
  const tokens = tokenize(expr);
  if (!tokens || tokens.length === 0) return null;
  let pos = 0;

  const primary = (): Fraction | null => {
    const t = tokens[pos];
    if (!t) return null;
    if ('num' in t) {
      pos++;
      return t.num;
    }
    if (t.op === '-') {
      pos++;
      return primary()?.neg() ?? null;
    }
    if (t.op === '(') {
      pos++;
      const v = sum();
      if (!isOp(tokens[pos], ')')) return null;
      pos++;
      return v;
    }
    return null;
  };
  const product = (): Fraction | null => {
    let left = primary();
    while (left) {
      const t = tokens[pos];
      if (isOp(t, '*', '/')) {
        pos++;
        const right = primary();
        if (!right || (isOp(t, '/') && right.isZero())) return null;
        left = isOp(t, '*') ? left.mul(right) : left.div(right);
      } else if (isOp(t, '(')) {
        const right = primary(); // perkalian tersirat: 5.000(7)
        if (!right) return null;
        left = left.mul(right);
      } else break;
    }
    return left;
  };
  const sum = (): Fraction | null => {
    let left = product();
    while (left && isOp(tokens[pos], '+', '-')) {
      const plus = isOp(tokens[pos], '+');
      pos++;
      const right = product();
      if (!right) return null;
      left = plus ? left.add(right) : left.sub(right);
    }
    return left;
  };

  try {
    const value = sum();
    return value && pos === tokens.length ? value : null;
  } catch {
    return null; // bilangan terlalu besar untuk pecahan eksak
  }
}

const blank = (m: string) => ' '.repeat(m.length);

/** Menyamakan simbol tanpa mengubah panjang teks, agar potongan teks asli siswa bisa dikutip. */
function normalizeWork(text: string): string {
  return text
    .replace(/^([ \t]*)([-•*]|\d+[.)])(?=[ \t])/gm, blank) // penanda daftar "- ", "1. "
    .replace(/rp\.?(?=\s?\d)/gi, blank)
    .replace(/,(?=\s)/g, ';') // koma + spasi = pemisah kalimat (koma desimal tidak diikuti spasi)
    .replace(/[×·∙]/g, '*')
    .replace(/[−–—]/g, '-')
    .replace(/(?<=[\d)]\s*)[xX](?=\s*[\d(])/g, '*')
    .replace(/(?<=\d):(?=\d)|(?<=\d) : (?=\d)/g, (m) => m.replace(':', '/'));
}

interface NumberToken {
  value: Fraction;
  raw: string;
  index: number;
}

function collectNumbers(norm: string): NumberToken[] {
  const out: NumberToken[] = [];
  const re = /\d+(?:[.,]\d+)*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(norm))) {
    const before = norm.slice(0, m.index).replace(/\s+$/, '');
    const unary = before.endsWith('-') && !/[\d)]$/.test(before.slice(0, -1).trimEnd());
    const raw = (unary ? '-' : '') + m[0];
    const value = parseNumber(raw);
    if (value) out.push({ value, raw, index: m.index });
  }
  return out;
}

interface WorkLine {
  raw: string;
  ok: boolean;
  last: Fraction;
  start: number;
  end: number;
}

/** Baris hitungan "a × b = c" dicek kebenaran aritmetikanya. */
function collectLines(text: string, norm: string): WorkLine[] {
  const lines: WorkLine[] = [];
  const re = /[\d+\-*/().,= \t]+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(norm))) {
    if (!m[0].includes('=') || !/\d/.test(m[0])) continue;
    const sides = m[0].replace(/[\s.,-]+$/, '').split('=').map((s) => s.trim()).filter(Boolean);
    const values = sides.map(evaluateArithmetic);
    const pairs = values.slice(1).map((v, i) => [values[i], v] as const).filter(([a, b]) => a && b);
    const hasOperation = sides.some((s) => /[-+*/(]/.test(s.replace(/^-/, '')));
    const last = values[values.length - 1];
    if (pairs.length === 0 || !hasOperation || !last) continue;
    const raw = text.slice(m.index, m.index + m[0].length).trim().replace(/[\s.,]+$/, '');
    lines.push({ raw, ok: pairs.every(([a, b]) => a!.equals(b!)), last, start: m.index, end: m.index + m[0].length });
  }
  return lines;
}

/** Pesan diagnosis tanpa awalan "Belum tepat." (putusan sudah dikirim terpisah). */
function diagnosisNote(check: CheckResult): string | undefined {
  return check.status === 'wrong' ? check.message.replace(/^Belum tepat\.\s*/, '') || undefined : undefined;
}

const CONCLUSION =/\b(jadi|jawab\w*|hasil\w*|kesimpulan\w*|total\w*|adalah|sebesar|yaitu)\b/gi;

function assessNumber(step: Extract<Step, { kind: 'number' }>, text: string, catalog: MisconceptionCatalog): WorkAssessment {
  const key = parseNumber(step.answer);
  if (!key) return NONE;
  const norm = normalizeWork(text);
  const lines = collectLines(text, norm);
  const wrongLine = lines.find((l) => !l.ok);
  if (wrongLine) return { verdict: 'wrong', errorAt: wrongLine.raw };

  const numbers = collectNumbers(norm);
  const conclusions = [...norm.matchAll(CONCLUSION)];
  const lastConclusion = conclusions[conclusions.length - 1];
  const concluded = lastConclusion ? numbers.find((n) => n.index > lastConclusion.index!) : undefined;
  const distinct = numbers.filter((n, i) => numbers.findIndex((o) => o.value.equals(n.value)) === i);

  // "Jadi 5.000 × 7 + 20.000 = 55.000": yang disimpulkan adalah hasil baris itu, bukan angka pertamanya.
  const concludedLine = concluded && lines.find((l) => concluded.index >= l.start && concluded.index < l.end);

  let final: { value: Fraction; raw: string; explicit: boolean } | undefined;
  if (concludedLine) final = { value: concludedLine.last, raw: concludedLine.last.toString(), explicit: true };
  else if (concluded) final = { ...concluded, explicit: true };
  else if (lines.length) final = { value: lines[lines.length - 1].last, raw: lines[lines.length - 1].last.toString(), explicit: false };
  else if (distinct.length === 1) final = { ...distinct[0], explicit: true };
  if (!final) return NONE;

  if (final.value.equals(key)) return { verdict: 'correct' };
  const note = diagnosisNote(checkStep(step, { kind: 'number', text: final.raw }, catalog));
  // Hitungan rapi tanpa kesimpulan: mungkin belum selesai, bukan salah.
  return final.explicit ? { verdict: 'wrong', note } : { verdict: 'incomplete', note };
}

function assessEquation(step: Extract<Step, { kind: 'equation' }>, text: string, catalog: MisconceptionCatalog): WorkAssessment {
  const candidates = [...text.replace(/[−–—]/g, '-').matchAll(/y\s*=\s*[^\n;]+/gi)]
    .map((m) => m[0].split(/\s[a-z]{2,}/i)[0].replace(/[\s.,]+$/, ''))
    .filter((c) => parseLinearEquation(c));
  const last = candidates[candidates.length - 1];
  if (!last) return NONE;
  if (areEquivalentLines(last, step.answer)) return { verdict: 'correct' };
  return { verdict: 'wrong', note: diagnosisNote(checkStep(step, { kind: 'equation', text: last }, catalog)) };
}

/** Menilai satu pesan siswa. Langkah pilihan ganda/grafik tidak dinilai dari teks bebas. */
export function assessWork(step: Step, text: string, catalog: MisconceptionCatalog): WorkAssessment {
  if (step.kind === 'number') return assessNumber(step, text, catalog);
  if (step.kind === 'equation') return assessEquation(step, text, catalog);
  return NONE;
}

/**
 * Menilai pesan terbaru; jika pesan itu hanya bertanya ("apakah jawabanku benar?"),
 * pakai pekerjaan siswa paling akhir di percakapan yang sama.
 */
export function assessConversation(step: Step, current: string, earlier: string[], catalog: MisconceptionCatalog): WorkAssessment {
  const texts = [current, ...[...earlier].reverse()];
  for (let i = 0; i < texts.length; i++) {
    const result = assessWork(step, texts[i], catalog);
    if (result.verdict !== 'none') return i === 0 ? result : { ...result, fromEarlier: true };
  }
  return NONE;
}
