import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import { response } from 'express'

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

// @desc    Save a post
// route    POST /api/users/save-post/:id
// @access  Private
const savePost = asyncHandler(async (req, res) => {
  const postId = req.params.id

  // Find the user who is trying to save the post
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // Check if the post is already saved
  if (user.savedPosts.includes(postId)) {
    res.status(400)
    throw new Error('Post already saved')
  }

  // Add the post to the savedPosts array
  user.savedPosts.push(postId)

  await user.save()

  res.status(200).json({ message: 'Post saved successfully' })
})

// @desc    Unsave a post
// route    DELETE /api/users/unsave-post/:id
// @access  Private
const unsavePost = asyncHandler(async (req, res) => {
  const postId = req.params.id

  // Find the user who is trying to unsave the post
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // check if the post is in the saved posts array
  if (!user.savedPosts.includes(postId)) {
    res.status(400)
    throw new Error('Post not found in saved posts')
  }

  // Remove the post from the savedPosts array
  user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId)
  await user.save()

  res.status(200).json({ message: 'Post removed from saved posts' })
})

// @desc    Get saved posts
// route    GET /api/users/saved-posts
// @access  Private
const getSavedPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedPosts')
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.status(200).json(user.savedPosts)
})

export {
  loginUser,
  signupUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  savePost,
  unsavePost,
  getSavedPosts,
}
