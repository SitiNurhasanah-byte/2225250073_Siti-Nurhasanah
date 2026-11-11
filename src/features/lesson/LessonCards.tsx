import type { Module } from '../../lib/content/schema';
import { Button, ButtonLink } from '../../components/Button';
import { Card, ProgressBar } from '../../components/Card';
import { MathText } from '../../components/MathText';
import { CartesianPlane } from '../../components/CartesianPlane';
import { describeGraph, graphToPlane } from '../../components/graphProps';

interface Props {
  module: Module;
  index: number;
  onIndex: (i: number) => void;
  onFinish: () => void;
}

/** Kartu pelajaran: satu konsep per kartu, ≤ 3 kalimat, siswa mengatur tempo (F2). */
export function LessonCards({ module, index, onIndex, onFinish }: Props) {
  const card = module.cards[Math.min(index, module.cards.length - 1)];
  const isLast = index >= module.cards.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ProgressBar value={index + 1} max={module.cards.length} label="Kemajuan kartu" />
        <span className="shrink-0 text-sm text-muted">
          {index + 1} / {module.cards.length}
        </span>
      </div>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">{card.title}</h2>
        <p className="text-[1.05rem] leading-relaxed">
          <MathText text={card.body} />
        </p>
        {card.graph && <CartesianPlane {...graphToPlane(card.graph)} ariaLabel={describeGraph(card.graph)} />}
      </Card>

      <div className="flex items-center justify-between gap-2">
        <Button variant="secondary" disabled={index === 0} onClick={() => onIndex(index - 1)}>
          ← Kembali
        </Button>
        {isLast ? (
          <Button onClick={onFinish}>Lihat contoh soal →</Button>
        ) : (
          <Button onClick={() => onIndex(index + 1)}>Lanjut →</Button>
        )}
      </div>

      <div className="text-center">
        <ButtonLink to="/lab" variant="ghost">
          🧪 Coba sendiri di Lab Garis
        </ButtonLink>
      </div>
    </div>
  );
}
