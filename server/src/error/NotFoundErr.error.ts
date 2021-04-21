/*
 ** Description :
 */

import { BaseErr } from './'

// ---

export class NotFoundErr extends BaseErr {
  statusCode = 404

  constructor() {
    super('Route Not Found!')

    Object.setPrototypeOf(this, NotFoundErr.prototype)
  }

  serializeErrors() {
    return [{ message: 'Route not found!!!' }]
  }
}
