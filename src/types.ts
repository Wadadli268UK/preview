export type ProductCategory = 
  | 'footstools'
  | 'pouffes'
  | 'cushions'
  | 'pet_furniture'
  | 'preloved_restored'
  | 'occasional_seating';

export type ProductAvailability = 
  | 'available'
  | 'sold'
  | 'made_to_order'
  | 'one_of_one'
  | 'coming_soon';

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  category: ProductCategory;
  price: number;
  currency: string;
  availability: ProductAvailability;
  images: string[];
  description: string;
  story?: string;
  storyBehindThePiece?: string;
  specificationsAndDimensions?: string;
  dimensions?: {
    width?: string;
    height?: string;
    depth?: string;
    weight?: string;
  };
  materials?: string[];
  materialsUsed?: string[];
  fabric?: string;
  fabricAndWeave?: string;
  colour?: string;
  colourPalette?: string;
  style?: string;
  finish?: string;
  timberFinish?: string;
  marketplace: 'etsy' | 'direct' | 'other';
  marketplaceUrl: string;
  featured: boolean;
  isActive?: boolean;
  isPastUpholstery?: boolean;
  leadTime?: string;
  sku?: string;
  slug?: string;
  createdAt: string;
}

export interface MadeToOrderProduct {
  id: string;
  productName: string;
  productDescription: string;
  productCode: string;
  size: string;
  finishedDimensions: string;
  legOptions: string;
  isActive: boolean;
  imageUrl?: string;
  images?: string[];
  startingPrice?: string;
  price?: number;
  leadTime?: string;
  category?: string;
  createdAt?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  furnitureType: string;
  beforeImage: string;
  afterImage: string;
  additionalImages?: string[];
  shortStory: string;
  workCompleted: string[];
  fabricUsed: string;
  clientLocation?: string;
  testimonial?: {
    quote: string;
    author: string;
    location: string;
    rating?: number;
  };
  featured: boolean;
}

export type EnquiryStatus = 
  | 'new'
  | 'contacted'
  | 'quote_sent'
  | 'accepted'
  | 'completed'
  | 'closed';

export interface UpholsteryEnquiry {
  id: string;
  submittedAt: string;
  status: EnquiryStatus;
  customer: {
    name: string;
    email: string;
    telephone: string;
    townPostcode: string;
  };
  furnitureType: string;
  customFurnitureType?: string;
  photos: string[];
  dimensions: {
    width?: string;
    height?: string;
    depth?: string;
    unit: 'cm' | 'inches';
    unknownDimensions: boolean;
    needsHelpMeasuring: boolean;
  };
  fabricPreference: 'has_fabric' | 'knows_style' | 'wants_recommendations' | 'not_sure';
  fabricNotes?: string;
  projectDetails: string;
  consultationRequests: {
    fabricAdvice: boolean;
    colourAdvice: boolean;
    measuringAdvice: boolean;
    structuralAdvice: boolean;
    generalConsultation: boolean;
  };
  budgetRange?: string;
  adminNotes?: string;
}

export interface FAQItem {
  id: string;
  category: 'delivery' | 'upholstery' | 'fabric' | 'purchasing' | 'care';
  question: string;
  answer: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroButtonText?: string;
  logoUrl?: string;
  footerLogoUrl?: string;
  heroBannerUrl?: string;
  madeToOrderHeroUrl?: string;
  ourStoryHeroImageUrl?: string;
  artisanName: string;
  artisanRole?: string;
  artisanBio?: string;
  aboutStory?: string;
  aboutStoryP2?: string;
  aboutStoryP3?: string;
  location: string;
  workshopAddress?: string;
  openingHours?: string;
  etsyShopUrl: string;
  email: string;
  phone: string;
  instagramHandle: string;
  announcementText: string;
  showAnnouncement: boolean;
  deliveryNotice: string;
  upholsteryHeroHeading?: string;
  upholsteryHeroSubheading?: string;
  upholsteryHeroBeforeImage?: string;
  upholsteryHeroAfterImage?: string;
  upholsteryHeroBeforeLabel?: string;
  upholsteryHeroAfterLabel?: string;
  pastUpholsteryHeading?: string;
  pastUpholsterySubheading?: string;
  showPastUpholsteryCarousel?: boolean;
  pastUpholsteryBgColor?: 'dark' | 'cream' | 'linen';
  upholsteryFabricEyebrow?: string;
  upholsteryFabricHeading?: string;
  upholsteryFabricDescription?: string;
  upholsteryFabricImageUrl?: string;
  upholsteryFabricButtonText?: string;
  upholsteryFabricItem1Title?: string;
  upholsteryFabricItem1Desc?: string;
  upholsteryFabricItem2Title?: string;
  upholsteryFabricItem2Desc?: string;
  upholsteryFabricItem3Title?: string;
  upholsteryFabricItem3Desc?: string;
  upholsteryFabricItem4Title?: string;
  upholsteryFabricItem4Desc?: string;
  // Made-to-Order Section Customisation
  madeToOrderHeading?: string;
  madeToOrderSubheading?: string;
  madeToOrderDescription?: string;
  madeToOrderFeature1Title?: string;
  madeToOrderFeature1Desc?: string;
  madeToOrderFeature2Title?: string;
  madeToOrderFeature2Desc?: string;
  madeToOrderFeature3Title?: string;
  madeToOrderFeature3Desc?: string;
  madeToOrderImage1Url?: string;
  madeToOrderCard1Title?: string;
  madeToOrderCard1Desc?: string;
  madeToOrderImage2Url?: string;
  madeToOrderCard2Badge?: string;
  madeToOrderCard2Quote?: string;
  madeToOrderArchiveImg1?: string;
  madeToOrderArchiveImg2?: string;
  madeToOrderArchiveCard1Text?: string;
  madeToOrderArchiveCard2Text?: string;
  // SEO & Google Search Console Settings
  seoTitleSuffix?: string;
  metaDescription?: string;
  googleSiteVerification?: string;
  canonicalDomain?: string;
  // Past Upholstery Carousel Section Enhancement
  pastUpholsteryImageUrl?: string;
  pastUpholsteryBadge?: string;
  // Brand Story & Craftsmanship Section (Homepage)
  brandStoryEyebrow?: string;
  brandStoryHeading?: string;
  brandStorySubheading?: string;
  brandStoryParagraph1?: string;
  brandStoryParagraph2?: string;
  brandStoryImageUrl?: string;
  brandStoryQuote?: string;
  brandStoryQuoteAuthor?: string;
  brandStoryFeature1Title?: string;
  brandStoryFeature1Desc?: string;
  brandStoryFeature2Title?: string;
  brandStoryFeature2Desc?: string;
  // Considered Materials Section (About Page)
  materialsSectionEyebrow?: string;
  materialsSectionHeading?: string;
  materialsSectionDescription?: string;
  materialsSectionImageUrl?: string;
  materialsSectionItem1Title?: string;
  materialsSectionItem1Desc?: string;
  materialsSectionItem2Title?: string;
  materialsSectionItem2Desc?: string;
  materialsSectionItem3Title?: string;
  materialsSectionItem3Desc?: string;
  materialsSectionItem4Title?: string;
  materialsSectionItem4Desc?: string;
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  eventType: 'etsy_click' | 'quote_start' | 'quote_complete' | 'contact_submit' | 'phone_click' | 'email_click' | 'newsletter_signup' | 'product_view';
  label: string;
  metadata?: Record<string, any>;
}
