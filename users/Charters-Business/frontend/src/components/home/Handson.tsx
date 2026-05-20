"use client";

import { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import HighlightText from "../shared/HighlightObserver";

const features = [
  { icon: "/Charters-icon/Cancel.svg", title: "AI in Healthcare" },
  { icon: "/Charters-icon/Cancel.svg", title: "Healthcare Analytics" },
];

const CARD_MOBILE_BANNER_SIZES =
  "(max-width: 639px) calc(100vw - 0.5rem), (max-width: 1023px) calc(100vw - 1rem), 680px";
const CARD_DESKTOP_IMAGE_SIZES =
  "(min-width: 1360px) 680px, (min-width: 1024px) 50vw, 100vw";
const PARTNER_LOGO_SIZES = "(max-width: 768px) 100vw, 463px";

const cardsData = [
  {
    id: "creator",
    variant: "editorial",
    badge: "Content Creator Challenge",
    title: "Become an influencer-",
    subtitle: "Content Creator Challenge",
    description:
      "Learn marketing by building your own influencer brand. Create channels that run into thousands & even millions of followers.",
    mediaSrc: "/images/world-map-illistarter.avif",
    logos: ["ieseg", "babson", "bocconi", "harvard"],
  },
  {
    id: "ai-health",
    variant: "health-grid",
    badge: "AI Specializations",
    title: "AI in Healthcare",
    subtitle: "",
    description: "",
    logos: [],
    gridItems: [
      { title: "AI in Healthcare", icon: "/Charters-icon/Cancel.svg" },
      { title: "Hospital Management", icon: "/Charters-icon/Cancel.svg" },
      { title: "Healthcare Information Systems", icon: "/Charters-icon/Cancel.svg" },
      { title: "Healthcare Analytics", icon: "/Charters-icon/Cancel.svg" },
    ],
    mediaSrc:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1600&h=1200&fit=crop",
  },
  {
    id: "flagship",
    variant: "flagship",
    badge: "Flagship Programs",
    title: "Flagship Programs",
    subtitle: "",
    description: "",
    logos: [],
    mediaSrc:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1600&h=1200&fit=crop",
    programs: [
      { name: "Women's Leadership Program", duration: "8 Weeks" },
      { name: "First Time Manager", duration: "10 Weeks" },
      { name: "Women Accelerator", duration: "12 Weeks" },
      { name: "Product Management", duration: "14 Weeks" },
    ],
  },
];

interface CardLayoutProps {
  card: (typeof cardsData)[0];
}

function CardLayout({ card }: CardLayoutProps) {
  switch (card.variant) {
    case "editorial":
      return <EditorialCard card={card} />;
    case "health-grid":
      return <HealthGridCard card={card} />;
    case "flagship":
      return <FlagshipCard card={card} />;
    default:
      return null;
  }
}

interface EditorialCardProps {
  card: (typeof cardsData)[0];
}

function EditorialCard({ card }: EditorialCardProps) {
  return (
    <div className="flex flex-col h-full w-full overflow-y-visible lg:overflow-y-auto">
      <div className="relative block h-32 w-full flex-shrink-0 overflow-hidden lg:hidden">
        <Image
          src={card.mediaSrc}
          alt={`${card.title} visual`}
          fill
          className="w-full h-full object-cover"
          loading="lazy"
          quality={45}
          sizes={CARD_MOBILE_BANNER_SIZES}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        <div className="lg:col-span-6 flex flex-col justify-start md:justify-center px-3 sm:px-6 lg:px-7 py-2 sm:py-0">
          <span className="inline-flex w-fit items-center py-1 sm:py-[7px] text-black text-[10px] sm:text-[12px] font-bold tracking-wide">
            {card.badge}
          </span>

          <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] leading-[1.15] font-normal text-black mb-1 sm:mb-2 font-fraunces">
            {card.title}
            <br />
            {card.subtitle}
          </h2>

          <p className="text-[12px] sm:text-[14px] text-gray-500 leading-[1.6] sm:leading-[1.7] max-w-[48ch] mb-2 sm:mb-6">
            {card.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pb-[20px] space-y-2 sm:space-y-0">
            <div className="flex flex-col space-y-2">
              <span className="inline-flex w-fit border border-[#D5D0CA] px-[12px] rounded-full  items-center py-1 sm:py-[1px] text-gray-600 text-[9px] sm:text-[10px] tracking-wide">
                #1 surging business skill
              </span>
              <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] leading-[1] font-bold text-black">
                +3457%
              </h2>
              <p className="text-[9px] sm:text-[10px] lg:text-[12px] font-bold text-gray-600">Growth yoy microsoft</p>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="inline-flex border border-[#D5D0CA] w-fit px-[12px] rounded-full items-center py-1 sm:py-[1px] text-gray-600 text-[9px] sm:text-[10px] tracking-wide">
                #1 surging tech skill
              </span>
              <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] leading-[1] font-bold text-black">
                +13457%
              </h2>
              <p className="text-[9px] sm:text-[10px] lg:text-[12px] font-bold text-gray-600">Growth yoy microsoft copilot</p>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-wider">
              Curriculum structure based on partner institution
            </p>
            <div className="relative w-full h-[40px] object-contain overflow-hidden">
              <Image
                src="/charter-partner/chater-accounating-partner.avif"
                alt="Meet our creator alums"
                fill
                sizes={PARTNER_LOGO_SIZES}
                className="object-contain object-left"
              />
            </div>
          </div>

          <div className="mb-2">
            <p className="text-[11px] font-semibold text-gray-400 pt-2 mb-2 uppercase tracking-wider">
              In-class paid internship across the 12 countries
            </p>
            <div className="relative object-contain w-full h-[40px] overflow-hidden">
              <Image
                src="/charter-partner/charter_busness_school_works_country.avif"
                alt="Meet our creator alums"
                fill
                sizes={PARTNER_LOGO_SIZES}
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-6 flex-col relative h-full w-full overflow-hidden">
          <Image
            src={card.mediaSrc}
            alt={`${card.title} visual`}
            fill
            quality={45}
            sizes="(min-width: 1024px) 493px, 100vw"
            className="object-center scale-[0.99] h-auto object-contain w-full relative!"
          />
          <p className="absolute bottom-2 left-8 right-8 text-[8px] text-gray-500 bg-white bg-opacity-75 p-1 rounded">
            Source: *(a)¹Cr:Crore. (b)²CCA: certified corporate accountant.
            (c)³Times™ India Job Postings (median indian salary with 0-5 years
            experience, Jan. 1, 2022 - Dec. 31, 2022).
          </p>
        </div>
      </div>
    </div>
  );
}

