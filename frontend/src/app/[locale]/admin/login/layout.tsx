import { Metadata } from 'next';
import { AuthProvider } from '@/lib/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Connexion Administration - Johan Dominguez',
  description: 'Page de connexion pour l\'administration du portfolio.',
  robots: 'noindex, nofollow',
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </AuthProvider>
  );
}
