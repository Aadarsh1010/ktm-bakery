import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send, CheckCircle, Navigation } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const locations = [
  {
    name: 'Chaubiskothi',
    address: 'Bharatpur-10, Chaubiskothi, Shanghai Plaza, Chitwan, Nepal',
    phones: ['+977 9855033338', '+977 9705033338'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0!2d84.4303444!3d27.6820499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQwJzU1LjQiTiA4NMKwMjUnNDkuMiJF!5e0!3m2!1sen!2snp!4v1700000000000',
  },
  {
    name: 'Saptagandaki Chowk',
    address: 'Bharatpur-10, Saptagandaki Chowk, Chitwan, Nepal',
    phones: ['+977 9705003338'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d84.435!3d27.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQxJzA2LjAiTiA4NMKwMjYnMDYuMCJF!5e0!3m2!1sen!2snp!4v1700000000001',
  },
];

const hours = [
  { day: 'Mon–Fri', time: '7:00 AM – 8:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '8:00 AM – 6:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1400)' }}
        />
        <div className="absolute inset-0 bg-chocolate/75" />
        <div className="relative z-10 text-center px-4">
          <p className="font-dancing text-gold text-2xl mb-2">We'd Love to Hear from You</p>
          <h1 className="font-playfair text-cream text-5xl md:text-6xl font-bold">Find Us</h1>
        </div>
      </section>

      {/* Two Location Cards */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-cream/50"
              >
                <iframe
                  src={loc.mapSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={loc.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale"
                />
                <div className="p-6">
                  <h3 className="font-playfair text-chocolate text-2xl font-bold mb-4">{loc.name}</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2.5 text-caramel/70">
                      <MapPin size={15} className="text-gold mt-0.5 shrink-0" />{loc.address}
                    </li>
                    {loc.phones.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-caramel/70">
                        <Phone size={15} className="text-gold shrink-0" />
                        <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{p}</a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 bg-chocolate hover:bg-caramel text-ivory text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
                  >
                    <Navigation size={15} /> Get Directions
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-16 bg-cream/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-dancing text-gold text-2xl mb-2">When We're Open</p>
            <h2 className="font-playfair text-chocolate text-3xl md:text-4xl font-bold mb-8">Opening Hours</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-cream/50 overflow-hidden">
              {hours.map(({ day, time }, i) => (
                <div
                  key={day}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i < hours.length - 1 ? 'border-b border-cream/50' : ''
                  }`}
                >
                  <span className="font-playfair text-chocolate font-semibold">{day}</span>
                  <span className="text-caramel/70 flex items-center gap-2">
                    <Clock size={14} className="text-gold" /> {time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Form */}
      <section className="py-20 bg-ivory">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="font-dancing text-gold text-2xl mb-2">Drop Us a Line</p>
            <h2 className="font-playfair text-chocolate text-3xl md:text-4xl font-bold">Email Us</h2>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-10 text-center shadow-md border border-cream/50"
            >
              <CheckCircle className="text-emerald-500 mx-auto mb-4" size={44} />
              <h3 className="font-playfair text-chocolate text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-caramel/70 mb-4">Thank you for reaching out. We will get back to you soon.</p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-gold hover:text-caramel font-medium transition-colors"
              >
                Send another message
              </button>
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
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+977 98XXXXXXXX"
                  className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-chocolate mb-1.5">Message *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full border border-cream focus:border-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-chocolate hover:bg-caramel text-ivory font-semibold py-3.5 rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send size={16} /> Send Message
              </button>
              <p className="text-center text-caramel/50 text-sm">
                Or reach us at: <a href="mailto:kathmandubakery321@gmail.com" className="text-gold hover:text-caramel transition-colors font-medium">kathmandubakery321@gmail.com</a>
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}
