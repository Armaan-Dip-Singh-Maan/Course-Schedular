import React from 'react';
import { Calendar, Search, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import NotificationBell from './NotificationBell';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={t('common.toggleSidebar')}
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-white" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-500" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('common.title')}
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={t('common.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            <NotificationBell />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;