/*
 ** Description :
 */

require('dotenv').config()

// ---

export const config = {
  DB: process.env.DB,
  DB_URL: process.env.DB_URL!.replace('<PASSWORD>', process.env.PASSWORD!),
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  CORS: process.env.CORS,
  JWT_TTL: process.env.JWT_TTL,
  __prod__: process.env.NODE_ENV === 'production',
  FIXER_API_KEY: process.env.FIXER_API_KEY
}
