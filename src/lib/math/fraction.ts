/**
 * Pecahan eksak. Dipakai untuk semua perhitungan agar gradien seperti 1/3
 * tidak berubah menjadi 0.3333 (CLAUDE.md aturan kode no. 2).
 */
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export class Fraction {
  readonly num: number;
  readonly den: number;

  constructor(num: number, den = 1) {
    if (!Number.isInteger(num) || !Number.isInteger(den)) {
      throw new Error('Pembilang dan penyebut harus bilangan bulat');
    }
    if (den === 0) throw new Error('Penyebut tidak boleh 0');
    const sign = den < 0 ? -1 : 1;
    const g = gcd(num, den);
    this.num = (sign * num) / g || 0; // hindari -0
    this.den = Math.abs(den) / g;
  }

  /** Membuat pecahan dari bilangan bulat, desimal sederhana, atau Fraction. */
  static from(value: number | Fraction): Fraction {
    if (value instanceof Fraction) return value;
    if (Number.isInteger(value)) return new Fraction(value, 1);
    const text = value.toString();
    if (text.includes('e')) throw new Error('Bilangan terlalu besar/kecil');
    const decimals = text.split('.')[1]?.length ?? 0;
    const den = 10 ** decimals;
    return new Fraction(Math.round(value * den), den);
  }

  add(o: Fraction | number): Fraction {
    const b = Fraction.from(o);
    return new Fraction(this.num * b.den + b.num * this.den, this.den * b.den);
  }

  sub(o: Fraction | number): Fraction {
    const b = Fraction.from(o);
    return new Fraction(this.num * b.den - b.num * this.den, this.den * b.den);
  }

  mul(o: Fraction | number): Fraction {
    const b = Fraction.from(o);
    return new Fraction(this.num * b.num, this.den * b.den);
  }

  div(o: Fraction | number): Fraction {
    const b = Fraction.from(o);
    if (b.num === 0) throw new Error('Pembagian dengan 0');
    return new Fraction(this.num * b.den, this.den * b.num);
  }

  neg(): Fraction {
    return new Fraction(-this.num, this.den);
  }

  equals(o: Fraction | number): boolean {
    const b = Fraction.from(o);
    return this.num === b.num && this.den === b.den;
  }

  isZero(): boolean {
    return this.num === 0;
  }

  isInteger(): boolean {
    return this.den === 1;
  }

  toNumber(): number {
    return this.num / this.den;
  }

  /** Bentuk teks sederhana: "3", "-1/2". */
  toString(): string {
    return this.den === 1 ? `${this.num}` : `${this.num}/${this.den}`;
  }

  /** Bentuk tampilan Indonesia: "17.000", "−1/2". */
  toDisplay(): string {
    const sign = this.num < 0 ? '−' : '';
    const abs = Math.abs(this.num);
    const whole = abs.toLocaleString('id-ID');
    return this.den === 1 ? `${sign}${whole}` : `${sign}${whole}/${this.den.toLocaleString('id-ID')}`;
  }
}

/** Singkatan pembuat pecahan: F(2), F(1, 3), F("−1/2") tidak didukung — pakai parseNumber. */
export function F(num: number, den = 1): Fraction {
  return Number.isInteger(num) ? new Fraction(num, den) : Fraction.from(num).div(den);
}
