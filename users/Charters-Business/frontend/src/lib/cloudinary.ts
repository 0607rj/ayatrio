// Cloudinary configuration and utility functions
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUDINARY_CLOUD_NAME) {
  console.warn(
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Cloudinary features will not work.",
  );
}

/**
 * Generate Cloudinary URL with optimizations
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low";
    format?: "auto" | "webp" | "avif" | "jpg" | "png";
    crop?: "fill" | "fit" | "scale" | "crop" | "thumb";
    gravity?: "auto" | "face" | "center" | "north" | "south" | "east" | "west";
    blur?: number;
    effect?: string;
  } = {},
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    // Fallback to local images if Cloudinary is not configured
    return publicId.startsWith("/") ? publicId : `/${publicId}`;
  }

  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
    gravity = "auto",
    blur,
    effect,
  } = options;

  const transformations: string[] = [];

  // Add quality
  transformations.push(`q_${quality}`);

  // Add format
  transformations.push(`f_${format}`);

  // Add dimensions and crop
  if (width || height) {
    const dims: string[] = [`c_${crop}`];
    if (width) dims.push(`w_${width}`);
    if (height) dims.push(`h_${height}`);
    if (gravity) dims.push(`g_${gravity}`);
    transformations.push(dims.join(","));
  }

  // Add blur
  if (blur) {
    transformations.push(`e_blur:${blur}`);
  }

  // Add custom effect
  if (effect) {
    transformations.push(`e_${effect}`);
  }

  const transformString = transformations.join("/");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${publicId}`;
}
/**
 * Generate responsive srcSet for Cloudinary images
 * @param publicId - The public ID of the image in Cloudinary
 * @param widths - Array of widths for responsive images
 * @returns srcSet string
 */
export function getCloudinarySrcSet(
  publicId: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920],
  options: {
    quality?: number | "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low";
    format?: "auto" | "webp" | "avif" | "jpg" | "png";
  } = {},
): string {
  return widths
    .map((width) => {
      const url = getCloudinaryUrl(publicId, {
        width,
        quality: options.quality ?? "auto",
        format: options.format ?? "auto",
      });
      return `${url} ${width}w`;
    })
    .join(", ");
}

/**
 * Generate blur placeholder for Cloudinary images
 * @param publicId - The public ID of the image in Cloudinary
 * @returns Blur placeholder URL
 */
export function getCloudinaryBlurUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 10,
    quality: 1,
    blur: 1000,
    format: "auto",
  });
}

/**
 * Cloudinary image paths mapping
 * Maps local image paths to Cloudinary public IDs
 */
