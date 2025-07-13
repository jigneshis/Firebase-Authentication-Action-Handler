import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-3 rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-200 z-50 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-black group-hover:text-gray-700 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-black group-hover:text-gray-700 transition-colors" />
      )}
    </button>
  );
};

export default DarkModeToggle;