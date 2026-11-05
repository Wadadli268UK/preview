import { Product, MadeToOrderProduct, PortfolioProject, FAQItem, SiteSettings, UpholsteryEnquiry } from '../types';

export const initialSiteSettings: SiteSettings = {
  businessName: 'Wedgbury',
  tagline: 'Handmade Made-to-Order Furnishings & Bespoke Upholstery',
  heroHeading: 'Bespoke Made-to-Order Furnishings, tailored to your home.',
  heroSubheading: 'Handcrafted individually in our British studio. Customise signature footstools, fluted pouffes, deep ottomans, and pet chaise lounges in your choice of luxury textiles, timber finishes, and exact dimensions.',
  heroButtonText: 'Explore Made to Order',
  logoUrl: 'https://drive.google.com/file/d/1D4m6qFlY0wykyMFPVxmDWBERsp5igZfY/view?usp=sharing',
  footerLogoUrl: 'https://drive.google.com/file/d/1Cor-pdwk_IvOsbfEyCnLR7wVjhUq2Cel/view?usp=sharing',
  heroBannerUrl: 'https://drive.google.com/file/d/1J9Y-T07uS_YjPFfzJsqBPVrn52OK0OWE/view?usp=sharing',
  madeToOrderHeroUrl: '/images/made_to_order_hero.png',
  ourStoryHeroImageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85',
  artisanName: 'Wedgbury Furnishings',
  artisanRole: '',
  location: 'United Kingdom',
  etsyShopUrl: 'https://wedgburyfurnishings.etsy.com/',
  email: 'studio@wedgbury.co.uk',
  phone: '+44 (0) 7700 900 842',
  instagramHandle: '@wedgbury_furnishings',
  announcementText: 'Bespoke Made-to-Order Furnishings • Handcrafted in the UK • Tailored Sizing & Fabrics',
  showAnnouncement: true,
  deliveryNotice: 'Handmade pieces dispatched within 1–2 weeks. Bespoke and made-to-order lead times currently 3–5 weeks.',
  upholsteryHeroHeading: 'Bespoke upholstery for furniture with a story.',
  upholsteryHeroSubheading: 'Transform a loved chair, chaise, footstool or statement piece with a personal upholstery service designed around your furniture, your home and your style.',
  upholsteryHeroBeforeImage: 'https://drive.google.com/file/d/1k-j1DT5crE__Rr6n7PmGWMt3cz4Xuial/view?usp=drive_link',
  upholsteryHeroAfterImage: 'https://drive.google.com/file/d/1VfFYhG6R7k5QLx8-pUHHan-r2m9KFUmP/view?usp=drive_link',
  upholsteryHeroBeforeLabel: 'Before: Faded Antique Chaise',
  upholsteryHeroAfterLabel: 'After: Restored Velvet Transformation',
  pastUpholsteryHeading: 'Past Upholstery & Bespoke Restorations',
  pastUpholsterySubheading: 'A curated archive of bespoke commissions, one-of-a-kind vintage transformations, and handcrafted heritage seating.',
  showPastUpholsteryCarousel: true,
  pastUpholsteryBgColor: 'dark',
  upholsteryFabricEyebrow: 'Textile Sourcing',
  upholsteryFabricHeading: 'Curated British & European Fabrics',
  upholsteryFabricDescription: 'Choosing the right fabric is essential for both aesthetic harmony and long-term durability. We partner directly with premier textile houses to provide an extensive library of swatches:',
  upholsteryFabricImageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
  upholsteryFabricButtonText: 'Request Complimentary Fabric Swatches',
  upholsteryFabricItem1Title: 'Pure British Wool (Abraham Moon & Bute)',
  upholsteryFabricItem1Desc: 'Naturally fire-retardant, exceptionally hardwearing (50,000+ Martindale rubs), and thermoregulating.',
  upholsteryFabricItem2Title: 'Heavyweight Belgian & European Flax Linen',
  upholsteryFabricItem2Desc: 'Relaxed, breathable, tactile luxury that softens beautifully with age.',
  upholsteryFabricItem3Title: 'Cotton & Mohair Velvet (Designers Guild & Romo)',
  upholsteryFabricItem3Desc: 'Sumptuous lustre and deep light-reflecting richness for period armchairs and statement chaise lounges.',
  upholsteryFabricItem4Title: 'Pet-Friendly Stain-Resistant Bouclé (FibreGuard)',
  upholsteryFabricItem4Desc: 'Repels liquid spills, resists pet claws, and cleans easily with just water while retaining tactile softness.',
  madeToOrderHeading: 'Signature Silhouettes.',
  madeToOrderSubheading: 'Made to your exact room specifications.',
  madeToOrderDescription: "Choose one of our signature handcrafted silhouettes or enquire with bespoke dimensions. Tailor footstool lengths, pouffe heights, fabric houses and timber leg finishes to create a piece built specifically for your home.",
  madeToOrderFeature1Title: 'Custom Dimensions:',
  madeToOrderFeature1Desc: 'Tailor footstool lengths, pouffe heights or cushion profiles to fit your space perfectly.',
  madeToOrderFeature2Title: 'Curated Textiles:',
  madeToOrderFeature2Desc: 'Access premier British and European textile mills or enquire about sourcing specific fabrics.',
  madeToOrderFeature3Title: 'Timber & Leg Finishes:',
  madeToOrderFeature3Desc: 'Natural oak, dark walnut, turned brass casters or tapered mid-century legs.',
  madeToOrderImage1Url: '/images/made_to_order_hero.png',
  madeToOrderCard1Title: 'Bespoke Footstools & Pouffes',
  madeToOrderCard1Desc: 'Handmade geometric embroidery with artisan detailing.',
  madeToOrderImage2Url: '/images/bespoke_fluted_bench.jpg',
  madeToOrderCard2Badge: 'Bespoke Commission',
  madeToOrderCard2Quote: '"Tailored to our exact living room dimensions."',
  madeToOrderArchiveImg1: 'https://drive.google.com/file/d/13oEzOCwTfN9SJl2UYyejRD1P0uSM4hHM/view?usp=sharing',
  madeToOrderArchiveCard1Text: 'Curated Fabric & Swatches',
  madeToOrderArchiveImg2: '/images/bespoke_fabric_swatches.jpg',
  madeToOrderArchiveCard2Text: 'Luxury Cushions & Wools',
  seoTitleSuffix: 'Wedgbury Furnishings',
  canonicalDomain: 'https://www.wedgburyfurnishings.co.uk',
  googleSiteVerification: '',
  // Past Upholstery Section Enhancement
  pastUpholsteryImageUrl: '',
  pastUpholsteryBadge: 'Workshop Archive',
  // Brand Story & Craftsmanship Section (Homepage)
  brandStoryEyebrow: 'Craftsmanship & Philosophy',
  brandStoryHeading: 'Small scale. Thoughtfully made.',
  brandStorySubheading: 'Individually finished.',
  brandStoryParagraph1: 'Wedgbury is an independent British studio founded on respect for craft and enduring quality. We believe true luxury lies in the details you touch every day: hand-stitched piping, deep coil springs, solid timber frames and natural upholstery waddings.',
  brandStoryParagraph2: 'By working intentionally on a small scale, every furnishing receives unhurried attention to proportion, comfort and textile texture.',
  brandStoryImageUrl: '/images/velvet_scatter_cushions.jpg',
  brandStoryQuote: '"Chair cushions should feel thoughtfully crafted rather than ordinary — combining comfort, practicality and beautiful design to bring character to every seat."',
  brandStoryQuoteAuthor: 'Wedgbury Furnishings, Maker',
  brandStoryFeature1Title: 'Natural Materials',
  brandStoryFeature1Desc: 'Pure British wools, flax linens, natural fillings and solid timber hardwoods.',
  brandStoryFeature2Title: 'Circular Longevity',
  brandStoryFeature2Desc: 'Revitalising preloved timber frames to keep characterful furniture in use.',
  // Considered Materials Section (About Page)
  materialsSectionEyebrow: 'Considered Materials',
  materialsSectionHeading: 'Built with Respect for Materials',
  materialsSectionDescription: 'Our approach to sustainability is rooted in durability and conscious craft: restoring existing furniture where practical, working with preloved pieces, creating in small quantities and selecting quality materials that stand the test of time.',
  materialsSectionImageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
  materialsSectionItem1Title: 'High-End British & European Fabrics',
  materialsSectionItem1Desc: 'Pure wools, natural linens and hardwearing textured bouclés from reputable mills.',
  materialsSectionItem2Title: 'FSC-Certified Timber',
  materialsSectionItem2Desc: 'Internal structural frames for our handmade footstools use certified sustainably harvested hardwoods.',
  materialsSectionItem3Title: 'Natural Jute & Wadding',
  materialsSectionItem3Desc: 'Traditional vegetable fibre webbings, coir, and hypoallergenic waddings.',
  materialsSectionItem4Title: 'UK Fire Safety Compliance (BS 5852)',
  materialsSectionItem4Desc: 'All materials and domestic upholstery treatments fully adhere to UK safety regulations.'
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'The Bourton Turned-Leg Footstool',
    subtitle: 'Handmade in Yorkshire Wool Bouclé',
    category: 'footstools',
    price: 345,
    currency: '£',
    availability: 'available',
    images: [
      'https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'
    ],
    description: 'A generous handcrafted rectangular footstool featuring sustainable natural wool bouclé over a solid FSC-certified beech frame. Hand-sprung top with traditional jute webbing and turned English oak tapered legs finished with natural beeswax.',
    story: 'Built entirely in our studio, the Bourton footstool was designed as the ideal centrepiece for relaxed living spaces — comfortable enough to serve as an impromptu coffee table with a wooden tray, or as luxurious seating for gatherings.',
    storyBehindThePiece: 'Built entirely in our studio, the Bourton footstool was designed as the ideal centrepiece for relaxed living spaces — comfortable enough to serve as an impromptu coffee table with a wooden tray, or as luxurious seating for gatherings.',
    specificationsAndDimensions: 'W: 95 cm • D: 60 cm • H: 42 cm',
    dimensions: {
      width: '95 cm',
      depth: '60 cm',
      height: '42 cm',
      weight: '11.5 kg'
    },
    materials: [
      'Solid English Beech internal timber frame',
      'Yorkshire-woven 100% pure wool bouclé',
      'Hand-waxed solid oak turned legs',
      'Natural coconut coir and hypoallergenic British wool wadding'
    ],
    materialsUsed: [
      'Solid English Beech internal timber frame',
      'Yorkshire-woven 100% pure wool bouclé',
      'Hand-waxed solid oak turned legs',
      'Natural coconut coir and hypoallergenic British wool wadding'
    ],
    fabric: 'Moons Natural Heavyweight Wool Bouclé (Oatmeal)',
    fabricAndWeave: 'Moons Natural Heavyweight Wool Bouclé (Oatmeal)',
    colour: 'Warm Oatmeal & Natural Oak',
    colourPalette: 'Warm Oatmeal & Natural Oak',
    style: 'Modern Artisan Country',
    finish: 'Hand-rubbed natural beeswax',
    timberFinish: 'Hand-rubbed natural beeswax',
    marketplace: 'etsy',
    marketplaceUrl: 'https://wedgburyfurnishings.etsy.com/',
    featured: true,
    leadTime: 'In stock — dispatched within 3 business days',
    sku: 'AT-FT-001',
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-2',
    title: '1960s Danish Teak Accent Chair',
    subtitle: 'One-off Restored & Reimagined',
    category: 'preloved_restored',
    price: 680,
    currency: '£',
    availability: 'one_of_one',
    images: [
      'https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'
    ],
    description: 'An authentic mid-century Scandinavian teak armchair, completely stripped back to bare frame, re-glued, and oiled. Rebuilt from the foundation up with renewed Pirelli webbing, high-density reflex core, and reupholstered in textured Forest Moss wool blend.',
    story: 'Rescued from an estate in Sussex with worn vinyl, this rare Danish piece had magnificent sculptural lines hidden beneath neglected upholstery. Now restored to last another lifetime.',
    storyBehindThePiece: 'Rescued from an estate in Sussex with worn vinyl, this rare Danish piece had magnificent sculptural lines hidden beneath neglected upholstery. Now restored to last another lifetime.',
    specificationsAndDimensions: 'W: 68 cm • D: 74 cm • H: 78 cm',
    dimensions: {
      width: '68 cm',
      depth: '74 cm',
      height: '78 cm',
      weight: '14.0 kg'
    },
    materials: [
      'Restored Solid Teak frame with Danish oil finish',
      'Bute Fabrics Scottish Wool/Flax blend',
      'Renewed Pirelli rubber webbing system',
      'Reflex foam with feather-wrapped top cushion'
    ],
    materialsUsed: [
      'Restored Solid Teak frame with Danish oil finish',
      'Bute Fabrics Scottish Wool/Flax blend',
      'Renewed Pirelli rubber webbing system',
      'Reflex foam with feather-wrapped top cushion'
    ],
    fabric: 'Bute Isle Wool Blend (Forest Moss)',
    fabricAndWeave: 'Bute Isle Wool Blend (Forest Moss)',
    colour: 'Forest Moss & Rich Amber Teak',
    colourPalette: 'Forest Moss & Rich Amber Teak',
    style: 'Mid-Century Scandinavian',
    finish: 'Danish Teak Oil (Satin Sheen)',
    timberFinish: 'Danish Teak Oil (Satin Sheen)',
    marketplace: 'etsy',
    marketplaceUrl: 'https://wedgburyfurnishings.etsy.com/',
    featured: true,
    isPastUpholstery: true,
    leadTime: 'Unique single piece — Ready for immediate delivery',
    sku: 'AT-RST-042',
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-3',
    title: 'The Manor Pet Chaise Lounge',
    subtitle: 'Bespoke Luxury Seating for Dogs & Cats',
    category: 'pet_furniture',
    price: 295,
    currency: '£',
    availability: 'made_to_order',
    images: [
      'https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'
    ],
    description: 'An exquisitely scaled mini chaise lounge tailored for beloved pets. Crafted with human-grade upholstery standards: hardwood carcass, stain-resistant Belgian linen-velvet, and a removable, washable bolster cushion with orthopaedic foam foundation.',
    story: 'Designed after numerous requests from clients wanting pet beds that enhance rather than detract from a thoughtfully curated home interior.',
    storyBehindThePiece: 'Designed after numerous requests from clients wanting pet beds that enhance rather than detract from a thoughtfully curated home interior.',
    specificationsAndDimensions: 'W: 80 cm • D: 50 cm • H: 38 cm',
    dimensions: {
      width: '80 cm',
      depth: '50 cm',
      height: '38 cm (Seat height 18 cm)',
      weight: '7.8 kg'
    },
    materials: [
      'Stain-resistant FibreGuard velvet (scratch-resistant & washable)',
      'Orthopaedic human-grade memory foam seat core',
      'Turned walnut-stained hardwood feet with brass ferrules',
      'Removable zipped bolster cover'
    ],
    materialsUsed: [
      'Stain-resistant FibreGuard velvet (scratch-resistant & washable)',
      'Orthopaedic human-grade memory foam seat core',
      'Turned walnut-stained hardwood feet with brass ferrules',
      'Removable zipped bolster cover'
    ],
    fabric: 'FibreGuard Stain-Resistant Velvet (Deep Ochre)',
    fabricAndWeave: 'FibreGuard Stain-Resistant Velvet (Deep Ochre)',
    colour: 'Ochre Gold & Walnut',
    colourPalette: 'Ochre Gold & Walnut',
    style: 'Boutique Heritage',
    finish: 'Protective water & stain repellent finish',
    timberFinish: 'Protective water & stain repellent finish',
    marketplace: 'etsy',
    marketplaceUrl: 'https://wedgburyfurnishings.etsy.com/',
    featured: true,
    leadTime: 'Made to order — 3 weeks crafting time',
    sku: 'AT-PET-009',
    createdAt: '2026-02-10'
  },
  {
    id: 'prod-4',
    title: 'Round Fluted Ottoman Pouffe',
    subtitle: 'Hand-Pleated Rust Velvet with Brass Plinth',
    category: 'pouffes',
    price: 260,
    currency: '£',
    availability: 'available',
    images: [
      'https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'
    ],
    description: 'A sculptural cylindrical pouffe featuring tailored vertical pleating and an antiqued brass metal base plinth. Sturdy enough for extra guest seating or resting a book and cup of tea.',
    story: 'Each fluted fold is hand-pinned and stitched in our workshop, creating rich light-catching shadows across the cotton velvet pile.',
    storyBehindThePiece: 'Each fluted fold is hand-pinned and stitched in our workshop, creating rich light-catching shadows across the cotton velvet pile.',
    specificationsAndDimensions: 'W: 45 cm • D: 45 cm • H: 46 cm',
    dimensions: {
      width: '45 cm diameter',
      depth: '45 cm diameter',
      height: '46 cm',
      weight: '6.2 kg'
    },
    materials: [
      '100% Cotton heavy upholstery velvet',
      'Reinforced timber drum carcass',
      'Antiqued brushed brass recessed plinth base',
      'High-resilience supportive core'
    ],
    materialsUsed: [
      '100% Cotton heavy upholstery velvet',
      'Reinforced timber drum carcass',
      'Antiqued brushed brass recessed plinth base',
      'High-resilience supportive core'
    ],
    fabric: 'British Cotton Velvet (Terracotta Rust)',
    fabricAndWeave: 'British Cotton Velvet (Terracotta Rust)',
    colour: 'Terracotta Rust & Antiqued Brass',
    colourPalette: 'Terracotta Rust & Antiqued Brass',
    style: 'Contemporary Editorial',
    marketplace: 'etsy',
    marketplaceUrl: 'https://wedgburyfurnishings.etsy.com/',
    featured: true,
    leadTime: 'In stock — dispatched within 3 business days',
    sku: 'AT-PF-014',
    createdAt: '2026-02-14'
  },
  {
    id: 'prod-5',
    title: 'Handmade Botanical Linen Cushions (Pair)',
    subtitle: 'Hand-Screenprinted English Flora with Duck Feather Fillers',
    category: 'cushions',
    price: 110,
    currency: '£',
    availability: 'available',
    images: [
      'https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'
    ],
    description: 'Pair of artisanal 50x50cm cushions featuring hand-printed botanical block print on rustic unbleached heavyweight linen. Finished with bespoke self-piping, concealed brass zipper, and plump cruelty-free British duck feather pads.',
    story: 'Crafted using studio offcuts and artisan printed textiles to reduce textile waste while introducing tactile warmth to sofas and armchairs.',
    storyBehindThePiece: 'Crafted using studio offcuts and artisan printed textiles to reduce textile waste while introducing tactile warmth to sofas and armchairs.',
    specificationsAndDimensions: 'W: 50 cm • D: 18 cm • H: 50 cm',
    dimensions: {
      width: '50 cm',
      height: '50 cm',
      depth: '18 cm',
      weight: '1.4 kg per pair'
    },
    materials: [
      '100% Heavy European rustic flax linen',
      'Natural eco-dyes',
      'Concealed YKK brass zip closure',
      'Cruelty-free British duck feather pad inserts included'
    ],
    materialsUsed: [
      '100% Heavy European rustic flax linen',
      'Natural eco-dyes',
      'Concealed YKK brass zip closure',
      'Cruelty-free British duck feather pad inserts included'
    ],
    fabric: 'Block-Printed Artisan Linen (Sage & Natural)',
    fabricAndWeave: 'Block-Printed Artisan Linen (Sage & Natural)',
    colour: 'Sage Green, Olive & Unbleached Flax',
    colourPalette: 'Sage Green, Olive & Unbleached Flax',
    style: 'Artisan Country',
    marketplace: 'etsy',
    marketplaceUrl: 'https://wedgburyfurnishings.etsy.com/',
    featured: false,
    leadTime: 'In stock — 2-day dispatch',
    sku: 'AT-CSH-021',
    createdAt: '2026-02-18'
  },
  {
    id: 'prod-6',
    title: 'Victorian Buttoned Library Armchair',
    subtitle: 'Heritage Deep-Tufted Reupholstery in Indigo Wool',
    category: 'preloved_restored',
    price: 890,
    currency: '£',
    availability: 'sold',
    images: [
      'https://drive.google.com/file/d/1l1yxpWT0mDEdapQzy_nNaIjwcjxRAeu3/view?usp=drive_link'
    ],
    description: 'A late 19th-century mahogany library armchair fully restored with traditional diamond buttoning, individually hand-tied 8-way copper coil springs, and horsehair stuffing.',
    story: 'Inherited by a client and revitalised for modern life. While this specific piece has found its forever home, we regularly source similar Victorian and Edwardian frames for bespoke commissions.',
    storyBehindThePiece: 'Inherited by a client and revitalised for modern life. While this specific piece has found its forever home, we regularly source similar Victorian and Edwardian frames for bespoke commissions.',
    specificationsAndDimensions: 'W: 76 cm • D: 85 cm • H: 92 cm',
    dimensions: {
      width: '76 cm',
      depth: '85 cm',
      height: '92 cm',
      weight: '22 kg'
    },
    materials: [
      'Original Solid Mahogany Frame',
      'Abraham Moon Indigo Melange Wool',
      '8-Way Hand-Tied Copper Springs',
      'Traditional Horsehair & Calico'
    ],
    materialsUsed: [
      'Original Solid Mahogany Frame',
      'Abraham Moon Indigo Melange Wool',
      '8-Way Hand-Tied Copper Springs',
      'Traditional Horsehair & Calico'
    ],
    fabric: 'Melange Heritage Wool (Deep Indigo)',
    fabricAndWeave: 'Melange Heritage Wool (Deep Indigo)',
    colour: 'Deep Indigo Blue & Dark Mahogany',
    colourPalette: 'Deep Indigo Blue & Dark Mahogany',
    style: 'Heritage Traditional',
    finish: 'French Polished Mahogany legs on brass casters',
    timberFinish: 'French Polished Mahogany legs on brass casters',
    marketplace: 'etsy',
    marketplaceUrl: 'https://wedgburyfurnishings.etsy.com/',
    featured: true,
    isPastUpholstery: true,
    leadTime: 'Sold — Enquire to commission a similar piece',
    sku: 'AT-RST-038',
    createdAt: '2025-11-20'
  },
  {
    id: 'prod-7',
    title: '1950s Parker Knoll Wingback Restoration',
    subtitle: 'Restored & Reupholstered in British Mustard Wool',
    category: 'preloved_restored',
    price: 740,
    currency: '£',
    availability: 'sold',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a8245559a1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A mid-century Parker Knoll wing armchair stripped back to its beech bones, joints clamped and re-glued, with brand-new heavy gauge coil springing and tailored in Abraham Moon mustard wool.',
    story: 'Revived from an estate sale with broken springs and moth damage, now a bold focal point with contrast charcoal piping.',
    storyBehindThePiece: 'Revived from an estate sale with broken springs and moth damage, now a bold focal point with contrast charcoal piping.',
    specificationsAndDimensions: 'W: 78 cm • D: 82 cm • H: 96 cm',
    dimensions: {
      width: '78 cm',
      depth: '82 cm',
      height: '96 cm',
      weight: '19 kg'
    },
    materials: [
      'Original Beech Parker Knoll Frame',
      'Abraham Moon Yorkshire Melton Wool',
      'Hand-Tied Coil Spring Assembly',
      'High-Density Combustion-Modified Reflex Core'
    ],
    materialsUsed: [
      'Original Beech Parker Knoll Frame',
      'Abraham Moon Yorkshire Melton Wool',
      'Hand-Tied Coil Spring Assembly',
      'High-Density Combustion-Modified Reflex Core'
    ],
    fabric: 'Abraham Moon 100% Wool (Mustard / Ochre)',
    fabricAndWeave: 'Abraham Moon 100% Wool (Mustard / Ochre)',
    colour: 'Mustard Gold & Teak',
    colourPalette: 'Mustard Gold & Teak',
    style: 'Mid-Century British Heritage',
    finish: 'Natural Beeswax polished legs',
    timberFinish: 'Natural Beeswax polished legs',
    marketplace: 'direct',
    marketplaceUrl: '',
    featured: true,
    isPastUpholstery: true,
    leadTime: 'Past Commission — Enquire to source similar frame',
    sku: 'AT-RST-051',
    createdAt: '2025-12-10'
  },
  {
    id: 'prod-8',
    title: 'Edwardian Scroll-Arm Chaise Longue',
    subtitle: 'Antique Daybed Reimagined in Emerald Mohair Velvet',
    category: 'preloved_restored',
    price: 1150,
    currency: '£',
    availability: 'sold',
    images: [
      'https://drive.google.com/file/d/1VfFYhG6R7k5QLx8-pUHHan-r2m9KFUmP/view?usp=drive_link'
    ],
    description: 'An Edwardian daybed meticulously rebuilt with authentic Scottish jute webbing, hand-stitched horsehair edges, deep diamond tufting, and sumptuous emerald green mohair velvet.',
    story: 'Preserving historical integrity while upgrading tactile comfort for modern relaxation.',
    storyBehindThePiece: 'Preserving historical integrity while upgrading tactile comfort for modern relaxation.',
    specificationsAndDimensions: 'W: 165 cm • D: 65 cm • H: 75 cm',
    dimensions: {
      width: '165 cm',
      depth: '65 cm',
      height: '75 cm',
      weight: '28 kg'
    },
    materials: [
      'Solid Walnut Carved Frame with Original Brass Casters',
      'Designers Guild Emerald Mohair Velvet',
      'Traditional Horsehair & Hessian Stuffing',
      'Deep Hand-Buttoned Scrolled Back'
    ],
    materialsUsed: [
      'Solid Walnut Carved Frame with Original Brass Casters',
      'Designers Guild Emerald Mohair Velvet',
      'Traditional Horsehair & Hessian Stuffing',
      'Deep Hand-Buttoned Scrolled Back'
    ],
    fabric: 'Designers Guild Deep Emerald Mohair Velvet',
    fabricAndWeave: 'Designers Guild Deep Emerald Mohair Velvet',
    colour: 'Rich Emerald Green & Walnut',
    colourPalette: 'Rich Emerald Green & Walnut',
    style: 'Edwardian Heritage',
    finish: 'Feed-in beeswax over antique walnut patina',
    timberFinish: 'Feed-in beeswax over antique walnut patina',
    marketplace: 'direct',
    marketplaceUrl: '',
    featured: true,
    isPastUpholstery: true,
    leadTime: 'Past Commission — Enquire for bespoke antique search',
    sku: 'AT-RST-058',
    createdAt: '2026-01-05'
  },
  {
    id: 'prod-9',
    title: 'Fluted Banquette Bench in Ochre Velvet',
    subtitle: 'Bespoke Channel-Tufted Architectural Seating',
    category: 'occasional_seating',
    price: 520,
    currency: '£',
    availability: 'sold',
    images: [
      '/images/bespoke_fluted_bench.jpg'
    ],
    description: 'Custom fluted bench ottoman commissioned for a bay window dining nook. Features 12 precision-tailored vertical channels in stain-resistant mustard velvet over a birch ply carcass on tapered solid brass legs.',
    story: 'Created to maximize seating in a Victorian townhouse without visual clutter.',
    storyBehindThePiece: 'Created to maximize seating in a Victorian townhouse without visual clutter.',
    specificationsAndDimensions: 'W: 110 cm • D: 42 cm • H: 48 cm',
    dimensions: {
      width: '110 cm',
      depth: '42 cm',
      height: '48 cm',
      weight: '12 kg'
    },
    materials: [
      'Heavy-duty Stain-Resistant Cotton Velvet',
      'Individually Padded Vertical Fluting Channels',
      'Solid Brass Spun Tapered Legs'
    ],
    materialsUsed: [
      'Heavy-duty Stain-Resistant Cotton Velvet',
      'Individually Padded Vertical Fluting Channels',
      'Solid Brass Spun Tapered Legs'
    ],
    fabric: 'FibreGuard Performance Velvet (Mustard)',
    fabricAndWeave: 'FibreGuard Performance Velvet (Mustard)',
    colour: 'Mustard Velvet & Warm Brass',
    colourPalette: 'Mustard Velvet & Warm Brass',
    style: 'Modern Architectural',
    finish: 'Brushed Satin Brass',
    timberFinish: 'Brushed Satin Brass',
    marketplace: 'direct',
    marketplaceUrl: '',
    featured: true,
    isPastUpholstery: true,
    leadTime: 'Past Commission — Made to order in custom sizes',
    sku: 'AT-BNQ-019',
    createdAt: '2026-01-20'
  }
];

