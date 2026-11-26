'use client';

import { useMemo, useState } from 'react';
import { Check, Minus, Music, Plus, Users } from 'lucide-react';
import { GUEST_REVIEWS, LIVE_SCHEDULE, SpaceId } from '@/lib/kirikou-data';
import {
  CartSelection,
  EveningMood,
  formatFcfa,
  recommendGroupPlan,
} from '@/lib/kirikou-logic';

interface LiveAndPlannerSectionProps {
  onApplyPlannerSelection: (
    items: CartSelection[],
    recommendedSpace: SpaceId,
    guestCount: number
  ) => void;
}

const MOOD_OPTIONS: { id: EveningMood; label: string }[] = [
  { id: 'live-diner', label: 'Dîner Orchestre Live' },
  { id: 'entre-potes', label: 'Grande Table Entre Potes' },
  { id: 'intime-fumoir', label: 'Salon Calme & Fumoir' },
  { id: 'festif-wakanda', label: 'Rooftop Le Wakanda' },
];

export function LiveAndPlannerSection({
  onApplyPlannerSelection,
}: LiveAndPlannerSectionProps) {
  const [guestCount, setGuestCount] = useState(6);
  const [mood, setMood] = useState<EveningMood>('entre-potes');
  const [includeDrinks, setIncludeDrinks] = useState(true);
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  const recommendation = useMemo(
    () => recommendGroupPlan({ guestCount, mood, includeDrinks }),
    [guestCount, mood, includeDrinks]
  );

  const handleApply = () => {
    onApplyPlannerSelection(
      recommendation.suggestedItems.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
      recommendation.recommendedSpaceId,
      guestCount
    );
    setAppliedFeedback(true);
    setTimeout(() => setAppliedFeedback(false), 2500);
  };

  return (
    <section id="live" className="scroll-mt-20 border-b border-white/10 bg-[#110F0D] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Live Orchestra Weekly Schedule */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#D9822B]">
              Programmation Musicale · Mercredi – Dimanche
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#F4EFE6] sm:text-4xl [text-wrap:balance]">
              L’orchestre live et les nuits du Wakanda
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B7ADA0] sm:text-base">
              Chaque semaine, le podium du rez-de-chaussée réunit musiciens et chanteurs à
              Cotonou avant le relais DJ au dernier étage jusqu’à 02h00.
            </p>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {LIVE_SCHEDULE.map((event) => (
                <article key={event.id} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Music className="h-4 w-4 text-[#D9822B]" aria-hidden="true" />
                      <h3 className="font-serif text-lg font-semibold text-[#F4EFE6]">
                        {event.day} · {event.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-medium text-[#D9822B] tabular-nums">
                      {event.hours}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-[#E3DBD0]">
                    <span>{event.space}</span>
                    <span aria-hidden="true" className="mx-2 text-white/30">·</span>
                    <span>{event.lineup}</span>
                  </p>
                  <p className="mt-1.5 text-sm text-[#B7ADA0]">{event.mood}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Group & Budget Table Planner */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-[#1A1714] p-6 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D9822B]">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>Simulateur de Table & Budget</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#F4EFE6]">
                Préparez votre table sur mesure
              </h3>
              <p className="mt-2 text-sm text-[#B7ADA0]">
                Estimez les formules à partager (FoodPorn, Planche Fiesta), l’espace adapté et le
                budget par personne.
              </p>

              {/* Controls */}
              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="block text-sm font-medium text-[#F4EFE6]">
                      Nombre de convives
                    </span>
                    <span className="text-xs text-[#B7ADA0]">De 1 à 24 personnes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                      aria-label="Diminuer le nombre de convives"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-[#110F0D] text-[#F4EFE6] hover:border-[#D9822B]"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span
                      data-testid="planner-guest-count"
                      className="min-w-9 text-center font-mono text-base font-semibold text-[#F4EFE6] tabular-nums"
                    >
                      {guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.min(24, c + 1))}
                      aria-label="Augmenter le nombre de convives"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-[#110F0D] text-[#F4EFE6] hover:border-[#D9822B]"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-medium text-[#F4EFE6]">
                    Ambiance souhaitée
                  </span>
                  <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {MOOD_OPTIONS.map((option) => {
                      const active = mood === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setMood(option.id)}
                          aria-pressed={active}
                          className={`min-h-10 rounded-md border px-3 py-2 text-left text-xs font-medium transition-colors ${
                            active
                              ? 'border-[#D9822B] bg-[#D9822B]/15 text-[#F4EFE6]'
                              : 'border-white/10 bg-[#110F0D] text-[#B7ADA0] hover:border-white/25 hover:text-[#F4EFE6]'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="flex min-h-10 cursor-pointer items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-sm text-[#E3DBD0]">
                    Inclure un cocktail signature par personne
                  </span>
                  <input
                    type="checkbox"
                    checked={includeDrinks}
                    onChange={(e) => setIncludeDrinks(e.target.checked)}
                    className="h-4 w-4 accent-[#D9822B]"
                  />
                </label>
              </div>

              {/* Recommendation Output */}
              <div className="mt-6 rounded-lg border border-white/10 bg-[#110F0D] p-4">
                <p className="text-xs font-medium text-[#D9822B]">
                  Espace conseillé · {recommendation.recommendedSpaceName}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#B7ADA0]">
                  {recommendation.rationale}
                </p>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-3 text-xs">
                  {recommendation.suggestedItems.map((item) => (
                    <li
                      key={item.itemId}
                      className="flex items-baseline justify-between gap-2 text-[#E3DBD0]"
                    >
                      <span>
                        <span className="font-mono text-[#D9822B] tabular-nums">
                          {item.quantity}×
                        </span>{' '}
                        {item.name}
                      </span>
                      <span className="font-mono text-[#F4EFE6] whitespace-nowrap shrink-0 tabular-nums">
                        {formatFcfa(item.subtotalFcfa)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-3">
                  <div>
                    <span className="block text-xs text-[#B7ADA0]">Total estimé</span>
                    <span className="font-mono text-lg font-semibold text-[#F4EFE6] tabular-nums">
                      {formatFcfa(recommendation.totalFcfa)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-[#B7ADA0]">Par convive</span>
                    <span className="font-mono text-sm font-semibold text-[#D9822B] tabular-nums">
                      {formatFcfa(recommendation.perPersonFcfa)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApply}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#D9822B] px-5 py-2.5 text-sm font-semibold text-[#110F0D] transition-colors hover:bg-[#E5933E] focus-visible:outline-2 focus-visible:outline-[#F4EFE6]"
              >
                {appliedFeedback ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Sélection chargée et espace pré-choisi</span>
                  </>
                ) : (
                  <span>Charger cette suggestion dans ma réservation</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Guest Reviews Strip (Claim-to-Proof Adjacency) */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-serif text-xl font-semibold text-[#F4EFE6]">
              Échos de nos clients à Cotonou
            </h3>
            <p className="text-xs font-medium text-[#B7ADA0] tabular-nums">
              Note moyenne 4,2 / 5 · Plus de 1 000 avis vérifiés
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {GUEST_REVIEWS.map((review) => (
              <blockquote
                key={review.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#1A1714] p-5"
              >
                <p className="text-sm leading-relaxed text-[#E3DBD0]">
                  « {review.quote} »
                </p>
                <footer className="mt-4 border-t border-white/10 pt-3 text-xs text-[#B7ADA0]">
                  <span className="font-semibold text-[#F4EFE6]">{review.author}</span>
                  <span aria-hidden="true" className="mx-1.5 text-white/30">·</span>
                  <span>{review.context}</span>
                  <span aria-hidden="true" className="mx-1.5 text-white/30">·</span>
                  <span className="font-mono text-[#D9822B] tabular-nums">{review.rating}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
