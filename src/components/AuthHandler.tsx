import React, { useEffect, useState } from 'react';
import AuthAction from './AuthAction';
import { AlertCircle } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Request</h2>
          <p className="text-gray-600 mb-6">
            The authentication action link is invalid or missing required parameters.
          </p>
          <button
            onClick={() => window.location.href = 'https://turri.in.net'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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