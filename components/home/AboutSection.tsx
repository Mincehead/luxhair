import { GlassPanel } from "@/components/ui/GlassPanel";

export default function AboutSection() {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <GlassPanel className="p-10 md:p-14 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
                        Our Philosophy
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                        Welcome to <span className="text-purple-400 font-semibold">LuxeHair</span>, where tradition meets modern artistry.
                        Inspired by the elegance and precision of high-end Vietnamese styling, we are dedicated to transforming your look with
                        impeccable techniques and premium care. Our salon is a sanctuary of beauty, designed to provide you with a relaxing
                        and luxurious experience from the moment you step in. We believe in dynamic realism—enhancing your natural beauty
                        with styles that are both sophisticated and effortlessly you.
                    </p>
                </GlassPanel>
            </div>
        </section>
    );
}
