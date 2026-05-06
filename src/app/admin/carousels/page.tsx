'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal from "@/components/ui/Modal";

interface Carousel {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  sortOrder: number;
}

export default function CarouselsAdmin() {
  const [items, setItems] = useState<Carousel[]>([]);
  const router = useRouter();
  const [modal, setModal] = useState<{isOpen: boolean, type: 'success'|'error', title: string, message: string}>({
    isOpen: false, type: 'success', title: '', message: ''
  });

  const showModal = (type: 'success'|'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const fetchItems = async () => {
    const res = await fetch('/api/admin/carousels');
    if (res.ok) {
      const data = await res.json();
      setItems(data);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const deleteItem = async (id: string) => {
    if (!window.confirm('Supprimer cette slide?')) return;
    const res = await fetch(`/api/admin/carousels/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchItems();
      showModal('success', 'Succès', 'Slide supprimée!');
    } else {
      showModal('error', 'Erreur', 'Delete failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion du Carousel</h1>
      <Link href="/admin/carousels/create" className="inline-block mb-4 px-4 py-2 bg-primary text-white rounded">
        Ajouter une Slide
      </Link>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
              <div className="mt-2 flex space-x-2">
                <Link href={`/admin/carousels/edit/${item.id}`} className="text-primary underline text-sm">
                  Modifier
                </Link>
                <button onClick={() => deleteItem(item.id)} className="text-red-600 underline text-sm">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-gray-500">Aucun élément dans le carousel.</p>}

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
