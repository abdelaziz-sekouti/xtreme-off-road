"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}

const defaultSlides: Slide[] = [
  {
    id: 'default-1',
    title: 'Xtreme Off-Road 4x4',
    subtitle: 'Découvrez le Maroc et l\'Afrique au volant d\'un 4×4',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
    buttonText: 'Découvrir nos packages',
    buttonLink: '/packages',
  },
];

export default function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch('/api/admin/carousels')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
        } else {
          console.warn('No carousel slides found, using defaults');
          setSlides(defaultSlides);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load carousel:', err);
        setSlides(defaultSlides);
        setLoading(false);
      });
  }, []);

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

  if (loading) return <div className="w-full h-[85vh] flex items-center justify-center bg-gray-100">Chargement...</div>;

  if (slides.length === 0) return <div className="w-full h-[85vh] flex items-center justify-center bg-gray-100">Aucun slide disponible</div>;

  return (
    <div className="relative w-full h-[85vh] overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div className="relative flex-[0_0_100%] h-full min-w-0" key={slide.id}>
            {/* Image Background */}
            <div
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-10000 ease-linear scale-110"
              style={{ backgroundImage: `url(${slide.imageUrl || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop'})` }}
            />
           {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

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
                      {slide.subtitle && (
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-light border-l-4 border-primary pl-4">
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.buttonText && slide.buttonLink && (
                        <Link
                          href={slide.buttonLink}
                          className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30"
                        >
                          {slide.buttonText}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      )}
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
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
