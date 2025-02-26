// import { signupUser } from '../controllers/userController.js'
// import User from '../models/userModel.js'
// import generateToken from '../utils/generateToken.js'
// import httpMocks from 'node-mocks-http'
// import bcrypt from 'bcryptjs'
// import { expect, jest } from '@jest/globals'

// // jest.mock('../utils/generateToken', () => jest.fn())
// jest.mock('../utils/generateToken', () => {
//   return jest.fn() // Correct way to mock a default export
// })
// jest.mock('bcryptjs')

// beforeAll(() => {
//   // Directly override User model methods
//   User.findOne = jest.fn()
//   User.create = jest.fn()
// })

// const mockRequest = (body) =>
//   httpMocks.createRequest({
//     method: 'POST',
//     url: '/api/users',
//     body,
//   })

// const mockResponse = () => httpMocks.createResponse()

// describe('signupUser', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })

//   it('should create a new user when given valid data', async () => {
//     const req = mockRequest({
//       name: 'John Doe',
//       username: 'john_doe',
//       email: 'john@example.com',
//       password: 'password',
//     })
//     const res = mockResponse()

//     User.findOne.mockResolvedValue(null)

//     jest.spyOn(bcrypt, 'hash').mockResolvedValue('mockHashedPassword')

//     User.create.mockResolvedValue({
//       _id: '12345',
//       name: 'John Doe',
//       username: 'john_doe',
//       email: 'john@example.com',
//       password: 'mockHashedPassword',
//     })

//     generateToken.mockImplementation((res, userId) => {})
//     await signupUser(req, res, () => {})

//     expect(generateToken).toHaveBeenCalledWith(expect.any(Object), '12345')
//     expect(User.findOne).toHaveBeenCalledTimes(2)
//     expect(User.create).toHaveBeenCalledWith({
//       name: 'John Doe',
//       username: 'john_doe',
//       email: 'john@example.com',
//       password: 'password',
//     })
//     expect(res.statusCode).toBe(201)
//     expect(res._getJSONData()).toMatchObject({
//       _id: '12345',
//       name: 'John Doe',
//       username: 'john_doe',
//       email: 'john@example.com',
//     })
//   })
// })
