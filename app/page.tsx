import ParallaxBackground from "@/components/layout/ParallaxBackground";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-neutral-900 min-h-screen">
      <ParallaxBackground>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto pt-20">
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-white mb-6 tracking-tighter drop-shadow-2xl font-serif">
              Tóc <span className="text-purple-400 font-light italic">Salon</span>
            </h1>
            <p className="text-2xl sm:text-3xl md:text-5xl text-gray-200 shadow-black drop-shadow-md max-w-2xl mx-auto mb-12 leading-relaxed font-serif italic tracking-wide">
              "The Art of Đẹp"
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/bookings" className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-100 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] text-lg">
                Book Your Experience
              </Link>
              <Link href="/shop" className="px-10 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition shadow-[0_0_20px_rgba(255,255,255,0.1)] text-lg">
                View Collection
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400 font-light tracking-wide">
              <Link href="/about" className="hover:text-white transition-colors border-b border-transparent hover:border-white">Our Story</Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/gallery" className="hover:text-white transition-colors border-b border-transparent hover:border-white">Gallery</Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/services" className="hover:text-white transition-colors border-b border-transparent hover:border-white">Services</Link>
            </div>
          </div>
        </div>
      </ParallaxBackground>
    </main>
  );
}
