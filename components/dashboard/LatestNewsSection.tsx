import { type NewsItem, newsItems } from '@/data/dashboard/content';
import { SectionLabel } from './SectionLabel';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="flex flex-col gap-2 rounded-lg bg-muted p-2 dark:bg-neutral-800">
      {/* Media placeholder */}
      <div className="aspect-[4/3] w-full rounded-lg bg-neutral-700 dark:bg-neutral-600" />

      <div className="flex flex-col gap-2 px-2 py-2">
        <time
          dateTime={item.date}
          className="text-sm text-muted-foreground"
        >
          {formatDate(item.date)}
        </time>

        <h3 className="text-lg font-semibold text-foreground dark:text-white">
          {item.title}
        </h3>

        <a
          href={item.href}
          className="text-sm font-medium text-primary-500 transition-opacity hover:opacity-70 dark:text-primary-300"
        >
          Read more
        </a>
      </div>
    </article>
  );
}

export function LatestNewsSection() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <SectionLabel className="text-foreground">
              Latest News & Publications
            </SectionLabel>

            <h2 className="max-w-md text-2xl font-normal text-foreground sm:text-3xl">
              Stay informed on our latest work and publications
            </h2>
          </div>

          {/* Decorative element placeholder */}
          <div className="hidden h-16 w-32 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground lg:flex">
            decorative
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newsItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
