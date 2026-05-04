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
              <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition">
                <Instagram className="w-5 h-5" />
              </a>
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
          <p className="mt-2 md:mt-0">Développé avec <span className="text-primary">♥</span></p>
        </div>
      </div>
    </footer>
  );
}
