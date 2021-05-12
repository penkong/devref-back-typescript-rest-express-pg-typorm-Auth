/*
 ** Description :
 */

import { ConnectionOptions } from 'typeorm'

// ---

export const config = {
  PORT: process.env.PORT,
  // DBURL: process.env.DB_URL!.replace('<PASSWORD>', process.env.PASSWORD!),
  DBURL: process.env.DBURL,
  DBNAME: process.env.DBNAME,
  NODE_ENV: process.env.NODE_ENV,
  PGUSER: process.env.PGUSER,
  PGPASS: process.env.PASSWORD,
  CORS: process.env.CORS,
  JWT_KEY: process.env.JWT_KEY,
  JWT_TTL: process.env.JWT_TTL,
  __prod__: process.env.NODE_ENV === 'production'
}

export const TYPEORM: ConnectionOptions = {
  type: 'postgres',
  host: config.DBURL || '172.18.0.2',
  port: 5432,
  username: config.PGUSER || 'root',
  password: config.PGPASS || 'secret',
  synchronize: !config.__prod__,
  logging: !config.__prod__,
  database: config.DBNAME || 'devref-ts-express-rest-pg-auth',
  entities: ['./src/data/models/*.ts'],
  migrations: ['./src/data-layer/migrations/*.ts']
}
