/*
 ** Description :
 */

// ---

declare namespace NodeJS {
  export interface ProcessEnv {
    DB: string
    DB_URL: string
    PORT: string
    SESSION_SEC: string
    CORS: string
    JWT_KEY: string
    JWT_TTL: string
    FIXER_API_KEY: string
  }
}
