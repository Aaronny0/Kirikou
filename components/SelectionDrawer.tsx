'use client';

import { Minus, Plus, Trash2, X } from 'lucide-react';
import { CartItemDetailed, formatFcfa } from '@/lib/kirikou-logic';

interface SelectionDrawerProps {
  isOpen: boolean;
  items: CartItemDetailed[];
  subtotalFcfa: number;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearAll: () => void;
  onProceedToReservation: () => void;
}

export function SelectionDrawer({
  isOpen,
  items,
  subtotalFcfa,
  onClose,
  onUpdateQuantity,
  onClearAll,
  onProceedToReservation,
}: SelectionDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="selection-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
    >
      <div
        className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#14120F] text-[#F4EFE6]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 id="selection-drawer-title" className="font-serif text-xl font-semibold">
              Ma sélection de table
            </h2>
            <p className="mt-0.5 text-xs text-[#B7ADA0]">
              Sur place, à emporter ou jointe à votre réservation
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer ma sélection"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-[#F4EFE6] hover:border-[#D9822B]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif text-lg text-[#F4EFE6]">
                Votre sélection est vide.
              </p>
              <p className="mt-2 max-w-xs text-sm text-[#B7ADA0]">
                Ajoutez des entrées, spécialités béninoises, choukouya ou cocktails depuis la
                carte pour préparer votre table.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 inline-flex min-h-10 items-center rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-[#F4EFE6] hover:border-[#D9822B]"
              >
                Parcourir la carte
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {items.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-base font-semibold text-[#F4EFE6]">
                        {item.name}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-[#B7ADA0] tabular-nums">
                        {formatFcfa(item.priceFcfa)} / unité
                      </p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#F4EFE6] whitespace-nowrap shrink-0 tabular-nums">
                      {formatFcfa(item.lineTotalFcfa)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label={`Diminuer ${item.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/15 bg-[#1A1714] text-[#F4EFE6] hover:border-[#D9822B]"
                      >
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <span className="min-w-8 text-center font-mono text-sm font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label={`Augmenter ${item.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/15 bg-[#D9822B] text-[#110F0D] hover:bg-[#E5933E]"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -item.quantity)}
                      aria-label={`Supprimer ${item.name}`}
                      className="inline-flex min-h-9 items-center gap-1.5 text-xs text-[#B7ADA0] hover:text-[#F28B82]"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Retirer</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 bg-[#1A1714] px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-[#B7ADA0]">Sous-total estimé</span>
              <span className="font-mono text-xl font-semibold text-[#F4EFE6] tabular-nums">
                {formatFcfa(subtotalFcfa)}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onProceedToReservation}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#D9822B] px-5 py-2.5 text-sm font-semibold text-[#110F0D] hover:bg-[#E5933E]"
              >
                Joindre à ma réservation
              </button>
              <button
                type="button"
                onClick={onClearAll}
                className="inline-flex min-h-10 w-full items-center justify-center rounded-md border border-white/15 px-4 py-2 text-xs font-medium text-[#B7ADA0] hover:text-[#F4EFE6]"
              >
                Vider la sélection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
