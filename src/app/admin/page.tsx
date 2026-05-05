'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PackageOpen, Settings, Users, ImageIcon } from "lucide-react";

interface Stat {
  title: string;
  count: number;
  icon: any;
  color: string;
  link: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/packages').then(r => r.json()),
      fetch('/api/admin/services').then(r => r.json()),
    ]).then(([packages, services]) => {
      setStats([
        { title: "Packages", count: Array.isArray(packages) ? packages.length : 0, icon: PackageOpen, color: "bg-blue-500", link: "/admin/packages" },
        { title: "Services", count: Array.isArray(services) ? services.length : 0, icon: Settings, color: "bg-green-500", link: "/admin/services" },
        { title: "Galerie Images", count: 0, icon: ImageIcon, color: "bg-purple-500", link: "/admin/gallery" },
      ]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-8">Tableau de Bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.link} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${stat.color} mr-6`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bienvenue sur l'administration Xtreme Off-Road</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Depuis cet espace, vous pouvez entièrement personnaliser l'apparence de votre site web, ajouter de nouveaux packages d'expédition, gérer vos services (location, préparation, formation) et mettre à jour vos galeries d'images.
        </p>
        <Link href="/admin/settings" className="inline-flex items-center text-primary font-medium hover:underline">
          Aller aux paramètres du site &rarr;
        </Link>
      </div>
    </div>
  );
}
