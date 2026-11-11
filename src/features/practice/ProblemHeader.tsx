import type { Item } from '../../lib/content/schema';
import { indicatorLabel } from '../../lib/content/schema';
import { MathText } from '../../components/MathText';
import { Card } from '../../components/Card';

/** Soal + kotak "Diketahui/Ditanya" (GL05, EL05: selalu tampilkan yang ditanya). */
export function ProblemHeader({ item, label }: { item: Item; label: string }) {
  return (
    <Card className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <span className="font-semibold text-accent">{label}</span>
        <span aria-hidden="true">·</span>
        <span>{item.title}</span>
        {item.draft && <span className="rounded-full border border-border px-2 text-xs">draf</span>}
      </div>
      <p>
        <MathText text={item.context} />
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-card bg-accent-soft/60 p-3">
          <p className="mb-1 text-sm font-semibold">Diketahui</p>
          <ul className="list-disc space-y-1 pl-5 text-[0.95rem]">
            {item.given.map((g, i) => (
              <li key={i}>
                <MathText text={g} />
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card bg-accent-soft/60 p-3">
          <p className="mb-1 text-sm font-semibold">Ditanya</p>
          <ul className="list-disc space-y-1 pl-5 text-[0.95rem]">
            {item.asked.map((a, i) => (
              <li key={i}>
                <MathText text={a} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-xs text-muted">Proses: {indicatorLabel[item.indicator]}</p>
    </Card>
  );
}
