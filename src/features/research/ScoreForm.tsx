import { useState } from 'react';
import type { Rubric } from '../../lib/content/schema';
import type { ResearchScore } from '../../store/useProgressStore';
import { Button } from '../../components/Button';

type Row = Rubric[number];

/** Input skor per tahap sesuai rubrik (0 sampai skor maksimum tahap). */
export function ScoreForm({ row, saved, onSave }: { row: Row; saved?: ResearchScore; onSave: (s: ResearchScore) => void }) {
  const [values, setValues] = useState<number[]>(saved?.stageScores ?? row.stages.map(() => 0));
  const [ok, setOk] = useState(false);
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-card border border-border p-3">
      <p className="font-semibold">
        {row.id} · {row.title}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {row.stages.map((max, i) => (
          <label key={i} className="flex flex-col text-center text-sm text-muted">
            T{i + 1} (≤{max})
            <select
              value={values[i]}
              onChange={(e) => {
                const next = [...values];
                next[i] = Number(e.target.value);
                setValues(next);
                setOk(false);
              }}
              className="mt-1 min-h-[44px] rounded-card border border-border bg-surface px-2 text-base text-text"
            >
              {Array.from({ length: max + 1 }, (_, v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span>
          Skor: <strong>{total} / 6</strong>
        </span>
        <Button
          variant="secondary"
          onClick={() => {
            onSave({ test: row.test, itemId: row.id, indicator: row.indicator, stageScores: values, total, enteredAt: new Date().toISOString() });
            setOk(true);
          }}
        >
          Simpan
        </Button>
        {ok && <span className="font-semibold text-success">✓ tersimpan</span>}
      </div>
    </div>
  );
}
