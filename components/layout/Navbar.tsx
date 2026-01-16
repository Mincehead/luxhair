'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Check Auth
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.refresh();
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
            }`}>
            <div className="relative z-50 container mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    Luxe<span className="text-purple-400 font-serif italic">Hair</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink href="/services">Services</NavLink>
                    <NavLink href="/shop">Shop</NavLink>
                    <NavLink href="/gallery">Gallery</NavLink>
                    <NavLink href="/bookings">Book Now</NavLink>
                    <NavLink href="/about">Our Story</NavLink>
                </div>

                {/* Icons & Auth */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="text-white hover:text-purple-400 transition">
                        <ShoppingBag size={20} />
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/profile" className="text-white hover:text-purple-400">
                                <User size={20} />
                            </Link>
                            <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-white">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition backdrop-blur-sm border border-white/10"
                        >
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center space-y-8 animate-in fade-in duration-200">
                    <MobileLink href="/services" onClick={() => setIsOpen(false)}>Services</MobileLink>
                    <MobileLink href="/shop" onClick={() => setIsOpen(false)}>Shop</MobileLink>
                    <MobileLink href="/gallery" onClick={() => setIsOpen(false)}>Gallery</MobileLink>
                    <MobileLink href="/bookings" onClick={() => setIsOpen(false)}>Book Now</MobileLink>
                    <MobileLink href="/about" onClick={() => setIsOpen(false)}>Our Story</MobileLink>

                    <div className="w-16 h-1 bg-white/10 rounded-full my-4" />

                    {user ? (
                        <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="text-xl text-gray-400 hover:text-white">Sign Out</button>
                    ) : (
                        <Link href="/login" onClick={() => setIsOpen(false)} className="text-xl text-purple-400 font-bold">Sign In</Link>
                    )}
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide">
            {children}
        </Link>
    );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link href={href} onClick={onClick} className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
            {children}
        </Link>
    );
}
