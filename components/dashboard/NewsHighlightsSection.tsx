import clsx from 'clsx';
import { type PolicyHighlight, policyHighlights } from '@/data/dashboard/content';
import { SectionLabel } from './SectionLabel';
import { ArrowButton } from './ArrowButton';

function HighlightCard({ item }: { item: PolicyHighlight }) {
  const isDark = item.theme === 'dark';

  return (
    <article
      className={clsx(
        'relative flex flex-col justify-between rounded-lg p-6',
        'min-h-[20rem]',
        isDark
          ? 'bg-neutral-700 text-white'
          : clsx(
              'bg-white text-foreground shadow-sm',
              'dark:bg-neutral-700 dark:text-white',
            ),
      )}
    >
      <div className="flex flex-col gap-3">
        <span
          className={clsx(
            'text-sm font-medium',
            isDark
              ? 'text-white/80'
              : 'text-muted-foreground dark:text-white/80',
          )}
        >
          {item.category}
        </span>

        <h3 className="text-2xl font-normal">{item.title}</h3>

        {item.description && (
          <p
            className={clsx(
              'text-sm',
              isDark ? 'text-white/60' : 'text-muted-foreground dark:text-white/60',
            )}
          >
            {item.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <ArrowButton
          theme={isDark ? 'dark' : 'light'}
          muted={!isDark}
        />
      </div>
    </article>
  );
}

export function NewsHighlightsSection() {
  const topRow = policyHighlights.slice(0, 2);
  const bottomRow = policyHighlights.slice(2, 5);

  return (
    <section className="w-full bg-muted dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3">
          <SectionLabel className="text-foreground dark:text-white">
            Policy Areas
          </SectionLabel>

          <h2 className="max-w-md text-2xl font-normal text-foreground sm:text-3xl dark:text-white">
            Key areas where we drive change
          </h2>
        </div>

        {/* Top row: 2 cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {topRow.map((item) => (
            <HighlightCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom row: 3 cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bottomRow.map((item) => (
            <HighlightCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
