/*
 ** Description :
 */

import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { config } from '../../config/'
import { HashPassword } from '../../service/'
import { BadRequestError } from '../../error'
import { UserRepository } from '../../data-layer/'
import { catchAsync, userRefine } from '../../utils'

// ---

const { JWT_KEY } = config

// ---

export const register = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    //

    const { email, password } = req.body

    const existingUser = await UserRepository.getByEmail(email)

    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    const hashed = await HashPassword.toHash(password)

    const user = await UserRepository.create({ email, password: hashed })

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      JWT_KEY!
    )

    // Store it on session object
    req.session = {
      jwt: userJwt
    }

    res.status(201).send([userRefine(user, userJwt)])
  }
)
