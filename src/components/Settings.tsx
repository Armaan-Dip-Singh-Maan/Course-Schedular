import React from 'react';
import NotificationPreferences from './NotificationPreferences';
import LanguageSelector from './LanguageSelector';
import { Settings as SettingsIcon, Bell, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-indigo-500" />
              <h3 className="font-medium">Language</h3>
            </div>
            <LanguageSelector />
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-indigo-500" />
              <h3 className="font-medium">Notifications</h3>
            </div>
            <NotificationPreferences />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;