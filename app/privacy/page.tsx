
export default function PrivacyPage() {
    return (
        <main className="bg-neutral-900 min-h-screen text-gray-300 py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-white text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-700">
                        Privacy Policy
                    </span>
                </h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">1. Collection of Information</h2>
                        <p className="leading-relaxed">
                            We collect personal information necessary to provide our services, including your name, contact details (email and phone number), and booking history. If you make a purchase through our site, we may also process payment information via secure third-party providers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">2. How We Use Your Data</h2>
                        <p className="leading-relaxed mb-4">Your information is used strictly for:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-amber-500">
                            <li>Managing and confirming your hair appointments.</li>
                            <li>Processing e-commerce transactions and shipping.</li>
                            <li>Sending occasional salon updates or promotions (which you can opt out of at any time).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">3. Disclosure and Security</h2>
                        <p className="leading-relaxed">
                            Tóc Salon does not sell or rent your personal data to third parties. We use industry-standard security measures to protect your information from unauthorized access. Data may be shared with trusted service providers (like our booking system or payment gateway) solely to facilitate our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">4. Cookies and Tracking</h2>
                        <p className="leading-relaxed">
                            Our website uses cookies to improve your browsing experience and analyze site traffic. You can adjust your browser settings to refuse cookies, though some site features may not function correctly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">5. Your Rights</h2>
                        <p className="leading-relaxed">
                            Under Australian law, you have the right to access the personal information we hold about you or request a correction. If you have questions regarding your privacy, please contact us directly.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
