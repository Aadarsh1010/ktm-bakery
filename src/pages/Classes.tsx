import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, IndianRupee, CheckCircle, ChevronDown, MessageCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const bakeryLearnings = [
  'Flour mixing basics',
  'Breads and burger buns',
  'Muffins and doughnuts',
  'Croissants and patties',
  'Cake decoration',
];

const baristaLearnings = [
  'Espresso extraction',
  'Milk steaming techniques',
  'Latte art',
  'Brewing methods',
  'Coffee menu basics',
];

const faqs = [
  {
    q: 'Do I need prior experience?',
    a: 'Not at all! Our classes are designed for complete beginners as well as those with some experience. Our instructors guide you step by step, ensuring everyone learns at their own pace.',
  },
  {
    q: 'What will I receive after completing?',
    a: 'You will receive a Certificate of Completion from Kathmandu Bakery, along with a recipe booklet so you can recreate everything at home.',
  },
  {
    q: 'Can I join with a friend?',
    a: 'Absolutely! We encourage joining with friends or family. It makes the experience even more enjoyable, and we offer a small group discount for pairs.',
  },
  {
    q: 'Is lunch/refreshments included?',
    a: 'Yes — light refreshments and beverages are included in the class fee. For the Bakery Class, you also get to take home everything you bake!',
  },
  {
    q: 'How do I pay the class fee?',
    a: 'You can pay via bank transfer, eSewa, Khalti, or cash at the bakery. We will share payment details once you submit the enrollment form.',
  },
];

export default function Classes() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    classType: 'Bakery',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg?auto=compress&cs=tinysrgb&w=1400)' }}
        />
        <div className="absolute inset-0 bg-chocolate/75" />
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <p className="font-dancing text-gold text-2xl mb-2">Hands-On Experience</p>
          <h1 className="font-playfair text-cream text-5xl md:text-6xl font-bold mb-3">Learn With Us</h1>
          <p className="text-cream/80 text-lg">
            Master the art of baking and coffee making from our expert instructors
          </p>
        </div>
      </section>

      {/* Two Class Cards */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Bakery Class */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-cream/50"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bakery Class"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/60 to-transparent" />
                <h2 className="absolute bottom-5 left-6 font-playfair text-cream text-3xl font-bold">
                  Bakery Class
                </h2>
              </div>
              <div className="p-7">
                <p className="text-caramel/80 leading-relaxed mb-6">
                  A hands-on learning experience where you will master everything from basic flour mixing to breads, muffins, doughnuts, croissants, cakes, and more.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="flex items-center gap-2 bg-cream text-chocolate text-sm font-medium px-4 py-2 rounded-full">
                    <Clock size={15} className="text-gold" /> Duration: 2 Hours
                  </span>
                  <span className="flex items-center gap-2 bg-cream text-chocolate text-sm font-medium px-4 py-2 rounded-full">
                    <Calendar size={15} className="text-gold" /> Sunday–Friday
                  </span>
                  <span className="flex items-center gap-2 bg-cream text-chocolate text-sm font-medium px-4 py-2 rounded-full">
                    <IndianRupee size={15} className="text-gold" /> NPR 25,000
                  </span>
                </div>

                <h3 className="font-playfair text-chocolate text-lg font-bold mb-3">What you will learn</h3>
                <ul className="space-y-2.5 mb-7">
                  {bakeryLearnings.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-caramel/80 text-sm">
                      <CheckCircle size={16} className="text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#enroll"
                  className="block w-full text-center bg-gold hover:bg-caramel text-ivory font-semibold py-3.5 rounded-full transition-colors duration-300"
                >
                  Enroll Now
                </a>
              </div>
            </motion.div>

            {/* Barista Class */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-cream/50"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Barista Class"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/60 to-transparent" />
                <h2 className="absolute bottom-5 left-6 font-playfair text-cream text-3xl font-bold">
                  Barista Class
                </h2>
              </div>
              <div className="p-7">
                <p className="text-caramel/80 leading-relaxed mb-6">
                  A comprehensive, hands-on experience covering espresso extraction, milk steaming, latte art, and various brewing methods.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="flex items-center gap-2 bg-cream text-chocolate text-sm font-medium px-4 py-2 rounded-full">
                    <Clock size={15} className="text-gold" /> Duration: 1.5 Hours
                  </span>
                  <span className="flex items-center gap-2 bg-cream text-chocolate text-sm font-medium px-4 py-2 rounded-full">
                    <Calendar size={15} className="text-gold" /> Sunday–Friday
                  </span>
                  <span className="flex items-center gap-2 bg-cream text-chocolate text-sm font-medium px-4 py-2 rounded-full">
                    <IndianRupee size={15} className="text-gold" /> NPR 15,000
                  </span>
                </div>

                <h3 className="font-playfair text-chocolate text-lg font-bold mb-3">What you will learn</h3>
                <ul className="space-y-2.5 mb-7">
                  {baristaLearnings.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-caramel/80 text-sm">
                      <CheckCircle size={16} className="text-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#enroll"
                  className="block w-full text-center bg-gold hover:bg-caramel text-ivory font-semibold py-3.5 rounded-full transition-colors duration-300"
                >
                  Enroll Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll" className="py-20 bg-cream/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="font-dancing text-gold text-2xl mb-2">Join Our Next Batch</p>
            <h2 className="font-playfair text-chocolate text-4xl font-bold">Register Your Interest</h2>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-10 text-center shadow-md border border-cream/50"
            >
              <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
              <h3 className="font-playfair text-chocolate text-2xl font-bold mb-2">Enquiry Submitted!</h3>
              <p className="text-caramel/70 mb-6">
                Thank you for your interest. We will contact you shortly to confirm your enrollment.
              </p>
              <a
                href="https://wa.me/9779855033338"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <MessageCircle size={16} /> WhatsApp Us Directly
              </a>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-md border border-cream/50 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-chocolate mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Class Selection *</label>
                  <select
                    required
                    value={form.classType}
                    onChange={(e) => setForm({ ...form, classType: e.target.value })}
                    className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors text-caramel"
                  >
                    <option>Bakery</option>
                    <option>Barista</option>
                    <option>Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors text-caramel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-chocolate mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="Any questions or special requests..."
                  className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-caramel text-ivory font-semibold py-3.5 rounded-full transition-colors duration-300"
              >
                Submit Enquiry
              </button>

              <p className="text-center text-caramel/60 text-sm">
                Or WhatsApp us at <a href="https://wa.me/9779855033338" target="_blank" rel="noopener noreferrer" className="text-gold font-medium hover:text-caramel transition-colors">+977 9855033338</a>
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-dancing text-gold text-2xl mb-2">Got Questions?</p>
            <h2 className="font-playfair text-chocolate text-4xl font-bold">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-white rounded-xl border border-cream/50 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-playfair text-chocolate font-semibold text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gold shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-caramel/70 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
