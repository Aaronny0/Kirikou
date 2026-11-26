'use client';

import { useMemo, useState } from 'react';
import { Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategory,
} from '@/lib/kirikou-data';
import {
  CartSelection,
  filterMenuItems,
  formatFcfa,
} from '@/lib/kirikou-logic';
import { KIRIKOU_ASSETS } from '@/lib/assets';
import { VisualImage } from './VisualImage';

interface MenuSectionProps {
  selections: CartSelection[];
  totalItemCount: number;
  subtotalFcfa: number;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onOpenDrawer: () => void;
}

const CULINARY_SHOWCASE = [
  {
    asset: KIRIKOU_ASSETS.dishChoukouya,
    alt: 'Choukouya de poulet et de mouton grillé au feu de bois servi avec alloco',
    kicker: 'Braises & Grillades · 7 000 FCFA',
    title: 'Choukouya au feu de bois',
  },
  {
    asset: KIRIKOU_ASSETS.dishDakouin,
    alt: 'Dakouin béninois de poisson frais mijoté avec son piron doré',
    kicker: 'Terroir Béninois · 8 000 FCFA',
    title: 'Dakouin & Piron chaud',
  },
  {
    asset: KIRIKOU_ASSETS.cocktailsBar,
    alt: 'Cocktails signature Bissap Royal Spritz et Wakanda Passion Sour au bar du Kirikou',
    kicker: 'Bar & Mixologie · Dès 3 500 FCFA',
    title: 'Cocktails Bissap & Maracuja',
  },
];

export function MenuSection({
  selections,
  totalItemCount,
  subtotalFcfa,
  onUpdateQuantity,
  onOpenDrawer,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Tout');
  const [searchQuery, setSearchQuery] = useState('');

  const quantityById = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of selections) {
      map.set(s.itemId, s.quantity);
    }
    return map;
  }, [selections]);

  const filteredItems = useMemo(
    () => filterMenuItems(MENU_ITEMS, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );

  return (
    <section id="carte" className="scroll-mt-20 border-b border-white/10 bg-[#14120F] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header & Pre-order Trigger */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-[#D9822B]">
              La Carte du Kirikou · Tarifs en FCFA
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#F4EFE6] sm:text-4xl [text-wrap:balance]">
              Gastronomie béninoise, braises & bar créatif
            </h2>
            <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-[#B7ADA0] sm:text-base">
              Composez votre pré-sélection de table ou votre commande à emporter et retrouvez le
              détail exact en Francs CFA avant votre arrivée.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenDrawer}
            aria-label={`Ouvrir ma sélection (${totalItemCount} articles)`}
            className="inline-flex min-h-11 items-center justify-between gap-4 rounded-lg border border-white/15 bg-[#1A1714] px-4 py-2.5 text-sm font-medium text-[#F4EFE6] whitespace-nowrap shrink-0 transition-colors hover:border-[#D9822B] focus-visible:outline-2 focus-visible:outline-[#D9822B]"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-[#D9822B]" aria-hidden="true" />
              <span>Ma sélection ({totalItemCount})</span>
            </span>
            <span className="font-mono text-xs font-semibold text-[#D9822B] tabular-nums">
              {formatFcfa(subtotalFcfa)}
            </span>
          </button>
        </div>

        {/* 3-Column Visual Showcase (uniform 4:3 aspect ratio) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CULINARY_SHOWCASE.map((card) => (
            <figure
              key={card.title}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#1A1714]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <VisualImage
                  asset={card.asset}
                  alt={card.alt}
                  fallbackTitle={card.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>
              <figcaption className="p-4">
                <p className="text-xs font-medium text-[#D9822B] tabular-nums">
                  {card.kicker}
                </p>
                <p className="mt-1 font-serif text-lg font-semibold text-[#F4EFE6]">
                  {card.title}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mt-10 flex flex-col gap-4 border-y border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Catégories de la carte"
            className="flex flex-wrap items-center gap-1.5"
          >
            {MENU_CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-10 rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#D9822B] ${
                    active
                      ? 'bg-[#D9822B] text-[#110F0D] font-semibold'
                      : 'bg-[#1A1714] text-[#B7ADA0] hover:bg-white/10 hover:text-[#F4EFE6]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <label htmlFor="menu-search" className="sr-only">
              Rechercher un plat ou une boisson
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B7ADA0]"
              aria-hidden="true"
            />
            <input
              id="menu-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher (Dakouin, Choukouya...)"
              className="h-11 w-full rounded-md border border-white/15 bg-[#1A1714] pl-9 pr-9 text-sm text-[#F4EFE6] placeholder:text-[#7E766B] focus:border-[#D9822B] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Effacer la recherche"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-[#B7ADA0] hover:text-[#F4EFE6]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/10 bg-[#1A1714] p-10 text-center">
            <p className="font-serif text-xl text-[#F4EFE6]">
              Aucun plat ne correspond à votre recherche.
            </p>
            <p className="mt-2 text-sm text-[#B7ADA0]">
              Essayez un autre mot-clé ou réinitialisez les filtres pour afficher toute la carte.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Tout');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex min-h-10 items-center rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-[#F4EFE6] hover:border-[#D9822B]"
            >
              Afficher toute la carte
            </button>
          </div>
        ) : (
          <div
            data-testid="menu-items-grid"
            className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item) => {
              const qty = quantityById.get(item.id) ?? 0;
              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#1A1714] p-5 transition-colors duration-150 hover:border-white/20"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#B7ADA0]">
                      <span>
                        {item.category}
                        {item.highlight ? (
                          <>
                            <span aria-hidden="true" className="mx-1.5 text-white/30">·</span>
                            <span className="text-[#D9822B]">{item.highlight}</span>
                          </>
                        ) : null}
                      </span>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-[#F4EFE6]">
                        {item.name}
                      </h3>
                      <span className="font-mono text-sm font-semibold text-[#F4EFE6] whitespace-nowrap shrink-0 tabular-nums">
                        {formatFcfa(item.priceFcfa)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-[#B7ADA0]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label={`Ajouter ${item.name}`}
                        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-[#F4EFE6] whitespace-nowrap transition-colors hover:border-[#D9822B] hover:bg-[#D9822B] hover:text-[#110F0D] focus-visible:outline-2 focus-visible:outline-[#D9822B]"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Ajouter à ma sélection</span>
                      </button>
                    ) : (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="text-xs font-medium text-[#D9822B]">
                          Sélectionné
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Retirer une portion de ${item.name}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-[#110F0D] text-[#F4EFE6] hover:border-[#D9822B]"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span
                            aria-label={`Quantité pour ${item.name}`}
                            className="min-w-8 text-center font-mono text-sm font-semibold text-[#F4EFE6] tabular-nums"
                          >
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Ajouter une portion de ${item.name}`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-[#D9822B] text-[#110F0D] hover:bg-[#E5933E]"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
