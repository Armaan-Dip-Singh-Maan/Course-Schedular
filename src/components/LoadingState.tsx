import React from 'react';
import { BookOpen } from 'lucide-react';

const studyTips = [
  "Did you know? Taking short breaks improves learning efficiency!",
  "Try the Pomodoro Technique: 25 minutes of study, 5 minutes break",
  "Review your notes within 24 hours to improve retention",
  "Teaching others helps reinforce your own understanding",
  "Get enough sleep! It's crucial for memory consolidation"
];

const LoadingState: React.FC = () => {
  const randomTip = studyTips[Math.floor(Math.random() * studyTips.length)];

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
        <BookOpen className="w-5 h-5" />
        <p className="font-medium">Study Tip:</p>
      </div>
      <p className="text-center text-gray-600 dark:text-gray-400">{randomTip}</p>
    </div>
  );
};

export default LoadingState;