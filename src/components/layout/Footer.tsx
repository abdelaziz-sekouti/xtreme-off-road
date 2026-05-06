import Link from "next/link";
import { Phone, MapPin, Mail, ChevronRight } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/ui/icons";

export default function Footer({ settings }: { settings: any }) {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black mb-6 flex items-center">
              <span className="text-primary mr-2">XTREME</span> OFF-ROAD
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {settings.description} Depuis 25 ans, nous vous guidons pour vivre une aventure off-road inoubliable sur les pistes du Maroc et d'Afrique.
            </p>
            <div className="flex space-x-4">
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition " aria-label="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.387H7.078v-3.467h3.047V9.309c0-3.005 1.792-4.669 4.533-4.669 1.312 0 2.686.236 2.686.236v2.953h-1.513c-1.491 0-1.956.993-1.956 2.013v2.258h3.328l-.532 3.467h-2.796v8.387C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition" aria-label="YouTube">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.013 3.013 0 0 0-2.12-2.123C19.505 3.545 15.627 3 12 3s-7.505.545-9.377 1.063a3.013 3.013 0 0 0-2.12 2.123C.46 8.053 0 12 0 12s.46 3.947 1.503 5.814a3.013 3.013 0 0 0 2.12 2.123C4.495 20.455 8.373 21 12 21s7.505-.545 9.377-1.063a3.013 3.013 0 0 0 2.12-2.123C23.54 15.947 24 12 24 12s-.46-3.947-1.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition" aria-label="Twitter">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 1 1.964-2.617 10.022 10.022 0 0 1-2.446.848 4.937 4.937 0 0 1-4.655-3.197 5.043 5.043 0 0 1 1.278 4.527 5.053 5.053 0 0 1-2.446 1.756c-.805-.027-1.575-.246-2.258-.616a5.043 5.043 0 0 1-1.964-2.527 5.037 5.037 0 0 1 1.33-2.527 5.022 5.022 0 0 1-2.446-1.756c-.805-.027-1.575-.246-2.258-.616a5.043 5.043 0 0 1 1.278 4.527 5.053 5.053 0 0 1-2.446 1.756 5.037 5.037 0 0 1 1.33 2.527 5.043 5.043 0 0 1-1.964 2.527c-.805.027-1.575.246-2.258.616a5.022 5.022 0 0 1 1.278-4.527 5.053 5.053 0 0 1 2.446-1.756c.805-.027 1.575-.246 2.258-.616a5.043 5.043 0 0 1 1.964 2.527 5.037 5.037 0 0 1-1.33 2.527 5.043 5.043 0 0 1 1.964 2.527c.805.027 1.575.246 2.258.616a5.022 5.022 0 0 1-1.278 4.527 5.053 5.053 0 0 1-2.446 1.756z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-accent border-b border-gray-700 pb-2 inline-block">Liens Rapides</h4>
            <ul className="space-y-3">
              {[
                { name: "Nos Packages", href: "/packages" },
                { name: "Location", href: "/location" },
                { name: "Préparation", href: "/preparation" },
                { name: "Formation", href: "/formation" },
                { name: "À Propos", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white flex items-center transition group">
                    <ChevronRight className="w-4 h-4 mr-2 text-primary group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-accent border-b border-gray-700 pb-2 inline-block">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-6 h-6 text-primary mr-3 shrink-0 mt-1" />
                <span className="text-gray-400">{settings.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-6 h-6 text-primary mr-3 shrink-0" />
                <span className="text-gray-400">{settings.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-6 h-6 text-primary mr-3 shrink-0" />
                <span className="text-gray-400">contact@xtremeoffroad.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} {settings.title}. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">Développé par <a href="https://webdev-theta-gray.vercel.app/portfolio" className="text-primary">Abdel</a></p>
        </div>
      </div>
    </footer>
  );
}