interface HealthGridCardProps {
  card: (typeof cardsData)[0];
}

function HealthGridCard({ card }: HealthGridCardProps) {
  return (
    <section className="flex flex-col w-full bg-[#F4F2EE] overflow-hidden h-full max-h-[90vh]">
      {/* Mobile banner image */}
      <div className="relative block h-32 w-full flex-shrink-0 overflow-hidden lg:hidden">
        <Image
          src="/home/ima2.avif"
          alt={`${card.title} visual`}
          fill
          className="w-full h-full object-cover"
          loading="lazy"
          quality={40}
          sizes={CARD_MOBILE_BANNER_SIZES}
        />
      </div>

      {/* Main grid — min-h capped at 65vh so it never causes scroll on small laptops */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        {/* Left content column */}
        <div className="lg:col-span-6 flex flex-col px-3 sm:px-6 lg:px-7 py-2">
          <span className="inline-flex w-fit items-center mt-3 sm:mt-[30px] pb-1 sm:pb-[10px] text-gray-600 text-[10px] sm:text-[11px] font-medium tracking-wide">
            Content Creator Challenge
          </span>

          <h2 className="text-[22px] sm:text-[28px] lg:text-[36px] leading-[1.15] font-normal text-[#B30437] mb-2 font-fraunces">
            Become an influencer-
            <br />
            Content Creator Challenge
          </h2>

          <p className="text-[12px] sm:text-[14px] text-gray-500 leading-[1.6] sm:leading-[1.7] max-w-[48ch] mb-2 sm:mb-4">
            Learn marketing by building your own influencer brand. Create channels
            that run into thousands & even millions of followers.
          </p>

          <div className="max-w-full sm:max-w-[520px] border border-gray-300">
            <div className="grid grid-cols-2">
              {features.map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-x-3 gap-y-2 px-3 sm:px-4 py-3 sm:py-4 min-h-[60px] sm:min-h-[72px] border-gray-300 ${idx % 2 === 0 ? "border-r" : ""} ${idx < 2 ? "border-b" : ""}`}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-green-100 flex-shrink-0">
                    <Image src={item.icon} alt={item.title} width={12} height={12} className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                  </div>
                  <div className="max-w-full sm:max-w-[100px]">
                    <span className="block text-[11px] sm:text-[12px] leading-[1.25] font-medium text-gray-800">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <p className="text-[11px] font-semibold text-gray-400 pt-2 mb-2 uppercase tracking-wider">
              In-class paid internship across the 12 countries
            </p>
            <div className="relative object-contain w-full h-[40px] overflow-hidden">
              <Image
                src="/charter-partner/charter_busness_school_works_country.avif"
                alt="Meet our creator alums"
                fill
                sizes={PARTNER_LOGO_SIZES}
                className="object-contain object-left"
              />
            </div>
          </div>

          <div className="mb-2">
            <p className="text-[11px] font-semibold text-gray-400 pt-2 mb-2 uppercase tracking-wider">
              In-class paid internship across the 12 countries
            </p>
            <div className="relative object-contain w-full h-[40px] overflow-hidden">
              <Image
                src="/charter-partner/charter_busness_school_works_country.avif"
                alt="Meet our creator alums"
                fill
                sizes={PARTNER_LOGO_SIZES}
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>

        {/* Right image column */}
        <div className="hidden lg:block lg:col-span-6 relative">
          <Image
            src="/home/ima11.avif"
            alt="Learner portrait"
            fill
            quality={40}
            sizes={CARD_DESKTOP_IMAGE_SIZES}
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

interface FlagshipCardProps {
  card: (typeof cardsData)[0];
}

function FlagshipCard({ card }: FlagshipCardProps) {
  const scrollByAmount = 240;
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col w-full bg-[#E6F4EA] overflow-hidden h-full max-h-[90vh]">
      <div className="relative block h-32 w-full flex-shrink-0 overflow-hidden lg:hidden">
        <Image
          src="/home/ima11.avif"
          alt={`${card.title} visual`}
          fill
          className="w-full h-full object-cover"
          loading="lazy"
          quality={40}
          sizes={CARD_MOBILE_BANNER_SIZES}
        />
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-x-0 h-full"
      >
        <div className="lg:col-span-6 flex flex-col pt-3 sm:pt-[30px] px-3 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
                "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop",
              ].map((src, idx) => (
                <div key={idx} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white">
                  <Image src={src} alt="Creator" width={36} height={36} sizes="36px" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-[20px] sm:text-[28px] lg:text-[34px] leading-[1.1] font-normal text-[#1E8E3E] mb-1 font-fraunces">
            Become an influencer-
            <br />
            Content Creator Challenge
          </h2>

          <p className="text-[11px] sm:text-[13px] text-gray-500 leading-[1.5] sm:leading-[1.6] max-w-[46ch] mb-2 sm:mb-4">
            Learn marketing by building your own influencer brand. Create channels
            that run into thousands & even millions of followers.
          </p>

          <div className="overflow-hidden">
            <div className="h-[30px] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-700 uppercase tracking-wide">
                Flagship projects
              </span>
              <div className="flex items-center gap-1">
                <button onClick={scrollLeft} type="button" className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition" aria-label="Scroll left">←</button>
                <button onClick={scrollRight} type="button" className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition" aria-label="Scroll right">→</button>
              </div>
            </div>

            <div ref={sliderRef} className="flex overflow-x-auto scrollbar-hide h-[180px] sm:h-[200px] gap-1 items-stretch scroll-smooth">
              {card.programs?.map((p: { name: string; duration: string }) => (
                <div key={p.name} className="min-w-[140px] sm:min-w-[170px] h-full mr-1 bg-[#A2C1B9] px-3 sm:px-4 py-4 sm:py-5 flex flex-col justify-between">
                  <span className="text-[9px] bg-black text-white px-2 py-[2px] w-fit">PROGRAM</span>
                  <h3 className="mt-3 text-sm font-semibold text-black leading-snug">{p.name}</h3>
                  <p className="text-[11px] text-gray-600">{p.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right image column */}
        <div className="lg:col-span-6 hidden lg:block relative">
          <Image
            src="/home/ima11.avif"
            alt="Learner portrait"
            fill
            quality={40}
            sizes={CARD_DESKTOP_IMAGE_SIZES}
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

interface CardComponentProps {
  card: (typeof cardsData)[0];
  index: number;
  activeIndex: number;
  totalCards: number;
}

const CardComponent = memo(
  ({ card, index, activeIndex }: CardComponentProps) => {
    const currentCardIndex = Math.floor(activeIndex);
    const nextCardIndex = currentCardIndex + 1;
    const scrollProgress = activeIndex - currentCardIndex;
    const slideDistance = 800;

    const fadeThreshold = 0.4;
    const zoomOutAmount = 0.1;
    const fadeAmount = 0.2;

    const isCurrent = index === currentCardIndex;
    const isNext = index === nextCardIndex;
    const isVisible = isCurrent || isNext;

    let y = 0;
    let opacity = 1;
    let zIndex = 1000;
    let scale = 1;

    if (isCurrent) {
      y = 0;
      zIndex = 1010;

      if (scrollProgress > fadeThreshold) {
        const fadeProgress = (scrollProgress - fadeThreshold) / (1 - fadeThreshold);
        scale = 1 - fadeProgress * zoomOutAmount;
        opacity = 1 - fadeProgress * fadeAmount;
      } else {
        scale = 1;
        opacity = 1;
      }
    } else if (isNext) {
      y = slideDistance * (1 - scrollProgress);
      opacity = 1;
      zIndex = 1020;
      scale = 1;
    } else if (index > currentCardIndex) {
      y = slideDistance;
      opacity = 0;
      zIndex = 1000 - (index - currentCardIndex);
      scale = 1;
    } else {
      y = -8 * (currentCardIndex - index);
      opacity = 0;
      zIndex = 1000 - (currentCardIndex - index);
      scale = 1;
    }

    // Show all 4 borders only when the card is shrinking
    const isScaling = isCurrent && scale < 1;

    return (
      <article
        className={`absolute left-0 right-0 bottom-2 sm:bottom-4 md:bottom-6 top-2 sm:top-4 md:top-8 lg:top-10 mx-1 sm:mx-2 md:mx-4 lg:mx-auto bg-white text-black overflow-hidden masters-union-card-transition max-w-[85rem] transition-all duration-200 ${isScaling
          ? "border border-gray-200"
          : "border-t border-gray-200"
          }`}
        style={{
          transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
          opacity: isVisible ? opacity : 0,
          zIndex,
          pointerEvents: isCurrent ? "auto" : "none",
          willChange: "transform, opacity",
          transformOrigin: "center center",
        }}
        aria-labelledby={`card-title-${card.id}`}
      >
        <div className="h-full overflow-hidden overflow-y-auto">
          <CardLayout card={card} />
        </div>
      </article>
    );
  },
);

CardComponent.displayName = "CardComponent";

function Handson() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [metrics, setMetrics] = useState({ offsetTop: 0, height: 0, headerHeight: 0 });

  const lastProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const totalCards = cardsData.length;

  useEffect(() => setMounted(true), []);

  // BLOCK 1: MEASURE ONCE (and on resize via ResizeObserver)
  useEffect(() => {
    if (!mounted) return;

    const updateMetrics = () => {
      if (!scrollerRef.current) return;
      const rect = scrollerRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      setMetrics({
        offsetTop: absoluteTop,
        height: scrollerRef.current.offsetHeight,
        headerHeight: headerRef.current?.offsetHeight ?? 0,
      });
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });

    if (scrollerRef.current) resizeObserver.observe(scrollerRef.current);
    if (headerRef.current) resizeObserver.observe(headerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || metrics.height === 0) return;

    const handleScroll = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const winH = window.innerHeight;

        // 1. Calculate how far we have scrolled into THIS section
        // We use Math.max(0, ...) to ensure we don't start at a negative number
        const rectTop = metrics.offsetTop - window.scrollY;
        const headerHeight = scrollerRef.current
          ? scrollerRef.current.querySelector('.sticky')?.previousElementSibling?.clientHeight ?? 0
          : 0;
        const scrollTop = Math.max(0, -rectTop - metrics.headerHeight);
        const maxScroll = Math.max(1, metrics.height - winH - metrics.headerHeight);


        // 3. Calculate progress (0 to 1)
        const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

        // 4. Map to active index (0 to totalCards - 1)
        const smooth = progress * (totalCards - 1);

        if (Math.abs(smooth - lastProgress.current) > 0.001) {
          setActiveIndex(smooth);
          lastProgress.current = smooth;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize position

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [mounted, metrics, totalCards]);

  if (!mounted) {
    return (
      <section className="mx-[0%] text-black bg-white">
        <div
          className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen pt-8 sm:pt-12 md:pt-14"
          aria-labelledby="programs-heading"
        >
          <div className="relative w-full mx-auto">
            <div className="h-screen overflow-hidden">
              <div className="text-center lg:text-center mx-auto relative bg-white pb-2 sm:pb-3 ">
                <p className="text-xs sm:text-sm font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3" role="text">
                  EXPERIENTIAL EDUCATION
                </p>
                <h2 id="programs-heading" className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]">
                  <span className="bg-[#B30437] text-[#ffffff] px-1" style={{ fontWeight: 700 }}>
                    &apos;Global Carrululam&apos;
                  </span>
                  with Top MNC&apos;s
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-[0%] text-black bg-white">
      <div className="max-w-[85rem] mx-auto pt-12 sm:pt-16 md:pt-18" aria-labelledby="programs-heading">
        <div
          ref={scrollerRef}
          className="relative w-full mx-auto"
          style={{ height: `${totalCards * 120}vh` }}
          role="region"
          aria-label="Scroll through learning programs"
        >
          {/* Sticky Header */}
          <div ref={headerRef} className="text-center lg:text-center mx-auto relative bg-white ">
            <p className="text-xs sm:text-sm font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3" role="text">
              EXPERIENTIAL EDUCATION
            </p>

            <h2
              id="programs-heading"
              className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
            >
              Train with{" "}
              <HighlightText className="mx-2 font-bold">
                &apos;Global curriculum&apos;
              </HighlightText>
              {" "}along with{" "}
              MNC&apos;s
            </h2>


            <p className="text-base sm:text-lg text-[#5f6368]">
              Top roles, disruptive startups and industry-leading firms. See where our graduates landed and their career transformations.
            </p>
          </div>

          <div className="sticky top-0 h-dvh sm:h-screen overflow-hidden">
            {cardsData.map((card, index) => {
              const current = Math.floor(activeIndex);
              if (index < current - 1 || index > current + 1) return null;
              return (
                <CardComponent
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={totalCards}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Handson);
