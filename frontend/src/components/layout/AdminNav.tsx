'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Settings, 
  User, 
  Code, 
  FolderOpen, 
  MessageSquare, 
  BarChart3,
  LogOut,
  Home
} from 'lucide-react';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useAuth } from '@/lib/contexts/AuthContext';

const AdminNav = () => {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale as string || 'fr';
  const t = useTranslations('admin');
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: t('dashboard') as string,
      href: `/${locale}/admin`,
      icon: Settings,
      current: true
    },
    {
      name: t('profile') as string,
      href: `/${locale}/admin/profile`,
      icon: User,
      current: false
    },
    {
      name: t('skills') as string,
      href: `/${locale}/admin/skills`,
      icon: Code,
      current: false
    },
    {
      name: t('projects') as string,
      href: `/${locale}/admin/projects`,
      icon: FolderOpen,
      current: false
    },
    {
      name: t('messages') as string,
      href: `/${locale}/admin/messages`,
      icon: MessageSquare,
      current: false
    },
    {
      name: t('analytics') as string,
      href: `/${locale}/admin/analytics`,
      icon: BarChart3,
      current: false
    }
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link 
              href={`/${locale}/admin`}
              className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <span className="font-semibold text-lg">Administration</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  item.current
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* User info */}
            {user && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-medium text-xs">
                    {user.name?.[0] || user.email[0].toUpperCase()}
                  </span>
                </div>
                <span className="hidden lg:block">{user.name || user.email}</span>
              </div>
            )}
            
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:block">{t('view_site') as string}</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">{t('logout') as string}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                item.current
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          
          {/* Mobile user info and logout */}
          {user && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 font-medium text-xs">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user.name || user.email}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
