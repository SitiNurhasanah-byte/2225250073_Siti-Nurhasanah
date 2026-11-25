import type { ToolVisual as Visual } from '../../lib/content/schema';
import { CartesianPlane } from '../../components/CartesianPlane';
import { MathText } from '../../components/MathText';

function NumberLine() {
  const ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const x = (n: number) => 30 + (n + 4) * 37.5;
  return (
    <svg viewBox="0 0 360 70" className="w-full" role="img" aria-label="Garis bilangan dari −4 sampai 4">
      <line x1={10} y1={30} x2={350} y2={30} className="stroke-text" strokeWidth={2} />
      <path d="M350 30 l-8 -5 v10 z" className="fill-text" />
      {ticks.map((n) => (
        <g key={n}>
          <line x1={x(n)} y1={22} x2={x(n)} y2={38} className={n === 0 ? 'stroke-accent' : 'stroke-text'} strokeWidth={n === 0 ? 3 : 1.5} />
          <text x={x(n)} y={58} textAnchor="middle" className={n === 0 ? 'fill-accent font-semibold' : 'fill-text'} fontSize={14}>
            {n < 0 ? `−${-n}` : n}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ValueTableSample() {
  const rows: Array<[number, number]> = [[0, 1], [1, 3], [2, 5], [3, 7]];
  return (
    <table className="mx-auto border-collapse text-center" aria-label="Contoh tabel nilai y = 2x + 1">
      <tbody>
        <tr>
          <th className="border border-border px-3 py-1">x</th>
          {rows.map(([x]) => <td key={x} className="border border-border px-3 py-1">{x}</td>)}
        </tr>
        <tr>
          <th className="border border-border px-3 py-1">y</th>
          {rows.map(([x, y]) => <td key={x} className="border border-border px-3 py-1">{y}</td>)}
        </tr>
        <tr className="text-sm text-accent">
          <th className="px-3 py-1 font-normal">selisih</th>
          {rows.map(([x]) => <td key={x} className="px-3 py-1">{x === 0 ? '' : '+2'}</td>)}
        </tr>
      </tbody>
    </table>
  );
}

function LanguageMap() {
  const pairs: Array<[string, string]> = [
    ['biaya awal, isi awal', 'konstanta $c$'],
    ['setiap jam, per lembar', 'gradien $m$'],
    ['banyak jam, hari', 'variabel $x$'],
    ['total biaya', 'variabel $y$'],
  ];
  return (
    <table className="w-full border-collapse text-[0.95rem]" aria-label="Kata sehari-hari dan simbol matematika">
      <thead>
        <tr className="text-left text-sm text-muted">
          <th className="pb-1">Kata dalam cerita</th>
          <th className="pb-1">Simbol</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map(([word, symbol]) => (
          <tr key={word} className="border-t border-border">
            <td className="py-1">{word}</td>
            <td className="py-1"><MathText text={symbol} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Gambar kecil struktur sebuah alat psikologis matematis (docs/11 §3). */
export function ToolVisual({ visual }: { visual: Visual }) {
  switch (visual) {
    case 'number-line':
      return <NumberLine />;
    case 'plane':
      return (
        <CartesianPlane x={[-4, 4]} y={[-4, 4]} points={[{ x: 3, y: 2, label: '(3, 2)' }]} ariaLabel="Bidang Cartesius dengan titik (3, 2)" />
      );
    case 'table':
      return <ValueTableSample />;
    case 'equation':
      return (
        <p className="text-center text-xl">
          <MathText text="$y = \underbrace{m}_{\text{gradien}}\,x + \underbrace{c}_{\text{konstanta}}$" />
        </p>
      );
    case 'language':
      return <LanguageMap />;
  }
}
