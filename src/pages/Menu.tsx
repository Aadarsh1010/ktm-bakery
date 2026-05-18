import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: 'easeOut' as const },
  }),
};

type Tab = 'Bakery' | 'Pastry & Cakes' | 'Kitchen & Café';

type MenuItem = {
  name: string;
  tagline: string;
  price: string;
  img: string;
};

const menuData: Record<Tab, MenuItem[]> = {
  Bakery: [
    { name: 'Bread', tagline: 'Soft, Classic, and Perfectly Fresh Every Time!', price: 'Rs. 80–130', img: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Muffin', tagline: 'Fluffy, Moist, and Bursting with Flavor', price: 'Rs. 50–80', img: 'https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Doughnut', tagline: 'Sweet Rings of Joy, Glazed to Perfection', price: 'Rs. 40–80', img: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Croissant', tagline: 'Buttery, Flaky Layers That Melt in Your Mouth', price: 'Rs. 80–250', img: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Pizza Base', tagline: 'Crispy Outside, Soft and Chewy Inside', price: 'Rs. 90', img: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Burger Bun', tagline: 'Soft, Fresh, Built to Hold Your Perfect Bite', price: 'Rs. 100', img: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Patties', tagline: 'Juicy, Flavor-Packed, and Made to Sizzle', price: 'Rs. 80–150', img: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Cookies', tagline: 'Crunchy, Chewy, Full of Sweet Delight', price: 'Rs. 150–350', img: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=500' },
  ],
  'Pastry & Cakes': [
    { name: 'White Forest', tagline: 'Delicate white chocolate and cherry layers', price: 'Rs. 100–150', img: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Red Velvet', tagline: 'Rich, velvety, and beautifully red', price: 'Rs. 1,200', img: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Chocolate Cake', tagline: 'Deep, indulgent chocolate paradise', price: 'Rs. 1,400', img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Cheesecake', tagline: 'Creamy, smooth, and utterly divine', price: 'Rs. 1,800', img: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Custom Photo Cakes', tagline: 'Your memories, beautifully edible', price: 'Rs. 2,000+', img: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Anniversary Cakes', tagline: 'Celebrate your milestones with sweetness', price: 'Rs. 3,500', img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Wedding Cakes', tagline: 'Elegant multi-tier masterpieces for your big day', price: 'Rs. 4,500', img: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Engagement Cakes', tagline: 'Mark the beginning of forever', price: 'Rs. 5,000', img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500' },
  ],
  'Kitchen & Café': [
    { name: 'Breakfast Set', tagline: 'A wholesome start to your morning', price: 'Rs. 475–600', img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Veg Snacks', tagline: 'Light, crispy, and satisfying', price: 'Rs. 150–375', img: 'https://images.pexels.com/photos/6605210/pexels-photo-6605210.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Non-Veg Snacks', tagline: 'Savory, hearty, and packed with flavor', price: 'Rs. 300–475', img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Momos', tagline: 'Steamed perfection, Nepali style', price: 'Rs. 245–295', img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Pizza', tagline: 'Loaded, cheesy, and oven-fresh', price: 'Rs. 425–725', img: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Burger', tagline: 'Juicy patties between freshly baked buns', price: 'Rs. 225–400', img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Spaghetti', tagline: 'Al dente pasta in rich, savory sauces', price: 'Rs. 325–525', img: 'https://images.pexels.com/photos/6605210/pexels-photo-6605210.jpeg?auto=compress&cs=tinysrgb&w=500' },
    { name: 'Wings', tagline: 'Crispy, saucy, and finger-licking good', price: 'Rs. 390–550', img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=500' },
  ],
};

const tabs: Tab[] = ['Bakery', 'Pastry & Cakes', 'Kitchen & Café'];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<Tab>('Bakery');
  const items = menuData[activeTab];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=1400)' }}
        />
        <div className="absolute inset-0 bg-chocolate/75" />
        <div className="relative z-10 text-center px-4">
          <p className="font-dancing text-gold text-2xl mb-2">Our Menu</p>
          <h1 className="font-playfair text-cream text-5xl md:text-6xl font-bold mb-3">Handcrafted with Love</h1>
          <p className="text-cream/70 text-lg">and the Finest Ingredients</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-16 md:top-20 z-30 bg-ivory/95 backdrop-blur-sm border-b border-cream shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
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

      {/* Menu Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-cream/40 group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-playfair text-chocolate text-lg font-bold mb-1">{item.name}</h3>
                    <p className="text-caramel/60 text-sm italic mb-3 leading-snug">{item.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gold">{item.price}</span>
                      <Link
                        to="/order"
                        className="flex items-center gap-1.5 bg-chocolate hover:bg-caramel text-ivory text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200"
                      >
                        <ShoppingBag size={13} /> Order
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Custom Cake Banner */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=1400)' }}
        />
        <div className="absolute inset-0 bg-chocolate/80" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-dancing text-gold text-2xl mb-3">Something Special?</p>
            <h2 className="font-playfair text-cream text-4xl md:text-5xl font-bold mb-4">
              Need a Custom Cake?
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-8">
              Birthday, Wedding, Anniversary, Engagement — we create cakes for every occasion!
            </p>
            <a
              href="https://wa.me/9779855033338?text=Hi%2C%20I%27d%20like%20to%20order%20a%20custom%20cake"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-caramel text-ivory font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              <MessageCircle size={18} /> Request Custom Cake
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
