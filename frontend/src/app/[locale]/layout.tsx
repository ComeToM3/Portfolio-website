import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en', 'fr'] as const;
type Locale = typeof locales[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    return null;
  }

  return (
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  );
}
