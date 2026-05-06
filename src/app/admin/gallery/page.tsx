'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from "@/components/ui/Modal";

interface GalleryImage {
  id: string;
  url: string;
  altText?: string;
  category?: string;
}

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{isOpen: boolean, type: 'success'|'error', title: string, message: string}>({
    isOpen: false, type: 'success', title: '', message: ''
  });

  const showModal = (type: 'success'|'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setImages(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const deleteImage = async (id: string) => {
    if (!window.confirm('Supprimer cette image?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setImages(images.filter((img) => img.id !== id));
      showModal('success', 'Succès', 'Image supprimée!');
    } catch (e: any) {
      showModal('error', 'Erreur', e.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestion de la Galerie</h1>
      {error && <p className="text-red-600">{error}</p>}
      <Link href="/admin/gallery/create" className="inline-block mb-4 px-4 py-2 bg-primary text-white rounded">
        Ajouter une Image
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="border rounded overflow-hidden">
            <img src={img.url} alt={img.altText || ''} className="w-full h-32 object-cover" />
            <div className="p-2 flex justify-between items-center">
              <span className="text-sm truncate">{img.category || 'No category'}</span>
              <button onClick={() => deleteImage(img.id)} className="text-red-600 text-sm underline">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && !error && <p className="text-gray-500">Aucune image dans la galerie.</p>}

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
