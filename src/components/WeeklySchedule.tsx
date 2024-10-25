import React, { useState } from 'react';
import { Course } from '../types';
import { parseTimeSlots, formatTimeRange } from '../utils/scheduleUtils';
import { X, Clock, MapPin, User } from 'lucide-react';

interface WeeklyScheduleProps {
  courses: Course[];
  onCourseRemove: (courseId: string) => void;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ courses, onCourseRemove }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 14 }, (_, i) => i + 8);

  const getSubjectColor = (crn: string): string => {
    const subject = crn.split(/\d/)[0].toLowerCase();
    const colors: { [key: string]: string } = {
      cs: 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border-l-4 border-blue-500',
      math: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 border-l-4 border-emerald-500',
      phys: 'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 border-l-4 border-purple-500',
      eng: 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 border-l-4 border-amber-500',
      ee: 'bg-rose-100 dark:bg-rose-900/30 text-rose-900 dark:text-rose-100 border-l-4 border-rose-500'
    };
    return colors[subject] || 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-l-4 border-gray-500';
  };

  const renderCourseBlock = (course: Course, day: string, hour: number) => {
    const timeSlot = parseTimeSlots(course.time);
    if (!timeSlot.days.includes(day)) return null;
    if (hour < timeSlot.startTime || hour >= timeSlot.endTime) return null;

    const isFirstHour = hour === timeSlot.startTime;
    if (!isFirstHour) return null;

    const duration = timeSlot.endTime - timeSlot.startTime;
    const heightInRem = duration * 4;

    return (
      <div
        key={`${course.id}-${day}`}
        className={`absolute inset-0 cursor-pointer ${getSubjectColor(course.crn)}`}
        style={{ 
          height: `${heightInRem}rem`,
          zIndex: selectedCourse?.id === course.id ? 20 : 10
        }}
        onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
      >
        <div className="px-2 py-1 h-full overflow-hidden">
          <div className="font-medium text-sm truncate">{course.name}</div>
          <div className="text-xs opacity-75 truncate">{course.professor}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="grid grid-cols-[80px_repeat(5,1fr)] divide-x dark:divide-gray-700">
        {/* Header */}
        <div className="h-12 bg-gray-50 dark:bg-gray-900/50"></div>
        {days.map(day => (
          <div key={day} className="h-12 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center font-medium">
            {day}
          </div>
        ))}

        {/* Time slots */}
        {hours.map(hour => (
          <React.Fragment key={hour}>
            <div className="h-16 px-2 border-r dark:border-gray-700 flex items-center justify-end text-sm text-gray-600 dark:text-gray-400">
              {hour.toString().padStart(2, '0')}:00
            </div>
            {days.map(day => (
              <div key={`${day}-${hour}`} className="h-16 border-b dark:border-gray-700 relative">
                {courses.map(course => renderCourseBlock(course, day, hour))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedCourse.name}</h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span>{selectedCourse.professor}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRange(selectedCourse.time)}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{selectedCourse.location}</span>
              </div>

              <div className="pt-4 border-t dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {selectedCourse.description}
                </p>
                <button
                  onClick={() => {
                    onCourseRemove(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                    transition-colors"
                >
                  Remove Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;