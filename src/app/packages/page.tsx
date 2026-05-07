"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ParallaxSection from '@/components/home/ParallaxSection';

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl?: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/packages")
      .then((r) => r.json())
      .then((data) => {
        setPackages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setPackages([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black text-purple-900 mb-8 text-center">Nos Packages</h1>

        {packages.length === 0 ? (
          <p className="text-center text-gray-500">Aucun package disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
              >
                {pkg.imageUrl && (
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url("${pkg.imageUrl}")` }}
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-primary">{pkg.price} DH</span>
                    <span className="text-sm text-gray-500">{pkg.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Parallax Section - Desert Image */}
      <ParallaxSection
        imageUrl="/uploads/images/pkg-desert.jpg"
        title="Explorez Nos Packages"
        subtitle="Des aventures inoubliables vous attendent"
      />
    </main>
  );
}