import { set } from 'mongoose'

export default {
  testEnvironment: 'node', // Since you're testing a backend app
  // setupFilesAfterEnv: ["./jest.setup.js"], // Optional setup file
  transform: {}, // Disable Babel transform since you're using ESM
  testMatch: ['**/backend/**/*.test.js'], // Run tests only in backend
  setupFiles: ['dotenv/config'], // Load environment variables
}
