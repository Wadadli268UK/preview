import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShoppingBag, Award, Recycle, HeartHandshake, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';

export const AboutPage: React.FC = () => {
  const { settings, setCurrentPage } = useApp();

  return (
    <div className="space-y-20 pb-24 font-sans text-[#2C2723]">
      
      {/* 1. EDITORIAL INTRO HERO */}
      <section className="bg-[#FAF8F5] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8DCC4]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#7A6F64] mb-8">
            <button onClick={() => setCurrentPage('home')} className="hover:text-[#1F1B18]">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1F1B18] font-medium">Our Story</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1B18] font-normal leading-tight">
                Thoughtfully made furnishings <br />
                <span className="italic text-[#4A4036]">for homes with personality.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#5E5248] leading-relaxed font-light">
                Wedgbury is an independent, small-scale business creating handmade furnishings and bespoke upholstery pieces for homes that value character, craftsmanship and individuality.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => {
                    setCurrentPage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8DCC4]" />
                  <span>Shop the Collection</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('made-to-order');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 bg-[#EFE9DF] hover:bg-[#E5DDCF] text-[#2C2723] text-xs font-medium rounded-md border border-[#D9CFBF] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#8B6B48]" />
                  <span>Explore Made to Order</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border border-[#E0D7C9] bg-[#EFE9DF] relative">
                <img
                  src={settings.ourStoryHeroImageUrl ? getDirectImageUrl(settings.ourStoryHeroImageUrl) : '/images/made_to_order_hero.png'}
                  alt="Wedgbury studio handcrafted furnishings and upholstery"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallback = settings.ourStoryHeroImageUrl 
                      ? getDriveFallbackUrl(settings.ourStoryHeroImageUrl)
                      : '/images/made_to_order_hero.png';
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

      {/* 2. THE STORY & PHILOSOPHY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">The Studio Philosophy</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">Small Scale. Deep Focus.</h2>
          <div className="text-sm sm:text-base text-[#5E5248] leading-relaxed space-y-4 font-light">
            <p>
              Wedgbury was founded on a simple conviction: that beautiful interiors should feel collected rather than copied, and that furniture should be practical, durable and full of character.
            </p>
            <p>
              By keeping the business intentionally on a small scale, the Wedgbury Team maintains personal, unhurried oversight over every single stage of production — from hand-selecting each fabric bolt and tying internal spring foundations to tailored piping, buttoning and final inspection.
            </p>
            <p>
              Whether creating a limited collection of fluted pouffes, tailoring a made-to-order wool footstool for a client's sitting room, or reupholstering an Edwardian chaise longue, every piece is built to be lived with and loved for years to come.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E8DCC4]">
          <div className="p-6 bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl space-y-2">
            <Award className="w-6 h-6 text-[#8B6B48]" />
            <h3 className="font-serif text-lg text-[#1F1B18]">Craft & Detail</h3>
            <p className="text-xs text-[#5E5248] leading-relaxed font-light">
              Meticulous attention to internal framing, fillings, hand-stitched piping and tailored textile tension.
            </p>
          </div>
          <div className="p-6 bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl space-y-2">
            <Recycle className="w-6 h-6 text-[#8B6B48]" />
            <h3 className="font-serif text-lg text-[#1F1B18]">Circular Longevity</h3>
            <p className="text-xs text-[#5E5248] leading-relaxed font-light">
              Restoring existing furniture, working with preloved frames, and producing in small quantities to keep quality timber in use.
            </p>
          </div>
          <div className="p-6 bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl space-y-2">
            <HeartHandshake className="w-6 h-6 text-[#8B6B48]" />
            <h3 className="font-serif text-lg text-[#1F1B18]">Individual Character</h3>
            <p className="text-xs text-[#5E5248] leading-relaxed font-light">
              Collaborating one-on-one with clients to create statement furnishings tailored to their unique home and style.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SUSTAINABILITY & RESPONSIBLE SOURCING (Section 15) */}
      <section className="bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#E8DCC4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">
              {settings.materialsSectionEyebrow || 'Considered Materials'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">
              {settings.materialsSectionHeading || 'Built with Respect for Materials'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed font-light">
              {settings.materialsSectionDescription || 'Our approach to sustainability is rooted in durability and conscious craft: restoring existing furniture where practical, working with preloved pieces, creating in small quantities and selecting quality materials that stand the test of time.'}
            </p>
            <ul className="space-y-2.5 text-xs text-[#4A4036]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6B48] shrink-0 mt-0.5" />
                <span>
                  <strong>{settings.materialsSectionItem1Title || 'High-End British & European Fabrics'}:</strong>{' '}
                  {settings.materialsSectionItem1Desc || 'Pure wools, natural linens and hardwearing textured bouclés from reputable mills.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6B48] shrink-0 mt-0.5" />
                <span>
                  <strong>{settings.materialsSectionItem2Title || 'FSC-Certified Timber'}:</strong>{' '}
                  {settings.materialsSectionItem2Desc || 'Internal structural frames for our handmade footstools use certified sustainably harvested hardwoods.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6B48] shrink-0 mt-0.5" />
                <span>
                  <strong>{settings.materialsSectionItem3Title || 'Natural Jute & Wadding'}:</strong>{' '}
                  {settings.materialsSectionItem3Desc || 'Traditional vegetable fibre webbings, coir, and hypoallergenic waddings.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8B6B48] shrink-0 mt-0.5" />
                <span>
                  <strong>{settings.materialsSectionItem4Title || 'UK Fire Safety Compliance (BS 5852)'}:</strong>{' '}
                  {settings.materialsSectionItem4Desc || 'All materials and domestic upholstery treatments fully adhere to UK safety regulations.'}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-[#E0D7C9] bg-[#EFE9DF]">
              <img
                src={getDirectImageUrl(settings.materialsSectionImageUrl || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80")}
                alt="Natural wool, jute webbing and hand-tied springs"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const fallback = getDriveFallbackUrl(settings.materialsSectionImageUrl || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80");
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
