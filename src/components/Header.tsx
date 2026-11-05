import React, { useState } from 'react';
import { useApp, NavPage } from '../context/AppContext';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { ROUTE_PATHS } from '../utils/routes';
import { 
  ShoppingBag, 
  Sparkles, 
  Menu,
  X,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    settings,
    openQuoteWithContext 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE5DC] transition-all">
      {/* Top Announcement Bar (Configurable from Admin) */}
      {settings.showAnnouncement && settings.announcementText && (
        <div className="bg-[#2C2723] text-[#F3EFEA] text-xs md:text-sm py-2 px-4 text-center font-sans tracking-wide flex items-center justify-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          <span>{settings.announcementText}</span>
          <span className="hidden md:inline text-[#C5BCB2]">•</span>
          <a 
            href={ROUTE_PATHS['shop']}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('shop');
            }}
            className="hidden md:inline text-[#E8DCC4] underline underline-offset-2 hover:text-white transition-colors cursor-pointer text-xs font-medium"
          >
            Explore Collection
          </a>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#2C2723] hover:bg-[#EFE9DF] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo / Brand Name */}
          <a 
            id="header-brand-logo-container"
            href={ROUTE_PATHS['home']}
            className="flex items-center cursor-pointer group py-1" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            {settings.logoUrl ? (
              <div className="relative flex items-center justify-center shrink-0">
                <img
                  src={getDirectImageUrl(settings.logoUrl)}
                  alt={`${settings.businessName || 'Wedgbury'} Furnishings - Handmade British Furnishings & Bespoke Upholstery`}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[180px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = getDriveFallbackUrl(settings.logoUrl);
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-start">
                <span className="font-serif text-xl sm:text-2xl lg:text-[25px] tracking-tight text-[#1F1B18] font-medium group-hover:text-[#5E5248] transition-colors leading-tight">
                  {settings.businessName}
                </span>
                <span className="text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-[#7A6F64] font-sans">
                  Handmade & Bespoke Upholstery
                </span>
              </div>
            )}
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-sans font-medium text-[#4A4036]">
            <a
              href={ROUTE_PATHS['home']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className={`hover:text-[#1F1B18] transition-colors py-1 relative ${
                currentPage === 'home' ? 'text-[#1F1B18] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C2723]' : ''
              }`}
            >
              Home
            </a>
            <a
              href={ROUTE_PATHS['shop']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shop');
              }}
              className={`hover:text-[#1F1B18] transition-colors py-1 relative ${
                currentPage === 'shop' || currentPage === 'product-detail' ? 'text-[#1F1B18] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C2723]' : ''
              }`}
            >
              Shop
            </a>
            <a
              href={ROUTE_PATHS['about']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`hover:text-[#1F1B18] transition-colors py-1 relative ${
                currentPage === 'about' ? 'text-[#1F1B18] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C2723]' : ''
              }`}
            >
              Our Story
            </a>
            <a
              href={ROUTE_PATHS['upholstery']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('upholstery');
              }}
              className={`hover:text-[#1F1B18] transition-colors py-1 relative ${
                currentPage === 'upholstery' ? 'text-[#1F1B18] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C2723]' : ''
              }`}
            >
              Upholstery
            </a>
            <a
              href={ROUTE_PATHS['faq']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('faq');
              }}
              className={`hover:text-[#1F1B18] transition-colors py-1 relative ${
                currentPage === 'faq' ? 'text-[#1F1B18] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C2723]' : ''
              }`}
            >
              FAQ
            </a>
            <a
              href={ROUTE_PATHS['contact']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`hover:text-[#1F1B18] transition-colors py-1 relative ${
                currentPage === 'contact' ? 'text-[#1F1B18] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C2723]' : ''
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Desktop Right Action: Prominent Made to Order Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={ROUTE_PATHS['made-to-order']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('made-to-order');
              }}
              className={`px-5 py-2.5 rounded-md text-xs uppercase tracking-wider font-sans font-medium transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer ${
                currentPage === 'made-to-order'
                  ? 'bg-[#1F1B18] text-[#FAF8F5] ring-2 ring-[#8B6B48]'
                  : 'bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] hover:-translate-y-0.5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
              <span>Made to Order</span>
            </a>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={ROUTE_PATHS['shop']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shop');
              }}
              className="p-2 rounded-md text-[#2C2723] hover:bg-[#EFE9DF] transition-colors cursor-pointer"
              aria-label="Shop collection"
              title="Shop"
            >
              <ShoppingBag className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E0D7C9] px-6 pt-4 pb-8 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 text-base font-sans font-medium text-[#3A322B]">
            <a
              href={ROUTE_PATHS['home']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className={`text-left py-2 px-3 rounded-md transition-colors ${
                currentPage === 'home' ? 'bg-[#EFE9DF] text-[#1F1B18] font-semibold' : 'hover:bg-[#F3EFEA]'
              }`}
            >
              Home
            </a>
            <a
              href={ROUTE_PATHS['shop']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shop');
              }}
              className={`text-left py-2 px-3 rounded-md transition-colors ${
                currentPage === 'shop' || currentPage === 'product-detail' ? 'bg-[#EFE9DF] text-[#1F1B18] font-semibold' : 'hover:bg-[#F3EFEA]'
              }`}
            >
              Shop
            </a>
            <a
              href={ROUTE_PATHS['about']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`text-left py-2 px-3 rounded-md transition-colors ${
                currentPage === 'about' ? 'bg-[#EFE9DF] text-[#1F1B18] font-semibold' : 'hover:bg-[#F3EFEA]'
              }`}
            >
              Our Story
            </a>
            <a
              href={ROUTE_PATHS['upholstery']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('upholstery');
              }}
              className={`text-left py-2 px-3 rounded-md transition-colors ${
                currentPage === 'upholstery' ? 'bg-[#EFE9DF] text-[#1F1B18] font-semibold' : 'hover:bg-[#F3EFEA]'
              }`}
            >
              Upholstery
            </a>
            <a
              href={ROUTE_PATHS['faq']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('faq');
              }}
              className={`text-left py-2 px-3 rounded-md transition-colors ${
                currentPage === 'faq' ? 'bg-[#EFE9DF] text-[#1F1B18] font-semibold' : 'hover:bg-[#F3EFEA]'
              }`}
            >
              FAQ
            </a>
            <a
              href={ROUTE_PATHS['contact']}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`text-left py-2 px-3 rounded-md transition-colors ${
                currentPage === 'contact' ? 'bg-[#EFE9DF] text-[#1F1B18] font-semibold' : 'hover:bg-[#F3EFEA]'
              }`}
            >
              Contact
            </a>
          </nav>
          <div className="pt-4 border-t border-[#E8DCC4] space-y-3">
            <a
              href={ROUTE_PATHS['made-to-order']}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                handleNavClick('made-to-order');
              }}
              className="w-full py-3 bg-[#2C2723] text-[#FAF8F5] text-sm font-medium rounded-md flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:bg-[#1A1715]"
            >
              <Sparkles className="w-4 h-4 text-[#E8DCC4]" />
              <span>Made to Order</span>
            </a>
            <a
              href={ROUTE_PATHS['shop']}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                handleNavClick('shop');
              }}
              className="w-full py-3 bg-[#EFE9DF] text-[#2C2723] text-sm font-medium rounded-md flex items-center justify-center gap-2 border border-[#D9CFBF] cursor-pointer hover:bg-[#E5DDCF]"
            >
              <ShoppingBag className="w-4 h-4 text-[#8B6B48]" />
              <span>Shop the Collection</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteWithContext('Mobile Menu');
              }}
              className="w-full py-2.5 bg-[#EFE9DF] text-[#2C2723] text-sm font-medium rounded-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8B6B48]" />
              <span>Request an Upholstery Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
