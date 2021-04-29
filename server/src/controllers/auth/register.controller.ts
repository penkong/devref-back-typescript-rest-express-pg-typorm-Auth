/*
 ** Description :
 */

import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { config } from '../../config/'
import { BadReqErr } from '../../error'
import { UserRepository } from '../../data'
import { PasswordService } from '../../services'
import { catchAsync, userRefine } from '../../util'

// ---

const { JWT_KEY } = config

// ---

export const register = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		//

		const { email, password } = req.body

		const existingUser = await UserRepository.getByEmail(email)

		if (existingUser) {
			throw new BadReqErr('Email in use')
		}

		const hashed = await PasswordService.toHash(password)

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
