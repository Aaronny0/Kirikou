import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kirikou Restaurant & Bar — Fidjrossè, Cotonou',
  description:
    'Cuisine béninoise authentique, grillades choukouya au feu de bois, orchestre live, Le Fumoir et rooftop Le Wakanda à Cotonou. Ouvert tous les jours de 12h00 à 02h00.',
  openGraph: {
    title: 'Kirikou Restaurant & Bar — Fidjrossè, Cotonou',
    description:
      'Cuisine béninoise, braises, cocktails et soirées orchestre live sur 4 niveaux à Cotonou.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kirikou Restaurant & Bar — Fidjrossè, Cotonou',
    description:
      'Cuisine béninoise, braises, cocktails et soirées orchestre live sur 4 niveaux à Cotonou.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#110F0D] text-[#F4EFE6]">
        {children}
      </body>
    </html>
  );
}
