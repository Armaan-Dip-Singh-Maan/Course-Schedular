import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const QuickTip: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const { t } = useTranslation();

  const tips = [
    'tips.scheduling',
    'tips.peakHours',
    'tips.balance',
    'tips.prerequisites',
    'tips.credits',
    'tips.location',
    'tips.extracurricular',
    'tips.courseLoad',
    'tips.saveChanges',
    'tips.rateMyProfessor',
    'tips.studyGroups',
    'tips.breaks',
    'tips.commute',
    'tips.buildings',
    'tips.weather'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 
      dark:to-purple-900/20 rounded-lg p-4 mb-6 shadow-sm animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
          <Lightbulb className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="font-medium text-indigo-900 dark:text-indigo-200 mb-1">
            {t('common.quickTip')}
          </h3>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            {t(tips[currentTipIndex])}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickTip;