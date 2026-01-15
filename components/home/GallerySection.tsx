import Link from "next/link";
import Image from "next/image";

export default function GallerySection() {
    const images = [
        "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800", // Blonde Balayage
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800", // Brunette Waves
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800", // Vivid Pink/Purple
        "https://images.unsplash.com/photo-1521590832896-76c0f2aee7eb?auto=format&fit=crop&q=80&w=800", // Precision Cut
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800", // Styling Tools/Atmosphere
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800"  // Salon Interior Detail
    ];

    return (
        <section className="py-20 bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Masterpieces</h2>
                    <p className="text-gray-400">Real results for our beautiful clients</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Link href="/services" className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    Book This Style
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
