// import request from 'supertest'
// import { app } from '../src/app'

// declare global {
//   namespace NodeJS {
//     interface Global {
//       signin(): Promise<string[]>
//     }
//   }
// }

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
})

// beforeEach(async () => {})

// afterAll(async () => {})

// global.signin = async () => {}

// monkey patching not work on esmodule
// test('should be it ', () => {
// 	// jest.spyOn(module, 'name of func')
// 	// define mock implemetation
// 	// module.getXYZ.mockImplemetation(()=> {})
// 	// ...
// 	// restore it when finish
// 	// module.getXYZ.mockRestore()
// })

// we use
// jest.mock('../utils', () => {
//   return {
//     getWinner: jest.fn(() => {})
//   }
// })

//  utils.getWinner.mockReset()
