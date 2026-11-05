import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROUTE_PATHS } from '../utils/routes';

interface CookieBannerProps {
  onOpenPrivacyModal?: (type: 'privacy' | 'cookies' | 'terms') => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacyModal }) => {
  const { setCurrentPage } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('artisan_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('artisan_cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('artisan_cookie_consent', 'essential_only');
    } catch {}
    setVisible(false);
  };

  const handleCookiePolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage('cookies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onOpenPrivacyModal) {
      onOpenPrivacyModal('cookies');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-[#FAF8F5] border border-[#D9CFBF] p-4 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 font-sans text-xs text-[#4A4036]">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#EFE9DF] flex items-center justify-center shrink-0 text-[#2C2723]">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="space-y-2">
          <p className="leading-relaxed">
            We use cookies and local storage to give you the best experience, remember quote submissions, and understand how our collection is viewed.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] font-medium rounded text-xs transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 bg-[#EFE9DF] hover:bg-[#E2D8C9] text-[#2C2723] font-medium rounded text-xs transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <a
              href={ROUTE_PATHS['cookies']}
              onClick={handleCookiePolicyClick}
              className="text-[#7A6F64] hover:text-[#1F1B18] underline ml-1 text-xs cursor-pointer"
            >
              Cookie Policy
            </a>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="text-[#9C9185] hover:text-[#2C2723] p-0.5 cursor-pointer"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
