import React, { useEffect, useState } from 'react';
import { BarChart, Clock, Users } from 'lucide-react';
import { api } from '../services/api';

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await api.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center mb-6">
        <BarChart className="mr-2" />
        Analytics
      </h2>

      <div className="grid gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Popular Courses
          </h3>
          <div className="space-y-2">
            {analytics?.popularCourses?.slice(0, 5).map((course: any) => (
              <div key={course.courseId} className="flex justify-between items-center">
                <span>{course.name}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {course.adds} enrollments
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Popular Time Slots
          </h3>
          <div className="space-y-2">
            {analytics?.commonTimeSlots?.slice(0, 5).map((slot: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span>{slot.time}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {slot.count} courses
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Average Credits</h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {analytics?.averageCredits.toFixed(1)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Total Schedules</h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {analytics?.totalSchedules || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;