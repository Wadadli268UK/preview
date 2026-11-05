import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Product, 
  MadeToOrderProduct,
  PortfolioProject, 
  UpholsteryEnquiry, 
  FAQItem, 
  SiteSettings, 
  AnalyticsEvent,
  EnquiryStatus 
} from '../types';
import { 
  initialProducts, 
  initialMadeToOrderProducts,
  initialPortfolioProjects, 
  initialFAQs, 
  initialSiteSettings, 
  initialEnquiries 
} from '../data/mockData';
import { isProductActive, isMadeToOrderActive } from '../utils/productUtils';
import {
  parseRoutePath,
  getRoutePath,
  getCurrentRoute,
  getPageTitle,
  ROUTE_PATHS
} from '../utils/routes';
import { 
  db,
  getRemoteSiteSettings, 
  saveRemoteSiteSettings, 
  subscribeSiteSettings,
  subscribeProducts, 
  saveRemoteProduct, 
  deleteRemoteProduct, 
  subscribeMadeToOrderProducts,
  saveRemoteMadeToOrderProduct,
  deleteRemoteMadeToOrderProduct,
  subscribePortfolio, 
  saveRemotePortfolioProject, 
  deleteRemotePortfolioProject, 
  subscribeEnquiries, 
  saveRemoteEnquiry, 
  deleteRemoteEnquiry, 
  subscribeFAQs, 
  saveRemoteFAQ, 
  deleteRemoteFAQ, 
  saveRemoteAnalyticsEvent, 
  seedFirestoreIfEmpty, 
  pushAllDataToFirestore,
  signInAdmin,
  registerAdmin,
  signInWithGoogle,
  signOutAdminUser,
  onAuthStatusChange
} from '../firebase';

export type NavPage = 
  | 'home'
  | 'shop'
  | 'made-to-order'
  | 'product-detail'
  | 'upholstery'
  | 'portfolio'
  | 'about'
  | 'faq'
  | 'contact'
  | 'admin'
  | 'privacy'
  | 'cookies'
  | 'terms';

export interface AdminUser {
  email?: string | null;
  displayName?: string | null;
  uid?: string;
  authMethod: 'firebase' | 'passcode';
}

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Navigation & View State
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedProject: PortfolioProject | null;
  setSelectedProject: (project: PortfolioProject | null) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  quoteContextItem: string | null;
  setQuoteContextItem: (item: string | null) => void;

  // Data
  products: Product[];
  madeToOrderProducts: MadeToOrderProduct[];
  portfolioProjects: PortfolioProject[];
  faqs: FAQItem[];
  settings: SiteSettings;
  enquiries: UpholsteryEnquiry[];
  analyticsEvents: AnalyticsEvent[];

  // Firestore Cloud Status
  isFirestoreConnected: boolean;
  isSyncing: boolean;
  syncAllToFirestore: () => Promise<void>;

  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminLoginWithEmail: (email: string, pass: string) => Promise<void>;
  adminRegisterWithEmail: (email: string, pass: string) => Promise<void>;
  adminLoginWithGoogle: () => Promise<void>;
  adminLoginWithPasscode: (passcode: string) => boolean;
  adminLogout: () => Promise<void>;
  updateStudioPasscode: (newPasscode: string) => void;

  // Admin & State Mutators
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductActive: (id: string) => Promise<void>;
  togglePastUpholstery: (id: string) => Promise<void>;

  addMadeToOrderProduct: (product: Omit<MadeToOrderProduct, 'id' | 'createdAt'>) => Promise<void>;
  updateMadeToOrderProduct: (id: string, product: Partial<MadeToOrderProduct>) => Promise<void>;
  deleteMadeToOrderProduct: (id: string) => Promise<void>;
  toggleMadeToOrderProductActive: (id: string) => Promise<void>;

  addPortfolioProject: (project: Omit<PortfolioProject, 'id'>) => Promise<void>;
  updatePortfolioProject: (id: string, project: Partial<PortfolioProject>) => Promise<void>;
  deletePortfolioProject: (id: string) => Promise<void>;

  submitUpholsteryEnquiry: (enquiry: Omit<UpholsteryEnquiry, 'id' | 'submittedAt' | 'status'>) => Promise<string>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<void>;
  updateEnquiryNotes: (id: string, notes: string) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;

  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  addFAQ: (faq: Omit<FAQItem, 'id'>) => Promise<void>;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;

  // Analytics & Tracking
  logEvent: (eventType: AnalyticsEvent['eventType'], label: string, metadata?: Record<string, any>) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Reset to initial demo data
  resetDemoData: () => Promise<void>;

  // Open quote with specific context (e.g. from a sold piece or service)
  openQuoteWithContext: (contextName?: string) => void;

  // Quick navigation helper
  navigateToProduct: (product: Product) => void;
  navigateToProject: (project: PortfolioProject) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'artisan_products_v3',
  MADE_TO_ORDER: 'artisan_made_to_order_v1',
  PORTFOLIO: 'artisan_portfolio_v3',
  FAQS: 'artisan_faqs_v3',
  SETTINGS: 'artisan_settings_v3',
  ENQUIRIES: 'artisan_enquiries_v3',
  ANALYTICS: 'artisan_analytics_v3',
  ADMIN_PASSCODE: 'artisan_admin_passcode_v1',
  ADMIN_SESSION: 'artisan_admin_session_v1',
};

