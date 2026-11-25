import { useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

/** Jendela kecil (bottom sheet di HP) yang ditutup sendiri oleh siswa. */
export function Dialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const titleId = useId();
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-card bg-surface p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="mb-2 text-lg font-semibold">
          {title}
        </h2>
        <div className="mb-4 space-y-2">{children}</div>
        <Button onClick={onClose} className="w-full" autoFocus>
          Tutup
        </Button>
      </div>
    </div>,
    document.body,
  );
}
