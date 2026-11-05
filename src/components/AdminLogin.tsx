import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Key, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  LogIn, 
  AlertCircle, 
  Shield
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { 
    adminLoginWithPasscode,
    setCurrentPage, 
    showToast 
  } = useApp();

  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const trimmed = password.trim();
    if (!trimmed) {
      setErrorMessage('Please enter the password.');
      return;
    }

    const success = adminLoginWithPasscode(trimmed);
    if (success) {
      showToast('Login successful. Dashboard access granted.', 'success');
    } else {
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto px-4 sm:px-0">
        
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2C2723] text-[#FAF8F5] shadow-lg mb-4 ring-8 ring-[#2C2723]/10">
            <Shield className="w-8 h-8 text-[#E8DCC4]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1F1B18] tracking-tight">
            Welcome!
          </h1>
        </div>

        {/* Password Login Box */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-[#EFE9DF] sm:px-10">
          
          <div className="mb-6 pb-4 border-b border-[#EFE9DF] flex items-center justify-center">
            <div className="text-xs font-semibold text-[#1F1B18] uppercase tracking-wider">
              LOGIN
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* PASSWORD FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A6F64]">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMessage(null); }}
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] border border-[#EFE9DF] rounded-lg text-sm text-[#1F1B18] focus:outline-none focus:ring-2 focus:ring-[#2C2723] focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7A6F64] hover:text-[#1F1B18] cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="w-full py-3.5 px-4 bg-[#2C2723] text-[#FAF8F5] text-sm font-semibold rounded-lg hover:bg-[#1F1B18] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#E8DCC4]" />
              <span>LOGIN</span>
            </button>
          </form>
        </div>

        {/* Return to Public Website */}
        <div className="text-center mt-6">
          <button
            id="return-to-storefront"
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A6F64] hover:text-[#1F1B18] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public website storefront</span>
          </button>
        </div>

      </div>
    </div>
  );
};
