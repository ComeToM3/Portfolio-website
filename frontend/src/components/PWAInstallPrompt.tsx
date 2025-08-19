'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface WindowWithGtag extends Window {
  gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as Navigator & { standalone?: boolean }).standalone === true) {
        setIsInstalled(true);
        return true;
      }
      return false;
    };

    // Vérifier si l'utilisateur a déjà rejeté l'installation
    const dismissedInstall = localStorage.getItem('pwa-install-dismissed');
    if (dismissedInstall) {
      const dismissedTime = parseInt(dismissedInstall);
      const now = Date.now();
      // Réafficher après 7 jours
      if (now - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      } else {
        localStorage.removeItem('pwa-install-dismissed');
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      if (!checkIfInstalled() && !isDismissed) {
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowInstallPrompt(true);
      }
    };

    // Vérifier au chargement
    checkIfInstalled();

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isDismissed]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('PWA installée avec succès');
        setShowInstallPrompt(false);
        setDeferredPrompt(null);
        setIsInstalled(true);
        
        // Analytics event
        const windowWithGtag = window as WindowWithGtag;
        if (windowWithGtag.gtag) {
          windowWithGtag.gtag('event', 'pwa_install', {
            event_category: 'engagement',
            event_label: 'pwa_install_success'
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'installation PWA:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
    setIsDismissed(true);
    
    // Sauvegarder le rejet pour 7 jours
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    
    // Analytics event
    const windowWithGtag = window as WindowWithGtag;
    if (windowWithGtag.gtag) {
      windowWithGtag.gtag('event', 'pwa_install_dismiss', {
        event_category: 'engagement',
        event_label: 'pwa_install_dismissed'
      });
    }
  };

  const handleLearnMore = () => {
    // Ouvrir une modal ou naviguer vers une page d'aide
    window.open('/pwa-help', '_blank');
  };

  if (!showInstallPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-2xl">📱</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Installer l&apos;application</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Ajoutez ce portfolio à votre écran d&apos;accueil pour un accès rapide et hors ligne
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">⚡ Rapide</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">📱 Mobile</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">🔒 Sécurisé</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 ml-4">
            <button
              onClick={handleInstallClick}
              className="px-6 py-2 text-sm bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Installer
            </button>
            <div className="flex space-x-2">
              <button
                onClick={handleLearnMore}
                className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors"
              >
                En savoir plus
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
        
        {/* Barre de progression pour montrer les avantages */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="flex justify-between text-xs text-white/70">
            <span>✅ Accès hors ligne</span>
            <span>✅ Installation rapide</span>
            <span>✅ Notifications push</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles CSS pour les animations
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
  }
`;

// Injecter les styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
