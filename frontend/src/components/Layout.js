import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Instagram, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Logo = () => (
  <svg viewBox="0 0 100 80" className="h-14 w-auto">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#F3E5AB" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
    </defs>
    {/* Ornate frame */}
    <path 
      d="M50 5 C60 5 70 10 75 18 C80 10 85 8 90 10 C85 15 82 20 82 25 C90 28 95 35 95 45 C95 55 88 62 80 65 C78 72 72 78 50 78 C28 78 22 72 20 65 C12 62 5 55 5 45 C5 35 10 28 18 25 C18 20 15 15 10 10 C15 8 20 10 25 18 C30 10 40 5 50 5"
      fill="none"
      stroke="url(#goldGradient)"
      strokeWidth="1.5"
    />
    {/* Star */}
    <path d="M50 12 L51 16 L55 16 L52 18 L53 22 L50 20 L47 22 L48 18 L45 16 L49 16 Z" fill="url(#goldGradient)" />
    {/* RP initials */}
    <text x="50" y="48" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="20" fontStyle="italic" fill="url(#goldGradient)">
      RP
    </text>
    {/* Name */}
    <text x="50" y="62" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="8" fontStyle="italic" fill="url(#goldGradient)">
      Rosa Pérez
    </text>
    {/* Tagline */}
    <text x="50" y="72" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="5" fill="#B5952F">
      Estética & Micropigmentación
    </text>
  </svg>
);

const navLinks = [
  { href: '/', label_es: 'Inicio', label_en: 'Home' },
  { href: '/servicios', label_es: 'Servicios', label_en: 'Services' },
  { href: '/galeria', label_es: 'Galería', label_en: 'Gallery' },
  { href: '/contacto', label_es: 'Contacto', label_en: 'Contact' },
];

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-brown text-cream-100 py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+34639424658" className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="phone-link-top">
              <Phone className="w-4 h-4" />
              <span>639 424 658</span>
            </a>
            <a href="https://instagram.com/rosaperez_esteticaymicro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="instagram-link-top">
              <Instagram className="w-4 h-4" />
              <span>@rosaperez_esteticaymicro</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              C/ Corral del Moro N 8, Sevilla
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-md' : 'bg-cream'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex-shrink-0" data-testid="logo-link">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-base tracking-wide transition-colors hover:text-gold ${
                    location.pathname === link.href ? 'text-gold font-medium' : 'text-brown'
                  }`}
                  data-testid={`nav-link-${link.href.replace('/', '') || 'home'}`}
                >
                  {language === 'es' ? link.label_es : link.label_en}
                </Link>
              ))}
            </nav>

            {/* Language Toggle & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-brown hover:text-gold transition-colors px-3 py-1.5 border border-brown/20 rounded-full hover:border-gold"
                data-testid="language-toggle"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
              </button>

              <button
                className="md:hidden p-2 text-brown hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-testid="mobile-menu-toggle"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-t border-cream-300"
              data-testid="mobile-nav"
            >
              <nav className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-6 py-3 text-base transition-colors hover:bg-cream-100 ${
                      location.pathname === link.href ? 'text-gold font-medium bg-cream-100' : 'text-brown'
                    }`}
                    data-testid={`mobile-nav-link-${link.href.replace('/', '') || 'home'}`}
                  >
                    {language === 'es' ? link.label_es : link.label_en}
                  </Link>
                ))}
                <div className="px-6 py-4 flex flex-col gap-3 border-t border-cream-300 mt-2">
                  <a href="tel:+34639424658" className="flex items-center gap-2 text-brown hover:text-gold" data-testid="phone-link-mobile">
                    <Phone className="w-4 h-4" />
                    <span>639 424 658</span>
                  </a>
                  <a href="https://instagram.com/rosaperez_esteticaymicro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brown hover:text-gold" data-testid="instagram-link-mobile">
                    <Instagram className="w-4 h-4" />
                    <span>@rosaperez_esteticaymicro</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brown text-cream-100 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Logo />
              <p className="mt-4 text-cream-300 text-sm leading-relaxed">
                {t(
                  'Especialistas en estética y micropigmentación en Sevilla. Tu belleza, nuestra pasión.',
                  'Specialists in aesthetics and micropigmentation in Seville. Your beauty, our passion.'
                )}
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4 text-gold">{t('Contacto', 'Contact')}</h4>
              <div className="space-y-3 text-sm">
                <a href="tel:+34639424658" className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="footer-phone">
                  <Phone className="w-4 h-4" />
                  639 424 658
                </a>
                <a href="https://instagram.com/rosaperez_esteticaymicro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="footer-instagram">
                  <Instagram className="w-4 h-4" />
                  @rosaperez_esteticaymicro
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  C/ Corral del Moro N 8, Sevilla
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4 text-gold">{t('Horario', 'Hours')}</h4>
              <div className="space-y-2 text-sm text-cream-300">
                <p>{t('Lunes - Viernes:', 'Monday - Friday:')} 10:00 - 20:00</p>
                <p>{t('Sábado:', 'Saturday:')} 10:00 - 14:00</p>
                <p>{t('Domingo:', 'Sunday:')} {t('Cerrado', 'Closed')}</p>
              </div>
            </div>
          </div>
          <div className="gold-line w-full mb-6"></div>
          <p className="text-center text-cream-300 text-sm">
            © {new Date().getFullYear()} Rosa Pérez - Estética & Micropigmentación. {t('Todos los derechos reservados.', 'All rights reserved.')}
          </p>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/34639424658"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110"
        data-testid="whatsapp-button"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default Layout;
