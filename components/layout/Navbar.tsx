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
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    Luxe<span className="text-purple-400 font-serif italic">Hair</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink href="/services">Services</NavLink>
                    <NavLink href="/shop">Shop</NavLink>
                    <NavLink href="/gallery">Gallery</NavLink>
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

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4">
                    <MobileLink href="/services">Services</MobileLink>
                    <MobileLink href="/shop">Shop</MobileLink>
                    <MobileLink href="/gallery">Gallery</MobileLink>
                    <MobileLink href="/about">Our Story</MobileLink>
                    <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                        {user ? (
                            <button onClick={handleSignOut} className="text-left text-gray-300">Sign Out</button>
                        ) : (
                            <MobileLink href="/login">Sign In</MobileLink>
                        )}
                    </div>
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

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-lg font-medium text-white block">
            {children}
        </Link>
    );
}
