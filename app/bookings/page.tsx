'use client';

import ParallaxBackground from '@/components/layout/ParallaxBackground';
import BookingSection from '@/components/home/BookingSection';

export default function BookingsPage() {
    return (
        <ParallaxBackground imageUrl="/salon-bg-3.jpg">
            <div className="pt-10 md:pt-20">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">Book an Appointment</h1>
                <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                    Secure your spot for a premium hair experience. Choose your service and time below.
                </p>
                <BookingSection />
            </div>
        </ParallaxBackground>
    );
}
