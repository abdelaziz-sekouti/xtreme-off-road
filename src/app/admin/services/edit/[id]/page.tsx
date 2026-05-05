'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
}

export default function EditService({ params }: { params: { id: string } }) {
  const [service, setService] = useState<Service | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Location');
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/admin/services/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.imageUrl || '');
        setCategory(data.category);
      })
      .catch(console.error);
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/services/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, imageUrl, category }),
    });
    if (res.ok) router.push('/admin/services'); else alert('Update failed');
  };

  if (!service) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Modifier le Service</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
        <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" required />
        <input placeholder="URL Image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border p-2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2">
          <option value="Location">Location</option>
          <option value="Préparation">Préparation</option>
          <option value="Formation">Formation</option>
        </select>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Enregistrer</button>
      </form>
    </div>
  );
}
