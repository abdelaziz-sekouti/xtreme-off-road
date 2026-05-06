"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
}

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "";
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = category ? `/api/admin/services?category=${encodeURIComponent(category)}` : "/api/admin/services";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setServices([]);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div className="p-8 text-center">Chargement des services...</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black text-gray-800 mb-8 text-center">
          {category ? `Services – ${category}` : "Nos Services"}
        </h1>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">Aucun service trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
              >
                {svc.imageUrl && (
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url("${svc.imageUrl}")` }}
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{svc.title}</h2>
                  {svc.category && (
                    <p className="text-sm text-primary mb-2">{svc.category}</p>
                  )}
                  <p className="text-gray-600 line-clamp-3">{svc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}