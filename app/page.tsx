import ParallaxBackground from "@/components/layout/ParallaxBackground";
import { GlassPanel } from "@/components/ui/GlassPanel";
import Link from 'next/link';
import AboutSection from "@/components/home/AboutSection";
import ShopPreview from "@/components/home/ShopPreview";
import BookingSection from "@/components/home/BookingSection";
import GallerySection from "@/components/home/GallerySection";

export default function Home() {
  return (
    <main className="bg-neutral-900 min-h-screen">
      <ParallaxBackground>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto pt-20">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter drop-shadow-2xl">
              Luxe<span className="text-purple-400 font-serif italic">Hair</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl text-gray-200 shadow-black drop-shadow-md max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Elevating Vietnamese hair artistry to a new standard of luxury.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/services" className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-100 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] text-lg">
                Book Your Experience
              </Link>
              <Link href="/shop" className="px-10 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition shadow-[0_0_20px_rgba(255,255,255,0.1)] text-lg">
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </ParallaxBackground>

      {/* Sections below the fold */}
      <div className="relative z-20 bg-neutral-900 border-t border-white/5">
        <AboutSection />
        <ShopPreview />
        <BookingSection />
        <GallerySection />
      </div>
    </main>
  );
}
