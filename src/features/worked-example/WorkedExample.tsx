import { useState } from 'react';
import type { Item, Step } from '../../lib/content/schema';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Feedback } from '../../components/Feedback';
import { CartesianPlane } from '../../components/CartesianPlane';
import { describeGraph, graphToPlane } from '../../components/graphProps';
import { ProblemHeader } from '../practice/ProblemHeader';
import { SolvedStep } from '../practice/StepView';

/**
 * Contoh soal bertahap (F4, worked example): langkah dibuka satu per satu oleh siswa,
 * setiap langkah memuat apa yang dilakukan dan alasannya. Tidak ada auto-advance (EL04).
 */
export function WorkedExample({ item, steps, onDone }: { item: Item; steps: Step[]; onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const allShown = shown >= steps.length;

  return (
    <div className="space-y-4">
      <ProblemHeader item={item} label="Contoh soal" />
      {item.graph && <CartesianPlane {...graphToPlane(item.graph)} ariaLabel={describeGraph(item.graph)} />}

      <ol className="space-y-2" aria-label="Langkah penyelesaian">
        {steps.slice(0, shown).map((s, i) => (
          <SolvedStep key={i} step={s} status="example" showWhy />
        ))}
      </ol>

      {!allShown && (
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted">
            {shown === 0 ? 'Baca soalnya dulu. Siap melihat langkah pertama?' : `Langkah ${shown} dari ${steps.length} sudah dibuka.`}
          </p>
          <div className="flex gap-2">
            {shown > 0 && (
              <Button variant="ghost" onClick={() => setShown((n) => n - 1)}>
                Tutup langkah
              </Button>
            )}
            <Button onClick={() => setShown((n) => n + 1)}>Langkah {shown + 1} →</Button>
          </div>
        </Card>
      )}

      {allShown && (
        <Card className="space-y-3">
          <Feedback tone="success" message="Ringkasan" detail={item.explanation} />
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="secondary" onClick={() => setShown(0)}>
              Ulangi dari awal
            </Button>
            <Button onClick={onDone}>Sekarang giliranmu →</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
