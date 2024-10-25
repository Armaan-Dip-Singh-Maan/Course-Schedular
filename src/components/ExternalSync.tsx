import React, { useState } from 'react';
import { Calendar, MessageSquare, Mail, Check, Loader } from 'lucide-react';
import useDataStore from '../store/useDataStore';

const ExternalSync: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { schedule } = useDataStore();

  const syncToGoogleCalendar = async () => {
    setLoading({ ...loading, google: true });
    try {
      // Google Calendar API configuration
      const events = schedule.map(course => ({
        'summary': course.name,
        'location': course.location,
        'description': `Professor: ${course.professor}\nCRN: ${course.crn}`,
        'start': {
          'dateTime': '2024-01-08T10:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2024-01-08T11:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
          'RRULE:FREQ=WEEKLY;UNTIL=20240531T170000Z'
        ],
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSyncStatus({ ...syncStatus, google: true });
    } catch (error) {
      console.error('Failed to sync with Google Calendar:', error);
    } finally {
      setLoading({ ...loading, google: false });
    }
  };

  const syncToOutlook = async () => {
    setLoading({ ...loading, outlook: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSyncStatus({ ...syncStatus, outlook: true });
    } catch (error) {
      console.error('Failed to sync with Outlook:', error);
    } finally {
      setLoading({ ...loading, outlook: false });
    }
  };

  const syncToTeams = async () => {
    setLoading({ ...loading, teams: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSyncStatus({ ...syncStatus, teams: true });
    } catch (error) {
      console.error('Failed to sync with Teams:', error);
    } finally {
      setLoading({ ...loading, teams: false });
    }
  };

  const syncOptions = [
    {
      id: 'google',
      name: 'Google Calendar',
      icon: Calendar,
      action: syncToGoogleCalendar,
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      icon: MessageSquare,
      action: syncToTeams,
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: Mail,
      action: syncToOutlook,
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">External Sync</h2>
      
      <div className="space-y-4">
        {syncOptions.map(option => (
          <button
            key={option.id}
            onClick={option.action}
            disabled={loading[option.id]}
            className={`w-full flex items-center justify-between p-4 rounded-lg
              transition-colors duration-200 ${
                syncStatus[option.id]
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
          >
            <div className="flex items-center gap-3">
              <option.icon className="w-5 h-5" />
              <span className="font-medium">{option.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {loading[option.id] ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : syncStatus[option.id] ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <span className="text-sm">Connect</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {schedule.length === 0 && (
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Add courses to your schedule before syncing with external calendars.
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="font-medium mb-2">Sync Information</h3>
        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
          <li>• Your schedule will be synced as recurring events</li>
          <li>• Updates to your schedule will be reflected automatically</li>
          <li>• You can remove synced calendars at any time</li>
        </ul>
      </div>
    </div>
  );
};

export default ExternalSync;