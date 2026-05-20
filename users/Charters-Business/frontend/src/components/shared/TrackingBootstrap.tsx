"use client";

import { useEffect } from "react";
import usePageTracking from "@/hooks/usePageTracking";
import {
  clearHeartbeatSession,
  clearAnonSession,
  hasTrackingConsent,
  sendHeartbeat,
} from "@/lib/Tracking";

export default function TrackingBootstrap() {
  usePageTracking();

  useEffect(() => {
    const api = "/api/backend";

    const syncHeartbeat = async () => {
      try {
        await sendHeartbeat(api);
      } catch {
        console.log("heartbeat failed");
      }
    };

    const handleConsentDisabled = async () => {
      try {
        await clearHeartbeatSession(api);
      } catch {
        console.log("heartbeat clear failed");
      }
    };

    // Clear anonymous session storage when a guest closes the tab.
    const handleUnload = () => {
      const isLoggedIn =
        document.cookie.includes("connect.sid") ||
        Boolean(localStorage.getItem("token"));

      if (!isLoggedIn) {
        clearAnonSession();
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("consent:accepted", syncHeartbeat);
    window.addEventListener("consent:necessary", handleConsentDisabled);
    window.addEventListener("consent:rejected", handleConsentDisabled);

    if (hasTrackingConsent()) {
      void syncHeartbeat();
    }

    const interval = setInterval(() => {
      void syncHeartbeat();
    }, 15000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("consent:accepted", syncHeartbeat);
      window.removeEventListener("consent:necessary", handleConsentDisabled);
      window.removeEventListener("consent:rejected", handleConsentDisabled);
    };
  }, []);

  return null;
}
