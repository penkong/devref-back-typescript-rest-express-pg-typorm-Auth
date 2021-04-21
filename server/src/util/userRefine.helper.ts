/*
 ** Description :
 */

import { User } from '../data'

// ---

export const userRefine = (
  { id, email, confirmed, type, updatedAt }: User,
  token: string
) => ({
  id,
  email,
  confirmed,
  type,
  updatedAt,
  token
})
