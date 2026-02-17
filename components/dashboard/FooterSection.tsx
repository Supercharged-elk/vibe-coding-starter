import clsx from 'clsx';
import {
  footerNavColumns,
  footerUtility,
  legalLinks,
  memberCategories,
} from '@/data/dashboard/content';
import { SectionLabel } from './SectionLabel';
import { PillButton } from './PillButton';

function SocialIcon({ label }: { label: string }) {
  return (
    <button
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-500 text-white transition-colors hover:bg-neutral-400"
    >
      <span className="text-xs font-bold">{label[0]}</span>
    </button>
  );
}

export function FooterSection() {
  return (
    <footer className="w-full">
      {/* Part 1: Light CTA area */}
      <div className="w-full bg-muted dark:bg-neutral-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16 text-center lg:px-8 lg:py-24">
          <SectionLabel className="text-foreground dark:text-white">
            Members
          </SectionLabel>

          <h2 className="max-w-lg text-2xl font-normal text-foreground sm:text-3xl dark:text-white">
            Join our network of organisations fighting poverty across Europe
          </h2>

          {/* Member category chips */}
          <div className="flex flex-wrap justify-center gap-4">
            {memberCategories.map((category) => (
              <div
                key={category}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-6 py-3',
                  'bg-white text-foreground shadow-sm',
                  'dark:bg-neutral-700 dark:text-white',
                )}
              >
                <span className="h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-300" />
                <span className="text-sm font-medium">{category}</span>
              </div>
            ))}
          </div>

          <PillButton variant="outlined">Learn more</PillButton>
        </div>
      </div>

      {/* Part 2: Dark footer */}
      <div className="w-full bg-neutral-700 dark:bg-neutral-800">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Logo + description */}
            <div className="lg:col-span-4">
              <div className="mb-6 flex h-16 w-40 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-white">
                EAPN
              </div>
              <p className="max-w-xs text-base text-white/80">
                The European Anti-Poverty Network is the largest European
                network fighting against poverty and social exclusion.
              </p>
            </div>

            {/* Nav columns */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3">
              {footerNavColumns.map((column) => (
                <div key={column.title}>
                  <span className="mb-4 block text-sm font-normal uppercase tracking-wider text-white/60">
                    {column.title}
                  </span>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-base font-bold text-white transition-colors hover:underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Utility column */}
            <div className="lg:col-span-3">
              <ul className="mb-6 flex flex-col gap-3">
                {footerUtility.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-base font-bold text-white transition-colors hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <span className="mb-3 block text-sm text-white/60">
                Find us here
              </span>
              <div className="flex gap-3">
                <SocialIcon label="Facebook" />
                <SocialIcon label="Twitter" />
                <SocialIcon label="LinkedIn" />
              </div>
            </div>
          </div>

          {/* Divider + legal */}
          <div className="mt-12 border-t border-white/20 pt-6">
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
