export default {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  corsOrigin: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()) 
    : [
        'http://localhost:3000', 
        'https://charters-business.vercel.app',
        'https://charters-business-admin.vercel.app'
      ],
  mongodbUri: process.env.MONGODB_URI,
};
