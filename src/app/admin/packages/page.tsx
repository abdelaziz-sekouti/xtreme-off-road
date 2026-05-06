'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from "@/components/ui/Modal";

interface Package {
  id: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  imageUrl?: string;
}

export default function PackagesAdmin() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{isOpen: boolean, type: 'success'|'error', title: string, message: string}>({
    isOpen: false, type: 'success', title: '', message: ''
  });

  const showModal = (type: 'success'|'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/admin/packages');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPackages(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const deletePackage = async (id: string) => {
    showModal('error', 'Confirmation', 'Supprimer ce package?');
    // Replace confirm() with custom modal - for now use browser confirm
    if (!window.confirm('Supprimer ce package?')) return;
    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setPackages(packages.filter((p) => p.id !== id));
      showModal('success', 'Succès', 'Package supprimé!');
    } catch (e: any) {
      showModal('error', 'Erreur', e.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Packages</h1>
      {error && <p className="text-red-600">{error}</p>}
      <Link href="/admin/packages/create" className="inline-block mb-4 px-4 py-2 bg-primary text-white rounded">
        Ajouter un Package
      </Link>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Titre</th>
            <th className="p-2 border">Prix</th>
            <th className="p-2 border">Durée</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td className="p-2 border">{pkg.title}</td>
              <td className="p-2 border">{pkg.price}</td>
              <td className="p-2 border">{pkg.duration}</td>
              <td className="p-2 border space-x-2">
                <Link href={`/admin/packages/edit/${pkg.id}`} className="text-primary underline">
                  Modifier
                </Link>
                <button onClick={() => deletePackage(pkg.id)} className="text-red-600 underline">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  );
}
