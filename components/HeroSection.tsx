'use client';

import { ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/kirikou-data';
import { KIRIKOU_ASSETS } from '@/lib/assets';
import { VisualImage } from './VisualImage';

interface HeroSectionProps {
  onReserveClick: () => void;
}

const KEY_FACTS = [
  { label: 'Architecture', value: '04 Espaces & Niveaux' },
  { label: 'Service Continu', value: '12h00 – 02h00 · 7j/7' },
  { label: 'Orchestre Live', value: 'Mercredi – Dimanche' },
  { label: 'Appréciation', value: '4,2 / 5 · +1 000 Avis' },
];

export function HeroSection({ onReserveClick }: HeroSectionProps) {
  return (
    <section id="top" className="scroll-mt-20 border-b border-white/10 bg-[#110F0D]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-14">
        {/* 2-Column Editorial Split with items-stretch */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-sm font-medium text-[#D9822B]">
                <span>{RESTAURANT_INFO.neighborhood}</span>
                <span aria-hidden="true" className="mx-2 text-white/30">·</span>
                <span>{RESTAURANT_INFO.city}</span>
              </p>

              <h1 className="mt-4 font-serif text-[clamp(2.35rem,4.4vw,3.85rem)] font-semibold leading-[1.08] tracking-tight text-[#F4EFE6] [text-wrap:balance]">
                La table béninoise, la braise et les nuits live à Cotonou.
              </h1>

              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-[#B7ADA0] sm:text-lg">
                Du déjeuner d’affaires autour d’un Dakouin ou d’un Crincrin Royale aux grands
                plateaux de Choukouya face à l’orchestre, puis jusqu’au dernier verre sur le
                rooftop Le Wakanda.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={onReserveClick}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#D9822B] px-6 py-3 text-sm font-semibold text-[#110F0D] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#E5933E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4EFE6] sm:w-auto"
              >
                <span>Réserver une table</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#carte"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-[#F4EFE6] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9822B] sm:w-auto"
              >
                Parcourir la carte
              </a>
            </div>
          </div>

          {/* Right 16:9 Architectural Hero Visual */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#1A1714] lg:col-span-6">
            <div className="relative aspect-[16/10] w-full lg:h-full lg:aspect-auto">
              <VisualImage
                asset={KIRIKOU_ASSETS.heroLounge}
                alt="Salle principale et scène musicale du Kirikou Restaurant & Bar à Cotonou"
                fallbackTitle="Kirikou Restaurant & Bar"
                priority
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#110F0D]/95 via-[#110F0D]/50 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-medium text-[#D9822B]">
                  Rue Houdou Ali · Fidjrossè
                </p>
                <p className="mt-1 font-serif text-lg font-semibold text-[#F4EFE6]">
                  Rez-de-Chaussée & Scène Centrale
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Key Facts Strip below Hero Split */}
        <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-8">
          {KEY_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium text-[#B7ADA0]">{fact.label}</dt>
              <dd className="mt-1 font-serif text-base font-semibold text-[#F4EFE6] tabular-nums sm:text-lg">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
