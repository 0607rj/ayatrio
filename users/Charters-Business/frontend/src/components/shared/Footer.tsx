"use client";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const Footer = () => {
  const footerSections = [

    {
      title: "Academics",
      links: [
        "CMP® Program",
        "Program Certified Product Engineering",
        "Certified Digital Growth Marketing",
      ],
    },
    {
      title: "Innovation",
      links: ["On-class internship", "Student Entrepreneurship", "Student research program"],
    },
    {
      title: "About us",
      links: [
        "For Companies",
        "Jobs",
        "Become A Master",
        "Events",
        "Blog",
        "Policies and Resources",
      ],
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: "/Charters-icon/social-icon/twitter.svg", href: "twitter" },
    { name: "Instagram", icon: "/Charters-icon/social-icon/instagram.svg", href: "instagram" },
    { name: "LinkedIn", icon: "/Charters-icon/social-icon/linkedln.svg", href: "linkedin" },
    { name: "YouTube", icon: "/Charters-icon/social-icon/youtube.svg", href: "youtube" },
  ];

  return (
    <footer
      className="relative z-[5] bg-[#222222] pt-[50px] text-black"
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Level Container */}
        <div className="flex flex-col lg:flex-row justify-between gap-9">
          {/* Logo Section  */}
          <div className="flex-shrink-0 w-full lg:w-auto mb-6 lg:mb-0">
            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <Image
                src={
                  "https://res.cloudinary.com/ducgcl4dg/image/upload/charters-business/Chaters_Union.webp"
                }
                alt="Chaters' Union - Business Education Excellence"
                width={120}
                height={60}
                className="h-10 sm:h-12 w-auto"
              />
              {/* https://res.cloudinary.com/ducgcl4dg/image/upload/charters-business/Chaters_Union.png
                  https://res.cloudinary.com/ducgcl4dg/image/upload/Chaters_Union
              */}
            </div>
            <p className="text-sm text-white leading-relaxed max-w-xs">
              Empowering the next generation of{" "}business leaders through innovative education.
            </p>
          </div>

          {/* Navigation Sections Wrapper */}
          <div className=" flex-col lg:flex-row lg:gap-9">
            {/* Navigation Sections Container */}
            <div className="flex flex-wrap justify-between lg:justify-start gap-6 lg:gap-9 w-full lg:w-auto">
              {footerSections.map((section, index) => (
                <nav
                  key={index}
                  className="min-w-[140px] lg:min-w-[160px] flex-shrink-0 mb-6 lg:mb-0"
                  aria-labelledby={`footer-nav-${index}`}
                >
                  <h2
                    id={`footer-nav-${index}`}
                    className="text-white font-semibold text-base sm:text-[16px] mb-4 lg:mb-6"
                  >
                    {section.title}
                  </h2>
                  <ul className="space-y-2 lg:space-y-3" role="list">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} role="listitem">
                        <a
                          href="#"
                          className="text-white hover:text-[#B30437] transition-colors text-sm block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Logos and Contact Section */}
        <address className="mt-8 sm:mt-12 lg:mt-16 pt-6 lg:pt-8 not-italic">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
            {/* Partner Logos */}
            <section aria-labelledby="partners-heading">
              <h3 id="partners-heading" className="sr-only">
                Our Accreditation Partners
              </h3>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
                {/* EFMD Logo */}
                <div className="flex items-center">
                  <Image
                    src={getCloudinaryUrl(
                      "charters-business/images/brands/EFMD-Global-H-Pantone-3-e1684843405296",
                      { width: 240, quality: "auto", format: "auto" },
                    )}
                    alt="EFMD Global - Educational accreditation and quality assurance partner"
                    width={120}
                    height={60}
                    className="h-8 sm:h-10 lg:h-12 w-auto"
                  />
                </div>

                {/* BSIS Logo */}
                <div className="flex items-center">
                  <Image
                    src={getCloudinaryUrl(
                      "charters-business/images/brands/BSIS-Partners-Pantone-1024x462",
                      { width: 240, quality: "auto", format: "auto" },
                    )}
                    alt="BSIS Partners - Business education certification and standards"
                    width={120}
                    height={60}
                    className="h-8 sm:h-10 lg:h-12 w-auto"
                  />
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section
              className="space-y-2 text-left lg:text-right"
              aria-labelledby="contact-heading"
            >
              <h3 id="contact-heading" className="sr-only">
                Contact Information
              </h3>
              <div className="flex items-start lg:items-center gap-2 text-white text-xs sm:text-sm justify-start lg:justify-end">
                <div className="relative w-4 h-4 flex-shrink-0 mt-0.5 lg:mt-0">
                  <Image
                    src="/Charters-icon/location-pin-svgrepo-com.svg"
                    alt="location"
                    fill
                    className="object-contain invert text-2xl"
                  />
                </div>
                <span className="leading-relaxed">
                  DLF Cyberpark, Sector V, Bidhannagar, Kolkata, West Bengal 700091
                </span>
              </div>
              <div className="flex items-center gap-2 text-white text-xs sm:text-sm justify-start lg:justify-end">
                <div className="relative w-4 h-4 flex-shrink-0">
                  <Image
                    src="/Charters-icon/email-1-svgrepo-com.svg"
                    alt="email"
                    fill
                    className="object-contain invert"
                  />
                </div>
                <a
                  href="mailto:info@mastersunion.org"
                  className="hover:text-[#B30437] transition-colors"
                >
                  info@chartersunion.com
                </a>
              </div>
            </section>
          </div>
        </address>
      </div>

      {/* Bottom Bar */}
      <div>
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mx-auto py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
            <div
              className="text-gray-600 text-xs sm:text-sm order-2 lg:order-1"
              role="text"
            >
              Copyright © 2025{" "}
              <span className="text-[#B30437] font-medium">
                Charters' Union
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 lg:order-2">
              <nav
                className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm"
                aria-label="Legal and policy links"
              >
                <a
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-[#B30437] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-and-conditions"
                  className="text-gray-600 hover:text-[#B30437] transition-colors"
                >
                  Terms & Conditions
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#B30437] transition-colors"
                >
                  Cookie Policy
                </a>
              </nav>

              <nav
                className="flex items-center gap-2 sm:gap-3"
                aria-label="Social media links"
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 hover:bg-[#B30437] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label={`Follow us on ${social.name}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="relative w-4 h-4">
                      <Image
                        src={social.icon}
                        alt={social.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
