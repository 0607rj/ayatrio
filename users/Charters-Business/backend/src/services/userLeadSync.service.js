import User from '../models/User.model.js';
import { computeViewerScore } from './viewerScore.service.js';

function toPlainObject(value) {
  if (!value) {
    return {};
  }

  return typeof value.toObject === 'function' ? value.toObject() : { ...value };
}

function toNonNegativeNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? num : 0;
}

function toTitleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizePathname(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  const withoutHash = trimmed.split('#')[0];
  const withoutQuery = withoutHash.split('?')[0];

  if (!withoutQuery) {
    return '';
  }

  if (withoutQuery === '/') {
    return '/';
  }

  return withoutQuery.startsWith('/')
    ? withoutQuery.replace(/\/+$/, '') || '/'
    : `/${withoutQuery.replace(/^\/+/, '').replace(/\/+$/, '')}`;
}

function derivePageTitleFromPath(pathname) {
  const normalizedPath = normalizePathname(pathname);

  if (!normalizedPath || normalizedPath === '/') {
    return 'Home';
  }

  return normalizedPath
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      toTitleCase(segment.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim())
    )
    .filter(Boolean)
    .join(' / ');
}

function normalizePageTitle(value, fallbackPath = '') {
  if (typeof value !== 'string') {
    return derivePageTitleFromPath(fallbackPath);
  }

  const trimmed = value
    .replace(/\s*\|\s*Charters Business\s*$/i, '')
    .replace(/\s*\|\s*Charters Union\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  return trimmed || derivePageTitleFromPath(fallbackPath);
}

function normalizeStoredStringList(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return Array.from(
    new Set(
      values
        .filter((value) => typeof value === 'string')
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
}

function normalizeUniquePages(uniquePages, existingMetrics = {}) {
  const currentPaths = normalizeStoredStringList(existingMetrics.uniquePagePaths);
  const currentTitles = normalizeStoredStringList(existingMetrics.uniquePageTitles);
  const trackedPages = [];
  const seenKeys = new Set();

  currentPaths.forEach((path, index) => {
    const title = normalizePageTitle(currentTitles[index], path);
    const key = path || title;

    if (!key || seenKeys.has(key)) {
      return;
    }

    seenKeys.add(key);
    trackedPages.push({ path, title });
  });

  currentTitles.forEach((title) => {
    const normalizedTitle = normalizePageTitle(title);

    if (!normalizedTitle || seenKeys.has(normalizedTitle)) {
      return;
    }

    seenKeys.add(normalizedTitle);
    trackedPages.push({ path: '', title: normalizedTitle });
  });

  if (!Array.isArray(uniquePages)) {
    return trackedPages;
  }

  uniquePages.forEach((page) => {
    let path = '';
    let title = '';

    if (typeof page === 'string') {
      path = normalizePathname(page);
      title = normalizePageTitle('', path);
    } else if (page && typeof page === 'object') {
      path = normalizePathname(
        page.path || page.pathname || page.url || page.href || ''
      );
      title = normalizePageTitle(page.title || page.name || '', path);
    }

    const key = path || title;

    if (!key || seenKeys.has(key)) {
      return;
    }

    seenKeys.add(key);
    trackedPages.push({ path, title });
  });

  return trackedPages;
}

export function normalizePhoneNumber(countryCode, mobileNo) {
  const localNumber = String(mobileNo || '').replace(/\D/g, '');
  if (!localNumber) {
    return null;
  }

  const cleanedCountryCode = String(countryCode || '+91').replace(/[^\d]/g, '');

  if (!cleanedCountryCode) {
    return `+${localNumber}`;
  }

  return `+${cleanedCountryCode}${localNumber}`;
}

function buildTrackingUpdate(existingMetrics, trackingData, loggedIn) {
  if (!trackingData || typeof trackingData !== 'object') {
    return null;
  }

  const currentMetrics = toPlainObject(existingMetrics);
  const uniquePages = normalizeUniquePages(trackingData.uniquePages, currentMetrics);
  const uniquePagePaths = uniquePages.map((page) => page.path).filter(Boolean);
  const uniquePageTitles = uniquePages.map((page) => page.title).filter(Boolean);

  const visitCount = Math.max(
    toNonNegativeNumber(currentMetrics.visitCount),
    toNonNegativeNumber(trackingData.pageViewsTotal)
  );
  const pagesNavigated = Math.max(
    toNonNegativeNumber(currentMetrics.pagesNavigated),
    uniquePagePaths.length,
    uniquePageTitles.length
  );
  const chatInteractions = Math.max(
    toNonNegativeNumber(currentMetrics.chatInteractions),
    toNonNegativeNumber(trackingData.chatInteractions)
  );
  const mergedLoggedIn = Boolean(currentMetrics.loggedIn || loggedIn);
  const deviceId = trackingData.deviceId || currentMetrics.deviceId || null;
  const sessionId = trackingData.sessionId || currentMetrics.sessionId || null;

  const hasTrackingSignal =
    visitCount > 0 ||
    pagesNavigated > 0 ||
    uniquePagePaths.length > 0 ||
    uniquePageTitles.length > 0 ||
    chatInteractions > 0 ||
    mergedLoggedIn ||
    Boolean(deviceId) ||
    Boolean(sessionId);

  if (!hasTrackingSignal) {
    return null;
  }

  return {
    viewerMetrics: {
      visitCount,
      pagesNavigated,
      uniquePagePaths,
      uniquePageTitles,
      chatInteractions,
      loggedIn: mergedLoggedIn,
      deviceId,
      sessionId,
      lastMergedAt: new Date(),
    },
    viewerScore: computeViewerScore({
      visitCount,
      loggedIn: mergedLoggedIn,
      pagesNavigated,
      chatInteractions,
    }),
  };
}

export async function syncLeadFieldsOnUser(
  user,
  { program, countryCode, mobileNo, trackingData, loggedIn = false } = {}
) {
  if (!user) {
    return null;
  }

  let hasChanges = false;

  const trimmedProgram = typeof program === 'string' ? program.trim() : '';
  if (trimmedProgram && user.courseInterestedIn !== trimmedProgram) {
    user.courseInterestedIn = trimmedProgram;
    hasChanges = true;
  }

  const normalizedPhoneNumber = normalizePhoneNumber(countryCode, mobileNo);
  if (normalizedPhoneNumber && user.phoneNumber !== normalizedPhoneNumber) {
    const conflictingUser = await User.findOne({
      phoneNumber: normalizedPhoneNumber,
      _id: { $ne: user._id },
    })
      .select('_id')
      .lean();

    if (!conflictingUser) {
      user.phoneNumber = normalizedPhoneNumber;
      hasChanges = true;
    }
  }

  const trackingUpdate = buildTrackingUpdate(
    user.viewerMetrics,
    trackingData,
    loggedIn
  );

  if (trackingUpdate) {
    const currentMetrics = toPlainObject(user.viewerMetrics);
    const nextMetrics = {
      ...currentMetrics,
      ...trackingUpdate.viewerMetrics,
    };

    if (JSON.stringify(currentMetrics) !== JSON.stringify(nextMetrics)) {
      user.viewerMetrics = nextMetrics;
      hasChanges = true;
    }

    if (user.viewerScore !== trackingUpdate.viewerScore) {
      user.viewerScore = trackingUpdate.viewerScore;
      hasChanges = true;
    }
  }

  if (hasChanges) {
    await user.save();
  }

  return user;
}
