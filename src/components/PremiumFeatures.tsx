import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp, X, ShoppingBag, Clock } from 'lucide-react';

/* ─── 1. Loading Screen ─── */
export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' as const }}
            className="text-6xl mb-6"
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 40C8 28 16 12 32 12C48 12 56 28 56 40C56 44 52 48 48 48H16C12 48 8 44 8 40Z" fill="#C9882C"/>
              <path d="M16 36C16 28 22 18 32 18C42 18 48 28 48 36" stroke="#F5D79E" strokeWidth="2" strokeLinecap="round"/>
              <path d="M24 12C26 8 30 6 32 6C34 6 38 8 40 12" stroke="#7B4A1E" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <p className="font-dancing text-caramel text-2xl">Baking something delicious...</p>
          <div className="mt-6 w-48 h-1 bg-cream rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' as const }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── 2. Today's Special Popup ─── */
export function TodaysSpecialPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('special-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem('special-dismissed', '1');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-6 z-40 max-w-xs bg-white rounded-2xl shadow-2xl border border-cream/50 overflow-hidden"
        >
          <button onClick={close} className="absolute top-3 right-3 z-10 w-7 h-7 bg-chocolate rounded-full flex items-center justify-center hover:bg-caramel transition-colors" aria-label="Close">
            <X size={14} className="text-ivory" />
          </button>
          <img
            src="https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Today's Special"
            loading="lazy"
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <span className="text-xs font-semibold text-gold bg-cream px-2 py-0.5 rounded-full">Today's Special</span>
            <h3 className="font-playfair text-chocolate text-lg font-bold mt-2">Chocolate Doughnut</h3>
            <p className="text-caramel/60 text-sm mt-1">Glazed to perfection, fresh from the oven</p>
            <div className="flex items-center justify-between mt-3">
              <span className="font-bold text-gold text-lg">Rs. 60</span>
              <a
                href="/order"
                className="bg-gold hover:bg-caramel text-ivory text-xs font-semibold px-4 py-2 rounded-full transition-colors"
              >
                Order Now
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── 3. WhatsApp Float Button ─── */
export function WhatsAppFloat() {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <AnimatePresence>
        {tooltip && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white text-chocolate text-sm font-medium px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap"
          >
            Chat with us!
          </motion.span>
        )}
      </AnimatePresence>
      <a
        href="https://wa.me/9779855033338"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}

/* ─── 4. Back to Top Button ─── */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          onClick={scrollUp}
          className="fixed bottom-6 right-24 z-40 w-12 h-12 bg-gold hover:bg-caramel text-ivory rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── 5. Discount Badge ─── */
export function DiscountBadge() {
  const [show, setShow] = useState(true);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="fixed top-28 right-4 z-30 hidden lg:block"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' as const }}
            className="bg-gold text-ivory px-4 py-3 rounded-xl shadow-lg text-center relative"
            style={{ willChange: 'transform' }}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute -top-1.5 -right-1.5 z-10 w-5 h-5 bg-gold hover:bg-caramel rounded-full flex items-center justify-center transition-colors"
              aria-label="Close discount badge"
            >
              <X size={10} className="text-ivory" />
            </button>
            <Clock size={16} className="mx-auto mb-1" />
            <p className="text-xs font-bold leading-tight">Discount<br />after 7 PM!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── 8. Animated Stats Counter ─── */
export function AnimatedStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 5, suffix: '+', label: 'Years of Excellence' },
    { value: 2, suffix: '', label: 'Locations in Bharatpur' },
    { value: 30, suffix: '+', label: 'Products Fresh Daily' },
    { value: 1400, suffix: '+', label: 'Happy Instagram Followers' },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map(({ value, suffix, label }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <span className="font-playfair text-cream text-3xl md:text-4xl font-bold">
            {inView ? <Counter target={value} /> : '0'}{suffix}
          </span>
          <span className="text-cream/70 text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const duration = 2000;
  const startTime = useRef(Date.now());

  useEffect(() => {
    const step = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);

  return <>{count.toLocaleString()}</>;
}

/* ─── 9. Sticky Order Bar (mobile) ─── */
export function StickyOrderBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-chocolate/95 backdrop-blur-sm border-t border-caramel/30 px-4 py-3">
      <a
        href="/order"
        className="flex items-center justify-center gap-2 bg-gold hover:bg-caramel text-ivory font-semibold py-3 rounded-full transition-colors w-full"
      >
        <ShoppingBag size={18} /> Order Now
      </a>
    </div>
  );
}

/* ─── 10. Cookie Consent ─── */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', '1');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-50 md:bottom-6 md:left-6 md:right-auto md:max-w-md bg-chocolate border-t border-caramel/30 md:rounded-xl md:border px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <p className="text-cream/70 text-sm flex-1">
            We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={accept}
              className="bg-gold hover:bg-caramel text-ivory text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => setShow(false)}
              className="text-cream/50 hover:text-cream text-sm px-3 py-2 transition-colors"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
