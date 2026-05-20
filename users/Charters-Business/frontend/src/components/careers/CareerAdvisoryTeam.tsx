import Image from "next/image";

const BASE_IMAGE_URL = "https://images.mastersunion.link/uploads/24062025/v1";

const ADVISORY_TEAM = [
  {
    name: "Arudnat Rana",
    title: "Director - Corporate Engagements",
    company: "MBA, IIM-G | Wipro Mantra, CX | Mahara Group",
    image: `${BASE_IMAGE_URL}/careerAdvisor11.webp`,
  },
  {
    name: "Arvindy Puri",
    title: "Associate Director, Strategic Initiatives",
    company: "MBA, IIM-A | TELE-E Consults, UK",
    image: `${BASE_IMAGE_URL}/careerAdvisor2.webp`,
  },
  {
    name: "Marina Singh",
    title: "Deputy Director - Corporate Relations",
    company: "MBA, SII-B | Headstrong, Earn View",
    image: `${BASE_IMAGE_URL}/careerAdvisor3.webp`,
  },
  {
    name: "Neha Gori",
    title: "Deputy Director - Corporate Relations",
    company: "Ed, Mumbai Tech, US",
    image: `${BASE_IMAGE_URL}/careerAdvisor4.webp`,
  },
  {
    name: "Himanshu Chandra",
    title: "Head - Corporate Relations",
    company: "Ex, KPMG | SRH Hochschule | Ex, Deutsche Bank",
    image: `${BASE_IMAGE_URL}/careerAdvisor5.webp`,
  },
  {
    name: "Akshat Singhi",
    title: "Manager - Talent Relations",
    company: "MBA, SII-E Corporate | Ex, Accenture",
    image: `${BASE_IMAGE_URL}/careerAdvisor6.webp`,
  },
  {
    name: "Dwithi Kaman",
    title: "Senior Executive - Talent Acquisitions",
    company: "PG-D, I.E, SRCC",
    image: `${BASE_IMAGE_URL}/careerAdvisor7.webp`,
  },
  {
    name: "Ashish Gaur",
    title: "Manager - Finance & Preparations",
    company: "MBA, IIM-G | Ex. Categories",
    image: `${BASE_IMAGE_URL}/careerAdvisor8.webp`,
  },
  {
    name: "Puneet Aggarwal",
    title: "Manager - Business Development & Operations",
    company: "MBA, IIM-C | Ex. British Airways & IA-India",
    image: `${BASE_IMAGE_URL}/careerAdvisor9.webp`,
  },
  {
    name: "Simran Sharma",
    title: "Asst. Manager - Marketing Operations",
    company: "Ex, KPMG | I-Delhi-ncr-G",
    image: `${BASE_IMAGE_URL}/careerAdvisor10.webp`,
  },
  {
    name: "Dhwani Lalwani",
    title: "Manager - Director's Office",
    company: "Ex. Harness",
    image: `${BASE_IMAGE_URL}/careerAdvisor11.webp`,
  },
  {
    name: "Shreya Mishra",
    title: "Manager - International Corporate Relations",
    company: "Ex, Chartered Learning, Macquarie",
    image: `${BASE_IMAGE_URL}/careerAdvisor12.webp`,
  },
  {
    name: "Christopher",
    title: "Assistant Manager - Career Prep",
    company: "Ex, Bumbrus",
    image: `${BASE_IMAGE_URL}/careerAdvisor13.webp`,
  },
  {
    name: "Seema Mahna",
    title: "Manager - International Corporate Relations",
    company: "Ex, Dell Consulting",
    image: `${BASE_IMAGE_URL}/careerAdvisor14.webp`,
  },
  {
    name: "Prashant Gavhal",
    title: "Executive - Career Preparation",
    company: "MBA, IIM-G | Ex. Marketing",
    image: `${BASE_IMAGE_URL}/careerAdvisor15.webp`,
  },
  {
    name: "Akashdeep Nayak",
    title: "Assistant Manager - Career Prep",
    company: "MBA, IIM | Ex. Edemantic | Arethrica, Matsum",
    image: `${BASE_IMAGE_URL}/careerAdvisor16.webp`,
  },
  {
    name: "Swarna Soha",
    title: "Senior Manager - Corporate Relations",
    company: "Ex, Dell Consulting",
    image: `${BASE_IMAGE_URL}/careerAdvisor17.webp`,
  },
  {
    name: "Akashleena Senon",
    title: "Program Manager - Operations",
    company: "Ex, Shortation",
    image: `${BASE_IMAGE_URL}/careerAdvisor18.webp`,
  },
  {
    name: "Mateen Arora",
    title: "Program Manager - Career Programmes",
    company: "BA-Eng, I-E, Auckland | Ex, Education",
    image: `${BASE_IMAGE_URL}/careerAdvisor2.webp`,
  },
  {
    name: "Nandakisore Sathya",
    title: "Program Associate",
    company: "Ex, Vasso Divory",
    image: `${BASE_IMAGE_URL}/careerAdvisor20.webp`,
  },
];

export default function CareerAdvisoryTeam() {
  return (
    <section id="advisory" aria-label="Career Advisory Team" className="w-full bg-white pb-6 sm:pb-8 md:pb-10 pt-3 sm:pt-4 md:pt-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex-col text-center px-4 sm:px-5">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-1 sm:mb-2">
            PROFESSIONAL GUIDANCE
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
            Our Career Advisory Team
          </h2>
        </div>

        {/* Team */}
        <div className="flex flex-wrap">
          {ADVISORY_TEAM.map((member, index) => (
            <div
              key={index}
              className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4 border-r border-t border-b border-gray-200"
            >
              {/* Image */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-2">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </div>

              {/* Info */}
              <div className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1 leading-tight">{member.name}</h3>
              <p className="text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1 leading-tight" style={{ color: "#B30437" }}>
                {member.title}
              </p>
                <p className="text-[9px] sm:text-[10px] text-gray-600 leading-relaxed">{member.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
