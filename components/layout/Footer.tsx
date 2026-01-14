import Link from 'next/link';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold tracking-tighter">
                            Luxe<span className="text-purple-400 font-serif italic">Hair</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Redefining elegance through dynamic realism.
                            The premier destination for elite hair care and styling.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-6">Explore</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/services" className="hover:text-purple-400 transition">Services Menu</Link></li>
                            <li><Link href="/shop" className="hover:text-purple-400 transition">Shop Products</Link></li>
                            <li><Link href="/book" className="hover:text-purple-400 transition">Book Appointment</Link></li>
                            <li><Link href="/gallery" className="hover:text-purple-400 transition">Style Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center space-x-3">
                                <MapPin size={16} className="text-purple-400" />
                                <span>123 Luxury Lane, Beverly Hills, CA</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={16} className="text-purple-400" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={16} className="text-purple-400" />
                                <span>concierge@luxehair.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold mb-6">Follow Us</h4>
                        <div className="flex space-x-4">
                            <SocialIcon icon={<Instagram size={20} />} />
                            <SocialIcon icon={<Facebook size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>© 2026 LuxeHair Salon. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300 border border-white/10">
            {icon}
        </a>
    );
}
