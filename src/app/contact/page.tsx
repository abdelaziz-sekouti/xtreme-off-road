'use client';
import { useEffect, useState } from 'react';

interface Settings {
  address?: string;
  phone?: string;
  instagram?: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings?keys=address,phone,instagram')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <main className="min-h-screen flex items-center justify-center">Chargement...</main>;

  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-purple-900">Contactez-Nous</h1>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl text-purple-900 font-bold mb-6">Nos Coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="font-medium text-purple-900">Adresse:</span>
                  <span className="text-gray-600">{settings.address || "Non défini"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-purple-900">Téléphone:</span>
                  <span className="text-gray-600">{settings.phone || "Non défini"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-purple-900">Email:</span>
                  <span className="text-gray-600">contact@xtremeoffroad.com</span>
                </div>
                <div className="flex items-start flex-col space-x-3">
                  <p className="font-medium text-purple-900">Instagram:</p>
                  <p>

                    <a href={settings.instagram} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                    {settings.instagram || "Non défini"}
                  </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold  text-purple-900 mb-6">Envoyez-nous un Message</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Votre nom" className="w-full px-4 py-2 border rounded-lg text-purple-500" required />
                <input type="email" placeholder="Votre email" className="w-full px-4 py-2 border rounded-lg text-purple-500" required />
                <textarea placeholder="Votre message" rows={4} className="w-full px-4 py-2 border rounded-lg text-purple-500" required />
                <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90">
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
