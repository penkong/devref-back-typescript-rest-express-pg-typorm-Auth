// import request from 'supertest'
// import { app } from '../src/app'

// declare global {
//   namespace NodeJS {
//     interface Global {
//       signin(): Promise<string[]>
//     }
//   }
// }

let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
})

beforeEach(async () => {})

afterAll(async () => {})

// global.signin = async () => {}
