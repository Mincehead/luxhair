'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Calendar, Search, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Types
type Booking = {
    id: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes: string | null;
    profiles: {
        full_name: string;
        avatar_url: string | null;
        email?: string; // Sometimes profile might extend user, need to check query
    };
    services: {
        name: string;
        price: number;
        duration_min: number;
    };
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const supabase = createClient();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                profiles:user_id (full_name, avatar_url),
                services:service_id (name, price, duration_min)
            `)
            .order('start_time', { ascending: false });

        if (data) {
            // @ts-ignore - Supabase types might be slightly off with joins
            setBookings(data);
        }
        setLoading(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const filteredBookings = bookings.filter(b =>
        filter === 'all' ? true : b.status === filter
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Bookings Management</h1>
                    <p className="text-gray-400">View and manage customer appointments.</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${filter === tab
                                ? 'bg-amber-500 text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading bookings...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                        <p>No bookings found for this filter.</p>
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <GlassPanel key={booking.id} className="p-0 overflow-hidden hover:border-amber-500/30 transition group">
                            <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                {/* Date Box */}
                                <div className="bg-white/5 rounded-lg p-4 text-center min-w-[100px] border border-white/5">
                                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                                        {new Date(booking.start_time).toLocaleDateString(undefined, { weekday: 'short' })}
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1">
                                        {new Date(booking.start_time).getDate()}
                                    </div>
                                    <div className="text-xs text-amber-500 font-medium">
                                        {new Date(booking.start_time).toLocaleDateString(undefined, { month: 'short' })}
                                    </div>
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                                                {booking.services?.name || 'Unknown Service'}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                                <Clock size={14} />
                                                {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                                                <span className="w-1 h-1 bg-gray-600 rounded-full mx-1" />
                                                {booking.services?.duration_min} min
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-2 border-t border-white/5 mt-2">
                                        <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold overflow-hidden">
                                            {booking.profiles?.avatar_url ? (
                                                <img src={booking.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                booking.profiles?.full_name?.[0] || '?'
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-300">{booking.profiles?.full_name || 'Unknown User'}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                                    <Link
                                        href={`/admin/bookings/${booking.id}`}
                                        className="w-full md:w-auto px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-center transition"
                                    >
                                        Manage
                                    </Link>
                                </div>
                            </div>
                        </GlassPanel>
                    ))
                )}
            </div>
        </div>
    );
}
