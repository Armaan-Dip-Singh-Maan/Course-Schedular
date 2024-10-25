import axios from 'axios';
import { Course, UserPreferences } from '../types';

const API_URL = 'http://localhost:3001';

export const api = {
  // Schedule Operations
  saveSchedule: async (schedule: { courses: Course[], userId: string }) => {
    return axios.post(`${API_URL}/schedules`, schedule);
  },

  getSchedule: async (userId: string) => {
    return axios.get(`${API_URL}/schedules?userId=${userId}`);
  },

  // User Preferences
  savePreferences: async (preferences: UserPreferences & { userId: string }) => {
    return axios.post(`${API_URL}/userPreferences`, preferences);
  },

  getPreferences: async (userId: string) => {
    return axios.get(`${API_URL}/userPreferences?userId=${userId}`);
  },

  // Analytics
  updateAnalytics: async (data: {
    courseId: string,
    action: 'add' | 'remove' | 'conflict',
    timestamp: string
  }) => {
    return axios.post(`${API_URL}/analytics`, data);
  },

  getAnalytics: async () => {
    return axios.get(`${API_URL}/analytics`);
  },

  // Course Statistics
  updateCourseStats: async (courseId: string, action: 'view' | 'add' | 'remove') => {
    const response = await axios.get(`${API_URL}/analytics/popularCourses`);
    const stats = response.data;
    
    const courseStats = stats.find((s: any) => s.courseId === courseId) || {
      courseId,
      views: 0,
      adds: 0,
      removes: 0
    };

    switch (action) {
      case 'view':
        courseStats.views++;
        break;
      case 'add':
        courseStats.adds++;
        break;
      case 'remove':
        courseStats.removes++;
        break;
    }

    return axios.put(`${API_URL}/analytics/popularCourses/${courseId}`, courseStats);
  }
};