export const initialPortfolioProjects: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: '1950s Parker Knoll Wingback Restoration',
    category: 'Mid-Century Chairs',
    furnitureType: 'Wingback Armchair',
    beforeImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1580481077195-c3a8245559a1?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'A beloved family heirloom suffering from 60 years of wear, sagging tension springs, and degraded foam. We stripped it down to the beech framing, hand-restored the wood joints, and gave it new life in mustard melange British wool.',
    workCompleted: [
      'Complete strip-down to timber skeleton and frame stabilisation',
      'Replacement of rusted tension spring system with modern heavy-gauge coil assembly',
      'Re-foaming with hypoallergenic combustion-modified reflex foam',
      'Hand-tailored upholstery in Abraham Moon mustard wool with contrast dark piping'
    ],
    fabricUsed: 'Abraham Moon Melton Wool (Mustard / Ochre)',
    clientLocation: 'Bath, Somerset',
    testimonial: {
      quote: "Wedgbury Furnishings transformed my grandfather's worn-out chair into the most stunning statement piece in our living room. The attention to detail around the piping and lumbar support is perfection.",
      author: 'Clara & Mark H.',
      location: 'Bath'
    },
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Edwardian Chaise Longue in Forest Mohair Velvet',
    category: 'Antique Restoration',
    furnitureType: 'Chaise Longue',
    beforeImage: 'https://drive.google.com/file/d/1k-j1DT5crE__Rr6n7PmGWMt3cz4Xuial/view?usp=drive_link',
    afterImage: 'https://drive.google.com/file/d/1VfFYhG6R7k5QLx8-pUHHan-r2m9KFUmP/view?usp=drive_link',
    shortStory: 'Found in a dusty barn clearance, this elegant Edwardian daybed featured sound walnut framework with shredded floral brocade. Restored with authentic hand-stitched hessian edges and luxurious emerald green mohair velvet.',
    workCompleted: [
      'Sympathetic cleaning and beeswax feeding of carved walnut legs & casters',
      'Re-webbing using natural Scottish jute and hand-stitched horsehair rolls',
      'Deep buttoned scrolled armrest with hand-covered matching buttons',
      'Bespoke bolster cushion with hand-pleated ends'
    ],
    fabricUsed: 'Designers Guild Emerald Mohair Velvet',
    clientLocation: 'Cheltenham, Gloucestershire',
    testimonial: {
      quote: 'The craftsmanship on the deep buttoning is world-class. It feels like an authentic period piece revived with contemporary luxury.',
      author: 'Julian Thorne',
      location: 'Cheltenham'
    },
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Set of 6 Mid-Century Teak Dining Chairs',
    category: 'Dining Chairs',
    furnitureType: 'Dining Set',
    beforeImage: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80',
    shortStory: 'A tired set of G-Plan dining chairs with cracked faux leather and wobbly joints. We disassembled, cleaned, re-doweled the frames, and upholstered them in stain-resistant charcoal bouclé.',
    workCompleted: [
      'Structural dowel repairs and gentle timber sanding',
      'Danish teak oil nourishment for rich satin glow',
      'New firm seat pads with moisture-barrier underlay',
      'Precision upholstery in stain-treated textured charcoal bouclé'
    ],
    fabricUsed: 'FibreGuard Charcoal Bouclé',
    clientLocation: 'Oxford',
    testimonial: {
      quote: 'Family dinners are so much more comfortable now. The bouclé fabric wipes clean instantly despite having two young children!',
      author: 'Sophie M.',
      location: 'Oxford'
    },
    featured: true
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'purchasing',
    question: 'Are your pieces handmade?',
    answer: 'Yes. Every Wedgbury furnishing is handmade or individually reupholstered in small collections and one-of-a-kind pieces in our UK workshop, with meticulous attention to internal frames, fillings, and tailored textile finishes.'
  },
  {
    id: 'faq-2',
    category: 'purchasing',
    question: 'Do you mass produce?',
    answer: 'No. Wedgbury focuses exclusively on small collections, limited runs, and individual pieces. Availability is inherently limited so each creation retains its distinctive character.'
  },
  {
    id: 'faq-3',
    category: 'purchasing',
    question: 'Can you recreate a sold item?',
    answer: 'Where possible, something similar can be created as part of our made-to-order service. Because we work with vintage frames, salvaged timber, and limited fabric batches, materials may mean the final piece varies slightly — celebrating genuine individuality rather than mass duplication.'
  },
  {
    id: 'faq-4',
    category: 'fabric',
    question: 'Can you source a specific fabric?',
    answer: 'Yes. Where available through our network of leading British and European fabric houses (such as Romo, Abraham Moon, Designers Guild, Bute, and FibreGuard), we can source requested fabrics. Pricing and lead times will depend on supplier availability.'
  },
  {
    id: 'faq-5',
    category: 'upholstery',
    question: 'Do you offer bespoke upholstery?',
    answer: 'Yes, we offer specialist bespoke upholstery for selected furniture pieces including occasional chairs, chaises, footstools, pouffes, ottomans, bed headboards, and pet chaises.'
  },
  {
    id: 'faq-6',
    category: 'upholstery',
    question: 'How do I request a quote?',
    answer: 'Simply use our online Request a Quote form or email us with clear photographs of your furniture, approximate dimensions, and whatever information you have available.'
  },
  {
    id: 'faq-7',
    category: 'upholstery',
    question: "What if I don't have all the information?",
    answer: "Don't worry if you don't have all the details yet. A clear smartphone photo or two from the front and side is the best place to start. Send what you can and we will guide you through the next steps."
  },
  {
    id: 'faq-8',
    category: 'fabric',
    question: 'Can I provide my own fabric?',
    answer: 'Yes, where appropriate. If supplying your own fabric (COM), it must be suitable for upholstery and comply with applicable UK Furniture and Furnishings Fire Safety regulations (BS 5852), or be fitted with an appropriate fire-retardant barrier cloth.'
  },
  {
    id: 'faq-9',
    category: 'fabric',
    question: 'Can you help choose fabric?',
    answer: 'Yes! We provide tailored fabric guidance based on your room\'s style, colour palette, lighting, durability requirements, and suitability for the specific furniture piece.'
  },
  {
    id: 'faq-10',
    category: 'upholstery',
    question: 'What happens if hidden damage is discovered?',
    answer: 'Some structural issues — such as hairline frame fractures, degraded previous repairs, or worn webbing — only become visible after stripping. If unexpected internal work is discovered, we always contact you with photographs and an open discussion before proceeding with additional work.'
  },
  {
    id: 'faq-11',
    category: 'upholstery',
    question: 'How long does bespoke upholstery take?',
    answer: 'Timing depends on the piece, the complexity of work required, fabric availability, and our current workshop queue. Typical turnaround is between 3 to 6 weeks once fabric arrives.'
  },
  {
    id: 'faq-12',
    category: 'delivery',
    question: 'Do you offer delivery or collection?',
    answer: 'Yes. Delivery options depend on the product. Smaller furnishings (cushions, pouffes, small footstools) are dispatched via tracked courier. Larger pieces (chairs, chaises) are available for workshop collection, local delivery, or specialist furniture courier transport.'
  },
  {
    id: 'faq-13',
    category: 'care',
    question: 'How should I care for my handmade upholstered furniture?',
    answer: 'To preserve your pieces: avoid prolonged direct sunlight; gently vacuum upholstered surfaces with a soft upholstery brush attachment; blot liquid spills immediately with an uncoloured absorbent cloth rather than rubbing; and follow fabric-specific guidance or consult a professional cleaner for heavy staining.'
  }
];

