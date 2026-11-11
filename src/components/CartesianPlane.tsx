import { useId, useRef, type MouseEvent } from 'react';

export interface PlaneLine {
  m: number;
  c: number;
  label?: string;
  dashed?: boolean;
}

export interface PlanePoint {
  x: number;
  y: number;
  label?: string;
  tone?: 'accent' | 'muted' | 'success' | 'error';
  highlight?: boolean;
}

interface Props {
  x: [number, number];
  y: [number, number];
  xStep?: number;
  yStep?: number;
  lines?: PlaneLine[];
  points?: PlanePoint[];
  triangle?: { x0: number; dx: number; m: number; c: number };
  onTap?: (x: number, y: number) => void;
  ariaLabel: string;
  className?: string;
}

const W = 360;
const H = 300;
const PAD = { l: 46, r: 14, t: 14, b: 28 };

const fmt = (n: number) => n.toLocaleString('id-ID').replace('-', '−');

const toneClass: Record<NonNullable<PlanePoint['tone']>, string> = {
  accent: 'fill-accent',
  muted: 'fill-muted',
  success: 'fill-success',
  error: 'fill-error',
};

function ticks(min: number, max: number, step: number): number[] {
  const out: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

/** Bidang Cartesius SVG ringan (tanpa library grafik). Bisa diketuk untuk menaruh titik. */
export function CartesianPlane({ x, y, xStep = 1, yStep = 1, lines = [], points = [], triangle, onTap, ariaLabel, className = '' }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const clipId = `clip${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [xMin, xMax] = x;
  const [yMin, yMax] = y;
  const sx = (v: number) => PAD.l + ((v - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r);
  const sy = (v: number) => H - PAD.b - ((v - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  const xTicks = ticks(xMin, xMax, xStep);
  const yTicks = ticks(yMin, yMax, yStep);
  const xEvery = xTicks.length > 12 ? 2 : 1;
  const yEvery = yTicks.length > 12 ? 2 : 1;
  const axisX = yMin <= 0 && yMax >= 0 ? sy(0) : sy(yMin);
  const axisY = xMin <= 0 && xMax >= 0 ? sx(0) : sx(xMin);

  function handleClick(e: MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm || !onTap) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    const dataX = xMin + ((p.x - PAD.l) / (W - PAD.l - PAD.r)) * (xMax - xMin);
    const dataY = yMin + ((H - PAD.b - p.y) / (H - PAD.t - PAD.b)) * (yMax - yMin);
    const snapX = Math.round(dataX / xStep) * xStep;
    const snapY = Math.round(dataY / yStep) * yStep;
    if (snapX >= xMin && snapX <= xMax && snapY >= yMin && snapY <= yMax) onTap(snapX, snapY);
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full select-none rounded-card border border-border bg-surface ${onTap ? 'cursor-crosshair touch-manipulation' : ''} ${className}`}
      role="img"
      aria-label={ariaLabel}
      onClick={onTap ? handleClick : undefined}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={PAD.l} y={PAD.t} width={W - PAD.l - PAD.r} height={H - PAD.t - PAD.b} />
        </clipPath>
      </defs>

      <g className="stroke-border" strokeWidth={1}>
        {xTicks.map((t) => <line key={`gx${t}`} x1={sx(t)} x2={sx(t)} y1={PAD.t} y2={H - PAD.b} />)}
        {yTicks.map((t) => <line key={`gy${t}`} x1={PAD.l} x2={W - PAD.r} y1={sy(t)} y2={sy(t)} />)}
      </g>

      <g className="stroke-muted" strokeWidth={1.6}>
        <line x1={PAD.l} x2={W - PAD.r} y1={axisX} y2={axisX} />
        <line x1={axisY} x2={axisY} y1={PAD.t} y2={H - PAD.b} />
      </g>

      <g className="fill-muted" fontSize={10}>
        {xTicks.filter((_, i) => i % xEvery === 0).map((t) => (
          <text key={`tx${t}`} x={sx(t)} y={H - PAD.b + 14} textAnchor="middle">{fmt(t)}</text>
        ))}
        {yTicks.filter((_, i) => i % yEvery === 0).map((t) => (
          <text key={`ty${t}`} x={PAD.l - 5} y={sy(t) + 3.5} textAnchor="end">{fmt(t)}</text>
        ))}
        <text x={W - PAD.r} y={axisX - 5} textAnchor="end" fontStyle="italic">x</text>
        <text x={axisY + 6} y={PAD.t + 10} fontStyle="italic">y</text>
      </g>

      <g clipPath={`url(#${clipId})`}>
        {lines.map((l, i) => {
          const labelX = xMin + (xMax - xMin) * 0.86;
          const labelY = l.m * labelX + l.c;
          return (
            <g key={`l${i}`}>
              <line
                x1={sx(xMin)} y1={sy(l.m * xMin + l.c)} x2={sx(xMax)} y2={sy(l.m * xMax + l.c)}
                className={l.dashed ? 'stroke-muted' : 'stroke-accent'}
                strokeWidth={2.6}
                strokeDasharray={l.dashed ? '7 5' : undefined}
              />
              {l.label && labelY >= yMin && labelY <= yMax && (
                <text x={sx(labelX)} y={sy(labelY) - 8} className="fill-text" fontSize={11} fontWeight={600} textAnchor="middle">
                  {l.label}
                </text>
              )}
            </g>
          );
        })}

        {triangle && <SlopeTriangle {...triangle} sx={sx} sy={sy} />}
      </g>

      {points.map((p, i) => (
        <g key={`p${i}`}>
          {p.highlight && <circle cx={sx(p.x)} cy={sy(p.y)} r={11} className="fill-accent/20" />}
          <circle cx={sx(p.x)} cy={sy(p.y)} r={5.5} className={`${toneClass[p.tone ?? 'accent']} stroke-surface`} strokeWidth={1.5} />
          {p.label && (
            <text x={sx(p.x) + 8} y={sy(p.y) - 8} className="fill-text" fontSize={11} fontWeight={600}>
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function SlopeTriangle({ x0, dx, m, c, sx, sy }: { x0: number; dx: number; m: number; c: number; sx: (v: number) => number; sy: (v: number) => number }) {
  const y0 = m * x0 + c;
  const x1 = x0 + dx;
  const y1 = y0 + m * dx;
  const rise = m * dx;
  return (
    <g fontSize={11} fontWeight={600}>
      <path
        d={`M${sx(x0)} ${sy(y0)} L${sx(x1)} ${sy(y0)} L${sx(x1)} ${sy(y1)}`}
        className="stroke-accent"
        fill="none"
        strokeWidth={2}
        strokeDasharray="4 3"
      />
      <text x={(sx(x0) + sx(x1)) / 2} y={sy(y0) + (rise >= 0 ? 15 : -7)} textAnchor="middle" className="fill-accent">
        maju {fmt(dx)}
      </text>
      <text x={sx(x1) + 6} y={(sy(y0) + sy(y1)) / 2 + 4} className="fill-accent">
        {rise >= 0 ? `naik ${fmt(rise)}` : `turun ${fmt(-rise)}`}
      </text>
    </g>
  );
}
