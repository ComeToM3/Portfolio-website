import type { Metadata } from 'next';
import './globals.css';

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
  return (
    <html lang="fr" suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
    </html>
  );
}


