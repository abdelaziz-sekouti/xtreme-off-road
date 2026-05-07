'use client';

interface ParallaxSectionProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
}

export default function ParallaxSection({ imageUrl, title, subtitle }: ParallaxSectionProps) {
  return (
    <div
      className="relative w-full h-screen bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="text-center text-white">
            {title && <h2 className="text-4xl md:text-6xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-xl md:text-2xl">{subtitle}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
