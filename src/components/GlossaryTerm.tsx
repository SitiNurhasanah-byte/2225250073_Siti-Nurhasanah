import { useState } from 'react';
import { createPortal } from 'react-dom';
import { content } from '../lib/content/loader';
import { Button } from './Button';

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
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 sm:items-center"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="glossary-title"
              className="w-full max-w-md rounded-card bg-surface p-5 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="glossary-title" className="mb-2 text-lg font-semibold capitalize">
                {term}
              </h2>
              <p className="mb-4">{definition}</p>
              <Button onClick={() => setOpen(false)} className="w-full" autoFocus>
                Tutup
              </Button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
