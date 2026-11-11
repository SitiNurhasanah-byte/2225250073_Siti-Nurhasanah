import { MathText } from './MathText';

type Tone = 'success' | 'error' | 'info';

const toneStyle: Record<Tone, string> = {
  success: 'border-success/40 bg-success/10 text-success',
  error: 'border-error/40 bg-error/10 text-error',
  info: 'border-border bg-surface text-muted',
};
const icon: Record<Tone, string> = { success: '✓', error: '✕', info: 'i' };

/** Benar/salah tidak hanya warna: selalu ada ikon dan teks (docs/04 §5). */
export function Feedback({ tone, message, detail }: { tone: Tone; message: string; detail?: string }) {
  return (
    <div className={`flex gap-3 rounded-card border p-3 ${toneStyle[tone]}`} role="status" aria-live="polite">
      <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current font-bold">
        {icon[tone]}
      </span>
      <div className="text-text">
        <p className="font-semibold">
          <MathText text={message} />
        </p>
        {detail && (
          <p className="mt-1 text-muted">
            <MathText text={detail} />
          </p>
        )}
      </div>
    </div>
  );
}
