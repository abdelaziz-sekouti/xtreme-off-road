import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Settings, Image as ImageIcon, Briefcase, Car, LogOut, LayoutDashboard } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-primary">Xtreme Admin</h2>
          <p className="text-sm text-gray-400 mt-1">{session.user?.email}</p>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition group">
            <LayoutDashboard className="w-5 h-5 mr-3 group-hover:text-primary" /> Tableau de bord
          </Link>
          <Link href="/admin/settings" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition group">
            <Settings className="w-5 h-5 mr-3 group-hover:text-primary" /> Paramètres Site
          </Link>
          <Link href="/admin/packages" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition group">
            <Briefcase className="w-5 h-5 mr-3 group-hover:text-primary" /> Packages
          </Link>
          <Link href="/admin/services" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition group">
            <Car className="w-5 h-5 mr-3 group-hover:text-primary" /> Services
          </Link>
          <Link href="/admin/gallery" className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition group">
            <ImageIcon className="w-5 h-5 mr-3 group-hover:text-primary" /> Galerie Images
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link href="/api/auth/signout" className="flex items-center justify-center w-full px-4 py-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition">
            <LogOut className="w-4 h-4 mr-2" /> Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 relative z-10">
        <div className="container mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
