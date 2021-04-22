/*
 ** Description :
 */

// ---

declare namespace NodeJS {
  export interface ProcessEnv {
    DB: string // postgress
    DBNAME: string // deveref-ts.....
    DBDOCKER: string // host
    PGUSER: string // root
    PASSWORD: string // secret
    DB_URL: string // complete url for dev
    PORT: string // 5002
    SESSION_SEC: string //
    CORS: string // http://localhost:3000
    JWT_KEY: string // -fdsfdsf
    JWT_TTL: string // 365d
  }
}
