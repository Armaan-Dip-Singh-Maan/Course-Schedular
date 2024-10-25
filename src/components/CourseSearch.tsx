import React, { useState } from 'react';
import { Search, Filter, Clock, MapPin, User, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { coursesData } from '../data/courses';
import { formatTimeRange } from '../utils/scheduleUtils';

interface CourseSearchProps {
  onCourseSelect: (course: Course) => void;
}

const CourseSearch: React.FC<CourseSearchProps> = ({ onCourseSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: 'all',
    timeSlot: 'all',
    credits: 'all',
    availability: 'all'
  });

  const timeSlots = [
    { value: 'morning', label: 'Morning (8:00 AM - 12:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (12:00 PM - 4:00 PM)' },
    { value: 'evening', label: 'Evening (4:00 PM - 8:00 PM)' }
  ];

  const subjects = Array.from(new Set(coursesData.map(course => 
    course.crn.split(/\d/)[0]
  ))).sort();

  const isInTimeSlot = (courseTime: string, slot: string) => {
    const [, times] = courseTime.split(' ');
    const [start] = times.split('-');
    const hour = parseInt(start.split(':')[0]);
    
    switch(slot) {
      case 'morning': return hour >= 8 && hour < 12;
      case 'afternoon': return hour >= 12 && hour < 16;
      case 'evening': return hour >= 16 && hour < 20;
      default: return true;
    }
  };

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.crn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = filters.subject === 'all' || 
      course.crn.startsWith(filters.subject);

    const matchesTimeSlot = filters.timeSlot === 'all' || 
      isInTimeSlot(course.time, filters.timeSlot);

    const matchesCredits = filters.credits === 'all' || 
      course.credits === parseInt(filters.credits);

    const matchesAvailability = filters.availability === 'all' ||
      (filters.availability === 'available' && course.seatsAvailable > 0) ||
      (filters.availability === 'waitlist' && course.waitlistCount > 0);

    return matchesSearch && matchesSubject && matchesTimeSlot && 
           matchesCredits && matchesAvailability;
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-lg">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-semibold">Course Search</h2>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by course name, professor, or CRN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters 
                ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600' 
                : 'bg-gray-50 dark:bg-gray-700'
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 
            dark:bg-gray-700 rounded-lg">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full p-2 bg-white dark:bg-gray-600 border border-gray-200 
                  dark:border-gray-500 rounded-lg"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <select
                value={filters.timeSlot}
                onChange={(e) => setFilters({...filters, timeSlot: e.target.value})}
                className="w-full p-2 bg-white dark:bg-gray-600 border border-gray-200 
                  dark:border-gray-500 rounded-lg"
              >
                <option value="all">All Times</option>
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>{slot.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Credits</label>
              <select
                value={filters.credits}
                onChange={(e) => setFilters({...filters, credits: e.target.value})}
                className="w-full p-2 bg-white dark:bg-gray-600 border border-gray-200 
                  dark:border-gray-500 rounded-lg"
              >
                <option value="all">All Credits</option>
                {[1, 2, 3, 4].map(credit => (
                  <option key={credit} value={credit}>{credit} Credits</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Availability</label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({...filters, availability: e.target.value})}
                className="w-full p-2 bg-white dark:bg-gray-600 border border-gray-200 
                  dark:border-gray-500 rounded-lg"
              >
                <option value="all">All Courses</option>
                <option value="available">Available Seats</option>
                <option value="waitlist">Waitlist Only</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="max-h-[calc(100vh-24rem)] overflow-y-auto divide-y dark:divide-gray-700">
        {filteredCourses.map(course => (
          <button
            key={course.id}
            onClick={() => onCourseSelect(course)}
            className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 
              transition-colors duration-200"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{course.name}</h3>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{course.professor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{formatTimeRange(course.time)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{course.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${course.seatsAvailable > 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                  {course.seatsAvailable} seats left
                </span>
                <div className="mt-1 text-xs text-gray-500">
                  {course.crn} • {course.credits} credits
                </div>
              </div>
            </div>
          </button>
        ))}

        {filteredCourses.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No courses found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;