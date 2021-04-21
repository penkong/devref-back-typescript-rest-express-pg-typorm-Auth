import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { config } from '../config'

// ---

const { JWT_KEY } = config

declare global {
  namespace Express {
    interface Request {
      currentUser?: object
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
    const payload = jwt.verify(req.session.jwt, JWT_KEY!) as object
    req.currentUser = payload
  } catch (err) {}

  next()
}
