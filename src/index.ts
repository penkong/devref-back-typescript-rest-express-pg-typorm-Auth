/*
 ** Description :
 */

import dotenv from 'dotenv'
dotenv.config({ path: './config' })

import { Server } from 'http'
import { createConnection } from 'typeorm'
//
import { config } from './config'
import { app } from './app'

// ---

const { DB_URL, JWT_KEY, PORT } = config

// ---

let server: Server

async function bootstraper() {
  //

  if (!JWT_KEY) throw new Error('jwt key must be defined!')

  if (!DB_URL) throw new Error('database url must be defined!')

  try {
    // DB connection
    await createConnection()

    server = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

bootstraper()

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})
