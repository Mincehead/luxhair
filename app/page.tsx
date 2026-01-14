import ParallaxBackground from "@/components/layout/ParallaxBackground";
import { GlassPanel } from "@/components/ui/GlassPanel";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <ParallaxBackground>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto pt-20">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter drop-shadow-2xl">
              Luxe<span className="text-purple-400 font-serif italic">Hair</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-gray-200 shadow-black drop-shadow-md max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the art of dynamic realism in hair care.
              Premium cuts, exclusive products, and a touch of luxury.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <GlassPanel className="p-8 hover:scale-105 transition duration-500 cursor-pointer group">
                <h2 className="text-2xl font-bold text-white mb-2">Book an Appointment</h2>
                <p className="text-gray-300 mb-6">Secure your exclusive session with our top stylists.</p>
                <Link href="/services" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-purple-100 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Book Now
                </Link>
              </GlassPanel>

              <GlassPanel className="p-8 hover:scale-105 transition duration-500 cursor-pointer group">
                <h2 className="text-2xl font-bold text-white mb-2">Shop Products</h2>
                <p className="text-gray-300 mb-6">Curated collection of elite hair care essentials.</p>
                <Link href="/shop" className="px-8 py-3 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Visit Shop
                </Link>
              </GlassPanel>
            </div>
          </div>
        </div>

        {/* Scroll extension to demonstrate parallax */}
        <div className="h-[50vh]"></div>
      </ParallaxBackground>
    </main>
  );
}
