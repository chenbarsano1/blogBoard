import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// @desc    Create a new post
// route    POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    // get the token from the cookies
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    // verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    // find the user in the database
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // generate a slug from the title
    let slug = req.body.title.replace(/ /g, '-').toLowerCase()

    // Check if a post with the same slug already exists, and modify it if it does
    let existingSlug = await Post.findOne({ slug: slug })
    let counter = 2

    // If a post with the same slug exists, keep modifying the slug until it is unique
    while (existingSlug) {
      // Append a number to the slug to make it unique
      slug = `${slug}-${counter}`
      // Check again if this new slug already exists in the database
      existingSlug = await Post.findOne({ slug: slug })
      counter++
    }

    // Create a new post (supports AI-generated content)
    const newPost = new Post({
      creator: userId,
      title: req.body.title,
      content: req.body.content,
      desc: req.body.desc,
      tags: req.body.tags || [],
      slug: slug,
      generatedByAI: req.body.generatedByAI || false,
      image: req.body.image || '',
    })

    // Save the post to the database
    const createdPost = await newPost.save()

    res.status(201).json(createdPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}

// @desc    Get all posts
// route    GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    // get pagination parameters from the query (default: page 1, limit 10)
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    // create an empty filter object
    const filter = {}

    // Extract query parameters from request
    const tags = req.query.tags
    const creator = req.query.creator // Filter by creator's username
    const search = req.query.search // Search for posts by title
    const sort = req.query.sort // Sorting criteria
    const generatedByAI = req.query.generatedByAI // Filter AI-generated posts

    if (tags) {
      const tagsArray = tags.split(',')
      filter.tags = { $in: tagsArray.map((tag) => new RegExp(tag, 'i')) }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}
