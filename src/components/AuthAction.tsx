import React, { useState, useEffect } from 'react';
import { 
  applyActionCode, 
  confirmPasswordReset, 
  verifyPasswordResetCode,
  checkActionCode,
  ActionCodeSettings
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { CheckCircle, AlertCircle, Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';

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

  useEffect(() => {
    if (mode === 'resetPassword') {
      verifyResetCode();
    } else if (mode === 'verifyEmail') {
      verifyEmailCode();
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
      await applyActionCode(auth, oobCode);
      setSuccess(true);
      setVerifying(false);
    } catch (error: any) {
      setError('Invalid or expired verification code. Please check your email for a new verification link.');
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
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying...</h2>
          <p className="text-gray-600">Please wait while we verify your request.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = continueUrl || 'https://turri.in.net'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to App
          </button>
        </div>
      );
    }

    if (success) {
      return (
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'resetPassword' ? 'Password Reset Successfully!' : 
             mode === 'verifyEmail' ? 'Email Verified!' : 
             mode === 'recoverEmail' ? 'Email Recovered!' : 'Action Completed!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {mode === 'resetPassword' ? 'Your password has been updated successfully.' :
             mode === 'verifyEmail' ? 'Your email has been verified successfully.' :
             mode === 'recoverEmail' ? 'Your email has been recovered successfully.' :
             'The requested action has been completed successfully.'}
          </p>
          <button
            onClick={() => window.location.href = continueUrl || 'https://turri.in.net'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Return to App
          </button>
        </div>
      );
    }

    if (mode === 'resetPassword') {
      return (
        <div>
          <div className="text-center mb-8">
            <Lock className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
            <p className="text-gray-600">Enter your new password for {email}</p>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
        <Mail className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Action</h2>
        <p className="text-gray-600 mb-6">The requested action is not supported.</p>
        <button
          onClick={() => window.location.href = continueUrl || 'https://turri.in.net'}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to App
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthAction;