import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Phone, Instagram, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        toast.success(t(
          '¡Mensaje enviado! Nos pondremos en contacto contigo pronto.',
          'Message sent! We will contact you soon.'
        ));
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error(t(
        'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
        'Error sending message. Please try again.'
      ));
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { value: 'manicuras', label_es: 'Manicuras', label_en: 'Manicures' },
    { value: 'pedicuras', label_es: 'Pedicuras', label_en: 'Pedicures' },
    { value: 'pestanas', label_es: 'Pestañas', label_en: 'Eyelashes' },
    { value: 'facial', label_es: 'Tratamiento Facial', label_en: 'Facial Treatment' },
    { value: 'depilacion', label_es: 'Depilación', label_en: 'Waxing' },
    { value: 'micropigmentacion', label_es: 'Micropigmentación', label_en: 'Micropigmentation' },
    { value: 'otro', label_es: 'Otro', label_en: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-cream" data-testid="contact-page">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-cream-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-cream-300/30 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-accent text-base tracking-widest uppercase">
              {t('Estamos aquí para ti', 'We are here for you')}
            </span>
            <h1 className="font-heading text-5xl md:text-6xl text-brown mt-3 mb-4">
              {t('Contacto', 'Contact')}
            </h1>
            <div className="gold-line w-24 mx-auto mb-6"></div>
            <p className="text-brown-light text-lg max-w-2xl mx-auto">
              {t(
                '¿Tienes alguna pregunta o quieres reservar una cita? Estamos encantadas de ayudarte.',
                'Have any questions or want to book an appointment? We are happy to help.'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-brown mb-8">
                {t('Información de Contacto', 'Contact Information')}
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href="tel:+34639424658"
                  className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
                  data-testid="contact-phone"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-brown">{t('Teléfono', 'Phone')}</h3>
                    <p className="text-gold text-lg">639 424 658</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/34639424658"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
                  data-testid="contact-whatsapp"
                >
                  <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-brown">WhatsApp</h3>
                    <p className="text-[#25D366] text-lg">{t('Enviar mensaje', 'Send message')}</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/rosaperez_esteticaymicro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
                  data-testid="contact-instagram"
                >
                  <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                    <Instagram className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-brown">Instagram</h3>
                    <p className="text-pink-500 text-lg">@rosaperez_esteticaymicro</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-brown">{t('Dirección', 'Address')}</h3>
                    <p className="text-brown-light">C/ Corral del Moro N 8</p>
                    <p className="text-brown-light">Sevilla, España</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-brown">{t('Horario', 'Hours')}</h3>
                    <p className="text-brown-light">{t('Lunes - Viernes:', 'Monday - Friday:')} 10:00 - 20:00</p>
                    <p className="text-brown-light">{t('Sábado:', 'Saturday:')} 10:00 - 14:00</p>
                    <p className="text-brown-light">{t('Domingo:', 'Sunday:')} {t('Cerrado', 'Closed')}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.9999999999995!2d-5.9999999!3d37.3833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIzJzAwLjAiTiA1wrA1OScwMC4wIlc!5e0!3m2!1sen!2ses!4v1234567890!5m2!1sen!2ses"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
                <h2 className="font-heading text-3xl text-brown mb-2">
                  {t('Envíanos un Mensaje', 'Send us a Message')}
                </h2>
                <p className="text-brown-light mb-8">
                  {t(
                    'Rellena el formulario y te responderemos lo antes posible.',
                    'Fill out the form and we will respond as soon as possible.'
                  )}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('Nombre', 'Name')} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-cream-300 focus:ring-gold focus:border-gold"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('Email', 'Email')} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-cream-300 focus:ring-gold focus:border-gold"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('Teléfono', 'Phone')}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-cream-300 focus:ring-gold focus:border-gold"
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">{t('Servicio de Interés', 'Service of Interest')}</Label>
                      <Select value={formData.service} onValueChange={handleServiceChange}>
                        <SelectTrigger className="border-cream-300 focus:ring-gold focus:border-gold" data-testid="select-service">
                          <SelectValue placeholder={t('Seleccionar servicio', 'Select service')} />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {t(service.label_es, service.label_en)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('Mensaje', 'Message')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="border-cream-300 focus:ring-gold focus:border-gold resize-none"
                      placeholder={t(
                        '¿En qué podemos ayudarte?',
                        'How can we help you?'
                      )}
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold text-white rounded-full py-6 text-base hover:bg-gold-dark transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                    data-testid="submit-button"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                        {t('Enviando...', 'Sending...')}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        {t('Enviar Mensaje', 'Send Message')}
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
