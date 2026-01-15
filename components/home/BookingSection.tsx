'use client';
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useState } from "react";

export default function BookingSection() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [serviceType, setServiceType] = useState<string>("cut");

    // Mock time slots
    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/80 -z-10" />
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">

                    {/* Left: Info */}
                    <div className="lg:w-1/2 text-left">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Book Your <br /> <span className="text-purple-400">Transformation</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Select your preferred date and time to secure a spot with our styling experts.
                            Whether it's a refreshing cut or a vibrant new color, we are ready to bring
                            your vision to life.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-400 rounded-full" /> Personal consultation included
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-400 rounded-full" /> Premium product application
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-400 rounded-full" /> 100% Satisfaction guarantee
                            </li>
                        </ul>
                    </div>

                    {/* Right: Booking UI */}
                    <div className="lg:w-1/2 w-full">
                        <GlassPanel className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Request Appointment</h3>

                            <div className="space-y-6">
                                {/* Service Selection */}
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Service Type</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setServiceType('cut')}
                                            className={`py-3 rounded-lg border transition ${serviceType === 'cut' ? 'bg-purple-500/20 border-purple-500 text-purple-200' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                                        >
                                            Hair Cut & Style
                                        </button>
                                        <button
                                            onClick={() => setServiceType('color')}
                                            className={`py-3 rounded-lg border transition ${serviceType === 'color' ? 'bg-purple-500/20 border-purple-500 text-purple-200' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                                        >
                                            Color Treatment
                                        </button>
                                    </div>
                                </div>

                                {/* Date Selection */}
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Select Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>

                                {/* Time Selection */}
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">Available Times</label>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`text-sm py-2 rounded border transition ${selectedTime === time ? 'bg-purple-500 text-white border-purple-500' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-purple-100 transition mt-4 shadow-lg">
                                    Confirm Booking
                                </button>
                            </div>
                        </GlassPanel>
                    </div>
                </div>
            </div>
        </section>
    );
}
