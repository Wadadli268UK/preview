import { NavPage } from '../context/AppContext';
import { Product, SiteSettings, FAQItem } from '../types';
import { getDirectImageUrl } from './imageUtils';

export interface PageSEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  ogType: 'website' | 'article' | 'product';
  image: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  breadcrumbs: Array<{ name: string; path: string }>;
}

export const BASE_PRODUCTION_DOMAIN = 'https://www.wedgburyfurnishings.co.uk';

export const STATIC_ROUTE_SEO: Record<Exclude<NavPage, 'product-detail'>, PageSEOConfig> = {
  home: {
    title: 'Wedgbury Furnishings | Handmade British Furnishings & Bespoke Upholstery',
    description: 'UK artisan studio specialising in handcrafted footstools, cushions, restored preloved furniture, and bespoke upholstery services. Discover unique one-off pieces.',
    canonicalPath: '/',
    robots: 'index, follow',
    ogType: 'website',
    image: '/images/made_to_order_hero.png',
    primaryKeywords: [
      'handmade furnishings UK',
      'bespoke upholstery',
      'handcrafted footstools',
      'furniture restoration UK',
      'Wedgbury Furnishings'
    ],
    secondaryKeywords: [
      'small collection furnishings',
      'boucle footstool',
      'vintage chair reupholstery',
      'artisanal British seating',
      'bespoke pouffes'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' }
    ]
  },
  shop: {
    title: 'Shop Handmade Furnishings & Footstools | Wedgbury Furnishings',
    description: 'Explore our limited collection of handmade footstools, statement cushions, and restored vintage seating. One-of-a-kind pieces crafted with luxury British textiles.',
    canonicalPath: '/shop',
    robots: 'index, follow',
    ogType: 'website',
    image: '/images/velvet_scatter_cushions.jpg',
    primaryKeywords: [
      'buy handmade footstools UK',
      'artisanal cushions',
      'restored vintage chairs',
      'luxury pet chaise',
      'handcrafted furniture collection'
    ],
    secondaryKeywords: [
      'wool footstool Yorkshire',
      'velvet scatter cushions',
      'turned leg footstool',
      'designer pouffes UK',
      'one-of-a-kind furnishings'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Shop Collection', path: '/shop' }
    ]
  },
  'made-to-order': {
    title: 'Made to Order & Custom Sizing | Wedgbury Furnishings',
    description: 'Commission custom-sized footstools, fluted benches, and pouffes tailored to your exact living space. Choose bespoke dimensions, timber legs, and luxury fabrics.',
    canonicalPath: '/made-to-order',
    robots: 'index, follow',
    ogType: 'website',
    image: '/images/bespoke_fluted_bench.jpg',
    primaryKeywords: [
      'made to order furniture UK',
      'custom footstools',
      'bespoke pouffe sizing',
      'tailored upholstery bench',
      'custom furniture commissions'
    ],
    secondaryKeywords: [
      'fluted bench bespoke',
      'custom ottoman living room',
      'made to order seating UK',
      'turned brass casters furniture',
      'bespoke wool footstool'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Made to Order', path: '/made-to-order' }
    ]
  },
  upholstery: {
    title: 'Bespoke Re-Upholstery & Restoration Services | Wedgbury Furnishings',
    description: 'Specialist furniture reupholstery and restoration in the UK. Breathe new life into cherished armchairs, chaises, and dining seating with artisan craft and luxury textiles.',
    canonicalPath: '/re-upholstery',
    robots: 'index, follow',
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
    primaryKeywords: [
      'bespoke reupholstery UK',
      'furniture restoration service',
      'antique armchair reupholstery',
      'chaise longue restoration',
      're-upholstery quotes UK'
    ],
    secondaryKeywords: [
      'traditional upholstery craft',
      'spring tying and horsehair restoration',
      'Abraham Moon wool upholstery',
      'Designers Guild velvet recovering',
      'sustainable furniture revival'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Re-Upholstery Services', path: '/re-upholstery' }
    ]
  },
  portfolio: {
    title: 'Before & After Upholstery Portfolio | Wedgbury Furnishings',
    description: 'View our before-and-after reupholstery portfolio. See antique chaises, mid-century armchairs, and dining sets transformed by Wedgbury Furnishings.',
    canonicalPath: '/portfolio',
    robots: 'index, follow',
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80',
    primaryKeywords: [
      'upholstery before and after',
      'furniture restoration portfolio',
      'chair reupholstery gallery',
      'antique chaise restoration UK',
      'furniture transformation case studies'
    ],
    secondaryKeywords: [
      'mid-century teak chair restoration',
      'deep buttoning examples',
      'vintage seating revival',
      'bespoke reupholstery pictures'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Portfolio', path: '/portfolio' }
    ]
  },
  about: {
    title: 'Our Story & Workshop Craftsmanship | Wedgbury Furnishings',
    description: 'Discover the story behind Wedgbury Furnishings. Dedicated to thoughtful craftsmanship, sustainable restoration, and small collections of handmade British furnishings.',
    canonicalPath: '/about',
    robots: 'index, follow',
    ogType: 'website',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    primaryKeywords: [
      'artisan upholstery studio UK',
      'handmade furniture maker',
      'sustainable furniture restoration',
      'British craft workshop',
      'Wedgbury Furnishings story'
    ],
    secondaryKeywords: [
      'small collection maker',
      'traditional upholstery values',
      'slow furniture craftsmanship',
      'heritage fabrics UK'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Story', path: '/about' }
    ]
  },
  faq: {
    title: 'Frequently Asked Questions & Delivery | Wedgbury Furnishings',
    description: 'Find answers to common questions about our handmade furnishings, bespoke upholstery commissions, fabric options, lead times, and UK delivery.',
    canonicalPath: '/faq',
    robots: 'index, follow',
    ogType: 'website',
    image: '/images/made_to_order_hero.png',
    primaryKeywords: [
      'furniture delivery UK',
      'upholstery lead times',
      'bespoke furniture FAQ',
      'fabric swatches ordering',
      'upholstery price guidelines'
    ],
    secondaryKeywords: [
      'custom furniture ordering questions',
      'how to request upholstery quote',
      'handcrafted furniture care advice'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'FAQ & Delivery', path: '/faq' }
    ]
  },
  contact: {
    title: 'Contact Us & Request a Quote | Wedgbury Furnishings',
    description: 'Get in touch with Wedgbury Furnishings. Send photos of your furniture for a complimentary reupholstery quote or enquire about our bespoke handmade collections.',
    canonicalPath: '/contact',
    robots: 'index, follow',
    ogType: 'website',
    image: '/images/made_to_order_hero.png',
    primaryKeywords: [
      'contact upholstery studio',
      'upholstery quote UK',
      'furniture restoration enquiry',
      'Wedgbury Furnishings contact',
      'send chair photos for quote'
    ],
    secondaryKeywords: [
      'custom furniture maker contact',
      'bespoke upholstery consultation',
      'UK furniture maker email'
    ],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact & Enquiries', path: '/contact' }
    ]
  },
  privacy: {
    title: 'Privacy Policy (UK GDPR) | Wedgbury Furnishings',
    description: 'How Wedgbury Furnishings collects, uses, and safeguards your personal information in strict accordance with the UK Data Protection Act and UK GDPR.',
    canonicalPath: '/privacy-policy',
    robots: 'index, follow',
    ogType: 'article',
    image: '/images/made_to_order_hero.png',
    primaryKeywords: ['Wedgbury Furnishings privacy policy', 'UK GDPR compliance'],
    secondaryKeywords: ['data protection policy'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy-policy' }
    ]
  },
  cookies: {
    title: 'Cookie Policy | Wedgbury Furnishings',
    description: 'Information regarding the essential, analytical, and preference cookies used on the Wedgbury Furnishings website.',
    canonicalPath: '/cookie-policy',
    robots: 'index, follow',
    ogType: 'article',
    image: '/images/made_to_order_hero.png',
    primaryKeywords: ['Wedgbury Furnishings cookie policy', 'cookie preferences'],
    secondaryKeywords: ['website cookies information'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Cookie Policy', path: '/cookie-policy' }
    ]
  },
  terms: {
    title: 'Terms of Sale & Bespoke Agreement | Wedgbury Furnishings',
    description: 'Read the terms of sale, bespoke commission policies, payment schedules, UK delivery conditions, and returns for Wedgbury Furnishings.',
    canonicalPath: '/terms-of-sale',
    robots: 'index, follow',
    ogType: 'article',
    image: '/images/made_to_order_hero.png',
    primaryKeywords: ['Wedgbury Furnishings terms of sale', 'bespoke furniture commission terms'],
    secondaryKeywords: ['custom upholstery agreement terms'],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Sale', path: '/terms-of-sale' }
    ]
  },
  admin: {
    title: 'Studio CMS Dashboard | Wedgbury Furnishings',
    description: 'Wedgbury Furnishings administrative management portal.',
    canonicalPath: '/admin5813',
    robots: 'noindex, nofollow',
    ogType: 'website',
    image: '/images/made_to_order_hero.png',
    primaryKeywords: [],
    secondaryKeywords: [],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Studio Admin', path: '/admin5813' }
    ]
  }
};

