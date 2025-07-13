import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 transition-all duration-500">
      <DarkModeToggle />
      <div className="max-w-lg w-full text-center">
        {/* GIF Container */}
        <div className="mb-8">
          <img 
            src="https://erfuoutzrqhpdjnzemyd.supabase.co/storage/v1/object/public/123//Untitled%20design.gif"
            alt="404 Animation"
            className="w-64 h-64 mx-auto rounded-2xl shadow-2xl dark:shadow-black/50 border border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-black/50 p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium border border-gray-200 dark:border-gray-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            
            <button
              onClick={() => window.location.href = 'https://turri.in.net'}
              className="flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Turri
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              If you believe this is an error, please contact support or try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;