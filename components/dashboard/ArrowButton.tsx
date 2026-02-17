import clsx from 'clsx';
import { ArrowUpRightIcon } from 'lucide-react';

interface ArrowButtonProps {
  theme?: 'dark' | 'light';
  className?: string;
  muted?: boolean;
}

export function ArrowButton({
  theme = 'light',
  className,
  muted = false,
}: ArrowButtonProps) {
  return (
    <button
      aria-label="Navigate"
      className={clsx(
        'flex h-16 w-16 items-center justify-center rounded-full border transition-colors',
        theme === 'dark'
          ? clsx(
              'border-white text-white',
              'hover:bg-white hover:text-neutral-700',
            )
          : clsx(
              'border-primary-500 text-primary-500',
              'hover:bg-primary-500 hover:text-white',
              'dark:border-primary-300 dark:text-primary-300',
              'dark:hover:bg-primary-300 dark:hover:text-gray-900',
            ),
        muted && 'opacity-60 hover:opacity-100',
        className,
      )}
    >
      <ArrowUpRightIcon className="h-6 w-6" />
    </button>
  );
}
