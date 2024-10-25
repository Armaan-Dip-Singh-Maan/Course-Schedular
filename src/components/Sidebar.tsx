import React from 'react';
import { Calendar, Calculator, Settings as SettingsIcon, Link, Sun, Moon, X, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentView: string;
  onViewChange: (view: 'schedule' | 'gpa' | 'settings' | 'sync') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  currentView,
  onViewChange
}) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'schedule',
      icon: Calendar,
      label: t('navigation.schedule'),
      view: 'schedule'
    },
    {
      id: 'gpa',
      icon: Calculator,
      label: t('navigation.gpa'),
      view: 'gpa'
    },
    {
      id: 'settings',
      icon: SettingsIcon,
      label: t('navigation.settings'),
      view: 'settings'
    },
    {
      id: 'sync',
      icon: Link,
      label: t('navigation.sync'),
      view: 'sync'
    }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-50 
        transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold">{t('common.menu')}</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.view as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.view
                    ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            <button
              onClick={onToggleDarkMode}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">{t('theme.light')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">{t('theme.dark')}</span>
                </>
              )}
            </button>
          </nav>

          <div className="p-4 border-t dark:border-gray-700">
            <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <h3 className="font-medium text-indigo-600 dark:text-indigo-400">
                  {t('support.title')}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('support.description')}
              </p>
              <a
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {t('support.viewDocs')}
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;