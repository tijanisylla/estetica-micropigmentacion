import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function Services() {
  const { language, t } = useLanguage();
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('manicuras');

  useEffect(() => {
    axios.get(`${API}/services`)
      .then(function(res) {
        setServices(res.data);
        setLoading(false);
      })
      .catch(function(err) {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !services) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  const categories = Object.keys(services);
  const currentService = services[activeCategory];

  function renderCategories() {
    return categories.map(function(category) {
      const service = services[category];
      const isActive = activeCategory === category;
      return (
        <button
          key={category}
          onClick={function() { setActiveCategory(category); }}
          className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm ${
            isActive ? 'bg-gold text-white border-gold' : 'border-cream-300 text-brown hover:border-gold'
          }`}
          data-testid={`tab-${category}`}
        >
          {language === 'es' ? service.title_es : service.title_en}
        </button>
      );
    });
  }

  function renderServiceItems() {
    if (!currentService || !currentService.items) return null;
    return currentService.items.map(function(item, index) {
      return (
        <div
          key={index}
          className="flex items-center justify-between py-4 border-b border-cream-200 last:border-0 group hover:bg-cream-100/50 px-4 -mx-4 transition-colors"
        >
          <span className="text-brown group-hover:text-gold transition-colors">
            {language === 'es' ? item.name_es : item.name_en}
          </span>
          <span className="text-gold font-medium text-lg">{item.price}€</span>
        </div>
      );
    });
  }

  return (
    <div className="min-h-screen bg-cream" data-testid="services-page">
      <section className="relative py-20 md:py-28 bg-cream-100">
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-gold font-accent text-base tracking-widest uppercase">Rosa Pérez</span>
          <h1 className="font-heading text-5xl md:text-6xl text-brown mt-3 mb-4">
            {t('Nuestros Servicios', 'Our Services')}
          </h1>
          <div className="gold-line w-24 mx-auto mb-6"></div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12" data-testid="service-tabs">
            {renderCategories()}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-heading text-3xl text-brown">
                {currentService && (language === 'es' ? currentService.title_es : currentService.title_en)}
              </h2>
            </div>
            <div>
              {renderServiceItems()}
            </div>
          </motion.div>

          <div className="mt-16 text-center">
            <div className="bg-brown rounded-2xl p-8 md:p-12">
              <h3 className="font-heading text-3xl text-cream-100 mb-4">
                {t('¿Tienes alguna pregunta?', 'Have any questions?')}
              </h3>
              <a
                href="https://wa.me/34639424658"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-8 py-4 hover:bg-[#128C7E] transition-all"
                data-testid="whatsapp-cta"
              >
                {t('Contactar por WhatsApp', 'Contact via WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
