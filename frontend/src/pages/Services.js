import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Hand, Footprints, Eye, Smile, Scissors } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Services = () => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('manicuras');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getCategoryIcon = (cat) => {
    const icons = {
      manicuras: Hand,
      pedicuras: Footprints,
      pestanas: Eye,
      facial: Smile,
      depilacion: Scissors,
      micropigmentacion: Sparkles,
    };
    return icons[cat] || Sparkles;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  const categories = Object.keys(services);
  const currentService = services[activeCategory];
  const Icon = getCategoryIcon(activeCategory);

  return (
    <div className="min-h-screen bg-cream" data-testid="services-page">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-cream-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-cream-300/30 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-accent text-base tracking-widest uppercase">
              Rosa Pérez
            </span>
            <h1 className="font-heading text-5xl md:text-6xl text-brown mt-3 mb-4">
              {t('Nuestros Servicios', 'Our Services')}
            </h1>
            <div className="gold-line w-24 mx-auto mb-6"></div>
            <p className="text-brown-light text-lg max-w-2xl mx-auto">
              {t(
                'Descubre nuestra carta completa de tratamientos de belleza. Calidad y profesionalidad a precios accesibles.',
                'Discover our complete menu of beauty treatments. Quality and professionalism at accessible prices.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" data-testid="service-tabs">
            {categories.map((category) => {
              const service = services[category];
              const CatIcon = getCategoryIcon(category);
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 text-sm ${
                    activeCategory === category
                      ? 'bg-gold text-white border-gold'
                      : 'border-cream-300 text-brown hover:border-gold hover:text-gold'
                  }`}
                  data-testid={`tab-${category}`}
                >
                  <CatIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {language === 'es' ? service.title_es : service.title_en}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Service Content */}
          {currentService && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-sm p-8 md:p-12"
              data-testid={`service-content-${activeCategory}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-heading text-3xl text-brown">
                    {language === 'es' ? currentService.title_es : currentService.title_en}
                  </h2>
                  <div className="gold-line w-16 mt-2"></div>
                </div>
              </div>
              <div className="space-y-0">
                {currentService.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between py-4 border-b border-cream-200 last:border-0 group hover:bg-cream-100/50 px-4 -mx-4 transition-colors"
                  >
                    <span className="text-brown group-hover:text-gold transition-colors">
                      {language === 'es' ? item.name_es : item.name_en}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-brown-light hidden sm:inline">· · · · ·</span>
                      <span className="text-gold font-medium text-lg">{item.price}€</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-brown rounded-2xl p-8 md:p-12">
              <h3 className="font-heading text-3xl text-cream-100 mb-4">
                {t('¿Tienes alguna pregunta?', 'Have any questions?')}
              </h3>
              <p className="text-cream-300 mb-6">
                {t(
                  'Contáctanos por WhatsApp para consultas o reservas',
                  'Contact us via WhatsApp for inquiries or bookings'
                )}
              </p>
              <a
                href="https://wa.me/34639424658"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-8 py-4 hover:bg-[#128C7E] transition-all duration-300 shadow-md"
                data-testid="whatsapp-cta"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('Contactar por WhatsApp', 'Contact via WhatsApp')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
