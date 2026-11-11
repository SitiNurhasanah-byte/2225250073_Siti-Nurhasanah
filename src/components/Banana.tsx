/** Ikon pisang gaya stiker (docs/04 §7.2a). Digambar sendiri, warna dekoratif lembut. */
const BODY = 'M36 9 C52 23 52 55 22 72 C15 76 9 73 13 68 C33 52 36 32 30 15 Z';

export function Banana({ size = 32, className = '', title }: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 60 80"
      width={size * 0.75}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={BODY} fill="none" className="stroke-white" strokeWidth={9} strokeLinejoin="round" />
      <path d={BODY} className="decor-fill-yellow decor-stroke-outline" strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M34 21 C41 37 37 55 20 66" fill="none" className="decor-stroke-yellow-dark" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M30 15 L33 5 L38 7 L36 13 Z" className="decor-fill-outline" />
      <circle cx={13.5} cy={69.5} r={2.3} className="decor-fill-outline" />
    </svg>
  );
}

const SPOTS: Array<[number, number, number]> = [
  [6, 4, -12], [58, 8, 10], [84, 30, -6], [14, 34, 14], [48, 42, -18],
  [78, 62, 8], [10, 66, -4], [40, 78, 16], [76, 88, -10], [26, 92, 6],
];

/** Pola latar pisang, opasitas rendah. Hanya untuk Sambutan, Beranda, dan Rekap (docs/04 §7.3). */
export function BananaPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden opacity-[0.12]" aria-hidden="true">
      {SPOTS.map(([left, top, rotate], i) => (
        <div key={i} className="absolute" style={{ left: `${left}%`, top: `${top}%`, transform: `rotate(${rotate}deg)` }}>
          <Banana size={44} />
        </div>
      ))}
    </div>
  );
}
