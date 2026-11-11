import { useState } from 'react';
import { content } from '../../lib/content/loader';
import { indicatorLabel } from '../../lib/content/schema';
import { useProgressStore } from '../../store/useProgressStore';
import { TopBar } from '../../components/TopBar';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ScoreForm } from './ScoreForm';

type Test = 'pretest' | 'posttest';

const fmtDate = (iso: string | null) => (iso ? new Date(iso).toLocaleString('id-ID') : 'belum');

/**
 * L10 Status Penelitian (F10). Pretest & posttest dikerjakan di kertas;
 * soal posttest TIDAK ada di aplikasi. Halaman ini hanya mencatat status dan skor.
 */
export function ResearchPage() {
  const s = useProgressStore();
  const [test, setTest] = useState<Test>('pretest');
  const rows = content.rubric.filter((r) => r.test === test);
  const scores = s.researchScores.filter((r) => r.test === test);
  const total = scores.reduce((a, r) => a + r.total, 0);

  return (
    <div className="space-y-4">
      <TopBar title="Menu Peneliti" back="/pengaturan" />

      <Card className="space-y-3">
        <label className="flex min-h-[44px] items-center gap-3">
          <input type="checkbox" className="h-5 w-5" checked={s.researchMode} onChange={(e) => s.setResearchMode(e.target.checked)} />
          <span>
            <strong>Mode penelitian</strong>
            <span className="block text-sm text-muted">Modul terkunci sampai pretest ditandai selesai.</span>
          </span>
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {(['pretest', 'posttest'] as const).map((t) => {
            const doneAt = t === 'pretest' ? s.pretestDoneAt : s.posttestDoneAt;
            return (
              <div key={t} className="rounded-card border border-border p-3">
                <p className="font-semibold capitalize">{t}</p>
                <p className="text-sm text-muted">Selesai: {fmtDate(doneAt)}</p>
                <Button variant="secondary" className="mt-2" onClick={() => s.markTest(t, !doneAt)}>
                  {doneAt ? 'Batalkan tanda' : 'Tandai selesai'}
                </Button>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-muted">
          Pretest: BS-1 s.d. BS-4. Posttest: PT-1 s.d. PT-4 (paralel). Keduanya dikerjakan di lembar kertas
          tanpa petunjuk, lalu dinilai dengan rubrik di docs/10-bank-soal.md.
        </p>
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold">Input skor dari lembar tes</h2>
        <div className="flex gap-2" role="tablist">
          {(['pretest', 'posttest'] as const).map((t) => (
            <button key={t} role="tab" aria-selected={test === t} onClick={() => setTest(t)} className={`min-h-[44px] rounded-card border px-4 capitalize ${test === t ? 'border-accent bg-accent-soft font-semibold text-accent' : 'border-border'}`}>
              {t}
            </button>
          ))}
        </div>
        {rows.map((r) => (
          <ScoreForm key={`${test}-${r.id}`} row={r} saved={scores.find((x) => x.itemId === r.id)} onSave={s.saveResearchScore} />
        ))}
        <div className="rounded-card bg-accent-soft p-3">
          <p>
            Total {test}: <strong>{total} / 24</strong> · Nilai <strong>{Math.round((total / 24) * 100)}</strong>
          </p>
          <ul className="mt-1 text-sm">
            {rows.map((r) => (
              <li key={r.id}>{indicatorLabel[r.indicator]}: {scores.find((x) => x.itemId === r.id)?.total ?? '—'} / 6</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
