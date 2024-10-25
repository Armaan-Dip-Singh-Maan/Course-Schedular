import { create } from 'zustand';
import { Course, UserPreferences } from '../types';

interface DataStore {
  userId: string;
  schedule: Course[];
  preferences: UserPreferences;
  setUserId: (id: string) => void;
  saveSchedule: (courses: Course[]) => void;
  loadSchedule: () => void;
  savePreferences: (preferences: UserPreferences) => void;
  loadPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  darkMode: false,
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  calendar: {
    defaultView: 'week',
    startTime: '08:00',
    endTime: '22:00',
  },
};

const useDataStore = create<DataStore>((set) => ({
  userId: localStorage.getItem('userId') || Math.random().toString(36).substring(2, 9),
  schedule: [],
  preferences: defaultPreferences,

  setUserId: (id: string) => {
    localStorage.setItem('userId', id);
    set({ userId: id });
  },

  saveSchedule: (courses: Course[]) => {
    try {
      localStorage.setItem('schedule', JSON.stringify(courses));
      set({ schedule: courses });
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  },

  loadSchedule: () => {
    try {
      const savedSchedule = localStorage.getItem('schedule');
      if (savedSchedule) {
        set({ schedule: JSON.parse(savedSchedule) });
      }
    } catch (error) {
      console.error('Failed to load schedule:', error);
    }
  },

  savePreferences: (preferences: UserPreferences) => {
    try {
      localStorage.setItem('preferences', JSON.stringify(preferences));
      set({ preferences });
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  loadPreferences: () => {
    try {
      const savedPreferences = localStorage.getItem('preferences');
      if (savedPreferences) {
        set({ preferences: JSON.parse(savedPreferences) });
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  },
}));

export default useDataStore;