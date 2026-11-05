import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'cookies' | 'terms';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const { settings } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E0D7C9] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#2C2723] text-[#FAF8F5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#E8DCC4]" />
            <h3 className="font-serif text-lg text-[#FAF8F5]">
              {type === 'privacy' && 'Privacy Policy & Data Protection (UK GDPR)'}
              {type === 'cookies' && 'Cookie Policy'}
              {type === 'terms' && 'Terms of Sale & Bespoke Commission Terms'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#A89E93] hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto font-sans text-xs sm:text-sm text-[#4A4036] space-y-4 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p>
                <strong>1. Overview:</strong> {settings.businessName} is operated by {settings.artisanName} as a sole trader registered in the United Kingdom. We take your privacy seriously and are committed to complying with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
              </p>
              <p>
                <strong>2. Information We Collect:</strong> When you request an upholstery quotation, submit a contact form, or subscribe to our collection preview list, we collect your name, email address, telephone number, postal town/postcode, and any customer-uploaded furniture photographs.
              </p>
              <p>
                <strong>3. How We Use Customer Photographs:</strong> Any photographs of chairs, sofas, or furnishings uploaded via our quote form are used strictly to assess frame condition, estimate work requirements, and calculate fabric meterage. We never publish customer furniture photos without prior written consent.
              </p>
              <p>
                <strong>4. Marketplace Transactions:</strong> For product purchases made through Etsy, payment processing and billing information are handled directly and securely by Etsy Ireland UC / Etsy Inc. under their respective privacy policies.
              </p>
              <p>
                <strong>5. Data Retention & Your Rights:</strong> You have the right to request access to, correction of, or deletion of your personal contact data at any time by contacting us at <strong>{settings.email}</strong>.
              </p>
            </>
          )}

          {type === 'cookies' && (
            <>
              <p>
                <strong>1. What are Cookies?</strong> Cookies are small text files placed on your device to make web applications function efficiently and provide conversion analytics.
              </p>
              <p>
                <strong>2. Essential Storage:</strong> We use local browser storage to remember your quote form progress, saved website preferences, and demonstrator data.
              </p>
              <p>
                <strong>3. Analytics:</strong> We use privacy-friendly client-side event tracking to measure quote form completion rates, telephone link clicks, and product views to refine our user experience.
              </p>
              <p>
                <strong>4. Managing Cookies:</strong> You can modify your browser settings to decline non-essential cookies at any time.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>1. Handmade Furnishings:</strong> All handmade footstools, cushions, and pouffes are individually produced in our UK workshop. Minor natural variations in wood grain and fabric texture celebrate authentic handcraftsmanship.
              </p>
              <p>
                <strong>2. Preloved & Restored Furniture:</strong> One-off vintage pieces are sold in sound, fully restored structural condition. Vintage character in original timber framework is preserved and detailed in listings.
              </p>
              <p>
                <strong>3. Bespoke Reupholstery Commissions:</strong> Formal quotations remain valid for 30 days. A 50% deposit confirms your commission slot, with the balance due upon completion prior to delivery.
              </p>
              <p>
                <strong>4. UK Fire Safety Compliance (BS 5852):</strong> All materials, domestic foams, and fabrics supplied by {settings.businessName} comply with the UK Furniture and Furnishings (Fire Safety) Regulations 1988 (as amended).
              </p>
              <p>
                <strong>5. Cancellation & Returns:</strong> Under UK Consumer Contracts Regulations, made-to-order bespoke upholstery pieces tailored to custom specifications are non-refundable once work has commenced.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F5] px-6 py-4 border-t border-[#E0D7C9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
