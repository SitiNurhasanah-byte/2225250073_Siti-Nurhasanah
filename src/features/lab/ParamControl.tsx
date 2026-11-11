interface Props {
  label: string;
  value: string;
  raw: number;
  min: number;
  max: number;
  onMinus: () => void;
  onPlus: () => void;
  onRaw: (v: number) => void;
}

/** Pengatur nilai dengan tombol − / + dan slider (target sentuh ≥ 44 px). */
export function ParamControl({ label, value, raw, min, max, onMinus, onPlus, onRaw }: Props) {
  const id = `param-${label.replace(/\s/g, '')}`;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={id} className="font-semibold">{label}</label>
        <span className="min-w-[3ch] text-right text-xl font-semibold text-accent">{value}</span>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onMinus} className="h-11 w-11 shrink-0 rounded-card border border-border text-xl" aria-label={`Kurangi ${label}`}>
          −
        </button>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={1}
          value={raw}
          onChange={(e) => onRaw(Number(e.target.value))}
          className="h-11 flex-1 accent-[rgb(var(--accent))]"
          aria-valuetext={value}
        />
        <button type="button" onClick={onPlus} className="h-11 w-11 shrink-0 rounded-card border border-border text-xl" aria-label={`Tambah ${label}`}>
          +
        </button>
      </div>
    </div>
  );
}
