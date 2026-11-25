import { useState } from 'react';
import { content } from '../lib/content/loader';
import { Dialog } from './Dialog';

/** Istilah yang bisa diketuk untuk melihat definisi singkat (pre-training, docs/02 §2). */
export function GlossaryTerm({ term, label }: { term: string; label: string }) {
  const [open, setOpen] = useState(false);
  const definition = content.glossary[term];
  if (!definition) return <>{label}</>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-semibold text-accent underline decoration-dotted underline-offset-4"
        aria-haspopup="dialog"
      >
        {label}
      </button>
      {open && (
        <Dialog title={term.charAt(0).toUpperCase() + term.slice(1)} onClose={() => setOpen(false)}>
          <p>{definition}</p>
        </Dialog>
      )}
    </>
  );
}
