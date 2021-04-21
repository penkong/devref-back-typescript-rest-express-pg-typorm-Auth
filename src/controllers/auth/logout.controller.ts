/*
 ** Description :
 */

import { Request, Response, NextFunction } from 'express'

import { catchAsync } from '../../util'

// ---

export const logout = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //

    req.currentUser = {}
    req.session = null

    console.log(req.currentUser)

    console.log(req.session)

    res.send({})
  }
)
