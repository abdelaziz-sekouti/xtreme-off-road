'use client';
import { useEffect, useState } from 'react';

interface Settings {
  description?: string;
}

export default function AboutPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings?keys=description')
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-accent">À Propos de Nous</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {settings.description || "Bienvenue chez Xtreme Off-Road, votre spécialiste en véhicules 4x4."}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-accent">Notre Mission</h2>
                <p className="text-gray-600">
                  Offrir des expériences de conduite exceptionnelles en tout-terrain avec une flotte de véhicules haut de gamme.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-accent">Notre Vision</h2>
                <p className="text-gray-600">
                  Devenir le leader incontesté du 4x4 et de l'off-road au Maroc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
