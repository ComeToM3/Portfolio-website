'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  User, 
  Code, 
  FolderOpen, 
  MessageSquare, 
  BarChart3,
  LogOut,
  Shield
} from 'lucide-react';
import Link from 'next/link';

const adminSections = [
  {
    id: 'profile',
    title: 'Profil',
    description: 'Gérer les informations personnelles et professionnelles',
    icon: User,
    color: 'from-blue-500 to-cyan-500',
    href: '/admin/profile'
  },
  {
    id: 'skills',
    title: 'Compétences',
    description: 'Gérer les compétences techniques et leurs niveaux',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    href: '/admin/skills'
  },
  {
    id: 'projects',
    title: 'Projets',
    description: 'Gérer les projets et leurs descriptions',
    icon: FolderOpen,
    color: 'from-purple-500 to-pink-500',
    href: '/admin/projects'
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Gérer les messages de contact reçus',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    href: '/admin/messages'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Voir les statistiques et métriques du site',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500',
    href: '/admin/analytics'
  }
];

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
      // Simuler un utilisateur connecté
      setUser({ name: 'Admin' });
    }
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Administration
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Connecté en tant que {user?.name || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Bienvenue dans votre espace d'administration
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez votre portfolio professionnel depuis cette interface centralisée.
          </p>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Link
                key={section.id}
                href={section.href}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profil</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">1</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Code className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compétences</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">16</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FolderOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projets</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Messages</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Portfolio Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <span>← Retour au portfolio</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
