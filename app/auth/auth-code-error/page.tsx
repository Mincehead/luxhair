'use client';

import { GlassPanel } from '@/components/ui/GlassPanel';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <GlassPanel className="w-full max-w-md relative z-10 mx-4 text-center p-8">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
                        <AlertTriangle className="w-12 h-12 text-red-400" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">Authentication Error</h1>
                <p className="text-gray-300 mb-8">
                    There was a problem signing you in. This link may have expired or is invalid.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/login"
                        className="block w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold rounded-lg hover:from-white hover:to-gray-200 transition duration-300"
                    >
                        Try Again
                    </Link>

                    <Link href="/" className="block text-gray-400 hover:text-white text-sm">
                        Return to Home
                    </Link>
                </div>
            </GlassPanel>
        </div>
    );
}
