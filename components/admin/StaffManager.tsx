'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, UserPlus, UserMinus, Search, Shield } from 'lucide-react';

interface Profile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string;
}

export default function StaffManager() {
    const [staff, setStaff] = useState<Profile[]>([]);
    const [customers, setCustomers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [promoting, setPromoting] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        setLoading(true);
        // Fetch all profiles
        const { data, error } = await supabase
            .from('profiles')
            .select('*');

        if (data) {
            setStaff(data.filter(p => p.role === 'staff' || p.role === 'admin'));
            setCustomers(data.filter(p => p.role !== 'staff' && p.role !== 'admin'));
        }
        setLoading(false);
    };

    const updateRole = async (userId: string, newRole: string) => {
        setPromoting(userId);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', userId);

            if (error) throw error;
            fetchProfiles();
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Failed to update role');
        } finally {
            setPromoting(null);
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-amber-400" /></div>;

    return (
        <div className="space-y-8 text-white max-w-4xl">
            {/* Current Staff */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
                    <Shield size={18} /> Current Staff
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {staff.map((member) => (
                        <div key={member.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
                                    {member.avatar_url ? (
                                        <img src={member.avatar_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="font-bold">{member.full_name?.[0] || '?'}</span>
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">{member.full_name || 'Unnamed User'}</div>
                                    <div className="text-xs text-amber-500 uppercase font-bold tracking-wider">{member.role}</div>
                                </div>
                            </div>

                            {member.role !== 'admin' && ( // Prevent demoting admins here for safety
                                <button
                                    onClick={() => updateRole(member.id, 'customer')}
                                    disabled={promoting === member.id}
                                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition opacity-0 group-hover:opacity-100"
                                    title="Remove from Staff"
                                >
                                    {promoting === member.id ? <Loader2 className="animate-spin" size={18} /> : <UserMinus size={18} />}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Staff */}
            <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserPlus size={18} /> Add Staff
                </h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search users by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                    />
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {filteredCustomers.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">No users found matching "{searchQuery}"</p>
                    ) : (
                        filteredCustomers.map((user) => (
                            <div key={user.id} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs">
                                        {user.full_name?.[0] || '?'}
                                    </div>
                                    <span>{user.full_name || 'Unnamed User'}</span>
                                </div>
                                <button
                                    onClick={() => updateRole(user.id, 'staff')}
                                    disabled={promoting === user.id}
                                    className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded hover:bg-amber-500/30 transition"
                                >
                                    {promoting === user.id ? <Loader2 className="animate-spin" size={14} /> : 'Promote'}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
