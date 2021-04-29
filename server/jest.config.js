module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-enviroment-node',
  setupFilesAfterEnv: ['./src/test/setup.ts']
}
