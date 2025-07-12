import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    
    // Apply dark class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      const saved = localStorage.getItem('darkMode');
      if (saved === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => setIsDark(!isDark);

  return { isDark, toggleDarkMode };
};