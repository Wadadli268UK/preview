import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cookie, 
  ShieldCheck, 
  Settings2, 
  Info, 
  ArrowLeft, 
  Calendar, 
  Check, 
  Trash2,
  RefreshCw
} from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  const { settings, setCurrentPage, showToast } = useApp();
  const lastUpdated = '1 September 2026';
  const [currentConsent, setCurrentConsent] = useState<string>('unknown');

  useEffect(() => {
    const consent = localStorage.getItem('artisan_cookie_consent') || 'not_set';
    setCurrentConsent(consent);
  }, []);

  const handleUpdateConsent = (preference: 'accepted' | 'essential_only') => {
    try {
      localStorage.setItem('artisan_cookie_consent', preference);
    } catch {}
    setCurrentConsent(preference);
    showToast(
      preference === 'accepted' 
        ? 'Preferences saved: All cookies and local storage enabled.' 
        : 'Preferences saved: Essential-only storage enabled.',
      'info'
    );
  };

  const handleResetConsent = () => {
    try {
      localStorage.removeItem('artisan_cookie_consent');
    } catch {}
    setCurrentConsent('not_set');
    showToast('Cookie preferences reset. The consent banner will reappear on reload.', 'info');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#2C2723] text-[#FAF8F5] pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#3E3731]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#A89E93] hover:text-[#E8DCC4] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-[#6B5F54]">•</span>
            <span className="text-xs text-[#E8DCC4] font-medium tracking-wider uppercase">Legal & Compliance</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-tight">
                Cookie Policy
              </h1>
              <p className="text-sm text-[#BDB2A6] mt-2 max-w-2xl font-sans leading-relaxed">
                Information on how {settings.businessName} uses cookies, local browser storage, and related technologies on our craft studio website in accordance with UK PECR and UK GDPR.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#38312B] border border-[#4D443C] text-xs text-[#E8DCC4]">
              <Calendar className="w-4 h-4 text-[#C4A872]" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Interactive Consent Management Box */}
        <div className="bg-[#F3EDE2] border border-[#DECDB7] rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#2C2723] text-[#E8DCC4] flex items-center justify-center shrink-0">
              <Settings2 className="w-5 h-5" />
            </div>
            <div className="grow">
              <h2 className="font-serif text-lg text-[#2C2723] font-medium">
                Your Current Cookie Settings
              </h2>
              <p className="text-xs sm:text-sm text-[#5E5248] mt-1 leading-relaxed">
                Current status:{' '}
                <strong className="text-[#1F1B18] uppercase tracking-wider text-xs">
                  {currentConsent === 'accepted' && 'All Cookies & Local Storage Allowed'}
                  {currentConsent === 'essential_only' && 'Essential Storage Only (Non-essential blocked)'}
                  {currentConsent === 'not_set' && 'Not Yet Selected (Default banner shown)'}
                </strong>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleUpdateConsent('accepted')}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentConsent === 'accepted'
                      ? 'bg-[#2C2723] text-[#FAF8F5]'
                      : 'bg-white border border-[#DECDB7] text-[#2C2723] hover:bg-[#EAE1D2]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Accept All Cookies</span>
                </button>
                <button
                  onClick={() => handleUpdateConsent('essential_only')}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentConsent === 'essential_only'
                      ? 'bg-[#2C2723] text-[#FAF8F5]'
                      : 'bg-white border border-[#DECDB7] text-[#2C2723] hover:bg-[#EAE1D2]'
                  }`}
                >
                  <span>Essential Only</span>
                </button>
                <button
                  onClick={handleResetConsent}
                  className="px-3 py-2 text-xs text-[#7A6F64] hover:text-[#2C2723] transition-colors cursor-pointer flex items-center gap-1"
                  title="Reset your preference to default"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Consent Banner</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10 font-sans text-sm text-[#4A4036] leading-relaxed">
          
          {/* Section 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">1</span>
              What are Cookies & Local Browser Storage?
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                Cookies are small text files placed on your computer or mobile device when you visit a website. Modern web applications also use <strong>HTML5 LocalStorage</strong> and <strong>SessionStorage</strong> to store user preferences and improve browsing efficiency.
              </p>
              <p>
                At {settings.businessName}, we maintain a lightweight, privacy-focused website. We do not use intrusive cross-site advertising trackers or sell browsing data to data brokers.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">2</span>
              Categories of Cookies & Storage We Use
            </h2>
            <div className="mt-4 space-y-4">
              
              {/* Category A: Strictly Necessary */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base text-[#1F1B18] font-semibold">
                    1. Strictly Necessary (Essential Storage)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2C2723] text-[#FAF8F5] text-[10px] uppercase font-semibold">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-[#5E5248]">
                  These items are essential to provide you with basic website functions, session security, and access control. They cannot be turned off in our systems.
                </p>
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E0D7C9] text-[#7A6F64]">
                        <th className="py-1.5 font-medium">Key Name</th>
                        <th className="py-1.5 font-medium">Type</th>
                        <th className="py-1.5 font-medium">Purpose</th>
                        <th className="py-1.5 font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE9DF] text-[#4A4036]">
                      <tr>
                        <td className="py-1.5 font-mono text-[11px]">artisan_cookie_consent</td>
                        <td className="py-1.5">LocalStorage</td>
                        <td className="py-1.5">Stores your cookie consent preference</td>
                        <td className="py-1.5">12 months</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-mono text-[11px]">artisan_admin_auth</td>
                        <td className="py-1.5">LocalStorage</td>
                        <td className="py-1.5">Sole-trader CMS authentication status</td>
                        <td className="py-1.5">Session / Persistent</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category B: Functional & Form Drafts */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base text-[#1F1B18] font-semibold">
                    2. Functional & Quote Calculator Storage
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EFE9DF] text-[#2C2723] text-[10px] uppercase font-semibold">
                    Functional
                  </span>
                </div>
                <p className="text-xs text-[#5E5248]">
                  Used to save in-progress upholstery estimate submissions and customer input so you do not lose your measurements or fabric selections if you refresh the page.
                </p>
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E0D7C9] text-[#7A6F64]">
                        <th className="py-1.5 font-medium">Key Name</th>
                        <th className="py-1.5 font-medium">Type</th>
                        <th className="py-1.5 font-medium">Purpose</th>
                        <th className="py-1.5 font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE9DF] text-[#4A4036]">
                      <tr>
                        <td className="py-1.5 font-mono text-[11px]">wedgbury_quote_draft</td>
                        <td className="py-1.5">LocalStorage</td>
                        <td className="py-1.5">Preserves quote calculator form inputs</td>
                        <td className="py-1.5">30 days</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-mono text-[11px]">wedgbury_settings_cache</td>
                        <td className="py-1.5">LocalStorage</td>
                        <td className="py-1.5">Caches workshop opening hours and contacts</td>
                        <td className="py-1.5">7 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category C: Performance & Conversion Analytics */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base text-[#1F1B18] font-semibold">
                    3. Privacy-Friendly Performance Analytics
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EFE9DF] text-[#2C2723] text-[10px] uppercase font-semibold">
                    Optional
                  </span>
                </div>
                <p className="text-xs text-[#5E5248]">
                  Measures aggregated and anonymous interactions such as how many visitors view our made-to-order catalog, request an upholstery quotation, or click through to our verified Etsy store. No personal identity profiling or cross-site tracking takes place.
                </p>
              </div>

            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">3</span>
              Third-Party Cookies & Outbound Marketplace Links
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                When you click outbound links to our verified store on <strong>Etsy</strong>, or view images hosted on content delivery networks:
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-[#5E5248]">
                <li><strong>Etsy Marketplace:</strong> Navigating to etsy.com will subject your session to Etsy's separate cookie policy and checkout mechanisms.</li>
                <li><strong>Google Fonts / CDN:</strong> Standard typography and CDN assets are loaded securely without user tracking cookies.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">4</span>
              How to Control or Disable Cookies in Your Browser
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                In addition to our interactive consent tool above, you can restrict or block cookies through your web browser settings. Please note that disabling essential cookies may impact your ability to submit quote forms or access specific features.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5E5248] pt-1">
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF]">
                  <strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF]">
                  <strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF]">
                  <strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF]">
                  <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Navigation Buttons */}
        <div className="mt-12 pt-8 border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentPage('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFE9DF] text-[#2C2723] text-xs font-medium rounded-lg hover:bg-[#E2D8C9] transition-colors cursor-pointer"
            >
              ← View Privacy Policy (UK GDPR)
            </button>
            <button
              onClick={() => {
                setCurrentPage('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFE9DF] text-[#2C2723] text-xs font-medium rounded-lg hover:bg-[#E2D8C9] transition-colors cursor-pointer"
            >
              View Terms of Sale →
            </button>
          </div>
          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-lg hover:bg-[#1A1715] transition-colors cursor-pointer"
          >
            Contact Studio
          </button>
        </div>

      </div>
    </div>
  );
};
