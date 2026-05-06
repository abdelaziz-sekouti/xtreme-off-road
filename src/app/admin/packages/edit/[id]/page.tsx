'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from "@/components/ui/Modal";

interface Package {
  id: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  imageUrl?: string;
}

export default function EditPackage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [modal, setModal] = useState<{isOpen: boolean, type: 'success'|'error', title: string, message: string}>({
    isOpen: false, type: 'success', title: '', message: ''
  });
  const router = useRouter();

  const showModal = (type: 'success'|'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  useEffect(() => {
    fetch(`/api/admin/packages/${id}`)
      .then(res => res.json())
      .then(data => {
        setPkg(data);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price || '');
        setDuration(data.duration || '');
        const img = data.imageUrl || '';
        setCurrentImage(img.startsWith('/') ? img : `/${img}`);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = currentImage;
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'images');
      try {
        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const data = await uploadRes.json();
        imageUrl = data.url;
      } catch (err) {
        showModal('error', 'Erreur', 'Image upload failed');
        setUploading(false);
        return;
      }
      setUploading(false);
    }
    const res = await fetch(`/api/admin/packages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, price, duration, imageUrl }),
    });
    if (res.ok) {
      router.push('/admin/packages');
    } else {
      showModal('error', 'Erreur', 'Failed to update');
    }
  };

  if (!pkg) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Modifier le Package</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" required />
        <input placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2" />
        <input placeholder="Durée" value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2" />
        {currentImage && (
          <div className="mb-2">
            <p className="text-sm text-gray-600 mb-1">Image actuelle:</p>
            <img src={currentImage} alt="Current" className="w-32 h-32 object-cover border" />
          </div>
        )}
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2" />
        {file && <p className="text-sm text-gray-600">Nouvelle image: {file.name}</p>}
        <button type="submit" disabled={uploading} className="bg-primary text-white py-2 px-4 rounded disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Enregistrer'}
        </button>
      </form>

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
