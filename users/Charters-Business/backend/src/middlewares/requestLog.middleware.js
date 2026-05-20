export default function requestLog(req, res, next) {
  const startedAt = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const claims = req.actingAdminClaims || {};

    const payload = {
      level: 'info',
      type: 'request',
      requestId: req.requestId || null,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      ip: req.ip,
      userAgent: req.headers['user-agent'] || null,
      serviceKeyId: req.internalService?.keyId || null,
      actingAdminId: req.actingAdmin?._id ? String(req.actingAdmin._id) : (claims.adminId || claims.sub || null),
      actingAdminRole: req.actingAdmin?.role || claims.role || null,
      timestamp: new Date().toISOString(),
    };

    console.log(JSON.stringify(payload));
  });

  next();
}
