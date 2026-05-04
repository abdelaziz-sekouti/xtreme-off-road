import { pool } from "@/lib/db";
import { createPackage, deletePackage } from "@/app/actions/packages";
import { Plus, Trash2 } from "lucide-react";

export default async function PackagesAdminPage() {
  const [rows] = await pool.query('SELECT * FROM packages ORDER BY createdAt DESC');
  const packages = rows as any[];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-800">Gestion des Packages</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Nouveau Package</h2>
          <form action={createPackage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input type="text" name="title" required className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                <input type="text" name="price" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                <input type="text" name="duration" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Image</label>
              <input type="url" name="imageUrl" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" />
            </div>
            <button type="submit" className="w-full flex justify-center items-center px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition">
              <Plus className="w-5 h-5 mr-2" /> Ajouter
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {packages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Aucun package trouvé. Ajoutez-en un !</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-sm font-medium text-gray-500">Image</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-500">Titre</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-500">Durée/Prix</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {pkg.imageUrl ? (
                          <img src={pkg.imageUrl} alt={pkg.title} className="w-16 h-12 object-cover rounded" />
                        ) : (
                          <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">N/A</div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{pkg.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {pkg.duration && <span className="block">{pkg.duration}</span>}
                        {pkg.price && <span className="block font-bold text-primary">{pkg.price}</span>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={deletePackage.bind(null, pkg.id)}>
                          <button type="submit" className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg hover:bg-red-100 transition">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
