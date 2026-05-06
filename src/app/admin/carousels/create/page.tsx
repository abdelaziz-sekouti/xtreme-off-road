'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from "@/components/ui/Modal";

export default function CreateCarousel() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [uploading, setUploading] = useState(false);
  const [modal, setModal] = useState<{isOpen: boolean, type: 'success'|'error', title: string, message: string}>({
    isOpen: false, type: 'success', title: '', message: ''
  });
  const router = useRouter();

  const showModal = (type: 'success'|'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = '';
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'images/carousel');
      try {
        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const data = await uploadRes.json();
        imageUrl = data.url;
      } catch {
        showModal('error', 'Erreur', 'Image upload failed');
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const res = await fetch('/api/admin/carousels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, subtitle, imageUrl, buttonText, buttonLink, sortOrder: parseInt(sortOrder) }),
    });

    if (res.ok) router.push('/admin/carousels');
    else showModal('error', 'Erreur', 'Failed to create');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Ajouter une Slide</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" required />
        <textarea placeholder="Sous-titre" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="border p-2" />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2" />
        {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
        <input placeholder="Texte du bouton" value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="border p-2" />
        <input placeholder="Lien du bouton" value={buttonLink} onChange={(e) => setButtonLink(e.target.value)} className="border p-2" />
        <input type="number" placeholder="Ordre" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-2" />
        <button type="submit" disabled={uploading} className="bg-primary text-white py-2 px-4 rounded disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Créer'}
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
