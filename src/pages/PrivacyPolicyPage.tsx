import React from 'react';
import { useApp } from '../context/AppContext';
import { ROUTE_PATHS } from '../utils/routes';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  UserCheck, 
  Mail, 
  ArrowLeft, 
  Calendar, 
  HelpCircle, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings, setCurrentPage } = useApp();
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
                Privacy Policy (UK GDPR)
              </h1>
              <p className="text-sm text-[#BDB2A6] mt-2 max-w-2xl font-sans leading-relaxed">
                How {settings.businessName} collects, protects, uses, and respects your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
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
        {/* Quick Summary Box */}
        <div className="bg-[#F3EDE2] border border-[#DECDB7] rounded-2xl p-6 sm:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#2C2723] text-[#E8DCC4] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-[#2C2723] font-medium">
                Our Privacy Commitment in Brief
              </h2>
              <p className="text-xs sm:text-sm text-[#5E5248] mt-1.5 leading-relaxed">
                We operate as a small, independent British craft studio. We only collect the essential personal details needed to answer your upholstery inquiries, provide bespoke quotes, complete commissions, and deliver finished furnishings safely. We never sell your data or share customer furniture photographs publicly without your explicit written approval.
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
              Data Controller & Contact Information
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                Under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, the data controller for this website and business is:
              </p>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8DFC8] space-y-1.5 text-xs">
                <p><strong>Business Name:</strong> {settings.businessName}</p>
                <p><strong>Sole Trader / Proprietor:</strong> {settings.artisanName}</p>
                <p><strong>Studio Location:</strong> {settings.workshopAddress || settings.location || 'United Kingdom'}</p>
                <p><strong>Email Address:</strong> <a href={`mailto:${settings.email}`} className="text-[#8B5E34] underline">{settings.email}</a></p>
                <p><strong>Telephone:</strong> <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-[#8B5E34] underline">{settings.phone}</a></p>
              </div>
              <p className="text-xs text-[#7A6F64]">
                If you have any questions or wish to exercise any of your data protection rights, please contact our Data Controller directly at {settings.email}.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">2</span>
              What Personal Data We Collect
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Depending on how you interact with {settings.businessName}, we may collect and process the following categories of information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                  <h3 className="font-serif text-sm text-[#1F1B18] font-semibold flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#8B5E34]" />
                    Quotation & Commission Enquiries
                  </h3>
                  <ul className="text-xs text-[#5E5248] space-y-1 list-disc list-inside">
                    <li>Full name</li>
                    <li>Email address & telephone number</li>
                    <li>Delivery town / postcode for shipping calculation</li>
                    <li>Furniture specifications & dimensions</li>
                    <li>Fabric preferences & project notes</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                  <h3 className="font-serif text-sm text-[#1F1B18] font-semibold flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-[#8B5E34]" />
                    Customer Furniture Photographs
                  </h3>
                  <ul className="text-xs text-[#5E5248] space-y-1 list-disc list-inside">
                    <li>Images of preloved furniture for upholstery review</li>
                    <li>Photos uploaded via our interactive quote calculator</li>
                    <li>Used strictly for internal structural estimation</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                  <h3 className="font-serif text-sm text-[#1F1B18] font-semibold flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#8B5E34]" />
                    Collection Previews & Newsletters
                  </h3>
                  <ul className="text-xs text-[#5E5248] space-y-1 list-disc list-inside">
                    <li>Email address for private collection releases</li>
                    <li>Subscription timestamp and consent record</li>
                    <li>Instant one-click unsubscribe support</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] space-y-2">
                  <h3 className="font-serif text-sm text-[#1F1B18] font-semibold flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#8B5E34]" />
                    Browsing & Technical Data
                  </h3>
                  <ul className="text-xs text-[#5E5248] space-y-1 list-disc list-inside">
                    <li>Anonymous usage analytics (quote form starts/finishes)</li>
                    <li>Browser type, device class, and cookie preferences</li>
                    <li>Local browser cache keys to preserve session drafts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">3</span>
              Lawful Bases for Processing (UK GDPR Article 6)
            </h2>
            <div className="mt-4 space-y-3">
              <p>Under UK data protection law, we rely on the following lawful grounds:</p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="text-[#1F1B18] block mb-0.5">Contractual Necessity (Article 6(1)(b)):</strong>
                  Processing necessary to prepare a quote at your request, agree on upholstery terms, source specific fabrics, complete your order, or deliver items to your address.
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="text-[#1F1B18] block mb-0.5">Consent (Article 6(1)(a)):</strong>
                  When you voluntarily subscribe to our collection preview emails or consent to non-essential analytics cookies. You may withdraw consent at any time.
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="text-[#1F1B18] block mb-0.5">Legitimate Interests (Article 6(1)(f)):</strong>
                  To operate and improve our workshop website, maintain security against fraud, and provide responsive customer service.
                </div>
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="text-[#1F1B18] block mb-0.5">Legal Obligation (Article 6(1)(c)):</strong>
                  To maintain statutory financial accounts, tax records (HMRC), and fire safety compliance documentation (BS 5852).
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">4</span>
              Customer Photographs & Intellectual Property
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                When submitting photos of your own furniture for restoration assessment:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm list-disc list-inside text-[#5E5248]">
                <li>Photographs are stored securely and viewed only by {settings.artisanName} to evaluate woodwork integrity, foam degradation, spring state, and fabric yardage.</li>
                <li><strong>No Public Publishing Without Consent:</strong> We will never post photographs of furniture inside your private home or in our portfolio gallery without your clear, written permission.</li>
                <li>When workshop transformation photographs are published in our portfolio, personal identifiers, domestic backgrounds, or private surroundings are cropped or anonymised.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">5</span>
              Third-Party Services & Marketplaces
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>We do not sell, rent, or trade your personal data. We work only with trusted service providers to run our workshop efficiently:</p>
              <div className="space-y-2">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong>Etsy Marketplace:</strong> For products purchased via our Etsy shop, your payment and billing information is collected and processed securely by Etsy Ireland UC / Etsy Inc. under Etsy's Privacy Policy. We receive only delivery details necessary to dispatch your item.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong>Delivery & Courier Partners:</strong> Royal Mail, Parcelforce, or designated specialist two-man furniture couriers receive your delivery name, address, and telephone number solely to coordinate timely delivery and tracking updates.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong>Cloud & Database Infrastructure:</strong> Secure cloud infrastructure (such as Google Cloud / Firebase) hosted with enterprise-grade encryption for quotation storage and database persistence.
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">6</span>
              Data Retention Periods
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:</p>
              <ul className="space-y-1.5 list-disc list-inside text-[#5E5248]">
                <li><strong>Quotation Inquiries (Uncompleted):</strong> Retained for 12 months in case you wish to resume your commission, after which records are deleted.</li>
                <li><strong>Completed Orders & Invoices:</strong> Retained for 6 years in accordance with UK statutory accounting, tax (HMRC), and contract law requirements.</li>
                <li><strong>Newsletter Subscribers:</strong> Retained until you unsubscribe or request removal.</li>
                <li><strong>Customer Uploaded Photographs:</strong> Stored alongside your quote record and purged upon request.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">7</span>
              Your Rights Under UK GDPR
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>Under the UK General Data Protection Regulation, you have the following enforceable rights:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18]">Right of Access:</strong>
                  Request a copy of the personal information we hold about you.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18]">Right to Rectification:</strong>
                  Request correction of inaccurate or incomplete information.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18]">Right to Erasure ("To Be Forgotten"):</strong>
                  Request deletion of your data where no overriding legal obligation exists.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18]">Right to Restrict Processing:</strong>
                  Ask us to suspend processing of your personal data under certain conditions.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18]">Right to Data Portability:</strong>
                  Receive your data in a structured, commonly used digital format.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF]">
                  <strong className="block text-[#1F1B18]">Right to Object:</strong>
                  Object to processing based on legitimate interests or direct marketing.
                </div>
              </div>

              <p className="pt-2">
                To exercise any of these rights, please email us at <strong>{settings.email}</strong>. We respond to all verified requests within one calendar month at no charge.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs">
            <h2 className="font-serif text-xl text-[#1F1B18] font-medium flex items-center gap-2.5 pb-3 border-b border-[#EFE9DF]">
              <span className="w-7 h-7 rounded-full bg-[#EFE9DF] text-[#1F1B18] text-xs font-sans font-semibold flex items-center justify-center">8</span>
              Information Commissioner's Office (ICO)
            </h2>
            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <p>
                If you have concerns about how we handle your personal data, we encourage you to contact us first so we can resolve the matter promptly. You also have the right to lodge a complaint with the UK supervisory authority:
              </p>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EFE9DF] text-xs text-[#5E5248] space-y-1">
                <p><strong>Information Commissioner's Office (ICO)</strong></p>
                <p>Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
                <p>Helpline: 0303 123 1113 • Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#8B5E34] underline">ico.org.uk</a></p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Navigation Buttons */}
        <div className="mt-12 pt-8 border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentPage('cookies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFE9DF] text-[#2C2723] text-xs font-medium rounded-lg hover:bg-[#E2D8C9] transition-colors cursor-pointer"
            >
              ← View Cookie Policy
            </button>
            <button
              onClick={() => {
                setCurrentPage('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-[#EFE9DF] text-[#2C2723] text-xs font-medium rounded-lg hover:bg-[#E2D8C9] transition-colors cursor-pointer"
            >
              View Terms of Sale →
            </button>
          </div>
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
  );
};
