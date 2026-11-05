import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { PastUpholsteryCarousel } from '../components/PastUpholsteryCarousel';
import { getDirectImageUrl, getDriveFallbackUrl } from '../utils/imageUtils';
import { 
  Sparkles, 
  Scissors, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  Layers, 
  Feather, 
  Hammer,
  Truck,
  MessageSquare,
  Info
} from 'lucide-react';

export const UpholsteryPage: React.FC = () => {
  const { openQuoteWithContext, portfolioProjects, settings } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'armchairs' | 'chaise' | 'dining'>('all');
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const servicesList = [
    {
      title: 'Armchair & Wingback Reupholstery',
      desc: 'Complete revitalisation of heritage armchairs, club chairs, and mid-century Scandinavian frames. We strip back degraded foam, hand-tie coil springs, and hand-tailor fresh wools or velvets.',
      icon: Scissors,
      leadTime: '4–6 weeks',
      idealFor: 'Parker Knoll, Howard & Sons, Ercol, Mid-century Danish, Victorian wingbacks'
    },
    {
      title: 'Antique Chaise Longue Restoration',
      desc: 'Sympathetic preservation of antique daybeds and chaise lounges. Specialising in traditional diamond deep-buttoning, hand-stitched horsehair edges, and French polishing of carved walnut/mahogany legs.',
      icon: Award,
      leadTime: '5–7 weeks',
      idealFor: 'Edwardian, Victorian, and Georgian daybeds'
    },
    {
      title: 'Handcrafted Footstools & Ottomans',
      desc: 'Bespoke footstools crafted to your room’s precise proportions. Choose turned oak or walnut legs, brass casters, storage lids, or tailored fluted pleating in your fabric.',
      icon: Layers,
      leadTime: '2–3 weeks',
      idealFor: 'Living room centrepieces, coffee table footstools, bedroom benches'
    },
    {
      title: 'Cushion & Foam Replacement',
      desc: 'Transform sagging, unsupportive seating cushions with high-resilience combustion-modified reflex foam cores wrapped in cruelty-free British duck feather or hypoallergenic hollowfibre.',
      icon: Feather,
      leadTime: '1–2 weeks',
      idealFor: 'Sofa seat cushions, window seat pads, bespoke banquettes'
    },
    {
      title: 'Dining Chair Sets & Bench Upholstery',
      desc: 'Refurbish dining sets with durable, stain-resistant bouclé, performance linen, or wipe-clean leathers. Includes frame joint tightening, re-doweling, and timber waxing.',
      icon: Hammer,
      leadTime: '2–4 weeks',
      idealFor: 'Sets of 4, 6, 8 dining chairs, banquette seating'
    },
    {
      title: 'Custom Fabric & Interior Design Commissions',
      desc: 'Working closely with homeowners and UK interior designers on full-room soft furnishing schemes, including matching bolsters, Roman blind trims, and statement accent pieces.',
      icon: Sparkles,
      leadTime: 'Flexible',
      idealFor: 'Complete interior design schemes, trade commissions'
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#FAF8F5] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8DCC4]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left font-sans">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1B18] font-normal leading-tight">
              {settings.upholsteryHeroHeading ? (
                settings.upholsteryHeroHeading
              ) : (
                <>
                  Bespoke Reupholstery. <br />
                  <span className="italic text-[#4A4036]">Crafted to Last Another Lifetime.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#5E5248] leading-relaxed font-light max-w-2xl">
              {settings.upholsteryHeroSubheading || "Don't discard furniture with good bones. We combine traditional upholstery craftsmanship, modern comfort engineering, and world-class British textiles to restore your favourite pieces."}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openQuoteWithContext('Upholstery Page Hero')}
                className="px-8 py-4 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-sm font-medium rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E8DCC4]" />
                <span>Request an Upholstery Quote</span>
              </button>
              <span className="text-xs text-[#7A6F64] text-center sm:text-left">
                No jargon required • Send rough photos for a free quote within 24–48 hours
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-3 rounded-2xl border border-[#E0D7C9] shadow-xl">
              <BeforeAfterSlider
                beforeImage={
                  settings.upholsteryHeroBeforeImage || 
                  "https://drive.google.com/file/d/1k-j1DT5crE__Rr6n7PmGWMt3cz4Xuial/view?usp=drive_link"
                }
                afterImage={
                  settings.upholsteryHeroAfterImage || 
                  "https://drive.google.com/file/d/1VfFYhG6R7k5QLx8-pUHHan-r2m9KFUmP/view?usp=drive_link"
                }
                beforeLabel={settings.upholsteryHeroBeforeLabel || "Before: Faded Antique Chaise"}
                afterLabel={settings.upholsteryHeroAfterLabel || "After: Restored Velvet Transformation"}
                aspectRatio="aspect-4/3"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 3-STEP CONVERSION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2 font-sans">
          <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Clear & Simple</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">How the Upholstery Process Works</h2>
          <p className="text-xs sm:text-sm text-[#5E5248]">
            We make restoring your furniture seamless, collaborative, and entirely transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans relative">
          {[
            {
              step: 1,
              title: '1. Send Photos & Details',
              desc: 'Complete our simple quote form with a few smartphone photos of your chair or sofa. No need for complex technical measurements.'
            },
            {
              step: 2,
              title: '2. Discuss Fabrics & Swatches',
              desc: 'We discuss your room palette, pets, and lifestyle, sending curated physical fabric swatches from British mills directly to your doorstep.'
            },
            {
              step: 3,
              title: '3. Clear Written Quote',
              desc: 'Receive an itemised, transparent quotation for labour, materials, and collection or courier options. No hidden surprises.'
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
                  {/* Tooltip arrow centered */}
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#2C2723]" 
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openQuoteWithContext('How It Works Step')}
            className="px-8 py-3.5 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-sans font-medium rounded-md shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
            <span>Start Step 1: Request Your Quote</span>
          </button>
        </div>
      </section>

      {/* 3. OUR SERVICES MATRIX */}
      <section className="bg-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#E8DCC4]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-3xl space-y-2 font-sans">
            <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Bespoke Capabilities</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">Our Upholstery Services</h2>
            <p className="text-xs sm:text-sm text-[#5E5248]">
              From delicate period restorations to contemporary fabric transformations, explore what we can craft for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
            {servicesList.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div key={idx} className="bg-white p-7 rounded-xl border border-[#E0D7C9] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#2C2723] transition-colors">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] text-[#2C2723] flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-[#1F1B18] font-medium">{srv.title}</h3>
                    <p className="text-xs text-[#5E5248] leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-[#EAE3D5] space-y-2 text-xs">
                    <div className="text-[11px] text-[#7A6F64]">
                      <strong className="text-[#2C2723]">Typical Lead Time:</strong> {srv.leadTime}
                    </div>
                    <div className="text-[11px] text-[#7A6F64]">
                      <strong className="text-[#2C2723]">Common Pieces:</strong> {srv.idealFor}
                    </div>
                    <button
                      onClick={() => openQuoteWithContext(`Service: ${srv.title}`)}
                      className="text-xs text-[#2C2723] font-semibold hover:underline inline-flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <span>Enquire about this service</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3b. PAST UPHOLSTERY SHOWCASE ARCHIVE */}
      <section className="bg-[#241F1C] text-[#FAF8F5] py-14 sm:py-20 px-3 sm:px-6 lg:px-8 border-y border-[#38302A]">
        <div className="max-w-7xl mx-auto w-full">
          <PastUpholsteryCarousel isDarkTheme={true} />
        </div>
      </section>

      {/* 4. FABRIC & TEXTILE CONSULTATION GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center font-sans">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">
              {settings.upholsteryFabricEyebrow || 'Textile Sourcing'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18] font-normal leading-snug">
              {settings.upholsteryFabricHeading || 'Curated British & European Fabrics'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed">
              {settings.upholsteryFabricDescription || 'Choosing the right fabric is essential for both aesthetic harmony and long-term durability. We partner directly with premier textile houses to provide an extensive library of swatches:'}
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg">
                <strong className="text-[#1F1B18] font-medium block">
                  {settings.upholsteryFabricItem1Title || 'Pure British Wool (Abraham Moon & Bute)'}
                </strong>
                <span className="text-[#7A6F64]">
                  {settings.upholsteryFabricItem1Desc || 'Naturally fire-retardant, exceptionally hardwearing (50,000+ Martindale rubs), and thermoregulating.'}
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg">
                <strong className="text-[#1F1B18] font-medium block">
                  {settings.upholsteryFabricItem2Title || 'Heavyweight Belgian & European Flax Linen'}
                </strong>
                <span className="text-[#7A6F64]">
                  {settings.upholsteryFabricItem2Desc || 'Relaxed, breathable, tactile luxury that softens beautifully with age.'}
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg">
                <strong className="text-[#1F1B18] font-medium block">
                  {settings.upholsteryFabricItem3Title || 'Cotton & Mohair Velvet (Designers Guild & Romo)'}
                </strong>
                <span className="text-[#7A6F64]">
                  {settings.upholsteryFabricItem3Desc || 'Sumptuous lustre and deep light-reflecting richness for period armchairs and statement chaise lounges.'}
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#E0D7C9] rounded-lg">
                <strong className="text-[#1F1B18] font-medium block">
                  {settings.upholsteryFabricItem4Title || 'Pet-Friendly Stain-Resistant Bouclé (FibreGuard)'}
                </strong>
                <span className="text-[#7A6F64]">
                  {settings.upholsteryFabricItem4Desc || 'Repels liquid spills, resists pet claws, and cleans easily with just water while retaining tactile softness.'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openQuoteWithContext('Fabric Advice Request')}
                className="px-6 py-3 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors"
              >
                {settings.upholsteryFabricButtonText || 'Request Complimentary Fabric Swatches'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-[#E0D7C9]">
              <img
                src={getDirectImageUrl(settings.upholsteryFabricImageUrl || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80')}
                alt="Tactile upholstery fabrics and textile swatch samples"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const fallback = getDriveFallbackUrl(settings.upholsteryFabricImageUrl || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80');
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. UPHOLSTERY FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 font-sans">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#7A6F64] font-medium">Common Questions</span>
          <h2 className="font-serif text-3xl text-[#1F1B18]">Upholstery FAQs</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Can I supply my own fabric (COM)?',
              a: 'Yes, absolutely. We will calculate the exact meterage required and verify that your chosen fabric meets UK Furniture & Furnishings Fire Safety regulations (BS 5852) or can be paired with an appropriate interliner barrier cloth.'
            },
            {
              q: 'How does collection and delivery work for large armchairs or sofas?',
              a: 'We offer personal local collection across the Cotswolds/Gloucestershire area and partner with trusted specialist two-man furniture couriers for nationwide UK collections and deliveries. Every item is blanket-wrapped and secured during transport.'
            },
            {
              q: 'How do I know if my old chair is worth restoring?',
              a: 'Older chairs made prior to the 1980s almost always have solid beech or oak hardwood frames that are vastly superior to modern flat-pack furniture. Reupholstery gives you a bespoke, heirloom-quality piece at a fraction of the cost of high-end luxury retailers.'
            }
          ].map((faq, i) => (
            <div key={i} className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl p-5 space-y-2">
              <h3 className="font-serif text-base text-[#1F1B18] font-medium">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-[#5E5248] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C2723] text-[#FAF8F5] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 font-sans">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">Ready to transform your furniture?</h2>
          <p className="text-xs sm:text-sm text-[#D0C5B4] max-w-lg mx-auto leading-relaxed">
            Send us a few photos today. We will assess the construction, recommend fabric meterage, and provide a fixed written estimate with zero obligation.
          </p>
          <button
            onClick={() => openQuoteWithContext('Upholstery Page Bottom CTA')}
            className="px-8 py-4 bg-[#E8DCC4] text-[#1F1B18] text-xs font-semibold rounded-md hover:bg-white transition-colors cursor-pointer shadow-md"
          >
            Start Your Upholstery Enquiry
          </button>
        </div>
      </section>

    </div>
  );
};
