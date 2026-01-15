
'use client';

import { GlassPanel } from "@/components/ui/GlassPanel";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";

export default function ShopPreview() {
    const addItem = useCartStore((state) => state.addItem);

    // Placeholder products - strictly UI for now
    const products = [
        { id: '1', name: "Velvet Revive Oil", price: 45, stock_count: 10, active: true, created_at: '', description: 'Luxury oil', image_url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400" },
        { id: '2', name: "Silk Touch Shampoo", price: 32, stock_count: 10, active: true, created_at: '', description: 'Silky smooth', image_url: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400" },
        { id: '3', name: "Diamond Hold Spray", price: 28, stock_count: 10, active: true, created_at: '', description: 'Strong hold', image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400" },
    ];

    const handleAddToCart = (product: any) => {
        addItem(product);
        alert(`Added ${product.name} to cart`);
    };

    return (
        <section className="py-20 bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Exclusive Products</h2>
                    <p className="text-gray-300 text-lg">Salon-quality care, available at your fingertips.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {products.map((product) => (
                        <GlassPanel key={product.id} className="p-6 group hover:bg-white/10 transition duration-300">
                            <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                                <Image
                                    src={product.image_url!}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                            <p className="text-purple-300 font-semibold text-lg mb-4">${product.price}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full py-2 border border-white/30 text-white rounded hover:bg-white hover:text-black transition"
                            >
                                Add to Cart
                            </button>
                        </GlassPanel>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/shop" className="inline-block px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-purple-100 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
