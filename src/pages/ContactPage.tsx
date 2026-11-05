import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Search,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { 
    settings, 
    faqs, 
    openQuoteWithContext, 
    logEvent, 
    showToast 
  } = useApp();

  // Contact Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    telephone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Search & Category Filter State
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(faqs[0]?.id || null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formbold.com/s/6rBeG', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          telephone: form.telephone || 'Not provided',
          subject: form.subject,
          message: form.message,
          source: 'Website Contact Page',
          submittedAt: new Date().toLocaleString('en-GB'),
        }),
      });

      if (!response.ok) {
        // Fallback to FormData
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('telephone', form.telephone || 'Not provided');
        formData.append('subject', form.subject);
        formData.append('message', form.message);
        formData.append('source', 'Website Contact Page');
        formData.append('submittedAt', new Date().toLocaleString('en-GB'));

        const fallbackRes = await fetch('https://formbold.com/s/6rBeG', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData,
        });

        if (!fallbackRes.ok) {
          throw new Error(`FormBold submission failed with status: ${fallbackRes.status}`);
        }
      }

      logEvent('contact_submit', `Message from ${form.name}: ${form.subject}`, form);
      setIsSubmitted(true);
      showToast('Message sent! Wedgbury Furnishings will respond within 24 hours.', 'success');
    } catch (err) {
      console.error('FormBold contact submission error:', err);
      showToast('Could not send message. Please try again or email us directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = () => {
    logEvent('phone_click', settings.phone);
  };

  const handleEmailClick = () => {
    logEvent('email_click', settings.email);
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchCat = faqCategory === 'all' || item.category === faqCategory;
    const matchSearch = 
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 pb-24 font-sans">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1F1B18] tracking-tight font-normal">
          Contact & Workshop Enquiries
        </h1>
        <p className="text-sm sm:text-base text-[#5E5248] leading-relaxed font-light">
          Have a question about a product listing on Etsy, wish to arrange a workshop consultation, or want to discuss a potential upholstery project? We would love to hear from you.
        </p>
      </div>

      {/* Main Grid: Direct Contact Cards + Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct Contact Details & Workshop Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="font-serif text-2xl text-[#1F1B18]">Studio Information</h3>
            
            <div className="space-y-4 text-xs sm:text-sm text-[#4A4036]">
              
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DF] text-[#2C2723] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6F64] uppercase tracking-wider block">Direct Email</span>
                  <a 
                    href={`mailto:${settings.email}`} 
                    onClick={handleEmailClick}
                    className="font-medium text-[#1F1B18] hover:underline"
                  >
                    {settings.email}
                  </a>
                  <p className="text-[11px] text-[#7A6F64] mt-0.5">Typical response time: Within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DF] text-[#2C2723] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6F64] uppercase tracking-wider block">Telephone / WhatsApp</span>
                  <a 
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} 
                    onClick={handlePhoneClick}
                    className="font-medium text-[#1F1B18] hover:underline"
                  >
                    {settings.phone}
                  </a>
                  <p className="text-[11px] text-[#7A6F64] mt-0.5">Mon–Fri: 9:00am – 5:30pm (GMT)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DF] text-[#2C2723] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6F64] uppercase tracking-wider block">Workshop Location</span>
                  <span className="font-medium text-[#1F1B18]">{settings.location}</span>
                  <p className="text-[11px] text-[#7A6F64] mt-0.5">Workshop consultations & drop-offs by prior appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EFE9DF] text-[#F1641E] flex items-center justify-center shrink-0 mt-0.5">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#7A6F64] uppercase tracking-wider block">Etsy Storefront</span>
                  <a 
                    href={settings.etsyShopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1F1B18] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Visit Verified Etsy Shop</span>
                    <ExternalLink className="w-3 h-3 text-[#7A6F64]" />
                  </a>
                </div>
              </div>

            </div>

            {/* Quick Upholstery Trigger */}
            <div className="pt-4 border-t border-[#EAE3D5] space-y-2">
              <span className="text-xs font-semibold text-[#1F1B18] block">Need an Upholstery Estimate?</span>
              <p className="text-xs text-[#5E5248]">
                For reupholstery quotations and fabric advice, our dedicated multi-step form is the fastest method:
              </p>
              <button
                onClick={() => openQuoteWithContext('Contact Page Card')}
                className="w-full py-2.5 px-4 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E8DCC4]" />
                <span>Open Smart Quote Form</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl p-6 sm:p-10 shadow-xs">
            <h3 className="font-serif text-2xl text-[#1F1B18] mb-2">Send a Message</h3>
            <p className="text-xs sm:text-sm text-[#5E5248] mb-6">
              Fill in the form below and we will get back to you promptly.
            </p>

            {isSubmitted ? (
              <div className="p-8 text-center bg-white rounded-xl border border-[#DCD2C3] space-y-4 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-[#2C2723] text-[#E8DCC4] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-[#1F1B18]">Thank you for your message</h4>
                <p className="text-xs sm:text-sm text-[#5E5248] max-w-md mx-auto">
                  We have received your enquiry and Wedgbury Furnishings will reply to <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm({ name: '', email: '', telephone: '', subject: 'General Enquiry', message: '' });
                  }}
                  className="px-5 py-2 bg-[#2C2723] text-white text-xs font-medium rounded-md hover:bg-[#1A1715]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleFormSubmit} 
                action="https://formbold.com/s/6rBeG" 
                method="POST" 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1">
                      Your Name <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Rachel Adams"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1">
                      Email Address <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. rachel@example.com"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      placeholder="e.g. 07700 900456"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Product on Etsy">Question regarding an Etsy Listing</option>
                      <option value="Bespoke Commission">Bespoke Commission Enquiry</option>
                      <option value="Workshop Visit">Arranging a Workshop Visit</option>
                      <option value="Trade / Interior Designer">Trade / Interior Designer Scheme</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4036] mb-1">
                    Your Message <span className="text-[#C2410C]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Please tell us how we can help..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723] leading-relaxed"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#2C2723] hover:bg-[#1A1715] disabled:bg-[#7A6F64] text-[#FAF8F5] text-xs sm:text-sm font-medium rounded-md shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* COMPREHENSIVE SEARCHABLE FAQS ACCORDION */}
      <div className="border-t border-[#E8DCC4] pt-16 space-y-8">
        
        <div className="max-w-3xl space-y-2">
          <span className="text-xs tracking-[0.2em] uppercase text-[#7A6F64] font-medium">Help & Guidance</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1B18]">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-[#5E5248]">
            Find answers to common questions about delivery, upholstery lead times, purchasing on Etsy, fabric sourcing, and caring for your furnishings.
          </p>
        </div>

        {/* Search & Category Filter for FAQs */}
        <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#7A6F64] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. delivery, fabric, measurements)..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All FAQs' },
                { id: 'delivery', label: 'Delivery' },
                { id: 'upholstery', label: 'Upholstery' },
                { id: 'fabric', label: 'Fabric' },
                { id: 'purchasing', label: 'Etsy & Orders' },
                { id: 'care', label: 'Care' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFaqCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    faqCategory === cat.id
                      ? 'bg-[#2C2723] text-white font-medium'
                      : 'bg-[#EFE9DF] text-[#5E5248] hover:bg-[#E2D8C9]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#7A6F64] bg-[#FAF8F5] rounded-xl border border-[#E0D7C9]">
              No FAQs matched your search. Please feel free to email us directly!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-[#1F1B18] font-medium hover:text-[#5E5248] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 text-[#8B6B48]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5E5248] leading-relaxed border-t border-[#EAE3D5] font-sans">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
