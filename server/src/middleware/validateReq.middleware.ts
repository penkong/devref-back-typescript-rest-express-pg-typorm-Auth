/*
 ** Description :
 */

import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

import { ValidationRequestErr } from '../error'

// ---

export const validateReq = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  //

  const errors = validationResult(req)

  if (!errors.isEmpty()) throw new ValidationRequestErr(errors.array())

  next()
}
