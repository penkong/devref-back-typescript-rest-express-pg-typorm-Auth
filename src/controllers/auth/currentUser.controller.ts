/*
 ** Description :
 */

import { Request, Response, NextFunction } from 'express'

import { catchAsync } from '../../utils'

// ---

export const getUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //

    res.send({ currentUser: req.currentUser || null })
  }
)
