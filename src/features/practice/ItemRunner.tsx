import { useRef, useState } from 'react';
import type { Item, Step } from '../../lib/content/schema';
import { checkStep, type CheckResult, type StepInput } from '../../lib/feedback/diagnose';
import { formatInput } from '../../lib/feedback/format';
import { content } from '../../lib/content/loader';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Feedback } from '../../components/Feedback';
import { HintPanel } from '../../components/HintPanel';
import { MathText } from '../../components/MathText';
import { CartesianPlane } from '../../components/CartesianPlane';
import { describeGraph, graphToPlane } from '../../components/graphProps';
import { ProblemHeader } from './ProblemHeader';
import { AnswerInput } from './AnswerInputs';
import { SolvedStep, type StepStatus } from './StepView';

interface Props {
  item: Item;
  steps: Step[];
  prefill: number;
  moduleId: string;
  label: string;
  onDone: () => void;
}

/** Mengerjakan satu soal langkah demi langkah dengan petunjuk dan umpan balik (F5). */
export function ItemRunner({ item, steps, prefill, moduleId, label, onDone }: Props) {
  const addAttempt = useProgressStore((s) => s.addAttempt);
  const [index, setIndex] = useState(prefill);
  const [statuses, setStatuses] = useState<StepStatus[]>(() => steps.slice(0, prefill).map(() => 'prefilled'));
  const [result, setResult] = useState<CheckResult | null>(null);
  const [wrong, setWrong] = useState(0);
  const [hints, setHints] = useState(0);
  const startedAt = useRef(Date.now());

  const finished = index >= steps.length;
  const step = steps[index];
  const resolved = result?.status === 'correct' || statuses[index] === 'revealed';
  const showLines = finished || Boolean(step?.selfExplain);

  function submit(input: StepInput) {
    const check = checkStep(step, input, content.misconceptions);
    setResult(check);
    if (check.status === 'invalid') return;
    const correct = check.status === 'correct';
    if (!correct) setWrong((w) => w + 1);
    addAttempt({
      itemId: item.id,
      moduleId,
      stage: step.stage,
      stepIndex: item.steps.indexOf(step),
      answer: formatInput(step, input),
      correct,
      misconceptionCode: check.code,
      hintsUsed: hints,
      viewedSolution: false,
      durationMs: Date.now() - startedAt.current,
      stageScore: correct ? step.score : 0,
      timestamp: new Date().toISOString(),
    });
    if (correct) setStatuses((s) => [...s, 'correct']);
  }

  function reveal() {
    setStatuses((s) => [...s, 'revealed']);
    addAttempt({
      itemId: item.id, moduleId, stage: step.stage, stepIndex: item.steps.indexOf(step), answer: '(lihat pembahasan)',
      correct: false, hintsUsed: hints, viewedSolution: true, durationMs: Date.now() - startedAt.current, stageScore: 0,
      timestamp: new Date().toISOString(),
    });
  }

  function next() {
    setIndex((i) => i + 1);
    setResult(null);
    setWrong(0);
    startedAt.current = Date.now();
  }

  return (
    <div className="space-y-4">
      <ProblemHeader item={item} label={label} />
      {item.graph && step?.kind !== 'plot' && (
        <CartesianPlane {...graphToPlane(item.graph, { showLines })} ariaLabel={describeGraph(item.graph)} />
      )}

      {statuses.length > 0 && (
        <ol className="space-y-2" aria-label="Langkah yang sudah selesai">
          {steps.slice(0, Math.min(index, steps.length)).map((s, i) => (
            <SolvedStep key={i} step={s} status={statuses[i]} />
          ))}
        </ol>
      )}

      {!finished && (
        <Card className="space-y-3" key={index}>
          <p className="text-sm font-semibold text-muted">
            Tahap {step.stage} · {step.label} <span className="font-normal">({index + 1} dari {steps.length})</span>
          </p>
          <p className="text-[1.05rem]">
            <MathText text={step.prompt} />
          </p>
          <AnswerInput step={step} disabled={resolved} onSubmit={submit} />
          {result && result.status !== 'correct' && !resolved && (
            <Feedback tone={result.status === 'invalid' ? 'info' : 'error'} message={result.message} />
          )}
          {resolved && (
            <Feedback
              tone={statuses[index] === 'revealed' ? 'info' : 'success'}
              message={statuses[index] === 'revealed' ? 'Pembahasan langkah ini:' : 'Benar!'}
              detail={step.why}
            />
          )}
          {statuses[index] === 'revealed' && <SolvedStep step={step} status="revealed" />}
          {!resolved && <HintPanel hints={item.hints} used={hints} onReveal={() => setHints((h) => h + 1)} />}
          {!resolved && wrong >= 2 && (
            <Button variant="ghost" onClick={reveal}>
              Lihat pembahasan langkah ini
            </Button>
          )}
          {resolved && (
            <div className="flex justify-end">
              <Button onClick={next}>{index + 1 < steps.length ? 'Langkah berikutnya →' : 'Selesai →'}</Button>
            </div>
          )}
        </Card>
      )}

      {finished && (
        <Card className="space-y-3">
          <Feedback tone="success" message="Soal selesai!" detail={item.explanation} />
          {item.sameConceptNote && (
            <p className="rounded-card bg-accent-soft p-3 text-[0.95rem]">
              <strong>Konsep sama: </strong>
              <MathText text={item.sameConceptNote} />
            </p>
          )}
          <div className="flex justify-end">
            <Button onClick={onDone}>Lanjut →</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
