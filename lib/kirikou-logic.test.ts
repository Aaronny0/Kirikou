import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatFcfa,
  filterMenuItems,
  computeCartSummary,
  recommendGroupPlan,
  validateReservationInput,
} from './kirikou-logic';
import { MENU_ITEMS } from './kirikou-data';

test('formatFcfa formats amounts cleanly with space thousands separator', () => {
  assert.equal(formatFcfa(7000), '7 000 FCFA');
  assert.equal(formatFcfa(40000), '40 000 FCFA');
  assert.equal(formatFcfa(0), '0 FCFA');
});

test('filterMenuItems filters by category and search query accurately', () => {
  const beninese = filterMenuItems(MENU_ITEMS, 'Spécialités Béninoises', '');
  assert.ok(beninese.length >= 5);
  assert.ok(beninese.every((item) => item.category === 'Spécialités Béninoises'));

  const dakouinOnly = filterMenuItems(MENU_ITEMS, 'Tout', 'Dakouin');
  assert.equal(dakouinOnly.length, 1);
  assert.equal(dakouinOnly[0].id, 'dakouin');
  assert.equal(dakouinOnly[0].priceFcfa, 8000);
});

test('computeCartSummary calculates item count and exact FCFA subtotal', () => {
  const summary = computeCartSummary([
    { itemId: 'choukouya-poulet', quantity: 2 },
    { itemId: 'planche-fiesta', quantity: 1 },
    { itemId: 'unknown-item', quantity: 5 },
  ]);
  assert.equal(summary.itemCount, 3);
  assert.equal(summary.subtotalFcfa, 2 * 7000 + 40000);
  assert.equal(summary.items.length, 2);
});

test('recommendGroupPlan chooses Wakanda rooftop and Planche Fiesta for festive 6-guest group', () => {
  const plan = recommendGroupPlan({
    guestCount: 6,
    mood: 'festif-wakanda',
    includeDrinks: true,
  });
  assert.equal(plan.recommendedSpaceId, 'wakanda');
  assert.ok(plan.suggestedItems.some((item) => item.itemId === 'planche-fiesta'));
  assert.ok(plan.suggestedItems.some((item) => item.itemId === 'wakanda-passion-sour'));
  assert.equal(plan.totalFcfa, 40000 + 4000 * 2 + 4500 * 6);
  assert.equal(plan.perPersonFcfa, Math.round(plan.totalFcfa / 6));
});

test('validateReservationInput rejects invalid phone/hours and accepts valid Cotonou booking', () => {
  const invalid = validateReservationInput({
    name: 'A',
    phone: '123',
    date: '2026-11-28',
    time: '09:00',
    guests: 30,
    spaceId: 'rdc-live',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.time);
  assert.ok(invalid.errors.guests);

  const validEvening = validateReservationInput({
    name: 'Koffi Mensah',
    phone: '+229 01 64 32 19 19',
    date: '2026-11-28',
    time: '21:00',
    guests: 6,
    spaceId: 'wakanda',
  });
  assert.equal(validEvening.valid, true);
  assert.deepEqual(validEvening.errors, {});

  const validLateNight = validateReservationInput({
    name: 'Aïcha S.',
    phone: '0196928585',
    date: '2026-11-28',
    time: '00:45',
    guests: 2,
    spaceId: 'fumoir',
  });
  assert.equal(validLateNight.valid, true);
});
