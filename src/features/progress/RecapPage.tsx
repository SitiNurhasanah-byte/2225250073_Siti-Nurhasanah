import { content, getItem, stepsFor } from '../../lib/content/loader';
import { bestStepScores, hintsUsed, lastEffort, sumScores, topMisconceptions } from '../../lib/progress/summary';
import { useProgressStore } from '../../store/useProgressStore';
import { TopBar } from '../../components/TopBar';
import { Card } from '../../components/Card';
import { Gari } from '../../components/Gari';
import { Banana, BananaPattern } from '../../components/Banana';
import { ButtonLink } from '../../components/Button';

/** L09 Rekap Kemajuan (F9). Tidak ada peringkat — hanya kemajuan diri sendiri. */
export function RecapPage() {
  const { modules, attempts, efforts } = useProgressStore();
  const started = content.modules.filter((m) => modules[m.id]);
  const review = topMisconceptions(attempts, undefined, 5);

  return (
    <>
      <BananaPattern />
      <div className="relative space-y-4">
        <TopBar title="Rekap Kemajuan" back="/" />
        {started.length === 0 ? (
          <Card className="flex flex-col items-center gap-3 py-8 text-center">
            <Gari expression="calm" size={110} />
            <p>Belum ada pisang terkumpul. Yuk mulai dari M1!</p>
            <ButtonLink to="/modul/M1/kartu">Mulai M1</ButtonLink>
          </Card>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-card bg-surface text-left">
                <thead>
                  <tr className="border-b border-border text-sm text-muted">
                    <th className="p-2">Modul</th>
                    <th className="p-2">Skor</th>
                    <th className="p-2">Petunjuk</th>
                    <th className="p-2">Usaha (1–9)</th>
                  </tr>
                </thead>
                <tbody>
                  {content.modules.map((m) => {
                    const max = m.practice.reduce((sum, ref) => {
                      const item = getItem(ref.itemId);
                      return item ? sum + stepsFor(item, ref).slice(ref.prefill).reduce((a, s) => a + s.score, 0) : sum;
                    }, 0);
                    const done = modules[m.id]?.completed;
                    return (
                      <tr key={m.id} className="border-b border-border">
                        <td className="p-2">
                          <span className="flex items-center gap-2">
                            {done ? <Banana size={20} title="Selesai" /> : <span className="w-[15px]" />}
                            <span>{m.id} <span className="hidden text-muted sm:inline">· {m.title}</span></span>
                          </span>
                        </td>
                        <td className="p-2">{modules[m.id] ? `${sumScores(bestStepScores(attempts, m.id)).toLocaleString('id-ID')} / ${max.toLocaleString('id-ID')}` : '—'}</td>
                        <td className="p-2">{modules[m.id] ? hintsUsed(attempts, m.id) : '—'}</td>
                        <td className="p-2">{lastEffort(efforts, m.id) ?? '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {review.length > 0 && (
              <Card>
                <h2 className="mb-2 font-semibold">Konsep yang perlu diulang</h2>
                <ul className="space-y-2">
                  {review.map(({ code, count }) => (
                    <li key={code} className="rounded-card bg-hint-bg p-3 text-hint-fg">
                      <strong>{content.misconceptions[code]?.title}</strong> <span className="text-sm">({count}×)</span>
                      <span className="block text-[0.95rem]">{content.misconceptions[code]?.message}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </>
        )}
      </div>
    </>
  );
}
