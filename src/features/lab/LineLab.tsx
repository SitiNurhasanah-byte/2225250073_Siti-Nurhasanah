import { useState } from 'react';
import { Fraction } from '../../lib/math/fraction';
import { evaluate, formatSlopeIntercept } from '../../lib/math/line';
import { TopBar } from '../../components/TopBar';
import { Card } from '../../components/Card';
import { Feedback } from '../../components/Feedback';
import { CartesianPlane } from '../../components/CartesianPlane';
import { ParamControl } from './ParamControl';
import { ValueTable } from './ValueTable';
import { EquationDisplay } from './EquationDisplay';

const TABLE_X = [-2, -1, 0, 1, 2];

/**
 * L04 Lab Garis (F3): atur m dan c, grafik–persamaan–tabel berubah bersama
 * dan saling ter-highlight (prinsip split-attention). Tanpa dekorasi (docs/04 §7.3).
 */
export function LineLab() {
  const [halfM, setHalfM] = useState(4); // m = halfM / 2, mulai dari m = 2
  const [c, setC] = useState(1);
  const [lastChanged, setLastChanged] = useState<'m' | 'c' | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showTriangle, setShowTriangle] = useState(false);
  const [plotMode, setPlotMode] = useState(false);
  const [probe, setProbe] = useState<[number, number] | null>(null);

  const m = new Fraction(halfM, 2);
  const cf = new Fraction(c);
  const mNum = m.toNumber();
  const tableY = TABLE_X.map((x) => evaluate(m, cf, x));
  const equation = formatSlopeIntercept(m, cf);

  const probeOnLine = probe ? evaluate(m, cf, probe[0]).equals(probe[1]) : false;
  const probeExpected = probe ? evaluate(m, cf, probe[0]) : null;

  return (
    <div>
      <TopBar
        title="Lab Garis"
        back="/"
        right={
          <button
            type="button"
            onClick={() => { setPlotMode((v) => !v); setProbe(null); }}
            className={`min-h-[44px] rounded-card border px-3 text-sm font-semibold ${plotMode ? 'border-accent bg-accent text-white' : 'border-border'}`}
            aria-pressed={plotMode}
          >
            Plot titik
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <EquationDisplay m={m} c={cf} highlight={lastChanged} label={equation} />
          <CartesianPlane
            x={[-6, 6]} y={[-8, 8]}
            lines={[{ m: mNum, c }]}
            points={[
              ...TABLE_X.map((x, i) => ({ x, y: tableY[i].toNumber(), highlight: selected === i, tone: 'accent' as const })),
              ...(probe ? [{ x: probe[0], y: probe[1], tone: probeOnLine ? ('success' as const) : ('error' as const), label: `(${probe[0]}, ${probe[1]})`.replace(/-/g, '−') }] : []),
            ]}
            triangle={showTriangle ? { x0: 0, dx: 1, m: mNum, c } : undefined}
            onTap={plotMode ? (x, y) => setProbe([x, y]) : undefined}
            ariaLabel={`Grafik ${equation}`}
          />
          {plotMode && !probe && <p className="text-center text-muted">Ketuk bidang untuk menaruh titik.</p>}
          {probe && probeExpected && (
            <Feedback
              tone={probeOnLine ? 'success' : 'error'}
              message={probeOnLine ? `Titik (${probe[0]}, ${probe[1]}) ada di garis.` : `Titik (${probe[0]}, ${probe[1]}) tidak ada di garis.`}
              detail={probeOnLine ? undefined : `Saat x = ${probe[0]}, y seharusnya ${probeExpected.toDisplay()}.`}
            />
          )}
        </div>

        <div className="space-y-3">
          <Card className="space-y-4">
            <ParamControl
              label="Gradien m"
              value={m.toDisplay()}
              onMinus={() => { setHalfM((v) => Math.max(-8, v - 1)); setLastChanged('m'); }}
              onPlus={() => { setHalfM((v) => Math.min(8, v + 1)); setLastChanged('m'); }}
              min={-8} max={8} raw={halfM}
              onRaw={(v) => { setHalfM(v); setLastChanged('m'); }}
            />
            <ParamControl
              label="Konstanta c"
              value={cf.toDisplay()}
              onMinus={() => { setC((v) => Math.max(-6, v - 1)); setLastChanged('c'); }}
              onPlus={() => { setC((v) => Math.min(6, v + 1)); setLastChanged('c'); }}
              min={-6} max={6} raw={c}
              onRaw={(v) => { setC(v); setLastChanged('c'); }}
            />
          </Card>

          <ValueTable xs={TABLE_X} ys={tableY} selected={selected} onSelect={setSelected} />

          <label className="flex min-h-[44px] items-center gap-3">
            <input type="checkbox" checked={showTriangle} onChange={(e) => setShowTriangle(e.target.checked)} className="h-5 w-5" />
            Tampilkan segitiga gradien (maju 1, naik m)
          </label>

          <Card className="text-[0.95rem] text-muted">
            {mNum > 0 && 'Gradien positif: garis naik dari kiri ke kanan. '}
            {mNum < 0 && 'Gradien negatif: garis turun dari kiri ke kanan. '}
            {mNum === 0 && 'Gradien nol: garis mendatar. '}
            Garis memotong sumbu-y di (0, {cf.toDisplay()}).
          </Card>
        </div>
      </div>
    </div>
  );
}
