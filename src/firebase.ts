import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc, 
  onSnapshot, 
  writeBatch 
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { 
  Product, 
  MadeToOrderProduct,
  PortfolioProject, 
  UpholsteryEnquiry, 
  FAQItem, 
  SiteSettings, 
  AnalyticsEvent 
} from './types';
import { 
  initialProducts, 
  initialMadeToOrderProducts,
  initialPortfolioProjects, 
  initialFAQs, 
  initialSiteSettings, 
  initialEnquiries 
} from './data/mockData';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore with custom database ID from config
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Collection Names
export const COLLECTIONS = {
  SETTINGS: 'site_settings',
  PRODUCTS: 'products',
  MADE_TO_ORDER: 'made_to_order_products',
  PORTFOLIO: 'portfolio',
  ENQUIRIES: 'enquiries',
  FAQS: 'faqs',
  ANALYTICS: 'analytics',
} as const;

/**
 * Recursively removes any undefined keys or nested values before sending to Firestore.
 * Firestore strictly rejects documents that contain any field with value `undefined`.
 */
export const cleanForFirestore = <T>(obj: T): T => {
  if (obj === null || obj === undefined) {
    return null as any;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => cleanForFirestore(item)).filter((item) => item !== undefined) as any;
  }
  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const cleanObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleanObj[key] = cleanForFirestore(value);
      }
    }
    return cleanObj as any;
  }
  return obj;
};

// --- SITE SETTINGS ---
export const getRemoteSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as SiteSettings;
    }
    return null;
  } catch (error) {
    console.warn('Could not fetch remote settings from Firestore:', error);
    return null;
  }
};

export const saveRemoteSiteSettings = async (settings: SiteSettings): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    await setDoc(docRef, cleanForFirestore(settings), { merge: true });
  } catch (error) {
    console.error('Error saving site settings to Firestore:', error);
    throw error;
  }
};

export const subscribeSiteSettings = (
  onUpdate: (settings: SiteSettings) => void,
  onError?: (err: Error) => void
) => {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'general');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as SiteSettings);
      }
    },
    (err) => {
      console.warn('Site settings snapshot subscription error:', err);
      onError?.(err);
    }
  );
};

// --- PRODUCTS ---
export const subscribeProducts = (onUpdate: (products: Product[]) => void, onError?: (err: Error) => void) => {
  const colRef = collection(db, COLLECTIONS.PRODUCTS);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Product[] = [];
      snapshot.forEach((d) => {
        items.push({ ...(d.data() as Product), id: d.id });
      });
      if (items.length > 0) {
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('Products snapshot subscription error:', err);
      onError?.(err);
    }
  );
};

export const saveRemoteProduct = async (product: Product): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, product.id);
    await setDoc(docRef, cleanForFirestore(product), { merge: true });
  } catch (error) {
    console.error('Error saving product to Firestore:', error);
    throw error;
  }
};

export const deleteRemoteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product from Firestore:', error);
    throw error;
  }
};

// --- MADE TO ORDER PRODUCTS ---
export const subscribeMadeToOrderProducts = (
  onUpdate: (products: MadeToOrderProduct[]) => void, 
  onError?: (err: Error) => void
) => {
  const colRef = collection(db, COLLECTIONS.MADE_TO_ORDER);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: MadeToOrderProduct[] = [];
      snapshot.forEach((d) => {
        items.push({ ...(d.data() as MadeToOrderProduct), id: d.id });
      });
      if (items.length > 0) {
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('Made to Order products snapshot error:', err);
      onError?.(err);
    }
  );
};

export const saveRemoteMadeToOrderProduct = async (product: MadeToOrderProduct): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.MADE_TO_ORDER, product.id);
    await setDoc(docRef, cleanForFirestore(product), { merge: true });
  } catch (error) {
    console.error('Error saving made-to-order product to Firestore:', error);
    throw error;
  }
};

export const deleteRemoteMadeToOrderProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.MADE_TO_ORDER, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting made-to-order product from Firestore:', error);
    throw error;
  }
};

