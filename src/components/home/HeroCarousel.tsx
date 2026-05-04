"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    title: "Créateur d'aventure off-road au Maroc et en Afrique",
    description: "Raids 4×4 sur mesure, formation rallye et préparation de véhicules tout-terrain : depuis 25 ans, Xtreme Off-Road vous guide de l'Atlas au Sahara, pour vivre une aventure off-road inoubliable."
  },
  {
    image: "https://images.unsplash.com/photo-1504958190772-7634fdbcd7d6?q=80&w=2070&auto=format&fit=crop",
    title: "Préparez votre 4x4 pour l'extrême",
    description: "Nos experts mettent tout en œuvre pour que votre véhicule soit prêt à relever tous les défis des pistes rocailleuses et des dunes de sable."
  },
  {
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    title: "Vivez le Rallye de l'Intérieur",
    description: "Comprendre la navigation, maîtriser son véhicule, apprendre à lire le désert : c'est l'objectif de nos formations 4×4 au Maroc."
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-[85vh] overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div className="relative flex-[0_0_100%] h-full min-w-0" key={index}>
            {/* Image Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms] ease-linear scale-110"
              style={{ backgroundImage: `url(\${slide.image})` }}
              // Small hack to animate scale continuously during slide visibility if desired
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-12">
                <div className="max-w-3xl">
                  {selectedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light border-l-4 border-primary pl-4">
                        {slide.description}
                      </p>
                      <Link 
                        href="/packages"
                        className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30"
                      >
                        Découvrez Nos Packages
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-primary transition border border-white/20"
        onClick={scrollPrev}
        aria-label="Slide précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-primary transition border border-white/20"
        onClick={scrollNext}
        aria-label="Slide suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all \${
              index === selectedIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Aller à la slide \${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
