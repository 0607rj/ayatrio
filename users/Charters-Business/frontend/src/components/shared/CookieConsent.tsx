"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { CONSENT_KEY, setConsentChoice } from "@/lib/Tracking";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setShow(true);
  }, []);

  const acceptAll = useCallback(() => {
    setConsentChoice("accepted");
    setShow(false);
    window.dispatchEvent(new Event("consent:accepted"));
  }, []);

  const onlyNecessary = useCallback(() => {
    setConsentChoice("necessary");
    setShow(false);
    window.dispatchEvent(new Event("consent:necessary"));
  }, []);

  const closeBanner = useCallback(() => {
    setConsentChoice("necessary");
    setShow(false);
    window.dispatchEvent(new Event("consent:necessary"));
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className="fixed z-[9999] left-8 bottom-8 w-[360px] sm:w-[400px] bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-sm p-6"
    >
      <button
        type="button"
        onClick={closeBanner}
        aria-label="Close cookie banner"
        className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
      >
        x
      </button>

      <h3 id="cookie-title" className="pr-10 text-[15px] font-semibold text-gray-900 tracking-tight">
        We respect your Privacy
      </h3>

      <p className="mt-3 text-[13.5px] leading-[1.65] text-gray-600">
        We use cookies to improve your experience on our website. By clicking
        &ldquo;Accept all cookies&rdquo;, you consent to the use of cookies to
        enhance site navigation, analyze site usage, and support our services,
        as outlined in our{" "}
        <Link href="/privacy-policy" className="underline text-black font-medium">
          Privacy Policy
        </Link>.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          onClick={acceptAll}
          className="w-full bg-[#0339F8] text-white px-5 py-2.5 text-[13.5px] font-medium rounded-sm hover:bg-[#022fcc] transition"
        >
          Accept all cookies
        </button>

        <button
          type="button"
          onClick={onlyNecessary}
          className="w-full border border-gray-300 px-4 py-2.5 text-[13px] font-medium rounded-sm hover:bg-gray-50 transition"
        >
          Only necessary
        </button>
      </div>
    </div>
  );
}
