import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  LoadingScreen,
  TodaysSpecialPopup,
  WhatsAppFloat,
  BackToTop,
  DiscountBadge,
  StickyOrderBar,
  CookieConsent,
} from './components/PremiumFeatures';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Classes = lazy(() => import('./pages/Classes'));
const Gallery = lazy(() => import('./pages/Gallery'));
const OrderOnline = lazy(() => import('./pages/OrderOnline'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-cream border-t-gold rounded-full animate-spin mx-auto mb-4" />
        <p className="font-dancing text-caramel text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <LoadingScreen />
      <Navbar />
      <div id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/order" element={<OrderOnline />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <TodaysSpecialPopup />
      <WhatsAppFloat />
      <BackToTop />
      <DiscountBadge />
      <StickyOrderBar />
      <CookieConsent />
    </BrowserRouter>
  );
}
