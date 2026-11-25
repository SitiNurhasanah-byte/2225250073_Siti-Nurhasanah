import { useState } from 'react';
import type { Module } from '../../lib/content/schema';
import { getTool } from '../../lib/content/loader';
import { Button } from '../../components/Button';
import { Card, ProgressBar } from '../../components/Card';
import { CognitiveChips } from '../../components/CognitiveChip';
import { MathText } from '../../components/MathText';
import { ToolCard } from './ToolCard';

/**
 * Fase "Mengenal alat" sebelum materi (RMT Fase I–II, docs/11 §5):
 * 1) jembatan dari bahasa sehari-hari ke konsep, 2) satu alat per layar.
 */
export function ToolIntro({ module, onFinish }: { module: Module; onFinish: () => void }) {
  const tools = module.rmt.tools.map(getTool).filter((t) => t !== undefined);
  const [index, setIndex] = useState(0);
  const total = tools.length + 1;

  const go = (i: number) => {
    setIndex(i);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-4">
      <ProgressBar value={index + 1} max={total} label={`Bagian ${index + 1} dari ${total}`} />
      {index === 0 ? (
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted">Dari bahasa sehari-hari</p>
            <p className="text-[1.05rem]"><MathText text={module.rmt.bridge} /></p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted">Cara berpikir yang akan kamu latih (ketuk untuk melihat artinya)</p>
            <CognitiveChips ids={module.rmt.functions} />
          </div>
          <p className="text-sm text-muted">
            Berikutnya kamu mengenal {tools.length} alat berpikir: {tools.map((t) => t.name).join(', ')}.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => go(1)}>Kenali alatnya →</Button>
          </div>
        </Card>
      ) : (
        <ToolCard
          key={tools[index - 1].id}
          tool={tools[index - 1]}
          nextLabel={index < tools.length ? 'Alat berikutnya →' : 'Mulai materi →'}
          onNext={() => (index < tools.length ? go(index + 1) : onFinish())}
        />
      )}
      {index > 0 && (
        <Button variant="ghost" onClick={() => go(index - 1)}>
          ← Kembali
        </Button>
      )}
    </div>
  );
}
