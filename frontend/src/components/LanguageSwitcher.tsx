'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const languageNames = {
  fr: 'Français',
  en: 'English'
};

const languageFlags = {
  fr: '🇫🇷',
  en: '🇺🇸'
};

const locales = ['fr', 'en'];

export default function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Attendre que le composant soit monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Déterminer la locale actuelle à partir des params
  const getCurrentLocale = () => {
    if (!mounted) return 'fr'; // Valeur par défaut côté serveur
    const locale = params?.locale as string;
    return locales.includes(locale) ? locale : 'fr';
  };

  const locale = getCurrentLocale();

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    
    // Construire le nouveau chemin
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
  };

  const currentLanguage = languageNames[locale as keyof typeof languageNames] || locale;
  const currentFlag = languageFlags[locale as keyof typeof languageFlags] || '🌐';

  // Ne pas rendre le contenu dynamique jusqu'à ce que le composant soit monté
  if (!mounted) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-black/20 hover:bg-black/30 rounded-lg transition-colors duration-200 border border-white/10 backdrop-blur-sm"
          aria-label="Changer de langue"
        >
          <span className="text-lg">🇫🇷</span>
          <span className="hidden sm:inline">Français</span>
          <svg
            className="w-4 h-4 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-black/20 hover:bg-black/30 rounded-lg transition-colors duration-200 border border-white/10 backdrop-blur-sm"
        aria-label="Changer de langue"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentFlag}</span>
        <span className="hidden sm:inline">{currentLanguage}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="py-1">
            {locales.map((lang) => {
              const isActive = lang === locale;
              const flag = languageFlags[lang as keyof typeof languageFlags];
              const name = languageNames[lang as keyof typeof languageNames];
              
              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  <span className="text-lg">{flag}</span>
                  <span className="flex-1 text-left">{name}</span>
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Styles CSS pour les animations
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
`;

// Injecter les styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
