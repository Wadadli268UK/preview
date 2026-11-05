import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { initialProducts } from '../data/mockData';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Edit3
} from 'lucide-react';

interface PastUpholsteryCarouselProps {
  className?: string;
  isDarkTheme?: boolean;
  showPrice?: boolean;
}

export const PastUpholsteryCarousel: React.FC<PastUpholsteryCarouselProps> = ({ 
  className = '',
  isDarkTheme,
  showPrice = false
}) => {
  const { 
    products, 
    settings, 
    navigateToProduct, 
    openQuoteWithContext, 
    isAdminAuthenticated, 
    setCurrentPage 
  } = useApp();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'seating' | 'footstools' | 'bespoke'>('all');

  // Determine dark vs light color scheme: default to dark (matches Upholstery section #241F1C)
  const isDark = isDarkTheme !== undefined ? isDarkTheme : (settings.pastUpholsteryBgColor !== 'cream' && settings.pastUpholsteryBgColor !== 'linen');

  // Filter products for the past upholstery carousel:
  // Strictly includes all products that are added to the Past Upholstery Carousel in the admin dashboard (isPastUpholstery: true)
  // With robust fallback to ensure it is always populated on mobile view and initial load
  const pastProducts = React.useMemo(() => {
    let list = products.filter((p) => Boolean(p.isPastUpholstery));

    // Fallback: If current products list has no isPastUpholstery items (e.g. stale client localStorage or slow sync),
    // retrieve past upholstery items from initialProducts or restoration/sold archives
    if (list.length === 0) {
      list = initialProducts.filter((p) => Boolean(p.isPastUpholstery));
    }
    if (list.length === 0) {
      list = products.filter((p) => 
        p.category === 'preloved_restored' || 
        p.category === 'occasional_seating' ||
        p.availability === 'sold' || 
        p.availability === 'one_of_one'
      );
    }
    if (list.length === 0) {
      list = initialProducts.slice(0, 5);
    }

    if (selectedFilter === 'seating') {
      const filtered = list.filter((p) => 
        p.category === 'preloved_restored' || 
        p.category === 'occasional_seating' || 
        p.title.toLowerCase().includes('chair') || 
        p.title.toLowerCase().includes('chaise') || 
        p.title.toLowerCase().includes('armchair') ||
        p.title.toLowerCase().includes('slipper')
      );
      return filtered.length > 0 ? filtered : list;
    }
    if (selectedFilter === 'footstools') {
      const filtered = list.filter((p) => 
        p.category === 'footstools' || 
        p.category === 'pouffes' || 
        p.title.toLowerCase().includes('footstool') || 
        p.title.toLowerCase().includes('pouffe') || 
        p.title.toLowerCase().includes('bench') ||
        p.title.toLowerCase().includes('collection') ||
        p.title.toLowerCase().includes('stool')
      );
      return filtered.length > 0 ? filtered : list;
    }
    if (selectedFilter === 'bespoke') {
      const filtered = list.filter((p) => 
        p.availability === 'sold' || 
        p.availability === 'one_of_one' ||
        p.title.toLowerCase().includes('restoration') ||
        Boolean(p.isPastUpholstery)
      );
      return filtered.length > 0 ? filtered : list;
    }

    return list;
  }, [products, selectedFilter]);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [pastProducts]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = 340;
    const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const headingText = settings.pastUpholsteryHeading || 'Past Upholstery & Bespoke Restorations';
  const subheadingText = settings.pastUpholsterySubheading || 'A curated archive of bespoke commissions, one-of-a-kind vintage transformations, and handcrafted heritage seating from our studio.';

  return (
    <div className={`w-full ${className}`}>
      
      {/* Optional Featured Showcase Banner Image */}
      {settings.pastUpholsteryImageUrl && (
        <div className={`mb-6 rounded-2xl overflow-hidden border shadow-md w-full max-h-64 sm:max-h-80 aspect-16/9 sm:aspect-21/9 ${
          isDark ? 'border-[#3E342B] bg-[#2C2723]' : 'border-[#D9CFBF] bg-[#EFE9DF]'
        }`}>
          <img
            src={getDirectImageUrl(settings.pastUpholsteryImageUrl)}
            alt={headingText}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const fallback = getDriveFallbackUrl(settings.pastUpholsteryImageUrl || '');
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              }
            }}
          />
        </div>
      )}

      {/* Header and Controls */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${
        isDark ? 'border-[#3E342B]' : 'border-[#D9CFBF]'
      }`}>
        <div className="space-y-3 max-w-2xl">
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight ${
            isDark ? 'text-[#FAF8F5]' : 'text-[#1F1B18]'
          }`}>
            {headingText}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed font-light ${
            isDark ? 'text-[#EFE9DF]' : 'text-[#38302a]'
          }`}>
            {subheadingText}
          </p>
        </div>

        {/* Action Controls & Scroll Arrows */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 w-full md:w-auto">
          {isAdminAuthenticated && (
            <button
              onClick={() => {
                setCurrentPage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer shadow-2xs ${
                isDark 
                  ? 'bg-[#38302A] hover:bg-[#4A3F37] text-[#E8DCC4] hover:text-[#FAF8F5] border-[#4A3F37]' 
                  : 'bg-[#FAF8F5] hover:bg-white text-[#2C2723] border-[#D9CFBF]'
              }`}
              title="Open Admin to update past upholstery products"
            >
              <Edit3 className={`w-3.5 h-3.5 ${isDark ? 'text-[#E8DCC4]' : 'text-[#8B6B48]'}`} />
              <span>Update in Admin</span>
            </button>
          )}

          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border transition-all cursor-pointer shadow-sm ${
                canScrollLeft 
                  ? 'bg-[#38302a] text-[#FAF8F5] border-[#38302a] hover:bg-[#25201c] hover:border-[#25201c] hover:scale-105 active:scale-95 hover:shadow-md' 
                  : 'bg-[#38302a]/50 text-[#FAF8F5]/40 border-[#38302a]/30 cursor-not-allowed opacity-50 shadow-none'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-[#FAF8F5] stroke-[2.25]" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border transition-all cursor-pointer shadow-sm ${
                canScrollRight 
                  ? 'bg-[#38302a] text-[#FAF8F5] border-[#38302a] hover:bg-[#25201c] hover:border-[#25201c] hover:scale-105 active:scale-95 hover:shadow-md' 
                  : 'bg-[#38302a]/50 text-[#FAF8F5]/40 border-[#38302a]/30 cursor-not-allowed opacity-50 shadow-none'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-[#FAF8F5] stroke-[2.25]" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 pt-6 pb-2 overflow-x-auto no-scrollbar touch-pan-x">
        <span className={`text-[11px] font-medium uppercase tracking-wider shrink-0 mr-1 ${
          isDark ? 'text-[#A89E93]' : 'text-[#7A6F64]'
        }`}>Filter Archive:</span>
        {[
          { id: 'all', label: 'All Past Pieces' },
          { id: 'seating', label: 'Armchairs & Seating' },
          { id: 'footstools', label: 'Footstools & Pouffes' },
          { id: 'bespoke', label: 'Sold & Commissions' }
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setSelectedFilter(chip.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              isDark
                ? selectedFilter === chip.id
                  ? 'bg-[#E8DCC4] text-[#1F1B18] font-semibold shadow-xs'
                  : 'bg-[#38302A] text-[#D0C5B4] hover:bg-[#4A3F37] hover:text-white border border-[#4A3F37]'
                : selectedFilter === chip.id
                  ? 'bg-[#2C2723] text-[#FAF8F5] font-semibold shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5E5248] hover:bg-white border border-[#D0C5B4]'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex items-center justify-between pt-2 pb-1 sm:hidden">
        <span className={`text-[11px] font-medium tracking-wide flex items-center gap-1.5 ${isDark ? 'text-[#D0C5B4]' : 'text-[#7A6F64]'}`}>
          <span>Swipe to explore past pieces</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </span>
        <span className={`text-[11px] font-mono ${isDark ? 'text-[#E8DCC4]' : 'text-[#5E5248]'}`}>
          {pastProducts.length} pieces
        </span>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-3 pb-5 no-scrollbar w-full touch-pan-x"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {pastProducts.map((product) => {
          const displayImage = product.images?.[0] || 'https://images.unsplash.com/photo-1580481077195-c3a8245559a1?auto=format&fit=crop&w=1000&q=80';

          return (
            <div
              key={product.id}
              className={`w-[84vw] max-w-[320px] sm:w-[320px] sm:max-w-[340px] shrink-0 snap-start rounded-xl overflow-hidden transition-all duration-300 flex flex-col group ${
                isDark 
                  ? 'bg-[#FAF8F5] text-[#2C2723] border border-[#3E342B]/40 shadow-xl hover:shadow-2xl hover:-translate-y-1' 
                  : 'bg-white text-[#2C2723] border border-[#D9CFBF] shadow-xs hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Image Container */}
              <div 
                className="relative aspect-4/3 bg-[#EFE9DF] overflow-hidden cursor-pointer"
                onClick={() => navigateToProduct(product)}
              >
                <img
                  src={getDirectImageUrl(displayImage)}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = getDriveFallbackUrl(displayImage);
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />

                {/* Price / Value Pill */}
                {showPrice && product.price > 0 && (
                  <div className="absolute bottom-3 right-3 bg-[#FAF8F5]/95 text-[#1F1B18] px-2.5 py-1 rounded text-xs font-serif font-semibold shadow-xs">
                    {product.currency}{product.price}
                  </div>
                )}
              </div>

              {/* Card Information Body */}
              <div className="p-5 flex flex-col grow justify-between space-y-4">
                <div className="space-y-2">
                  <h3 
                    onClick={() => navigateToProduct(product)}
                    className="font-serif text-lg text-[#1F1B18] font-medium leading-snug group-hover:text-[#8B6B48] transition-colors cursor-pointer"
                  >
                    {product.title}
                  </h3>

                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => openQuoteWithContext(`Commission similar to "${product.title}"`)}
                    className="grow py-2.5 px-3 bg-[#241F1C] hover:bg-[#1A1614] text-[#FAF8F5] hover:text-[#E8DCC4] text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
                    <span>Enquire to Recreate</span>
                  </button>
                  <button
                    onClick={() => navigateToProduct(product)}
                    className="p-2.5 bg-[#EFE9DF] hover:bg-[#E2D8C9] text-[#2C2723] rounded-md transition-colors cursor-pointer"
                    title="View details & full specifications"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Callout inside Carousel Section */}
      <div className={`mt-8 pt-6 border-t flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs ${
        isDark 
          ? 'border-[#3E342B] text-[#D0C5B4]' 
          : 'border-[#D9CFBF] text-[#2C2723]'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#E8DCC4]' : 'text-[#8B6B48]'}`} />
            <span>Have a vintage frame or chair you'd like transformed? We offer bespoke upholstery commissions across the UK.</span>
          </div>
          <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs pl-6.5 font-light ${
            isDark ? 'text-[#E8DCC4]' : 'text-[#7A6F64]'
          }`}>
            <span>Handmade in Small Collections •</span>
            <span>One-of-a-Kind Pieces •</span>
            <span>British & European Luxury Fabrics</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openQuoteWithContext('Past Upholstery Carousel Bottom')}
            className={`text-xs font-medium underline underline-offset-4 cursor-pointer transition-colors ${
              isDark ? 'text-[#E8DCC4] hover:text-white' : 'text-[#1F1B18] hover:text-[#8B6B48]'
            }`}
          >
            Start an Upholstery Enquiry →
          </button>
        </div>
      </div>
    </div>
  );
};
