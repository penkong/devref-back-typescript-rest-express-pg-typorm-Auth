/*
 ** Description :
 */

import { Request, Response, NextFunction } from 'express'

import { catchAsync } from '../../util'

// ---

export const getUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //
    console.log(req.currentUser)
    res.send({ currentUser: req.currentUser || null })
  }
)
