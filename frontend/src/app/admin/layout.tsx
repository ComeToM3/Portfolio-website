import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administration - Portfolio Hordearii',
  description: 'Interface d\'administration pour gérer le contenu du portfolio professionnel.',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
