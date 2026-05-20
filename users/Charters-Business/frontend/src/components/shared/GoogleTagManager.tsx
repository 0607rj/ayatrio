"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsentChoice } from "@/lib/Tracking";

const GTM_ID = "GTM-KJ2D3MLL";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __gtmInitialized?: boolean;
  }
}

function initializeDataLayer() {
  if (typeof window === "undefined" || window.__gtmInitialized) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });
  window.__gtmInitialized = true;
}

export default function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (getConsentChoice() === "accepted") {
      setEnabled(true);
    }

    const enableTracking = () => setEnabled(true);

    window.addEventListener("consent:accepted", enableTracking);

    return () => {
      window.removeEventListener("consent:accepted", enableTracking);
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      initializeDataLayer();
    }
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <Script
      id="gtm-script"
      src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      strategy="afterInteractive"
    />
  );
}
