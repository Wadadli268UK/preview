import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles, 
  ShoppingBag, 
  Scissors, 
  Truck, 
  ShieldCheck, 
  HeartHandshake,
  ChevronRight,
  Mail
} from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { faqs, setCurrentPage, openQuoteWithContext } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-5': true,
    'faq-7': true
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'purchasing', label: 'Handmade & Made to Order' },
    { id: 'upholstery', label: 'Bespoke Upholstery & Quotes' },
    { id: 'fabric', label: 'Fabrics & Sourcing (COM)' },
    { id: 'delivery', label: 'UK Delivery & Collection' },
    { id: 'care', label: 'Product Care & Preservation' }
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-24 font-sans text-[#2C2723]">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#FAF8F5] border-b border-[#E8DCC4] pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-[#7A6F64]">
            <button onClick={() => setCurrentPage('home')} className="hover:text-[#1F1B18]">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1F1B18] font-medium">Frequently Asked Questions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE9DF] border border-[#E0D7C9] text-xs font-medium text-[#5E5248]">
            <HelpCircle className="w-3.5 h-3.5 text-[#8B6B48]" />
            <span>Help & Customer Information</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#1F1B18] font-normal leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-[#5E5248] max-w-xl mx-auto font-light leading-relaxed">
            Everything you need to know about our handmade furnishings, made-to-order commissions, upholstery services, fabric guidance and delivery.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-[#7A6F64] absolute left-3.5 top-5.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. fabric, measurements, delivery)..."
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#D9CFBF] rounded-lg text-sm focus:outline-hidden focus:border-[#2C2723] shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2C2723] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#EFE9DF] text-[#5E5248] hover:bg-[#E5DDCF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="mt-8 space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF8F5] rounded-xl border border-[#E0D7C9] space-y-3">
              <HelpCircle className="w-8 h-8 text-[#7A6F64] mx-auto opacity-50" />
              <p className="text-sm text-[#7A6F64]">No questions matched your search term "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-[#2C2723] text-white text-xs font-medium rounded-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl overflow-hidden shadow-2xs transition-all duration-200"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5EFE6]/50 transition-colors"
                  >
                    <span className="font-serif text-lg text-[#1F1B18] font-medium pr-2">
                      {faq.question}
                    </span>
                    <div className={`w-7 h-7 rounded-full bg-[#EFE9DF] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#2C2723] text-white' : 'text-[#2C2723]'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#EAE3D5] text-sm text-[#5E5248] leading-relaxed font-light">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 3. REASSURING CONTACT CALLOUT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFE9DF] border border-[#D9CFBF] rounded-2xl p-8 sm:p-10 text-center space-y-5">
          <div className="w-10 h-10 rounded-full bg-[#2C2723] text-[#E8DCC4] flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-serif text-2xl text-[#1F1B18]">Have a question not covered here?</h3>
            <p className="text-xs sm:text-sm text-[#5E5248] max-w-md mx-auto font-light leading-relaxed">
              We are always delighted to discuss custom dimensions, fabric ideas, or assess photographs of your furniture.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openQuoteWithContext('FAQ Page')}
              className="px-6 py-3 bg-[#2C2723] text-white text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors cursor-pointer"
            >
              Request a Bespoke Quote
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 bg-[#FAF8F5] text-[#2C2723] border border-[#D9CFBF] text-xs font-medium rounded-md hover:bg-white transition-colors cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
