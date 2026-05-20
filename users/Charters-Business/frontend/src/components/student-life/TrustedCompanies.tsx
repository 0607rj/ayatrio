'use client';

import Link from 'next/link';

const COMPANIES = [
    { name: 'DOT Software Solutions', logo: '/logos/dot.png' },
    { name: 'OPPO', logo: '/logos/oppo.png' },
    { name: 'American Express', logo: '/logos/amex.png' },
    { name: 'Blueshift', logo: '/logos/blueshift.png' },
    { name: 'Bank of America', logo: '/logos/boa.png' },
    { name: 'Gartner', logo: '/logos/gartner.png' },
    { name: 'Agoda', logo: '/logos/agoda.png' },
    { name: 'Siemens', logo: '/logos/siemens.png' },
    { name: 'Ogilvy', logo: '/logos/ogilvy.png' },
    { name: 'EY', logo: '/logos/ey.png' },
    { name: 'Expedia', logo: '/logos/expedia.png' },
    { name: 'Wunderman Thompson', logo: '/logos/wunderman.png' },
    { name: 'American Express', logo: '/logos/amex.png' },
    { name: 'Aviva', logo: '/logos/aviva.png' },
    { name: 'WPP', logo: '/logos/wpp.png' },
    { name: 'Mobis', logo: '/logos/mobis.png' },
];


function CompanyLogo({ name, logo }: { name: string; logo: string }) {
    return (
        <div className="flex items-center justify-center w-full h-12 sm:h-14 px-3 sm:px-6">
            <img
                src={logo}
                alt={name}
                className="max-h-7 sm:max-h-9 w-auto max-w-[100px] sm:max-w-[130px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const fallback = img.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                }}
            />
            <span
                className="hidden items-center justify-center text-center text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wider uppercase leading-tight px-1"
            >
                {name}
            </span>
        </div>
    );
}

export default function TrustedCompanies() {
    const rows = [
        COMPANIES.slice(0, 4),
        COMPANIES.slice(4, 8),
        COMPANIES.slice(8, 12),
        COMPANIES.slice(12, 16),
    ];

    return (
        <section className="w-full bg-white pt-5 sm:pt-7 lg:pt-10">
            <div className="max-w-[85rem] mx-auto">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 px-4 sm:px-6 lg:px-8">
                    <p className="text-gray-900 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug max-w-3xl">
                        Our campus is nestled within the vibrant DLF Cyberpark, located in
                        Tower A and Tower C. You'll find yourself in close proximity to
                        leading Fortune 500 firms, creating unparalleled opportunities for
                        networking and growth.
                    </p>

                    <div className="flex-shrink-0 lg:pt-1">
                        <Link
                            href="#campus-tour"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 whitespace-nowrap"
                        >
                            Book a Campus Tour
                            <span className="text-sm">↗</span>
                        </Link>
                    </div>
                </div>

                {/* Company Logo Grid */}
                <div className="flex flex-col">
                    {rows.map((row, rowIdx) => (
                        <div key={rowIdx}>
                            <div className="border-t border-gray-200" />
                            <div className="grid grid-cols-4 py-2 sm:py-3">
                                {row.map((company, colIdx) => (
                                    <div
                                        key={`${rowIdx}-${colIdx}`}
                                        className={`flex items-center justify-center ${colIdx < row.length - 1 ? 'border-r border-gray-100' : ''
                                            }`}
                                    >
                                        <CompanyLogo name={company.name} logo={company.logo} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-gray-200" />
                </div>

            </div>
        </section>
    );
}