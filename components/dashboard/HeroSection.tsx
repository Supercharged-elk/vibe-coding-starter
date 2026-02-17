import { heroContent } from '@/data/dashboard/content';

export function HeroSection() {
  return (
    <section className="w-full bg-neutral-700 dark:bg-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6">
          <h1 className="max-w-xl font-sans text-4xl font-normal text-white sm:text-5xl lg:text-6xl">
            {heroContent.headline.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>

          <p className="max-w-lg text-lg font-normal text-white/80 lg:text-xl">
            {heroContent.body}
          </p>
        </div>
      </div>
    </section>
  );
}
