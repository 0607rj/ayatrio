'use client';

import { useRef } from 'react';

type PartnershipCard = {
  id: number;
  title: string;
  description: string;
  logos: { name: string; src: string }[];
};

const partnershipCards: PartnershipCard[] = [
  {
    id: 1,
    title: 'Enterprise AI delivery',
    description:
      "We run custom AI training and capability programs for some of the world's largest engineering and product teams.",
    logos: [
  {
    name: 'Google',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    name: 'Amazon',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    name: 'Meta',
src: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png'  },
  {
    name: 'Microsoft',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
],
  },
  {
    id: 2,
    title: 'Institutional partnerships',
    description:
      "We co-create programs with India's top institutions, blending academic rigor with AI-era industry relevance.",
    logos: [
  {
    name: 'NPTEL',
    src: 'https://nptel.ac.in/assets/shared/logo-m.jpg',
  },
  {
  name: 'IIT',
src: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Roorkee_logo.svg/512px-Indian_Institute_of_Technology_Roorkee_logo.svg.png'},
{
  name: 'IIM',
src: 'https://upload.wikimedia.org/wikipedia/en/5/5e/IIM_Ahmedabad_Logo.png'},
],
  },
  {
    id: 3,
    title: 'Government AI training',
    description:
      "We partnered with ADGM Academy to train citizens of Abu Dhabi in the future of AI, extending impact beyond India.",
    logos: [],
  },
];

export default function HomeBottomCardsCarousel() {
  const capabilityRef = useRef<HTMLDivElement>(null);

  const scrollCapability = () => {
    if (!capabilityRef.current) return;

    capabilityRef.current.scrollBy({
      left: 420,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full py-12 border-t border-gray-200 bg-white">
      <div className="max-w-[85rem] w-full mx-auto">
        <div className="text-center mb-10 px-4">
          <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-3">
            OUR CAPABILITIES
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-[35px] font-bold text-black">
            What makes us{' '}
            <span className="bg-green-200 px-2 italic">
              industry ready
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-3 border-t border-b border-gray-200">
            {partnershipCards.map((card, index) => (
              <article
                key={card.id}
className={`bg-[#F5F5F5] p-6 min-h-[220px] border-r border-gray-200 ${
        index === partnershipCards.length - 1 ? "border-r-0" : ""
      }`}              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {card.title}
                </h3>

                <p className="text-base text-gray-700 leading-relaxed mb-5">
                  {card.description}
                </p>

                <div className="border-t border-gray-200 pt-4 overflow-hidden">
  <div className="flex w-max animate-logo-scroll gap-6">
    {[...card.logos, ...card.logos].map((logo, index) => (
      <div
        key={`${card.id}-${logo.name}-${index}`}
className="border border-gray-200 rounded-lg px-4 py-2 flex items-center justify-center min-w-[120px] h-[60px]"      >
        <img
          src={logo.src}
          alt={logo.name}
          className="h-10 w-auto object-contain"
        />
      </div>
    ))}
  </div>
</div>
              </article>
            ))}
          </div>
        </div>
        <style jsx>{`
  @keyframes logoScroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }

  .animate-logo-scroll {
    animation: logoScroll 12s linear infinite;
  }
`}</style>
    </section>
    
  );
}