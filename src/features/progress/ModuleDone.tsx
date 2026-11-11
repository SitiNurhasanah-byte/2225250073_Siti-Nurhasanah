import type { Module } from '../../lib/content/schema';
import { content, getItem, nextModule, stepsFor } from '../../lib/content/loader';
import { bestStepScores, hintsUsed, sumScores, topMisconceptions } from '../../lib/progress/summary';
import { useProgressStore } from '../../store/useProgressStore';
import { ButtonLink } from '../../components/Button';
import { Card } from '../../components/Card';
import { Gari } from '../../components/Gari';
import { Banana } from '../../components/Banana';

/** Ringkasan modul + pisang terkumpul (F9, F14 non-kompetitif). */
export function ModuleDone({ module }: { module: Module }) {
  const attempts = useProgressStore((s) => s.attempts);
  const max = module.practice.reduce((sum, ref) => {
    const item = getItem(ref.itemId);
    return item ? sum + stepsFor(item, ref).slice(ref.prefill).reduce((a, s) => a + s.score, 0) : sum;
  }, 0);
  const earned = sumScores(bestStepScores(attempts, module.id));
  const review = topMisconceptions(attempts, module.id);
  const next = nextModule(module.id);

  return (
    <div className="space-y-4">
      <Card className="flex items-center gap-4">
        <Gari expression="cheer" size={88} />
        <div>
          <h2 className="text-xl font-semibold">Modul {module.id} selesai!</h2>
          <p className="flex items-center gap-2 text-muted">
            <Banana size={28} /> Kamu mengumpulkan 1 pisang.
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="mb-2 font-semibold">Yang perlu diingat</h3>
        <ul className="list-disc space-y-1 pl-5">
          {module.recap.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Card>

      <Card className="grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-2xl font-semibold">{earned.toLocaleString('id-ID')} / {max.toLocaleString('id-ID')}</p>
          <p className="text-sm text-muted">skor latihan</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">{hintsUsed(attempts, module.id)}</p>
          <p className="text-sm text-muted">petunjuk dipakai</p>
        </div>
      </Card>

      {review.length > 0 && (
        <Card>
          <h3 className="mb-2 font-semibold">Konsep yang perlu diulang</h3>
          <ul className="space-y-2">
            {review.map(({ code }) => (
              <li key={code} className="rounded-card bg-hint-bg p-3 text-hint-fg">
                <strong>{content.misconceptions[code]?.title}</strong>
                <span className="block text-[0.95rem]">{content.misconceptions[code]?.message}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="flex flex-wrap justify-between gap-2">
        <ButtonLink to="/" variant="secondary">
          Peta Belajar
        </ButtonLink>
        {next && <ButtonLink to={`/modul/${next.id}/kartu`}>Lanjut ke {next.id} →</ButtonLink>}
      </div>
    </div>
  );
}
