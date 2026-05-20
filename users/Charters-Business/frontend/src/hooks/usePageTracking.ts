"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { clearTrackingData, trackPage } from "@/lib/Tracking";

export default function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    trackPage(pathname);
  }, [pathname]);

  useEffect(() => {
    const onAccept = () => trackPage(pathname);
    const onNecessary = () => clearTrackingData();
    const onReject = () => clearTrackingData();

    window.addEventListener("consent:accepted", onAccept);
    window.addEventListener("consent:necessary", onNecessary);
    window.addEventListener("consent:rejected", onReject);

    return () => {
      window.removeEventListener("consent:accepted", onAccept);
      window.removeEventListener("consent:necessary", onNecessary);
      window.removeEventListener("consent:rejected", onReject);
    };
  }, [pathname]);
}
