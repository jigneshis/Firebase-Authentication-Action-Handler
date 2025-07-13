import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg border border-white/20 dark:border-slate-700/50 hover:shadow-xl hover:scale-105 transition-all duration-200 z-50 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 group-hover:text-slate-600 transition-colors" />
      )}
    </button>
  );
};

export default DarkModeToggle;