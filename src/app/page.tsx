import HeroCarousel from "@/components/home/HeroCarousel";
import { ArrowRight, Wrench, Compass, GraduationCap, Star } from "lucide-react";
import Link from "next/link";
import ParallaxSection from '@/components/home/ParallaxSection';

export default function Home() {
  const reviews = [
    {
      name: "Fayçal Touhami",
      time: "il y a 4 mois",
      text: "They're pros at 4x4 driving, well done! 👏👏👏👏",
      rating: 5,
    },
    {
      name: "Aya Rahmani",
      time: "il y a 3 mois",
      text: "Excellent work, 👍🏻👍🏻👍🏻",
      rating: 5,
    }
  ];

  return (
    <div className="w-full">
      <HeroCarousel />

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-accent font-bold tracking-widest uppercase mb-4">| Packages</h2>
          <h3 className="text-3xl md:text-5xl font-black text-secondary mb-8">Découvrez le Maroc et l'Afrique au volant d'un 4×4</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Chez Xtreme Off-Road, nos packages ont été conçus pour tous les profils : des curieux désireux de s'initier au pilotage tout-terrain, aux passionnés souhaitant perfectionner leur maîtrise du 4×4 jusqu'aux équipes d'entreprise en quête d'une expérience team-building unique au cœur du désert.
            <br/><br/>
            <strong className="text-gray-900 font-semibold">Pendant plusieurs jours, laissez-vous guider par nos experts du tout-terrain et partez à l'aventure en immersion totale sur pistes, dunes et paysages sauvages.</strong>
          </p>
          <Link 
            href="/packages"
            className="inline-flex items-center px-8 py-4 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all hover:-translate-y-1 shadow-xl shadow-secondary/20"
          >
            Toutes Nos Expériences <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-primary group">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Location de Véhicules</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                Vous rêvez d'aventure au Maroc ? Xtreme Off-Road met à votre disposition tout le nécessaire pour partir explorer les pistes et déserts marocains en toute autonomie et sécurité.
              </p>
              <Link href="/location" className="text-primary font-semibold flex items-center group-hover:underline">
                En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Preparation */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-accent group">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Préparation 4x4</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                Chez nous, préparer un 4×4, ce n'est pas que de la mécanique : c'est créer un compagnon fiable pour affronter le désert et les pistes les plus exigeantes.
              </p>
              <Link href="/preparation" className="text-accent font-semibold flex items-center group-hover:underline">
                En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Formation */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-secondary group">
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Formation Pilote</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                Avant chaque grand rallye, il y a une aventure humaine. Nous formons les futurs pilotes et copilotes à vivre pleinement cette expérience.
              </p>
              <Link href="/formation" className="text-secondary font-semibold flex items-center group-hover:underline">
                En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Parallax Section - Desert Image */}
      <ParallaxSection
        imageUrl="/uploads/images/featured-morocco.jpg"
        title="Ce que disent nos clients"
        subtitle="Découvrez leurs expériences inoubliables"
      />

      {/* Reviews Section */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--primary) 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-accent font-bold tracking-widest uppercase mb-4">| Témoignages</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-4">Ce que disent nos clients</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">La satisfaction de nos aventuriers est notre plus belle récompense.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                <div className="flex text-accent mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-gray-200 mb-6 italic">"{review.text}"</p>
                <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <span className="text-sm text-gray-400">{review.time}</span>
                  </div>
                  {i === 0 && (
                    <div className="text-right">
                      <span className="text-sm text-primary block">Réponse du propriétaire</span>
                      <span className="text-sm text-gray-400">🙏🙏🙏Thank you brother …</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
