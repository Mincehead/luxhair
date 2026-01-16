'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Plus, Edit, Trash, Package, Search, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Types
type Product = {
    id: string;
    name: string;
    price: number;
    stock_count: number;
    image_url: string | null;
    active: boolean;
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const supabase = createClient();

    // Fetch Products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setProducts(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
            alert('Error deleting product');
        } else {
            fetchProducts();
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Product Inventory</h1>
                    <p className="text-gray-400">Manage your shop items, prices, and stock.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="px-6 py-3 bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold rounded-lg hover:from-white hover:to-gray-200 transition shadow-lg flex items-center gap-2"
                >
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <GlassPanel className="p-4 flex items-center gap-4">
                <Search className="text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-transparent border-none focus:outline-none text-white w-full placeholder-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </GlassPanel>

            {/* Products Table */}
            <GlassPanel className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="p-4">Product</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">Loading inventory...</td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500 flex flex-col items-center gap-2">
                                        <Package size={40} className="mb-2 opacity-50" />
                                        No products found. Start by adding one.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/5 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded bg-neutral-800 relative overflow-hidden border border-white/10">
                                                    {product.image_url ? (
                                                        <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-gray-600"><Package size={20} /></div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-white">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-amber-400 font-bold">${product.price}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${product.stock_count > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                                {product.stock_count} in stock
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${product.active ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-400'}`}>
                                                {product.active ? 'Active' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Link href={`/admin/products/${product.id}`} className="p-2 inline-block bg-white/5 rounded hover:bg-white/10 text-blue-400 transition">
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 bg-white/5 rounded hover:bg-red-900/20 text-red-400 transition"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassPanel>
        </div>
    );
}
