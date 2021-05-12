/*
 ** Description :
 */

require('dotenv').config()

// ---

export const config = {
  DB: process.env.DB,
  DBNAME: process.env.DBNAME,
  DB_DOCKER: process.env.DB_DOCKER,
  PGUSER: process.env.PGUSER,
  PASSWORD: process.env.PASSWORD,
  DB_URL: process.env.DB_URL.replace('<PASSWORD>', process.env.PASSWORD),
  PORT: process.env.PORT,
  SESSION_SEC: process.env.SESSION_SEC,
  CORS: process.env.CORS,
  JWT_KEY: process.env.JWT_KEY,
  JWT_TTL: process.env.JWT_TTL,
  __prod__: process.env.NODE_ENV === 'production'
}
