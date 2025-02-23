import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  const name = req.body.name
  const username = req.body.username.toLowerCase() // Convert username to lowercase
  const email = req.body.email.toLowerCase() // Convert email to lowercase
  const password = req.body.password

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('Email is already taken')
  }

  const usernameExists = await User.findOne({ username })
  if (usernameExists) {
    res.status(400)
    throw new Error('Username is already taken')
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', null, {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'User logged out' })
})

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
  }
  res.status(200).json(user)
})

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log('User ID from token:', req.user._id) // Debugging
  console.log('Request body:', req.body) // Debugging

  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (req.body.name) {
    user.name = req.body.name
  }

  if (req.body.username && req.body.username.toLowerCase() !== user.username) {
    const usernameExists = await User.findOne({
      username: req.body.username.toLowerCase(),
      _id: { $ne: user._id },
    })
    if (usernameExists) {
      res.status(400)
      throw new Error('Username is already taken')
    }
    user.username = req.body.username.toLowerCase()
  }

  if (req.body.email && req.body.email.toLowerCase() !== user.email) {
    const emailExists = await User.findOne({
      email: req.body.email.toLowerCase(),
      _id: { $ne: user._id },
    })
    if (emailExists) {
      res.status(400)
      throw new Error('Email is already taken')
    }
    user.email = req.body.email.toLowerCase()
  }

  if (req.body.password) {
    user.password = req.body.password
  }

  console.log('Saving user:', user) // Debugging
  const updatedUser = await user.save()

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
  })
})

export { loginUser, signupUser, logoutUser, getUserProfile, updateUserProfile }
