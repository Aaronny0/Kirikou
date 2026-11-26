import { RESTAURANT_INFO } from '@/lib/kirikou-data';

export function Footer() {
  return (
    <footer className="bg-[#0D0B09] py-12 text-sm text-[#B7ADA0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif text-xl font-semibold text-[#F4EFE6]">
              {RESTAURANT_INFO.fullName}
            </p>
            <p className="mt-2 max-w-md leading-relaxed">
              {RESTAURANT_INFO.neighborhood} · {RESTAURANT_INFO.street},{' '}
              {RESTAURANT_INFO.city}.
            </p>
            <p className="mt-2 font-mono text-xs text-[#D9822B] tabular-nums">
              {RESTAURANT_INFO.daysOpen} · {RESTAURANT_INFO.hours}
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#F4EFE6]">Navigation</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#carte" className="hover:text-[#F4EFE6]">
                  La Carte
                </a>
              </li>
              <li>
                <a href="#espaces" className="hover:text-[#F4EFE6]">
                  Les Espaces
                </a>
              </li>
              <li>
                <a href="#live" className="hover:text-[#F4EFE6]">
                  Orchestre Live
                </a>
              </li>
              <li>
                <a href="#reserver" className="hover:text-[#F4EFE6]">
                  Réserver une table
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-[#F4EFE6]">Contacts</p>
            <ul className="mt-3 space-y-2 font-mono text-xs tabular-nums">
              {RESTAURANT_INFO.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="hover:text-[#F4EFE6]"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="pt-1 font-sans text-xs text-[#B7ADA0]">
                {RESTAURANT_INFO.officialSite}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-[#7E766B] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kirikou Restaurant & Bar · Cotonou, Bénin.</p>
          <p>Sur place · À emporter · Livraison</p>
        </div>
      </div>
    </footer>
  );
}