// --- PORTFOLIO ---
export const subscribePortfolio = (onUpdate: (projects: PortfolioProject[]) => void, onError?: (err: Error) => void) => {
  const colRef = collection(db, COLLECTIONS.PORTFOLIO);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: PortfolioProject[] = [];
      snapshot.forEach((d) => {
        items.push({ ...(d.data() as PortfolioProject), id: d.id });
      });
      if (items.length > 0) {
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('Portfolio snapshot error:', err);
      onError?.(err);
    }
  );
};

export const saveRemotePortfolioProject = async (project: PortfolioProject): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PORTFOLIO, project.id);
    await setDoc(docRef, cleanForFirestore(project), { merge: true });
  } catch (error) {
    console.error('Error saving portfolio project to Firestore:', error);
    throw error;
  }
};

export const deleteRemotePortfolioProject = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PORTFOLIO, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting portfolio project from Firestore:', error);
    throw error;
  }
};

// --- ENQUIRIES & LEADS ---
export const subscribeEnquiries = (onUpdate: (enquiries: UpholsteryEnquiry[]) => void, onError?: (err: Error) => void) => {
  const colRef = collection(db, COLLECTIONS.ENQUIRIES);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: UpholsteryEnquiry[] = [];
      snapshot.forEach((d) => {
        items.push({ ...(d.data() as UpholsteryEnquiry), id: d.id });
      });
      onUpdate(items);
    },
    (err) => {
      console.warn('Enquiries snapshot error:', err);
      onError?.(err);
    }
  );
};

export const saveRemoteEnquiry = async (enquiry: UpholsteryEnquiry): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.ENQUIRIES, enquiry.id);
    await setDoc(docRef, cleanForFirestore(enquiry), { merge: true });
  } catch (error) {
    console.error('Error saving enquiry to Firestore:', error);
    throw error;
  }
};

export const deleteRemoteEnquiry = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.ENQUIRIES, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting enquiry from Firestore:', error);
    throw error;
  }
};

// --- FAQS ---
export const subscribeFAQs = (onUpdate: (faqs: FAQItem[]) => void, onError?: (err: Error) => void) => {
  const colRef = collection(db, COLLECTIONS.FAQS);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: FAQItem[] = [];
      snapshot.forEach((d) => {
        items.push({ ...(d.data() as FAQItem), id: d.id });
      });
      if (items.length > 0) {
        onUpdate(items);
      }
    },
    (err) => {
      console.warn('FAQs snapshot error:', err);
      onError?.(err);
    }
  );
};

export const saveRemoteFAQ = async (faq: FAQItem): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.FAQS, faq.id);
    await setDoc(docRef, cleanForFirestore(faq), { merge: true });
  } catch (error) {
    console.error('Error saving FAQ to Firestore:', error);
    throw error;
  }
};

export const deleteRemoteFAQ = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.FAQS, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting FAQ from Firestore:', error);
    throw error;
  }
};

// --- ANALYTICS ---
export const saveRemoteAnalyticsEvent = async (event: AnalyticsEvent): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.ANALYTICS, event.id);
    await setDoc(docRef, event);
  } catch (error) {
    console.warn('Error saving analytics event to Firestore:', error);
  }
};

