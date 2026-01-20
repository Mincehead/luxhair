'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Save } from 'lucide-react';

interface OpeningHour {
    id: string;
    day_of_week: number;
    open_time: string | null;
    close_time: string | null;
    is_closed: boolean;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function OpeningHoursManager() {
    const [hours, setHours] = useState<OpeningHour[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        fetchHours();
    }, []);

    const fetchHours = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('opening_hours')
            .select('*')
            .order('day_of_week');

        if (data) setHours(data);
        if (error) console.error('Error fetching hours:', error);
        setLoading(false);
    };

    const handleChange = (id: string, field: keyof OpeningHour, value: any) => {
        setHours(hours.map(h => h.id === id ? { ...h, [field]: value } : h));
    };

    const saveChanges = async () => {
        setSaving(true);
        try {
            for (const hour of hours) {
                const { error } = await supabase
                    .from('opening_hours')
                    .update({
                        open_time: hour.open_time,
                        close_time: hour.close_time,
                        is_closed: hour.is_closed
                    })
                    .eq('id', hour.id);

                if (error) throw error;
            }
            alert('Opening hours updated successfully!');
        } catch (error: any) {
            console.error('Error saving hours:', error);
            alert('Failed to update hours');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-amber-400" /></div>;

    return (
        <div className="space-y-6 text-white max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Weekly Schedule</h2>
                <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-amber-400 transition disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            <div className="grid gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
                {hours.map((day) => (
                    <div key={day.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-black/20 rounded-lg">
                        <div className="font-medium text-lg text-amber-100 flex items-center gap-2">
                            {DAYS[day.day_of_week]}
                        </div>

                        <div className="md:col-span-3 flex flex-wrap gap-4 items-center">
                            <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-3 py-2 rounded border border-white/10 hover:bg-white/10 transition">
                                <input
                                    type="checkbox"
                                    checked={day.is_closed}
                                    onChange={(e) => handleChange(day.id, 'is_closed', e.target.checked)}
                                    className="accent-amber-500 w-4 h-4"
                                />
                                <span className={day.is_closed ? "text-red-400 font-medium" : "text-gray-400"}>
                                    {day.is_closed ? 'Closed' : 'Open'}
                                </span>
                            </label>

                            {!day.is_closed && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500 uppercase text-xs">Open</span>
                                        <input
                                            type="time"
                                            value={day.open_time || ''}
                                            onChange={(e) => handleChange(day.id, 'open_time', e.target.value)}
                                            className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:border-amber-500 focus:outline-none [color-scheme:dark]"
                                        />
                                    </div>
                                    <span className="text-gray-600 hidden md:inline">—</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500 uppercase text-xs">Close</span>
                                        <input
                                            type="time"
                                            value={day.close_time || ''}
                                            onChange={(e) => handleChange(day.id, 'close_time', e.target.value)}
                                            className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white focus:border-amber-500 focus:outline-none [color-scheme:dark]"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-sm text-gray-500 italic mt-4">
                * Changes affect available booking slots immediately. Existing bookings are not affected.
            </p>
        </div>
    );
}
