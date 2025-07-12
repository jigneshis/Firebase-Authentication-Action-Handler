import React from 'react';
import AuthHandler from './components/AuthHandler';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Handler</h1>
          <p className="text-gray-600">
            This page handles password resets and email verification from your authentication emails.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h3 className="font-medium text-gray-900 mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click "Forgot Password" in your app</li>
            <li>• Check your email for the reset link</li>
            <li>• Click the link to be redirected here</li>
            <li>• Set your new password securely</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;