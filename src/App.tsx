import React from 'react';
import AuthHandler from './components/AuthHandler';
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

  // If no auth parameters, show a simple landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-all duration-500">
      <DarkModeToggle />
      <div className="max-w-md w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl dark:shadow-slate-900/50 p-8 text-center border border-white/20 dark:border-slate-700/50">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-3">Authentication Handler</h1>
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
            This page handles password resets and email verification from your authentication emails.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-xl p-5 text-left border border-slate-200/50 dark:border-slate-600/30">
          <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-2"></div>
            How it works:
          </h3>
          <ul className="text-sm text-gray-700 dark:text-slate-300 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5">•</span>
              <span>Click "Forgot Password" in your app</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5">•</span>
              <span>Check your email for the reset link</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5">•</span>
              <span>Click the link to be redirected here</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5">•</span>
              <span>Set your new password securely</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;