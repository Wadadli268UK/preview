import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShoppingBag, 
  Layers, 
  Palette, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  Scissors, 
  Clock,
  HeartHandshake,
  ChevronRight,
  Info
} from 'lucide-react';

export const MadeToOrderPage: React.FC = () => {
  const { 
    openQuoteWithContext, 
    setCurrentPage, 
    navigateToProduct, 
    products, 
    madeToOrderProducts,
    settings 
  } = useApp();

  const activeMadeToOrderProducts = madeToOrderProducts.filter((p) => p.isActive !== false);

  const madeToOrderItems = products.filter(
    (p) => (p.availability === 'made_to_order' || p.availability === 'available' || p.availability === 'sold') && p.isActive !== false
  );

  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('footstools');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState<string>('all');
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const displayedMadeToOrder = selectedCollectionFilter === 'all'
    ? activeMadeToOrderProducts
    : activeMadeToOrderProducts.filter(p => p.category === selectedCollectionFilter);

  const bespokeCategories = [
    {
      id: 'footstools',
      name: 'Footstools & Ottomans',
      desc: 'Hand-turned oak or walnut legs, hand-sprung frames, bespoke lengths and luxury wool or velvet upholstery.',
      image: '/images/made_to_order_hero.png',
      leadTime: '3–4 Weeks',
      startingPrice: 'From £295'
    },
    {
      id: 'pouffes',
      name: 'Fluted & Sled Benches / Pouffes',
      desc: 'Architectural fluting, brass sled bases, textured bouclés and high-resilience comfort padding.',
      image: '/images/bespoke_fluted_bench.jpg',
      leadTime: '2–3 Weeks',
      startingPrice: 'From £185'
    },
    {
      id: 'pet_furniture',
      name: 'Pet Chaise Lounges',
      desc: 'Curated scaled luxury for dogs and cats. Orthopaedic core padding with stain-resistant, pet-friendly fabrics.',
      image: 'https://drive.google.com/file/d/1zBNNnFSO2pIuHnAwB8B0LBkLIt012GvW/view?usp=sharing',
      leadTime: '3–4 Weeks',
      startingPrice: 'From £265'
    },
    {
      id: 'cushions',
      name: 'Tailored Cushions & Bolsters',
      desc: 'Hand-screenprinted linens, contrast self-piping, feather-down fillings and custom dimension banquette bolsters.',
      image: 'https://drive.google.com/file/d/1y3TWA9aKLURBlgj_fQ1ckmlQPU6r52bJ/view?usp=drive_link',
      leadTime: '1–2 Weeks',
      startingPrice: 'From £55'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 font-sans text-[#2C2723]">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#FAF8F5] border-b border-[#E8DCC4] pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#7A6F64] mb-8">
            <button onClick={() => setCurrentPage('home')} className="hover:text-[#1F1B18]">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1F1B18] font-medium">Made to Order</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1B18] font-normal leading-[1.15]">
                Made for you. <br />
                <span className="italic text-[#4A4036]">Made to be different.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#5E5248] leading-relaxed font-light max-w-xl">
                Enquire about bespoke dimensions, custom fabric choices, or variations on past sold designs. Because Wedgbury works with small collections and individually sourced fabrics, individuality is at the heart of everything we create.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => openQuoteWithContext('Made to Order Page Hero')}
                  className="px-7 py-3.5 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-sm font-medium rounded-md shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E8DCC4]" />
                  <span>Discuss a Made-to-Order Piece</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 bg-[#EFE9DF] hover:bg-[#E5DDCF] text-[#2C2723] text-sm font-medium rounded-md border border-[#D9CFBF] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#8B6B48]" />
                  <span>View Current Ready Stock</span>
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#7A6F64] border-t border-[#E8DCC4]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2C2723]" /> Tailored dimensions & leg finishes
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2C2723]" /> Curated British & European fabrics
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2C2723]" /> UK courier or specialist delivery
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-xl border border-[#E0D7C9] bg-[#EFE9DF]">
                <img
                  src={settings.madeToOrderHeroUrl ? getDirectImageUrl(settings.madeToOrderHeroUrl) : '/images/made_to_order_hero.png'}
                  alt="Handmade bespoke footstool with geometric stitching"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = '/images/made_to_order_hero.png';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#FAF8F5] p-4 rounded-xl border border-[#D9CFBF] shadow-lg max-w-xs text-xs space-y-1">
                <span className="font-serif font-semibold text-[#1F1B18] block">Small-scale craft</span>
                <span className="text-[#7A6F64] block">Every piece is built individually by Wedgbury Furnishings with traditional joinery and premium waddings.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW MADE-TO-ORDER WORKS (3-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2 font-sans">
          <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Simple & Personal</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">How Made to Order Works</h2>
          <p className="text-sm text-[#5E5248]">
            Collaborating on a piece of handmade furniture is straightforward and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans relative">
          {[
            {
              step: 1,
              title: '1. Choose a Silhouette',
              desc: 'Select from our established range of footstools, pouffes, pet chaises or banquettes, or reference a previously sold design from our archive.'
            },
            {
              step: 2,
              title: '2. Select Fabrics & Timber',
              desc: 'We assist in selecting suitable luxury wools, linens, velvets or stain-resistant bouclés, alongside oak, walnut or beech timber leg finishes.'
            },
            {
              step: 3,
              title: '3. Handcrafted in Studio',
              desc: 'Your piece is constructed by hand using solid timber frames, traditional webbing and durable waddings, tailored to your exact measurements.'
            }
          ].map((item, index) => {
            const isHovered = activeTooltip === item.step;
            return (
              <div 
                key={item.step} 
                className="bg-[#FAF8F5] p-6 sm:p-7 rounded-xl border border-[#E0D7C9] shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-4 group relative"
              >
                <h3 className="font-serif text-lg sm:text-xl text-[#1F1B18] font-medium leading-snug">
                  {item.title}
                </h3>

                {/* Information Icon & Tooltip */}
                <div 
                  className="shrink-0"
                  onMouseEnter={() => setActiveTooltip(item.step)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <button
                    type="button"
                    aria-label={`View details for ${item.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTooltip(activeTooltip === item.step ? null : item.step);
                    }}
                    className="p-2 rounded-full text-[#7A6F64] hover:text-[#1F1B18] bg-[#EFE9DF] hover:bg-[#E2D8C7] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2C2723]/30"
                  >
                    <Info className="w-4 h-4 text-[#8B6B48]" />
                  </button>
                </div>

                {/* Tooltip centered over the card div component */}
                <div 
                  role="tooltip"
                  onClick={() => setActiveTooltip(null)}
                  className={`absolute bottom-full mb-3.5 z-40 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-sm sm:w-80 p-4 bg-[#2C2723] text-[#FAF8F5] text-xs rounded-xl shadow-2xl transition-all duration-200 leading-relaxed font-sans font-light ${
                    isHovered 
                      ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                      : 'opacity-0 invisible translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 pb-1 border-b border-[#4A4036] text-[#E8DCC4] font-serif font-medium text-xs">
                    <div className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#E8DCC4]" />
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[10px] text-[#A89E93] font-sans font-normal sm:hidden">Tap to close</span>
                  </div>
                  <p className="text-[#E0D7C9] text-xs leading-relaxed">
                    {item.desc}
                  </p>
                  {/* Tooltip arrow centered over the card */}
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#2C2723]" 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. BESPOKE FURNISHING CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E8DCC4] gap-4">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Bespoke Models</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] mt-1">Made-to-Order Collection</h2>
          </div>
          <p className="text-xs text-[#7A6F64] max-w-sm">
            Handcrafted to order in our UK workshop. Each model can be tailored with your custom choice of fabric, size variations, and leg styles.
          </p>
        </div>

        {/* Collection Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Silhouettes' },
            { id: 'Footstool Collection', label: 'Footstools' },
            { id: 'Pouffe Collection', label: 'Fluted Pouffes' },
            { id: 'Ottoman & Bench Collection', label: 'Ottomans & Benches' },
            { id: 'Pet Collection', label: 'Pet Chaises' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCollectionFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCollectionFilter === cat.id
                  ? 'bg-[#2C2723] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5E5248] border border-[#E0D7C9] hover:bg-[#EFE9DF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {displayedMadeToOrder.length === 0 ? (
          <div className="p-12 text-center bg-[#FAF8F5] rounded-xl border border-[#E0D7C9] space-y-3">
            <Sparkles className="w-8 h-8 text-[#8B6B48] mx-auto opacity-70" />
            <h3 className="font-serif text-xl text-[#1F1B18]">No silhouettes in this collection yet</h3>
            <p className="text-xs text-[#5E5248] max-w-md mx-auto">
              We can still build custom bespoke pieces in this category. Contact us directly to discuss custom dimensions, frames, and upholstery fabrics.
            </p>
            <button
              onClick={() => openQuoteWithContext('Bespoke Custom Commission Request')}
              className="mt-2 px-6 py-2.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] cursor-pointer"
            >
              Request Custom Commission
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedMadeToOrder.map((item) => {
              const legList = item.legOptions 
                ? item.legOptions.split(/,\s*|\n+/).filter(Boolean)
                : [];

              return (
                <div
                  key={item.id}
                  className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Price Header */}
                    <div className="aspect-4/3 bg-[#EFE9DF] overflow-hidden relative border-b border-[#EAE3D5]">
                      {item.imageUrl ? (
                        <img
                          src={getDirectImageUrl(item.imageUrl)}
                          alt={item.productName}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const fallback = getDriveFallbackUrl(item.imageUrl || '');
                            if (e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8B6B48]/40">
                          <Sparkles className="w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-[#1F1B18]/85 text-white backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono font-semibold tracking-wide">
                        {item.productCode}
                      </div>
                      {item.startingPrice && (
                        <div className="absolute top-3 right-3 bg-[#FAF8F5]/95 backdrop-blur-xs px-2.5 py-1.5 rounded-md text-[11px] shadow-sm border border-[#E0D7C9] flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-[#7A6F64] font-sans font-medium">Starting from</span>
                          <span className="font-serif font-bold text-[#1F1B18]">
                            {item.startingPrice.toLowerCase().startsWith('starting from')
                              ? item.startingPrice.replace(/^starting\s+from\s*/i, '').trim()
                              : item.startingPrice.toLowerCase().startsWith('from')
                              ? item.startingPrice.replace(/^from\s*/i, '').trim()
                              : item.startingPrice}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-serif text-xl text-[#1F1B18] font-medium leading-snug">
                          {item.productName}
                        </h3>
                        <p className="text-xs text-[#5E5248] leading-relaxed font-light mt-2 line-clamp-3">
                          {item.productDescription}
                        </p>
                      </div>

                      {/* Specifications Box */}
                      <div className="p-3.5 bg-white rounded-xl border border-[#EAE3D5] space-y-2.5 text-xs">
                        {item.startingPrice && (
                          <div className="flex items-start justify-between gap-2 border-b border-[#F4EFE6] pb-2">
                            <span className="text-[#7A6F64] text-[11px] font-medium">Starting from:</span>
                            <span className="text-[#1F1B18] font-serif font-bold text-xs text-right">
                              {item.startingPrice.toLowerCase().startsWith('starting from')
                                ? item.startingPrice
                                : `Starting from ${item.startingPrice.replace(/^from\s*/i, '').trim()}`}
                            </span>
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-2 border-b border-[#F4EFE6] pb-2">
                          <span className="text-[#7A6F64] text-[11px] font-medium">Size:</span>
                          <span className="text-[#1F1B18] font-semibold text-right">{item.size}</span>
                        </div>
                        <div className="space-y-0.5 border-b border-[#F4EFE6] pb-2">
                          <span className="text-[#7A6F64] text-[10px] uppercase tracking-wider block font-semibold">
                            Finished Dimensions (cm, without legs):
                          </span>
                          <span className="text-[#1F1B18] font-mono text-[11px] font-medium block">
                            {item.finishedDimensions}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#7A6F64] text-[10px] uppercase tracking-wider block font-semibold mb-1">
                            Leg Options:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {legList.length > 0 ? (
                              legList.map((leg, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded bg-[#FAF8F5] text-[10px] text-[#4A4036] border border-[#E0D7C9]"
                                >
                                  {leg.trim()}
                                </span>
                              ))
                            ) : (
                              <span className="text-[#7A6F64] text-[11px] italic">Bespoke leg options on request</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.leadTime && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#7A6F64]">
                          <Clock className="w-3.5 h-3.5 text-[#8B6B48]" />
                          <span>Estimated lead time: <strong className="text-[#1F1B18]">{item.leadTime}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => openQuoteWithContext(`Made to Order: ${item.productName} (Code: ${item.productCode})`)}
                      className="w-full py-3 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
                      <span>Enquire About {item.productName}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. RECREATING SOLD PIECES & ARCHIVE INSPIRATION */}
      <section className="bg-[#EFE9DF] border-y border-[#D9CFBF] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Archive & Custom Commissions</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">
              Fell in love with a sold design?
            </h2>
            <p className="text-sm text-[#5E5248] leading-relaxed font-light max-w-xl">
              Because our pieces are produced in limited batches or restored as one-of-a-kind originals, certain fabrics and antique frames sell quickly. Where possible, we can source matching timber frames or craft a similar piece tailored in your preferred textile.
            </p>
            <div className="pt-2 flex items-start gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#E0D7C9] text-xs text-[#5E5248]">
              <Info className="w-4 h-4 text-[#8B6B48] shrink-0 mt-0.5" />
              <span>
                <strong>A note on individuality:</strong> Sourced vintage frames and limited fabric bolts mean slight variations in grain, tone or silhouette will naturally occur — celebrating true craftsmanship over factory duplication.
              </span>
            </div>
            <div className="pt-3">
              <button
                onClick={() => openQuoteWithContext('Recreate Sold Archive Piece')}
                className="px-6 py-3 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Enquire About Sourcing a Similar Piece</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8DCC4]" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-[#FAF8F5] border border-[#D9CFBF]">
                <img
                  src={getDirectImageUrl(settings.madeToOrderArchiveImg1 || "https://drive.google.com/file/d/13oEzOCwTfN9SJl2UYyejRD1P0uSM4hHM/view?usp=sharing")}
                  alt="Bespoke upholstery fabric samples and pastel weaves"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = getDriveFallbackUrl(settings.madeToOrderArchiveImg1 || "https://drive.google.com/file/d/13oEzOCwTfN9SJl2UYyejRD1P0uSM4hHM/view?usp=sharing");
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>
              <p className="text-[11px] text-[#7A6F64] text-center italic">
                {settings.madeToOrderArchiveCard1Text || "Curated Fabric & Swatches"}
              </p>
            </div>
            <div className="space-y-4 pt-6">
              <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-[#FAF8F5] border border-[#D9CFBF]">
                <img
                  src={getDirectImageUrl(settings.madeToOrderArchiveImg2 || "/images/bespoke_fabric_swatches.jpg")}
                  alt="Stack of bespoke cushions and textured British wool throws"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== "/images/bespoke_fabric_swatches.jpg") {
                      e.currentTarget.src = "/images/bespoke_fabric_swatches.jpg";
                    }
                  }}
                />
              </div>
              <p className="text-[11px] text-[#7A6F64] text-center italic">
                {settings.madeToOrderArchiveCard2Text || "Luxury Cushions & Wools"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MADE-TO-ORDER ENQUIRY CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#2C2723] text-[#E8DCC4] flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-[#1F1B18]">Ready to discuss a bespoke piece?</h3>
            <p className="text-sm text-[#5E5248] max-w-lg mx-auto leading-relaxed font-light">
              Send us a brief message with your preferred silhouette, ideal dimensions and fabric ideas. We will be delighted to guide you with swatches and an estimate.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openQuoteWithContext('Made to Order Bottom Banner')}
              className="px-8 py-3.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors shadow-xs cursor-pointer"
            >
              Start Made to Order Enquiry
            </button>
            <button
              onClick={() => {
                setCurrentPage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-[#EFE9DF] text-[#2C2723] border border-[#D9CFBF] text-xs font-medium rounded-md hover:bg-[#E5DDCF] transition-colors cursor-pointer"
            >
              Browse Ready-to-Ship Furnishings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
