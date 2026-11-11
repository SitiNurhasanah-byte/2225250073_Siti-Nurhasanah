import { useState, type FormEvent } from 'react';
import type { Step } from '../../lib/content/schema';
import type { StepInput } from '../../lib/feedback/diagnose';
import { Button } from '../../components/Button';
import { MathText } from '../../components/MathText';
import { CartesianPlane } from '../../components/CartesianPlane';
import { parseNumber } from '../../lib/math/parse';
import { formatPoints } from '../../lib/feedback/format';

interface Props {
  step: Step;
  disabled: boolean;
  onSubmit: (input: StepInput) => void;
}

const inputClass =
  'min-h-[48px] w-full rounded-card border border-border bg-surface px-3 text-lg focus:border-accent disabled:opacity-60';

export function AnswerInput(props: Props) {
  switch (props.step.kind) {
    case 'number':
      return <TextAnswer {...props} kind="number" />;
    case 'equation':
      return <TextAnswer {...props} kind="equation" />;
    case 'choice':
      return <ChoiceAnswer {...props} />;
    case 'plot':
      return <PlotAnswer {...props} />;
  }
}

function TextAnswer({ step, disabled, onSubmit, kind }: Props & { kind: 'number' | 'equation' }) {
  const [text, setText] = useState('');
  const prefix = step.kind === 'number' ? step.prefix : undefined;
  const suffix = step.kind === 'number' ? step.suffix : undefined;
  function submit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ kind, text });
  }
  return (
    <form onSubmit={submit} className="space-y-2">
      <label className="block text-sm text-muted" htmlFor={`ans-${step.stage}-${step.label}`}>
        {kind === 'number' ? 'Jawabanmu (contoh: 17.000, −3, 1/2)' : 'Persamaanmu (contoh: y = 2x − 1)'}
      </label>
      <div className="flex items-center gap-2">
        {prefix && <span className="font-semibold">{prefix}</span>}
        <input
          id={`ans-${step.stage}-${step.label}`}
          className={inputClass}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          inputMode={kind === 'number' ? 'decimal' : 'text'}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={kind === 'equation' ? 'y = …' : ''}
        />
        {suffix && <span className="font-semibold">{suffix}</span>}
      </div>
      {kind === 'equation' && !disabled && (
        <div className="flex flex-wrap gap-2" aria-label="Sisipkan simbol">
          {['y = ', 'x', ' + ', ' − ', '/'].map((sym) => (
            <button key={sym} type="button" onClick={() => setText((t) => t + sym)} className="min-h-[40px] min-w-[44px] rounded-card border border-border px-2 font-mono">
              {sym.trim()}
            </button>
          ))}
        </div>
      )}
      <Button type="submit" disabled={disabled || text.trim() === ''} className="w-full sm:w-auto">
        Periksa
      </Button>
    </form>
  );
}

function ChoiceAnswer({ step, disabled, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  if (step.kind !== 'choice') return null;
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="sr-only">Pilih jawaban</legend>
      {step.options.map((option, i) => (
        <label
          key={i}
          className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-card border p-3 ${selected === i ? 'border-accent bg-accent-soft' : 'border-border bg-surface'}`}
        >
          <input type="radio" name={`choice-${step.stage}-${step.label}`} checked={selected === i} onChange={() => setSelected(i)} className="h-5 w-5 accent-[rgb(var(--accent))]" />
          <MathText text={option} />
        </label>
      ))}
      <Button disabled={disabled || selected === null} onClick={() => selected !== null && onSubmit({ kind: 'choice', index: selected })} className="w-full sm:w-auto">
        Periksa
      </Button>
    </fieldset>
  );
}

function PlotAnswer({ step, disabled, onSubmit }: Props) {
  const [points, setPoints] = useState<Array<[number, number]>>([]);
  const [typed, setTyped] = useState('');
  if (step.kind !== 'plot') return null;
  const g = step.graph;

  function toggle(x: number, y: number) {
    if (disabled) return;
    setPoints((prev) => (prev.some(([a, b]) => a === x && b === y) ? prev.filter(([a, b]) => a !== x || b !== y) : [...prev, [x, y]]));
  }
  function addTyped(e: FormEvent) {
    e.preventDefault();
    const parts = typed.replace(/[()]/g, '').split(/[,;]/).map((s) => parseNumber(s.trim()));
    if (parts.length === 2 && parts[0] && parts[1]) {
      toggle(parts[0].toNumber(), parts[1].toNumber());
      setTyped('');
    }
  }
  return (
    <div className="space-y-2">
      <CartesianPlane
        x={g.x} y={g.y} xStep={g.xStep} yStep={g.yStep}
        points={[...g.points.map((p) => ({ ...p, tone: 'muted' as const })), ...points.map(([x, y]) => ({ x, y, label: `(${x}, ${y})`.replace(/-/g, '−') }))]}
        onTap={disabled ? undefined : toggle}
        ariaLabel={`Bidang Cartesius untuk menaruh titik. Titik yang sudah ditaruh: ${points.length ? formatPoints(points) : 'belum ada'}`}
      />
      <p className="text-sm text-muted">Titikmu: {points.length ? formatPoints(points) : 'belum ada'}. Ketuk titik lagi untuk menghapus.</p>
      {!disabled && (
        <form onSubmit={addTyped} className="flex gap-2">
          <label className="sr-only" htmlFor={`typed-${step.stage}`}>Ketik koordinat</label>
          <input id={`typed-${step.stage}`} className={inputClass} value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="atau ketik, mis. 3, −5" />
          <Button type="submit" variant="secondary">Taruh</Button>
        </form>
      )}
      <div className="flex gap-2">
        <Button disabled={disabled || points.length === 0} onClick={() => onSubmit({ kind: 'plot', points })}>
          Periksa
        </Button>
        <Button variant="ghost" disabled={disabled || points.length === 0} onClick={() => setPoints([])}>
          Hapus semua
        </Button>
      </div>
    </div>
  );
}
