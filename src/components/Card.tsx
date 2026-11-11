import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-card border border-border bg-surface p-4 ${className}`}>{children}</section>;
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-border"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div className="h-full rounded-full bg-accent transition-all duration-200" style={{ width: `${percent}%` }} />
    </div>
  );
}
