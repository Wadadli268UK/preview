import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  ShieldCheck, 
  Truck, 
  Scale, 
  AlertCircle, 
  Sparkles, 
  ArrowLeft, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const TermsOfSalePage: React.FC = () => {
  const { settings, setCurrentPage, openQuoteWithContext } = useApp();
  const lastUpdated = '1 September 2026';

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#2C2723] text-[#FAF8F5] pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#3E3731]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#A89E93] hover:text-[#E8DCC4] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-[#6B5F54]">•</span>
            <span className="text-xs text-[#E8DCC4] font-medium tracking-wider uppercase">Legal & Compliance</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-tight">
                Terms of Sale & Bespoke Commission Agreement
              </h1>
              <p className="text-sm text-[#BDB2A6] mt-2 max-w-2xl font-sans leading-relaxed">
                Standard terms, UK consumer rights, fire safety compliance, and bespoke commission terms governing purchases from {settings.businessName}.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#38312B] border border-[#4D443C] text-xs text-[#E8DCC4]">
              <Calendar className="w-4 h-4 text-[#C4A872]" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Highlights Summary */}
        <div className="bg-[#F3EDE2] border border-[#DECDB7] rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#2C2723] text-[#E8DCC4] flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-[#2C2723] font-medium">
                Core Craft Principles & Legal Framework
              </h2>
              <p className="text-xs sm:text-sm text-[#5E5248] mt-1.5 leading-relaxed">
                Every piece crafted or reupholstered by {settings.businessName} adheres strictly to the <strong>UK Consumer Rights Act 2015</strong>, <strong>Consumer Contracts Regulations 2013</strong>, and the <strong>UK Furniture and Furnishings (Fire Safety) Regulations 1988 (BS 5852)</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="space-y-10 font-sans text-sm text-[#4A4036] leading-relaxed">
          
          {/* Section 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">1</span>
              Business Information & Contracting Entity
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                When you purchase ready-made furnishings or commission bespoke upholstery through this website, your contract is with:
              </p>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8DFC8] space-y-1 text-xs">
                <p><strong>Business Name:</strong> {settings.businessName}</p>
                <p><strong>Proprietor / Maker:</strong> {settings.artisanName} (Registered UK Sole Trader)</p>
                <p><strong>Workshop Location:</strong> {settings.workshopAddress || settings.location || 'United Kingdom'}</p>
                <p><strong>Contact Email:</strong> <a href={`mailto:${settings.email}`} className="text-[#8B5E34] underline">{settings.email}</a></p>
                <p><strong>Telephone:</strong> <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-[#8B5E34] underline">{settings.phone}</a></p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">2</span>
              Product Categories & Handmade Character
            </h2>
            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <p>We supply three distinct categories of goods:</p>
              <div className="space-y-3">
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="text-[#1F1B18] block font-serif text-sm">A. Ready-to-Ship Small Batch Furnishings:</strong>
                  <span>Footstools, pouffes, scatter cushions, and pet furniture crafted in limited small runs in our studio.</span>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="text-[#1F1B18] block font-serif text-sm">B. One-off Restored & Preloved Seating:</strong>
                  <span>Authentic vintage armchairs, chaises, and vintage frames structurally restored and reupholstered. Original vintage timber may display gentle age-appropriate character, patina, or grain irregularities that enhance individuality.</span>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="text-[#1F1B18] block font-serif text-sm">C. Made-to-Order & Bespoke Commissions:</strong>
                  <span>Pieces built or reupholstered to your bespoke dimensions, tailored fabric selections, bespoke legs, or personal customer-supplied furniture frames.</span>
                </div>
              </div>
              <div className="p-3 bg-[#F8F4ED] rounded-lg border border-[#E0D7C9] text-xs text-[#5E5248]">
                <strong>Handcrafted Tolerances:</strong> Because our furniture is built and upholstered entirely by hand, finished dimensions may vary slightly by +/- 1–2 cm. Natural fabrics (such as linen, wool, and slub bouclés) contain natural slubs, shading, and texture variations which are hallmarks of genuine craft textiles.
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">3</span>
              UK Fire Safety Regulations (BS 5852 Compliance)
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                <ShieldCheck className="w-5 h-5 text-[#8B5E34] shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <strong className="text-[#1F1B18] block">Statutory Fire Safety Compliance:</strong>
                  <p>
                    All foam fillings, interliners, waddings, and upholstery fabrics supplied by {settings.businessName} strictly comply with the <strong>Furniture and Furnishings (Fire Safety) Regulations 1988 (as amended)</strong> for domestic UK use (BS 5852 / Cigarette & Match resistance).
                  </p>
                  <p className="text-xs text-[#7A6F64]">
                    Where a customer specifies a natural designer fabric (such as 100% linen or non-FR wool), a compliant Schedule 3 fire-retardant barrier cloth (interliner) is professionally installed between the upholstery filling and cover fabric.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">4</span>
              Quotations, Deposits & Bespoke Commission Terms
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <ul className="space-y-2 list-disc list-inside text-[#5E5248]">
                <li><strong>Quote Validity:</strong> Written upholstery quotations provided via our online quote calculator or email remain valid for <strong>30 days</strong> from the date of issue.</li>
                <li><strong>Commission Deposits:</strong> To schedule a bespoke commission slot and order dedicated fabrics, a <strong>50% non-refundable deposit</strong> is required upon approval of the written specification.</li>
                <li><strong>Final Balance:</strong> The remaining 50% balance, plus any agreed specialist courier delivery fees, becomes payable upon workshop completion prior to final dispatch or collection.</li>
                <li><strong>Customer-Supplied Fabric (COM):</strong> When customers provide their own fabric, it is the customer's responsibility to ensure the textile is suitable for upholstery and accompanied by appropriate fire retardancy certificates or permission to interline.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">5</span>
              Delivery, Shipping & Access Assessment
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <ul className="space-y-2 list-disc list-inside text-[#5E5248]">
                <li><strong>Nationwide UK Delivery:</strong> Smaller furnishings (cushions, small footstools) are dispatched via tracked courier (Royal Mail / Parcelforce). Larger statement chairs, chaises, and heavy ottomans are transported via specialist 2-man furniture couriers.</li>
                <li><strong>Access Responsibility:</strong> Customers are solely responsible for ensuring adequate clearance through hallways, doorways, stairwells, and turns into the destination room prior to ordering.</li>
                <li><strong>Inspection on Delivery:</strong> Please inspect all packaging upon arrival. In the rare event of transit damage, notify us within <strong>48 hours</strong> with photographs of the packaging and item at {settings.email}.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">6</span>
              Cancellations, Returns & Consumer Rights
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                Your rights depend on the nature of the product under the <strong>Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18] font-serif text-sm">Standard In-Stock Furnishings:</strong>
                  <p className="text-xs text-[#5E5248] mt-1">
                    You have <strong>14 days</strong> from receipt to cancel your order and return the item in unused, original condition for a refund (excluding return postage).
                  </p>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18] font-serif text-sm">Bespoke & Made-to-Order Pieces:</strong>
                  <p className="text-xs text-[#5E5248] mt-1">
                    Under Regulation 28(1)(b), goods made to the consumer's specifications or clearly personalised (bespoke fabric choices, custom dimensions, or reupholstered customer frames) are <strong>exempt from statutory 14-day cancellation rights</strong> once fabrication has commenced.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EFE9DF] text-xs text-[#5E5248]">
                <strong>Faulty or Damaged Goods:</strong> Nothing in these terms affects your statutory rights under the <strong>Consumer Rights Act 2015</strong> if goods are faulty or misdescribed.
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">7</span>
              Governing Law & Dispute Resolution
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                These Terms of Sale and all contracts formed with {settings.businessName} shall be governed by and construed in accordance with the <strong>laws of England and Wales</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
              <p className="text-xs text-[#7A6F64]">
                If you have any questions, feedback, or concerns regarding your order, we welcome personal communication and strive to resolve any matter amicably and swiftly.
              </p>
            </div>
          </section>

        </div>

        {/* Footer Navigation & CTA */}
        <div className="mt-12 pt-8 border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentPage('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFE9DF] text-[#2C2723] text-xs font-medium rounded-lg hover:bg-[#E2D8C9] transition-colors cursor-pointer"
            >
              ← View Privacy Policy
            </button>
            <button
              onClick={() => {
                setCurrentPage('cookies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFE9DF] text-[#2C2723] text-xs font-medium rounded-lg hover:bg-[#E2D8C9] transition-colors cursor-pointer"
            >
              View Cookie Policy →
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openQuoteWithContext('Terms Page')}
              className="px-4 py-2 bg-[#FAF8F5] border border-[#2C2723] text-[#2C2723] text-xs font-medium rounded-lg hover:bg-[#EFE9DF] transition-colors cursor-pointer"
            >
              Request Commission Quote
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-lg hover:bg-[#1A1715] transition-colors cursor-pointer"
            >
              Contact Studio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
