import { GlassPanel } from '@/components/ui/GlassPanel';
import ParallaxBackground from '@/components/layout/ParallaxBackground';

export default function ServicesPage() {
    const services = [
        { title: 'Signature Cut', price: '$85', duration: '60 min', description: 'Precision styling tailored to your face shape.' },
        { title: 'Balayage & Tone', price: '$220', duration: '180 min', description: 'Hand-painted highlights for a natural, sun-kissed look.' },
        { title: 'Luxury Treatment', price: '$120', duration: '45 min', description: 'Deep conditioning and scalp massage therapy.' },
    ];

    return (
        <ParallaxBackground>
            <div className="pt-24 container mx-auto px-6">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Service Menu</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <GlassPanel key={i} className="hover:bg-white/5 transition">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                                <span className="text-purple-400 font-semibold">{s.price}</span>
                            </div>
                            <p className="text-gray-300 text-sm mb-4">{s.description}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{s.duration}</span>
                                <button className="text-white hover:underline">Book Now</button>
                            </div>
                        </GlassPanel>
                    ))}
                </div>
            </div>
        </ParallaxBackground>
    );
}
