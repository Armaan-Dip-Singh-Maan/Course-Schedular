// Google Calendar API configuration
export const GOOGLE_CONFIG = {
  API_KEY: 'YOUR_ACTUAL_API_KEY', // Replace with your actual API key
  CLIENT_ID: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual client ID
  DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  SCOPES: 'https://www.googleapis.com/auth/calendar.events',
};

// Instructions to get API credentials:
// 1. Go to Google Cloud Console (https://console.cloud.google.com)
// 2. Create a new project or select existing one
// 3. Enable Google Calendar API
// 4. Create credentials (OAuth 2.0 Client ID and API Key)
// 5. Add authorized JavaScript origins for your domain
// 6. Add authorized redirect URIs