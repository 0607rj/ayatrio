"use client";

import Image from "next/image";
import { useState } from "react";
import { getCloudinaryUrl, getCloudinaryBlurUrl } from "@/lib/cloudinary";

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number | "auto";
  crop?: "fill" | "fit" | "scale" | "crop" | "thumb";
  gravity?: "auto" | "face" | "center" | "north" | "south" | "east" | "west";
  sizes?: string;
}

/**
 * CloudinaryImage component with automatic optimization
 * Supports responsive images, blur placeholders, and lazy loading
 */
export default function CloudinaryImage({
  publicId,
  alt,
  className = "",
  fill,
  width,
  height,
  priority = false,
  quality = "auto",
  crop = "fill",
  gravity = "auto",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: CloudinaryImageProps) {
  const [isLoading, setLoading] = useState(true);

  const imageUrl = getCloudinaryUrl(publicId, {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    quality,
    format: "auto",
    crop,
    gravity,
  });

  const blurDataURL = getCloudinaryBlurUrl(publicId);

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={`${className} ${
        isLoading ? "blur-sm" : "blur-0"
      } transition-all duration-300`}
      fill={fill}
      width={width}
      height={height}
      sizes={fill ? sizes : undefined}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onLoad={() => setLoading(false)}

      // Cloudinary already optimizes images
      unoptimized
    />
  );
}
