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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-all duration-500">
        <DarkModeToggle />
        <div className="max-w-md w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl dark:shadow-slate-900/50 p-8 text-center border border-white/20 dark:border-slate-700/50">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">Invalid Request</h2>
          <p className="text-gray-600 dark:text-slate-300 mb-6">
            The authentication action link is invalid or missing required parameters.
          </p>
          <button
            onClick={() => window.location.href = 'https://turri.in.net'}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
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