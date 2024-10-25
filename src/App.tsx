import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WeeklySchedule from './components/WeeklySchedule';
import GPACalculator from './components/GPACalculator';
import CourseSearch from './components/CourseSearch';
import QuickTip from './components/QuickTip';
import Settings from './components/Settings';
import ExternalSync from './components/ExternalSync';
import { Course } from './types';
import useDataStore from './store/useDataStore';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );
  const [currentView, setCurrentView] = useState<'schedule' | 'gpa' | 'settings' | 'sync'>('schedule');
  const { schedule, saveSchedule, loadSchedule } = useDataStore();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    loadSchedule();
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, [loadSchedule]);

  const handleAddCourse = (course: Course) => {
    if (!schedule.some(c => c.id === course.id)) {
      const updatedSchedule = [...schedule, course];
      saveSchedule(updatedSchedule);
    }
    setShowSearch(false);
  };

  const handleRemoveCourse = (courseId: string) => {
    const updatedSchedule = schedule.filter(c => c.id !== courseId);
    saveSchedule(updatedSchedule);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'gpa':
        return (
          <div className="space-y-6">
            <GPACalculator courses={schedule} />
          </div>
        );
      case 'settings':
        return <Settings />;
      case 'sync':
        return <ExternalSync courses={schedule} />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 
                  transition-colors"
              >
                {showSearch ? 'Hide Search' : 'Add Course'}
              </button>
            </div>
            {showSearch && (
              <CourseSearch onCourseSelect={handleAddCourse} />
            )}
            <WeeklySchedule
              courses={schedule}
              onCourseRemove={handleRemoveCourse}
            />
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-800' : 'bg-gray-50'}`}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
        darkMode={darkMode}
        onToggleDarkMode={() => {
          setDarkMode(!darkMode);
          localStorage.setItem('darkMode', (!darkMode).toString());
          document.documentElement.classList.toggle('dark');
        }}
      />

      <main className="lg:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          <QuickTip />
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;