export const initialEnquiries: UpholsteryEnquiry[] = [
  {
    id: 'enq-101',
    submittedAt: '2026-08-20T14:32:00Z',
    status: 'new',
    customer: {
      name: 'Victoria Pemberton',
      email: 'v.pemberton@example.co.uk',
      telephone: '07788 123456',
      townPostcode: 'Cirencester, GL7 1AB'
    },
    furnitureType: 'Armchair',
    customFurnitureType: 'Antique Howard & Sons Style Low Armchair',
    photos: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
    ],
    dimensions: {
      width: '82',
      height: '86',
      depth: '88',
      unit: 'cm',
      unknownDimensions: false,
      needsHelpMeasuring: false
    },
    fabricPreference: 'wants_recommendations',
    fabricNotes: 'Looking for a warm olive green or sage textured bouclé or heavy wool. Room has terracotta floor tiles and south-facing light.',
    projectDetails: 'The seat springs feel a little low on the right side and the existing velvet is threadbare on the arm caps. We would love the wood turned legs polished and the chair given fresh supportive padding.',
    consultationRequests: {
      fabricAdvice: true,
      colourAdvice: true,
      measuringAdvice: false,
      structuralAdvice: true,
      generalConsultation: true
    },
    budgetRange: '£600–£1,000',
    adminNotes: 'Lovely piece. Checked photo: authentic deep sprung base. Send Moon wool swatches (Sage / Lichen) and estimate ~£620 labour + £180 fabric.'
  }
];

