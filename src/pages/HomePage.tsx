import React from 'react';
import { useApp } from '../context/AppContext';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { isProductActive } from '../utils/productUtils';
import { PastUpholsteryCarousel } from '../components/PastUpholsteryCarousel';
import { 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  ExternalLink, 
  Check, 
  Layers, 
  Palette, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  Star,
  Scissors
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    madeToOrderProducts,
    portfolioProjects, 
    settings, 
    setCurrentPage, 
    navigateToProduct, 
    openQuoteWithContext, 
    logEvent 
  } = useApp();

  const activeMadeToOrder = madeToOrderProducts.filter((p) => p.isActive !== false);

  const readyToShipProducts = products
    .filter((p) => p.featured && isProductActive(p) && !p.isPastUpholstery)
    .slice(0, 4);

  const handleEtsyShopClick = () => {
    logEvent('etsy_click', 'Homepage Hero Etsy Button');
    window.open(settings.etsyShopUrl || 'https://wedgburyfurnishings.etsy.com/', '_blank', 'noopener,noreferrer');
  };

  const handleProductEtsyClick = (e: React.MouseEvent, p: typeof products[0]) => {
    e.stopPropagation();
    logEvent('etsy_click', `Product Card Etsy: ${p.title}`, { id: p.id, price: p.price });
    window.open(p.marketplaceUrl || settings.etsyShopUrl || 'https://wedgburyfurnishings.etsy.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 font-sans text-[#2C2723]">
      
      {/* 1. HERO SECTION (Repositioned: Made-to-Order First) */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#FAF8F5] overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column - Editorial Headline & Made-to-Order CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1B18] font-normal leading-[1.12] tracking-tight">
              {settings.heroHeading && settings.heroHeading.includes('Bespoke Made-to-Order') ? settings.heroHeading : 'Bespoke Made-to-Order Furnishings, tailored to your home.'}
            </h1>

            <p className="text-base sm:text-lg text-[#5E5248] leading-relaxed max-w-xl font-light">
              {settings.heroSubheading || 'Handcrafted individually in our British studio. Customise signature footstools, fluted pouffes, deep ottomans, and pet chaise lounges in your choice of luxury textiles, timber finishes, and exact dimensions.'}
            </p>

            {/* High-Intent CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => {
                  setCurrentPage('made-to-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium rounded-md shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
                <span>Explore Made to Order</span>
              </button>

              <button
                onClick={() => openQuoteWithContext('Homepage Hero Custom Silhouette')}
                className="px-7 py-3.5 bg-[#FAF8F5] hover:bg-[#EFE9DF] text-[#2C2723] text-xs uppercase tracking-wider font-medium rounded-md border border-[#D9CFBF] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discuss a Custom Silhouette</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8B6B48]" />
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#5E5248]">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[#8B6B48]" /> Tailored Sizing & Dimensions
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[#8B6B48]" /> British Wool, Bouclé & Velvet
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-[#8B6B48]" /> Handcrafted in the UK (3–4 wks)
              </span>
            </div>
          </div>

          {/* Right Column - Hero Lifestyle Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Lifestyle Hero Photo */}
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border border-[#E0D7C9] bg-[#EFE9DF]">
                <img
                  src={getDirectImageUrl(settings.heroBannerUrl || 'https://drive.google.com/file/d/1J9Y-T07uS_YjPFfzJsqBPVrn52OK0OWE/view?usp=sharing')}
                  alt="Handcrafted made-to-order artisan furnishings and bespoke seating by Wedgbury"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = getDriveFallbackUrl(settings.heroBannerUrl || 'https://drive.google.com/file/d/1J9Y-T07uS_YjPFfzJsqBPVrn52OK0OWE/view?usp=sharing');
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>

              {/* Floating Quality Callout */}
              <div className="absolute -bottom-6 left-2 sm:-left-8 bg-[#FAF8F5]/95 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-[#D9CFBF] shadow-xl max-w-[260px] sm:max-w-xs space-y-1">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#1F1B18]">"Tailored to our living room dimensions."</p>
                <p className="text-[11px] text-[#7A6F64]">Bespoke footstools, fluted pouffes & deep ottomans.</p>
              </div>

              {/* Top Right Label Badge */}
              <div className="hidden sm:block absolute -top-4 -right-4 sm:-right-6 bg-[#2C2723] text-[#FAF8F5] p-4 rounded-lg shadow-lg text-xs space-y-0.5">
                <span className="text-[10px] tracking-widest uppercase text-[#E8DCC4] block">Made to Order</span>
                <span className="font-serif text-sm font-medium">Lead Time: 3–4 Weeks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE MADE-TO-ORDER SILHOUETTES (Primary Elevated Catalog) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-[#E8DCC4] gap-4">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#8B6B48] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B6B48]" />
              <span>Workshop Models</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] mt-1">
              Signature Made-to-Order Silhouettes
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5248] font-sans mt-1 max-w-2xl font-light">
              Choose from our established handcrafted furniture forms. Each piece is built from scratch upon ordering with your chosen dimensions, textile mill, and timber legs.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('made-to-order');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-medium text-[#2C2723] hover:text-[#5E5248] inline-flex items-center gap-1.5 underline underline-offset-4 shrink-0"
          >
            <span>Explore All Silhouettes & Finishes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Silhouette Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeMadeToOrder.map((product) => (
            <div
              key={product.id}
              className="group bg-[#FAF8F5] rounded-xl border border-[#E0D7C9] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Silhouette Image */}
                <div className="relative aspect-4/3 bg-[#EFE9DF] overflow-hidden">
                  <img
                    src={getDirectImageUrl(product.imageUrl)}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallback = '/images/made_to_order_hero.png';
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-[#1F1B18]/85 text-[#FAF8F5] backdrop-blur-xs">
                      {product.category || 'Made to Order'}
                    </span>
                  </div>

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-3 right-3 bg-[#FAF8F5]/95 backdrop-blur-xs border border-[#D9CFBF] px-2.5 py-1 rounded text-xs font-serif font-medium text-[#1F1B18]">
                    {product.startingPrice || 'From £295'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-[#8B6B48] uppercase block">
                      {product.productCode}
                    </span>
                    <h3 className="font-serif text-lg text-[#1F1B18] font-normal group-hover:text-[#5E5248] transition-colors mt-0.5">
                      {product.productName}
                    </h3>
                  </div>

                  <p className="text-xs text-[#5E5248] line-clamp-2 leading-relaxed font-light">
                    {product.productDescription}
                  </p>

                  <div className="pt-2 border-t border-[#EAE3D5] space-y-1.5 text-[11px] text-[#5E5248]">
                    <div className="flex items-start gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-[#8B6B48] shrink-0 mt-0.5" />
                      <span className="line-clamp-1"><strong className="text-[#1F1B18]">Size:</strong> {product.size}</span>
                    </div>
                    {product.legOptions && (
                      <div className="flex items-start gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#8B6B48] shrink-0 mt-0.5" />
                        <span className="line-clamp-1"><strong className="text-[#1F1B18]">Legs:</strong> {product.legOptions}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => openQuoteWithContext(`Made to Order: ${product.productName} (${product.productCode}) - Size: ${product.size}`)}
                  className="w-full py-2.5 px-3 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 shadow-2xs hover:shadow cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
                  <span>Customise & Enquire</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('made-to-order');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-1.5 text-[11px] text-[#7A6F64] hover:text-[#1F1B18] transition-colors text-center cursor-pointer"
                >
                  View Details & Fabric Options →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Dimensions Alcove / Bay Callout Banner */}
        <div className="bg-[#EFE9DF] border border-[#D9CFBF] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#8B6B48] font-semibold flex items-center gap-1 justify-center md:justify-start">
              <Ruler className="w-3.5 h-3.5" />
              <span>Custom Scale & Built-to-Fit</span>
            </span>
            <h3 className="font-serif text-2xl text-[#1F1B18]">
              Need exact bespoke dimensions for an alcove, bay window, or bed-end?
            </h3>
            <p className="text-xs sm:text-sm text-[#5E5248] max-w-2xl font-light">
              We tailor frame lengths, depths, and heights down to the centimeter, and can source any designer textile or work with your own fabric (COM).
            </p>
          </div>
          <button
            onClick={() => openQuoteWithContext('Custom Sizing Alcove/Bay Request')}
            className="px-6 py-3 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium rounded-md shrink-0 flex items-center gap-2 cursor-pointer transition-all hover:shadow"
          >
            <span>Request Custom Sizing</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8DCC4]" />
          </button>
        </div>
      </section>

      {/* 3. HOW MADE-TO-ORDER WORKS (3-Step Guided Process) */}
      <section className="bg-[#FAF8F5] border-y border-[#E8DCC4] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs tracking-[0.2em] uppercase text-[#8B6B48] font-medium">The Bespoke Process</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">How Made to Order Works</h2>
            <p className="text-xs sm:text-sm text-[#5E5248] font-light">
              From initial room measurements to unhurried workshop crafting, creating your piece is personal and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl p-6 sm:p-8 space-y-4 relative">
              <div className="w-10 h-10 rounded-full bg-[#2C2723] text-[#FAF8F5] flex items-center justify-center font-serif text-lg">
                1
              </div>
              <h3 className="font-serif text-xl text-[#1F1B18]">Choose Silhouette & Scale</h3>
              <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed font-light">
                Select one of our signature handcrafted silhouettes or provide your exact room dimensions. We adjust frame heights, widths, and profiles to complement your existing furnishings.
              </p>
              <div className="pt-2 text-xs text-[#8B6B48] font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Footstools, pouffes, benches & pet chaises
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl p-6 sm:p-8 space-y-4 relative">
              <div className="w-10 h-10 rounded-full bg-[#2C2723] text-[#FAF8F5] flex items-center justify-center font-serif text-lg">
                2
              </div>
              <h3 className="font-serif text-xl text-[#1F1B18]">Select Fabric & Timber</h3>
              <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed font-light">
                Browse our curated textile archive: Abraham Moon Yorkshire wools, Belgian flax linens, Designers Guild velvets, or FibreGuard pet-friendly bouclés. Paired with hand-turned oak, walnut, or brass.
              </p>
              <div className="pt-2 text-xs text-[#8B6B48] font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Complimentary swatches dispatched to your home
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl p-6 sm:p-8 space-y-4 relative">
              <div className="w-10 h-10 rounded-full bg-[#2C2723] text-[#FAF8F5] flex items-center justify-center font-serif text-lg">
                3
              </div>
              <h3 className="font-serif text-xl text-[#1F1B18]">Handcrafted & Delivered</h3>
              <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed font-light">
                Your piece is constructed individually in our UK workshop with traditional webbing, dense resilient core fillings, and hand-stitched detailing. Safely dispatched within 3–4 weeks.
              </p>
              <div className="pt-2 text-xs text-[#8B6B48] font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Tracked UK courier or specialist furniture delivery
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => openQuoteWithContext('Made to Order 3-Step Process')}
              className="px-8 py-3.5 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium rounded-md shadow-sm transition-all hover:shadow hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
              <span>Start Your Made-to-Order Piece</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. CURATED TEXTILES & TIMBER FINISHES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[#8B6B48] font-medium">Textile Sourcing</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] font-normal leading-tight">
              Curated British & European Fabrics
            </h2>
            <p className="text-base text-[#5E5248] leading-relaxed font-light">
              The textile defines how your furniture lives in your space. We partner directly with heritage mills and premier houses, ensuring beauty, softness, and commercial-grade Martindale durability.
            </p>

            <div className="space-y-3 pt-1 text-xs text-[#5E5248]">
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E0D7C9]">
                <strong className="block text-[#1F1B18] font-serif text-sm">Pure British Wool (Abraham Moon & Bute)</strong>
                <span className="text-[#7A6F64] mt-0.5 block">Naturally fire-retardant, 50,000+ rubs Martindale rating, and breathable warmth.</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E0D7C9]">
                <strong className="block text-[#1F1B18] font-serif text-sm">Stain-Resistant Bouclé & Performance Velvet (FibreGuard)</strong>
                <span className="text-[#7A6F64] mt-0.5 block">Repels spills, resists pet claws, and cleans easily with water while retaining tactile softness.</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E0D7C9]">
                <strong className="block text-[#1F1B18] font-serif text-sm">Heavyweight Belgian & European Flax Linen</strong>
                <span className="text-[#7A6F64] mt-0.5 block">Relaxed, breathable, tactile luxury that softens beautifully with time.</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => openQuoteWithContext('Request Fabric Swatches')}
                className="px-6 py-3 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 text-[#E8DCC4]" />
                <span>Request Fabric Swatches</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('made-to-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#EFE9DF] hover:bg-[#E5DDCF] text-[#2C2723] text-xs font-medium rounded-md border border-[#D9CFBF] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Timber & Leg Options</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-md bg-[#EFE9DF] border border-[#E0D7C9]">
                <img
                  src={getDirectImageUrl(settings.madeToOrderArchiveImg1 || 'https://drive.google.com/file/d/13oEzOCwTfN9SJl2UYyejRD1P0uSM4hHM/view?usp=sharing')}
                  alt="Curated textile and upholstery fabrics library"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = '/images/bespoke_fabric_swatches.jpg';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>

              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-md bg-[#EFE9DF] border border-[#E0D7C9] mt-6">
                <img
                  src={getDirectImageUrl(settings.madeToOrderArchiveImg2 || '/images/bespoke_fabric_swatches.jpg')}
                  alt="Artisan wool bouclé and cushion textiles"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = '/images/bespoke_fluted_bench.jpg';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PAST UPHOLSTERY & BESPOKE COMMISSIONS (Carousel) */}
      {settings.showPastUpholsteryCarousel !== false && (
        <PastUpholsteryCarousel className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" isDarkTheme={false} />
      )}

      {/* 6. READY-TO-SHIP STUDIO PIECES (Secondary Shop Preview for Quick Purchase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-[#E8DCC4] gap-4">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Ready Today</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] mt-1">
              Ready-to-Ship Studio Pieces
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5248] font-sans mt-1">
              Looking for something available immediately? Browse finished single-run furnishings and cushion sets in our Etsy shop.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-medium text-[#2C2723] hover:text-[#5E5248] inline-flex items-center gap-1.5 underline underline-offset-4 shrink-0"
          >
            <span>View All Ready Pieces in Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ready to Ship Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {readyToShipProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigateToProduct(product)}
              className="group bg-[#FAF8F5] rounded-xl border border-[#E0D7C9] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-4/3 bg-[#EFE9DF] overflow-hidden">
                <img
                  src={getDirectImageUrl(product.images[0])}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = getDriveFallbackUrl(product.images[0]);
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
                {/* Availability Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded backdrop-blur-xs ${
                    product.availability === 'available'
                      ? 'bg-[#1F1B18]/85 text-[#FAF8F5]'
                      : 'bg-[#5E5248]/85 text-[#FAF8F5]'
                  }`}>
                    {product.availability === 'available' ? 'In Stock (1–2 days)' : 'Made to Order'}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-[#1F1B18] font-normal group-hover:text-[#5E5248] transition-colors leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#7A6F64] mt-1 line-clamp-1">{product.subtitle}</p>
                </div>

                <div className="pt-3 border-t border-[#EAE3D5] flex items-center justify-between">
                  <span className="font-serif text-lg text-[#1F1B18]">
                    {product.currency || '£'}{product.price}
                  </span>
                  
                  <button
                    type="button"
                    onClick={(e) => handleProductEtsyClick(e, product)}
                    className="p-2 rounded-md bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] transition-all hover:scale-105 cursor-pointer"
                    title="Buy on Etsy"
                    aria-label={`Buy ${product.title} on Etsy`}
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E8DCC4]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BRAND STORY & CRAFTSMANSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-[#E0D7C9] bg-[#EFE9DF]">
              <img
                src={getDirectImageUrl(settings.brandStoryImageUrl || "/images/velvet_scatter_cushions.jpg")}
                alt="Handmade velvet decorative scatter cushions with eclectic botanical tarot print in artisan studio"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const fallback = getDriveFallbackUrl(settings.brandStoryImageUrl || "/images/velvet_scatter_cushions.jpg");
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#2C2723] text-[#FAF8F5] p-5 rounded-xl shadow-xl hidden sm:block max-w-xs">
              <p className="text-xs text-[#E8DCC4] font-serif italic">
                {settings.brandStoryQuote || '"Chair cushions should feel thoughtfully crafted rather than ordinary — combining comfort, practicality and beautiful design to bring character to every seat."'}
              </p>
              <p className="text-[10px] text-[#A89E93] uppercase tracking-widest mt-2">
                — {settings.brandStoryQuoteAuthor || settings.artisanName || 'Wedgbury Furnishings'}, Maker
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">
              {settings.brandStoryEyebrow || 'Craftsmanship & Philosophy'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] font-normal leading-snug">
              {settings.brandStoryHeading || 'Small scale. Thoughtfully made.'} <br />
              <span className="italic text-[#4A4036]">
                {settings.brandStorySubheading || 'Individually finished.'}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#5E5248] leading-relaxed font-light">
              {settings.brandStoryParagraph1 || 'Wedgbury is an independent British studio founded on respect for craft and enduring quality. We believe true luxury lies in the details you touch every day: hand-stitched piping, deep coil springs, solid timber frames and natural upholstery waddings.'}
            </p>
            <p className="text-sm text-[#5E5248] leading-relaxed font-light">
              {settings.brandStoryParagraph2 || 'By working intentionally on a small scale, every furnishing receives unhurried attention to proportion, comfort and textile texture.'}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#EFE9DF] rounded-lg border border-[#E0D7C9]">
                <strong className="block text-[#1F1B18] font-serif text-sm">
                  {settings.brandStoryFeature1Title || 'Natural Materials'}
                </strong>
                <span className="text-[#7A6F64] mt-0.5 block">
                  {settings.brandStoryFeature1Desc || 'Pure British wools, flax linens, natural fillings and solid timber hardwoods.'}
                </span>
              </div>
              <div className="p-3.5 bg-[#EFE9DF] rounded-lg border border-[#E0D7C9]">
                <strong className="block text-[#1F1B18] font-serif text-sm">
                  {settings.brandStoryFeature2Title || 'Circular Longevity'}
                </strong>
                <span className="text-[#7A6F64] mt-0.5 block">
                  {settings.brandStoryFeature2Desc || 'Revitalising preloved timber frames to keep characterful furniture in use.'}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors inline-flex items-center gap-2"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8DCC4]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">Crafted for Real Homes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The made-to-order Bourton footstool is even more beautiful in person. The tailored dimensions fit our seating area perfectly, and the turned oak legs have a wonderful beeswax finish.",
              author: "Dr. Alistair Finch",
              location: "Edinburgh",
              service: "Made-to-Order Footstool"
            },
            {
              quote: "Wedgbury transformed our antique chaise longue into the focal point of our home. Her fabric advice was spot on and the hand-finished piping is impeccable.",
              author: "Charlotte & David R.",
              location: "Bath, Somerset",
              service: "Bespoke Reupholstery"
            },
            {
              quote: "Our dog absolutely adores the Regency Pet Chaise Lounge, and for the first time in years, our living room looks curated and elegant instead of cluttered with dog beds!",
              author: "Georgina & Toby",
              location: "Cirencester",
              service: "Made-to-Order Pet Chaise"
            }
          ].map((testi, i) => (
            <div key={i} className="p-6 bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl shadow-2xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#4A4036] italic leading-relaxed">
                  "{testi.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE3D5]">
                <div className="text-xs font-semibold text-[#1F1B18]">{testi.author}</div>
                <div className="text-[11px] text-[#7A6F64] flex items-center justify-between">
                  <span>{testi.location}</span>
                  <span className="text-[#8B6B48] font-medium">{testi.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
