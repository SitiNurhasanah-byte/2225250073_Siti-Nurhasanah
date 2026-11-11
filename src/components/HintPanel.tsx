import { MathText } from './MathText';
import { Gari } from './Gari';

/** Petunjuk 3 tingkat: konsep → langkah pertama → contoh mirip (docs/02 §4). */
export function HintPanel({ hints, used, onReveal }: { hints: string[]; used: number; onReveal: () => void }) {
  const label = ['Pengingat konsep', 'Langkah pertama', 'Contoh mirip'];
  return (
    <div className="space-y-2">
      {used > 0 && (
        <div className="flex gap-3 rounded-card bg-hint-bg p-3 text-hint-fg">
          <Gari expression="think" size={44} className="shrink-0" />
          <ol className="space-y-2">
            {hints.slice(0, used).map((hint, i) => (
              <li key={i}>
                <span className="block text-sm font-semibold">Petunjuk {i + 1} · {label[i]}</span>
                <MathText text={hint} />
              </li>
            ))}
          </ol>
        </div>
      )}
      {used < hints.length && (
        <button
          type="button"
          onClick={onReveal}
          className="min-h-[44px] rounded-card px-3 font-semibold text-hint-fg hover:bg-hint-bg"
        >
          💡 {used === 0 ? 'Minta petunjuk' : 'Petunjuk berikutnya'} ({used}/{hints.length})
        </button>
      )}
    </div>
  );
}
