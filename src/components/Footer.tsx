import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Croissant, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-chocolate text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Croissant size={24} className="text-gold" />
              <span className="font-playfair text-cream text-xl font-bold">Kathmandu Bakery</span>
            </div>
            <p className="font-dancing text-gold text-base mb-4">Let us fill your soul with sweetness!</p>
            <p className="text-sm leading-relaxed text-cream/60">
              Crafted with love since 2077 BS (2020 AD) in the heart of Bharatpur, Chitwan, Nepal.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://facebook.com/KathmanduBakeryCakes" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-cream/50 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/kathmandu.bakery.chitwan" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/50 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-cream text-lg font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/classes', label: 'Classes' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-cream/60 hover:text-gold transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-cream text-lg font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-cream/70">Chaubiskothi, Shanghai Plaza</p>
                  <p className="text-cream/50">Bharatpur-10, Chitwan</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-cream/70">Saptagandaki Chowk</p>
                  <p className="text-cream/50">Bharatpur-10, Chitwan</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:+9779855033338" className="text-cream/60 hover:text-gold transition-colors">+977 9855033338</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold shrink-0" />
                <a href="mailto:kathmandubakery321@gmail.com" className="text-cream/60 hover:text-gold transition-colors">kathmandubakery321@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Hours + Newsletter */}
          <div>
            <h4 className="font-playfair text-cream text-lg font-semibold mb-5">Opening Hours</h4>
            <ul className="space-y-2.5 text-sm mb-8">
              <li className="flex items-center gap-2 text-cream/60">
                <Clock size={14} className="text-gold shrink-0" /> Mon–Fri: 7:00 AM – 8:00 PM
              </li>
              <li className="flex items-center gap-2 text-cream/60">
                <Clock size={14} className="text-gold shrink-0" /> Saturday: 8:00 AM – 9:00 PM
              </li>
              <li className="flex items-center gap-2 text-cream/60">
                <Clock size={14} className="text-gold shrink-0" /> Sunday: 8:00 AM – 6:00 PM
              </li>
            </ul>

            <h4 className="font-playfair text-cream text-lg font-semibold mb-3">Newsletter</h4>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-caramel/20 border border-caramel/40 focus:border-gold text-cream placeholder-cream/30 px-4 py-2.5 rounded-full text-sm outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-caramel text-ivory px-4 py-2.5 rounded-full transition-colors"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-caramel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <span>&copy; 2026 Kathmandu Bakery. All rights reserved.</span>
          <span>Established 2077 BS — Bharatpur, Chitwan, Nepal</span>
        </div>
      </div>
    </footer>
  );
}
