'use client';

import { GlassPanel } from '@/components/ui/GlassPanel';
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

// Mock Data for Visualization
const data = [
    { name: 'Mon', bookings: 4, revenue: 240 },
    { name: 'Tue', bookings: 3, revenue: 139 },
    { name: 'Wed', bookings: 7, revenue: 580 },
    { name: 'Thu', bookings: 5, revenue: 390 },
    { name: 'Fri', bookings: 9, revenue: 800 },
    { name: 'Sat', bookings: 12, revenue: 1200 },
    { name: 'Sun', bookings: 6, revenue: 450 },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard title="Total Revenue" value="$3,800" change="+12% from last week" />
                <StatsCard title="Active Bookings" value="24" change="4 pending confirmation" />
                <StatsCard title="New Customers" value="8" change="+2 this week" />
            </div>

            {/* Analytics Chart */}
            <GlassPanel className="h-[400px]">
                <h2 className="text-xl font-semibold mb-6">Revenue Overview</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
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
