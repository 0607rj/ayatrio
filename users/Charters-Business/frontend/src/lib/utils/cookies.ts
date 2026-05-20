"use client";

const COOKIE_NAME = "authToken";
const SECURE = typeof window !== "undefined" && window.location.protocol === "https:";

/*
 * Parse a single cookie by name safely.
 * Uses indexOf to handle base64/JWT values that contain '=' characters.
 */
export const getAuthToken = (): string | null => {
  if (typeof document === "undefined") return null;

  for (const cookie of document.cookie.split("; ")) {
    const eqIdx = cookie.indexOf("=");
    if (eqIdx === -1) continue;

    const name = cookie.slice(0, eqIdx);
    if (name === COOKIE_NAME) {
      return decodeURIComponent(cookie.slice(eqIdx + 1));
    }
  }

  return null;
};

/*
 * Set auth token cookie — 7 day expiry, Secure on HTTPS.
 */
export const setAuthToken = (token: string): void => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "path=/",
    `expires=${expires.toUTCString()}`,
    `SameSite=${SECURE ? "None" : "Lax"}`,
    ...(SECURE ? ["Secure"] : []),
  ];

  document.cookie = parts.join("; ");
};

/*
 * Remove auth token by expiring it.
 */
export const removeAuthToken = (): void => {
  if (typeof document === "undefined") return;

  const parts = [
    `${COOKIE_NAME}=`,
    "path=/",
    "expires=Thu, 01 Jan 1970 00:00:00 UTC",
    `SameSite=${SECURE ? "None" : "Lax"}`,
    ...(SECURE ? ["Secure"] : []),
  ];

  document.cookie = parts.join("; ");
};
