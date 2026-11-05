import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { isProductActive } from '../utils/productUtils';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ExternalLink, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Scissors, 
  Award, 
  Info,
  Check,
  ChevronRight,
  EyeOff
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    setCurrentPage, 
    openQuoteWithContext, 
    logEvent, 
    settings,
    products,
    navigateToProduct,
    isAdminAuthenticated
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="font-serif text-2xl text-[#1F1B18]">No product selected</h2>
        <p className="text-sm text-[#7A6F64] mt-2 mb-6">Please select an item from our shop catalog.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-[#2C2723] text-white text-xs font-medium rounded-md"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const p = selectedProduct;

  if (!isProductActive(p) && !p.isPastUpholstery && !isAdminAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="font-serif text-2xl text-[#1F1B18]">Piece Currently Unavailable</h2>
        <p className="text-sm text-[#7A6F64] mt-2 mb-6">This piece has been deactivated or is temporarily unavailable in our shop catalog.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-[#2C2723] text-white text-xs font-medium rounded-md"
        >
          Explore Available Pieces
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => 
      item.id !== p.id && 
      item.category === p.category && 
      (p.isPastUpholstery ? Boolean(item.isPastUpholstery) : (isProductActive(item) && !item.isPastUpholstery))
    )
    .slice(0, 3);

  const handleEtsyBuy = () => {
    logEvent('etsy_click', `Product Detail Etsy: ${p.title}`, { id: p.id, price: p.price });
    window.open(p.marketplaceUrl || settings.etsyShopUrl || 'https://wedgburyfurnishings.etsy.com/', '_blank', 'noopener,noreferrer');
  };

  const handleEnquireSimilar = () => {
    openQuoteWithContext(`Custom Piece based on "${p.title}"`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {p.isPastUpholstery ? (
        <div className="p-3.5 bg-[#FAF8F5] border border-[#D9CFBF] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5E5248]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B6B48] shrink-0" />
            <span><strong>Past Upholstery Archive:</strong> This piece is an archived bespoke commission / restoration. You can enquire to commission a similar custom piece.</span>
          </div>
          <button
            onClick={handleEnquireSimilar}
            className="px-3 py-1 bg-[#2C2723] text-white font-medium rounded text-[11px] hover:bg-[#1A1715] w-fit cursor-pointer shrink-0"
          >
            Enquire to Recreate
          </button>
        </div>
      ) : !isProductActive(p) && (
        <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-orange-900">
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-orange-600 shrink-0" />
            <span><strong>Admin Preview:</strong> This product is currently deactivated and hidden from the public website shop.</span>
          </div>
          <button
            onClick={() => setCurrentPage('admin')}
            className="px-2.5 py-1 bg-orange-600 text-white font-medium rounded text-[11px] hover:bg-orange-700 w-fit"
          >
            Manage in Admin
          </button>
        </div>
      )}
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-sans text-[#7A6F64]">
        <button onClick={() => setCurrentPage('home')} className="hover:text-[#1F1B18]">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => setCurrentPage('shop')} className="hover:text-[#1F1B18]">Collections</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1F1B18] font-medium truncate max-w-xs">{p.title}</span>
      </nav>

      {/* Main Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Image */}
          <div className="aspect-4/3 sm:aspect-5/4 rounded-2xl overflow-hidden bg-[#EFE9DF] border border-[#E0D7C9] shadow-md relative">
            <img
              src={getDirectImageUrl(p.images[activeImageIndex] || p.images[0])}
              alt={`${p.title} view ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const src = p.images[activeImageIndex] || p.images[0];
                const fallback = getDriveFallbackUrl(src);
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
            />

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-xs uppercase font-sans tracking-wider font-semibold rounded backdrop-blur-md ${
                p.availability === 'available'
                  ? 'bg-[#1F1B18]/85 text-[#FAF8F5]'
                  : p.availability === 'one_of_one'
                  ? 'bg-[#8B6B48] text-white'
                  : p.availability === 'made_to_order'
                  ? 'bg-[#3E5C76] text-white'
                  : 'bg-gray-800/80 text-[#E0D7C9]'
              }`}>
                {p.availability === 'one_of_one' ? 'One off — Hand Restored' : 
                 p.availability === 'made_to_order' ? 'Made to Order (2–3 Weeks)' : 
                 p.availability === 'sold' ? 'Sold — Craftsmanship Archive' : 'Available for Dispatch'}
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {p.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {p.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#2C2723] scale-95 shadow-sm' : 'border-[#D9CFBF] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={getDirectImageUrl(imgUrl)} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallback = getDriveFallbackUrl(imgUrl);
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Artisan Guarantee Callout */}
          <div className="p-4 bg-[#F5EFE6] border border-[#E0D7C9] rounded-xl text-xs font-sans text-[#5E5248] space-y-1.5">
            <div className="flex items-center gap-2 font-serif text-sm text-[#1F1B18] font-medium">
              <Award className="w-4 h-4 text-[#8B6B48]" />
              <span>Artisan Guarantee & UK Fire Safety (BS 5852)</span>
            </div>
            <p className="leading-relaxed">
              Every handmade piece is built with sustainable joinery and upholstered with compliant fire-retardant barrier cloth and premium domestic upholstery materials.
            </p>
          </div>
        </div>

        {/* Right Column: Specifications, Story & Purchasing */}
        <div className="lg:col-span-5 space-y-6 font-sans">
          
          <div className="space-y-2 border-b border-[#E8DCC4] pb-6">
            <span className="text-xs uppercase tracking-widest text-[#7A6F64] font-medium">
              {p.category.replace('_', ' ')} {p.sku && `• SKU: ${p.sku}`}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] font-normal leading-tight">
              {p.title}
            </h1>
            {p.subtitle && (
              <p className="text-sm text-[#8B6B48] font-medium">
                {p.subtitle}
              </p>
            )}

            <div className="pt-2 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-[#1F1B18]">
                {p.currency}{p.price}
              </span>
              <span className="text-xs text-[#7A6F64]">
                {p.availability === 'sold' ? 'Sold Out' : 'Includes UK courier packaging'}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3">
            {p.availability === 'sold' ? (
              <div className="space-y-2">
                <div className="p-3.5 bg-[#FAF0E6] border border-[#E8DCC4] rounded-lg text-xs text-[#7A6F64]">
                  This unique piece has been sold to a private collector. However, we regularly source matching frames and handcraft identical pieces to order.
                </div>
                <button
                  onClick={handleEnquireSimilar}
                  className="w-full py-3.5 px-6 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-sm font-medium rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E8DCC4]" />
                  <span>Enquire to Commission Something Similar</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <button
                  onClick={handleEtsyBuy}
                  className="w-full py-4 px-6 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-sm font-medium rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#F1641E]" />
                  <span>Buy Securely on Etsy ({p.currency}{p.price})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </button>

                <button
                  onClick={() => openQuoteWithContext(`Custom variation of "${p.title}"`)}
                  className="w-full py-3 px-6 bg-[#EFE9DF] hover:bg-[#E2D8C9] text-[#2C2723] text-xs font-medium rounded-md border border-[#D9CFBF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#8B6B48]" />
                  <span>Request in a Different Fabric or Size</span>
                </button>
              </div>
            )}
          </div>

          {/* Description & Story Accordions */}
          <div className="space-y-4 pt-2">
            <div>
              <h3 className="font-serif text-lg text-[#1F1B18] mb-1.5 font-medium">Description</h3>
              <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed">
                {p.description}
              </p>
            </div>

            {(p.storyBehindThePiece || p.story) && (
              <div className="p-4 bg-[#FAF8F5] border-l-2 border-[#8B6B48] rounded-r-lg">
                <h4 className="font-serif text-sm text-[#1F1B18] font-medium mb-1">Story Behind the Piece</h4>
                <p className="text-xs text-[#6B5E51] italic leading-relaxed">
                  "{p.storyBehindThePiece || p.story}"
                </p>
              </div>
            )}
          </div>

          {/* Dimensions & Specifications Table */}
          <div className="border-t border-[#E8DCC4] pt-4 space-y-3">
            <h3 className="font-serif text-base text-[#1F1B18] font-medium">Specifications</h3>
            
            <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg p-3.5 text-xs text-[#4A4036] space-y-2">
              {(p.specificationsAndDimensions || p.dimensions) && (
                <div className="grid grid-cols-2 gap-2 border-b border-[#EAE3D5] pb-2">
                  <span className="text-[#8A7F73]">Specifications & Dimensions:</span>
                  <span className="font-medium text-[#1F1B18]">
                    {p.specificationsAndDimensions || [
                      p.dimensions?.width && `W: ${p.dimensions.width}`,
                      p.dimensions?.depth && `D: ${p.dimensions.depth}`,
                      p.dimensions?.height && `H: ${p.dimensions.height}`
                    ].filter(Boolean).join(' • ')}
                  </span>
                </div>
              )}

              {(p.fabricAndWeave || p.fabric) && (
                <div className="grid grid-cols-2 gap-2 border-b border-[#EAE3D5] pb-2">
                  <span className="text-[#8A7F73]">Fabric & Weave:</span>
                  <span className="font-medium text-[#1F1B18]">{p.fabricAndWeave || p.fabric}</span>
                </div>
              )}

              {(p.colourPalette || p.colour) && (
                <div className="grid grid-cols-2 gap-2 border-b border-[#EAE3D5] pb-2">
                  <span className="text-[#8A7F73]">Colour Palette:</span>
                  <span className="font-medium text-[#1F1B18]">{p.colourPalette || p.colour}</span>
                </div>
              )}

              {(p.timberFinish || p.finish) && (
                <div className="grid grid-cols-2 gap-2 border-b border-[#EAE3D5] pb-2">
                  <span className="text-[#8A7F73]">Timber Finish:</span>
                  <span className="font-medium text-[#1F1B18]">{p.timberFinish || p.finish}</span>
                </div>
              )}

              {((p.materialsUsed && p.materialsUsed.length > 0) || (p.materials && p.materials.length > 0)) && (
                <div className="pt-1">
                  <span className="text-[#8A7F73] block mb-1">Materials Used:</span>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#5E5248]">
                    {(p.materialsUsed && p.materialsUsed.length > 0 ? p.materialsUsed : p.materials || []).map((mat, i) => (
                      <li key={i}>{mat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Delivery & Shipping Info */}
          <div className="border-t border-[#E8DCC4] pt-4 space-y-2 text-xs text-[#5E5248]">
            <div className="flex items-center gap-2 font-medium text-[#1F1B18]">
              <Truck className="w-4 h-4 text-[#8B6B48]" />
              <span>UK Nationwide Delivery & Studio Collection</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              {settings.deliveryNotice}
            </p>
          </div>

        </div>

      </div>

      {/* Related Pieces */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E8DCC4] pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl text-[#1F1B18]">Similar Pieces from the Studio</h3>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs font-sans text-[#2C2723] hover:underline"
            >
              View all collections →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateToProduct(rel)}
                className="group bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#EFE9DF]">
                  <img 
                    src={getDirectImageUrl(rel.images[0])} 
                    alt={rel.title} 
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallback = getDriveFallbackUrl(rel.images[0]);
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                </div>
                <div className="p-4 space-y-1 font-sans">
                  <h4 className="font-serif text-base text-[#1F1B18] group-hover:text-[#5E5248]">{rel.title}</h4>
                  <p className="text-xs text-[#7A6F64]">{rel.fabric}</p>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#1F1B18]">
                    <span>{rel.currency}{rel.price}</span>
                    <span className="text-[11px] font-normal text-[#8B6B48] group-hover:underline">View Piece →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