/**
 * Resilient localStorage writer that protects against QuotaExceededError in restricted/full storage environments.
 */
export const safeSetLocalStorage = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err: any) {
    console.warn(`[LocalStorage] Quota or write issue on key "${key}":`, err?.message || err);
    try {
      // Step 1: Evict high-volume transient data (analytics, enquiries)
      localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
      localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
      localStorage.setItem(key, value);
      return true;
    } catch {
      try {
        // Step 2: Evict secondary catalogs
        localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
        localStorage.removeItem(STORAGE_KEYS.MADE_TO_ORDER);
        localStorage.setItem(key, value);
        return true;
      } catch {
        // Step 3: Silently catch quota overflow - Firestore provides permanent cloud persistence
        return false;
      }
    }
  }
};

/**
 * Resilient sessionStorage writer that tolerates private browsing / iframe quota limits.
 */
export const safeSetSessionStorage = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[SessionStorage] Write note on key "${key}":`, err);
    return false;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial route from browser URL (supports both direct paths and hash-based URLs)
  const initialRoute = typeof window !== 'undefined' ? getCurrentRoute() : { page: 'home' as NavPage };
  const [currentPage, setCurrentPageState] = useState<NavPage>(initialRoute.page);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteContextItem, setQuoteContextItem] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) !== null;
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (session === 'passcode') {
        return {
          displayName: 'Studio Owner',
          uid: 'passcode-admin',
          authMethod: 'passcode',
        };
      }
      return null;
    } catch {
      return null;
    }
  });

  const [studioPasscode, setStudioPasscode] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSCODE) || '1984';
    } catch {
      return '1984';
    }
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStatusChange((user) => {
      if (user) {
        setIsAdminAuthenticated(true);
        setAdminUser({
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'Studio Owner',
          uid: user.uid,
          authMethod: 'firebase',
        });
        safeSetSessionStorage(STORAGE_KEYS.ADMIN_SESSION, 'firebase');
      } else {
        const session = (() => {
          try {
            return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
          } catch {
            return null;
          }
        })();

        if (session === 'passcode') {
          setIsAdminAuthenticated(true);
          setAdminUser({
            displayName: 'Studio Owner',
            uid: 'passcode-admin',
            authMethod: 'passcode',
          });
        } else {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }
      }
    });

    return () => unsub();
  }, []);

  // Initialize state with fallback to local storage or mock data
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If no products have isPastUpholstery (e.g. stale client cache), merge past upholstery flags from initialProducts
          const hasPastUpholstery = parsed.some((p: Product) => p.isPastUpholstery);
          if (!hasPastUpholstery) {
            return parsed.map((p: Product) => {
              const initMatch = initialProducts.find((ip) => ip.id === p.id || ip.title.toLowerCase() === p.title.toLowerCase());
              return initMatch?.isPastUpholstery ? { ...p, isPastUpholstery: true } : p;
            });
          }
          return parsed;
        }
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [madeToOrderProducts, setMadeToOrderProducts] = useState<MadeToOrderProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MADE_TO_ORDER);
      if (saved) {
        return JSON.parse(saved);
      }
      return initialMadeToOrderProducts;
    } catch {
      return initialMadeToOrderProducts;
    }
  });

  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      if (saved) {
        return JSON.parse(saved);
      }
      return initialPortfolioProjects;
    } catch {
      return initialPortfolioProjects;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : initialFAQs;
    } catch {
      return initialFAQs;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.logoUrl === 'https://drive.google.com/file/d/1PErNcQ2r-IcD7X4y0aoeRl-6MjljaMqN/view?usp=sharing') {
          parsed.logoUrl = initialSiteSettings.logoUrl;
        }
        if (!parsed.footerLogoUrl) {
          parsed.footerLogoUrl = initialSiteSettings.footerLogoUrl;
        }
        if (parsed.artisanName === 'Eleanor Wedgbury' || parsed.artisanName === 'Hayley Wedgbury' || parsed.artisanName === 'Wedgbury Team') {
          parsed.artisanName = 'Wedgbury Furnishings';
        }
        if (parsed.artisanRole === 'Studio Founder & Designer' || parsed.artisanRole === 'Designer & Maker') {
          parsed.artisanRole = '';
        }
        if (parsed.brandStoryFeature1Desc && (parsed.brandStoryFeature1Desc.includes('sustainable') || parsed.brandStoryFeature1Desc.includes('FSC'))) {
          parsed.brandStoryFeature1Desc = initialSiteSettings.brandStoryFeature1Desc;
        }
        return { ...initialSiteSettings, ...parsed };
      }
      return initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [enquiries, setEnquiries] = useState<UpholsteryEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : initialEnquiries;
    } catch {
      return initialEnquiries;
    }
  });

  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Proactive storage quota health check on startup: if browser is already over-quota from prior session, clear heavy caches
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const probeKey = '__artisan_quota_probe__';
      localStorage.setItem(probeKey, '1');
      localStorage.removeItem(probeKey);
    } catch {
      console.warn('[LocalStorage] Storage quota exceeded on startup. Evicting bloated caches...');
      try {
        localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
        localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
        localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
        localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
        localStorage.removeItem(STORAGE_KEYS.MADE_TO_ORDER);
      } catch {}
    }
  }, []);

  // Local caching with resilient quota-safe storage
  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.MADE_TO_ORDER, JSON.stringify(madeToOrderProducts));
  }, [madeToOrderProducts]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolioProjects));
  }, [portfolioProjects]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.ANALYTICS, JSON.stringify(analyticsEvents.slice(0, 25)));
  }, [analyticsEvents]);

  // Toast notifications
  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- FIRESTORE INITIALIZATION & REAL-TIME SYNC ---
  useEffect(() => {
    let unsubSettings: (() => void) | undefined;
    let unsubProducts: (() => void) | undefined;
    let unsubMadeToOrder: (() => void) | undefined;
    let unsubPortfolio: (() => void) | undefined;
    let unsubFaqs: (() => void) | undefined;
    let unsubEnquiries: (() => void) | undefined;

    const setupFirebaseSync = async () => {
      try {
        // Seed initial data if cloud database is empty
        await seedFirestoreIfEmpty();

        // 1. Real-time site settings subscription (syncs instant updates to all mobile and desktop devices)
        unsubSettings = subscribeSiteSettings(
          (remoteSettings) => {
            if (remoteSettings) {
              if (remoteSettings.logoUrl === 'https://drive.google.com/file/d/1PErNcQ2r-IcD7X4y0aoeRl-6MjljaMqN/view?usp=sharing') {
                remoteSettings.logoUrl = initialSiteSettings.logoUrl;
              }
              if (!remoteSettings.footerLogoUrl) {
                remoteSettings.footerLogoUrl = initialSiteSettings.footerLogoUrl;
              }
              if (remoteSettings.artisanName === 'Eleanor Wedgbury' || remoteSettings.artisanName === 'Hayley Wedgbury' || remoteSettings.artisanName === 'Wedgbury Team') {
                remoteSettings.artisanName = 'Wedgbury Furnishings';
              }
              if (remoteSettings.artisanRole === 'Studio Founder & Designer' || remoteSettings.artisanRole === 'Designer & Maker') {
                remoteSettings.artisanRole = '';
              }
              setSettings((prev) => ({ ...prev, ...remoteSettings }));
            }
          },
          () => setIsFirestoreConnected(false)
        );

        // 2. Real-time products subscription
        unsubProducts = subscribeProducts(
          (remoteProds) => {
            if (remoteProds && remoteProds.length > 0) {
              const hasPast = remoteProds.some((p) => p.isPastUpholstery);
              if (!hasPast) {
                const merged = remoteProds.map((p) => {
                  const match = initialProducts.find((ip) => ip.id === p.id || ip.title.toLowerCase() === p.title.toLowerCase());
                  return match?.isPastUpholstery ? { ...p, isPastUpholstery: true } : p;
                });
                setProducts(merged);
              } else {
                setProducts(remoteProds);
              }
            }
          },
          () => setIsFirestoreConnected(false)
        );

        // 2b. Real-time Made to Order products subscription
        unsubMadeToOrder = subscribeMadeToOrderProducts(
          (remoteMto) => {
            if (remoteMto && remoteMto.length > 0) {
              setMadeToOrderProducts(remoteMto);
            }
          },
          () => setIsFirestoreConnected(false)
        );

        // 3. Real-time portfolio subscription
        unsubPortfolio = subscribePortfolio(
          (remoteProjects) => {
            if (remoteProjects && remoteProjects.length > 0) {
              setPortfolioProjects(remoteProjects);
            }
          },
          () => setIsFirestoreConnected(false)
        );

        // 4. Real-time FAQs subscription
        unsubFaqs = subscribeFAQs(
          (remoteFaqs) => {
            if (remoteFaqs && remoteFaqs.length > 0) {
              setFaqs(remoteFaqs);
            }
          },
          () => setIsFirestoreConnected(false)
        );

        // 5. Real-time Enquiries subscription
        unsubEnquiries = subscribeEnquiries(
          (remoteEnqs) => {
            if (remoteEnqs) {
              setEnquiries(remoteEnqs);
            }
          },
          () => setIsFirestoreConnected(false)
        );

        setIsFirestoreConnected(true);
      } catch (err) {
        console.warn('Firestore connection setup failed, running in resilient local mode:', err);
        setIsFirestoreConnected(false);
      }
    };

    setupFirebaseSync();

    return () => {
      unsubSettings?.();
      unsubProducts?.();
      unsubMadeToOrder?.();
      unsubPortfolio?.();
      unsubFaqs?.();
      unsubEnquiries?.();
    };
  }, []);

  // Analytics Logger
  const logEvent = (eventType: AnalyticsEvent['eventType'], label: string, metadata?: Record<string, any>) => {
    const newEvent: AnalyticsEvent = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      timestamp: new Date().toISOString(),
      eventType,
      label,
      metadata,
    };
    setAnalyticsEvents((prev) => [newEvent, ...prev.slice(0, 99)]);
    saveRemoteAnalyticsEvent(newEvent).catch((e) => console.warn('Failed to log event to cloud:', e));
  };

  // --- ACTIONS & MUTATORS WITH FIRESTORE PERSISTENCE ---

  const syncAllToFirestore = async () => {
    setIsSyncing(true);
    try {
      await pushAllDataToFirestore(settings, products, portfolioProjects, faqs, enquiries, madeToOrderProducts);
      setIsFirestoreConnected(true);
      showToast('All website content & catalog data synced to Cloud Firestore!', 'success');
    } catch (err) {
      console.error('Error during manual sync to Firestore:', err);
      showToast('Error syncing to Cloud Firestore. Please check internet connection.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const addProduct = async (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const product: Product = {
      ...newProd,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [product, ...prev]);
    showToast(`Added "${product.title}" to catalog`);
    logEvent('product_view', `Created product ${product.title}`);
    try {
      await saveRemoteProduct(product);
    } catch (err) {
      console.warn('Product saved locally, cloud sync pending:', err);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;
    const updated = { ...existing, ...updatedFields };
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    if (selectedProduct?.id === id) {
      setSelectedProduct(updated);
    }
    showToast('Product listing updated and saved to Firestore');
    try {
      await saveRemoteProduct(updated);
    } catch (err) {
      console.warn('Product updated locally, cloud sync pending:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
      setCurrentPage('shop');
    }
    showToast(`Deleted ${p?.title || 'product'}`);
    try {
      await deleteRemoteProduct(id);
    } catch (err) {
      console.warn('Product deleted locally, cloud sync pending:', err);
    }
  };

  const toggleProductActive = async (id: string) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;
    const currentActive = isProductActive(existing);
    const newActiveState = !currentActive;
    const updated: Product = { ...existing, isActive: newActiveState };
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    if (selectedProduct?.id === id) {
      setSelectedProduct(updated);
    }
    showToast(
      newActiveState
        ? `"${existing.title}" is now ACTIVE in the Shop catalog`
        : `"${existing.title}" is now DEACTIVATED & UNLISTED from the Shop catalog`,
      'info'
    );
    try {
      await saveRemoteProduct(updated);
    } catch (err) {
      console.warn('Product active status updated locally, cloud sync pending:', err);
    }
  };

  const togglePastUpholstery = async (id: string) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;
    const newPastState = !existing.isPastUpholstery;
    const updated: Product = { ...existing, isPastUpholstery: newPastState };
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    if (selectedProduct?.id === id) {
      setSelectedProduct(updated);
    }
    showToast(
      newPastState
        ? `"${existing.title}" is now added to the Past Upholstery Carousel`
        : `"${existing.title}" is now removed from the Past Upholstery Carousel`,
      'info'
    );
    try {
      await saveRemoteProduct(updated);
    } catch (err) {
      console.warn('Past upholstery status updated locally, cloud sync pending:', err);
    }
  };

  const addMadeToOrderProduct = async (item: Omit<MadeToOrderProduct, 'id' | 'createdAt'>) => {
    const newProduct: MadeToOrderProduct = {
      ...item,
      id: 'mto-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setMadeToOrderProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.productName}" to Made-to-Order catalog`);
    try {
      await saveRemoteMadeToOrderProduct(newProduct);
    } catch (err) {
      console.warn('Made to order product saved locally, cloud sync pending:', err);
    }
  };

  const updateMadeToOrderProduct = async (id: string, updatedFields: Partial<MadeToOrderProduct>) => {
    const existing = madeToOrderProducts.find((p) => p.id === id);
    if (!existing) return;
    const updated = { ...existing, ...updatedFields };
    setMadeToOrderProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    showToast('Made-to-order piece updated in Firestore');
    try {
      await saveRemoteMadeToOrderProduct(updated);
    } catch (err) {
      console.warn('Made to order piece updated locally, cloud sync pending:', err);
    }
  };

  const deleteMadeToOrderProduct = async (id: string) => {
    const item = madeToOrderProducts.find((x) => x.id === id);
    setMadeToOrderProducts((prev) => prev.filter((x) => x.id !== id));
    showToast(`Removed "${item?.productName || 'piece'}" from catalog`);
    try {
      await deleteRemoteMadeToOrderProduct(id);
    } catch (err) {
      console.warn('Made to order piece deleted locally, cloud sync pending:', err);
    }
  };

  const toggleMadeToOrderProductActive = async (id: string) => {
    const existing = madeToOrderProducts.find((p) => p.id === id);
    if (!existing) return;
    const currentActive = isMadeToOrderActive(existing);
    const newActiveState = !currentActive;
    const updated = { ...existing, isActive: newActiveState };
    setMadeToOrderProducts((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    showToast(
      newActiveState
        ? `"${existing.productName}" is now ACTIVE on the Made-to-Order page`
        : `"${existing.productName}" is now DEACTIVATED & UNLISTED from the Made-to-Order page`,
      'info'
    );
    try {
      await saveRemoteMadeToOrderProduct(updated);
    } catch (err) {
      console.warn('Made to order status updated locally, cloud sync pending:', err);
    }
  };

  const addPortfolioProject = async (proj: Omit<PortfolioProject, 'id'>) => {
    const project: PortfolioProject = {
      ...proj,
      id: 'proj-' + Date.now(),
    };
    setPortfolioProjects((prev) => [project, ...prev]);
    showToast(`Added project "${project.title}" to portfolio`);
    try {
      await saveRemotePortfolioProject(project);
    } catch (err) {
      console.warn('Portfolio project saved locally, cloud sync pending:', err);
    }
  };

  const updatePortfolioProject = async (id: string, updatedFields: Partial<PortfolioProject>) => {
    const existing = portfolioProjects.find((p) => p.id === id);
    if (!existing) return;
    const updated = { ...existing, ...updatedFields };
    setPortfolioProjects((prev) =>
      prev.map((p) => (p.id === id ? updated : p))
    );
    showToast('Portfolio project updated in Firestore');
    try {
      await saveRemotePortfolioProject(updated);
    } catch (err) {
      console.warn('Portfolio updated locally, cloud sync pending:', err);
    }
  };

  const deletePortfolioProject = async (id: string) => {
    setPortfolioProjects((prev) => prev.filter((x) => x.id !== id));
    showToast('Portfolio project removed');
    try {
      await deleteRemotePortfolioProject(id);
    } catch (err) {
      console.warn('Portfolio deleted locally, cloud sync pending:', err);
    }
  };

  const submitUpholsteryEnquiry = async (
    data: Omit<UpholsteryEnquiry, 'id' | 'submittedAt' | 'status'>
  ): Promise<string> => {
    const id = 'enq-' + Math.floor(100 + Math.random() * 900);
    const newEnquiry: UpholsteryEnquiry = {
      ...data,
      id,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    logEvent('quote_complete', `Quote enquiry from ${data.customer.name} (${data.furnitureType})`, {
      furnitureType: data.furnitureType,
      budget: data.budgetRange,
      town: data.customer.townPostcode,
    });
    showToast('Thank you! Your upholstery enquiry has been submitted. Wedgbury Furnishings will respond within 24–48 hours.', 'success');
    try {
      await saveRemoteEnquiry(newEnquiry);
    } catch (err) {
      console.warn('Enquiry saved locally, cloud sync pending:', err);
    }
    return id;
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    const existing = enquiries.find((e) => e.id === id);
    if (!existing) return;
    const updated = { ...existing, status };
    setEnquiries((prev) => prev.map((e) => (e.id === id ? updated : e)));
    showToast(`Enquiry status updated to ${status.replace('_', ' ').toUpperCase()}`);
    try {
      await saveRemoteEnquiry(updated);
    } catch (err) {
      console.warn('Enquiry status updated locally, cloud sync pending:', err);
    }
  };

  const updateEnquiryNotes = async (id: string, notes: string) => {
    const existing = enquiries.find((e) => e.id === id);
    if (!existing) return;
    const updated = { ...existing, adminNotes: notes };
    setEnquiries((prev) => prev.map((e) => (e.id === id ? updated : e)));
    showToast('Internal artisan note saved to Firestore');
    try {
      await saveRemoteEnquiry(updated);
    } catch (err) {
      console.warn('Note updated locally, cloud sync pending:', err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast('Enquiry removed from records');
    try {
      await deleteRemoteEnquiry(id);
    } catch (err) {
      console.warn('Enquiry deleted locally, cloud sync pending:', err);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    showToast('Website content & branding saved to Firestore', 'success');
    try {
      await saveRemoteSiteSettings(updated);
    } catch (err) {
      console.warn('Settings saved locally, cloud sync pending:', err);
    }
  };

  const addFAQ = async (faq: Omit<FAQItem, 'id'>) => {
    const item: FAQItem = {
      ...faq,
      id: 'faq-' + Date.now(),
    };
    setFaqs((prev) => [...prev, item]);
    showToast('FAQ item added to Firestore');
    try {
      await saveRemoteFAQ(item);
    } catch (err) {
      console.warn('FAQ saved locally, cloud sync pending:', err);
    }
  };

  const updateFAQ = async (id: string, fields: Partial<FAQItem>) => {
    const existing = faqs.find((f) => f.id === id);
    if (!existing) return;
    const updated = { ...existing, ...fields };
    setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)));
    showToast('FAQ updated in Firestore');
    try {
      await saveRemoteFAQ(updated);
    } catch (err) {
      console.warn('FAQ updated locally, cloud sync pending:', err);
    }
  };

  const deleteFAQ = async (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast('FAQ deleted from Firestore');
    try {
      await deleteRemoteFAQ(id);
    } catch (err) {
      console.warn('FAQ deleted locally, cloud sync pending:', err);
    }
  };

  const resetDemoData = async () => {
    setProducts(initialProducts);
    setMadeToOrderProducts(initialMadeToOrderProducts);
    setPortfolioProjects(initialPortfolioProjects);
    setFaqs(initialFAQs);
    setSettings(initialSiteSettings);
    setEnquiries(initialEnquiries);
    setAnalyticsEvents([]);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.MADE_TO_ORDER);
    localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
    try {
      await pushAllDataToFirestore(
        initialSiteSettings,
        initialProducts,
        initialPortfolioProjects,
        initialFAQs,
        initialEnquiries,
        initialMadeToOrderProducts
      );
      showToast('Demonstration data restored and synced to Firestore');
    } catch (err) {
      console.warn('Demo reset locally, cloud sync error:', err);
      showToast('Demo data reset locally');
    }
  };

  // Synchronize route and handle browser Back / Forward buttons & direct URL refreshes
  useEffect(() => {
    const handleLocationChange = () => {
      // Intercept any attempt to access /admin or #/admin and redirect to homepage
      if (typeof window !== 'undefined') {
        const rawHash = (window.location.hash || '').replace(/^#\/?/, '/').trim();
        const rawPath = (window.location.pathname || '').trim();
        if (rawPath === '/admin' || rawHash === '/admin' || rawPath.startsWith('/admin/') || rawHash.startsWith('/admin/')) {
          window.history.replaceState({ page: 'home' }, '', '/');
          setCurrentPageState('home');
          setSelectedProduct(null);
          document.title = getPageTitle('home');
          return;
        }
      }

      const route = getCurrentRoute();

      // Ensure that if route.page is admin, it was strictly accessed via /admin5813
      if (route.page === 'admin') {
        const hash = window.location.hash || '';
        const pathname = window.location.pathname || '';
        if (!pathname.includes('/admin5813') && !hash.includes('/admin5813')) {
          window.history.replaceState({ page: 'home' }, '', '/');
          setCurrentPageState('home');
          setSelectedProduct(null);
          document.title = getPageTitle('home');
          return;
        }
      }

      // If user landed with a hash in URL (e.g. #/contact), normalize immediately to clean pathname
      if (typeof window !== 'undefined' && window.location.hash) {
        const targetCleanPath = getRoutePath(route.page, route.productId);
        window.history.replaceState({ page: route.page, productId: route.productId }, '', targetCleanPath);
      }

      setCurrentPageState(route.page);
      if (route.page === 'product-detail' && route.productId) {
        const found = products.find(p => p.id === route.productId || p.slug === route.productId);
        if (found) {
          setSelectedProduct(found);
          document.title = getPageTitle('product-detail', found.title);
        }
      } else if (route.page !== 'product-detail') {
        setSelectedProduct(null);
        document.title = getPageTitle(route.page);
      }
    };

    // Check initial direct load
    if (typeof window !== 'undefined') {
      const rawHash = (window.location.hash || '').replace(/^#\/?/, '/').trim();
      const rawPath = (window.location.pathname || '').trim();
      if (rawPath === '/admin' || rawHash === '/admin' || rawPath.startsWith('/admin/') || rawHash.startsWith('/admin/')) {
        window.history.replaceState({ page: 'home' }, '', '/');
        setCurrentPageState('home');
        setSelectedProduct(null);
        document.title = getPageTitle('home');
      } else {
        const route = getCurrentRoute();
        if (route.page === 'admin') {
          const hash = window.location.hash || '';
          const pathname = window.location.pathname || '';
          if (!pathname.includes('/admin5813') && !hash.includes('/admin5813')) {
            window.history.replaceState({ page: 'home' }, '', '/');
            setCurrentPageState('home');
            setSelectedProduct(null);
            document.title = getPageTitle('home');
          } else {
            setCurrentPageState('admin');
            document.title = getPageTitle('admin');
            window.history.replaceState({ page: 'admin' }, '', '/admin5813');
          }
        } else if (route.page === 'product-detail' && route.productId) {
          const found = products.find(p => p.id === route.productId || p.slug === route.productId);
          if (found) {
            setSelectedProduct(found);
            document.title = getPageTitle('product-detail', found.title);
          }
          const targetCleanPath = getRoutePath('product-detail', route.productId);
          if (window.location.pathname !== targetCleanPath || window.location.hash) {
            window.history.replaceState({ page: route.page, productId: route.productId }, '', targetCleanPath);
          }
        } else {
          setCurrentPageState(route.page);
          document.title = getPageTitle(route.page);
          if (window.location.hash) {
            const targetCleanPath = getRoutePath(route.page);
            window.history.replaceState({ page: route.page }, '', targetCleanPath);
          }
        }
      }
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [products]);

  const setCurrentPage = useCallback((page: NavPage) => {
    setCurrentPageState(page);
    if (page !== 'product-detail') {
      setSelectedProduct(null);
    }
    if (typeof window !== 'undefined') {
      const targetPath = getRoutePath(page);
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState({ page }, '', targetPath);
      }
    }
    if (typeof document !== 'undefined') {
      document.title = getPageTitle(page);
    }
  }, []);

  const openQuoteWithContext = (contextName?: string) => {
    setQuoteContextItem(contextName || null);
    setIsQuoteModalOpen(true);
    logEvent('quote_start', `Quote modal opened${contextName ? ` for ${contextName}` : ''}`);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPageState('product-detail');
    if (typeof window !== 'undefined') {
      const targetPath = getRoutePath('product-detail', product.id);
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState({ page: 'product-detail', productId: product.id }, '', targetPath);
      }
    }
    if (typeof document !== 'undefined') {
      document.title = getPageTitle('product-detail', product.title);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logEvent('product_view', product.title, { id: product.id, price: product.price });
  };

  const navigateToProject = (project: PortfolioProject) => {
    setSelectedProject(project);
    setCurrentPage('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- ADMIN AUTHENTICATION FUNCTIONS ---

  const adminLoginWithEmail = async (email: string, pass: string): Promise<void> => {
    const user = await signInAdmin(email, pass);
    setIsAdminAuthenticated(true);
    setAdminUser({
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'Studio Owner',
      uid: user.uid,
      authMethod: 'firebase',
    });
    safeSetSessionStorage(STORAGE_KEYS.ADMIN_SESSION, 'firebase');
  };

  const adminRegisterWithEmail = async (email: string, pass: string): Promise<void> => {
    const user = await registerAdmin(email, pass);
    setIsAdminAuthenticated(true);
    setAdminUser({
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0] || 'Studio Owner',
      uid: user.uid,
      authMethod: 'firebase',
    });
    safeSetSessionStorage(STORAGE_KEYS.ADMIN_SESSION, 'firebase');
  };

  const adminLoginWithGoogle = async (): Promise<void> => {
    const user = await signInWithGoogle();
    setIsAdminAuthenticated(true);
    setAdminUser({
      email: user.email,
      displayName: user.displayName || 'Google Admin User',
      uid: user.uid,
      authMethod: 'firebase',
    });
    safeSetSessionStorage(STORAGE_KEYS.ADMIN_SESSION, 'firebase');
  };

  const adminLoginWithPasscode = (inputPasscode: string): boolean => {
    // Valid passcodes: custom stored passcode, default '1984', or 'artisan2025'
    if (
      inputPasscode === studioPasscode || 
      inputPasscode === '1984' || 
      inputPasscode === 'artisan2025'
    ) {
      setIsAdminAuthenticated(true);
      setAdminUser({
        displayName: 'Studio Owner',
        uid: 'passcode-admin',
        authMethod: 'passcode',
      });
      safeSetSessionStorage(STORAGE_KEYS.ADMIN_SESSION, 'passcode');
      return true;
    }
    return false;
  };

  const adminLogout = async (): Promise<void> => {
    try {
      await signOutAdminUser();
    } catch (err) {
      console.warn('Signout note:', err);
    }
    try {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch {}
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    showToast('Signed out of Studio CMS dashboard.', 'info');
  };

  const updateStudioPasscode = (newPasscode: string) => {
    setStudioPasscode(newPasscode);
    safeSetLocalStorage(STORAGE_KEYS.ADMIN_PASSCODE, newPasscode);
    showToast('Studio Admin Passcode updated successfully.');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        selectedProject,
        setSelectedProject,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        quoteContextItem,
        setQuoteContextItem,
        products,
        madeToOrderProducts,
        portfolioProjects,
        faqs,
        settings,
        enquiries,
        analyticsEvents,
        isFirestoreConnected,
        isSyncing,
        syncAllToFirestore,
        isAdminAuthenticated,
        adminUser,
        adminLoginWithEmail,
        adminRegisterWithEmail,
        adminLoginWithGoogle,
        adminLoginWithPasscode,
        adminLogout,
        updateStudioPasscode,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        togglePastUpholstery,
        addMadeToOrderProduct,
        updateMadeToOrderProduct,
        deleteMadeToOrderProduct,
        toggleMadeToOrderProductActive,
        addPortfolioProject,
        updatePortfolioProject,
        deletePortfolioProject,
        submitUpholsteryEnquiry,
        updateEnquiryStatus,
        updateEnquiryNotes,
        deleteEnquiry,
        updateSettings,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        logEvent,
        toasts,
        showToast,
        removeToast,
        resetDemoData,
        openQuoteWithContext,
        navigateToProduct,
        navigateToProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
