'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function AdminServiceFormPage() {
    const params = useParams();
    const router = useRouter();
    const isNew = params.id === 'new';
    const supabase = createClient();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration_min: '60',
        image_url: '',
        active: true
    });

    useEffect(() => {
        if (!isNew && params.id) {
            fetchService(params.id as string);
        }
    }, [params.id, isNew]);

    const fetchService = async (id: string) => {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            alert('Error fetching service');
            router.push('/admin/services');
        } else if (data) {
            setFormData({
                name: data.name,
                description: data.description || '',
                price: data.price.toString(),
                duration_min: data.duration_min.toString(),
                image_url: data.image_url || '',
                active: data.active
            });
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const serviceData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            duration_min: parseInt(formData.duration_min),
            image_url: formData.image_url,
            active: formData.active
        };

        let error;
        if (isNew) {
            const { error: insertError } = await supabase.from('services').insert([serviceData]);
            error = insertError;
        } else {
            const { error: updateError } = await supabase
                .from('services')
                .update(serviceData)
                .eq('id', params.id);
            error = updateError;
        }

        if (error) {
            alert('Error saving service: ' + error.message);
        } else {
            router.push('/admin/services');
            router.refresh();
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading form...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link href="/admin/services" className="flex items-center gap-2 text-gray-400 hover:text-white transition w-fit">
                <ArrowLeft size={16} /> Back to Services
            </Link>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-serif">
                    {isNew ? 'New Service' : 'Edit Service'}
                </h1>
            </div>

            <GlassPanel>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Active Toggle */}
                    <div className="flex items-center justify-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-gray-400 text-sm uppercase tracking-wider font-bold">Status:</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </div>
                            <span className={`text-sm font-bold ${formData.active ? 'text-green-400' : 'text-gray-500'}`}>
                                {formData.active ? 'Active' : 'Draft'}
                            </span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Service Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="e.g. Luxury Haircut & Style"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Duration (minutes)</label>
                            <select
                                name="duration_min"
                                value={formData.duration_min}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition [&>option]:text-black"
                            >
                                <option value="15">15 mins</option>
                                <option value="30">30 mins</option>
                                <option value="45">45 mins</option>
                                <option value="60">1 hour</option>
                                <option value="90">1.5 hours</option>
                                <option value="120">2 hours</option>
                                <option value="180">3 hours</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                                placeholder="Describe the service..."
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition placeholder-gray-600"
                                    placeholder="https://..."
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Leave empty for default icon.</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold py-4 rounded-lg hover:from-white hover:to-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {saving ? 'Saving...' : 'Save Service'}
                    </button>
                </form>
            </GlassPanel>
        </div>
    );
}
