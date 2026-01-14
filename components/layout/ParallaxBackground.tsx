'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxBackground({
    children,
}: {
    children: React.ReactNode;
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={ref} className="relative w-full overflow-hidden min-h-screen bg-neutral-900">
            {/* Layer 0: Base Background (Parallax) */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 h-[120vh]"
            >
                {/* Real HD Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-12186d30b7e7?q=80&w=2574&auto=format&fit=crop')" }}
                />
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </motion.div>

            {/* Layer 1: Atmospheric Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

            {/* Layer 2: Content */}
            <div className="relative z-20 container mx-auto px-4 py-20">
                <motion.div style={{ y: textY }}>
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
