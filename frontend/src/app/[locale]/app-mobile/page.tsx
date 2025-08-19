import { Metadata } from 'next';
import { 
  Smartphone, 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Download,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Todo AI App - Application Mobile Intelligente | Johan Dominguez',
  description: 'Découvrez Todo AI App, une application Flutter moderne qui combine gestion de tâches intelligente avec coaching comportemental avancé basé sur les principes d\'Atomic Habits.',
  keywords: 'Todo AI App, Flutter, IA, coaching comportemental, Atomic Habits, application mobile, Johan Dominguez',
  openGraph: {
    title: 'Todo AI App - Application Mobile Intelligente',
    description: 'Gestion de tâches intelligente avec coaching comportemental avancé',
    type: 'website',
  },
};

const features = [
  {
    icon: Brain,
    title: 'IA Intégrée',
    description: 'Classification automatique des tâches avec TensorFlow Lite local',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Coaching Comportemental',
    description: 'Insights personnalisés basés sur les principes d\'Atomic Habits',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: BarChart3,
    title: 'Analyses Avancées',
    description: '8 graphiques FLChart pour visualiser votre progression',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Performance Optimisée',
    description: 'Temps de réponse < 100ms avec base de données Isar locale',
    color: 'from-orange-500 to-red-500'
  }
];

const techStack = [
  { name: 'Flutter 3.33.0', category: 'Framework' },
  { name: 'Riverpod', category: 'État' },
  { name: 'Isar DB', category: 'Base de données' },
  { name: 'TensorFlow Lite', category: 'IA' },
  { name: 'FLChart', category: 'Graphiques' },
  { name: 'WorkManager', category: 'Arrière-plan' }
];

const metrics = [
  { label: 'Lignes de code', value: '~7000', icon: '📊' },
  { label: 'Tests passés', value: '45/45', icon: '✅' },
  { label: 'Temps de réponse', value: '< 100ms', icon: '⚡' },
  { label: 'Précision IA', value: '95%', icon: '🎯' }
];

export default function AppMobilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4 mr-2" />
              Application Mobile Flutter
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Todo AI App
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Une application moderne qui combine <span className="text-purple-600 dark:text-purple-400 font-semibold">gestion de tâches intelligente</span> avec <span className="text-blue-600 dark:text-blue-400 font-semibold">coaching comportemental</span> avancé
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Download className="w-5 h-5 mr-2" />
                Télécharger l&apos;App
              </button>
              
              <button className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105">
                <Play className="w-5 h-5 mr-2" />
                Voir la Démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez les capacités avancées qui font de Todo AI App une expérience unique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Métriques du Projet
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Des performances exceptionnelles validées par des tests rigoureux
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-2">{metric.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stack Technique
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Technologies modernes pour une application performante et maintenable
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 hover:scale-105"
              >
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                  {tech.category}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Architecture Moderne
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Une architecture Flutter robuste basée sur les meilleures pratiques avec séparation claire des responsabilités.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Riverpod pour l&apos;état réactif</h3>
                    <p className="text-gray-600 dark:text-gray-300">Gestion d&apos;état moderne et performante</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Isar pour la persistance locale</h3>
                    <p className="text-gray-600 dark:text-gray-300">Base de données NoSQL ultra-rapide</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">TensorFlow Lite pour l&apos;IA</h3>
                    <p className="text-gray-600 dark:text-gray-300">Classification automatique des tâches</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
                <div className="mb-4">
                  <span className="text-purple-600">lib/</span>
                  <div className="ml-4">
                    <div>├── <span className="text-blue-600">app/</span></div>
                    <div>├── <span className="text-green-600">features/</span></div>
                    <div className="ml-4">
                      <div>├── home/</div>
                      <div>├── add_task/</div>
                      <div>├── settings/</div>
                      <div>└── behavior/</div>
                    </div>
                    <div>├── <span className="text-orange-600">models/</span></div>
                    <div>├── <span className="text-red-600">services/</span></div>
                    <div className="ml-4">
                      <div>├── ai/</div>
                      <div>├── db/</div>
                      <div>├── behavior/</div>
                      <div>└── notifications/</div>
                    </div>
                    <div>└── <span className="text-cyan-600">widgets/</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à transformer votre productivité ?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Rejoignez les utilisateurs qui ont déjà amélioré leurs habitudes avec l&apos;IA
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Download className="w-5 h-5 mr-2" />
                Télécharger Maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            
            <p className="text-sm text-purple-200 mt-4">
              Version 2.0.0 • Compatible Android • Gratuit
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
