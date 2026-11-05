import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { MadeToOrderPage } from './pages/MadeToOrderPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { UpholsteryPage } from './pages/UpholsteryPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { TermsOfSalePage } from './pages/TermsOfSalePage';
import { AdminPage } from './pages/AdminPage';
import { AdminLogin } from './components/AdminLogin';
import { QuoteModal } from './components/QuoteModal';
import { PrivacyModal } from './components/PrivacyModal';
import { CookieBanner } from './components/CookieBanner';
import { ToastContainer } from './components/ToastContainer';
import { SEOHead } from './components/SEOHead';
import { AnimatePresence, motion } from 'motion/react';

const MainContent: React.FC = () => {
  const { currentPage, isAdminAuthenticated } = useApp();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'made-to-order':
        return <MadeToOrderPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'upholstery':
        return <UpholsteryPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'cookies':
        return <CookiePolicyPage />;
      case 'terms':
        return <TermsOfSalePage />;
      case 'admin':
        return isAdminAuthenticated ? <AdminPage /> : <AdminLogin />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2723] selection:bg-[#E8DCC4] selection:text-[#1F1B18]">
      <SEOHead />
      <Header />
      
      <main className="grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      {/* Global Modals & Notifications */}
      <QuoteModal />
      <PrivacyModal isOpen={false} onClose={() => {}} type="privacy" />
      <CookieBanner />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
