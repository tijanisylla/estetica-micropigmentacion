import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Additional gallery images
const additionalImages = [
  {
    id: '4',
    title_es: 'Manicura Francesa',
    title_en: 'French Manicure',
    category: 'manicuras',
    image: 'https://images.unsplash.com/photo-1672815554809-37e355eddd24?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
    type: 'result'
  },
  {
    id: '5',
    title_es: 'Tratamiento Facial',
    title_en: 'Facial Treatment',
    category: 'facial',
    image: 'https://images.unsplash.com/photo-1670201203614-cdb9b8fdf4c3?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
    type: 'result'
  },
  {
    id: '6',
    title_es: 'Diseño de Uñas',
    title_en: 'Nail Design',
    category: 'manicuras',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
    type: 'result'
  },
  {
    id: '7',
    title_es: 'Lifting de Pestañas',
    title_en: 'Lash Lift',
    category: 'pestanas',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
    type: 'result'
  },
  {
    id: '8',
    title_es: 'Ambiente del Salón',
    title_en: 'Salon Atmosphere',
    category: 'salon',
    image: 'https://images.unsplash.com/photo-1595436790404-ae5494edcf00?crop=entropy&cs=srgb&fm=jpg&q=85&w=600',
    type: 'salon'
  }
];

const Gallery = () => {
  const { language, t } = useLanguage();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${API}/gallery`);
        setGallery([...response.data, ...additionalImages]);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setGallery(additionalImages);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['all', 'manicuras', 'micropigmentacion', 'pestanas', 'facial', 'salon'];

  const filteredGallery = filter === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredGallery.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredGallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredGallery[prevIndex]);
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      all: { es: 'Todos', en: 'All' },
      manicuras: { es: 'Manicuras', en: 'Manicures' },
      micropigmentacion: { es: 'Micropigmentación', en: 'Micropigmentation' },
      pestanas: { es: 'Pestañas', en: 'Eyelashes' },
      facial: { es: 'Facial', en: 'Facial' },
      salon: { es: 'Salón', en: 'Salon' },
    };
    return language === 'es' ? labels[cat]?.es : labels[cat]?.en;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream" data-testid="gallery-page">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-cream-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-cream-300/30 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-accent text-base tracking-widest uppercase">
              {t('Nuestro Trabajo', 'Our Work')}
            </span>
            <h1 className="font-heading text-5xl md:text-6xl text-brown mt-3 mb-4">
              {t('Galería', 'Gallery')}
            </h1>
            <div className="gold-line w-24 mx-auto mb-6"></div>
            <p className="text-brown-light text-lg max-w-2xl mx-auto">
              {t(
                'Explora nuestros trabajos y resultados. Cada imagen cuenta una historia de transformación.',
                'Explore our work and results. Each image tells a story of transformation.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-3" data-testid="gallery-filters">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? 'default' : 'outline'}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-gold text-white border-gold' 
                    : 'border-cream-300 text-brown hover:border-gold hover:text-gold'
                }`}
                data-testid={`filter-${cat}`}
              >
                {getCategoryLabel(cat)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid mb-6 group cursor-pointer"
                  onClick={() => openLightbox(item, index)}
                  data-testid={`gallery-item-${item.id}`}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="aspect-auto">
                      <img
                        src={item.image}
                        alt={language === 'es' ? item.title_es : item.title_en}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="font-heading text-lg text-white">
                          {language === 'es' ? item.title_es : item.title_en}
                        </h3>
                        {item.type === 'before' && (
                          <span className="inline-block mt-1 text-xs bg-gold/80 text-white px-2 py-1 rounded">
                            {t('Antes', 'Before')}
                          </span>
                        )}
                        {item.type === 'after' && (
                          <span className="inline-block mt-1 text-xs bg-gold text-white px-2 py-1 rounded">
                            {t('Después', 'After')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredGallery.length === 0 && (
            <div className="text-center py-16">
              <p className="text-brown-light text-lg">
                {t('No hay imágenes en esta categoría', 'No images in this category')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brown/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            data-testid="lightbox"
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
              onClick={closeLightbox}
              data-testid="lightbox-close"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              data-testid="lightbox-prev"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={language === 'es' ? selectedImage.title_es : selectedImage.title_en}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="font-heading text-2xl text-white">
                  {language === 'es' ? selectedImage.title_es : selectedImage.title_en}
                </h3>
              </div>
            </motion.div>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              data-testid="lightbox-next"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instagram CTA */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-brown mb-4">
              {t('Síguenos en Instagram', 'Follow us on Instagram')}
            </h2>
            <p className="text-brown-light mb-6">
              {t(
                'Descubre más trabajos y las últimas tendencias en belleza',
                'Discover more work and the latest beauty trends'
              )}
            </p>
            <a
              href="https://instagram.com/rosaperez_esteticaymicro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full px-8 py-4 hover:opacity-90 transition-all duration-300 shadow-lg"
              data-testid="instagram-cta"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @rosaperez_esteticaymicro
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
