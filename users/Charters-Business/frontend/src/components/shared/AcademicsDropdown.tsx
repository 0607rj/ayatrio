'use client';

import { useState, forwardRef } from 'react';
import Image from 'next/image';
import { getAllProgrammes, type ProgramKey } from '@/data/programmes';
interface AcademicsDropdownProps {
  isOpen: boolean;
  dropdownTop: number;
  onCourseClick: (sectionId: string) => void;
  isSecondaryVisible?: boolean;
}

const AcademicsDropdown = forwardRef<HTMLDivElement, AcademicsDropdownProps>(({
  isOpen,
  dropdownTop,
  isSecondaryVisible = false
}, ref) => {
  // Get all available programs
  const allProgrammes = getAllProgrammes();
const programDetails = allProgrammes.reduce((acc, programme) => {
  acc[programme.slug] = programme;
  return acc;
}, {} as Record<ProgramKey, (typeof allProgrammes)[number]>);
  // Get available program keys (only programs that have data)
  const availablePrograms = allProgrammes.map(p => p.slug);

  const [selectedProgram, setSelectedProgram] = useState<ProgramKey>(availablePrograms[0] || 'mba');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // State for handling image errors
  const [imageErrors, setImageErrors] = useState<Record<ProgramKey, boolean>>({
    "digital-growth-engineer": false,
"post-graduate-diploma-in-management": false,
"product-growth-engineering": false,
"diploma-in-business-administration": false,
  });

  const handleImageError = (programKey: ProgramKey) => {
    setImageErrors(prev => ({ ...prev, [programKey]: true }));
  };

  // Handle program change with fade transition
  const handleProgramChange = (program: ProgramKey) => {
    if (program !== selectedProgram && availablePrograms.includes(program)) {
      setIsTransitioning(true);

      setTimeout(() => {
        setSelectedProgram(program);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
    }
  };

  // Handle explore more click
 const handleExploreMoreClick = () => {
  const currentProgram = programDetails[selectedProgram];

  if (currentProgram) {
    window.location.href = `/${currentProgram.slug}`;
  }
};

  // Program menu items - only show programs that have data
  const allProgramMenuItems: { key: ProgramKey; label: string }[] = [
  { key: 'digital-growth-engineer', label: 'DIGITAL GROWTH ENGINEER' },
  { key: 'post-graduate-diploma-in-management', label: 'POST GRADUATE DIPLOMA IN MANAGEMENT' },
  { key: 'product-growth-engineering', label: 'PRODUCT GROWTH ENGINEERING' },
  { key: 'diploma-in-business-administration', label: 'DIPLOMA IN BUSINESS ADMINISTRATION' },
];

  // Filter to only show programs that exist in data
  const programMenuItems = allProgramMenuItems.filter(item =>
    availablePrograms.includes(item.key)
  );

  // Get current program data safely
  const currentProgramData = programDetails[selectedProgram];

  // If no program data exists, don't render
  if (!currentProgramData) {
    return null;
  }

  return (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Academic Programs Menu"
      style={{ top: dropdownTop }}
      className={`fixed left-0 right-0 w-full text-gray-800 bg-white border-b border-gray-200 z-50 transition-all duration-300 ease-out font-sans
    ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
  `}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 lg:py-8">
          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-2">

            {/* Left Section - Program Navigation Menu */}
            <aside
              className="flex flex-col w-full sm:w-full md:w-full lg:w-80 xl:w-96 2xl:w-[350px] space-y-0 overflow-hidden"
              aria-label="Program Selection Menu"
            >
              <ul className="list-none m-0 p-0">
                {programMenuItems.map((item, index) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => handleProgramChange(item.key)}
                      aria-current={selectedProgram === item.key ? 'true' : 'false'}
                      className={`w-full text-left group cursor-pointer py-4 px-6 transition-colors duration-200 ${index < programMenuItems.length - 1 ? 'border-b border-gray-200' : ''
                        } ${selectedProgram === item.key
                          ? 'bg-red-50 border-l-4 border-l-red-600'
                          : 'hover:bg-gray-100 hover:border-l-4 hover:border-l-red-300'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium transition-colors duration-200 ${selectedProgram === item.key
                          ? 'text-red-700'
                          : 'text-gray-700 group-hover:text-red-600'
                          }`}>
                          {item.label}
                        </span>
                        <span
                          className={`text-lg transition-colors duration-200 ${selectedProgram === item.key
                            ? 'text-red-600'
                            : 'text-gray-400 group-hover:text-red-500'
                            }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Right Section - Program Details */}
            <section
              className="flex flex-col lg:flex-row gap-0 flex-1 bg-white overflow-hidden"
              aria-label="Program Details"
            >

              {/* Explore More Link */}
              <aside
                className={`bg-gray-50 hover:bg-gray-200 flex flex-col items-center justify-center p-4 sm:p-6 border-r border-gray-200 cursor-pointer transition-colors duration-200
                          w-full lg:w-40 xl:w-48 2xl:w-56 
                          flex-shrink-0 group ${isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
              >
                <a
href={`/${currentProgramData.slug}`}
onClick={(e) => {
                    e.preventDefault();
                    handleExploreMoreClick();
                  }}
                  className="flex flex-col items-center text-center"
                  aria-label={`Explore more about ${currentProgramData.card.title}`}
                >
                  <span className="text-xs text-gray-500 mb-4 tracking-wider font-medium">
                    ACADEMIC PROGRAMS
                  </span>

                  <div className="mb-6">
                    <div className="w-20 h-20 flex items-center justify-center transition-colors duration-200">
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black transition-colors duration-200"
                        aria-hidden="true"
                      >
                        <path
                          d="M7 17L17 7M17 7H9M17 7V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-gray-800 group-hover:text-gray-900 text-lg font-bold mb-2 text-center leading-tight transition-colors duration-200">
                    EXPLORE<br />MORE
                  </h3>
                </a>
              </aside>

              {/* Program Details Content */}
              <div className={`bg-white text-gray-800 flex-1 p-4 sm:p-6 lg:p-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}>
                <div className="flex flex-col lg:flex-row gap-6">

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col justify-start min-w-0">
                    <header>
                      <h2 className="text-xl lg:text-2xl font-bold mb-2 text-gray-900 leading-tight">
                        {currentProgramData.card.title}
                      </h2>

                      <p className="text-red-600 text-sm font-semibold mb-4">
                        {currentProgramData.card.duration.type}
                      </p>
                    </header>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {currentProgramData.card.description}
                    </p>

                    {/* Statistics */}
                    <dl className="grid grid-cols-1 gap-3">
                      {currentProgramData.hero.stats?.map((stat, index) => (
                        <div
                          key={`${selectedProgram}-${index}`}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <dt className="text-red-600 text-2xl lg:text-3xl font-bold">
                            {stat.value}
                          </dt>
                          <dd className="text-gray-500 text-xs font-medium tracking-wider uppercase">
                            {stat.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Image Section */}
                  <aside className="w-full sm:w-full lg:w-64 xl:w-72 2xl:w-80 flex-shrink-0">
                    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                      }`}>
                      <figure className="w-full h-90 relative overflow-hidden">
                        {!imageErrors[selectedProgram] && currentProgramData.card.image ? (
                          <div className="relative w-full h-full">
                            <Image
                              key={selectedProgram}
                              src={currentProgramData.card.image}
                              alt={currentProgramData.card.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 256px, (max-width: 1280px) 288px, 320px"
                              className="object-cover"
                              onError={() => handleImageError(selectedProgram)}
                              priority={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center border-2 border-red-200 rounded-lg">
                            <figcaption className="text-center p-4">
                              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="text-white"
                                  aria-hidden="true"
                                >
                                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <h4 className="text-red-700 font-semibold text-sm leading-tight">
                                {currentProgramData.card.title.split(' ').slice(0, 2).join(' ')}
                              </h4>
                            </figcaption>
                          </div>
                        )}
                      </figure>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </nav>
  );
});

AcademicsDropdown.displayName = 'AcademicsDropdown';

export default AcademicsDropdown;
