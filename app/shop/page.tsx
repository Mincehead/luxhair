'use client';

import { GlassPanel } from '@/components/ui/GlassPanel';
import ParallaxBackground from '@/components/layout/ParallaxBackground';
import { useCartStore } from '@/lib/store/useCartStore';

export default function ShopPage() {
    const addItem = useCartStore((state) => state.addItem);

    const products = [
        { id: '1', name: 'Silk Moisture Shampoo', price: 32, stock_count: 50, active: true, created_at: '', description: 'Hydrating formula', image_url: null },
        { id: '2', name: 'Volumizing Mousse', price: 28, stock_count: 30, active: true, created_at: '', description: 'Weightless lift', image_url: null },
        { id: '3', name: 'Repair Hair Oil', price: 45, stock_count: 15, active: true, created_at: '', description: 'Argan oil blend', image_url: null },
    ];

    return (
        <ParallaxBackground>
            <div className="pt-24 container mx-auto px-6">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Exclusive Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <GlassPanel key={p.id} className="group hover:bg-white/5 transition">
                            <div className="aspect-square bg-white/5 mb-4 rounded-lg flex items-center justify-center text-gray-500">
                                Product Image
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                            <p className="text-purple-400 font-semibold mb-4">${p.price}</p>
                            <button
                                onClick={() => addItem(p)}
                                className="w-full py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded transition font-medium"
                            >
                                Add to Cart
                            </button>
                        </GlassPanel>
                    ))}
                </div>
            </div>
        </ParallaxBackground>
    );
}
