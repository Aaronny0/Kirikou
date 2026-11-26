'use client';

import { ArrowUpRight } from 'lucide-react';
import { SPACES, SpaceId } from '@/lib/kirikou-data';
import { KIRIKOU_ASSETS } from '@/lib/assets';
import { VisualImage } from './VisualImage';

interface SpacesSectionProps {
  selectedSpaceId: SpaceId;
  onSelectSpaceToBook: (spaceId: SpaceId) => void;
}

export function SpacesSection({
  selectedSpaceId,
  onSelectSpaceToBook,
}: SpacesSectionProps) {
  return (
    <section id="espaces" className="scroll-mt-20 border-b border-white/10 bg-[#110F0D] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#D9822B]">
              Architecture Multi-Niveaux
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#F4EFE6] sm:text-4xl [text-wrap:balance]">
              Quatre ambiances distinctes sous un même toit
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#B7ADA0] lg:col-span-5 sm:text-base">
            Choisissez votre niveau selon le rythme de votre soirée : face aux musiciens, en
            mezzanine panoramique, au calme du Fumoir ou sous les lumières du Wakanda.
          </p>
        </div>

        {/* Asymmetric Layout: Left Featured Wakanda Visual + Right 4-Level Architectural List */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#1A1714] lg:col-span-5">
            <div className="relative aspect-[4/3] w-full lg:h-full lg:aspect-auto">
              <VisualImage
                asset={KIRIKOU_ASSETS.spaceWakanda}
                alt="Rooftop lounge et bar Le Wakanda au dernier niveau du Kirikou à Cotonou"
                fallbackTitle="R+2 · Le Wakanda"
                className="h-full w-full object-cover object-left"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#110F0D]/95 via-[#110F0D]/50 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-medium text-[#D9822B]">
                  Dernier Niveau · R+2
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#F4EFE6]">
                  Le Wakanda Rooftop
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#E3DBD0]">
                  Cocktails signature, brise côtière de Fidjrossè et DJ sets jusqu’à 02h00 du matin.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {SPACES.map((space) => {
              const isSelected = selectedSpaceId === space.id;
              return (
                <article
                  key={space.id}
                  className={`flex flex-col justify-between rounded-xl border p-6 transition-colors duration-150 ${
                    isSelected
                      ? 'border-[#D9822B] bg-[#1D1814]'
                      : 'border-white/10 bg-[#1A1714] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-xs font-medium text-[#D9822B] tabular-nums">
                        {space.index}. {space.levelLabel}
                      </span>
                      <span className="text-xs text-[#B7ADA0]">{space.capacity}</span>
                    </div>

                    <h3 className="mt-2.5 font-serif text-xl font-semibold text-[#F4EFE6]">
                      {space.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#E3DBD0]">
                      {space.tagline}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#B7ADA0]">
                      {space.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-xs text-[#B7ADA0]">
                      <span>{space.ambiance}</span>
                      <span aria-hidden="true" className="mx-2 text-white/30">·</span>
                      <span>{space.scheduleNote}</span>
                    </p>

                    <button
                      type="button"
                      onClick={() => onSelectSpaceToBook(space.id)}
                      className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#D9822B] whitespace-nowrap shrink-0 transition-colors hover:text-[#F4EFE6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9822B]"
                    >
                      <span>Réserver cet espace</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
