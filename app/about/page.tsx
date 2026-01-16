'use client';

import ParallaxBackground from '@/components/layout/ParallaxBackground';
import AboutSection from '@/components/home/AboutSection';

export default function AboutPage() {
    return (
        <ParallaxBackground imageUrl="/salon-bg-1.jpg">
            <div className="pt-10 md:pt-20">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">Our Story</h1>
                <AboutSection />
            </div>
        </ParallaxBackground>
    );
}
