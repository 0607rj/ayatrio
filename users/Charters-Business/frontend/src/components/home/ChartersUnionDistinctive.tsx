'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProgramData {
  id: string;
  title: string;
  header: string;
  description: string;
  imageUrl: string;
  stats: {
    percentage: string;
    percentageDescription: string;
    multiplier: string;
    multiplierDescription: string;
  };
  quote: string;
  author: {
    title: string;
    para: string;
  };
}

const programsData: ProgramData[] = [
  {
    id: 'global-mncs-project',
    title: 'Global MNCs Project Base Program',
    header: '',
    description: 'What make Charter&apos;s Union of business distinctive. What make Charter&apos;s Union of business distinctive.',
    imageUrl: '/home/manstand.png',
    stats: {
      percentage: '859%',
      percentageDescription: 'Increase in year-over-year consumption of GenAI for productivity learning on Udemy Business.',
      multiplier: '2x',
      multiplierDescription: 'as many organizations are using GenAI regularly compared to just ten months ago.'
    },
    quote: 'While "GenAI fatigue" may be setting in, organizations and employees need to stay vigilant and continually work to build their skills as these tools evolve. The difference between superficial use and contextual integrated use of GenAI capabilities is essential. The latter is necessary to realize significant, ongoing, and scalable value from GenAI initiatives in the short and long term.',
    author: {
      title: '',
      para: ''
    }
  },
  {
    id: 'local-startup-intraship',
    title: 'Local startup intraship cariculum',
    header: 'According to Udemy research:',
    description: 'What make Charter&apos;s Union of business distinctive. What make Charter&apos;s Union of business distinctive.',
    imageUrl: '/home/box2.png',
    stats: {
      percentage: '84%',
      percentageDescription: 'say their companies have started considering how to implement skills-based processes over the next year.',
      multiplier: '75%',
      multiplierDescription: 'state that their company has already implemented at least one process.'
    },
    quote: 'The rapid evolution of technology requires continuous learning and adaptation. Our local startup internship program bridges the gap between academic knowledge and practical industry experience, ensuring students are ready for the modern workforce.',
    author: {
      title: '',
      para: ''
    }
  },
  {
    id: 'global-mncs-internships',
    title: 'Global MNCs internships curriculum',
    header: 'In a recent quarterly update on the state of GenAI, Deloitte reports that:',
    description: 'What make Charter&apos;s Union of business distinctive. What make Charter&apos;s Union of business distinctive.',
    imageUrl: '/home/box3.png',
    stats: {
      percentage: '2/3',
      percentageDescription: 'of organizations are increasing their GenAI investments because they have seen strong early value to data, but many are still challenged to successfully scale that value.',
      multiplier: '70%',
      multiplierDescription: 'of respondents said their organization has moved 30% or fewer of their GenAI experiments to production.'
    },
    quote: '"We needed our learning programs to continually update and evolve with the rapid evolution of AI technologies. This would help us not only continue driving value for our clients amidst ongoing GenAI disruption, but also enable our talent to build career resilience."',
    author: {
      title: 'Bharata Bhagat',
      para: 'Talent Development Head for GenAI & AI at Genpact in Utero statement'
    }
  }
];

