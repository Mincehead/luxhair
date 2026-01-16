
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Search } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string | null;
    stock_count: number;
}

export default function ShopClient({ products }: { products: Product[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2574&auto=format&fit=crop')] bg-fixed bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm fixed" />

            <div className="relative z-10 container mx-auto px-4 py-24">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Our Collection</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Premium haircare products curated by our expert stylists for your daily routine.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="mb-12 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <GlassPanel className="p-2 flex items-center">
                        <Search className="w-5 h-5 text-gray-400 ml-3 mr-3" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-lg"
                        />
                    </GlassPanel>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-fade-in-up group"
                                style={{ animationDelay: `${0.2 + (index * 0.05)}s` }}
                            >
                                <GlassPanel className="h-full flex flex-col p-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:bg-white/15">
                                    <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-800/50">
                                        {product.image_url ? (
                                            <Image
                                                src={product.image_url}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                <ShoppingBag className="w-12 h-12 opacity-50" />
                                            </div>
                                        )}
                                        {product.stock_count === 0 && (
                                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                                <span className="text-white font-bold bg-red-500/80 px-4 py-2 rounded-full backdrop-blur-sm">
                                                    Out of Stock
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-2xl font-bold text-amber-400">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <button
                                                disabled={product.stock_count === 0}
                                                className="p-3 bg-white text-black rounded-full hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </GlassPanel>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 animate-fade-in-up">
                        <GlassPanel className="inline-block px-12 py-8">
                            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                            <p className="text-gray-400">We couldn't find any products matching your search.</p>
                        </GlassPanel>
                    </div>
                )}
            </div>
        </div>
    );
}
