import type { Step } from '../../lib/content/schema';
import { MathText } from '../../components/MathText';
import { formatAnswer } from '../../lib/feedback/format';

export type StepStatus = 'prefilled' | 'correct' | 'revealed' | 'example';

const statusText: Record<StepStatus, string> = {
  prefilled: 'sudah diisi',
  correct: '✓ benar',
  revealed: 'dibahas',
  example: '',
};

/** Langkah yang sudah selesai: pertanyaan, jawaban, dan alasannya. */
export function SolvedStep({ step, status, showWhy = false }: { step: Step; status: StepStatus; showWhy?: boolean }) {
  return (
    <li className="rounded-card border border-border bg-surface p-3">
      <div className="mb-1 flex items-center justify-between gap-2 text-sm">
        <span className="font-semibold text-muted">
          Tahap {step.stage} · {step.label}
        </span>
        {statusText[status] && (
          <span className={status === 'correct' ? 'font-semibold text-success' : 'text-muted'}>{statusText[status]}</span>
        )}
      </div>
      <p className="text-[0.95rem]">
        <MathText text={step.prompt} />
      </p>
      <p className="mt-1 font-semibold text-accent">
        <MathText text={formatAnswer(step)} />
      </p>
      {showWhy && (
        <p className="mt-1 text-[0.95rem] text-muted">
          <MathText text={step.why} />
        </p>
      )}
    </li>
  );
}
