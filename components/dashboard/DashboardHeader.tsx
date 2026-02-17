'use client';

import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import clsx from 'clsx';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';
import { PillButton } from './PillButton';
import { navLinks } from '@/data/dashboard/content';

export function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-10">
          {/* Logo placeholder */}
          <div className="flex h-12 w-28 items-center justify-center bg-neutral-700 text-sm font-bold text-white dark:bg-neutral-600">
            EAPN
          </div>

          <nav className="hidden gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-bold text-foreground transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />

          <div className="hidden items-center gap-3 sm:flex">
            <PillButton
              variant="chip"
              className="rounded-lg px-4 py-2 text-xs"
            >
              ENG
            </PillButton>

            <PillButton variant="outlined" className="px-4 py-2 text-sm">
              Member&apos;s room
            </PillButton>

            <PillButton variant="filled" className="px-4 py-2 text-sm">
              Take action
            </PillButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-bold text-foreground transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-wrap gap-3 sm:hidden">
            <PillButton
              variant="chip"
              className="rounded-lg px-4 py-2 text-xs"
            >
              ENG
            </PillButton>
            <PillButton variant="outlined" className="px-4 py-2 text-sm">
              Member&apos;s room
            </PillButton>
            <PillButton variant="filled" className="px-4 py-2 text-sm">
              Take action
            </PillButton>
          </div>
        </div>
      )}
    </header>
  );
}
