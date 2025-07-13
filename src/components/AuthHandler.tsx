import React, { useEffect, useState } from 'react';
import AuthAction from './AuthAction';
import { AlertCircle } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const AuthHandler: React.FC = () => {
  const [params, setParams] = useState<{
    mode: string;
    oobCode: string;
    continueUrl?: string;
    lang?: string;
  } | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const oobCode = urlParams.get('oobCode');
    const continueUrl = urlParams.get('continueUrl');
    const lang = urlParams.get('lang');

    if (mode && oobCode) {
      setParams({
        mode,
        oobCode,
        continueUrl: continueUrl || undefined,
        lang: lang || undefined
      });
    }
  }, []);

  if (!params) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 transition-all duration-500">
        <DarkModeToggle />
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-black/50 p-8 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-red-600 dark:bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Invalid Request</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The authentication action link is invalid or missing required parameters.
          </p>
          <button
            onClick={() => window.location.href = 'https://turri.in.net'}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            Return to App
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthAction
      mode={params.mode}
      oobCode={params.oobCode}
      continueUrl={params.continueUrl}
      lang={params.lang}
    />
  );
};

export default AuthHandler;