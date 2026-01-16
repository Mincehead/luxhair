'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Plus, Edit, Trash, Scissors, Search, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Types
type Service = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    duration_min: number;
    image_url: string | null;
    active: boolean;
};

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const supabase = createClient();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setServices(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) {
            alert('Error deleting service');
        } else {
            fetchServices();
        }
    };

    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Service Menu</h1>
                    <p className="text-gray-400">Manage salon treatments and pricing.</p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="px-6 py-3 bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold rounded-lg hover:from-white hover:to-gray-200 transition shadow-lg flex items-center gap-2"
                >
                    <Plus size={20} /> Add Service
                </Link>
            </div>

            {/* Search & Filter Bar */}
            <GlassPanel className="p-4 flex items-center gap-4">
                <Search className="text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Search services..."
                    className="bg-transparent border-none focus:outline-none text-white w-full placeholder-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </GlassPanel>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-gray-500">Loading services...</div>
                ) : filteredServices.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10 flex flex-col items-center">
                        <Scissors size={48} className="mb-4 opacity-30" />
                        <p>No services found. Add your first treatment.</p>
                    </div>
                ) : (
                    filteredServices.map((service) => (
                        <GlassPanel key={service.id} className="group p-0 overflow-hidden flex flex-col h-full hover:border-amber-500/30 transition">
                            <div className="relative h-48 w-full bg-neutral-800">
                                {service.image_url ? (
                                    <Image src={service.image_url} alt={service.name} fill className="object-cover transition group-hover:scale-105" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-600">
                                        <Scissors size={48} opacity={0.2} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Link href={`/admin/services/${service.id}`} className="p-2 bg-black/50 backdrop-blur rounded-full text-white hover:bg-white hover:text-black transition">
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2 bg-black/50 backdrop-blur rounded-full text-red-400 hover:bg-red-500 hover:text-white transition"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                                {!service.active && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900/80 backdrop-blur rounded text-xs font-bold uppercase text-gray-400">
                                        Draft
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold font-serif">{service.name}</h3>
                                    <div className="text-amber-400 font-bold">${service.price}</div>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{service.description}</p>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} /> {service.duration_min} mins
                                    </div>
                                </div>
                            </div>
                        </GlassPanel>
                    ))
                )}
            </div>
        </div>
    );
}
