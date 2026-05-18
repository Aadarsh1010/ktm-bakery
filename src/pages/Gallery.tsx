import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Instagram, Play } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

type GalleryItem = {
  src: string;
  thumb: string;
  title: string;
  category: string;
  tall?: boolean;
};

const galleryItems: GalleryItem[] = [
  { src: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Fresh Sourdough Bread', category: 'Bakery', tall: true },
  { src: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Pastry Selection', category: 'Cakes & Pastry' },
  { src: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Bakery Interior', category: 'Bakery', tall: true },
  { src: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Coffee Latte Art', category: 'Café' },
  { src: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Cake Decoration', category: 'Cakes & Pastry' },
  { src: 'https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Bread Making Class', category: 'Classes' },
  { src: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Seasonal Fruit Tarts', category: 'Cakes & Pastry', tall: true },
  { src: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Our Bakery Team', category: 'Team' },
  { src: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Wedding Cake', category: 'Cakes & Pastry' },
  { src: 'https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Custom Birthday Cake', category: 'Cakes & Pastry', tall: true },
  { src: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Barista Class in Action', category: 'Classes' },
  { src: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1200', thumb: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Chocolate Doughnut Display', category: 'Bakery' },
];

const tabs = ['All', 'Bakery', 'Cakes & Pastry', 'Café', 'Classes', 'Team'];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [, setLightboxIndex] = useState(0);

  const filtered = activeTab === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeTab);

  const openLightbox = (item: GalleryItem, idx: number) => {
    setLightbox(item);
    setLightboxIndex(idx);
  };

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => {
      const next = (prev + 1) % filtered.length;
      setLightbox(filtered[next]);
      return next;
    });
  }, [filtered]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      const next = (prev - 1 + filtered.length) % filtered.length;
      setLightbox(filtered[next]);
      return next;
    });
  }, [filtered]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, goNext, goPrev]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1400)' }}
        />
        <div className="absolute inset-0 bg-chocolate/75" />
        <div className="relative z-10 text-center px-4">
          <p className="font-dancing text-gold text-2xl mb-2">Through Our Lens</p>
          <h1 className="font-playfair text-cream text-5xl md:text-6xl font-bold">Gallery</h1>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 md:top-20 z-30 bg-ivory/95 backdrop-blur-sm border-b border-cream shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-chocolate text-ivory shadow-md'
                    : 'bg-cream/60 text-caramel hover:bg-cream'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  onClick={() => openLightbox(item, i)}
                  className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
                  style={{ willChange: 'transform' }}
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      item.tall ? 'h-80' : 'h-56'
                    }`}
                  />
                  <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/60 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn
                      size={28}
                      className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-gold text-ivory text-xs font-semibold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-chocolate/80 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-ivory text-sm font-medium">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-dark/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                loading="lazy"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-chocolate/90 to-transparent px-6 py-4 rounded-b-xl">
                <p className="font-playfair text-cream text-lg">{lightbox.title}</p>
                <p className="text-cream/60 text-sm">{lightbox.category}</p>
              </div>

              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-chocolate/70 hover:bg-gold text-ivory rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-chocolate/70 hover:bg-gold text-ivory rounded-full flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>

              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-cream/70 hover:text-cream transition-colors"
                aria-label="Close"
              >
                <X size={28} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Instagram size={30} className="text-white" />
            </div>
            <h2 className="font-playfair text-chocolate text-3xl md:text-4xl font-bold mb-2">
              @kathmandu.bakery.chitwan
            </h2>
            <p className="text-gold font-semibold text-lg mb-3">1,400+ Followers</p>
            <p className="text-caramel/70 mb-8 max-w-md mx-auto">
              Follow us for daily bakes, specials, and sweet moments
            </p>
            <a
              href="https://instagram.com/kathmandu.bakery.chitwan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-full transition-opacity duration-300"
            >
              <Instagram size={18} /> Follow on Instagram
            </a>
            <p className="text-caramel/50 text-sm mt-4">Tag us for a chance to be featured!</p>
          </motion.div>
        </div>
      </section>

      {/* Video/Reel Teaser */}
      <section className="py-20 bg-cream/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-dancing text-gold text-2xl mb-2">Behind the Scenes</p>
            <h2 className="font-playfair text-chocolate text-3xl md:text-4xl font-bold mb-8">
              Watch Our Latest Reels
            </h2>

            <div className="bg-chocolate/5 rounded-2xl overflow-hidden border border-cream/50 aspect-video flex items-center justify-center mb-8">
              <iframe
                src="about:blank"
                className="w-full h-full"
                title="Facebook Reels"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ display: 'none' }}
              />
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-chocolate/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play size={28} className="text-chocolate/40" />
                </div>
                <p className="text-caramel/50 text-sm">Video content coming soon</p>
              </div>
            </div>

            <a
              href="https://facebook.com/KathmanduBakeryCakes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-chocolate hover:bg-caramel text-ivory font-semibold px-8 py-3.5 rounded-full transition-colors duration-300"
            >
              Watch Our Latest Reels on Facebook
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
