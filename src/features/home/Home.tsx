import { Link } from 'react-router-dom';
import { content, getModule } from '../../lib/content/loader';
import { modulesLocked, useProgressStore, type Phase } from '../../store/useProgressStore';
import { ButtonLink } from '../../components/Button';
import { Card } from '../../components/Card';
import { Gari } from '../../components/Gari';
import { Banana, BananaPattern } from '../../components/Banana';

const phaseLabel: Record<Phase, string> = {
  kartu: 'materi',
  contoh: 'contoh soal',
  latihan: 'latihan',
  usaha: 'skala usaha',
  selesai: 'rekap',
};

/** L02 Beranda / Peta Belajar (F1). Modul tidak dikunci, hanya diberi saran urutan. */
export function Home() {
  const { studentCode, modules, lastModuleId } = useProgressStore();
  const locked = useProgressStore(modulesLocked);
  const last = getModule(lastModuleId ?? undefined);
  const lastProgress = last ? modules[last.id] : undefined;
  const bananas = content.modules.filter((m) => modules[m.id]?.completed).length;

  return (
    <>
      <BananaPattern />
      <div className="relative space-y-5 py-4">
        <header className="flex items-center justify-between">
          <span className="text-xl font-bold text-accent">GarisKu</span>
          <Link to="/pengaturan" className="inline-flex h-11 w-11 items-center justify-center rounded-card text-2xl hover:bg-accent-soft" aria-label="Pengaturan">
            ⚙
          </Link>
        </header>

        <div className="flex items-center gap-4">
          <Gari expression="wave" size={84} />
          <div>
            <h1 className="text-2xl font-semibold">Halo, {studentCode}!</h1>
            <p className="flex items-center gap-1 text-muted">
              <Banana size={22} /> {bananas} dari {content.modules.length} pisang terkumpul
            </p>
          </div>
        </div>

        {locked && (
          <Card className="border-hint-fg/40 bg-hint-bg text-hint-fg">
            Modul akan terbuka setelah peneliti menandai <strong>pretest</strong> selesai.
          </Card>
        )}

        {last && lastProgress && !locked && (
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted">Lanjutkan belajar</p>
              <p className="font-semibold">{last.id} · {last.title}</p>
              <p className="text-sm text-muted">Bagian: {phaseLabel[lastProgress.phase]}</p>
            </div>
            <ButtonLink to={`/modul/${last.id}`}>Lanjut →</ButtonLink>
          </Card>
        )}

        <section>
          <h2 className="mb-2 text-lg font-semibold">Peta Belajar</h2>
          <ol className="space-y-2">
            {content.modules.map((m) => {
              const p = modules[m.id];
              const status = p?.completed ? 'done' : p ? 'doing' : 'todo';
              const icon = { done: '●', doing: '◐', todo: '○' }[status];
              const statusText = { done: 'selesai', doing: 'sedang dipelajari', todo: 'belum dimulai' }[status];
              return (
                <li key={m.id}>
                  <Link
                    to={locked ? '/' : `/modul/${m.id}`}
                    aria-disabled={locked}
                    className={`flex min-h-[64px] items-center gap-3 rounded-card border border-border bg-surface p-3 hover:border-accent ${locked ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <span className={`text-xl ${status === 'todo' ? 'text-muted' : 'text-accent'}`} aria-hidden="true">{icon}</span>
                    <span className="flex-1">
                      <span className="block font-semibold">{m.id} · {m.title}</span>
                      <span className="block text-sm text-muted">{m.summary} — {statusText}</span>
                    </span>
                    {status === 'done' && <Banana size={26} title="Pisang terkumpul" />}
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="grid grid-cols-2 gap-2">
          <ButtonLink to="/lab" variant="secondary">🧪 Lab Garis</ButtonLink>
          <ButtonLink to="/rekap" variant="secondary">📊 Rekap</ButtonLink>
        </div>
      </div>
    </>
  );
}
