export default function StructuredData() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HairSalon',
        name: 'LuxeHair',
        image: 'https://luxhair.vercel.app/logo.png', // Placeholder
        '@id': 'https://luxhair.vercel.app',
        url: 'https://luxhair.vercel.app',
        telephone: '+1-555-123-4567',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Luxury Lane',
            addressLocality: 'Beverly Hills',
            addressRegion: 'CA',
            postalCode: '90210',
            addressCountry: 'US',
        },
        priceRange: '$$$',
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
        sameAs: [
            'https://www.facebook.com/luxhair',
            'https://www.instagram.com/luxhair',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
