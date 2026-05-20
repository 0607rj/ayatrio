import { v4 as uuidv4 } from "uuid";

export const CONSENT_KEY = "cookie_consent_v1";
const DEVICE_KEY = "device_id_v1";
const SESSION_KEY = "anon_session_v1";

export type ConsentChoice = "accepted" | "necessary" | "rejected";

export type TrackedPage = {
  path: string;
  title: string;
};

export type AnonSession = {
  sessionId: string;
  deviceId: string;
  pageViewsTotal: number;
  uniquePages: TrackedPage[];
  chatInteractions: number;
  startedAt: number;
  lastSeenAt: number;
};

export type TrackingSnapshot = AnonSession;

export function getConsentChoice(): ConsentChoice | null {
  const storedConsent = localStorage.getItem(CONSENT_KEY);

  if (
    storedConsent === "accepted" ||
    storedConsent === "necessary" ||
    storedConsent === "rejected"
  ) {
    return storedConsent;
  }

  return null;
}

export function setConsentChoice(choice: ConsentChoice) {
  localStorage.setItem(CONSENT_KEY, choice);
}

export function hasTrackingConsent(): boolean {
  return getConsentChoice() === "accepted";
}

function getOrCreateDeviceId(): string {
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export function clearAnonSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function clearTrackingData() {
  clearAnonSession();
  localStorage.removeItem(DEVICE_KEY);
}

function toTitleCase(value: string): string {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizePathname(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const withoutHash = trimmed.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];

  if (!withoutQuery) {
    return "";
  }

  if (withoutQuery === "/") {
    return "/";
  }

  return withoutQuery.startsWith("/")
    ? withoutQuery.replace(/\/+$/, "") || "/"
    : `/${withoutQuery.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function derivePageTitleFromPath(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);

  if (!normalizedPath || normalizedPath === "/") {
    return "Home";
  }

  return normalizedPath
    .split("/")
    .filter(Boolean)
    .map((segment) =>
      toTitleCase(segment.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim()),
    )
    .filter(Boolean)
    .join(" / ");
}

function normalizePageTitle(title: string | undefined, pathname: string): string {
  const trimmed = (title || "")
    .replace(/\s*\|\s*Charters Business\s*$/i, "")
    .replace(/\s*\|\s*Charters Union\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  return trimmed || derivePageTitleFromPath(pathname);
}

function normalizeTrackedPages(value: unknown): TrackedPage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const seenKeys = new Set<string>();
  const pages: TrackedPage[] = [];

  value.forEach((page) => {
    let path = "";
    let title = "";

    if (typeof page === "string") {
      path = normalizePathname(page);
      title = normalizePageTitle("", path);
    } else if (page && typeof page === "object") {
      const candidate = page as {
        path?: string;
        pathname?: string;
        url?: string;
        href?: string;
        title?: string;
        name?: string;
      };

      path = normalizePathname(
        candidate.path ||
          candidate.pathname ||
          candidate.url ||
          candidate.href ||
          "",
      );
      title = normalizePageTitle(candidate.title || candidate.name, path);
    }

    const key = path || title;

    if (!key || seenKeys.has(key)) {
      return;
    }

    seenKeys.add(key);
    pages.push({ path, title });
  });

  return pages;
}

function getStoredAnonSession(): AnonSession | null {
  const raw = localStorage.getItem(SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AnonSession>;

    if (!parsed.sessionId || !parsed.deviceId) {
      clearAnonSession();
      return null;
    }

    return {
      sessionId: parsed.sessionId,
      deviceId: parsed.deviceId,
      pageViewsTotal:
        typeof parsed.pageViewsTotal === "number" && parsed.pageViewsTotal > 0
          ? parsed.pageViewsTotal
          : 0,
      uniquePages: normalizeTrackedPages(parsed.uniquePages),
      chatInteractions:
        typeof parsed.chatInteractions === "number" && parsed.chatInteractions > 0
          ? parsed.chatInteractions
          : 0,
      startedAt:
        typeof parsed.startedAt === "number" ? parsed.startedAt : Date.now(),
      lastSeenAt:
        typeof parsed.lastSeenAt === "number" ? parsed.lastSeenAt : Date.now(),
    };
  } catch {
    clearAnonSession();
    return null;
  }
}

export function getTrackingSnapshot(): TrackingSnapshot | null {
  const session = getStoredAnonSession();

  if (!session) {
    return null;
  }

  return {
    ...session,
    uniquePages: session.uniquePages.map((page) => ({ ...page })),
  };
}

export function getOrCreateAnonSession(): AnonSession | null {
  if (!hasTrackingConsent()) return null;

  const deviceId = getOrCreateDeviceId();
  const existingSession = getStoredAnonSession();

  if (existingSession) {
    return existingSession;
  }

  const fresh: AnonSession = {
    sessionId: uuidv4(),
    deviceId,
    pageViewsTotal: 0,
    uniquePages: [],
    chatInteractions: 0,
    startedAt: Date.now(),
    lastSeenAt: Date.now(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(fresh));
  return fresh;
}

function save(session: AnonSession) {
  session.lastSeenAt = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function trackPage(pathname: string, title?: string) {
  const session = getOrCreateAnonSession();
  if (!session) return;

  const normalizedPath = normalizePathname(pathname);
  const normalizedTitle = normalizePageTitle(
    title || (typeof document !== "undefined" ? document.title : ""),
    normalizedPath,
  );

  session.pageViewsTotal += 1;
  if (!session.uniquePages.some((page) => page.path === normalizedPath)) {
    session.uniquePages.push({
      path: normalizedPath,
      title: normalizedTitle,
    });
  }
  save(session);
}

export function trackChatInteraction() {
  const session = getOrCreateAnonSession();
  if (!session) return;

  session.chatInteractions += 1;
  save(session);
}

/*
 Call this after the user is logged in successfully.
 It sends the anon session to backend and clears local data.
 */
export async function flushTrackingToBackend(apiBaseUrl: string, authToken: string) {
  const payload = getStoredAnonSession();
  if (!payload) return;

  await fetch(`${apiBaseUrl}/api/v1/users/merge-tracking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });

  clearAnonSession();
}

export async function sendHeartbeat(apiBaseUrl: string) {
  const session = getOrCreateAnonSession();

  if (!session) {
    return;
  }

  await fetch(`${apiBaseUrl}/api/v1/users/heartbeat`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId: session.sessionId,
      deviceId: session.deviceId,
    }),
  });
}

export async function clearHeartbeatSession(apiBaseUrl: string) {
  const session = getStoredAnonSession();

  if (!session?.sessionId) {
    clearTrackingData();
    return;
  }

  try {
    await fetch(`${apiBaseUrl}/api/v1/users/heartbeat/clear`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: session.sessionId,
      }),
    });
  } finally {
    clearTrackingData();
  }
}
