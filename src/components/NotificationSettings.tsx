import React from 'react';
import { Bell, Clock, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useNotificationStore from '../store/useNotificationStore';

const NotificationSettings: React.FC = () => {
  const { t } = useTranslation();
  const { preferences, updatePreferences } = useNotificationStore();

  const timeOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-semibold">{t('notifications.settings')}</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">
            {t('notifications.channels.title')}
          </h3>
          
          {Object.entries({
            email: t('notifications.channels.email'),
            push: t('notifications.channels.push'),
            sms: t('notifications.channels.sms')
          }).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between p-3 bg-gray-50 
              dark:bg-gray-700 rounded-lg">
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-500" />
                {label}
              </span>
              <input
                type="checkbox"
                checked={preferences[key as keyof typeof preferences]}
                onChange={(e) => updatePreferences({ [key]: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 
                  focus:ring-indigo-500"
              />
            </label>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">
            {t('notifications.timing.title')}
          </h3>

          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                {t('notifications.timing.before')}
              </span>
              <select
                value={preferences.beforeClass}
                onChange={(e) => updatePreferences({ beforeClass: Number(e.target.value) })}
                className="rounded-lg border-gray-300 text-sm focus:ring-indigo-500 
                  focus:border-indigo-500 dark:bg-gray-600 dark:border-gray-500"
              >
                {timeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                {t('notifications.timing.daily')}
              </span>
              <input
                type="checkbox"
                checked={preferences.dailyUpdates}
                onChange={(e) => updatePreferences({ dailyUpdates: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 
                  focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                {t('notifications.timing.weekly')}
              </span>
              <input
                type="checkbox"
                checked={preferences.weeklyUpdates}
                onChange={(e) => updatePreferences({ weeklyUpdates: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 
                  focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;