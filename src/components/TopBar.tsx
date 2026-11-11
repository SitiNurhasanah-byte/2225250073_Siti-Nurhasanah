import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/** Tombol Kembali selalu di kiri atas (docs/04 §4). */
export function TopBar({ title, back, right }: { title: string; back?: string; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 -mx-4 mb-4 flex min-h-[56px] items-center gap-2 border-b border-border bg-bg/95 px-4 backdrop-blur">
      {back && (
        <Link
          to={back}
          className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-card text-xl text-accent hover:bg-accent-soft"
          aria-label="Kembali"
        >
          ←
        </Link>
      )}
      <h1 className="flex-1 truncate text-[1.3rem] font-semibold">{title}</h1>
      {right}
    </header>
  );
}
