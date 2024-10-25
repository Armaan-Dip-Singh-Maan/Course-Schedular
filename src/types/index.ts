export interface Course {
  id: string;
  name: string;
  crn: string;
  professor: string;
  description: string;
  credits: number;
  prerequisites: string[];
  corequisites: string[];
  time: string;
  location: string;
  seatsTotal: number;
  seatsAvailable: number;
  waitlistCount: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface Notification {
  id?: string;
  type: 'reminder' | 'alert' | 'update';
  message: string;
  timestamp?: string;
  read?: boolean;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  calendar: {
    defaultView: 'week' | 'month';
    startTime: string;
    endTime: string;
  };
}