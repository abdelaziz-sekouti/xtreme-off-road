'use client';
import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { InstagramIcon as Instagram } from '@/components/ui/icons';
import ParallaxSection from '@/components/home/ParallaxSection';

interface Settings {
  address?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings?keys=address,phone,email,instagram,youtube,facebook,twitter')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <main className="min-h-screen flex items-center justify-center">Chargement...</main>;

  const encodeAddress = encodeURIComponent(settings.address || 'Xtreme Off-Road Morocco');
  const googleMapsUrl = `https://maps.google.com/maps?q=${encodeAddress}&hl=fr&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gray-200 relative">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-accent">Contactez-Nous</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-secondary">Nos Coordonnées</h2>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Adresse</p>
                    <p className="text-gray-600">{settings.address || "123 Boulevard Mohamed VI, Casablanca, Maroc"}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Téléphone</p>
                    <p className="text-gray-600">{settings.phone || "+212 6 XX XX XX XX"}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">{settings.email || "contact@xtremeoffroad.com"}</p>
                  </div>
                </div>

                {/* Social Media Links - Using same icons as footer */}
                {(settings.instagram || settings.youtube || settings.facebook || settings.twitter) && (
                  <div className="border-t border-gray-200 pt-6">
                    <p className="font-medium text-gray-900 mb-4">Suivez-nous</p>
                    <div className="flex flex-wrap gap-3">
                      {settings.instagram && (
                        <a
                          href={settings.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white hover:scale-110"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {settings.facebook && (
                        <a
                          href={settings.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white hover:scale-110"
                          aria-label="Facebook"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.387H7.078v-3.467h3.047V9.309c0-3.005 1.792-4.669 4.533-4.669 1.312 0 2.686.236 2.686.236v2.953h-1.513c-1.491 0-1.956.993-1.956 2.013v2.258h3.328l-.532 3.467h-2.796v8.387C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                      )}
                      {settings.twitter && (
                        <a
                          href={settings.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white hover:scale-110"
                          aria-label="Twitter"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 1 1.964-2.617 10.022 10.022 0 0 1-2.446.848 4.937 4.937 0 0 1-4.655-3.197 5.043 5.043 0 0 1 1.278 4.527 5.053 5.053 0 0 1-2.446 1.756c-.805-.027-1.575-.246-2.258-.616a5.043 5.043 0 0 1-1.964-2.527 5.037 5.037 0 0 1 1.33-2.527 5.022 5.022 0 0 1-1.278 4.527 5.053 5.053 0 0 1-2.446 1.756c.805.027 1.575.246 2.258.616a5.043 5.043 0 0 1 1.964 2.527 5.037 5.037 0 0 1-1.33 2.527 5.043 5.043 0 0 1 1.964 2.527c.805.027 1.575.246 2.258.616a5.022 5.022 0 0 1-1.278 4.527 5.053 5.053 0 0 1-2.446 1.756z"/>
                          </svg>
                        </a>
                      )}
                      {settings.youtube && (
                        <a
                          href={settings.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition text-white hover:scale-110"
                          aria-label="YouTube"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.013 3.013 0 0 0-2.12-2.123C19.505 3.545 15.627 3 12 3s-7.505.545-9.377 1.063a3.013 3.013 0 0 0-2.12 2.123C.46 8.053 0 12 0 12s.46 3.947 1.503 5.814a3.013 3.013 0 0 0 2.12 2.123C4.495 20.455 8.373 21 12 21s7.505-.545 9.377-1.063a3.013 3.013 0 0 0 2.12-2.123C23.54 15.947 24 12 24 12s-.46-3.947-1.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary">Notre Localisation</h2>
                  <p className="text-sm text-gray-500">Visitez-nous à l'adresse</p>
                </div>
              </div>
              <div className="relative" style={{ height: '50vh', minHeight: '300px' }}>
                <iframe
                  src={googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title="Google Maps - Notre Localisation"
                  className="rounded-b-2xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {settings.address || "123 Boulevard Mohamed VI, Casablanca, Maroc"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-secondary mb-2">Envoyez-nous un Message</h2>
                <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais</p>
              </div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Votre email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Sujet de votre message"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Votre message..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold hover:from-primary/90 hover:to-secondary/90 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section - Desert Image */}
      <ParallaxSection
        imageUrl="/uploads/images/hero-desert.jpg"
        title="Prêt pour l'Aventure?"
        subtitle="Découvrez le Maroc avec Xtreme Off-Road"
      />
    </main>
  );
}
