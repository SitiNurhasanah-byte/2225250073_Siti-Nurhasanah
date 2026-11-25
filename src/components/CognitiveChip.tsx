import { useState } from 'react';
import { getFunction } from '../lib/content/loader';
import { Dialog } from './Dialog';

const levelText = { 1: 'Level 1 · dasar', 2: 'Level 2 · menghubungkan', 3: 'Level 3 · berpikir tingkat tinggi' } as const;

/** Label fungsi kognitif RMT yang bisa diketuk untuk melihat artinya (docs/11 §2). */
export function CognitiveChip({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const fn = getFunction(id);
  if (!fn) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex min-h-[32px] items-center rounded-full border border-accent/40 bg-accent-soft px-3 text-sm font-semibold text-accent"
      >
        🧠 {fn.name}
      </button>
      {open && (
        <Dialog title={`Fungsi kognitif: ${fn.name}`} onClose={() => setOpen(false)}>
          <p className="text-sm text-muted">{levelText[fn.level]}</p>
          <p>{fn.definition}</p>
          <p className="rounded-card bg-accent-soft p-3">
            <strong>Tanya dirimu: </strong>
            {fn.question}
          </p>
        </Dialog>
      )}
    </>
  );
}

/** Deretan label fungsi kognitif untuk satu langkah. */
export function CognitiveChips({ ids, label = 'Fungsi kognitif yang dilatih' }: { ids: string[]; label?: string }) {
  if (ids.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={label}>
      {ids.map((id) => (
        <CognitiveChip key={id} id={id} />
      ))}
    </div>
  );
}
