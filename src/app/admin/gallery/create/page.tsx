'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateGalleryImage() {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image');
      return;
    }

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
      const imageUrl = data.url;

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: imageUrl, altText, category }),
      });

      if (res.ok) {
        router.push('/admin/gallery');
      } else {
        alert('Failed to add image');
      }
    } catch (err) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Ajouter une Image</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2"
          required
        />
        {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}
        <input
          placeholder="Texte alternatif"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="border p-2"
        />
        <input
          placeholder="Catégorie (optionnel)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-primary text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}
