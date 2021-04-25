/*
 ** Description :
 */

import { BaseErr } from './BaseErr.error'

// ---

export class BadReqErr extends BaseErr {
	statusCode = 400

	constructor(public message: string) {
		super(message || 'bad request')

		Object.setPrototypeOf(this, BadReqErr.prototype)
	}

	serializeErrors() {
		return [{ message: this.message }]
	}
}
