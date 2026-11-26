'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onReserveClick: () => void;
}

const NAV_LINKS = [
  { href: '#carte', label: 'La Carte' },
  { href: '#espaces', label: 'Les Espaces' },
  { href: '#live', label: 'Orchestre Live' },
  { href: '#infos', label: 'Infos & Accès' },
];

export function Header({ onReserveClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#110F0D]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-serif text-xl font-semibold tracking-tight text-[#F4EFE6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9822B]"
        >
          Kirikou
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B7ADA0]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#F4EFE6] hover:underline hover:underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9822B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onReserveClick}
            className="hidden sm:inline-flex min-h-10 items-center justify-center rounded-md bg-[#D9822B] px-5 py-2 text-sm font-semibold text-[#110F0D] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#E5933E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4EFE6]"
          >
            Réserver une table
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-[#F4EFE6] md:hidden focus-visible:outline-2 focus-visible:outline-[#D9822B]"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Menu mobile"
          className="border-t border-white/10 bg-[#1A1714] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-[#F4EFE6] hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onReserveClick();
              }}
              className="mt-2 flex min-h-11 w-full items-center justify-center rounded-md bg-[#D9822B] px-4 py-2.5 text-sm font-semibold text-[#110F0D]"
            >
              Réserver une table
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
