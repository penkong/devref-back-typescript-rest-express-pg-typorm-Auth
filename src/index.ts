/*
 ** Description :
 */

import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config({ path: './config/index.ts' })

// import { Server } from 'http'
import { createConnection } from 'typeorm'
//
import { config } from './config'
import { app } from './app'

// ---

const { DB_URL, JWT_KEY, PORT } = config

// ---

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
//   console.log(err.name, err.message)
//   process.exit(1)
// })

// let server: Server

// const bootstraper = async () => {

if (!JWT_KEY) throw new Error('jwt key must be defined!')

if (!DB_URL) throw new Error('database url must be defined!')

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'secret',
  // synchronize: !__prod__,
  // logging: !__prod__,
  database: 'devref-ts-express-rest-pg-auth',
  entities: ['./src/data/models/*.ts'],
  migrations: ['./src/data-layer/migrations/*.ts']
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}!`)
    })
  })
  .catch(err => console.log(err))

// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...')
//   console.log(err)
//   server.close(() => {
//     process.exit(1)
//   })
// })

// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
//   server.close(() => {
//     console.log('process terminated')
//   })
// })

// process.on('SIGINT', () => {
//   console.log('👋 SIGINT RECEIVED. Shutting down gracefully')
//   server.close(() => {
//     process.exit(1)
//   })
// })
