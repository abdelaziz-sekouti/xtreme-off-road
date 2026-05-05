'use client';
import { useEffect, useState } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function PreparationPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/services?category=Préparation')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <main className="min-h-screen flex items-center justify-center">Chargement...</main>;

  return (
    <main className="min-h-screen">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Préparation Véhicules</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Services de préparation et modification de véhicules 4x4 pour tous terrains.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {service.imageUrl && (
                  <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Aucun service de préparation disponible pour le moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
