import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthHandler from './components/AuthHandler';
import NotFound from './components/NotFound';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  // Check if we're on the auth action page
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const oobCode = urlParams.get('oobCode');

  // If we have the required parameters, show the auth handler
  if (mode && oobCode) {
    return <AuthHandler />;
  }

  // If no auth parameters, use router for other pages
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Home page component
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 transition-all duration-500">
      <DarkModeToggle />
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-black/50 p-8 text-center border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-black dark:text-white mb-3">Authentication Handler</h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This page handles password resets and email verification from your authentication emails.
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-left border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-3 flex items-center">
            <div className="w-2 h-2 bg-black dark:bg-white rounded-full mr-2"></div>
            How it works:
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="text-black dark:text-white mr-2 mt-0.5">•</span>
              <span>Click "Forgot Password" in your app</span>
            </li>
            <li className="flex items-start">
              <span className="text-black dark:text-white mr-2 mt-0.5">•</span>
              <span>Check your email for the reset link</span>
            </li>
            <li className="flex items-start">
              <span className="text-black dark:text-white mr-2 mt-0.5">•</span>
              <span>Click the link to be redirected here</span>
            </li>
            <li className="flex items-start">
              <span className="text-black dark:text-white mr-2 mt-0.5">•</span>
              <span>Set your new password securely</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;