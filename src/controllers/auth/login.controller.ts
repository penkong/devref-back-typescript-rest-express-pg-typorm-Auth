/*
 ** Description :
 */

import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { HashPassword } from '../../service/'
import { BadRequestError } from '../../error/'
import { UserRepository } from '../../data-layer/'
import { catchAsync, userRefine } from '../../utils'

// ---

export const login = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //

    const { email, password } = req.body

    const existUser = await UserRepository.getByEmail(email)

    if (!existUser) throw new BadRequestError('Invalid credentials')

    const matchedPass = await HashPassword.compare(existUser.password, password)

    if (!matchedPass) throw new BadRequestError('Invalid Credentials')

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email
      },
      process.env.JWT_KEY!
    )

    // Store it on session object
    req.session = {
      jwt: userJwt
    }

    res.status(200).send([userRefine(existUser, userJwt)])
  }
)
