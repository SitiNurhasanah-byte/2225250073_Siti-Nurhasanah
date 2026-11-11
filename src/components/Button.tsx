import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

const styles: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:opacity-90 disabled:opacity-40',
  secondary: 'border border-border bg-surface text-text hover:bg-accent-soft disabled:opacity-40',
  ghost: 'text-accent hover:bg-accent-soft disabled:opacity-40',
};

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-card px-4 py-2 font-semibold transition-colors duration-150 disabled:cursor-not-allowed';

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type} className={`${base} ${styles[variant]} ${className}`} {...rest} />;
}

export function ButtonLink({ variant = 'primary', className = '', ...rest }: LinkProps & { variant?: Variant }) {
  return <Link className={`${base} ${styles[variant]} ${className}`} {...rest} />;
}
