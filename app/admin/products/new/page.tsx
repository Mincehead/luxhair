'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Upload, X, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewProductPage() {
    const router = useRouter();
    const supabase = createClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_count: '',
        image_url: '',
        active: true
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(filePath);

            setFormData({ ...formData, image_url: publicUrl });
        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('products').insert([
                {
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    stock_count: parseInt(formData.stock_count),
                    image_url: formData.image_url,
                    active: formData.active
                }
            ]);

            if (error) throw error;
            router.push('/admin/products');
            router.refresh();
        } catch (error: any) {
            alert('Error creating product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold font-serif">Add New Product</h1>
                    <p className="text-gray-400">Create a new item for your shop.</p>
                </div>
            </div>

            <GlassPanel className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Image Upload */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Product Image</label>

                        <div className="flex items-start gap-6">
                            <div className="relative w-40 h-40 bg-white/5 border-2 border-dashed border-white/20 rounded-lg overflow-hidden flex flex-col items-center justify-center group hover:border-amber-500/50 transition cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {formData.image_url ? (
                                    <>
                                        <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                            <span className="text-xs text-white">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {uploading ? (
                                            <Loader2 className="animate-spin text-amber-500" size={24} />
                                        ) : (
                                            <>
                                                <Upload className="text-gray-500 mb-2 group-hover:text-amber-500 transition" size={24} />
                                                <span className="text-xs text-gray-500">Upload Photo</span>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            <div className="flex-1 text-sm text-gray-400 pt-2">
                                <p>Maximum size: 5MB</p>
                                <p>Recommended: 800x800px JPG or PNG.</p>
                                {formData.image_url && (
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, image_url: '' }); }}
                                        className="text-red-400 hover:text-red-300 text-xs mt-2 flex items-center gap-1"
                                    >
                                        <X size={12} /> Remove Image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Product Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="e.g. Velvet Argan Oil"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Price ($)</label>
                            <input
                                type="number"
                                required
                                step="0.01"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="45.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Stock Count</label>
                            <input
                                type="number"
                                required
                                value={formData.stock_count}
                                onChange={e => setFormData({ ...formData, stock_count: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="100"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Status</label>
                            <div className="flex items-center gap-4 pt-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={formData.active}
                                        onChange={() => setFormData({ ...formData, active: true })}
                                        className="text-amber-500 focus:ring-amber-500"
                                    />
                                    <span className="text-white">Active</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={!formData.active}
                                        onChange={() => setFormData({ ...formData, active: false })}
                                        className="text-gray-500 focus:ring-gray-500"
                                    />
                                    <span className="text-gray-400">Draft</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Description</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                            placeholder="Describe the product benefits and features..."
                        />
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold rounded-lg hover:from-white hover:to-gray-200 transition shadow-lg flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Save Product
                        </button>
                    </div>
                </form>
            </GlassPanel>
        </div>
    );
}
