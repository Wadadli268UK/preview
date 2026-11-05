import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  Trash2,
  Armchair,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Info,
  Layers,
  Scissors,
  CheckCircle2
} from 'lucide-react';

interface QuoteModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialFurnitureContext?: string | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  initialFurnitureContext: propsInitialFurnitureContext,
}) => {
  const { 
    isQuoteModalOpen, 
    setIsQuoteModalOpen, 
    quoteContextItem, 
    setQuoteContextItem,
    submitUpholsteryEnquiry, 
    settings,
    logEvent,
    showToast,
  } = useApp();

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isQuoteModalOpen;
  const onClose = propsOnClose || (() => {
    setIsQuoteModalOpen(false);
    setQuoteContextItem(null);
  });

  const initialContext = propsInitialFurnitureContext !== undefined ? propsInitialFurnitureContext : quoteContextItem;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string>('');

  // Form State
  const [contact, setContact] = useState({
    name: '',
    email: '',
    telephone: '',
    townPostcode: '',
  });

  const [furnitureType, setFurnitureType] = useState('Armchair');
  const [customFurnitureType, setCustomFurnitureType] = useState('');
  const [frameCondition, setFrameCondition] = useState('Good structural condition');
  const [restorationNeeds, setRestorationNeeds] = useState<string[]>([
    'Complete Re-covering',
    'New Cushion Foam / Padding'
  ]);
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  ]);
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    depth: '',
    unit: 'cm' as 'cm' | 'inches',
    unknownDimensions: false,
    needsHelpMeasuring: false,
  });
  const [fabricPreference, setFabricPreference] = useState<'has_fabric' | 'knows_style' | 'wants_recommendations' | 'not_sure'>('wants_recommendations');
  const [fabricNotes, setFabricNotes] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [consultations, setConsultations] = useState({
    fabricAdvice: true,
    colourAdvice: true,
    measuringAdvice: false,
    structuralAdvice: true,
    generalConsultation: false,
  });
  const [budgetRange, setBudgetRange] = useState('£600–£1,000');
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  // Populate context if opened from a specific product or section
  useEffect(() => {
    if (initialContext && isOpen) {
      setCustomFurnitureType(initialContext);
      if (initialContext.toLowerCase().includes('chair')) {
        setFurnitureType('Armchair');
      } else if (initialContext.toLowerCase().includes('chaise')) {
        setFurnitureType('Chaise Longue');
      } else if (initialContext.toLowerCase().includes('footstool') || initialContext.toLowerCase().includes('pouffe')) {
        setFurnitureType('Footstool / Ottoman');
      } else if (initialContext.toLowerCase().includes('cushion')) {
        setFurnitureType('Cushions / Foams');
      } else if (initialContext.toLowerCase().includes('dining')) {
        setFurnitureType('Dining Chairs');
      }
      setProjectDetails(`I would like an estimate regarding: ${initialContext}`);
    }
  }, [initialContext, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleRestorationNeed = (item: string) => {
    setRestorationNeeds((prev) => 
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    // Step 1 Validation
    if (currentStep === 1) {
      if (furnitureType === 'Other' && !customFurnitureType.trim()) {
        showToast('Please describe your furniture piece.', 'error');
        return;
      }
    }

    // Step 4 Validation (Contact Step)
    if (currentStep === 4) {
      if (!contact.name.trim() || !contact.email.trim() || !contact.townPostcode.trim()) {
        showToast('Please enter your Name, Email, and Town / Postcode to receive your quote.', 'error');
        return;
      }
      if (!contact.email.includes('@') || !contact.email.includes('.')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      if (!privacyConsent) {
        showToast('Please tick the privacy consent box to proceed.', 'error');
        return;
      }
      handleSubmit();
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotos((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (honeypot) return; // Silent spam bot trap
    setIsSubmitting(true);
    try {
      const compiledDetails = [
        projectDetails,
        frameCondition ? `Frame condition: ${frameCondition}` : '',
        restorationNeeds.length > 0 ? `Required work: ${restorationNeeds.join(', ')}` : '',
      ].filter(Boolean).join('\n\n');

      const resolvedFurnitureType = furnitureType === 'Other' && customFurnitureType ? customFurnitureType : furnitureType;

      // 1. Submit to FormBold endpoint
      try {
        const formBoldPayload = {
          name: contact.name,
          email: contact.email,
          telephone: contact.telephone || 'Not provided',
          town_postcode: contact.townPostcode,
          furniture_type: resolvedFurnitureType,
          custom_furniture_description: customFurnitureType || 'None',
          frame_condition: frameCondition,
          restoration_work_needed: restorationNeeds.join(', ') || 'Standard reupholstery',
          dimensions: dimensions.unknownDimensions
            ? 'Unknown (customer requested measuring assistance)'
            : `${dimensions.width || '—'}W x ${dimensions.depth || '—'}D x ${dimensions.height || '—'}H ${dimensions.unit}`,
          fabric_preference: fabricPreference,
          fabric_notes: fabricNotes || 'None',
          budget_range: budgetRange,
          consultation_advice_requested: Object.entries(consultations)
            .filter(([_, enabled]) => enabled)
            .map(([key]) => key)
            .join(', ') || 'None',
          project_details: compiledDetails || 'None',
          photos_count: `${photos.length} photo(s) submitted`,
          photo_links: photos.filter((p) => p.startsWith('http')).join(', ') || 'Uploaded in browser session',
          submission_source: 'Upholstery & Bespoke Smart Quote Modal',
          submitted_at: new Date().toLocaleString('en-GB'),
        };

        const formBoldRes = await fetch('https://formbold.com/s/oJajw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formBoldPayload),
        });

        if (!formBoldRes.ok) {
          // Resilient fallback with FormData
          const formData = new FormData();
          Object.entries(formBoldPayload).forEach(([key, val]) => {
            formData.append(key, String(val));
          });
          await fetch('https://formbold.com/s/oJajw', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData,
          });
        }
      } catch (formBoldErr) {
        console.warn('FormBold quote request notification note:', formBoldErr);
      }

      // 2. Submit to local & Firestore cloud database for studio CMS
      const id = await submitUpholsteryEnquiry({
        customer: contact,
        furnitureType: resolvedFurnitureType,
        customFurnitureType,
        photos,
        dimensions,
        fabricPreference,
        fabricNotes,
        projectDetails: compiledDetails,
        consultationRequests: consultations,
        budgetRange,
      });

      setSubmittedEnquiryId(id);
      setIsSubmitted(true);
      showToast('Quote request submitted! We will send your estimate within 24 hours.', 'success');
      logEvent('quote_complete', `Quote submitted by ${contact.name} for ${furnitureType}`, {
        furnitureType: resolvedFurnitureType,
        id,
        town: contact.townPostcode,
        budget: budgetRange
      });
    } catch (err) {
      console.error(err);
      showToast('Unable to submit enquiry. Please try again or contact us directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div 
      id="quote-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div 
        id="quote-modal-container"
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#E0D7C9] overflow-hidden my-auto"
      >
        
        {/* Header Bar */}
        <div className="bg-[#2C2723] text-[#FAF8F5] px-5 sm:px-6 py-4.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3D352E] flex items-center justify-center text-[#E8DCC4] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="quote-modal-title" className="font-serif text-lg sm:text-xl text-[#F5EFEB]">
                  Request an Upholstery Quote
                </h3>
                {initialContext && initialContext !== 'Header' && (
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-[#3D352E] text-[#E8DCC4] text-[10px] rounded-full font-sans">
                    {initialContext}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#A89E93] font-sans tracking-wide">
                No obligation • Itemised written estimate from {settings.businessName || 'Wedgbury Furnishings'} within 24–48 hours
              </p>
            </div>
          </div>
          <button
            id="close-quote-modal-btn"
            onClick={handleClose}
            className="text-[#A89E93] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[#3D352E] cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        {!isSubmitted && (
          <div className="bg-[#EFE9DF] px-5 sm:px-6 py-3 border-b border-[#E0D7C9]">
            <div className="flex items-center justify-between text-xs font-sans text-[#7A6F64] mb-1.5">
              <span className="font-medium text-[#2C2723]">
                Step {currentStep} of {totalSteps}: {
                  currentStep === 1 ? 'Your Furniture Piece & Scope' :
                  currentStep === 2 ? 'Photos & Fabric Preferences' :
                  currentStep === 3 ? 'Artisan Guidance & Budget' :
                  'Your Contact & Delivery Location'
                }
              </span>
              <span className="text-[11px] text-[#5E5248]">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-[#DCD2C3] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#2C2723] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto font-sans">
          {isSubmitted ? (
            /* Submission Success State */
            <div className="text-center py-6 sm:py-8 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#2C2723] text-[#E8DCC4] rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              
              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-widest text-[#7A6F64] font-medium">
                  Quote Request Received
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1B18]">
                  Thank you, {contact.name.split(' ')[0]}!
                </h3>
                <p className="text-xs text-[#7A6F64] font-mono">
                  Enquiry Reference: #{submittedEnquiryId || 'WEDG-QUO'}
                </p>
              </div>

              <div className="bg-[#F3EFEA] p-5 rounded-lg border border-[#E0D7C9] text-left max-w-lg mx-auto text-sm text-[#4A4036] space-y-3">
                <h4 className="font-serif text-base text-[#1F1B18] font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8B6B48]" />
                  <span>What happens next:</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed text-[#5E5248]">
                  <li>
                    <strong>Workshop Review:</strong> Wedgbury Furnishings will review your photos, calculate fabric yardage/meterage, and evaluate the frame condition.
                  </li>
                  <li>
                    <strong>Fabric Swatches:</strong> If requested, we will prepare complimentary textile swatches (wool, bouclé, velvet, linen) for your room scheme.
                  </li>
                  <li>
                    <strong>Itemised Estimate:</strong> You will receive a written quote with labour and fabric options sent to <strong>{contact.email}</strong> within 24–48 hours.
                  </li>
                </ol>
              </div>

              {/* Direct Workshop Contact Info */}
              <div className="text-xs text-[#7A6F64] space-y-1 max-w-md mx-auto">
                <p>Have additional photos to send? Email them directly to:</p>
                <a href={`mailto:${settings.email}`} className="font-medium text-[#2C2723] hover:underline">
                  {settings.email}
                </a>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] transition-colors cursor-pointer"
                >
                  Return to Store
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Spam honeypot trap */}
              <input 
                type="text" 
                name="website_url_hp" 
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)} 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
              />

              {/* ================= STEP 1: FURNITURE PIECE & SCOPE ================= */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-[#E8DCC4] pb-3">
                    <h4 className="font-serif text-xl text-[#1F1B18]">1. Your Furniture Piece</h4>
                    <p className="text-xs text-[#7A6F64] mt-0.5">
                      Select what type of piece you have and the restorative work needed.
                    </p>
                  </div>

                  {/* Piece Type Selection Grid */}
                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-2">
                      Furniture Type:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: 'Armchair', sub: 'Wingback, Club, Accent' },
                        { label: 'Chaise Longue', sub: 'Antique Daybed, Settee' },
                        { label: 'Dining Chairs', sub: 'Single chair or Full set' },
                        { label: 'Footstool / Ottoman', sub: 'Storage, Turned legs, Pouffe' },
                        { label: 'Cushions / Foams', sub: 'Seat pads, Refilling & Covers' },
                        { label: 'Pet Furniture', sub: 'Bespoke pet bed or chaise' },
                        { label: 'Other', sub: 'Bespoke, Bench, Headboard, Made to Order' }
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setFurnitureType(item.label)}
                          className={`p-2.5 text-left rounded-lg border transition-all text-xs cursor-pointer ${
                            furnitureType === item.label
                              ? 'border-[#2C2723] bg-[#2C2723] text-[#FAF8F5] shadow-xs'
                              : 'border-[#D9CFBF] bg-white hover:border-[#8A7F73] text-[#2C2723]'
                          }`}
                        >
                          <div className="font-medium text-xs sm:text-sm">{item.label}</div>
                          <div className={`text-[10px] mt-0.5 ${furnitureType === item.label ? 'text-[#E8DCC4]' : 'text-[#7A6F64]'}`}>
                            {item.sub}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {furnitureType === 'Other' && (
                    <div>
                      <label className="block text-xs font-medium text-[#4A4036] mb-1">
                        Describe the piece: <span className="text-[#C2410C]">*</span>
                      </label>
                      <input
                        type="text"
                        value={customFurnitureType}
                        onChange={(e) => setCustomFurnitureType(e.target.value)}
                        placeholder="e.g. Victorian bedroom nursing chair with brass castors"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                      />
                    </div>
                  )}

                  {/* Required Work Checklist */}
                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1.5">
                      Scope of Work Desired (Select all that apply):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Complete Re-covering (New Fabric)',
                        'New Cushion Foam / Padding',
                        'Spring & Webbing Repair',
                        'Deep Buttoning / Tufting',
                        'Wood Frame Repair & Polishing'
                      ].map((req) => (
                        <label
                          key={req}
                          onClick={() => toggleRestorationNeed(req)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md border text-xs cursor-pointer transition-colors ${
                            restorationNeeds.includes(req)
                              ? 'bg-[#F4EFE6] border-[#2C2723] text-[#1F1B18] font-medium'
                              : 'bg-white border-[#E0D7C9] text-[#5E5248] hover:border-[#B8AA96]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={restorationNeeds.includes(req)}
                            onChange={() => {}}
                            className="rounded border-[#B8AA96] text-[#2C2723]"
                          />
                          <span>{req}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Approximate Dimensions */}
                  <div className="bg-[#F6F2EB] p-3.5 rounded-lg border border-[#E0D7C9] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#4A4036]">
                        Approximate Dimensions (Optional):
                      </span>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1 text-[11px] text-[#4A4036] cursor-pointer">
                          <input
                            type="radio"
                            name="unit"
                            checked={dimensions.unit === 'cm'}
                            onChange={() => setDimensions({ ...dimensions, unit: 'cm' })}
                            className="text-[#2C2723]"
                          />
                          <span>cm</span>
                        </label>
                        <label className="inline-flex items-center gap-1 text-[11px] text-[#4A4036] cursor-pointer">
                          <input
                            type="radio"
                            name="unit"
                            checked={dimensions.unit === 'inches'}
                            onChange={() => setDimensions({ ...dimensions, unit: 'inches' })}
                            className="text-[#2C2723]"
                          />
                          <span>inches</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <input
                          type="text"
                          value={dimensions.width}
                          disabled={dimensions.unknownDimensions}
                          onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                          placeholder={`Width (${dimensions.unit})`}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D0C5B4] rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={dimensions.height}
                          disabled={dimensions.unknownDimensions}
                          onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                          placeholder={`Height (${dimensions.unit})`}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D0C5B4] rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={dimensions.depth}
                          disabled={dimensions.unknownDimensions}
                          onChange={(e) => setDimensions({ ...dimensions, depth: e.target.value })}
                          placeholder={`Depth (${dimensions.unit})`}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D0C5B4] rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 text-[11px] text-[#5E5248] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dimensions.unknownDimensions}
                        onChange={(e) => setDimensions({ ...dimensions, unknownDimensions: e.target.checked })}
                        className="rounded border-[#B8AA96] text-[#2C2723]"
                      />
                      <span>I'm not sure of dimensions (estimate from photos)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: PHOTOS & FABRIC PREFERENCES ================= */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-[#E8DCC4] pb-3">
                    <h4 className="font-serif text-xl text-[#1F1B18]">2. Photographs & Fabric</h4>
                    <p className="text-xs text-[#7A6F64] mt-0.5">
                      Photos help us evaluate internal construction, spring tension, and fabric meterage.
                    </p>
                  </div>

                  {/* Photo Upload Area */}
                  <div className="space-y-3">
                    <div className="bg-[#F5EFE6] border border-dashed border-[#B8AA96] rounded-lg p-4 sm:p-5 text-center">
                      <Upload className="w-6 h-6 text-[#7A6F64] mx-auto mb-1.5" />
                      <p className="text-xs font-medium text-[#2C2723]">
                        Upload photos of your furniture piece
                      </p>
                      <p className="text-[11px] text-[#7A6F64] mt-0.5 mb-2.5">
                        Helpful angles: Front view, side profile, underside or close-up of worn areas.
                      </p>
                      
                      <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2C2723] text-[#FAF8F5] text-xs font-medium rounded-md hover:bg-[#1A1715] cursor-pointer transition-colors shadow-xs">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Add Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Photo Previews */}
                    {photos.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-medium text-[#4A4036]">
                          Attached Images ({photos.length}):
                        </span>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {photos.map((url, idx) => (
                            <div key={idx} className="relative group aspect-square rounded-md overflow-hidden border border-[#D0C5B4] bg-[#EAE3D5]">
                              <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-black transition-colors"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 p-2.5 bg-[#FAF0E6]/80 rounded border border-[#E8DCC4] text-[11px] text-[#6B5E51]">
                      <Info className="w-3.5 h-3.5 shrink-0 text-[#8B6B48]" />
                      <span>
                        <strong>No photos right now?</strong> You can still submit and reply with photos to our email.
                      </span>
                    </div>
                  </div>

                  {/* Fabric Preferences */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[#4A4036]">
                      Fabric & Material Direction:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'wants_recommendations', label: 'Recommend Fabrics & Swatches', desc: 'Curated British wools, bouclés, velvets or linens' },
                        { id: 'knows_style', label: 'I know the colour/style I want', desc: 'e.g. Terracotta wool, olive velvet, floral print' },
                        { id: 'has_fabric', label: "I have my own fabric (COM)", desc: "We'll check yardage & UK Fire Safety (BS 5852)" },
                        { id: 'not_sure', label: "I'm not sure yet", desc: 'We will send sample swatches to your home' }
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          onClick={() => setFabricPreference(opt.id as any)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                            fabricPreference === opt.id
                              ? 'border-[#2C2723] bg-[#F4EFE6] shadow-xs'
                              : 'border-[#E0D7C9] bg-white hover:border-[#B8AA96]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="fabricPref"
                            checked={fabricPreference === opt.id}
                            onChange={() => setFabricPreference(opt.id as any)}
                            className="mt-0.5 text-[#2C2723]"
                          />
                          <div>
                            <div className="text-xs font-semibold text-[#1F1B18]">{opt.label}</div>
                            <div className="text-[10px] text-[#7A6F64] leading-tight mt-0.5">{opt.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1">
                      Colour, Texture or Lifestyle Considerations:
                    </label>
                    <input
                      type="text"
                      value={fabricNotes}
                      onChange={(e) => setFabricNotes(e.target.value)}
                      placeholder="e.g. Pet-friendly bouclé, stain-resistant velvet, sage green or ochre tone"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                    />
                  </div>
                </div>
              )}

              {/* ================= STEP 3: CONSULTATIONS & BUDGET ================= */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="border-b border-[#E8DCC4] pb-3">
                    <h4 className="font-serif text-xl text-[#1F1B18]">3. Artisan Guidance & Budget</h4>
                    <p className="text-xs text-[#7A6F64] mt-0.5">
                      Tailor your quote with complimentary advice from our workshop.
                    </p>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1">
                      Specific Requests & Restoration Vision:
                    </label>
                    <textarea
                      rows={3}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Tell us any special wishes (e.g. 'The seat springs sag', 'Sanded oak legs', 'Matching contrast piping', 'Heirloom preservation')..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723] leading-relaxed"
                    />
                  </div>

                  {/* Complimentary Advice */}
                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1.5">
                      Complimentary Consultations (Included Free):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { key: 'fabricAdvice', label: 'Fabric Swatches & Durability Advice' },
                        { key: 'colourAdvice', label: 'Colour Palette & Room Styling Advice' },
                        { key: 'structuralAdvice', label: 'Timber Frame & Spring Assessment' },
                        { key: 'measuringAdvice', label: 'Doorway Clearance & Sizing Advice' }
                      ].map((item) => (
                        <label
                          key={item.key}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors text-xs ${
                            (consultations as any)[item.key]
                              ? 'bg-[#F4EFE6] border-[#2C2723] text-[#1F1B18] font-medium'
                              : 'bg-white border-[#E0D7C9] text-[#5E5248] hover:border-[#B8AA96]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={(consultations as any)[item.key]}
                            onChange={(e) => setConsultations({
                              ...consultations,
                              [item.key]: e.target.checked
                            })}
                            className="rounded border-[#B8AA96] text-[#2C2723]"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Target Budget Guide */}
                  <div>
                    <label className="block text-xs font-medium text-[#4A4036] mb-1.5">
                      Approximate Target Budget (Optional):
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {['Under £300', '£300–£600', '£600–£1,000', '£1,000–£2,000', '£2,000+', 'Need Advice'].map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setBudgetRange(range)}
                          className={`py-2 px-2 text-[11px] rounded-md border font-sans text-center transition-all cursor-pointer ${
                            budgetRange === range
                              ? 'border-[#2C2723] bg-[#2C2723] text-[#FAF8F5] font-medium'
                              : 'border-[#D9CFBF] bg-white text-[#4A4036] hover:border-[#8A7F73]'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 4: CONTACT & LOCATION ================= */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="border-b border-[#E8DCC4] pb-3">
                    <h4 className="font-serif text-xl text-[#1F1B18]">4. Contact & Delivery Details</h4>
                    <p className="text-xs text-[#7A6F64] mt-0.5">
                      Where should we send your itemised estimate and discuss delivery options?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-[#4A4036] mb-1">
                        Your Full Name <span className="text-[#C2410C]">*</span>
                      </label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="e.g. Rachel Adams"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#4A4036] mb-1">
                        Email Address <span className="text-[#C2410C]">*</span>
                      </label>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="e.g. rachel@example.co.uk"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                        required
                      />
                      <span className="text-[10px] text-[#7A6F64]">Your quotation will be sent here.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#4A4036] mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={contact.telephone}
                        onChange={(e) => setContact({ ...contact, telephone: e.target.value })}
                        placeholder="e.g. 07700 900842"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                      />
                      <span className="text-[10px] text-[#7A6F64]">Used if you prefer a phone consultation.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#4A4036] mb-1">
                        Town / Postcode (UK) <span className="text-[#C2410C]">*</span>
                      </label>
                      <input
                        type="text"
                        value={contact.townPostcode}
                        onChange={(e) => setContact({ ...contact, townPostcode: e.target.value })}
                        placeholder="e.g. Richmond, TW9 or W4"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D0C5B4] rounded-md focus:outline-none focus:ring-1 focus:ring-[#2C2723]"
                        required
                      />
                      <span className="text-[10px] text-[#7A6F64]">Calculates collection / delivery options.</span>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#F3EFEA] p-3.5 rounded-lg border border-[#E0D7C9] text-xs text-[#4A4036] space-y-1">
                    <div className="font-semibold text-[#1F1B18]">Request Summary:</div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6F64]">Piece:</span>
                      <span className="font-medium text-[#1F1B18]">
                        {furnitureType === 'Other' ? customFurnitureType || 'Custom Piece' : furnitureType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6F64]">Fabric Direction:</span>
                      <span className="font-medium text-[#1F1B18] capitalize">
                        {fabricPreference.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6F64]">Photos:</span>
                      <span className="font-medium text-[#1F1B18]">{photos.length} attached</span>
                    </div>
                  </div>

                  {/* UK GDPR Consent */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2 text-xs text-[#5E5248] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-0.5 rounded border-[#B8AA96] text-[#2C2723]"
                        required
                      />
                      <span>
                        I consent to {settings.businessName} securely holding my contact details and photos to prepare an upholstery estimate in accordance with UK GDPR.
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!isSubmitted && (
          <div className="bg-[#FAF8F5] px-5 sm:px-6 py-3.5 border-t border-[#E0D7C9] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#4A4036] hover:text-[#1F1B18] bg-[#EFE9DF] hover:bg-[#E5DDCF] rounded-md transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-[#7A6F64] hover:text-[#1F1B18] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              id="quote-modal-submit-next-btn"
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2723] hover:bg-[#1A1715] text-[#FAF8F5] text-xs font-medium rounded-md shadow-xs transition-all hover:shadow cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Preparing Estimate...</span>
              ) : currentStep === totalSteps ? (
                <>
                  <span>Submit Quote Request</span>
                  <Check className="w-3.5 h-3.5 text-[#E8DCC4]" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8DCC4]" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
