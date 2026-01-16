'use client';

import ParallaxBackground from '@/components/layout/ParallaxBackground';
import GallerySection from '@/components/home/GallerySection';

export default function GalleryPage() {
    return (
        <ParallaxBackground imageUrl="/salon-bg-2.jpg">
            <div className="pt-10 md:pt-20">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">Gallery</h1>
                <GallerySection />
            </div>
        </ParallaxBackground>
    );
}