// --- SEED DATABASE ---
// Seeds initial dataset to Firestore if empty so the user never starts with a blank screen
export const seedFirestoreIfEmpty = async (): Promise<boolean> => {
  try {
    const settingsDoc = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'general'));
    if (!settingsDoc.exists()) {
      console.log('Seeding initial site settings to Firestore...');
      await setDoc(doc(db, COLLECTIONS.SETTINGS, 'general'), initialSiteSettings);
    }

    const prodSnap = await getDocs(collection(db, COLLECTIONS.PRODUCTS));
    if (prodSnap.empty) {
      console.log('Seeding initial products to Firestore...');
      const batch = writeBatch(db);
      initialProducts.forEach((p) => {
        batch.set(doc(db, COLLECTIONS.PRODUCTS, p.id), cleanForFirestore(p));
      });
      await batch.commit();
    }

    const mtoSnap = await getDocs(collection(db, COLLECTIONS.MADE_TO_ORDER));
    if (mtoSnap.empty) {
      console.log('Seeding initial made-to-order products to Firestore...');
      const batch = writeBatch(db);
      initialMadeToOrderProducts.forEach((m) => {
        batch.set(doc(db, COLLECTIONS.MADE_TO_ORDER, m.id), m);
      });
      await batch.commit();
    }

    const portSnap = await getDocs(collection(db, COLLECTIONS.PORTFOLIO));
    if (portSnap.empty) {
      console.log('Seeding initial portfolio projects to Firestore...');
      const batch = writeBatch(db);
      initialPortfolioProjects.forEach((p) => {
        batch.set(doc(db, COLLECTIONS.PORTFOLIO, p.id), p);
      });
      await batch.commit();
    }

    const faqSnap = await getDocs(collection(db, COLLECTIONS.FAQS));
    if (faqSnap.empty) {
      console.log('Seeding initial FAQs to Firestore...');
      const batch = writeBatch(db);
      initialFAQs.forEach((f) => {
        batch.set(doc(db, COLLECTIONS.FAQS, f.id), f);
      });
      await batch.commit();
    }

    const enqSnap = await getDocs(collection(db, COLLECTIONS.ENQUIRIES));
    if (enqSnap.empty) {
      console.log('Seeding initial enquiries to Firestore...');
      const batch = writeBatch(db);
      initialEnquiries.forEach((e) => {
        batch.set(doc(db, COLLECTIONS.ENQUIRIES, e.id), e);
      });
      await batch.commit();
    }

    return true;
  } catch (err) {
    console.warn('Seed operation encountered an issue:', err);
    return false;
  }
};

// Force push all local data to Firestore
export const pushAllDataToFirestore = async (
  settings: SiteSettings,
  products: Product[],
  portfolio: PortfolioProject[],
  faqs: FAQItem[],
  enquiries: UpholsteryEnquiry[],
  madeToOrder?: MadeToOrderProduct[]
): Promise<void> => {
  try {
    // 1. Settings
    await setDoc(doc(db, COLLECTIONS.SETTINGS, 'general'), settings);

    // 2. Products
    const prodBatch = writeBatch(db);
    products.forEach((p) => {
      prodBatch.set(doc(db, COLLECTIONS.PRODUCTS, p.id), p);
    });
    await prodBatch.commit();

    // 2b. Made to Order Products
    if (madeToOrder && madeToOrder.length > 0) {
      const mtoBatch = writeBatch(db);
      madeToOrder.forEach((m) => {
        mtoBatch.set(doc(db, COLLECTIONS.MADE_TO_ORDER, m.id), m);
      });
      await mtoBatch.commit();
    }

    // 3. Portfolio
    const portBatch = writeBatch(db);
    portfolio.forEach((p) => {
      portBatch.set(doc(db, COLLECTIONS.PORTFOLIO, p.id), p);
    });
    await portBatch.commit();

    // 4. FAQs
    const faqBatch = writeBatch(db);
    faqs.forEach((f) => {
      faqBatch.set(doc(db, COLLECTIONS.FAQS, f.id), f);
    });
    await faqBatch.commit();

    // 5. Enquiries
    const enqBatch = writeBatch(db);
    enquiries.forEach((e) => {
      enqBatch.set(doc(db, COLLECTIONS.ENQUIRIES, e.id), e);
    });
    await enqBatch.commit();
  } catch (error) {
    console.error('Failed to batch push all data to Firestore:', error);
    throw error;
  }
};

// --- AUTHENTICATION HELPERS ---
export const signInAdmin = async (email: string, pass: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
};

export const registerAdmin = async (email: string, pass: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
};

export const signInWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
};

export const signOutAdminUser = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthStatusChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
