import { Metadata } from 'next';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import AdminNav from '@/components/layout/AdminNav';

export const metadata: Metadata = {
  title: 'Administration - Johan Dominguez',
  description: 'Interface d\'administration pour gérer le contenu du portfolio professionnel.',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AdminNav />
          <main className="pt-16">
            {children}
          </main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