export const CLOUDINARY_IMAGES = {
  // Background images
  background: {
    hero: "charters-business/background",
    heroMobile: "charters-business/Background-M",
  },

  // Brand logos
  brands: {
    hsbc: "charters-business/brands/HSBC_Logo_2018",
    bsis: "charters-business/brands/BSIS-Partners-Pantone-1024x462",
    efmd: "charters-business/brands/EFMD-Global-H-Pantone-3-e1684843405296",
    gianis: "charters-business/brands/gianis",
    khanchacha: "charters-business/brands/khanchacha",
    revlon: "charters-business/brands/revlon",
    subway: "charters-business/brands/subway",
  },

  // Faculty images
  faculty: {
    lanMa: "charters-business/faculty/LanMa",
    photo: "charters-business/faculty/Photo",
    arjunVaidya: "charters-business/faculty/arjunVaidya",
    captainRaghu: "charters-business/faculty/captainRaghu",
    danielGarett: "charters-business/faculty/danielGarett",
    garimaChaklader: "charters-business/faculty/garimaChaklader",
    kashikaSud: "charters-business/faculty/kashikaSud",
    manojKohli: "charters-business/faculty/manojKohli",
    nandiniSeth: "charters-business/faculty/nandiniSeth",
    naveenMunjal: "charters-business/faculty/naveenMunjal",
    rajatBaijal: "charters-business/faculty/rajatBaijal",
    rajatMathur: "charters-business/faculty/rajatMathur",
    shadMorris: "charters-business/faculty/shadMorris",
    vipin: "charters-business/faculty/vipin",
    zalPhiroz: "charters-business/faculty/zalPhiroz",
  },

  // Student testimonials
  students: {
    anurag: "charters-business/students/userAnurag",
    chadraye: "charters-business/students/userChadraye",
    sahil: "charters-business/students/userSahil",
    sunakshi: "charters-business/students/userSunakshi",
    yash: "charters-business/students/userYash",
  },

  // Programme images
  programmes: {
    diploma: "charters-business/programmes/diploma",
    executive: "charters-business/programmes/executive",
    indus: "charters-business/programmes/indus",
    mba: "charters-business/programmes/mba",
    pgdm: "charters-business/programmes/pgdm",
    dsc09198: "charters-business/programmes/DSC09198",
    p10714292: "charters-business/programmes/P10714292",
  },

  // News slider
  news: {
    news1: "charters-business/newsslider/news1",
    news2: "charters-business/newsslider/news2",
    news3: "charters-business/newsslider/news3",
    news4: "charters-business/newsslider/news4",
    news5: "charters-business/newsslider/news5",
    news6: "charters-business/newsslider/news6",
    news7: "charters-business/newsslider/news7",
  },

  // Curriculum section
  curriculum: {
    argentina: "charters-business/curriculumsection/argentina",
    dubai: "charters-business/curriculumsection/dubaicurriculum",
    europe: "charters-business/curriculumsection/europe",
    ghana: "charters-business/curriculumsection/ghana",
    india: "charters-business/curriculumsection/indiacurriculum",
    internship: "charters-business/curriculumsection/internship",
    us: "charters-business/curriculumsection/us",
  },

  // Tetr programme images
  tetr: {
    ghanaNew: "charters-business/tetr/7ghanaNew",
    fmcgBrand: "charters-business/tetr/FMCGBrandNew",
    greenArgentina: "charters-business/tetr/GreenArgentinaNew",
    techUS: "charters-business/tetr/TechUSNew",
    arFootball: "charters-business/tetr/arFootball",
    arGrobo: "charters-business/tetr/arGrobo",
  },

  // Apply section
  apply: {
    businessLearning: "charters-business/apply/business-learning",
  },

  // Home section
  home: {
    intern: "charters-business/home/intern",
  },

  // Misc
  misc: {
    chartersUnion: "charters-business/images/Chaters_Union",
    customerService: "charters-business/customer-service",
    businessStrategy: "charters-business/business-strategy",
  },

  // University logos for BuiltByHarvard
  universities: {
    tecDeMonterrey: "Tec-de-Monterrey-logo-horizontal-blue_nvbdev",
    michigan: "University-of-Michigan-Logo_ngv6gv",
    imperial: "Imperial_College_London_crest.svg_u92ouo",
    melbourne: "UoM_Logo_Vert_Housed_RGB-1_jesmgx",
    manipal: "Manipal_University_logo_ob0143",
    nmims: "Narsee_Monjee_Institute_of_Management_Studies_Logo_gg7ehs",
  },
} as const;

/**
 * Helper to get image URL from the mapping
 * @param category - Image category
 * @param name - Image name
 * @param options - Transformation options
 * @returns Cloudinary URL
 */
export function getImageUrl(
  category: keyof typeof CLOUDINARY_IMAGES,
  name: string,
  options?: Parameters<typeof getCloudinaryUrl>[1],
): string {
  const images = CLOUDINARY_IMAGES[category] as Record<string, string>;
  const publicId = images[name];

  if (!publicId) {
    console.warn(`Image not found: ${category}.${name}`);
    return "";
  }

  return getCloudinaryUrl(publicId, options);
}
