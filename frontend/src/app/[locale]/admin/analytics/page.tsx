'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number; percentage: number }>;
  trafficSources: Array<{ source: string; visitors: number; percentage: number }>;
  deviceTypes: Array<{ device: string; users: number; percentage: number }>;
  dailyStats: Array<{ date: string; views: number; visitors: number }>;
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Données de démonstration avec useMemo pour éviter les re-renders
  const demoAnalytics = useMemo((): AnalyticsData => ({
    pageViews: 1247,
    uniqueVisitors: 892,
    bounceRate: 34.2,
    avgSessionDuration: 245,
    topPages: [
      { page: '/', views: 456, percentage: 36.6 },
      { page: '/projects', views: 234, percentage: 18.8 },
      { page: '/skills', views: 189, percentage: 15.2 },
      { page: '/about', views: 156, percentage: 12.5 },
      { page: '/contact', views: 98, percentage: 7.9 }
    ],
    trafficSources: [
      { source: 'Direct', visitors: 456, percentage: 51.1 },
      { source: 'Google', visitors: 234, percentage: 26.2 },
      { source: 'LinkedIn', visitors: 89, percentage: 10.0 },
      { source: 'GitHub', visitors: 67, percentage: 7.5 },
      { source: 'Autres', visitors: 46, percentage: 5.2 }
    ],
    deviceTypes: [
      { device: 'Desktop', users: 567, percentage: 63.6 },
      { device: 'Mobile', users: 234, percentage: 26.2 },
      { device: 'Tablet', users: 91, percentage: 10.2 }
    ],
    dailyStats: [
      { date: '2024-01-10', views: 45, visitors: 32 },
      { date: '2024-01-11', views: 52, visitors: 38 },
      { date: '2024-01-12', views: 48, visitors: 35 },
      { date: '2024-01-13', views: 61, visitors: 42 },
      { date: '2024-01-14', views: 67, visitors: 45 },
      { date: '2024-01-15', views: 73, visitors: 51 },
      { date: '2024-01-16', views: 69, visitors: 47 }
    ]
  }), []);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setAnalytics(demoAnalytics);
      setIsLoading(false);
    }, 1000);
  }, [timeRange, demoAnalytics]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Statistiques et métriques de votre portfolio
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {[
              { key: '7d', label: '7 jours' },
              { key: '30d', label: '30 jours' },
              { key: '90d', label: '90 jours' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTimeRange(key as '7d' | '30d' | '90d')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeRange === key
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pages vues</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analytics.pageViews)}
              </p>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visiteurs uniques</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analytics.uniqueVisitors)}
              </p>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.3%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <MousePointer className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Taux de rebond</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.bounceRate}%
              </p>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                +2.1%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Durée moyenne</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatDuration(analytics.avgSessionDuration)}
              </p>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5.2%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pages les plus visitées
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {page.page}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatNumber(page.views)} vues
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {page.percentage}%
                    </p>
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${page.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sources de trafic
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {source.source}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatNumber(source.visitors)} visiteurs
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {source.percentage}%
                    </p>
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Types */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Types d&apos;appareils
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.deviceTypes.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      {device.device === 'Desktop' ? (
                        <Monitor className="w-4 h-4 text-purple-600" />
                      ) : device.device === 'Mobile' ? (
                        <Smartphone className="w-4 h-4 text-purple-600" />
                      ) : (
                        <Monitor className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.device}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatNumber(device.users)} utilisateurs
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {device.percentage}%
                    </p>
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Statistiques quotidiennes
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.dailyStats.map((stat) => (
                <div key={stat.date} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(stat.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatNumber(stat.visitors)} visiteurs
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatNumber(stat.views)} vues
                    </p>
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${(stat.views / Math.max(...analytics.dailyStats.map(s => s.views))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
