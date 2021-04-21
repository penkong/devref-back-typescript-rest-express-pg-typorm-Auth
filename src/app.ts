import 'express-async-errors'

import hpp from 'hpp'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import cookieSession from 'cookie-session'
import compression from 'compression'

import { json, urlencoded } from 'body-parser'

// ---

import { limiter } from './util'
import { config } from './config'
import { authRouter } from './routes'
import { NotFoundErr } from './error'
import { currentUser, errorHandler } from './middleware'

// ---

const { CORS, __prod__ } = config

const app = express()

app.set('trust proxy', true)
app.use(
  cors({
    origin: CORS,
    credentials: true
  })
)
app.use(helmet())

if (!__prod__) app.use(morgan('dev'))

app.use('/api/*', limiter)

app.use(json({ limit: '2kb' }))
app.use(urlencoded({ extended: true, limit: '2kb' }))

app.use(
  cookieSession({
    name: 'session',
    sameSite: 'none',
    signed: false,
    secure: !__prod__
  })
)

app.use(
  hpp({
    whitelist: []
  })
)

app.use(compression())

// Busines -----

app.all('*', currentUser)
app.use('/api/v1/auth', authRouter)

app.all('*', async (_req, _res, next) => {
  // throw new NotFoundErr()
  next(new NotFoundErr())
})

// end -----

app.use(errorHandler)

// ---

export { app }
