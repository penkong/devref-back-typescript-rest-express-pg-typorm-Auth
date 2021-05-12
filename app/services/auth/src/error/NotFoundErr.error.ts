/*
 ** Description :
 */

import { BaseErr } from '.'

// ---

export class NotFoundErr extends BaseErr {
  statusCode = 404

  constructor() {
    super('Route Not Found!')

    Object.setPrototypeOf(this, NotFoundErr.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Route not found!!!' }]
  }
}
