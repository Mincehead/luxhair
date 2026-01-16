'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ArrowLeft, Calendar, Clock, User, Check, X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Types (reused for consistency, though ideally centralized)
type BookingDetail = {
    id: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes: string | null;
    created_at: string;
    profiles: {
        id: string;
        full_name: string;
        avatar_url: string | null;
        email: string; // Assuming email is available in profile or joined
    };
    services: {
        name: string;
        price: number;
        duration_min: number;
        description: string;
    };
};

export default function AdminBookingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<BookingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        if (params.id) {
            fetchBooking(params.id as string);
        }
    }, [params.id]);

    const fetchBooking = async (id: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                profiles:user_id (id, full_name, avatar_url),
                services:service_id (*)
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching booking:', error);
            // Handle error (e.g., redirect or show message)
        } else {
            setBooking(data as any);
        }
        setLoading(false);
    };

    const updateStatus = async (newStatus: string) => {
        if (!booking) return;
        setUpdating(true);

        const { error } = await supabase
            .from('bookings')
            .update({ status: newStatus })
            .eq('id', booking.id);

        if (error) {
            alert('Failed to update status');
        } else {
            setBooking({ ...booking, status: newStatus as any });
            router.refresh();
        }
        setUpdating(false);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading booking details...</div>;
    if (!booking) return <div className="p-8 text-center text-gray-500">Booking not found.</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Link href="/admin/bookings" className="flex items-center gap-2 text-gray-400 hover:text-white transition w-fit">
                <ArrowLeft size={16} /> Back to Bookings
            </Link>

            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Booking #{booking.id.slice(0, 8)}</h1>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold border uppercase tracking-wider ${booking.status === 'confirmed' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
                            booking.status === 'completed' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                                booking.status === 'cancelled' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
                                    'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                            }`}>
                            {booking.status}
                        </span>
                        <span className="text-gray-500 text-sm">Created on {new Date(booking.created_at).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                    {booking.status === 'pending' && (
                        <>
                            <button
                                onClick={() => updateStatus('confirmed')}
                                disabled={updating}
                                className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg flex items-center gap-2 transition"
                            >
                                <CheckCircle size={18} /> Confirm
                            </button>
                            <button
                                onClick={() => updateStatus('cancelled')}
                                disabled={updating}
                                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg flex items-center gap-2 transition"
                            >
                                <XCircle size={18} /> Decline
                            </button>
                        </>
                    )}
                    {booking.status === 'confirmed' && (
                        <button
                            onClick={() => updateStatus('completed')}
                            disabled={updating}
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg flex items-center gap-2 transition"
                        >
                            <Check size={18} /> Mark Complete
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <GlassPanel>
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400">
                        <User size={20} /> Customer Details
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center text-xl font-bold overflow-hidden border-2 border-amber-500/30">
                            {booking.profiles?.avatar_url ? (
                                <img src={booking.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                booking.profiles?.full_name?.[0] || '?'
                            )}
                        </div>
                        <div>
                            <div className="text-xl font-bold">{booking.profiles?.full_name}</div>
                            <div className="text-gray-400">{booking.profiles?.id}</div>
                        </div>
                    </div>
                    {booking.notes && (
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Customer Notes</div>
                            <p className="italic text-gray-300">"{booking.notes}"</p>
                        </div>
                    )}
                </GlassPanel>

                {/* Service Info */}
                <GlassPanel>
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400">
                        <Calendar size={20} /> Service Details
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-400">Service Type</div>
                            <div className="text-lg font-medium">{booking.services?.name}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-400">Date</div>
                                <div className="text-lg font-medium">{new Date(booking.start_time).toLocaleDateString()}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Time</div>
                                <div className="text-lg font-medium">
                                    {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-400">Duration</div>
                                <div className="text-lg font-medium">{booking.services?.duration_min} mins</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">Price</div>
                                <div className="text-lg font-medium text-amber-400">${booking.services?.price}</div>
                            </div>
                        </div>
                    </div>
                </GlassPanel>
            </div>
        </div>
    );
}
