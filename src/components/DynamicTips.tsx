import React, { useState, useEffect } from 'react';
import { Lightbulb, Quote } from 'lucide-react';

const tips = [
  {
    type: 'scheduling',
    text: "Balance your schedule by mixing difficult and easier courses",
    icon: Lightbulb
  },
  {
    type: 'scheduling',
    text: "Try to avoid back-to-back classes for better focus",
    icon: Lightbulb
  },
  {
    type: 'motivation',
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts",
    icon: Quote
  },
  {
    type: 'scheduling',
    text: "Consider your peak productivity hours when scheduling classes",
    icon: Lightbulb
  },
  {
    type: 'motivation',
    text: "The expert in anything was once a beginner",
    icon: Quote
  },
  {
    type: 'scheduling',
    text: "Leave gaps for study sessions between classes",
    icon: Lightbulb
  }
];

const DynamicTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const tip = tips[currentTip];
  const Icon = tip.icon;

  return (
    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 animate-fadeIn">
          {tip.text}
        </p>
      </div>
    </div>
  );
};

export default DynamicTips;