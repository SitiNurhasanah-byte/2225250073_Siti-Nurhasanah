/**
 * Gari — maskot orisinal GarisKu (docs/04 §7.1): segitiga gradien "maju–naik"
 * dengan dua mata bulat besar. Bukan karakter berhak cipta.
 */
export type GariExpression = 'wave' | 'think' | 'cheer' | 'calm';

const pupilOffset: Record<GariExpression, [number, number]> = {
  calm: [0, 1],
  wave: [1.5, 0],
  think: [-2.5, -4],
  cheer: [0, -1],
};

const mouth: Record<GariExpression, string> = {
  calm: 'M74 82 Q81 86 88 82',
  wave: 'M72 80 Q81 90 90 80',
  think: 'M76 84 L86 82',
  cheer: 'M71 79 Q81 93 91 79 Z',
};

function Eye({ cx, cy, expression }: { cx: number; cy: number; expression: GariExpression }) {
  const [dx, dy] = pupilOffset[expression];
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} className="fill-white decor-stroke-rim" strokeWidth={3} />
      <circle cx={cx + dx} cy={cy + dy} r={4.6} className="decor-fill-eye" />
      <circle cx={cx + dx + 1.6} cy={cy + dy - 1.8} r={1.4} className="fill-white" />
    </g>
  );
}

export function Gari({
  expression = 'calm',
  size = 96,
  className = '',
}: {
  expression?: GariExpression;
  size?: number;
  className?: string;
}) {
  const armsUp = expression === 'cheer';
  return (
    <svg viewBox="0 0 124 112" width={size} height={size * (112 / 124)} className={className} aria-hidden="true">
      <g className="decor-stroke-outline" strokeWidth={3} strokeLinecap="round" fill="none">
        <path d="M58 96 L58 106" />
        <path d="M88 96 L88 106" />
        {(expression === 'wave' || armsUp) && <path d="M106 60 L118 42" />}
        {armsUp && <path d="M46 66 L30 50" />}
        {expression === 'think' && <path d="M106 72 Q98 90 90 88" />}
        {expression === 'calm' && <path d="M106 66 L114 76" />}
      </g>
      {(expression === 'wave' || armsUp) && <circle cx={118} cy={40} r={4} className="fill-accent decor-stroke-outline" strokeWidth={2} />}
      {armsUp && <circle cx={29} cy={48} r={4} className="fill-accent decor-stroke-outline" strokeWidth={2} />}
      <polygon points="14,96 106,96 106,14" className="fill-accent decor-stroke-outline" strokeWidth={3} strokeLinejoin="round" />
      <Eye cx={70} cy={62} expression={expression} />
      <Eye cx={93} cy={62} expression={expression} />
      <path
        d={mouth[expression]}
        className={`decor-stroke-outline ${expression === 'cheer' ? 'decor-fill-outline' : ''}`}
        fill={expression === 'cheer' ? undefined : 'none'}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