export const initialMadeToOrderProducts: MadeToOrderProduct[] = [
  {
    id: 'mto-1',
    productName: 'The Bourton Turned-Leg Footstool',
    productDescription: 'A classic proportioned rectangular footstool with tailored wool upholstery or high-end textured bouclé. Built upon a solid hardwood frame with hand-strung webbing and generous natural padding.',
    productCode: 'MTO-FS-01',
    size: 'Medium (90 x 60 cm)',
    finishedDimensions: '90 W x 60 D x 25 H cm (without legs)',
    legOptions: 'Turned English Oak with Brass Castors, Tapered Walnut, Fluted Beech, Blackened Ash',
    isActive: true,
    imageUrl: '/images/made_to_order_hero.png',
    startingPrice: 'From £295',
    leadTime: '3–4 Weeks',
    category: 'Footstool Collection',
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'mto-2',
    productName: 'The Cheltenham Fluted Pouffe',
    productDescription: 'Architectural vertical fluting with continuous channels hand-stitched in tactile bouclé or heavyweight woven linen. Ideal as accent seating, dressing room companion, or sculptural footrest.',
    productCode: 'MTO-PF-02',
    size: 'Standard Round (48 cm diameter)',
    finishedDimensions: '48 dia x 38 H cm (without legs)',
    legOptions: 'Concealed Glide Base, Turned Oak Bun Feet, Brushed Brass Plinth',
    isActive: true,
    imageUrl: '/images/bespoke_fluted_bench.jpg',
    startingPrice: 'From £185',
    leadTime: '2–3 Weeks',
    category: 'Pouffe Collection',
    createdAt: '2026-08-05T11:30:00Z'
  },
  {
    id: 'mto-3',
    productName: 'The Minster Deep Ottoman Bench',
    productDescription: 'An expansive hallway, window seat, or bed-end bench with optional lift-up storage. Upholstered in heritage British wools or hardwearing linens with neat self-piped edging.',
    productCode: 'MTO-OT-03',
    size: 'Grand (120 x 45 cm)',
    finishedDimensions: '120 W x 45 D x 30 H cm (without legs)',
    legOptions: 'Turned Oak Spindle Legs, Mid-Century Tapered Teak, Fluted Beech with Brass Ferrules',
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85',
    startingPrice: 'From £385',
    leadTime: '3–4 Weeks',
    category: 'Ottoman & Bench Collection',
    createdAt: '2026-08-10T14:15:00Z'
  },
  {
    id: 'mto-4',
    productName: 'The Regency Pet Chaise Lounge',
    productDescription: 'Curated scaled luxury for hounds and cats featuring orthopaedic supportive core foam, low-clearance entry, and stain-resistant performance velvet with removable cover.',
    productCode: 'MTO-PC-04',
    size: 'Pet Standard (70 x 45 cm)',
    finishedDimensions: '70 W x 45 D x 22 H cm (without legs)',
    legOptions: 'Mini Turned Oak Feet, Low Brass Discs, Rubber Floor Glides',
    isActive: true,
    imageUrl: 'https://drive.google.com/file/d/1zBNNnFSO2pIuHnAwB8B0LBkLIt012GvW/view?usp=sharing',
    startingPrice: 'From £265',
    leadTime: '3–4 Weeks',
    category: 'Pet Collection',
    createdAt: '2026-08-15T09:00:00Z'
  }
];
