import React, { useState, useEffect } from 'react';
import { 
  applyActionCode, 
  confirmPasswordReset, 
  verifyPasswordResetCode,
  checkActionCode,
  ActionCodeSettings,
  ActionCodeInfo
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { CheckCircle, AlertCircle, Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface AuthActionProps {
  mode: string;
  oobCode: string;
  continueUrl?: string;
  lang?: string;
}

const AuthAction: React.FC<AuthActionProps> = ({ mode, oobCode, continueUrl, lang }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [actionInfo, setActionInfo] = useState<ActionCodeInfo | null>(null);

  useEffect(() => {
    if (mode === 'resetPassword') {
      verifyResetCode();
    } else if (mode === 'verifyEmail') {
      verifyEmailCode();
    } else if (mode === 'verifyAndChangeEmail') {
      verifyAndChangeEmail();
    } else if (mode === 'recoverEmail') {
      recoverEmail();
    }
  }, [mode, oobCode]);

  const verifyResetCode = async () => {
    try {
      setVerifying(true);
      const email = await verifyPasswordResetCode(auth, oobCode);
      setEmail(email);
      setVerifying(false);
    } catch (error: any) {
      setError('Invalid or expired reset code. Please request a new password reset.');
      setVerifying(false);
    }
  };

  const verifyEmailCode = async () => {
    try {
      setVerifying(true);
      const info = await checkActionCode(auth, oobCode);
      setActionInfo(info);
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      setVerifying(false);
    } catch (error: any) {
      setError('Invalid or expired verification code. Please check your email for a new verification link.');
      setVerifying(false);
    }
  };

  const verifyAndChangeEmail = async () => {
    try {
      setVerifying(true);
      const info = await checkActionCode(auth, oobCode);
      setActionInfo(info);
      
      // Apply the email change
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      setVerifying(false);
    } catch (error: any) {
      setError('Invalid or expired email change verification code. Please request a new email change.');
      setVerifying(false);
    }
  };

  const recoverEmail = async () => {
    try {
      setVerifying(true);
      const info = await checkActionCode(auth, oobCode);
      if (info.data.email) {
        setEmail(info.data.email);
        await applyActionCode(auth, oobCode);
        setSuccess(true);
      }
      setVerifying(false);
    } catch (error: any) {
      setError('Invalid or expired recovery code.');
      setVerifying(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
    } catch (error: any) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (verifying) {
      return (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Loader2 className="h-8 w-8 animate-spin text-white dark:text-black" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Verifying...</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we verify your request.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 dark:bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Error</h2>
          <p className="text-red-600 dark:text-red-400 mb-6 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-700">{error}</p>
          <button
            onClick={() => window.location.href = continueUrl || 'https://turri.in.net'}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            Return to App
          </button>
        </div>
      );
    }

    if (success) {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            {mode === 'resetPassword' ? 'Password Reset Successfully!' : 
             mode === 'verifyEmail' ? 'Email Verified!' : 
             mode === 'verifyAndChangeEmail' ? 'Email Changed Successfully!' :
             mode === 'recoverEmail' ? 'Email Recovered!' : 'Action Completed!'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
            {mode === 'resetPassword' ? 'Your password has been updated successfully.' :
             mode === 'verifyEmail' ? 'Your email has been verified successfully.' :
             mode === 'verifyAndChangeEmail' ? `Your email has been successfully changed${actionInfo?.data?.email ? ` to ${actionInfo.data.email}` : ''}.` :
             mode === 'recoverEmail' ? 'Your email has been recovered successfully.' :
             'The requested action has been completed successfully.'}
          </p>
          <button
            onClick={() => window.location.href = continueUrl || 'https://turri.in.net'}
            className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            Return to App
          </button>
        </div>
      );
    }

    if (mode === 'verifyAndChangeEmail') {
      return (
        <div className="text-center">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="h-8 w-8 text-white dark:text-black" />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Verify Email Change</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {actionInfo?.data?.email ? (
              <>Verifying your new email address: <span className="font-medium text-black dark:text-white">{actionInfo.data.email}</span></>
            ) : (
              'Verifying your email change request...'
            )}
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Note:</strong> Once verified, this will become your new email address for signing in.
            </p>
          </div>
        </div>
      );
    }

    if (mode === 'resetPassword') {
      return (
        <div>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="h-8 w-8 text-white dark:text-black" />
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Reset Your Password</h2>
            <p className="text-gray-600 dark:text-gray-300">Enter your new password for <span className="font-medium text-black dark:text-white">{email}</span></p>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all duration-200"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all duration-200"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Updating Password...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-500 dark:bg-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Invalid Action</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The requested action is not supported.</p>
        <button
          onClick={() => window.location.href = continueUrl || 'https://turri.in.net'}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          Return to App
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 transition-all duration-500">
      <DarkModeToggle />
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl dark:shadow-black/50 p-8 border border-gray-200 dark:border-gray-700">
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthAction;