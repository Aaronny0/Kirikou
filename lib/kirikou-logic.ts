import { MENU_ITEMS, MenuCategory, MenuItem, SpaceId } from './kirikou-data';

export interface CartSelection {
  itemId: string;
  quantity: number;
}

export interface CartItemDetailed extends MenuItem {
  quantity: number;
  lineTotalFcfa: number;
}

export interface CartSummary {
  itemCount: number;
  subtotalFcfa: number;
  items: CartItemDetailed[];
}

export type EveningMood = 'live-diner' | 'entre-potes' | 'intime-fumoir' | 'festif-wakanda';

export interface GroupPlanInput {
  guestCount: number;
  mood: EveningMood;
  includeDrinks: boolean;
}

export interface GroupPlanItem {
  itemId: string;
  name: string;
  quantity: number;
  unitPriceFcfa: number;
  subtotalFcfa: number;
}

export interface GroupPlanRecommendation {
  recommendedSpaceId: SpaceId;
  recommendedSpaceName: string;
  rationale: string;
  suggestedItems: GroupPlanItem[];
  totalFcfa: number;
  perPersonFcfa: number;
}

export interface ReservationInput {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  spaceId: SpaceId;
  notes?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function formatFcfa(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} FCFA`;
}

export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategory,
  searchQuery: string
): MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'Tout' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function computeCartSummary(
  selections: CartSelection[],
  catalog: MenuItem[] = MENU_ITEMS
): CartSummary {
  const itemMap = new Map(catalog.map((item) => [item.id, item]));
  const detailed: CartItemDetailed[] = [];
  let itemCount = 0;
  let subtotalFcfa = 0;

  for (const entry of selections) {
    if (entry.quantity <= 0) continue;
    const item = itemMap.get(entry.itemId);
    if (!item) continue;
    const lineTotalFcfa = item.priceFcfa * entry.quantity;
    itemCount += entry.quantity;
    subtotalFcfa += lineTotalFcfa;
    detailed.push({
      ...item,
      quantity: entry.quantity,
      lineTotalFcfa,
    });
  }

  return { itemCount, subtotalFcfa, items: detailed };
}

export function recommendGroupPlan(
  input: GroupPlanInput,
  catalog: MenuItem[] = MENU_ITEMS
): GroupPlanRecommendation {
  const guests = Math.max(1, Math.min(24, Math.round(input.guestCount)));
  const byId = new Map(catalog.map((i) => [i.id, i]));
  const suggestedItems: GroupPlanItem[] = [];

  const pushItem = (id: string, qty: number) => {
    const item = byId.get(id);
    if (!item || qty <= 0) return;
    suggestedItems.push({
      itemId: item.id,
      name: item.name,
      quantity: qty,
      unitPriceFcfa: item.priceFcfa,
      subtotalFcfa: item.priceFcfa * qty,
    });
  };

  let recommendedSpaceId: SpaceId = 'rdc-live';
  let recommendedSpaceName = 'Rez-de-Chaussée · Restaurant & Scène Live';
  let rationale =
    'Idéal pour partager de grandes assiettes face à l’orchestre maison.';

  if (input.mood === 'intime-fumoir') {
    recommendedSpaceId = 'fumoir';
    recommendedSpaceName = 'Le Fumoir · Salon Intimiste';
    rationale =
      'Cadre clos et feutré parfait pour discuter au calme autour d’entrées fines et grillades.';
  } else if (input.mood === 'festif-wakanda') {
    recommendedSpaceId = 'wakanda';
    recommendedSpaceName = 'R+2 · Le Wakanda';
    rationale =
      'Ambiance rooftop perchée jusqu’à 02h00 avec planches conviviales et cocktails signature.';
  } else if (input.mood === 'live-diner' && guests <= 6) {
    recommendedSpaceId = 'etage-mezzanine';
    recommendedSpaceName = '1er Étage · Mezzanine Panoramique';
    rationale =
      'Vue directe sur le podium live tout en gardant un excellent confort de conversation à table.';
  }

  // Sharing platters calculation for groups >= 4
  if (guests >= 6) {
    const fiestaCount = Math.floor(guests / 6);
    const remainder = guests % 6;
    pushItem('planche-fiesta', fiestaCount);
    if (remainder >= 3) {
      pushItem('formule-foodporn', 1);
    } else if (remainder > 0) {
      pushItem('choukouya-poulet', remainder);
    }
    pushItem('mini-fours', Math.ceil(guests / 4));
  } else if (guests >= 4) {
    pushItem('formule-foodporn', 1);
    pushItem('mini-fours', 1);
    if (guests === 5) {
      pushItem('dakouin', 1);
    }
  } else {
    // 1 to 3 guests: individual signature dishes
    pushItem('mini-fours', 1);
    pushItem('dakouin', 1);
    if (guests >= 2) {
      pushItem('choukouya-mouton', 1);
    }
    if (guests === 3) {
      pushItem('choukouya-poulet', 1);
    }
  }

  if (input.includeDrinks) {
    const cocktailId =
      input.mood === 'festif-wakanda'
        ? 'wakanda-passion-sour'
        : input.mood === 'intime-fumoir'
        ? 'planteur-kirikou'
        : 'bissap-royal-cocktail';
    pushItem(cocktailId, guests);
  }

  const totalFcfa = suggestedItems.reduce((sum, item) => sum + item.subtotalFcfa, 0);
  const perPersonFcfa = Math.round(totalFcfa / guests);

  return {
    recommendedSpaceId,
    recommendedSpaceName,
    rationale,
    suggestedItems,
    totalFcfa,
    perPersonFcfa,
  };
}

export function validateReservationInput(input: ReservationInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Veuillez indiquer votre nom complet (au moins 2 caractères).';
  }

  const digits = (input.phone || '').replace(/\D/g, '');
  if (digits.length < 8) {
    errors.phone = 'Numéro invalide (exemple : +229 01 64 32 19 19).';
  }

  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    errors.date = 'Veuillez choisir une date de réservation valide.';
  }

  if (!input.time) {
    errors.time = 'Veuillez sélectionner une heure d’arrivée.';
  } else {
    const [hhStr, mmStr] = input.time.split(':');
    const hh = Number(hhStr);
    const mm = Number(mmStr);
    const isValidFormat =
      Number.isInteger(hh) && Number.isInteger(mm) && hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
    // Kirikou is open 12:00 to 02:00 (last seating 01:30)
    const isOpenHour = hh >= 12 || hh < 2 || (hh === 1 && mm <= 30);
    if (!isValidFormat || !isOpenHour) {
      errors.time = 'Horaire hors service (ouvert tous les jours de 12h00 à 02h00).';
    }
  }

  if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 24) {
    errors.guests = 'Le nombre de convives doit être compris entre 1 et 24.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateBookingCode(spaceId: SpaceId, date: string): string {
  const prefixMap: Record<SpaceId, string> = {
    'rdc-live': 'RDC',
    'etage-mezzanine': 'ETG',
    fumoir: 'FUM',
    wakanda: 'WKD',
  };
  const cleanDate = date.replace(/-/g, '').slice(4) || '0000';
  const suffix = Math.floor(100 + Math.random() * 900);
  return `KRK-${prefixMap[spaceId]}-${cleanDate}-${suffix}`;
}
