'use client';

import { FormEvent, useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { RESTAURANT_INFO, SPACES, SpaceId } from '@/lib/kirikou-data';
import {
  CartItemDetailed,
  formatFcfa,
  generateBookingCode,
  validateReservationInput,
} from '@/lib/kirikou-logic';

export interface ConfirmedReservation {
  code: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  spaceId: SpaceId;
  spaceName: string;
  notes?: string;
  attachedOrderCount: number;
  attachedOrderTotalFcfa: number;
}

interface ReservationSectionProps {
  selectedSpaceId: SpaceId;
  onSpaceChange: (spaceId: SpaceId) => void;
  guests: number;
  onGuestsChange: (guests: number) => void;
  cartItems: CartItemDetailed[];
  cartSubtotalFcfa: number;
  savedReservations: ConfirmedReservation[];
  onSaveReservation: (reservation: ConfirmedReservation) => void;
}

const TIME_SLOTS = [
  '12:30',
  '13:30',
  '19:00',
  '20:00',
  '20:30',
  '21:30',
  '22:30',
  '23:30',
  '00:30',
];

export function ReservationSection({
  selectedSpaceId,
  onSpaceChange,
  guests,
  onGuestsChange,
  cartItems,
  cartSubtotalFcfa,
  savedReservations,
  onSaveReservation,
}: ReservationSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-28');
  const [time, setTime] = useState('20:30');
  const [notes, setNotes] = useState('');
  const [attachPreorder, setAttachPreorder] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedTicketCode, setSelectedTicketCode] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const activeTicket = showForm
    ? null
    : savedReservations.find((r) => r.code === selectedTicketCode) ??
      savedReservations[0] ??
      null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateReservationInput({
      name,
      phone,
      date,
      time,
      guests,
      spaceId: selectedSpaceId,
      notes,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const spaceObj = SPACES.find((s) => s.id === selectedSpaceId) ?? SPACES[0];
    const includeOrder = attachPreorder && cartItems.length > 0;

    const ticket: ConfirmedReservation = {
      code: generateBookingCode(selectedSpaceId, date),
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      spaceId: selectedSpaceId,
      spaceName: `${spaceObj.levelLabel} · ${spaceObj.name}`,
      notes: notes.trim() || undefined,
      attachedOrderCount: includeOrder
        ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
        : 0,
      attachedOrderTotalFcfa: includeOrder ? cartSubtotalFcfa : 0,
    };

    onSaveReservation(ticket);
    setSelectedTicketCode(ticket.code);
    setShowForm(false);
    setName('');
    setPhone('');
    setNotes('');
  };

  return (
    <section id="reserver" className="scroll-mt-20 border-b border-white/10 bg-[#14120F] py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Practical Cotonou Access & Hours */}
          <div id="infos" className="scroll-mt-20 lg:col-span-5">
            <p className="text-sm font-medium text-[#D9822B]">
              Réservation & Accès
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#F4EFE6] sm:text-4xl [text-wrap:balance]">
              Réservez votre table au Kirikou
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B7ADA0] sm:text-base">
              Pour les soirées orchestre du vendredi et du samedi ou les tables au Wakanda R+2,
              nous recommandons de bloquer votre espace à l’avance.
            </p>

            <dl className="mt-8 space-y-5 border-t border-white/10 pt-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9822B]" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-[#F4EFE6]">Adresse à Cotonou</dt>
                  <dd className="mt-0.5 text-[#B7ADA0]">
                    {RESTAURANT_INFO.neighborhood} — {RESTAURANT_INFO.street},{' '}
                    {RESTAURANT_INFO.city}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D9822B]" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-[#F4EFE6]">Horaires d’ouverture</dt>
                  <dd className="mt-0.5 font-mono text-xs text-[#E3DBD0] tabular-nums">
                    {RESTAURANT_INFO.daysOpen} · {RESTAURANT_INFO.hours}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D9822B]" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-[#F4EFE6]">Ligne directe & Livraison</dt>
                  <dd className="mt-1 flex flex-col gap-1 font-mono text-xs text-[#E3DBD0] tabular-nums">
                    {RESTAURANT_INFO.phones.map((num) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s+/g, '')}`}
                        className="hover:text-[#D9822B] hover:underline"
                      >
                        {num}
                      </a>
                    ))}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#D9822B]" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-[#F4EFE6]">Services disponibles</dt>
                  <dd className="mt-0.5 text-[#B7ADA0]">
                    {RESTAURANT_INFO.services.join(' · ')}
                  </dd>
                </div>
              </div>
            </dl>

            {savedReservations.length > 0 && (
              <div className="mt-8 rounded-xl border border-white/10 bg-[#1A1714] p-5">
                <p className="text-xs font-medium text-[#D9822B]">
                  Vos réservations enregistrées ({savedReservations.length})
                </p>
                <ul className="mt-3 space-y-2.5 text-xs">
                  {savedReservations.slice(0, 3).map((res) => (
                    <li
                      key={res.code}
                      className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-2 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <span className="font-mono font-semibold text-[#F4EFE6]">{res.code}</span>
                        <span className="block text-[#B7ADA0]">
                          {res.date} à {res.time} · {res.guests} pers. · {res.spaceName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTicketCode(res.code);
                          setShowForm(false);
                        }}
                        className="text-[#D9822B] hover:underline whitespace-nowrap shrink-0"
                      >
                        Voir billet
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Reservation Form or Confirmed Ticket */}
          <div className="lg:col-span-7">
            {activeTicket ? (
              <div
                data-testid="reservation-confirmation"
                className="rounded-xl border border-[#D9822B]/60 bg-[#1A1714] p-6 sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#D9822B]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-xs font-semibold text-[#D9822B]">
                      DEMANDE ENREGISTRÉE · {activeTicket.code}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-[#F4EFE6]">
                      Table réservée pour {activeTicket.name}
                    </h3>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-white/10 py-5 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-[#B7ADA0]">Espace choisi</dt>
                    <dd className="mt-1 font-medium text-[#F4EFE6]">{activeTicket.spaceName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#B7ADA0]">Date & Heure</dt>
                    <dd className="mt-1 font-mono text-sm text-[#F4EFE6] tabular-nums">
                      {activeTicket.date} · {activeTicket.time}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#B7ADA0]">Convives</dt>
                    <dd className="mt-1 font-mono text-sm text-[#F4EFE6] tabular-nums">
                      {activeTicket.guests} personne{activeTicket.guests > 1 ? 's' : ''}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#B7ADA0]">Téléphone de contact</dt>
                    <dd className="mt-1 font-mono text-sm text-[#F4EFE6] tabular-nums">
                      {activeTicket.phone}
                    </dd>
                  </div>
                </dl>

                {activeTicket.attachedOrderCount > 0 && (
                  <p className="mt-4 text-sm text-[#E3DBD0]">
                    Pré-sélection culinaire jointe :{' '}
                    <span className="font-mono font-semibold text-[#D9822B] tabular-nums">
                      {activeTicket.attachedOrderCount} article(s) ·{' '}
                      {formatFcfa(activeTicket.attachedOrderTotalFcfa)}
                    </span>
                  </p>
                )}

                {activeTicket.notes && (
                  <p className="mt-3 text-sm text-[#B7ADA0]">
                    Précision : « {activeTicket.notes} »
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="inline-flex min-h-11 items-center rounded-md bg-[#D9822B] px-5 py-2.5 text-sm font-semibold text-[#110F0D] hover:bg-[#E5933E]"
                  >
                    Nouvelle réservation
                  </button>
                  <a
                    href={`tel:${RESTAURANT_INFO.phones[0].replace(/\s+/g, '')}`}
                    className="inline-flex min-h-11 items-center rounded-md border border-white/15 px-5 py-2.5 text-sm font-medium text-[#F4EFE6] hover:border-white/30"
                  >
                    Appeler l’accueil ({RESTAURANT_INFO.phones[0]})
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl border border-white/10 bg-[#1A1714] p-6 sm:p-8"
              >
                <h3 className="font-serif text-xl font-semibold text-[#F4EFE6]">
                  Détails de votre venue
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="res-space"
                      className="block text-xs font-medium text-[#E3DBD0]"
                    >
                      Espace souhaité
                    </label>
                    <select
                      id="res-space"
                      value={selectedSpaceId}
                      onChange={(e) => onSpaceChange(e.target.value as SpaceId)}
                      className="mt-1.5 h-11 w-full rounded-md border border-white/15 bg-[#110F0D] px-3 text-sm text-[#F4EFE6] focus:border-[#D9822B] focus:outline-none"
                    >
                      {SPACES.map((space) => (
                        <option key={space.id} value={space.id}>
                          {space.index}. {space.levelLabel} — {space.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="res-name"
                      className="block text-xs font-medium text-[#E3DBD0]"
                    >
                      Nom complet
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex. Serge Houessou"
                      aria-invalid={Boolean(errors.name)}
                      className="mt-1.5 h-11 w-full rounded-md border border-white/15 bg-[#110F0D] px-3 text-sm text-[#F4EFE6] placeholder:text-[#7E766B] focus:border-[#D9822B] focus:outline-none"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1 text-xs text-[#F28B82]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-phone"
                      className="block text-xs font-medium text-[#E3DBD0]"
                    >
                      Téléphone / WhatsApp
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+229 01 96 00 00 00"
                      aria-invalid={Boolean(errors.phone)}
                      className="mt-1.5 h-11 w-full rounded-md border border-white/15 bg-[#110F0D] px-3 text-sm text-[#F4EFE6] placeholder:text-[#7E766B] focus:border-[#D9822B] focus:outline-none"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1 text-xs text-[#F28B82]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-medium text-[#E3DBD0]"
                    >
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      aria-invalid={Boolean(errors.date)}
                      className="mt-1.5 h-11 w-full rounded-md border border-white/15 bg-[#110F0D] px-3 text-sm text-[#F4EFE6] focus:border-[#D9822B] focus:outline-none"
                    />
                    {errors.date && (
                      <p role="alert" className="mt-1 text-xs text-[#F28B82]">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="res-time"
                        className="block text-xs font-medium text-[#E3DBD0]"
                      >
                        Heure
                      </label>
                      <select
                        id="res-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        aria-invalid={Boolean(errors.time)}
                        className="mt-1.5 h-11 w-full rounded-md border border-white/15 bg-[#110F0D] px-3 text-sm text-[#F4EFE6] focus:border-[#D9822B] focus:outline-none"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <p role="alert" className="mt-1 text-xs text-[#F28B82]">
                          {errors.time}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-guests"
                        className="block text-xs font-medium text-[#E3DBD0]"
                      >
                        Convives
                      </label>
                      <input
                        id="res-guests"
                        type="number"
                        min={1}
                        max={24}
                        value={guests}
                        onChange={(e) => onGuestsChange(Number(e.target.value))}
                        aria-invalid={Boolean(errors.guests)}
                        className="mt-1.5 h-11 w-full rounded-md border border-white/15 bg-[#110F0D] px-3 font-mono text-sm text-[#F4EFE6] tabular-nums focus:border-[#D9822B] focus:outline-none"
                      />
                      {errors.guests && (
                        <p role="alert" className="mt-1 text-xs text-[#F28B82]">
                          {errors.guests}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="res-notes"
                      className="block text-xs font-medium text-[#E3DBD0]"
                    >
                      Précisions (anniversaire, table près du podium, allergie...)
                    </label>
                    <textarea
                      id="res-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex. Table face à la scène pour un anniversaire"
                      className="mt-1.5 w-full rounded-md border border-white/15 bg-[#110F0D] p-3 text-sm text-[#F4EFE6] placeholder:text-[#7E766B] focus:border-[#D9822B] focus:outline-none"
                    />
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <label className="mt-5 flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#110F0D] px-4 py-3">
                    <span className="text-xs text-[#E3DBD0]">
                      Joindre ma pré-sélection culinaire ({cartItems.reduce((s, i) => s + i.quantity, 0)} articles ·{' '}
                      <span className="font-mono text-[#D9822B] tabular-nums">
                        {formatFcfa(cartSubtotalFcfa)}
                      </span>
                      )
                    </span>
                    <input
                      type="checkbox"
                      checked={attachPreorder}
                      onChange={(e) => setAttachPreorder(e.target.checked)}
                      className="h-4 w-4 accent-[#D9822B]"
                    />
                  </label>
                )}

                <button
                  type="submit"
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#D9822B] px-6 py-3 text-sm font-semibold text-[#110F0D] transition-colors hover:bg-[#E5933E] focus-visible:outline-2 focus-visible:outline-[#F4EFE6]"
                >
                  Confirmer la réservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
