import ParallaxBackground from "@/components/layout/ParallaxBackground";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function Home() {
  return (
    <main>
      <ParallaxBackground>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-lg">
            Luxe<span className="text-purple-300 font-serif italic">Hair</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl font-light">
            Experience the art of dynamic realism in hair care.
            Premium cuts, exclusive products, and a touch of luxury.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-12">
            <GlassPanel className="hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-white mb-2">Book an Appointment</h2>
              <p className="text-gray-300 mb-4">Secure your exclusive session with our top stylists.</p>
              <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition">
                Book Now
              </button>
            </GlassPanel>

            <GlassPanel className="hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-white mb-2">Shop Products</h2>
              <p className="text-gray-300 mb-4">Curated collection of elite hair care essentials.</p>
              <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition">
                Visit Shop
              </button>
            </GlassPanel>
          </div>
        </div>

        {/* Scroll extension to demonstrate parallax */}
        <div className="h-[50vh]"></div>
      </ParallaxBackground>
    </main>
  );
}