// Circular Pie Chart SVG for 84%
const CircularChartSVG = () => {
  const radius = 35;
  const centerX = radius;
  const centerY = radius;
  const percentage = 84;
  const angle = (percentage / 100) * 360;
  const radians = (angle - 90) * (Math.PI / 180);
  const endX = centerX + radius * Math.cos(radians);
  const endY = centerY + radius * Math.sin(radians);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const pathData = [
    `M ${centerX} ${centerY}`,
    `L ${centerX} ${centerY - radius}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    'Z'
  ].join(' ');

  return (
    <div className="relative min-w-0">
      <svg height={radius * 2} width={radius * 2} className="absolute -top-4 -left-9 max-w-full">
        <circle cx={centerX} cy={centerY} r={radius} fill="#e5e7eb" />
        <path d={pathData} fill="#B30437" className="transition-all duration-1000 ease-out" />
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#d1d5db" strokeWidth="1" />
      </svg>
      <div className="relative z-10 min-w-0">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">84%</div>
        <p className="text-xs text-gray-600 leading-tight max-w-[180px] break-words">
          say their companies have started considering how to implement skills-based processes over the next year.
        </p>
      </div>
    </div>
  );
};

// Bar Chart SVG for 75%
const BarChartSVG = () => {
  const barHeight = 60;
  const barWidth = 120;
  const fillPercentage = 75;

  return (
    <div className="relative min-w-0">
      <svg width={barWidth + 20} height={barHeight + 20} className="absolute -top-6 -left-4 max-w-full">
        <rect x="10" y="10" width={barWidth} height="12" fill="#e5e7eb" rx="6" />
        <rect
          x="10"
          y="10"
          width={(barWidth * fillPercentage) / 100}
          height="12"
          fill="#B30437"
          rx="6"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="relative z-10 min-w-0">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">75%</div>
        <p className="text-xs text-gray-600 leading-tight max-w-[180px] break-words">
          state that their company has already implemented at least one process.
        </p>
      </div>
    </div>
  );
};

// Combined Stats with Charts
const StatsSVG = () => (
  <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8 overflow-hidden">
    <CircularChartSVG />
    <BarChartSVG />
  </div>
);

// Fraction Display with Background Shape for 1/3
const BottomStatSVG = () => (
  <div className="mt-6 relative max-w-full overflow-hidden">
    <svg width="80" height="80" viewBox="0 0 80 80" className="absolute -top-2 -left-4 max-w-full">
      <path
        d="M20 40 Q10 20 30 15 Q50 10 60 25 Q70 40 55 55 Q40 70 25 60 Q10 50 20 40 Z"
        fill="rgba(34, 197, 94, 0.15)"
      />
    </svg>
    <div className="relative z-10 bg-gray-50 p-4 border-l-4 border-[#B30437] max-w-full">
      <div className="text-2xl sm:text-3xl font-bold text-black mb-2">1/3</div>
      <p className="text-xs text-gray-600 leading-tight break-words">
        of all respondents report that they are not yet seeing any changes as a result of skills-based initiatives.
      </p>
    </div>
  </div>
);

// Props interface for StatsContent component
interface StatsContentProps {
  selectedData: ProgramData;
  selectedProgram: string;
  isVisible: boolean;
}

// Stats Content Component with fade transitions
const StatsContent: React.FC<StatsContentProps> = ({ selectedData, selectedProgram, isVisible }) => (
  <div
    className={`flex-1 relative transition-all duration-500 ease-in-out min-w-0 max-w-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
  >
    <div className="mb-6 lg:mb-8 relative z-10 overflow-hidden">
      <p className="text-sm text-gray-500 mb-4 lg:mb-6 break-words">{selectedData.header}</p>

      {/* Conditional rendering of chart SVGs for local-startup-intraship */}
      {selectedProgram === 'local-startup-intraship' ? (
        <StatsSVG />
      ) : (
        <div className="flex items-start gap-4 sm:gap-6 lg:gap-9 mb-6 lg:mb-8 overflow-hidden flex-wrap">
          <div className="min-w-0 max-w-full">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#B30437] mb-2">
              {selectedData.stats.percentage}
            </div>
            <p className="text-xs text-gray-600 leading-tight break-words max-w-[250px]">{selectedData.stats.percentageDescription}</p>
          </div>
          <div className="min-w-0 max-w-full">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">{selectedData.stats.multiplier}</div>
            <p className="text-xs text-gray-600 leading-tight break-words max-w-[250px]">{selectedData.stats.multiplierDescription}</p>
          </div>
        </div>
      )}
    </div>

    {/* Quote Box */}
    <div className="bg-gray-50 p-4 sm:p-6 border-l-4 border-[#B30437] relative z-10 max-w-full overflow-hidden">
      <p className="text-sm text-gray-700 leading-relaxed break-words">{selectedData.quote}</p>
    </div>

    {/* Add bottom stat SVG only for local-startup-intraship */}
    {selectedProgram === 'local-startup-intraship' && <BottomStatSVG />}

    {/* Author attribution */}
    <div className="mt-4 text-right flex flex-col items-end relative z-10 max-w-full overflow-hidden">
      <div className="text-xs text-gray-400 font-bold break-words">{selectedData.author.title}</div>
      <div className="text-xs text-gray-400 max-w-[200px] break-words">{selectedData.author.para}</div>
    </div>
  </div>
);

// Image Component with dynamic src and fade transitions
const PersonImage: React.FC<{ isVisible: boolean; imageUrl: string; altText: string }> = ({
  isVisible,
  imageUrl,
  altText,
}) => (
  <div
    className={`flex-1 flex items-end justify-end transition-all duration-500 ease-in-out min-w-0 max-w-full overflow-hidden ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
  >
    <div className="w-full max-w-sm">
      <Image
        src={imageUrl}
        alt={altText}
        width={400}
        height={600}
        className="w-full h-auto max-w-full"
      />
    </div>
  </div>
);

export default function ChartersUnionDistinctive() {
  const [selectedProgram, setSelectedProgram] = useState<string>(programsData[0].id);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const selectedData = programsData.find((program) => program.id === selectedProgram) || programsData[0];

  const shouldSwapLayout =
    selectedProgram === 'local-startup-intraship' ||
    selectedProgram === 'global-mncs-internships';

  // Handle program change with fade transition
  const handleProgramChange = (programId: string) => {
    if (programId === selectedProgram) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProgram(programId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  return (
    <div className="bg-white py-6 sm:py-8 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative w-full overflow-hidden">
          {/*  Header */}
          <div className="relative lg:absolute top-0 left-0 z-10 mb-8 lg:mb-0 max-w-full pr-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight max-w-xs sm:max-w-md lg:max-w-3xl break-words">
              What make Charter&apos;s Union of business distinctive
            </h1>
          </div>

          {/* Three Column  */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-12 sm:pt-20 xl:pt-2 w-full overflow-hidden">
            {/* First Column: Selectable Boxes */}
            <div className="w-full lg:w-1/3 lg:relative lg:top-30 min-w-0 max-w-full">
              <div className="space-y-1">
                {programsData.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => handleProgramChange(program.id)}
                    className={`w-full text-left p-4 sm:p-6 border-2 transition-all duration-300 max-w-full overflow-hidden ${selectedProgram === program.id
                      ? 'border-[#B30437] bg-[#B30437]/5'
                      : 'border-transparent hover:border-gray-200'
                      }`}
                  >
                    <h3
                      className={`text-base sm:text-lg font-semibold transition-colors duration-300 break-words ${selectedProgram === program.id ? 'text-[#B30437]' : 'text-black'
                        }`}
                    >
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed break-words">{program.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Second Column  */}
            <div className={`w-full lg:w-1/3 flex items-start min-w-0 max-w-full ${shouldSwapLayout ? 'pt-0 lg:pt-32' : 'pt-0 lg:pt-9'}`}>
              {shouldSwapLayout ? (
                <StatsContent
                  selectedData={selectedData}
                  selectedProgram={selectedProgram}
                  isVisible={!isTransitioning}
                />
              ) : (
                <PersonImage
                  isVisible={!isTransitioning}
                  imageUrl={selectedData.imageUrl}
                  altText={`Professional portrait for ${selectedData.title}`}
                />
              )}
            </div>

            {/* Third Column  */}
            <div className="w-full lg:w-1/3 flex items-start pt-0 lg:pt-32 min-w-0 max-w-full">
              {shouldSwapLayout ? (
                <PersonImage
                  isVisible={!isTransitioning}
                  imageUrl={selectedData.imageUrl}
                  altText={`Professional portrait for ${selectedData.title}`}
                />
              ) : (
                <StatsContent
                  selectedData={selectedData}
                  selectedProgram={selectedProgram}
                  isVisible={!isTransitioning}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
