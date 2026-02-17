import clsx from 'clsx';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={clsx(
        'text-sm font-bold uppercase tracking-wider',
        className,
      )}
    >
      {children}
    </span>
  );
}
