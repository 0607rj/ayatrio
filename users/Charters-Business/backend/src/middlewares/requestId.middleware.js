import crypto from 'crypto';

const REQUEST_ID_HEADER = 'x-request-id';
const VALID_REQUEST_ID = /^[a-zA-Z0-9._:-]{1,128}$/;

function sanitizeRequestId(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || !VALID_REQUEST_ID.test(trimmed)) {
    return null;
  }

  return trimmed;
}

export default function requestId(req, res, next) {
  const incoming = sanitizeRequestId(req.headers[REQUEST_ID_HEADER]);
  const requestId = incoming || crypto.randomUUID();

  req.requestId = requestId;
  res.setHeader(REQUEST_ID_HEADER, requestId);

  next();
}
