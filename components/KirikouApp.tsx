'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { SpaceId } from '@/lib/kirikou-data';
import { CartSelection, computeCartSummary } from '@/lib/kirikou-logic';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { SpacesSection } from './SpacesSection';
import { MenuSection } from './MenuSection';
import { LiveAndPlannerSection } from './LiveAndPlannerSection';
import {
  ConfirmedReservation,
  ReservationSection,
} from './ReservationSection';
import { SelectionDrawer } from './SelectionDrawer';
import { Footer } from './Footer';

const STORAGE_CART_KEY = 'kirikou_cart_v1';
const STORAGE_BOOKINGS_KEY = 'kirikou_bookings_v1';
const STORAGE_EVENT = 'kirikou-storage-update';

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function useStoredJson<T>(key: string, fallback: T): [T, (updater: (prev: T) => T) => void] {
  const raw = useSyncExternalStore(
    subscribeStorage,
    () => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null
  );

  const value = useMemo(() => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }, [raw, fallback]);

  const setValue = useCallback(
    (updater: (prev: T) => T) => {
      let current = fallback;
      try {
        const existing = window.localStorage.getItem(key);
        if (existing) current = JSON.parse(existing) as T;
      } catch {
        current = fallback;
      }
      const next = updater(current);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new Event(STORAGE_EVENT));
      } catch {
        // Ignore quota errors
      }
    },
    [key, fallback]
  );

  return [value, setValue];
}

const EMPTY_SELECTIONS: CartSelection[] = [];
const EMPTY_RESERVATIONS: ConfirmedReservation[] = [];

export function KirikouApp() {
  const [selections, setSelections] = useStoredJson<CartSelection[]>(
    STORAGE_CART_KEY,
    EMPTY_SELECTIONS
  );
  const [savedReservations, setSavedReservations] = useStoredJson<ConfirmedReservation[]>(
    STORAGE_BOOKINGS_KEY,
    EMPTY_RESERVATIONS
  );
  const [selectedSpaceId, setSelectedSpaceId] = useState<SpaceId>('rdc-live');
  const [reservationGuests, setReservationGuests] = useState(4);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartSummary = useMemo(() => computeCartSummary(selections), [selections]);

  const scrollToReservation = () => {
    const el = document.getElementById('reserver');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSpaceToBook = (spaceId: SpaceId) => {
    setSelectedSpaceId(spaceId);
    scrollToReservation();
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setSelections((prev) => {
      const existing = prev.find((s) => s.itemId === itemId);
      if (!existing) {
        if (delta <= 0) return prev;
        return [...prev, { itemId, quantity: delta }];
      }
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        return prev.filter((s) => s.itemId !== itemId);
      }
      return prev.map((s) => (s.itemId === itemId ? { ...s, quantity: nextQty } : s));
    });
  };

  const handleApplyPlannerSelection = (
    items: CartSelection[],
    recommendedSpace: SpaceId,
    guestCount: number
  ) => {
    setSelections(() => items);
    setSelectedSpaceId(recommendedSpace);
    setReservationGuests(guestCount);
  };

  const handleSaveReservation = (ticket: ConfirmedReservation) => {
    setSavedReservations((prev) => [ticket, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#110F0D] text-[#F4EFE6]">
      <Header onReserveClick={scrollToReservation} />

      <main>
        <HeroSection onReserveClick={scrollToReservation} />

        <SpacesSection
          selectedSpaceId={selectedSpaceId}
          onSelectSpaceToBook={handleSelectSpaceToBook}
        />

        <MenuSection
          selections={selections}
          totalItemCount={cartSummary.itemCount}
          subtotalFcfa={cartSummary.subtotalFcfa}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenDrawer={() => setDrawerOpen(true)}
        />

        <LiveAndPlannerSection
          onApplyPlannerSelection={handleApplyPlannerSelection}
        />

        <ReservationSection
          selectedSpaceId={selectedSpaceId}
          onSpaceChange={setSelectedSpaceId}
          guests={reservationGuests}
          onGuestsChange={setReservationGuests}
          cartItems={cartSummary.items}
          cartSubtotalFcfa={cartSummary.subtotalFcfa}
          savedReservations={savedReservations}
          onSaveReservation={handleSaveReservation}
        />
      </main>

      <Footer />

      <SelectionDrawer
        isOpen={drawerOpen}
        items={cartSummary.items}
        subtotalFcfa={cartSummary.subtotalFcfa}
        onClose={() => setDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onClearAll={() => setSelections(() => [])}
        onProceedToReservation={() => {
          setDrawerOpen(false);
          scrollToReservation();
        }}
      />
    </div>
  );
}
