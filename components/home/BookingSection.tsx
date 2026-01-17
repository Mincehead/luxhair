'use client';
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function BookingSection() {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [selectedServiceId, setSelectedServiceId] = useState<string>("");
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingServices, setLoadingServices] = useState(true);
    const [user, setUser] = useState<any>(null);

    const router = useRouter();
    const supabase = createClient();

    // Mock time slots - in a real app these should be checked against availability
    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('active', true);

            if (data) {
                setServices(data);
                if (data.length > 0) setSelectedServiceId(data[0].id);
            }
            setLoadingServices(false);
        };

        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }

        fetchServices();
        checkUser();
    }, [supabase]);

    const handleBooking = async () => {
        if (!user) {
            router.push('/login?redirect=/bookings');
            return;
        }

        if (!selectedDate || !selectedTime || !selectedServiceId) {
            alert("Please select a service, date, and time.");
            return;
        }

        setLoading(true);

        try {
            // Construct timestamp
            // Note: This is a simplified timestamp construction. 
            // ideally use a library like date-fns for robust parsing
            const dateStr = `${selectedDate} ${selectedTime}`;
            const startTime = new Date(dateStr);

            // Find selected service duration
            const selectedService = services.find(s => s.id === selectedServiceId);
            const durationMin = selectedService ? selectedService.duration_min : 60;

            const endTime = new Date(startTime.getTime() + durationMin * 60 * 1000);

            const { error } = await supabase
                .from('bookings')
                .insert({
                    user_id: user.id,
                    service_id: selectedServiceId,
                    start_time: startTime.toISOString(),
                    end_time: endTime.toISOString(),
                    status: 'pending'
                });

            if (error) throw error;

            alert("Booking request sent! Check your profile for status.");
            router.push('/profile');

        } catch (error: any) {
            console.error('Error creating booking:', error);
            alert(`Booking failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/80 -z-10" />
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">

                    {/* Left: Info */}
                    <div className="lg:w-1/2 text-left">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Book Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Transformation</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Select your preferred date and time to secure a spot with our styling experts.
                            Whether it's a refreshing cut or a vibrant new color, we are ready to bring
                            your vision to life.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" /> Personal consultation included
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" /> Premium product application
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" /> 100% Satisfaction guarantee
                            </li>
                        </ul>
                    </div>

                    {/* Right: Booking UI */}
                    <div className="lg:w-1/2 w-full">
                        <GlassPanel className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Request Appointment</h3>

                            {loadingServices ? (
                                <div className="flex justify-center py-10">
                                    <Loader2 className="animate-spin text-amber-400" />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Service Selection */}
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Service Type</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {services.map((service) => (
                                                <button
                                                    key={service.id}
                                                    onClick={() => setSelectedServiceId(service.id)}
                                                    className={`py-3 px-4 rounded-lg border transition text-left ${selectedServiceId === service.id ? 'bg-amber-500/20 border-amber-500 text-amber-200' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                                                >
                                                    <div className="font-semibold">{service.name}</div>
                                                    <div className="text-sm opacity-70">${service.price} • {service.duration_min}m</div>
                                                </button>
                                            ))}
                                            {services.length === 0 && (
                                                <div className="col-span-2 text-gray-500 text-sm">No services available. Please contact support.</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Date Selection */}
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Select Date</label>
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition [color-scheme:dark]"
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
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
                                                    className={`text-sm py-2 rounded border transition ${selectedTime === time ? 'bg-amber-500 text-black border-amber-500 font-semibold' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBooking}
                                        disabled={loading || services.length === 0}
                                        className="w-full bg-gradient-to-r from-amber-200 to-yellow-500 text-black font-bold py-4 rounded-lg hover:from-white hover:to-gray-200 transition mt-4 shadow-lg border border-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                    >
                                        {loading && <Loader2 className="animate-spin" size={20} />}
                                        {loading ? 'Processing...' : 'Confirm Booking'}
                                    </button>
                                    {!user && (
                                        <p className="text-xs text-center text-gray-500 mt-2">You will be asked to login to confirm.</p>
                                    )}
                                </div>
                            )}
                        </GlassPanel>
                    </div>
                </div>
            </div>
        </section>
    );
}
