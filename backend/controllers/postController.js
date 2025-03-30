import mongoose from 'mongoose'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import ImageKit from 'imagekit'
import { GoogleGenAI } from '@google/genai'

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

    const imageFileName = req.body.image ? req.body.image.split('/').pop() : ''

    // Create a new post (supports AI-generated content)
    const newPost = new Post({
      creator: userId,
      title: req.body.title,
      content: req.body.content,
      desc: req.body.desc,
      tags: req.body.tags || [],
      slug: slug,
      generatedByAI: req.body.generatedByAI || false,
      image: imageFileName,
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

    if (search) {
      const searchRegex = new RegExp(search, 'i') // Case-insensitive search
      filter.$or = [
        { title: searchRegex }, // Search in title
        { tags: searchRegex }, // Search in tags
      ]
    }

    // if (tags) {
    //   // Convert each tag into a case-insensitive regex pattern
    //   const tagsArray = tags.split(',').map((tag) => new RegExp(tag, 'i'))
    //   filter.$or = tagsArray.map((tag) => ({ tags: tag }))
    // }
    // if (search) {
    //   // Search for posts that contain the search keyword in their title
    //   filter.title = new RegExp(search, 'i')
    // }

    if (creator) {
      // Find the user with the given username
      const user = await User.findOne({ username: creator }).select('_id')
      if (user) {
        filter.creator = user._id
      } else {
        // If the user is not found, return an empty array
        return res.status(200).json({ posts: [] })
      }
    }

    if (generatedByAI === 'true') {
      filter.generatedByAI = true
    } else if (generatedByAI === 'false') {
      filter.generatedByAI = false
    }

    let sortCriteria = { createdAt: -1 }
    if (sort) {
      switch (sort) {
        case 'newest':
          sortCriteria = { createdAt: -1 }
          break
        case 'oldest':
          sortCriteria = { createdAt: 1 }
          break
        case 'popular':
          sortCriteria = { visit: -1 }
          break
        case 'trending':
          // If multiple posts have the same visit count, they will be sorted by createdAt (newest first).
          // sortCriteria = { visit: -1, createdAt: -1 }
          // filter.createdAt = {
          //   // trending: most visited in the last 7 days
          //   $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          // }
          const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

          // Check if there are any trending posts in the last 7 days
          const recentTrendingPosts = await Post.find({
            visit: { $gt: 0 },
            createdAt: { $gte: last7Days },
          }).countDocuments()

          if (recentTrendingPosts > 0) {
            filter.createdAt = { $gte: last7Days }
          }

          sortCriteria = { visit: -1, createdAt: -1 }
          break
        default:
          break
      }
    }

    const posts = await Post.find(filter)
      .sort(sortCriteria)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate('creator', 'username')

    // Get the total number of posts that match the filter
    const totalPosts = await Post.countDocuments(filter)

    // Determine if there are more posts available beyond the current page
    const hasMore = totalPosts > limit * page

    res.status(200).json({ posts, hasMore })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}

// @desc    Get a single post by slug
// route    GET /api/posts/:slug
// @access  Public
export const getPost = async (req, res) => {
  try {
    const slug = req.params.slug

    // Find the post with the given slug
    const post = await Post.findOne({ slug }).populate('creator', 'username')

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}

// @desc    Delete a post by id
// route    DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' })
    }

    // extract user ID from the jwt
    const userId = req.user._id

    // find the post by id
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.creator.toString() === userId.toString()) {
      await post.deleteOne()
      return res.status(200).json({ message: 'Post deleted' })
    }

    return res.status(403).json({ message: 'Not authorized' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}

// @desc    Update a post by id
// route    PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' })
    }

    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid post ID' })
    }

    // extract user ID from the jwt
    const userId = req.user._id

    // find the post by id
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Only allow the creator to update the post
    if (post.creator.toString() === userId.toString()) {
      post.title = req.body.title || post.title
      post.content = req.body.content || post.content
      post.desc = req.body.desc || post.desc
      post.tags = req.body.tags || post.tags
      post.generatedByAI = req.body.generatedByAI || post.generatedByAI
      post.image = req.body.image || post.image

      const updatedPost = await post.save()
      return res.status(200).json(updatedPost)
    }

    return res.status(403).json({ message: 'Not authorized' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}


// @desc    Generate a new post
// route    POST /api/posts/generated
const ai = new GoogleGenAI ({apiKey: process.env.GEMINI_API_KEY})
export const generatePost = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' })
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      maxOutputTokens: 1000,
      temperature: 0.7,
    })
    const generatedText = response.text
    if (!generatedText) {
      return res.status(500).json({ message: 'Error generating post' })
    }
    res.status(200).json({ generatedText })
  } catch (error) {
    console.error('Error generating post:', error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}

const imageKit = new ImageKit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL_ENDPOINT,
})

export const uploadAuth = async (req, res) => {
  try {
    const result = imageKit.getAuthenticationParameters()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error getting authentication parameters:', error)
    res.status(500).json({ message: 'Server Error', error: error })
  }
}
