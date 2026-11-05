import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  getPageSEO,
  generateSchemaGraph,
  resolveCanonicalUrl,
  resolveImageUrl
} from '../utils/seoConfig';

function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string | null) {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;

  if (content === null) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export const SEOHead: React.FC = () => {
  const { currentPage, selectedProduct, settings, faqs } = useApp();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const seo = getPageSEO(currentPage, selectedProduct, settings);
    const domain = settings.canonicalDomain || window.location.origin;
    const canonicalUrl = resolveCanonicalUrl(seo.canonicalPath, domain);
    const fullImageUrl = resolveImageUrl(seo.image, domain);
    const siteBrand = settings.businessName ? `${settings.businessName} Furnishings` : 'Wedgbury Furnishings';

    // 1. Page Title
    document.title = seo.title;

    // 2. Primary Meta Tags
    updateMetaTag('name', 'description', seo.description);
    updateMetaTag('name', 'robots', seo.robots);

    // 3. Canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // 4. Open Graph Tags
    updateMetaTag('property', 'og:site_name', siteBrand);
    updateMetaTag('property', 'og:title', seo.title);
    updateMetaTag('property', 'og:description', seo.description);
    updateMetaTag('property', 'og:type', seo.ogType);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:image', fullImageUrl);
    updateMetaTag('property', 'og:locale', 'en_GB');

    // 5. Twitter / X Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', seo.title);
    updateMetaTag('name', 'twitter:description', seo.description);
    updateMetaTag('name', 'twitter:image', fullImageUrl);

    // 6. Google Search Console Verification
    if (settings.googleSiteVerification && settings.googleSiteVerification.trim().length > 0) {
      updateMetaTag('name', 'google-site-verification', settings.googleSiteVerification.trim());
    } else {
      updateMetaTag('name', 'google-site-verification', null);
    }

    // 7. Schema.org Structured Data (JSON-LD)
    const schemaGraph = generateSchemaGraph(currentPage, seo, {
      settings,
      product: selectedProduct,
      faqs,
      origin: window.location.origin
    });

    const SCRIPT_ID = 'wedgbury-schema-graph';
    let scriptElement = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = SCRIPT_ID;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(schemaGraph, null, 2);

  }, [currentPage, selectedProduct, settings, faqs]);

  return null; // Head-only reactive controller
};
