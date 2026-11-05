import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductCategory, ProductAvailability } from '../types';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { isProductActive } from '../utils/productUtils';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  Info,
  SlidersHorizontal,
  Check,
  EyeOff
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    navigateToProduct, 
    openQuoteWithContext, 
    logEvent, 
    settings,
    isAdminAuthenticated,
    setCurrentPage
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Pieces' },
    { id: 'cushions', label: 'Artisan Cushions' },
    { id: 'footstools', label: 'Handmade Footstools' },
    { id: 'pet_furniture', label: 'Pet Collection' },
    { id: 'preloved_restored', label: 'Preloved & Restored' },
  ];

  // Strictly filter products: any unlisted or deactivated piece is 100% excluded.
  // Furthermore, products added to the Past Upholstery Carousel appear exclusively in that carousel and not in the shop catalog.
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Must be active and listed (default to true; any false/unlisted state is strictly rejected)
      if (!isProductActive(item)) return false;
      // If added to the past upholstery carousel, exclude from the shop catalog
      if (item.isPastUpholstery) return false;

      const matchCategory = 
        selectedCategory === 'all' || 
        item.category === selectedCategory ||
        (selectedCategory === 'footstools' && item.category === 'pouffes') ||
        (selectedCategory === 'preloved_restored' && item.category === 'occasional_seating');
      const matchAvailability = selectedAvailability === 'all' || item.availability === selectedAvailability;
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.fabric ? item.fabric.toLowerCase().includes(searchQuery.toLowerCase()) : false);

      return matchCategory && matchAvailability && matchSearch;
    });
  }, [products, selectedCategory, selectedAvailability, searchQuery]);

  const unlistedCount = useMemo(() => {
    return products.filter((p) => !isProductActive(p) && !p.isPastUpholstery).length;
  }, [products]);

  const handleEtsyBuy = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    logEvent('etsy_click', `Shop Listing Etsy Buy: ${p.title}`, { id: p.id, price: p.price });
    window.open(p.marketplaceUrl || settings.etsyShopUrl || 'https://wedgburyfurnishings.etsy.com/', '_blank', 'noopener,noreferrer');
  };

  const handleEnquireSimilar = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    openQuoteWithContext(`Custom Commission similar to "${p.title}"`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-sans font-medium">
          Ready-to-Ship & Studio Stock
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1F1B18] tracking-tight font-normal">
          Handmade Furnishings & Restored Originals
        </h1>
        <p className="text-sm sm:text-base text-[#5E5248] font-sans leading-relaxed font-light">
          Each item in our ready catalog is either made by hand in limited batches or restored as a unique one-off vintage piece, available for fast dispatch via our Etsy shop.
        </p>
      </div>

      {/* Prominent Made-to-Order Banner */}
      <div className="bg-[#FAF8F5] border border-[#D9CFBF] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#EFE9DF] text-[10px] font-mono uppercase tracking-wider text-[#8B6B48]">
            <Sparkles className="w-3 h-3 text-[#8B6B48]" />
            <span>Prefer Bespoke Dimensions or Fabrics?</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1F1B18] font-normal">
            Every signature piece can be Made to Order.
          </h2>
          <p className="text-xs sm:text-sm text-[#5E5248] font-light leading-relaxed">
            Need a footstool tailored to your sofa's exact height, a fluted pouffe in a specific bouclé, or an ottoman bench sized to your bay window? Explore our made-to-order silhouettes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCurrentPage('made-to-order');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium rounded-md shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer hover:shadow"
        >
          <span>Explore Made to Order</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#E8DCC4]" />
        </button>
      </div>

      {/* Admin Status Notice: Visible only to authenticated admin */}
      {isAdminAuthenticated && unlistedCount > 0 && (
        <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-3.5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 font-sans shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-100 rounded-md shrink-0">
              <EyeOff className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <span className="font-semibold">Studio Admin Note:</span>{' '}
              <span>{unlistedCount} {unlistedCount === 1 ? 'piece is' : 'pieces are'} deactivated in the admin dashboard and <strong>hidden from customer view</strong> in this shop.</span>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('admin')}
            className="text-[11px] font-semibold text-[#2C2723] hover:underline shrink-0 flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded border border-amber-200 hover:bg-[#FAF8F5]"
          >
            <span>Manage Catalog in Admin</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          
          {/* Search Input */}
          <div className="relative grow max-w-md">
            <Search className="w-4 h-4 text-[#7A6F64] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by furniture type, wool, velvet, linen..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723] font-sans placeholder:text-[#9C9185]"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="pt-3 border-t border-[#EAE3D5] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-sans text-xs">
          <span className="text-[#7A6F64] font-medium pr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2C2723] text-white font-medium shadow-xs'
                  : 'bg-white border border-[#DCD2C3] text-[#4A4036] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filters */}
      <div className="flex items-center justify-between text-xs text-[#7A6F64] font-sans px-1">
        <span>Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'piece' : 'pieces'}</span>
        {(selectedCategory !== 'all' || selectedAvailability !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAvailability('all');
              setSearchQuery('');
            }}
            className="text-[#2C2723] underline hover:text-[#5E5248]"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-dashed border-[#D0C5B4] rounded-2xl p-12 text-center space-y-4 font-sans">
          <Info className="w-8 h-8 text-[#7A6F64] mx-auto" />
          <h3 className="font-serif text-xl text-[#1F1B18]">No matching furnishings found</h3>
          <p className="text-xs sm:text-sm text-[#5E5248] max-w-md mx-auto">
            Try adjusting your search terms or filters. If you are looking for a specific style of footstool or chair, we can handcraft or source it for you through our bespoke service.
          </p>
          <button
            onClick={() => openQuoteWithContext('Shop No Results')}
            className="px-6 py-2.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715]"
          >
            Request a Custom Piece
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigateToProduct(product)}
              className="group bg-[#FAF8F5] rounded-xl border border-[#E0D7C9] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Product Gallery Thumbnail Container */}
              <div className="relative aspect-4/3 bg-[#EFE9DF] overflow-hidden">
                <img
                  src={getDirectImageUrl(product.images[0])}
                  alt={`${product.title} - ${product.subtitle || 'Handcrafted Furnishing by Wedgbury Furnishings'}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = getDriveFallbackUrl(product.images[0]);
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
                {/* Multiple Images Indicator */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-sans font-medium rounded">
                    1 of {product.images.length} photos
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider font-semibold rounded backdrop-blur-xs ${
                    product.availability === 'available'
                      ? 'bg-[#1F1B18]/85 text-[#FAF8F5]'
                      : product.availability === 'one_of_one'
                      ? 'bg-[#8B6B48] text-white'
                      : product.availability === 'made_to_order'
                      ? 'bg-[#3E5C76] text-white'
                      : 'bg-gray-800/80 text-[#E0D7C9]'
                  }`}>
                    {product.availability === 'one_of_one' ? 'One off' : 
                     product.availability === 'made_to_order' ? 'Made to Order' : 
                     product.availability === 'sold' ? 'Sold (Craftsmanship Archive)' : 'Available'}
                  </span>
                </div>
                {/* Price Display */}
                <div className="absolute bottom-3 right-3 bg-[#FAF8F5]/95 text-[#1F1B18] px-3 py-1 rounded text-sm font-serif font-bold shadow-xs">
                  {product.currency}{product.price}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col grow justify-between space-y-4 font-sans">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#7A6F64]">
                    <span className="uppercase tracking-wider font-medium text-[10px]">
                      {product.category.replace('_', ' ')}
                    </span>
                    {product.leadTime && (
                      <span className="text-[10px] text-[#5E5248]">{product.leadTime.split(' ')[0]}</span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-[#1F1B18] font-medium leading-snug group-hover:text-[#5E5248] transition-colors">
                    {product.title}
                  </h3>
                  {product.subtitle && (
                    <p className="text-xs text-[#8B6B48] font-medium">
                      {product.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-[#5E5248] leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Specifications Pill Table */}
                <div className="pt-2 border-t border-[#EAE3D5] space-y-1 text-xs text-[#7A6F64]">
                  <div className="flex justify-between">
                    <span className="text-[#8A7F73]">Fabric:</span>
                    <span className="text-[#2C2723] font-medium truncate max-w-[60%]">{product.fabric}</span>
                  </div>
                  {product.dimensions?.width && (
                    <div className="flex justify-between">
                      <span className="text-[#8A7F73]">Dimensions:</span>
                      <span className="text-[#2C2723] font-medium">
                        {product.dimensions.width} • {product.dimensions.depth || product.dimensions.height}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions (Etsy or Enquire for Sold) */}
                <div className="pt-2">
                  {product.availability === 'sold' ? (
                    <button
                      onClick={(e) => handleEnquireSimilar(e, product)}
                      className="w-full py-2.5 px-4 bg-[#EFE9DF] hover:bg-[#E2D8C9] text-[#2C2723] text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#8B6B48]" />
                      <span>Enquire About Something Similar</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleEtsyBuy(e, product)}
                        className="grow py-2.5 px-4 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#F1641E]" />
                        <span>Buy on Etsy</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToProduct(product);
                        }}
                        className="px-3.5 py-2.5 bg-[#EFE9DF] hover:bg-[#E2D8C9] text-[#2C2723] text-xs font-medium rounded transition-colors"
                        title="View Full Specifications"
                      >
                        Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Custom Commission CTA */}
      <div className="mt-16 bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
        <div className="space-y-1 text-left max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#7A6F64] font-medium">Bespoke Options</span>
          <h3 className="font-serif text-2xl text-[#1F1B18]">Looking for a custom size, fabric or colour?</h3>
          <p className="text-xs sm:text-sm text-[#5E5248]">
            We handcraft footstools and seating to your exact dimensions and room palette using your choice of British wool, linen, or velvet.
          </p>
        </div>
        <button
          onClick={() => openQuoteWithContext('Shop Bottom Custom Banner')}
          className="px-6 py-3 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] shrink-0 transition-colors cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
          <span>Request Custom Furnishing Quote</span>
        </button>
      </div>
    </div>
  );
};
