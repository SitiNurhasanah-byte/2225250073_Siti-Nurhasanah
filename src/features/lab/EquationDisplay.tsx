import type { Fraction } from '../../lib/math/fraction';
import { MathText } from '../../components/MathText';

/** Angka sebagai LaTeX: pecahan ditampilkan bersusun agar "5/2x" tidak terbaca 5 ÷ 2x. */
function tex(f: Fraction): string {
  const abs = Math.abs(f.num);
  return f.isInteger() ? `${abs}` : `\\tfrac{${abs}}{${f.den}}`;
}

/** Persamaan y = mx + c; bagian yang terakhir diubah ditandai (docs/04 L04). */
export function EquationDisplay({ m, c, highlight, label }: { m: Fraction; c: Fraction; highlight: 'm' | 'c' | null; label: string }) {
  const hl = 'rounded bg-accent-soft px-1 text-accent';
  const mPart = m.isZero() ? null : m.equals(1) ? 'x' : m.equals(-1) ? '-x' : `${m.num < 0 ? '-' : ''}${tex(m)}x`;
  const cPart = c.isZero() && mPart ? null : mPart ? `{}${c.num < 0 ? '-' : '+'} ${tex(c)}` : `${c.num < 0 ? '-' : ''}${tex(c)}`;

  return (
    <p className="text-center text-2xl" aria-live="polite" aria-label={label}>
      <span aria-hidden="true">
        <MathText text="$y =$" />{' '}
        {mPart && (
          <span className={highlight === 'm' ? hl : ''}>
            <MathText text={`$${mPart}$`} />
          </span>
        )}{' '}
        {cPart && (
          <span className={highlight === 'c' || (!mPart && highlight === 'm') ? hl : ''}>
            <MathText text={`$${cPart}$`} />
          </span>
        )}
      </span>
    </p>
  );
}
