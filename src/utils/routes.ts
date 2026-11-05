import { NavPage } from '../context/AppContext';

export const ROUTE_PATHS: Record<NavPage, string> = {
  'home': '/',
  'shop': '/shop',
  'made-to-order': '/made-to-order',
  'product-detail': '/shop',
  'upholstery': '/re-upholstery',
  'portfolio': '/portfolio',
  'about': '/about',
  'faq': '/faq',
  'contact': '/contact',
  'admin': '/admin5813',
  'privacy': '/privacy-policy',
  'cookies': '/cookie-policy',
  'terms': '/terms-of-sale',
};

export const CLEAN_PATHS: Record<NavPage, string> = ROUTE_PATHS;

export const ROUTE_HASHES: Record<NavPage, string> = ROUTE_PATHS;

/**
 * Returns the clean browser URL path for a given NavPage and optional parameter.
 * E.g. getRoutePath('contact') -> '/contact'
 * E.g. getRoutePath('product-detail', 'prod-123') -> '/shop/prod-123'
 */
export function getRoutePath(page: NavPage, productId?: string): string {
  if (page === 'home') {
    return '/';
  }
  if (page === 'product-detail' && productId) {
    return `/shop/${encodeURIComponent(productId)}`;
  }
  return ROUTE_PATHS[page] || '/';
}

/**
 * Backward compatibility alias (returns clean route path without '#')
 */
export function getRouteHash(page: NavPage, productId?: string): string {
  return getRoutePath(page, productId);
}

/**
 * Parse pathname or route string into a NavPage and optional productId
 */
export function parseRoutePath(pathname: string): { page: NavPage; productId?: string } {
  // Clean pathname: strip queries, hash symbols, trailing slashes
  const withoutQuery = (pathname || '/').split('?')[0];
  const cleanPath = withoutQuery.replace(/^#\/?/, '/').trim().replace(/\/+$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { page: 'home' };
  }
  if (cleanPath === '/shop' || cleanPath === '/collection' || cleanPath === '/furnishings') {
    return { page: 'shop' };
  }
  if (cleanPath.startsWith('/shop/') || cleanPath.startsWith('/product/')) {
    const parts = cleanPath.split('/');
    const productId = parts[2] ? decodeURIComponent(parts[2]) : undefined;
    return { page: 'product-detail', productId };
  }
  if (cleanPath === '/made-to-order' || cleanPath === '/custom' || cleanPath === '/bespoke') {
    return { page: 'made-to-order' };
  }
  if (cleanPath === '/about' || cleanPath === '/our-story' || cleanPath === '/story') {
    return { page: 'about' };
  }
  if (cleanPath === '/upholstery' || cleanPath === '/re-upholstery' || cleanPath === '/services') {
    return { page: 'upholstery' };
  }
  if (cleanPath === '/portfolio' || cleanPath === '/gallery' || cleanPath === '/projects') {
    return { page: 'portfolio' };
  }
  if (cleanPath === '/faq' || cleanPath === '/faqs' || cleanPath === '/delivery') {
    return { page: 'faq' };
  }
  if (cleanPath === '/contact' || cleanPath === '/enquiries') {
    return { page: 'contact' };
  }
  if (cleanPath === '/admin5813') {
    return { page: 'admin' };
  }
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) {
    // Access via /admin is strictly prohibited - only /admin5813 is permitted
    return { page: 'home' };
  }
  if (cleanPath === '/privacy-policy' || cleanPath === '/privacy' || cleanPath === '/gdpr') {
    return { page: 'privacy' };
  }
  if (cleanPath === '/cookie-policy' || cleanPath === '/cookies') {
    return { page: 'cookies' };
  }
  if (cleanPath === '/terms-of-sale' || cleanPath === '/terms' || cleanPath === '/terms-and-conditions') {
    return { page: 'terms' };
  }

  // Fallback to home
  return { page: 'home' };
}

/**
 * Inspects location.pathname and legacy location.hash to determine current active route.
 * Prioritises clean pathnames (e.g. /contact). If a legacy hash was used (#/contact),
 * it converts it to clean pathname and strips the hash immediately.
 */
export function getCurrentRoute(): { page: NavPage; productId?: string } {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }

  // 0. Check if a fallback path was captured from a static host 404 page
  try {
    const fallback = sessionStorage.getItem('spa_fallback_path');
    if (fallback) {
      sessionStorage.removeItem('spa_fallback_path');
      window.history.replaceState(null, '', fallback);
      return parseRoutePath(fallback);
    }
  } catch {}

  // 1. Check window.location.pathname first (e.g. /contact, /made-to-order, /admin5813)
  const pathname = window.location.pathname;
  if (pathname && pathname !== '/') {
    const fromPath = parseRoutePath(pathname);
    if (fromPath.page !== 'home') {
      return fromPath;
    }
  }

  // 2. Check window.location.hash for legacy links (e.g. #/contact) to allow seamless redirect
  const hash = window.location.hash;
  if (hash && hash !== '#' && hash !== '#/' && hash !== '#!/') {
    const fromHash = parseRoutePath(hash);
    if (fromHash.page !== 'home') {
      return fromHash;
    }
  }

  return { page: 'home' };
}

/**
 * Get formatted document title
 */
export function getPageTitle(page: NavPage, extra?: string): string {
  const brand = 'Wedgbury Furnishings';
  switch (page) {
    case 'home':
      return `${brand} | Handmade British Furnishings & Upholstery`;
    case 'shop':
      return `Shop Handmade Furnishings & Footstools | ${brand}`;
    case 'made-to-order':
      return `Made to Order & Custom Sizing | ${brand}`;
    case 'product-detail':
      return extra ? `${extra} | Handcrafted Furnishings | ${brand}` : `Handcrafted Furnishings | ${brand}`;
    case 'upholstery':
      return `Bespoke Re-Upholstery & Restoration Services | ${brand}`;
    case 'portfolio':
      return `Before & After Portfolio | ${brand}`;
    case 'about':
      return `Our Story & Workshop Craftsmanship | ${brand}`;
    case 'faq':
      return `Frequently Asked Questions & Delivery | ${brand}`;
    case 'contact':
      return `Contact Us & Request a Quote | ${brand}`;
    case 'admin':
      return `Studio CMS Dashboard | ${brand}`;
    case 'privacy':
      return `Privacy Policy (UK GDPR) | ${brand}`;
    case 'cookies':
      return `Cookie Policy | ${brand}`;
    case 'terms':
      return `Terms of Sale & Bespoke Agreement | ${brand}`;
    default:
      return brand;
  }
}
