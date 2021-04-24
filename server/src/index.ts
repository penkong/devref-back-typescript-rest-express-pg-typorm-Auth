/*
 ** Description :
 */

import 'reflect-metadata'

// import { Server } from 'http'
import { createConnection } from 'typeorm'

//

import { app } from './app'

import { config } from './config'
import { TYPEORM } from './config/connection.config'

// ---

const { PORT } = config

console.log(config)

// ---

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
//   console.log(err.name, err.message)
//   process.exit(1)
// })

// let server: Server

// if (!JWT_KEY) throw new Error('jwt key must be defined!')

// if (!DB_URL) throw new Error('database url must be defined!')

createConnection(TYPEORM)
  .then(() => {
    console.log(TYPEORM)
    console.log(PORT)
    app.listen(parseInt(PORT!), () => {
      console.log(`Listening on ${PORT}!`)
    })
  })
  .catch(err => {
    console.log(PORT)
    console.log(err)
    console.log(TYPEORM)
  })

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
