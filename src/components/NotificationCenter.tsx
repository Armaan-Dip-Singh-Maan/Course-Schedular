import React, { useState } from 'react';
import { Bell, Check, X, AlertCircle, Clock, Info } from 'lucide-react';
import { Notification } from '../types';
import useNotificationStore from '../store/useNotificationStore';

const NotificationCenter: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { notifications, markAsRead, clearNotifications } = useNotificationStore();

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="text-red-500" />;
      case 'reminder':
        return <Clock className="text-blue-500" />;
      case 'update':
        return <Info className="text-green-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleMarkAllRead = () => {
    notifications.forEach(notification => markAsRead(notification.id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
            <Bell className="mr-2" />
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <X size={16} /> : <Check size={16} />}
          </button>
        </div>
      </div>

      <div className={`space-y-3 ${isExpanded ? '' : 'max-h-[300px] overflow-y-auto'}`}>
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg flex items-start space-x-3 transition-colors duration-200
                ${notification.read 
                  ? 'bg-gray-50 dark:bg-gray-700/50' 
                  : 'bg-indigo-50 dark:bg-indigo-900/50 border-l-4 border-indigo-500'
                }`}
            >
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-grow">
                <p className="text-gray-800 dark:text-gray-200">{notification.message}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formatTimestamp(notification.timestamp)}
                </p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="flex-shrink-0 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  <Check size={16} />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="mt-4 pt-4 border-t dark:border-gray-700">
          <button
            onClick={clearNotifications}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;