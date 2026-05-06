'use client';
import { useEffect, useState } from 'react';
import { Save } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface Settings {
  title?: string;
  description?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  typographyFamily?: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [modal, setModal] = useState<{isOpen: boolean, type: 'success'|'error', title: string, message: string}>({
    isOpen: false, type: 'success', title: '', message: ''
  });

  const showModal = (type: 'success'|'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Sending settings data:', data);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        // Refetch settings to update the form
        const updated = await fetch('/api/settings').then(r => r.json());
        setSettings(updated);
        showModal('success', 'Succès', 'Paramètres enregistrés !');
      } else {
        showModal('error', 'Erreur', 'Erreur lors de l\'enregistrement');
      }
    } catch {
      showModal('error', 'Erreur', 'Erreur de connexion');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-8">Paramètres du Site</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Identity */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Identité</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre du Site</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={settings.title}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (À propos)</label>
                <textarea
                  name="description"
                  defaultValue={settings.description}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Contact & Réseaux</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={settings.address}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={settings.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    name="whatsapp"
                    defaultValue={settings.whatsapp}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  defaultValue={settings.instagram}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  defaultValue={settings.facebook}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                <input
                  type="url"
                  name="youtube"
                  defaultValue={settings.youtube}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X</label>
                <input
                  type="url"
                  name="twitter"
                  defaultValue={settings.twitter}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Thème et Apparence</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur Primaire</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    name="primaryColor"
                    defaultValue={settings.primaryColor}
                    className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm text-gray-500 uppercase">{settings.primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur Secondaire</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    name="secondaryColor"
                    defaultValue={settings.secondaryColor}
                    className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm text-gray-500 uppercase">{settings.secondaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur d'Accent</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    name="accentColor"
                    defaultValue={settings.accentColor}
                    className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm text-gray-500 uppercase">{settings.accentColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Police Google (Nom)</label>
                <input
                  type="text"
                  name="typographyFamily"
                  defaultValue={settings.typographyFamily}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="ex: Inter, Roboto, Outfit"
                />
                <p className="text-xs text-gray-500 mt-1">Sera importée dynamiquement.</p>
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-lg disabled:opacity-50"
            >
              <Save className="w-5 h-5 mr-2" /> {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>

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
