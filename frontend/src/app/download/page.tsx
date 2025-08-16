import { Metadata } from 'next';
import { 
  Download, 
  Smartphone, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Télécharger Todo AI App - Application Mobile Intelligente',
  description: 'Téléchargez Todo AI App, l\'application Flutter moderne qui combine gestion de tâches intelligente avec coaching comportemental avancé.',
  keywords: 'télécharger, Todo AI App, Flutter, application mobile, coaching comportemental',
  openGraph: {
    title: 'Télécharger Todo AI App',
    description: 'Application mobile intelligente avec coaching comportemental',
    type: 'website',
  },
};

const features = [
  {
    icon: Zap,
    title: 'Performance Optimisée',
    description: 'Temps de réponse < 100ms garanti'
  },
  {
    icon: Shield,
    title: 'Sécurisé et Privé',
    description: 'Données locales, aucune transmission externe'
  },
  {
    icon: Star,
    title: 'Gratuit',
    description: 'Aucun coût, aucune publicité'
  }
];

const requirements = [
  'Android 6.0 (API 23) ou supérieur',
  '50 MB d\'espace de stockage',
  'Connexion internet pour les mises à jour',
  'Autorisations de stockage pour sauvegarder vos données'
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4 mr-2" />
              Version 2.0.0
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Télécharger Todo AI App
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Transformez votre productivité avec l&apos;IA et le coaching comportemental
            </p>
            
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-8 hover:scale-105">
              <Download className="w-6 h-6 mr-3" />
              Télécharger APK (Android)
              <ArrowRight className="w-5 h-5 ml-3" />
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Taille : ~25 MB • Compatible Android 6.0+ • Gratuit
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Pourquoi choisir Todo AI App ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Une expérience unique combinant technologie moderne et psychologie comportementale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Configuration Requise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Vérifiez que votre appareil est compatible
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-start"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {requirement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Guide d&apos;Installation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Suivez ces étapes simples pour installer l&apos;application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Téléchargez l&apos;APK
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cliquez sur le bouton de téléchargement ci-dessus pour obtenir le fichier APK
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Autorisez l&apos;installation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Activez &quot;Sources inconnues&quot; dans les paramètres de sécurité Android
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Installez et profitez
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ouvrez le fichier APK et suivez les instructions d&apos;installation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Rejoignez les utilisateurs qui ont déjà transformé leur productivité
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Download className="w-5 h-5 mr-2" />
                Télécharger Maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <Link href="/app-mobile">
                <button className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105">
                  En savoir plus
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>
            
            <p className="text-sm text-purple-200 mt-6">
              Version 2.0.0 • 45/45 tests passés • 0 erreur, 0 warning
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
