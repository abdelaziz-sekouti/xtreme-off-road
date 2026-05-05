'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePackage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = '';
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const data = await uploadRes.json();
        imageUrl = data.url;
      } catch (err) {
        alert('Image upload failed');
        setUploading(false);
        return;
      }
      setUploading(false);
    }
    const res = await fetch('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, price, duration, imageUrl }),
    });
    if (res.ok) {
      router.push('/admin/packages');
    } else {
      alert('Failed to create package');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Ajouter un Package</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" required />
        <input placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2" />
        <input placeholder="Durée" value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2" />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2" />
        {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
        <button type="submit" disabled={uploading} className="bg-primary text-white py-2 px-4 rounded disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Créer'}
        </button>
      </form>
    </div>
  );
}
