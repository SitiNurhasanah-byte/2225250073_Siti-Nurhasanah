import { useState } from 'react';
import type { Tool } from '../../lib/content/schema';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Feedback } from '../../components/Feedback';
import { MathText } from '../../components/MathText';
import { ToolVisual } from './ToolVisual';

/**
 * Satu alat psikologis matematis (Fase I RMT): struktur → fungsi → makna, lalu satu soal cek.
 * Siswa harus menjawab cek sebelum lanjut, tetapi boleh mencoba berkali-kali.
 */
export function ToolCard({ tool, onNext, nextLabel }: { tool: Tool; onNext: () => void; nextLabel: string }) {
  const markToolChecked = useProgressStore((s) => s.markToolChecked);
  const [choice, setChoice] = useState<number | null>(null);
  const correct = choice === tool.check.answer;

  function pick(i: number) {
    setChoice(i);
    markToolChecked(tool.id, i === tool.check.answer);
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-muted">Alat berpikir</p>
        <h2 className="text-xl font-semibold">{tool.name}</h2>
        <ToolVisual visual={tool.visual} />
        <dl className="space-y-2">
          <div>
            <dt className="font-semibold">Bentuknya (struktur)</dt>
            <dd><MathText text={tool.structure} /></dd>
          </div>
          <div>
            <dt className="font-semibold">Gunanya (fungsi)</dt>
            <dd><MathText text={tool.function} /></dd>
          </div>
          <div>
            <dt className="font-semibold">Mengapa bekerja (makna)</dt>
            <dd><MathText text={tool.meaning} /></dd>
          </div>
        </dl>
        <details className="rounded-card bg-accent-soft p-3">
          <summary className="cursor-pointer font-semibold text-accent">Pertanyaan untuk dirimu</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {tool.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </details>
      </Card>

      <Card className="space-y-3">
        <p className="font-semibold"><MathText text={tool.check.prompt} /></p>
        <div className="grid gap-2" role="radiogroup" aria-label="Pilihan jawaban">
          {tool.check.options.map((opt, i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={choice === i}
              onClick={() => pick(i)}
              disabled={correct}
              className={`min-h-[44px] rounded-card border px-3 py-2 text-left ${choice === i ? 'border-accent bg-accent-soft' : 'border-border'}`}
            >
              <MathText text={opt} />
            </button>
          ))}
        </div>
        {choice !== null && (
          <Feedback
            tone={correct ? 'success' : 'error'}
            message={correct ? 'Tepat!' : 'Belum tepat. Baca lagi bagian "gunanya", lalu coba pilihan lain.'}
            detail={correct ? tool.check.why : undefined}
          />
        )}
        {correct && (
          <div className="flex justify-end">
            <Button onClick={onNext}>{nextLabel}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
