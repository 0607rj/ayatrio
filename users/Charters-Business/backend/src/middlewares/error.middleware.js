import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new ApiError(404, `Resource not found with id: ${err.value}`);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new ApiError(400, 'Duplicate field value entered');
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {}).map((val) => val.message).join(', ');
    error = new ApiError(400, message || 'Validation error');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token. Please log in again');
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Your token has expired. Please log in again');
  }

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error.errors || [], err.stack);
  }

  const logPayload = {
    level: 'error',
    type: 'request_error',
    requestId: req.requestId || null,
    method: req.method,
    path: req.originalUrl,
    statusCode: error.statusCode || 500,
    message: error.message,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  };

  console.error(JSON.stringify(logPayload));

  res.status(error.statusCode || 500).json({
    success: false,
    requestId: req.requestId || null,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    ...(Array.isArray(error.errors) && error.errors.length > 0 && { errors: error.errors }),
  });
};

export default errorHandler;
