"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Info, X, Phone, MapPin, Mail, User } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function Navbar({ settings }: { settings: any }) {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Accueil", onClick: () => { router.push("/"); setIsLeftOpen(false); } },
    { name: "Nos Packages",onClick: () => { router.push("/packages"); setIsLeftOpen(false); }},
    { name: "Location", onClick: () => { router.push("/location"); setIsLeftOpen(false); } },
    { name: "Préparation", onClick: () => { router.push("/preparation"); setIsLeftOpen(false); } },
    { name: "Formation", onClick: () => { router.push("/formation"); setIsLeftOpen(false); } },
    { name: "À Propos", onClick: () => { router.push("/about"); setIsLeftOpen(false); } },
    { name: "Contact", onClick: () => { router.push("/contact"); setIsLeftOpen(false); } },
  ];

  const drawerVariants: any = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "left" ? "-100%" : "100%",
      transition: { duration: 0.3, ease: "easeInOut" as const },
    }),
    visible: {
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 hidden md:block border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-primary font-medium">
              <Phone className="w-4 h-4 mr-2" /> {settings.phone}
            </span>
            <span className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2 text-primary" /> contact@xtremeoffroad.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={settings.instagram} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary">
              <Instagram className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="text-gray-500 hover:text-primary cursor-pointer bg-transparent border-0 p-0"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left Menu Icon (Mobile & Desktop) */}
          <button 
            onClick={() => setIsLeftOpen(true)}
            className="p-2 text-gray-700 hover:text-primary transition md:hidden"
          >
            <Menu className="w-7 h-7" />
          </button>

          {/* Logo */}
          <button
            type="button"
            onClick={() => { router.push("/"); setIsLeftOpen(false); }}
            className="flex items-center space-x-2 z-50 relative group cursor-pointer bg-transparent border-0 p-0"
          >
            <div className="w-20 h-20 bg-primary flex items-center justify-center rounded-xl transform rotate-[-10deg] group-hover:rotate-0 transition-all duration-300 shadow-lg">
              <div className="w-16 h-16 border-2 border-white flex flex-col items-center justify-center rounded-lg rotate-10 group-hover:rotate-0 transition-all duration-300">
                <span className="text-white font-black text-xl leading-none">4x4</span>
                <span className="text-white text-[10px] font-bold">XTREME</span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={link.onClick}
                className="text-gray-800 hover:text-primary transition relative group cursor-pointer bg-transparent border-0 p-0"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Info Icon */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="p-2 text-gray-700 hover:text-primary hidden md:block cursor-pointer bg-transparent border-0"
            >
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsRightOpen(true)}
              className="p-2 text-gray-700 hover:text-primary transition"
            >
              <Info className="w-7 h-7 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Left Drawer (Navigation) */}
      <AnimatePresence>
        {isLeftOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsLeftOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              custom="left"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <span className="font-bold text-lg text-primary uppercase tracking-widest">Menu</span>
                <button onClick={() => setIsLeftOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={link.onClick}
                    className="block px-4 py-3 text-lg font-medium text-gray-800 hover:bg-primary/10 hover:text-primary rounded-xl transition"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="flex items-center text-gray-600 hover:text-primary">
                  <Instagram className="w-5 h-5 mr-3" /> Instagram
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Right Drawer (Company Info) */}
      <AnimatePresence>
        {isRightOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsRightOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              custom="right"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 right-0 bottom-0 w-80 md:w-96 bg-secondary text-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-700">
                <span className="font-bold text-lg uppercase tracking-widest text-accent">À Propos</span>
                <button onClick={() => setIsRightOpen(false)} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{settings.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {settings.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-accent mr-4 shrink-0 mt-1" />
                    <p className="text-gray-300">{settings.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-accent mr-4 shrink-0" />
                    <p className="text-gray-300">{settings.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-accent mr-4 shrink-0" />
                    <p className="text-gray-300">contact@xtremeoffroad.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
