import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { config } from '../config'

// ---

const { JWT_KEY } = config

declare global {
  // @eslint-ignore
  namespace Express {
    interface Request {
      currentUser?: { [key: string]: any }
    }
  }
}

// ---

export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  //
  if (!req.session?.jwt) return next()

  try {
    const payload = jwt.verify(req.session.jwt, JWT_KEY!) as {
      [key: string]: any
    }
    req.currentUser = payload
  } catch (err) {}

  next()
  // return next()
}
