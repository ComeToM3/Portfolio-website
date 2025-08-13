import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/providers/query-provider';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hordearii.ca'),
  title: 'Johan Dominguez - Portfolio Professionnel | Hordearii',
  description: 'Portfolio professionnel de Johan Dominguez - Développeur Full Stack, Musicien, Athlète et Pâtissier. Découvrez mes projets, compétences et expériences.',
  keywords: 'Johan Dominguez, développeur, portfolio, full stack, React, Node.js, Flutter, musique, athlète, pâtissier',
  authors: [{ name: 'Johan Dominguez' }],
  creator: 'Johan Dominguez',
  publisher: 'Hordearii',
  robots: 'index, follow',
  openGraph: {
    title: 'Johan Dominguez - Portfolio Professionnel',
    description: 'Portfolio professionnel de Johan Dominguez - Développeur Full Stack, Musicien, Athlète et Pâtissier.',
    url: 'https://hordearii.ca',
    siteName: 'Hordearii',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Johan Dominguez - Portfolio Professionnel',
      },
    ],
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Johan Dominguez - Portfolio Professionnel',
    description: 'Portfolio professionnel de Johan Dominguez - Développeur Full Stack, Musicien, Athlète et Pâtissier.',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <QueryProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
