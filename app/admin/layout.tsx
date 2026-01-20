import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { GlassPanel } from '@/components/ui/GlassPanel';
import Link from 'next/link';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    // 1. Check Auth Session
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 2. Check Admin Role via DB Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        // Redirect to home if not admin
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-white/10 p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-8 tracking-wider">Tóc<span className="text-amber-400">Admin</span></h2>
                <nav className="space-y-4">
                    <NavLink href="/admin">Dashboard</NavLink>
                    <NavLink href="/admin/bookings">Bookings</NavLink>
                    <NavLink href="/admin/services">Services</NavLink>
                    <NavLink href="/admin/products">Products</NavLink>
                    <NavLink href="/admin/hours">Hours</NavLink>
                </nav>
            </aside>

            {/* Mobile Navigation */}
            <div className="md:hidden border-b border-white/10 p-4 bg-neutral-900 sticky top-0 z-30">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold tracking-wider">Tóc<span className="text-amber-400">Admin</span></h2>
                </div>
                <nav className="flex space-x-2 overflow-x-auto pb-2">
                    <NavLink href="/admin">Dashboard</NavLink>
                    <NavLink href="/admin/bookings">Bookings</NavLink>
                    <NavLink href="/admin/services">Services</NavLink>
                    <NavLink href="/admin/products">Products</NavLink>
                    <NavLink href="/admin/hours">Hours</NavLink>
                </nav>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="block px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white whitespace-nowrap"
        >
            {children}
        </Link>
    );
}
