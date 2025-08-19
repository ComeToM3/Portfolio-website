'use client';

import { 
  Users, 
  Code, 
  FolderOpen, 
  MessageSquare, 
  TrendingUp,
  Eye,
  Clock,
  Activity
} from 'lucide-react';
import { useTranslations } from '@/lib/i18n/useTranslations';

interface DashboardStats {
  totalVisitors: number;
  totalSkills: number;
  totalProjects: number;
  totalMessages: number;
  growthRate: number;
  responseTime: string;
}

interface RecentActivity {
  id: number;
  type: 'visit' | 'message' | 'update' | 'create';
  description: string;
  time: string;
  user?: string;
}

const Dashboard = () => {
  const t = useTranslations('admin');
  
  // Mock data - would come from API in real implementation
  const stats: DashboardStats = {
    totalVisitors: 1247,
    totalSkills: 21,
    totalProjects: 4,
    totalMessages: 23,
    growthRate: 12.5,
    responseTime: '2.3s'
  };

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'visit',
      description: t('activity.new_visitor') as string,
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'message',
      description: t('activity.new_message') as string,
      time: '5 minutes ago',
      user: 'contact@example.com'
    },
    {
      id: 3,
      type: 'update',
      description: t('activity.skill_updated') as string,
      time: '1 heure ago'
    },
    {
      id: 4,
      type: 'create',
      description: t('activity.project_added') as string,
      time: '2 heures ago'
    },
    {
      id: 5,
      type: 'visit',
      description: t('activity.visitor_projects') as string,
      time: '3 heures ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'update':
        return <Code className="w-4 h-4 text-purple-500" />;
      case 'create':
        return <FolderOpen className="w-4 h-4 text-orange-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'visit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'message':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'update':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'create':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('stats.visitors') as string}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVisitors}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+{stats.growthRate}% {t('stats.growth_rate') as string}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('stats.skills') as string}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSkills}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{t('stats.recent_update') as string}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('stats.projects') as string}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FolderOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Activity className="w-4 h-4 mr-1" />
            <span>{t('stats.active') as string}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('stats.messages') as string}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMessages}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{t('stats.response_time') as string}: {stats.responseTime}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('activity.title') as string}</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.user}
                    </p>
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('actions.title') as string}</h4>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
              {t('actions.add_skill') as string}
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
              {t('actions.create_project') as string}
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
              {t('actions.view_messages') as string}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('performance.title') as string}</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">{t('performance.loading_time') as string}</span>
                <span className="text-gray-900 dark:text-white font-medium">{stats.responseTime}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">{t('performance.conversion_rate') as string}</span>
                <span className="text-gray-900 dark:text-white font-medium">3.2%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('system.title') as string}</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('system.version') as string}</span>
              <span className="text-gray-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('system.last_update') as string}</span>
              <span className="text-gray-900 dark:text-white">Aujourd&apos;hui</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t('system.status') as string}</span>
              <span className="text-green-600 dark:text-green-400">{t('system.operational') as string}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
