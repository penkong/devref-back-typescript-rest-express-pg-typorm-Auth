import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

// ---

import { authRouter } from './routes'
import { NotFoundErr} from './error'
import { limiter } from './util'

// ---

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)
app.use(helmet())
app.use('/api/*', limiter)

app.use(
  cors({
    origin: '',
    credentials: true
  })
)
app.use('/api/v1/auth', authRouter)

app.all('*', async (req: , res) => {
  throw new NotFoundErr()
})

app.use(errorHandler)

export { app }
