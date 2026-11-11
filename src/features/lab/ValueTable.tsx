import type { Fraction } from '../../lib/math/fraction';

/** Tabel nilai x → y. Mengetuk kolom menyorot titik yang sama di grafik. */
export function ValueTable({ xs, ys, selected, onSelect }: { xs: number[]; ys: Fraction[]; selected: number | null; onSelect: (i: number | null) => void }) {
  const cell = (i: number) =>
    `min-w-[3rem] border border-border p-0 text-center ${selected === i ? 'bg-accent-soft font-semibold text-accent' : ''}`;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-card bg-surface text-lg">
        <caption className="mb-1 text-left text-sm text-muted">Ketuk kolom untuk menyorot titiknya di grafik.</caption>
        <tbody>
          <tr>
            <th scope="row" className="border border-border px-3 italic">x</th>
            {xs.map((x, i) => (
              <td key={x} className={cell(i)}>
                <button type="button" className="min-h-[44px] w-full" onClick={() => onSelect(selected === i ? null : i)} aria-pressed={selected === i}>
                  {x.toLocaleString('id-ID').replace('-', '−')}
                </button>
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="border border-border px-3 italic">y</th>
            {ys.map((y, i) => (
              <td key={i} className={`${cell(i)} py-2`}>{y.toDisplay()}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
