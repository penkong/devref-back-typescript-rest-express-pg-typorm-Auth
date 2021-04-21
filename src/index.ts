/*
 ** Description :
 */

import 'reflect-metadata'
import 'express-async-errors'

//
const express = require('express')

import cookieSession from 'cookie-session'

import { json } from 'body-parser'
import { Request, Response } from 'express'

import { config } from './config'
import { authRouter } from './routes/'
import { NotFoundErr } from './error'
import { createConnection } from 'typeorm'
import { UserRepository } from './data-layer/'
import { typeDefs, resolvers } from './graphql'
import { errorHandler, currentUser } from './middleware'
import { CountryLookup, ExchangeRate } from './service/'

// ---

const { DB_URL, JWT_KEY, CORS, PORT } = config

// ---

async function startApolloServer() {
  //

  if (!JWT_KEY) throw new Error('jwt key must be defined!')

  if (!DB_URL) throw new Error('database url must be defined!')

  // DB connection
  await createConnection()

  const app = express()

  app.set('trust proxy', 1)
  app.use(
    cookieSession({
      name: 'session',
      sameSite: 'none',
      signed: false,
      secure: process.env.NODE_ENV !== 'test'
    })
  )

  app.use(json({ limit: '2kb' }))
  app.use(express.urlencoded({ extended: true, limit: '2kb' }))

  app.all('*', currentUser)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, UserRepository }),
    dataSources: () => {
      return {
        countryAPI: new CountryLookup(),
        changeRateAPI: new ExchangeRate()
      }
    }
  })

  await server.start()

  // --------- Utility and Security Middlewares -----------

  const limiter = rateLimit({
    max: 30,
    windowMs: 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  })

  app.use('/api/*', limiter)
  app.use('/grqphql', limiter)

  app.use(
    cors({
      origin: CORS,
      credentials: true
    })
  )

  app.use(compression())

  // --------- Businesses --------------------

  app.use('/api/v1/auth', authRouter)

  server.applyMiddleware({ app })

  await new Promise(resolve => app.listen({ port: PORT }, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )

  // -------- More Middlewares ---------------

  app.use(helmet())

  // catch all routes
  app.all('*', async (_req: Request, _res: Response) => {
    throw new NotFoundErr()
  })

  app.use(errorHandler)

  return { server, app }
}

startApolloServer()
