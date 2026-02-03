import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Award, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const featuredServices = [
  {
    icon: Sparkles,
    title_es: 'Micropigmentación',
    title_en: 'Micropigmentation',
    desc_es: 'Cejas y labios perfectos con técnicas avanzadas',
    desc_en: 'Perfect brows and lips with advanced techniques',
    price: 'desde 180€',
    price_en: 'from €180'
  },
  {
    icon: Heart,
    title_es: 'Manicura & Pedicura',
    title_en: 'Manicure & Pedicure',
    desc_es: 'Uñas impecables con esmalte normal o permanente',
    desc_en: 'Flawless nails with regular or gel polish',
    price: 'desde 6€',
    price_en: 'from €6'
  },
  {
    icon: Award,
    title_es: 'Pestañas',
    title_en: 'Eyelashes',
    desc_es: 'Lifting, extensiones y tinte profesional',
    desc_en: 'Professional lifting, extensions and tinting',
    price: 'desde 6€',
    price_en: 'from €6'
  },
];

const Home = () => {
  const { t } = useLanguage();

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden" data-testid="hero-section">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-100 to-cream-200"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-cream-300/50 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-gold font-accent text-lg mb-4 tracking-widest uppercase">
                {t('Estética & Micropigmentación', 'Aesthetics & Micropigmentation')}
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-brown mb-6 leading-tight">
                {t('Tu Belleza,', 'Your Beauty,')}
                <br />
                <span className="text-gold-gradient">{t('Nuestra Pasión', 'Our Passion')}</span>
              </h1>
              <p className="text-brown-light text-lg md:text-xl mb-8 max-w-lg leading-relaxed font-body">
                {t(
                  'Descubre tratamientos de belleza personalizados en el corazón de Sevilla. Especialistas en micropigmentación, manicuras y cuidado facial.',
                  'Discover personalized beauty treatments in the heart of Seville. Specialists in micropigmentation, manicures and facial care.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/servicios" data-testid="cta-services">
                  <Button className="bg-gold text-white rounded-full px-8 py-6 text-base hover:bg-gold-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-medium">
                    {t('Ver Servicios', 'View Services')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/34639424658" target="_blank" rel="noopener noreferrer" data-testid="cta-whatsapp">
                  <Button variant="outline" className="border-gold text-gold rounded-full px-8 py-6 text-base hover:bg-gold hover:text-white transition-all duration-300 font-medium">
                    {t('Reservar Cita', 'Book Appointment')}
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-4 bg-gold/20 rounded-full"></div>
                <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-gold/30">
                  <img
                    src="https://images.unsplash.com/photo-1595436790404-ae5494edcf00?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
                    alt="Beauty treatment"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gold/30 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-brown py-6" data-testid="features-bar">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-cream-100 text-center">
            {[
              { icon: Award, text_es: 'Profesionales Certificados', text_en: 'Certified Professionals' },
              { icon: Heart, text_es: 'Productos Premium', text_en: 'Premium Products' },
              { icon: Clock, text_es: 'Horario Flexible', text_en: 'Flexible Hours' },
              { icon: Sparkles, text_es: 'Resultados Garantizados', text_en: 'Guaranteed Results' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="w-6 h-6 text-gold" />
                <span className="text-sm font-medium">{t(item.text_es, item.text_en)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 md:py-32 bg-cream-100" data-testid="featured-services">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold font-accent text-base tracking-widest uppercase">{t('Nuestros Servicios', 'Our Services')}</span>
            <h2 className="font-heading text-4xl md:text-5xl text-brown mt-3 mb-4">
              {t('Tratamientos Destacados', 'Featured Treatments')}
            </h2>
            <div className="gold-line w-24 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gold/20 group"
                data-testid={`service-card-${index}`}
              >
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-2xl text-brown mb-3">
                  {t(service.title_es, service.title_en)}
                </h3>
                <p className="text-brown-light mb-4 leading-relaxed">
                  {t(service.desc_es, service.desc_en)}
                </p>
                <p className="text-gold font-medium text-lg">
                  {t(service.price, service.price_en)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/servicios" data-testid="view-all-services">
              <Button variant="outline" className="border-gold text-gold rounded-full px-8 py-4 hover:bg-gold hover:text-white transition-all duration-300">
                {t('Ver Todos los Servicios', 'View All Services')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 md:py-32" data-testid="gallery-preview">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold font-accent text-base tracking-widest uppercase">{t('Nuestro Trabajo', 'Our Work')}</span>
            <h2 className="font-heading text-4xl md:text-5xl text-brown mt-3 mb-4">
              {t('Galería de Resultados', 'Results Gallery')}
            </h2>
            <div className="gold-line w-24 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://customer-assets.emergentagent.com/job_a6a0678e-59b4-4285-ad29-5f51859be8f2/artifacts/azph45qx_WhatsApp%20Image%202026-02-03%20at%2008.49.41%20%281%29.jpeg',
              'https://customer-assets.emergentagent.com/job_a6a0678e-59b4-4285-ad29-5f51859be8f2/artifacts/kp74lvrz_WhatsApp%20Image%202026-02-03%20at%2008.53.19.jpeg',
              'https://images.unsplash.com/photo-1672815554809-37e355eddd24?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
              'https://images.unsplash.com/photo-1670201203614-cdb9b8fdf4c3?crop=entropy&cs=srgb&fm=jpg&q=85&w=400',
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="aspect-square overflow-hidden rounded-xl group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/galeria" data-testid="view-gallery">
              <Button variant="outline" className="border-gold text-gold rounded-full px-8 py-4 hover:bg-gold hover:text-white transition-all duration-300">
                {t('Ver Galería Completa', 'View Full Gallery')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brown relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-cream-100 mb-6">
              {t('¿Lista para lucir tu mejor versión?', 'Ready to look your best?')}
            </h2>
            <p className="text-cream-300 text-lg mb-8 max-w-2xl mx-auto">
              {t(
                'Reserva tu cita ahora y déjate mimar por nuestras expertas. Tu belleza está en buenas manos.',
                'Book your appointment now and let our experts pamper you. Your beauty is in good hands.'
              )}
            </p>
            <a href="https://wa.me/34639424658" target="_blank" rel="noopener noreferrer" data-testid="cta-book-now">
              <Button className="bg-gold text-white rounded-full px-10 py-6 text-lg hover:bg-gold-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                {t('Reservar Ahora', 'Book Now')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
