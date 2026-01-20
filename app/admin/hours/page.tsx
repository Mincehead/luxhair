'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Loader2, Save } from 'lucide-react';

type OpeningHour = {
    id?: string;
    day_of_week: number;
    open_time: string | null;
    close_time: string | null;
    is_closed: boolean;
};

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export default function OpeningHoursPage() {
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

        if (error) {
            console.error('Error fetching hours:', error);
            alert('Failed to load opening hours');
        } else {
            // Ensure we have entries for all days (merge with defaults if missing from DB)
            const filledHours = Array.from({ length: 7 }).map((_, index) => {
                const existing = data?.find((h) => h.day_of_week === index);
                return (
                    existing || {
                        day_of_week: index,
                        open_time: '09:00',
                        close_time: '17:00',
                        is_closed: false,
                    }
                );
            });
            setHours(filledHours);
        }
        setLoading(false);
    };

    const handleChange = (index: number, field: keyof OpeningHour, value: any) => {
        const newHours = [...hours];
        newHours[index] = { ...newHours[index], [field]: value };
        setHours(newHours);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = hours.map(h => ({
                day_of_week: h.day_of_week,
                open_time: h.is_closed ? null : h.open_time,
                close_time: h.is_closed ? null : h.close_time,
                is_closed: h.is_closed
            }));

            const { error } = await supabase
                .from('opening_hours')
                .upsert(updates, { onConflict: 'day_of_week' });

            if (error) throw error;
            alert('Opening hours saved successfully!');
            fetchHours(); // Refresh
        } catch (error: any) {
            console.error('Error saving hours:', error);
            alert(`Failed to save: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-amber-400" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Opening Hours</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>

            <GlassPanel className="p-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-gray-400 font-semibold mb-2 border-b border-white/10 pb-2">
                        <div>Day</div>
                        <div>Status</div>
                        <div>Open Time</div>
                        <div>Close Time</div>
                    </div>
                    {hours.map((day, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-white/5 pb-4 last:border-0">
                            <div className="font-medium text-white">{DAYS[day.day_of_week]}</div>

                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={!day.is_closed}
                                        onChange={(e) => handleChange(index, 'is_closed', !e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-gray-700"
                                    />
                                    <span className={day.is_closed ? "text-red-400" : "text-green-400"}>
                                        {day.is_closed ? 'Closed' : 'Open'}
                                    </span>
                                </label>
                            </div>

                            <div>
                                <input
                                    type="time"
                                    value={day.open_time || ''}
                                    onChange={(e) => handleChange(index, 'open_time', e.target.value)}
                                    disabled={day.is_closed}
                                    className="bg-neutral-800 border border-white/20 rounded px-3 py-2 text-white w-full disabled:opacity-30 disabled:cursor-not-allowed focus:border-amber-500 focus:outline-none [color-scheme:dark]"
                                />
                            </div>

                            <div>
                                <input
                                    type="time"
                                    value={day.close_time || ''}
                                    onChange={(e) => handleChange(index, 'close_time', e.target.value)}
                                    disabled={day.is_closed}
                                    className="bg-neutral-800 border border-white/20 rounded px-3 py-2 text-white w-full disabled:opacity-30 disabled:cursor-not-allowed focus:border-amber-500 focus:outline-none [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </GlassPanel>
        </div>
    );
}
