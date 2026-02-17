import { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type PillVariant = 'outlined' | 'filled' | 'chip';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillVariant;
}

const variantStyles: Record<PillVariant, string> = {
  outlined: clsx(
    'rounded-none border border-primary-500 bg-transparent text-primary-500',
    'hover:bg-primary-500 hover:text-white',
    'dark:border-primary-300 dark:text-primary-300',
    'dark:hover:bg-primary-300 dark:hover:text-gray-900',
  ),
  filled: clsx(
    'rounded-none border border-transparent bg-primary-500 text-white',
    'hover:bg-primary-700',
    'dark:bg-primary-300 dark:text-gray-900',
    'dark:hover:bg-primary-100',
  ),
  chip: clsx(
    'rounded-lg border border-transparent bg-white text-foreground',
    'hover:bg-gray-100',
    'dark:bg-neutral-700 dark:text-white',
    'dark:hover:bg-neutral-600',
  ),
};

export function PillButton({
  variant = 'outlined',
  className,
  children,
  ...props
}: PillButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'dark:focus:ring-primary-300 dark:focus:ring-offset-gray-900',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
