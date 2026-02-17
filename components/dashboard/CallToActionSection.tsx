import { ctaContent } from '@/data/dashboard/content';
import { PillButton } from './PillButton';

export function CallToActionSection() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10">
          <p className="max-w-3xl text-2xl font-normal text-foreground sm:text-3xl">
            {ctaContent.mainParagraph}
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ctaContent.columns.map((text, i) => (
              <p
                key={i}
                className="text-base font-normal text-muted-foreground"
              >
                {text}
              </p>
            ))}
          </div>

          <div>
            <PillButton variant="outlined">{ctaContent.buttonLabel}</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
