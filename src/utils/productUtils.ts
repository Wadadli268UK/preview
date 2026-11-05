import { Product, MadeToOrderProduct } from '../types';

/**
 * Determines whether a product is active and listed in the public shop catalog.
 * Robustly checks:
 * - isActive: boolean (false)
 * - isActive: string ('false') or number (0)
 * - isListed: boolean (false) or string ('false')
 * - status: 'unlisted' | 'deactivated' | 'draft' | 'inactive'
 * - availability: 'unlisted' | 'hidden'
 * Returns true ONLY if the product is active and eligible for display.
 */
export function isProductActive(p: Product | null | undefined): boolean {
  if (!p) return false;
  // Direct boolean false check
  if (p.isActive === false) return false;
  // String 'false' (often happens with HTML form attributes or serialized data)
  if ((p.isActive as any) === 'false') return false;
  // Numerical 0
  if ((p.isActive as any) === 0 || (p.isActive as any) === '0') return false;
  // Secondary unlisted or status flags
  if ((p as any).isListed === false || (p as any).isListed === 'false') return false;
  if (
    (p as any).status === 'unlisted' ||
    (p as any).status === 'deactivated' ||
    (p as any).status === 'draft' ||
    (p as any).status === 'inactive'
  ) {
    return false;
  }
  // Availability unlisted
  if ((p.availability as any) === 'unlisted' || (p.availability as any) === 'hidden') {
    return false;
  }
  return true;
}

/**
 * Determines whether a Made-to-Order piece is active and listed in the public catalog.
 */
export function isMadeToOrderActive(p: MadeToOrderProduct | null | undefined): boolean {
  if (!p) return false;
  if (p.isActive === false) return false;
  if ((p.isActive as any) === 'false') return false;
  if ((p.isActive as any) === 0 || (p.isActive as any) === '0') return false;
  if ((p as any).isListed === false || (p as any).isListed === 'false') return false;
  if (
    (p as any).status === 'unlisted' ||
    (p as any).status === 'deactivated' ||
    (p as any).status === 'draft' ||
    (p as any).status === 'inactive'
  ) {
    return false;
  }
  return true;
}
