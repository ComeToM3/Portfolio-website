'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Exclure la page de login de la protection
  const isLoginPage = pathname?.includes('/admin/login');

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router, isLoginPage]);

  // Si c'est la page de login, ne pas afficher de protection
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600 dark:text-gray-400">Vérification de l&apos;authentification...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Sera redirigé par useEffect
  }

  return <>{children}</>;
};
