'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from "@/components/ui/Modal";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
}

const categories = ['Location', 'Préparation', 'Formation'];

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [modal, setModal] = useState<{isOpen: boolean, type: 'success'|'error', title: string, message: string}>({
    isOpen: false, type: 'success', title: '', message: ''
  });

  const showModal = (type: 'success'|'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const fetchServices = async (category?: string) => {
    const url = category ? `/api/admin/services?category=${encodeURIComponent(category)}` : '/api/admin/services';
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setServices(data);
    }
  };

  useEffect(() => {
    fetchServices(selectedCategory);
  }, [selectedCategory]);

  const deleteService = async (id: string) => {
    if (!window.confirm('Supprimer ce service?')) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setServices(services.filter(s => s.id !== id));
      showModal('success', 'Succès', 'Service supprimé!');
    } else {
      showModal('error', 'Erreur', 'Delete failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Services</h1>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setSelectedCategory('')} className={`px-3 py-1 rounded ${selectedCategory === '' ? 'bg-primary text-white' : 'bg-gray-200'}`}>Tous</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-200'}`}>{cat}</button>
        ))}
      </div>
      <Link href="/admin/services/create" className="inline-block mb-4 px-4 py-2 bg-primary text-white rounded">
        Ajouter un Service
      </Link>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Titre</th>
            <th className="p-2 border">Catégorie</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td className="p-2 border">{service.title}</td>
              <td className="p-2 border">{service.category}</td>
              <td className="p-2 border space-x-2">
                <Link href={`/admin/services/edit/${service.id}`} className="text-primary underline">
                  Modifier
                </Link>
                <button onClick={() => deleteService(service.id)} className="text-red-600 underline">
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
