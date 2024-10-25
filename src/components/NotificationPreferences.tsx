import React, { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  sound: boolean;
}

const NotificationPreferences: React.FC = () => {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
    inApp: true,
    sound: true
  });

  const notificationChannels = [
    {
      id: 'email',
      icon: Mail,
      label: t('notifications.channels.email'),
      description: t('notifications.descriptions.email')
    },
    {
      id: 'push',
      icon: Bell,
      label: t('notifications.channels.push'),
      description: t('notifications.descriptions.push')
    },
    {
      id: 'sms',
      icon: Smartphone,
      label: t('notifications.channels.sms'),
      description: t('notifications.descriptions.sms')
    },
    {
      id: 'inApp',
      icon: MessageSquare,
      label: t('notifications.channels.inApp'),
      description: t('notifications.descriptions.inApp')
    },
    {
      id: 'sound',
      icon: Volume2,
      label: t('notifications.preferences.sound'),
      description: t('notifications.descriptions.sound')
    }
  ];

  const handleToggle = (channelId: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [channelId]: !prev[channelId]
    }));
  };

  useEffect(() => {
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
  }, [preferences]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-500" />
          {t('notifications.title')}
        </h2>
      </div>

      <div className="space-y-4">
        {notificationChannels.map(channel => (
          <div
            key={channel.id}
            className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex-shrink-0 pt-1">
              <channel.icon className="w-5 h-5 text-indigo-500" />
            </div>
            
            <div className="ml-4 flex-grow">
              <label htmlFor={channel.id} className="font-medium text-gray-900 dark:text-gray-100">
                {channel.label}
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {channel.description}
              </p>
            </div>

            <div className="ml-4 flex-shrink-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id={channel.id}
                  checked={preferences[channel.id as keyof NotificationPreferences]}
                  onChange={() => handleToggle(channel.id as keyof NotificationPreferences)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer 
                  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                  after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                  after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t dark:border-gray-700">
        <button
          onClick={() => setPreferences({
            email: true,
            push: true,
            sms: false,
            inApp: true,
            sound: true
          })}
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 
            dark:hover:text-gray-200"
        >
          {t('notifications.actions.reset')}
        </button>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
            transition-colors"
        >
          {t('notifications.actions.save')}
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;