/**
 * Resolves full canonical URL using current origin or production fallback
 */
export function resolveCanonicalUrl(path: string, customDomain?: string): string {
  const base = customDomain || (typeof window !== 'undefined' && window.location.origin ? window.location.origin : BASE_PRODUCTION_DOMAIN);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base.replace(/\/+$/, '')}${cleanPath}`;
}

/**
 * Resolves full public image URL
 */
export function resolveImageUrl(imgUrl: string, customDomain?: string): string {
  if (!imgUrl) return `${BASE_PRODUCTION_DOMAIN}/images/made_to_order_hero.png`;
  if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
    return getDirectImageUrl(imgUrl);
  }
  const base = customDomain || (typeof window !== 'undefined' && window.location.origin ? window.location.origin : BASE_PRODUCTION_DOMAIN);
  const cleanImg = imgUrl.startsWith('/') ? imgUrl : `/${imgUrl}`;
  return `${base.replace(/\/+$/, '')}${cleanImg}`;
}

/**
 * Get page SEO config dynamically based on current page and active product
 */
export function getPageSEO(
  page: NavPage,
  product?: Product | null,
  settings?: SiteSettings
): PageSEOConfig {
  const brand = settings?.businessName ? `${settings.businessName} Furnishings` : 'Wedgbury Furnishings';

  if (page === 'product-detail' && product) {
    const rawTitle = `${product.title} | Handcrafted Furnishings | ${brand}`;
    const truncatedTitle = rawTitle.length > 60 ? `${product.title} | ${brand}` : rawTitle;
    const descSubtitle = product.subtitle ? `${product.subtitle}. ` : '';
    const fabricInfo = product.fabric || product.fabricAndWeave;
    const descFabric = fabricInfo ? `Crafted with ${fabricInfo}. ` : '';
    const desc = `${descSubtitle}${descFabric}Handmade by ${brand} with luxury British textiles. Dimensions & ordering details.`.trim();

    return {
      title: truncatedTitle,
      description: desc.length > 160 ? desc.substring(0, 157) + '...' : desc,
      canonicalPath: `/shop/${encodeURIComponent(product.id)}`,
      robots: 'index, follow',
      ogType: 'product',
      image: product.images[0] || '/images/made_to_order_hero.png',
      primaryKeywords: [
        product.title,
        `${product.category} UK`,
        'handmade footstool',
        brand,
        'artisan British furniture'
      ],
      secondaryKeywords: [
        product.subtitle || 'handcrafted furniture',
        fabricInfo || 'luxury fabric',
        'bespoke upholstery UK'
      ],
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Shop Collection', path: '/shop' },
        { name: product.title, path: `/shop/${encodeURIComponent(product.id)}` }
      ]
    };
  }

  const staticConfig = STATIC_ROUTE_SEO[page as Exclude<NavPage, 'product-detail'>] || STATIC_ROUTE_SEO.home;

  // If settings have custom hero heading or business name, adapt gently without keyword degradation
  return {
    ...staticConfig,
    title: staticConfig.title.replace('Wedgbury Furnishings', brand)
  };
}

/**
 * Generate Schema.org JSON-LD structured data graph for the given page context
 */
export function generateSchemaGraph(
  page: NavPage,
  seo: PageSEOConfig,
  context: {
    settings: SiteSettings;
    product?: Product | null;
    faqs?: FAQItem[];
    origin?: string;
  }
): object[] {
  const domain = context.settings.canonicalDomain || context.origin || BASE_PRODUCTION_DOMAIN;
  const brandName = context.settings.businessName ? `${context.settings.businessName} Furnishings` : 'Wedgbury Furnishings';
  const logoUrl = resolveImageUrl(context.settings.logoUrl || '/favicon.png', domain);
  const heroImgUrl = resolveImageUrl(context.settings.heroBannerUrl || '/images/made_to_order_hero.png', domain);
  const currentCanonical = resolveCanonicalUrl(seo.canonicalPath, domain);

  // 1. Organization & LocalBusiness
  const businessSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'FurnitureStore'],
    '@id': `${domain}/#organization`,
    name: brandName,
    legalName: brandName,
    url: domain,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl
    },
    image: heroImgUrl,
    description: context.settings.tagline 
      ? `${context.settings.tagline}. British artisan studio specialising in handcrafted footstools, cushions, and bespoke furniture restoration.`
      : 'British artisan studio specialising in handcrafted footstools, cushions, and bespoke furniture restoration.',
    telephone: context.settings.phone || '+44 7700 900842',
    email: context.settings.email || 'wedgburyfurnishings@gmail.com',
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Credit Card, Debit Card, Bank Transfer, PayPal',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'West Midlands'
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Kingdom'
      }
    ],
    sameAs: [
      context.settings.etsyShopUrl || 'https://wedgburyfurnishings.etsy.com/',
      `https://instagram.com/${(context.settings.instagramHandle || 'wedgbury_furnishings').replace('@', '')}`
    ].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Artisan Furnishings & Upholstery Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bespoke Furniture Re-Upholstery & Restoration'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Handcrafted British Footstools & Pouffes'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Artisan Decorative Scatter Cushions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Luxury Pet Chaise Lounges'
          }
        }
      ]
    }
  };

  // 2. WebSite with potential action
  const websiteSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    name: brandName,
    url: domain,
    inLanguage: 'en-GB',
    publisher: {
      '@id': `${domain}/#organization`
    }
  };

  // 3. BreadcrumbList for this page
  const breadcrumbSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: seo.breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: resolveCanonicalUrl(crumb.path, domain)
    }))
  };

  const schemas: object[] = [businessSchema, websiteSchema, breadcrumbSchema];

  // 4. Page-specific schemas
  if (page === 'faq' && context.faqs && context.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: context.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  if (page === 'product-detail' && context.product) {
    const p = context.product;
    const prodImg = p.images && p.images[0] ? resolveImageUrl(p.images[0], domain) : heroImgUrl;
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.title,
      image: prodImg,
      description: `${p.subtitle ? p.subtitle + '. ' : ''}${p.description || ''}`.trim(),
      sku: p.id,
      brand: {
        '@type': 'Brand',
        name: brandName
      },
      category: p.category,
      offers: {
        '@type': 'Offer',
        price: p.price,
        priceCurrency: 'GBP',
        availability: p.isActive !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: currentCanonical,
        seller: {
          '@type': 'Organization',
          name: brandName
        }
      }
    });
  }

  if (page === 'upholstery') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Bespoke Furniture Re-Upholstery & Restoration',
      serviceType: 'Upholstery & Antique Restoration',
      provider: {
        '@id': `${domain}/#organization`
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom'
      },
      description: context.settings.upholsteryHeroSubheading || 'Specialist furniture reupholstery and restoration. Traditional techniques, modern comfort fillings, and luxury British textiles.',
      url: currentCanonical
    });
  }

  if (page === 'made-to-order') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Made to Order & Custom Furniture Crafting',
      serviceType: 'Custom Furniture Making',
      provider: {
        '@id': `${domain}/#organization`
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom'
      },
      description: 'Custom sizing, curated British textiles, and tailored leg finishes for bespoke footstools, fluted benches, and ottomans.',
      url: currentCanonical
    });
  }

  if (page === 'about') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${brandName}`,
      description: 'Our story, sustainable furniture restoration values, and small-batch craftsmanship in the United Kingdom.',
      url: currentCanonical,
      mainEntity: {
        '@id': `${domain}/#organization`
      }
    });
  }

  if (page === 'contact') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Contact ${brandName}`,
      description: 'Contact our UK workshop for bespoke upholstery quotes, fabric advice, and made-to-order furniture enquiries.',
      url: currentCanonical,
      mainEntity: {
        '@id': `${domain}/#organization`
      }
    });
  }

  return schemas;
}
