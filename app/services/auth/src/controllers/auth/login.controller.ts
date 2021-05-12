/*
 ** Description :
 */

import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'

import { BadReqErr } from '../../error'
import { UserRepository } from '../../data'
import { PasswordService } from '../../services'
import { catchAsync, userRefine } from '../../util'

// ---

export const login = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //

    const { email, password } = req.body

    const existUser = await UserRepository.getByEmail(email)

    if (!existUser) throw new BadReqErr('Invalid credentials')

    const matchedPass = await PasswordService.compare(
      existUser.password,
      password
    )

    if (!matchedPass) throw new BadReqErr('Invalid Credentials')

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

    console.log(req.session)

    res.status(200).send([userRefine(existUser, userJwt)])
  }
)
