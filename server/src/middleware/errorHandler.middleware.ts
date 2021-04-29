/*
 ** Description :
 */

import { Request, Response, NextFunction } from 'express'

import { BaseErr } from '../error'

// ---

// @ts-ignore
export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	//

	if (err instanceof BaseErr)
		return res.status(err.statusCode).send({ errors: err.serializeErrors() })

	console.error(err)
	res.status(400).send({
		errors: [{ message: 'Something went wrong' }]
	})
}
