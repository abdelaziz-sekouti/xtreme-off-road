'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateService() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('Location');
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
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, imageUrl, category }),
    });
    if (res.ok) router.push('/admin/services'); else alert('Failed to create');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Ajouter un Service</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" required />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2" />
        {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2">
          <option value="Location">Location</option>
          <option value="Préparation">Préparation</option>
          <option value="Formation">Formation</option>
        </select>
        <button type="submit" disabled={uploading} className="bg-primary text-white py-2 px-4 rounded disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Créer'}
        </button>
      </form>
    </div>
  );
}
