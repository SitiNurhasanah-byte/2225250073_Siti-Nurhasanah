import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getItem, getModule, stepsFor } from '../../lib/content/loader';
import { modulesLocked, selectModule, useProgressStore, type Phase } from '../../store/useProgressStore';
import { TopBar } from '../../components/TopBar';
import { LessonCards } from '../lesson/LessonCards';
import { WorkedExample } from '../worked-example/WorkedExample';
import { ItemRunner } from '../practice/ItemRunner';
import { EffortScale } from '../progress/EffortScale';
import { ModuleDone } from '../progress/ModuleDone';
import { BananaPattern } from '../../components/Banana';

const PHASES: Phase[] = ['kartu', 'contoh', 'latihan', 'usaha', 'selesai'];
const phaseTitle: Record<Phase, string> = {
  kartu: 'Materi',
  contoh: 'Contoh soal',
  latihan: 'Latihan',
  usaha: 'Usaha belajar',
  selesai: 'Rekap modul',
};

/** Alur modul: kartu → contoh → latihan → skala usaha → rekap (docs/02 §3). */
export function ModulePage() {
  const { id, phase } = useParams<{ id: string; phase: Phase }>();
  const navigate = useNavigate();
  const module = getModule(id);
  const progress = useProgressStore((s) => (id ? selectModule(s, id) : undefined));
  const locked = useProgressStore(modulesLocked);
  const updateModule = useProgressStore((s) => s.updateModule);
  const addEffort = useProgressStore((s) => s.addEffort);

  const validPhase = phase && PHASES.includes(phase);
  useEffect(() => {
    if (module && validPhase) {
      updateModule(module.id, phase === 'selesai' ? { phase, completed: true } : { phase });
    }
  }, [module, phase, validPhase, updateModule]);

  if (!module || !progress) return <Navigate to="/" replace />;
  if (locked) return <Navigate to="/" replace />;
  if (!validPhase) return <Navigate to={`/modul/${module.id}/${progress.phase}`} replace />;

  const go = (p: Phase) => {
    navigate(`/modul/${module.id}/${p}`);
    window.scrollTo(0, 0);
  };

  let body;
  if (phase === 'kartu') {
    body = (
      <LessonCards
        module={module}
        index={Math.min(progress.cardIndex, module.cards.length - 1)}
        onIndex={(i) => {
          updateModule(module.id, { cardIndex: i });
          window.scrollTo(0, 0);
        }}
        onFinish={() => go('contoh')}
      />
    );
  } else if (phase === 'contoh') {
    const item = getItem(module.example.itemId)!;
    body = <WorkedExample item={item} steps={stepsFor(item, module.example)} onDone={() => go('latihan')} />;
  } else if (phase === 'latihan') {
    const practiceIndex = Math.min(progress.practiceIndex, module.practice.length - 1);
    const ref = module.practice[practiceIndex];
    const item = getItem(ref.itemId)!;
    body = (
      <ItemRunner
        key={`${ref.itemId}-${practiceIndex}`}
        item={item}
        steps={stepsFor(item, ref)}
        prefill={ref.prefill}
        moduleId={module.id}
        label={`Latihan ${practiceIndex + 1} dari ${module.practice.length}`}
        onDone={() => {
          if (practiceIndex + 1 < module.practice.length) {
            updateModule(module.id, { practiceIndex: practiceIndex + 1 });
            window.scrollTo(0, 0);
          } else {
            updateModule(module.id, { practiceIndex: 0 });
            go('usaha');
          }
        }}
      />
    );
  } else if (phase === 'usaha') {
    body = (
      <EffortScale
        onSave={(score) => {
          addEffort(module.id, score);
          go('selesai');
        }}
      />
    );
  } else {
    body = <ModuleDone module={module} />;
  }

  return (
    <>
      {phase === 'selesai' && <BananaPattern />}
      <div className="relative">
        <TopBar title={`${module.id} · ${phaseTitle[phase]}`} back="/" />
        <p className="-mt-2 mb-4 text-muted">{module.title}</p>
        {body}
      </div>
    </>
  );
}
