
import { getCloudinarySrcSet, getCloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";
const heroData = {
  availableBadge: "Available Now",
  title: "Professional Accountant Training in Kolkata",
  titleHighlight: "with 100% Paid Internship",
  description:
    "Learn Professional Accounting in Kolkata with 3-month foundation + 4-month paid internship. Work with top companies from USA, Canada, Qatar, Singapore, Australia & UK. Join now!",
  backgroundImage: getCloudinaryUrl("charters-business/background", {
    width: 1080,
    quality: "auto:eco",
    format: "auto",
  }),
  backgroundImageSrcSet: getCloudinarySrcSet(
    "charters-business/background",
    [828, 1080, 1280, 1366, 1536],
    { quality: "auto:eco" },
  ),
  mobileBackgroundImage: getCloudinaryUrl("charters-business/Background-M", {
    width: 640,
    quality: "auto:eco",
    format: "auto",
  }),
  mobileBackgroundImageSrcSet: getCloudinarySrcSet(
    "charters-business/Background-M",
    [320, 390, 412, 515, 640],
    { quality: "auto:eco" },
  ),
  cta: {
    buttonText: "Join Webinar",
    buttonAriaLabel: "Join Mastering the Management webinar",
  },
};

function ChartersUnionHero() {
  return (
    <>
    <div className="h-[92px] md:h-[80px]" />
    <section
className="relative w-full h-[calc(100vh-96px)] min-h-[560px] overflow-hidden"
 role="banner"
aria-labelledby="hero-heading"
    >
      <h1 id="hero-heading" className="sr-only">
        {heroData.title} {heroData.titleHighlight}
      </h1>

<div className="relative w-full h-full">
  <picture>
          <source
            media="(min-width: 768px)"
            srcSet={`${heroData.backgroundImage} 1080w, ${heroData.backgroundImageSrcSet}`}
            sizes="100vw" 
          />
          <img
            src={heroData.mobileBackgroundImage}
            srcSet={heroData.mobileBackgroundImageSrcSet}
            sizes="100vw"
            alt="Professional Accountant Training in Kolkata Background"
            fetchPriority="high"
            decoding="async"        
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
      </div>

      {/* Mobile Content — hidden on md+ */}
      <div className="md:hidden relative h-full w-full px-4 flex flex-col items-center justify-center pb-10">
        <div className="flex flex-col items-center text-center space-y-3 w-full max-w-sm">
          {/* Badge */}
          <span className="inline-block bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold shadow-md">
            {heroData.availableBadge}
          </span>

          {/* Title */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {heroData.title}
            </h2>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#B30437] leading-tight italic">
              {heroData.titleHighlight}
            </h2>
          </div>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-white" />

          {/* Description */}
          <p className="text-white/90 text-sm leading-relaxed">
            {heroData.description}
          </p>
          {/* CTA Buttons */}
          <div className="w-full mt-2 flex flex-col gap-3">

            <Link href="/career-path" className="w-full">
              <button
                aria-label="Track your career path"
                className="w-full bg-black hover:bg-[#B30437] text-white py-3 px-8 rounded-lg text-sm font-semibold"
              >   
                Track Your Career Path
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex absolute inset-0 items-end justify-center pb-[14vh]">
  <div className="flex flex-row gap-4 items-center">

    {/* JOIN WEBINAR BUTTON */}
    <button
      aria-label={heroData.cta.buttonAriaLabel}
className="bg-black hover:bg-[#B30437] text-white py-2 px-6 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105"    >
      {heroData.cta.buttonText}
    </button>

    {/* TRACK CAREER BUTTON */}
    <Link href="/career-path">
      <button
className="bg-black hover:bg-[#B30437] text-white py-2 px-5 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"      >
        Track Your Career Path
      </button>
    </Link>

  </div>
</div>
    </section>
    </>
  );
}

export default ChartersUnionHero;