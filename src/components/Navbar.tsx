import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Phone, Facebook, Instagram, Croissant, Truck } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/classes', label: 'Classes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/order', label: 'Order Online' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const solid = scrolled || !isHome;

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-chocolate text-cream/80 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <span className="hidden sm:inline">Free Delivery above Rs. 2,000 <Truck size={13} className="inline ml-1 text-gold" /></span>
          <span className="sm:hidden text-gold font-medium">Free Delivery Rs. 2,000+</span>
          <a href="tel:+9779855033338" className="flex items-center gap-1.5 hover:text-gold transition-colors">
            <Phone size={13} /> +977 9855033338
          </a>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com/KathmanduBakeryCakes" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Facebook">
              <Facebook size={15} />
            </a>
            <a href="https://instagram.com/kathmandu.bakery.chitwan" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          solid ? 'bg-chocolate shadow-lg' : 'bg-transparent'
        }`}
        style={{ top: solid ? 0 : '2.25rem' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="Kathmandu Bakery Home">
            <Croissant size={28} className="text-gold" />
            <div className="flex flex-col leading-tight">
              <span className="font-playfair text-cream text-xl md:text-2xl font-bold tracking-wide">
                Kathmandu Bakery
              </span>
              <span className="font-dancing text-gold text-xs md:text-sm -mt-0.5">
                Let Us Fill Your Soul with Sweetness
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === to
                    ? 'text-gold'
                    : 'text-cream/80 hover:text-cream'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/order"
              className="ml-2 bg-gold hover:bg-caramel text-ivory text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
            >
              <ShoppingBag size={15} />
              Order Now
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden text-cream p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-chocolate border-t border-caramel/30"
            >
              <nav className="flex flex-col px-6 py-4 gap-4" aria-label="Mobile navigation">
                {links.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`text-base font-medium py-1 transition-colors ${
                      location.pathname === to
                        ? 'text-gold'
                        : 'text-cream/80 hover:text-cream'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  to="/order"
                  className="mt-2 bg-gold text-ivory font-semibold px-5 py-3 rounded-full text-center"
                >
                  Order Now
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
