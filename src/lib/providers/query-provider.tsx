'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Temps de cache par défaut (5 minutes)
            staleTime: 5 * 60 * 1000,
            // Temps de cache en mémoire (10 minutes)
            gcTime: 10 * 60 * 1000,
            // Retry en cas d'échec
            retry: (failureCount, error: any) => {
              // Ne pas retry pour les erreurs 4xx (sauf 408, 429)
              if (error?.response?.status >= 400 && error?.response?.status < 500) {
                if (error?.response?.status === 408 || error?.response?.status === 429) {
                  return failureCount < 3;
                }
                return false;
              }
              // Retry jusqu'à 3 fois pour les autres erreurs
              return failureCount < 3;
            },
            // Refetch quand la fenêtre reprend le focus
            refetchOnWindowFocus: false,
            // Refetch quand reconnecté
            refetchOnReconnect: true,
          },
          mutations: {
            // Retry pour les mutations
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools en développement uniquement */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
