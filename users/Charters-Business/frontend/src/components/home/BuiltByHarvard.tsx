
import { memo } from "react";
import Image from "next/image";
import { getCloudinaryUrl, CLOUDINARY_IMAGES } from "@/lib/cloudinary";
import HighlightText from "@/components/shared/HighlightObserver";

interface University {
  name: string;
  logoKey: keyof typeof CLOUDINARY_IMAGES.universities;
}

const universities: University[] = [
  { name: "Tecnológico de Monterrey", logoKey: "tecDeMonterrey" },
  { name: "University of Michigan", logoKey: "michigan" },
  { name: "Imperial College London", logoKey: "imperial" },
  { name: "The University of Melbourne", logoKey: "melbourne" },
  { name: "Manipal", logoKey: "manipal" },
  { name: "NMIMS", logoKey: "nmims" },
];

function BuiltByHarvard() {
  return (
    <section
      className="relative text-black py-8 sm:py-10 mt-[70px] md:py-16 mb-16"
      role="region"
      aria-labelledby="trusted-companies-heading"
    >
      {/* Full-width background */}
      <div
        className="absolute inset-0 bg-[#F4F2EE] -z-10"
        style={{
          width: "100vw",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h2
          id="trusted-companies-heading"
          className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
        >
          The most{" "}
          <HighlightText className="mx-2 font-bold">
            innovative
          </HighlightText>{" "}
          institution
        </h2>

        <p className="text-[#5f6368] text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed px-4">
          Global leaders partner with Hardvard to drive workforce transformation
          and unlock their organization's full potential through cutting-edge
          tech skills.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white p-2 sm:p-4 md:p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Section */}
          <div className="lg:pb-2">
            <h3 className="text-lg sm:text-[16px] md:text-[18px] font-semibold text-black mb-2 sm:mb-4 text-center">
              Built by alumni from{" "}
            </h3>


            <div className="w-full h-32 sm:h-38 border-r border-[#D5D0CA] relative group">
              <Image
                src="/home/charters alumni from.avif"
                alt="Built by alumni"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:pl-6">
            <h3 className="text-lg sm:text-[16px] md:text-[18px] font-semibold text-black mb-2 sm:mb-4 text-center">
              Curriculum design base on
            </h3>

            <div className="w-full h-32 sm:h-38 relative group">
              <Image
                src="/home/curriculum design base on.avif"
                alt="companies"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(BuiltByHarvard);