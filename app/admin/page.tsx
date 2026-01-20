'use client';

import { GlassPanel } from '@/components/ui/GlassPanel';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import OpeningHoursManager from '@/components/admin/OpeningHoursManager';
import StaffManager from '@/components/admin/StaffManager';

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchBookings = async () => {
        const { data } = await supabase
            .from('bookings')
            .select(`
                *,
                profiles:user_id (full_name),
                services:service_id (name, price)
            `)
            .order('created_at', { ascending: false });

        setBookings(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id);

        if (!error) {
            fetchBookings();
        } else {
            alert("Error updating booking");
        }
    };

    // Calculate stats
    const totalRevenue = bookings
        .filter(b => b.status === 'completed' || b.status === 'paid') // Assuming 'confirmed' isn't paid yet? Or maybe 'confirmed' counts. Let's say 'confirmed' counts for now for projection
        .reduce((sum, b) => sum + (b.services?.price || 0), 0);

    const activeBookings = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
    const newCustomers = new Set(bookings.map(b => b.user_id)).size;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard title="Est. Revenue" value={`$${totalRevenue}`} change="Based on confirmed bookings" />
                <StatsCard title="Active Bookings" value={activeBookings.toString()} change={`${bookings.filter(b => b.status === 'pending').length} pending confirmation`} />
                <StatsCard title="Total Customers" value={newCustomers.toString()} change="Lifetime unique" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Analytics Chart */}
                <GlassPanel className="h-[400px]">
                    <h2 className="text-xl font-semibold mb-6">Booking Activity</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bookings.slice(0, 10).reverse()}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="created_at" tickFormatter={(val) => new Date(val).toLocaleDateString()} stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                            />
                            <Bar dataKey="services.price" name="Value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </GlassPanel>

                {/* Recent Bookings List */}
                <GlassPanel className="min-h-[400px]">
                    <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>
                    {loading ? (
                        <div className="flex justify-center"><Loader2 className="animate-spin text-amber-400" /></div>
                    ) : (
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between gap-4">
                                    <div>
                                        <div className="font-bold text-white flex items-center gap-2">
                                            {booking.profiles?.full_name || 'Guest'}
                                            <span className={`text-xs px-2 py-0.5 rounded-full uppercase ${booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                                booking.status === 'confirmed' ? 'bg-green-500/20 text-green-300' :
                                                    'bg-red-500/20 text-red-300'
                                                }`}>{booking.status}</span>
                                        </div>
                                        <div className="text-sm text-gray-300">{booking.services?.name} (${booking.services?.price})</div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(booking.start_time).toLocaleString()}
                                        </div>
                                    </div>

                                    {booking.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateStatus(booking.id, 'confirmed')}
                                                className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/40 transition" title="Confirm"
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(booking.id, 'cancelled')}
                                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition" title="Cancel"
                                            >
                                                <XCircle size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </GlassPanel>
            </div>

            {/* Opening Hours Management */}
            <GlassPanel className="p-6">
                <h2 className="text-xl font-semibold mb-6">Salon Opening Hours</h2>
                <OpeningHoursManager />
            </GlassPanel>

            {/* Staff Management */}
            <GlassPanel className="p-6">
                <h2 className="text-xl font-semibold mb-6">Staff Management</h2>
                <StaffManager />
            </GlassPanel>
        </div>
    );
}

function StatsCard({ title, value, change }: { title: string, value: string, change: string }) {
    return (
        <GlassPanel>
            <h3 className="text-sm text-gray-400 uppercase tracking-wider">{title}</h3>
            <div className="text-4xl font-bold my-2">{value}</div>
            <p className="text-sm text-green-400">{change}</p>
        </GlassPanel>
    );
}
