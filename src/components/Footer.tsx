import React, { useState } from 'react';
import { useApp, NavPage } from '../context/AppContext';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { ROUTE_PATHS } from '../utils/routes';
import { 
  Sparkles, 
  ArrowUpRight, 
  ShoppingBag, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  ShieldCheck, 
  Recycle, 
  Truck, 
  Award 
} from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal?: (type: 'privacy' | 'cookies' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const { 
    settings, 
    setCurrentPage, 
    openQuoteWithContext, 
    logEvent, 
    showToast 
  } = useApp();

  const handleNavClick = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    logEvent('newsletter_signup', newsletterEmail);
    setNewsletterSubmitted(true);
    showToast('Thank you for subscribing! You will receive our seasonal collection previews.');
  };

  const handleEtsyClick = () => {
    logEvent('etsy_click', 'Footer Etsy Shop Link');
    window.open(settings.etsyShopUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    logEvent('phone_click', settings.phone);
  };

  const handleEmailClick = () => {
    logEvent('email_click', settings.email);
  };

  return (
    <footer className="bg-[#1F1B18] text-[#FAF8F5] border-t border-[#3A332C] pt-16 pb-12">
      {/* Value Pillars / Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#332C26]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#2E2822] flex items-center justify-center shrink-0 text-[#E8DCC4]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#F5EFEB]">Artisan Handcrafted</h4>
              <p className="text-xs text-[#A89E93] mt-0.5 font-sans leading-relaxed">
                Small-batch production and traditional hand-tied techniques in our UK workshop.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#2E2822] flex items-center justify-center shrink-0 text-[#E8DCC4]">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#F5EFEB]">Sustainable & Preloved</h4>
              <p className="text-xs text-[#A89E93] mt-0.5 font-sans leading-relaxed">
                Restoring quality vintage frames rather than contributing to fast-furniture waste.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#2E2822] flex items-center justify-center shrink-0 text-[#E8DCC4]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#F5EFEB]">BS 5852 UK Safety</h4>
              <p className="text-xs text-[#A89E93] mt-0.5 font-sans leading-relaxed">
                Compliant with UK Furniture & Furnishings Fire Safety regulations.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#2E2822] flex items-center justify-center shrink-0 text-[#E8DCC4]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base text-[#F5EFEB]">Nationwide UK Delivery</h4>
              <p className="text-xs text-[#A89E93] mt-0.5 font-sans leading-relaxed">
                Tracked courier delivery for soft furnishings; specialist 2-man transport for seating.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            {(settings.footerLogoUrl || settings.logoUrl) ? (
              <a 
                href={ROUTE_PATHS['home']}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
                className="inline-block py-1 cursor-pointer"
              >
                <img
                  src={getDirectImageUrl(settings.footerLogoUrl || settings.logoUrl || '')}
                  alt={`${settings.businessName || 'Wedgbury'} Furnishings - Handmade British Furnishings & Bespoke Upholstery`}
                  className="h-12 sm:h-14 w-auto max-w-[200px] object-contain bg-transparent"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = getDriveFallbackUrl(settings.footerLogoUrl || settings.logoUrl || '');
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </a>
            ) : (
              <h3 className="font-serif text-2xl text-[#FAF8F5] tracking-tight">{settings.businessName}</h3>
            )}
            <p className="text-xs tracking-[0.2em] uppercase text-[#A89E93] font-sans">
              Handmade Furnishings & Bespoke Upholstery
            </p>
            <p className="text-sm text-[#BDB2A6] font-sans leading-relaxed pr-4">
              Creating small, carefully produced collections and breathing fresh life into preloved furniture through thoughtful craftsmanship and bespoke commissions.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a 
                href={`https://instagram.com/${settings.instagramHandle.replace('@', '')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2E2822] flex items-center justify-center text-[#E8DCC4] hover:bg-[#3D352E] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={handleEtsyClick}
                className="w-8 h-8 rounded-full bg-[#2E2822] flex items-center justify-center text-[#F1641E] hover:bg-[#3D352E] transition-colors cursor-pointer"
                title="Etsy Shop"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8DCC4]">Made to Order</h4>
            <ul className="space-y-2 text-sm text-[#BDB2A6]">
              <li>
                <a 
                  href={ROUTE_PATHS['made-to-order']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('made-to-order'); }} 
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
                  <span>Bespoke Silhouettes</span>
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['made-to-order']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('made-to-order'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Footstool Collection
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['made-to-order']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('made-to-order'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fluted Pouffes
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['made-to-order']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('made-to-order'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pet Chaise Lounges
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['shop']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('shop'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop (Ready to Ship)
                </a>
              </li>
            </ul>
          </div>

          {/* Services & Stories Column */}
          <div className="md:col-span-2 space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8DCC4]">Studio & Services</h4>
            <ul className="space-y-2 text-sm text-[#BDB2A6]">
              <li>
                <a 
                  href={ROUTE_PATHS['upholstery']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('upholstery'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bespoke Upholstery
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['portfolio']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Before & After Portfolio
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['about']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['faq']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs & Delivery
                </a>
              </li>
              <li>
                <a 
                  href={ROUTE_PATHS['contact']} 
                  onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Studio
                </a>
              </li>
              <li>
                <button onClick={() => openQuoteWithContext('Footer')} className="text-[#E8DCC4] hover:underline font-medium cursor-pointer">
                  Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Lead Capture Newsletter Column */}
          <div className="md:col-span-4 space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E8DCC4]">
              New Pieces. Small Collections.
            </h4>
            <p className="text-xs text-[#A89E93] leading-relaxed">
              Subscribe for private previews of new seasonal collections, one-off restored vintage chairs, and available workshop commission slots. No mass production, no spam.
            </p>
            {newsletterSubmitted ? (
              <div className="p-3 bg-[#2A241F] border border-[#453B31] rounded-md text-xs text-[#E8DCC4]">
                ✓ You're on the preview list! We will notify you when new unique pieces are released.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-[#2A241F] border border-[#453B31] text-xs text-[#FAF8F5] px-3 py-2.5 rounded-md focus:outline-none focus:border-[#D4AF37] grow placeholder:text-[#7A6F64]"
                  required
                />
                <button
                  type="submit"
                  className="px-3.5 py-2.5 bg-[#FAF8F5] text-[#1F1B18] text-xs font-semibold rounded-md hover:bg-[#E8DCC4] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}

            {/* Direct Contact Links */}
            <div className="pt-2 text-xs text-[#A89E93] space-y-1.5 font-sans">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E8DCC4]" />
                <a href={`mailto:${settings.email}`} onClick={handleEmailClick} className="hover:text-white">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E8DCC4]" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} onClick={handlePhoneClick} className="hover:text-white">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E8DCC4]" />
                <span>{settings.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Sole-Trader CMS & Copyright */}
        <div className="mt-14 pt-6 border-t border-[#2C2723] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7F73] font-sans gap-4">
          <p>© {new Date().getFullYear()} {settings.businessName} All rights reserved. Registered UK Sole Trader.</p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href={ROUTE_PATHS['privacy']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('privacy');
              }}
              className="hover:text-[#E8DCC4] transition-colors cursor-pointer"
            >
              Privacy Policy (UK GDPR)
            </a>
            <span>•</span>
            <a 
              href={ROUTE_PATHS['cookies']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('cookies');
              }}
              className="hover:text-[#E8DCC4] transition-colors cursor-pointer"
            >
              Cookie Policy
            </a>
            <span>•</span>
            <a 
              href={ROUTE_PATHS['terms']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('terms');
              }}
              className="hover:text-[#E8DCC4] transition-colors cursor-pointer"
            >
              Terms of Sale
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
