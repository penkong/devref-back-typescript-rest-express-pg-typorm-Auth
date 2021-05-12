/*
 ** Description :
 */

import { ValidationError } from 'express-validator'

import { BaseErr } from '.'

// ---

export class ValidationRequestErr extends BaseErr {
  statusCode = 400

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters')

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ValidationRequestErr.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map(err => ({ message: err.msg, field: err.param }))
  }
}
