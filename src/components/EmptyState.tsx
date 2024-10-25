import React from 'react';
import { Calendar } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Calendar className="w-16 h-16 text-indigo-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No Courses Scheduled
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-sm">
        Drag and drop courses from the course search or click to add them to your schedule.
      </p>
    </div>
  );
};

export default EmptyState;