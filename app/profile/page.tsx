'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Shield, User, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');
                return;
            }

            setUser(user);

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profile);
            setLoading(false);
        };

        fetchUser();
    }, [router, supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <Loader2 className="animate-spin text-amber-400" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 py-32 px-6">
            <div className="max-w-2xl mx-auto space-y-8">
                <GlassPanel className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center text-4xl font-bold mb-4 border-2 border-amber-500/30 overflow-hidden">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} className="text-gray-400" />
                            )}
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white mb-2">
                            {profile?.full_name || 'Valued Customer'}
                        </h1>
                        <p className="text-gray-400">{user.email}</p>
                        {profile?.role === 'admin' && (
                            <span className="mt-2 text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                                <Shield size={12} fill="currentColor" /> Admin Access
                            </span>
                        )}
                    </div>

                    <div className="space-y-4">
                        {profile?.role === 'admin' && (
                            <Link href="/admin" className="block p-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-xl hover:from-amber-500/30 hover:to-yellow-500/30 transition group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition">
                                            <Shield size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-amber-100 group-hover:text-white transition">Admin Dashboard</h3>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition">Manage bookings, services, and shop.</p>
                                        </div>
                                    </div>
                                    <div className="text-amber-400 group-hover:translate-x-1 transition">→</div>
                                </div>
                            </Link>
                        )}

                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <h3 className="font-bold text-white mb-1">My Bookings</h3>
                            <p className="text-sm text-gray-400 mb-4">You have no upcoming appointments.</p>
                            <Link href="/bookings" className="text-sm text-amber-400 hover:text-amber-300">Book an Appointment →</Link>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="w-full p-4 flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 rounded-xl transition border border-transparent hover:border-red-500/20"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </GlassPanel>
            </div>
        </div>
    );
}
