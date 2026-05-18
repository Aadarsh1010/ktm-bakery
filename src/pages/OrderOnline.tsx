import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Truck, Store, MessageCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: 'easeOut' as const },
  }),
};

type CartItem = { name: string; price: number; qty: number; img: string };
type OrderType = 'delivery' | 'pickup';
type Tab = 'Bakery' | 'Pastry' | 'Kitchen';

const menuItems: Record<Tab, { name: string; price: number; img: string }[]> = {
  Bakery: [
    { name: 'Bread', price: 105, img: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Muffin', price: 65, img: 'https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Doughnut', price: 60, img: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Croissant', price: 165, img: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Pizza Base', price: 90, img: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Burger Bun', price: 100, img: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Patties', price: 115, img: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Cookies', price: 250, img: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ],
  Pastry: [
    { name: 'White Forest Slice', price: 125, img: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Red Velvet Cake', price: 1200, img: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Chocolate Cake', price: 1400, img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Cheesecake', price: 1800, img: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Custom Photo Cake', price: 2000, img: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Anniversary Cake', price: 3500, img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Wedding Cake', price: 4500, img: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Engagement Cake', price: 5000, img: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ],
  Kitchen: [
    { name: 'Breakfast Set', price: 538, img: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Veg Snacks', price: 263, img: 'https://images.pexels.com/photos/6605210/pexels-photo-6605210.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Non-Veg Snacks', price: 388, img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Momos', price: 270, img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Pizza', price: 575, img: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Burger', price: 313, img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Spaghetti', price: 425, img: 'https://images.pexels.com/photos/6605210/pexels-photo-6605210.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Wings', price: 470, img: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ],
};

const tabs: Tab[] = ['Bakery', 'Pastry', 'Kitchen'];

export default function OrderOnline() {
  const [activeTab, setActiveTab] = useState<Tab>('Bakery');
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', branch: 'Chaubiskothi', notes: '' });

  const items = menuItems[activeTab];

  const addToCart = (item: (typeof items)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) return prev.map((c) => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => c.name === name ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  };

  const total = useMemo(() => cart.reduce((sum, c) => sum + c.price * c.qty, 0), [cart]);
  const itemCount = useMemo(() => cart.reduce((sum, c) => sum + c.qty, 0), [cart]);
  const freeDelivery = total >= 2000;

  const buildWhatsAppMessage = () => {
    const lines = cart.map((c) => `  - ${c.name} x${c.qty} (Rs. ${c.price * c.qty})`);
    const type = orderType === 'delivery' ? 'Delivery' : 'Pickup';
    const location = orderType === 'pickup' ? ` from ${form.branch}` : '';
    const addr = orderType === 'delivery' ? `\nAddress: ${form.address}` : '';
    return encodeURIComponent(
      `Hi Kathmandu Bakery! I'd like to order:\n\n${lines.join('\n')}\n\nTotal: Rs. ${total}\nType: ${type}${location}\nName: ${form.name}\nPhone: ${form.phone}${addr}${form.notes ? `\nNotes: ${form.notes}` : ''}`
    );
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-64 md:h-72 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=1400)' }}
        />
        <div className="absolute inset-0 bg-chocolate/75" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-playfair text-cream text-4xl md:text-5xl font-bold mb-2">Order Fresh, Pickup or Delivery</h1>
          <p className="text-gold font-semibold text-lg">Free delivery on orders above Rs. 2,000!</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Order Type Selector */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setOrderType('delivery')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
              orderType === 'delivery'
                ? 'bg-chocolate text-ivory shadow-lg'
                : 'bg-cream/60 text-caramel hover:bg-cream'
            }`}
          >
            <Truck size={22} />
            <div className="text-left">
              <span className="block">Delivery</span>
              <span className="text-xs font-normal opacity-70">Free above Rs. 2,000</span>
            </div>
          </button>
          <button
            onClick={() => setOrderType('pickup')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
              orderType === 'pickup'
                ? 'bg-chocolate text-ivory shadow-lg'
                : 'bg-cream/60 text-caramel hover:bg-cream'
            }`}
          >
            <Store size={22} />
            <div className="text-left">
              <span className="block">Pickup</span>
              <span className="text-xs font-normal opacity-70">Chaubiskothi or Saptagandaki</span>
            </div>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left — Products */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-chocolate text-ivory shadow-md'
                      : 'bg-cream/60 text-caramel hover:bg-cream'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((item, i) => {
                const inCart = cart.find((c) => c.name === item.name);
                return (
                  <motion.div
                    key={item.name}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="product-card bg-white rounded-xl overflow-hidden shadow-sm border border-cream/50 group"
                    style={{ willChange: 'transform' }}
                  >
                    <div className="relative overflow-hidden h-40">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-playfair text-chocolate font-semibold mb-1">{item.name}</h3>
                      <p className="text-gold font-bold mb-3">Rs. {item.price}</p>
                      {inCart ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.name, -1)}
                            className="w-8 h-8 rounded-full bg-cream flex items-center justify-center hover:bg-caramel/20 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-semibold text-chocolate w-4 text-center">{inCart.qty}</span>
                          <button
                            onClick={() => updateQty(item.name, 1)}
                            className="w-8 h-8 rounded-full bg-chocolate text-ivory flex items-center justify-center hover:bg-caramel transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full bg-chocolate hover:bg-caramel text-ivory text-sm font-semibold py-2.5 rounded-full transition-colors duration-200"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — Cart Sidebar */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-md border border-cream/50 sticky top-24">
              <div className="flex items-center justify-between px-6 py-5 border-b border-cream">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-chocolate" />
                  <h2 className="font-playfair text-chocolate text-xl font-bold">Your Order</h2>
                </div>
                {itemCount > 0 && (
                  <span className="bg-gold text-ivory text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="px-6 py-12 text-center text-caramel/50">
                  <ShoppingBag size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Your cart is empty.<br />Add items from the menu.</p>
                </div>
              ) : (
                <>
                  <ul className="px-6 py-4 space-y-4 max-h-64 overflow-y-auto">
                    {cart.map((c) => (
                      <li key={c.name} className="flex items-center gap-3">
                        <img src={c.img} alt={c.name} loading="lazy" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-chocolate text-sm font-medium truncate">{c.name}</p>
                          <p className="text-gold text-xs">Rs. {c.price} x {c.qty} = Rs. {c.price * c.qty}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQty(c.name, -1)} className="p-1 text-caramel/50 hover:text-caramel">
                            <Minus size={14} />
                          </button>
                          <span className="text-xs w-4 text-center">{c.qty}</span>
                          <button onClick={() => updateQty(c.name, 1)} className="p-1 text-caramel/50 hover:text-caramel">
                            <Plus size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="px-6 pb-4 border-t border-cream pt-4">
                    <div className="flex justify-between font-bold text-chocolate mb-2">
                      <span>Total</span>
                      <span className="text-gold">Rs. {total.toLocaleString()}</span>
                    </div>
                    <p className={`text-xs mb-4 ${freeDelivery ? 'text-emerald-600' : 'text-caramel/60'}`}>
                      {freeDelivery ? 'You qualify for free delivery!' : `Rs. ${(2000 - total).toLocaleString()} more for free delivery`}
                    </p>

                    {!showForm ? (
                      <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-gold hover:bg-caramel text-ivory font-semibold py-3 rounded-full transition-colors duration-300"
                      >
                        Proceed to Order
                      </button>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const url = `https://wa.me/9779855033338?text=${buildWhatsAppMessage()}`;
                          window.open(url, '_blank');
                        }}
                        className="space-y-3 mt-2"
                      >
                        <input
                          required
                          placeholder="Full Name *"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border border-cream focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
                        />
                        <input
                          required
                          type="tel"
                          placeholder="Phone Number * (for WhatsApp)"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full border border-cream focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
                        />
                        {orderType === 'delivery' ? (
                          <input
                            required
                            placeholder="Delivery Address *"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="w-full border border-cream focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
                          />
                        ) : (
                          <select
                            value={form.branch}
                            onChange={(e) => setForm({ ...form, branch: e.target.value })}
                            className="w-full border border-cream focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors text-caramel"
                          >
                            <option>Chaubiskothi</option>
                            <option>Saptagandaki Chowk</option>
                          </select>
                        )}
                        <textarea
                          placeholder="Special instructions (optional)"
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          rows={2}
                          className="w-full border border-cream focus:border-gold rounded-lg px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={16} /> Place Order via WhatsApp
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-10 text-center text-caramel/60 text-sm">
          We will confirm your order via WhatsApp and notify you when it is ready.
        </div>
      </div>
    </main>
  );
}