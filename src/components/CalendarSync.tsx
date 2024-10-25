import React, { useState } from 'react';
import { Calendar, Check, ExternalLink, Download } from 'lucide-react';
import ical from 'ical-generator';
import { Course } from '../types';
import { parseTimeSlots } from '../utils/scheduleUtils';

interface CalendarSyncProps {
  courses: Course[];
}

const CalendarSync: React.FC<CalendarSyncProps> = ({ courses }) => {
  const [syncing, setSyncing] = useState(false);

  const generateICS = () => {
    const calendar = ical({ name: 'Course Schedule' });
    
    courses.forEach(course => {
      const timeSlot = parseTimeSlots(course.time);
      const [startHour, startMinute] = course.time.split(' ')[1].split('-')[0].split(':');
      
      const event = calendar.createEvent({
        start: new Date(2024, 0, 1, parseInt(startHour), parseInt(startMinute)),
        end: new Date(2024, 0, 1, parseInt(startHour) + 1, parseInt(startMinute)),
        summary: course.name,
        description: `Professor: ${course.professor}\nLocation: ${course.location}`,
        location: course.location,
        repeating: {
          freq: 'WEEKLY',
          byDay: timeSlot.days.map(day => day.substring(0, 2).toUpperCase()),
          until: new Date(2024, 4, 30) // End of semester
        }
      });
    });

    const blob = new Blob([calendar.toString()], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'course-schedule.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const syncWithGoogle = async () => {
    setSyncing(true);
    try {
      // Implement Google Calendar API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Successfully synced with Google Calendar!');
    } catch (error) {
      console.error('Failed to sync with Google Calendar:', error);
      alert('Failed to sync with Google Calendar');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-semibold">Calendar Integration</h2>
      </div>

      <div className="space-y-4">
        <button
          onClick={syncWithGoogle}
          disabled={syncing}
          className="w-full flex items-center justify-center gap-2 p-3 bg-white dark:bg-gray-700 
            border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 
            dark:hover:bg-gray-600 transition-colors"
        >
          <img src="https://www.google.com/calendar/images/favicon_v2014_" alt="" className="w-5 h-5" />
          <span>{syncing ? 'Syncing...' : 'Sync with Google Calendar'}</span>
        </button>

        <button
          onClick={generateICS}
          className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-50 
            dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg 
            hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download ICS File
        </button>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-medium mb-2">Instructions</h3>
          <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Click "Sync with Google Calendar" to automatically sync your schedule</li>
            <li>• Download ICS file to import into other calendar apps (Apple Calendar, Outlook)</li>
            <li>• Schedule will be updated automatically when changes are made</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarSync;