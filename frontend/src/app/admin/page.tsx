import { Metadata } from 'next';
import { 
  Settings, 
  User, 
  Code, 
  FolderOpen, 
  MessageSquare, 
  BarChart3,
  Save,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Administration - Portfolio Hordearii',
  description: 'Interface d\'administration pour gérer le contenu du portfolio professionnel.',
  robots: 'noindex, nofollow', // Empêcher l'indexation de la page admin
};

const adminSections = [
  {
    id: 'profile',
    title: 'Profil',
    description: 'Gérer les informations personnelles et professionnelles',
    icon: User,
    color: 'from-blue-500 to-cyan-500',
    stats: { total: 1, updated: '2h ago' }
  },
  {
    id: 'skills',
    title: 'Compétences',
    description: 'Gérer les compétences techniques et leurs niveaux',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    stats: { total: 12, updated: '1h ago' }
  },
  {
    id: 'projects',
    title: 'Projets',
    description: 'Gérer les projets et leurs descriptions',
    icon: FolderOpen,
    color: 'from-purple-500 to-pink-500',
    stats: { total: 4, updated: '30m ago' }
  },
  {
    id: 'contact',
    title: 'Messages',
    description: 'Gérer les messages de contact reçus',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    stats: { total: 8, updated: '5m ago' }
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Voir les statistiques et métriques du site',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500',
    stats: { total: '24h', updated: 'Live' }
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'update',
    section: 'Skills',
    description: 'Mis à jour le niveau de Flutter à 85%',
    time: '2 minutes ago',
    user: 'Admin'
  },
  {
    id: 2,
    type: 'create',
    section: 'Projects',
    description: 'Ajouté le projet "Todo AI App"',
    time: '1 heure ago',
    user: 'Admin'
  },
  {
    id: 3,
    type: 'message',
    section: 'Contact',
    description: 'Nouveau message de contact reçu',
    time: '3 heures ago',
    user: 'Visiteur'
  }
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Administration
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Connecté en tant que <span className="font-medium text-gray-900 dark:text-white">Admin</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visiteurs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Messages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FolderOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Projets</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Code className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Compétences</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminSections.map((section) => (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color}`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {section.stats.total}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {section.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Mis à jour {section.stats.updated}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activités Récentes
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      activity.type === 'update' ? 'bg-blue-500' :
                      activity.type === 'create' ? 'bg-green-500' :
                      'bg-orange-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.section} • {activity.time} • {activity.user}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Actions Rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Projet
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Compétence
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Edit className="w-4 h-4 mr-2" />
              Modifier le Profil
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <BarChart3 className="w-4 h-4 mr-2" />
              Voir Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
