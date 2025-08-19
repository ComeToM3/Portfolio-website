import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hordearii - Portfolio Professionnel',
  description: 'Portfolio professionnel de Johan Dominguez',
  metadataBase: new URL('https://hordearii.ca'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


