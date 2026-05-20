import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.model.js';

const SERVICE_HEADER = 'x-service-key';
const SERVICE_KEY_ID_HEADER = 'x-service-key-id';
const ACTING_ADMIN_TOKEN_HEADER = 'x-acting-admin-token';
const ALLOWED_ROLES = new Set(['admin', 'recruiter']);

function parseCsvValues(value) {
  return String(value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getAllowedIps() {
  return new Set(parseCsvValues(process.env.INTERNAL_ALLOWED_IPS));
}

function parseServiceKeyRingFromJson(value) {
  const raw = String(value || '').trim();
  if (!raw) return new Map();

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return new Map();
    }

    const ring = new Map();
    for (const [keyId, keyValue] of Object.entries(parsed)) {
      const normalizedKeyId = String(keyId || '').trim();
      const normalizedKeyValue = String(keyValue || '').trim();
      if (normalizedKeyId && normalizedKeyValue) {
        ring.set(normalizedKeyId, normalizedKeyValue);
      }
    }

    return ring;
  } catch (error) {
    return new Map();
  }
}

function parseServiceKeyRingFromCsv(value) {
  const ring = new Map();
  for (const entry of parseCsvValues(value)) {
    const delimiterIndex = entry.indexOf(':');
    if (delimiterIndex <= 0) continue;

    const keyId = entry.slice(0, delimiterIndex).trim();
    const keyValue = entry.slice(delimiterIndex + 1).trim();
    if (keyId && keyValue) {
      ring.set(keyId, keyValue);
    }
  }

  return ring;
}

function getServiceKeyRing() {
  const jsonRing = parseServiceKeyRingFromJson(process.env.INTERNAL_SERVICE_KEY_RING_JSON);
  const csvRing = parseServiceKeyRingFromCsv(process.env.INTERNAL_SERVICE_KEYS);
  const ring = new Map([...jsonRing.entries(), ...csvRing.entries()]);
  return ring;
}

function getLegacyServiceKeys() {
  const keys = [
    ...parseCsvValues(process.env.INTERNAL_SERVICE_KEYS)
      .filter((entry) => !entry.includes(':')),
    process.env.INTERNAL_SERVICE_KEY,
    process.env.SERVICE_KEY,
    process.env.CHARTERS_SERVICE_KEY,
  ]
    .map((value) => String(value || '').trim())
    .filter(Boolean);

  return new Set(keys);
}

function getSharedSecret() {
  return (
    process.env.INTERNAL_SHARED_SECRET ||
    process.env.JWT_SECRET ||
    ''
  );
}

function getExpectedIssuer() {
  return process.env.INTERNAL_ACTING_TOKEN_ISSUER || 'profile-branding';
}

function getRequestIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || '';
}

function isUserActive(user) {
  if (!user) return false;
  if (typeof user.isAccountActive === 'function') {
    return user.isAccountActive();
  }

  if (user.status) {
    return user.status === 'active';
  }

  return Boolean(user.isActive);
}

export const requireServiceKey = (req, res, next) => {
  const keyRing = getServiceKeyRing();
  const suppliedKey = req.headers[SERVICE_HEADER];
  const suppliedKeyId = req.headers[SERVICE_KEY_ID_HEADER];

  if (keyRing.size > 0) {
    if (typeof suppliedKeyId !== 'string' || typeof suppliedKey !== 'string') {
      throw new ApiError(403, 'Forbidden');
    }

    const expected = keyRing.get(String(suppliedKeyId || '').trim());
    if (!expected || suppliedKey !== expected) {
      throw new ApiError(403, 'Forbidden');
    }
  } else {
    const legacyKeys = getLegacyServiceKeys();
    if (legacyKeys.size === 0) {
      throw new ApiError(500, 'Internal service key is not configured');
    }

    if (typeof suppliedKey !== 'string' || !legacyKeys.has(suppliedKey)) {
      throw new ApiError(403, 'Forbidden');
    }
  }

  const allowlist = getAllowedIps();
  if (allowlist.size > 0) {
    const requestIp = getRequestIp(req);
    if (!allowlist.has(requestIp)) {
      throw new ApiError(403, 'Forbidden');
    }
  }

  req.internalService = {
    keyId: typeof suppliedKeyId === 'string' ? suppliedKeyId.trim() || null : null,
  };

  next();
};

export const requireActingAdmin = asyncHandler(async (req, res, next) => {
  const token = req.headers[ACTING_ADMIN_TOKEN_HEADER];
  if (!token || typeof token !== 'string') {
    throw new ApiError(401, 'Missing acting admin token');
  }

  const sharedSecret = getSharedSecret();
  if (!sharedSecret) {
    throw new ApiError(500, 'Internal shared secret is not configured');
  }

  let claims;
  try {
    claims = jwt.verify(token, sharedSecret, {
      issuer: getExpectedIssuer(),
    });
  } catch (error) {
    throw new ApiError(401, 'Invalid acting admin token');
  }

  const actingAdminId = claims?.adminId || claims?.chartersUserId || claims?.sub;
  const actingAdminRole = claims?.role;

  if (!actingAdminId || typeof actingAdminId !== 'string') {
    throw new ApiError(401, 'Invalid acting admin token payload');
  }

  if (!ALLOWED_ROLES.has(String(actingAdminRole || '').toLowerCase())) {
    throw new ApiError(403, 'Invalid acting admin role');
  }

  const actingAdmin = await User.findById(actingAdminId).select('name email role status isActive');

  if (!actingAdmin) {
    throw new ApiError(401, 'Acting admin not found');
  }

  if (!isUserActive(actingAdmin)) {
    throw new ApiError(403, 'Acting admin account is disabled or blocked');
  }

  if (!ALLOWED_ROLES.has(String(actingAdmin.role || '').toLowerCase())) {
    throw new ApiError(403, 'Privileged access required');
  }

  req.actingAdmin = actingAdmin;
  req.actingAdminClaims = claims;
  next();
});

export const internalAdminGuard = [requireServiceKey, requireActingAdmin];
