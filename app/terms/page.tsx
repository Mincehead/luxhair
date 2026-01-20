
import Link from 'next/link';

export default function TermsPage() {
    return (
        <main className="bg-neutral-900 min-h-screen text-gray-300 py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-white text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-700">
                        Terms of Service
                    </span>
                </h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">1. Bookings and Deposits</h2>
                        <p className="leading-relaxed">
                            To secure your appointment at TOC Salon, we may require a non-refundable deposit at the time of booking. This deposit will be credited toward your total service cost on the day of your appointment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">2. Cancellation Policy</h2>
                        <p className="leading-relaxed mb-4">
                            We value your time and ours. If you need to cancel or reschedule, we require at least 24 hours' notice.
                        </p>
                        <p className="leading-relaxed">
                            Cancellations made with less than 24 hours' notice will result in the forfeiture of your deposit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">3. Late Arrivals</h2>
                        <p className="leading-relaxed">
                            We strive to keep our appointments running on time. If you are more than 15 minutes late, we may need to shorten your service time or reschedule your appointment to avoid impacting other clients. In the event of a reschedule due to lateness, the cancellation fee may apply.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">4. E-commerce and Returns</h2>
                        <p className="leading-relaxed mb-4">For any products purchased through our online store:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-amber-500">
                            <li>
                                <strong className="text-white">Change of Mind:</strong> We do not offer refunds for change of mind on professional hair care products due to hygiene reasons.
                            </li>
                            <li>
                                <strong className="text-white">Faulty Items:</strong> If a product is faulty or damaged, please contact us within 7 days of receipt to arrange a replacement or refund in accordance with Australian Consumer Law.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">5. Service Satisfaction</h2>
                        <p className="leading-relaxed">
                            We want you to love your hair. If you are not satisfied with your service, please notify us within 7 days. We do not offer refunds on services, but we are happy to invite you back for a complimentary adjustment if the technical execution didn't meet the agreed-upon consultation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">6. Right to Refuse Service</h2>
                        <p className="leading-relaxed">
                            TOC Salon reserves the right to refuse service to anyone demonstrating inappropriate behaviour, or if the requested service may compromise the health and integrity of the hair.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
