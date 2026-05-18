import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Croissant, Leaf, Cake, Truck, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedStats } from '../components/PremiumFeatures';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const whyChoose = [
  { icon: <Croissant size={28} />, title: 'Baked Fresh Daily', desc: 'In-house daily production' },
  { icon: <Leaf size={28} />, title: 'Locally Sourced', desc: 'High-quality Nepali ingredients' },
  { icon: <Cake size={28} />, title: 'Custom Cakes', desc: 'Made for your special occasions' },
  { icon: <Truck size={28} />, title: 'Free Delivery', desc: 'On orders above Rs. 2,000' },
];

const featuredProducts = [
  {
    name: 'Chocolate Doughnut',
    price: 'Rs. 40–80',
    img: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Red Velvet Cake',
    price: 'Rs. 1,200',
    img: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Custom Photo Cake',
    price: 'Rs. 2,000+',
    img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Croissant',
    price: 'Rs. 80–250',
    img: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const testimonials = [
  {
    quote: "The sourdough bread is simply outstanding. The crust is perfectly crisp.",
    name: 'Suraj Thapa',
  },
  {
    quote: "Nothing compares to the chocolate croissants here. Quality ingredients in every bite.",
    name: 'Rahul Dhakal',
  },
  {
    quote: "Truly the best bakery in Bharatpur.",
    name: 'Priya Sharma',
  },
];

const tickerText = 'Free Delivery From Rs. 2000  •  Fresh Products Every Day  •  Bakery & Barista Classes  •  Custom Cakes for Every Occasion  •  Seasonal Specials  •  Order Online, Pickup at Store  •  Free Delivery From Rs. 2000  •  Fresh Products Every Day  •  Bakery & Barista Classes  •  Custom Cakes for Every Occasion  •  Seasonal Specials  •  Order Online, Pickup at Store';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate/70 via-chocolate/50 to-chocolate/85" />

        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold/90 text-sm md:text-base tracking-[0.25em] uppercase font-medium mb-6"
          >
            EST. 2077 BS — BHARATPUR, CHITWAN
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-playfair text-cream text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-2"
          >
            Baked Fresh,
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="font-dancing text-gold text-4xl md:text-6xl lg:text-7xl mb-8"
          >
            Crafted with Care
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-cream/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Artisanal breads, pastries, and cakes made daily with locally sourced ingredients and a whole lot of love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/menu"
              className="border-2 border-caramel hover:bg-caramel hover:text-ivory text-caramel font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 flex items-center gap-2 justify-center"
            >
              Explore Our Menu <ArrowRight size={18} />
            </Link>
            <Link
              to="/order"
              className="bg-gold hover:bg-caramel text-ivory font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 flex items-center gap-2 justify-center"
            >
              Order Online
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-cream/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Scrolling Ticker */}
      <section className="bg-caramel overflow-hidden py-4">
        <div className="flex whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          <span className="text-ivory/90 text-sm font-medium tracking-wide px-4">
            {tickerText}
          </span>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Animated Stats */}
      <section className="bg-caramel py-12">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedStats />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-dancing text-gold text-2xl mb-2">Why Kathmandu Bakery</p>
            <h2 className="font-playfair text-chocolate text-4xl md:text-5xl font-bold">
              Why Choose Us
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChoose.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg border border-cream/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-gold mx-auto mb-5">
                  {icon}
                </div>
                <h3 className="font-playfair text-chocolate text-lg font-bold mb-2">{title}</h3>
                <p className="text-caramel/70 text-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-dancing text-gold text-2xl mb-2">Fresh From the Oven</p>
            <h2 className="font-playfair text-chocolate text-4xl md:text-5xl font-bold">
              Our Most Loved Items
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                custom={i}
                className="product-card bg-ivory rounded-2xl overflow-hidden shadow-md group"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-chocolate text-xl font-bold mb-1">{item.name}</h3>
                  <p className="font-semibold text-gold text-lg mb-4">{item.price}</p>
                  <Link
                    to="/order"
                    className="block w-full text-center bg-chocolate hover:bg-caramel text-ivory font-semibold py-2.5 rounded-full text-sm transition-colors duration-200"
                  >
                    Order Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-dancing text-gold text-2xl mb-2">Hear From Our Community</p>
            <h2 className="font-playfair text-chocolate text-4xl md:text-5xl font-bold">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-10 md:p-14 text-center shadow-md border border-cream/50"
            >
              <div className="flex gap-1 justify-center mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={20} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="font-playfair text-chocolate text-xl md:text-2xl italic leading-relaxed mb-6">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </p>
              <p className="text-caramel font-semibold text-base">
                — {testimonials[currentTestimonial].name}
              </p>
            </motion.div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream hover:bg-gold hover:text-ivory text-chocolate rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-cream hover:bg-gold hover:text-ivory text-chocolate rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentTestimonial ? 'bg-gold w-6' : 'bg-cream'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Classes Teaser */}
      <section className="py-20 bg-cream/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Baking class"
                loading="lazy"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              <p className="font-dancing text-gold text-2xl mb-3">Hands-On Learning</p>
              <h2 className="font-playfair text-chocolate text-3xl md:text-4xl font-bold leading-tight mb-6">
                Learn the Art of Baking &amp; Coffee
              </h2>
              <p className="text-caramel/80 text-lg leading-relaxed mb-4">
                Our <strong className="text-chocolate">Bakery Class</strong> takes you from flour mixing fundamentals to crafting beautiful breads, muffins, croissants, and celebration cakes.
              </p>
              <p className="text-caramel/70 leading-relaxed mb-8">
                In our <strong className="text-chocolate">Barista Class</strong>, master espresso extraction, milk steaming, latte art, and a range of brewing methods under the guidance of our certified baristas.
              </p>
              <Link
                to="/classes"
                className="inline-flex items-center gap-2 bg-gold hover:bg-caramel text-ivory font-semibold px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                View Classes <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Teaser */}
      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-dancing text-gold text-2xl mb-2">Find Us Nearby</p>
            <h2 className="font-playfair text-chocolate text-4xl md:text-5xl font-bold mb-8">
              Two Locations in Bharatpur
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-3 bg-white border border-cream px-6 py-4 rounded-full shadow-sm">
                <MapPin size={18} className="text-gold" />
                <span className="font-playfair text-chocolate font-semibold">Chaubiskothi</span>
              </div>
              <div className="flex items-center gap-3 bg-white border border-cream px-6 py-4 rounded-full shadow-sm">
                <MapPin size={18} className="text-gold" />
                <span className="font-playfair text-chocolate font-semibold">Saptagandaki Chowk</span>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-ivory font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
            >
              Get Directions <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-chocolate py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-dancing text-gold text-2xl mb-2">Stay in the Loop</p>
            <h2 className="font-playfair text-cream text-3xl md:text-4xl font-bold mb-4">
              Fresh Bakes &amp; Special Offers
            </h2>
            <p className="text-cream/70 mb-8">
              Subscribe for weekly specials, new menu items, class schedules, and exclusive discounts.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-caramel/30 border border-caramel/50 focus:border-gold text-cream placeholder-cream/40 px-5 py-3 rounded-full outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-caramel text-ivory font-semibold px-7 py-3 rounded-full transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
