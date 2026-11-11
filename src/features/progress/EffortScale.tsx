import { useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

/** Skala usaha mental Paas 1–9 setelah satu set latihan (F9, docs/07 §4). Tanpa dekorasi (docs/04 §7.3). */
export function EffortScale({ onSave }: { onSave: (score: number) => void }) {
  const [score, setScore] = useState<number | null>(null);
  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-semibold">Seberapa besar usaha pikiranmu untuk latihan tadi?</h2>
      <p className="text-muted">Tidak ada jawaban benar atau salah. Pilih yang paling sesuai.</p>
      <fieldset>
        <legend className="sr-only">Skala usaha 1 sampai 9</legend>
        <div className="grid grid-cols-9 gap-1">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <label
              key={n}
              className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-card border text-lg font-semibold ${score === n ? 'border-accent bg-accent text-white' : 'border-border bg-surface'}`}
            >
              <input type="radio" name="effort" value={n} className="sr-only" checked={score === n} onChange={() => setScore(n)} />
              {n}
            </label>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-sm text-muted">
          <span>sangat ringan</span>
          <span>sangat berat</span>
        </div>
      </fieldset>
      <div className="flex justify-end">
        <Button disabled={score === null} onClick={() => score !== null && onSave(score)}>
          Simpan
        </Button>
      </div>
    </Card>
  );
}
