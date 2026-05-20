import Image from "next/image";

// DATA

const SECTION_HEADING = {
  title: "Career Launches for PGP TBM YLC",
  transitionsTitle: "Career Transitions For PGP TBM (Pre-MBA to Post-MBA)",
};

const ICON_BUILDING =
  "https://files.mastersunion.link/resources/svg/building.svg";

const YLC_LAUNCHES = [
  {
    category: "Career Advancement",
    items: [
      { from: "Delhi College of Arts and Commerce", to: "Associate, EY-P" },
      { from: "Hans Raj College", to: "Associate Program Manager, Zomato" },
      {
        from: "Narsee Monjee Institute Of Management Studies",
        to: "Deputy Manager, Founders' Office, Tata 1mg",
      },
      {
        from: "Savitribai Phule Pune University, Maharashtra",
        to: "Manager-EIR, Ozone",
      },
      {
        from: "Delhi College of Arts and Commerce",
        to: "Analytics- ADSK, Bloomberg",
      },
      {
        from: "Fr Conceicao Rodrigues Institute of Technology",
        to: "Project Manager (Intern), SuperK",
      },
    ],
  },
  {
    category: "Career Advancement",
    items: [
      { from: "Miranda House", to: "Assistant Program Manager, Zomato" },
      {
        from: "Guru Gobind Singh Indraprastha University",
        to: "Band Manager, Nivea",
      },
      {
        from: "Cluster Innovation Centre, Delhi University",
        to: "Founders' Office, Anveshan",
      },
      {
        from: "Miranda House",
        to: "Business Analyst Strategy Office, Lissun App",
      },
      { from: "Dr. A.P.J. Abdul Kalam University", to: "CoS, ConsultAdd" },
    ],
  },
];

const TBM_TRANSITIONS = [
  {
    category: "Industry Transition",
    items: [
      {
        from: "Business Development, Fortitude Marketing",
        to: "Sr. Consulting Associate, BCG",
      },
      {
        from: "Fresher, Kirori Mal College",
        to: "Sr. Consulting Associate, BCG",
      },
      { from: "Brand Marketing Assoc., Lbb", to: "VC Consultant, Antler" },
      { from: "Product Manager, Finoloy", to: "Founder's Office, Zerodha" },
      { from: "Analyst, Spinny", to: "Founder's Office, Zepto" },
      { from: "Senior Analyst, Schneider", to: "Consultant, Samagra" },
      {
        from: "Software Engineer, Hewlett Packard Ent.",
        to: "Management Trainee, Aditya Birla Capital",
      },
      { from: "Founder's Office, Piblitz", to: "Product Management, Zomato" },
      { from: "Scientist Engineer, ISRO", to: "Consultant, Avalon Consulting" },
      {
        from: "Founder, Buzzinga Eco Foods",
        to: "Product Design, Aditya Birla Capital",
      },
    ],
  },
  {
    category: "Career Advancement",
    items: [
      {
        from: "Senior Software Engineer, Honeywell",
        to: "Product Manager, CISCO",
      },
      {
        from: "Business Development Specialist, Mediu.net",
        to: "Strategic Partnerships Associate, CRED",
      },
      {
        from: "Project Associate, Env. Protection Society",
        to: "Data Research Analyst, Trilogy Inc.",
      },
      {
        from: "Analyst COE, Blackstone",
        to: "Senior VC Analyst, Stride Ventures",
      },
      {
        from: "Product Specialist, Sabre Travel",
        to: "Category Manager, Make My Trip",
      },
      { from: "Associate Consultant, ZS", to: "Consultant, BCG" },
      { from: "Associate, ZS", to: "Senior Manager, Cars 24" },
      {
        from: "Intern, Free Pads For India (NGO)",
        to: "Central Operations, Aditya Birla Capital",
      },
      {
        from: "Marketing Intern, eBay India",
        to: "Strategy Manager, HT Media",
      },
    ],
  },
];

export default function CareerTransitions() {
  return (
    <>
      {/* Career Launches for YLC */}
      <section
        id="transitions"
        aria-label="Transitions"
        className="w-full py-8 sm:py-12 md:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5">
          <h2 className="text-xl sm:text-2xl text-center md:text-3xl font-extrabold tracking-tight text-gray-900 mb-6 sm:mb-8 md:mb-12">
            {SECTION_HEADING.title}
          </h2>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-300 border-t border-b border-gray-300">
            {YLC_LAUNCHES.map((column, colIndex) => (
              <div
                key={colIndex}
                className="space-y-4 sm:space-y-6 pt-6 lg:pt-0 first:pt-0"
              >
                {/* Header — touches divider and outer boundary */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-300 px-4 sm:px-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={ICON_BUILDING}
                      alt="building"
                      width={16}
                      height={16}
                      className="sm:w-5 sm:h-5"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {column.category}
                  </span>
                </div>

                {/* Items — padded inward */}
                <div className="space-y-4 sm:space-y-5 px-4 sm:px-5 pb-2">
                  {column.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3"
                    >
                      <p className="text-xs sm:text-sm text-gray-700 text-left">
                        {item.from}
                      </p>
                      <div className="flex items-center gap-0.5 px-1">
                        <div className="w-6 sm:w-10 border-t-2 border-dotted border-gray-300" />
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 text-left">
                        {item.to}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Transitions for PGP TBM */}
      <section className="w-full py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-1 sm:mb-2">
            Career Transitions For PGP TBM
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-12">
            (Pre-MBA to Post-MBA)
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-300 border-t border-b border-gray-300">
            {TBM_TRANSITIONS.map((column, colIndex) => (
              <div
                key={colIndex}
                className="space-y-4 sm:space-y-6 pt-6 lg:pt-0 first:pt-0"
              >
                {/* Header — touches divider and outer boundary */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-300 px-4 sm:px-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={ICON_BUILDING}
                      alt="building"
                      width={16}
                      height={16}
                      className="sm:w-5 sm:h-5"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {column.category}
                  </span>
                </div>

                {/* Items — padded inward */}
                <div className="space-y-4 sm:space-y-5 px-4 sm:px-5 pb-2">
                  {column.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3"
                    >
                      <p className="text-xs sm:text-sm text-gray-700 text-left">
                        {item.from}
                      </p>
                      <div className="flex items-center gap-0.5 px-1">
                        <div className="w-6 sm:w-10 border-t-2 border-dotted border-gray-300" />
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 text-left">
                        {item.to}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
