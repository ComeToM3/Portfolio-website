'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Settings, 
  User, 
  Code, 
  FolderOpen, 
  MessageSquare, 
  BarChart3,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from '@/lib/i18n/useTranslations';

const AdminSidebar = () => {
  const params = useParams();
  const locale = params?.locale as string || 'fr';
  const [collapsed, setCollapsed] = useState(false);
  const t = useTranslations('admin');

  const menuItems = [
    {
      name: t('sidebar.dashboard') as string,
      href: `/${locale}/admin`,
      icon: Settings,
      description: t('sidebar.dashboard_desc') as string
    },
    {
      name: t('sidebar.profile') as string,
      href: `/${locale}/admin/profile`,
      icon: User,
      description: t('sidebar.profile_desc') as string
    },
    {
      name: t('sidebar.skills') as string,
      href: `/${locale}/admin/skills`,
      icon: Code,
      description: t('sidebar.skills_desc') as string
    },
    {
      name: t('sidebar.projects') as string,
      href: `/${locale}/admin/projects`,
      icon: FolderOpen,
      description: t('sidebar.projects_desc') as string
    },
    {
      name: t('sidebar.messages') as string,
      href: `/${locale}/admin/messages`,
      icon: MessageSquare,
      description: t('sidebar.messages_desc') as string
    },
    {
      name: t('sidebar.analytics') as string,
      href: `/${locale}/admin/analytics`,
      icon: BarChart3,
      description: t('sidebar.analytics_desc') as string
    }
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-gray-900 dark:text-white">Admin</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  collapsed 
                    ? 'justify-center' 
                    : 'justify-start'
                } ${
                  // Active state logic here
                  'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{item.name}</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                      {item.description}
                    </span>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <Link
            href={`/${locale}`}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{t('view_site') as string}</span>}
          </Link>
          
          <button className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full ${
            collapsed ? 'justify-center' : 'justify-start'
          }`}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{t('logout') as string}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
