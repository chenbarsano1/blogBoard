import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server.js'
import Post from '../models/postModel.js'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { beforeEach, describe, it } from '@jest/globals'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

describe('GET /api/posts', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await Post.deleteMany()
  })

  it('should return an empty array when no posts exist', async () => {
    const response = await request(app).get('/api/posts')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts).toEqual([])
  })

  it('should return all posts when they exist', async () => {
    const samplePost = await Post.create({
      title: 'Test Post',
      desc: 'This is a test description',
      creator: new mongoose.Types.ObjectId(),
      content: 'This is a test post',
      slug: 'test-post',
      visit: 0,
    })

    const response = await request(app).get('/api/posts')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts).toHaveLength(1)
    expect(response.body.posts[0].title).toBe('Test Post')
  })

  it('should not allow duplicate slugs', async () => {
    await Post.create({
      title: 'First Post',
      desc: 'First post description',
      creator: new mongoose.Types.ObjectId(),
      content: 'First post content',
      slug: 'same-slug',
      visit: 0,
    })

    let error
    try {
      await Post.create({
        title: 'Second Post',
        desc: 'Second post description',
        creator: new mongoose.Types.ObjectId(),
        content: 'Second post content',
        slug: 'same-slug',
        visit: 0,
      })
    } catch (err) {
      error = err
    }

    expect(error).toBeDefined()
    expect(error.code).toBe(11000) // 11000 is MongoDB's duplicate key error code
  })

  it('should return an empty array when no posts match the filter', async () => {
    const response = await request(app).get('/api/posts?tags=tag1,tag2')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts).toEqual([])
  })

  it('should return posts that match the filter', async () => {
    const samplePost = await Post.create({
      title: 'Test Post',
      desc: 'This is a test description',
      creator: new mongoose.Types.ObjectId(),
      content: 'This is a test post',
      slug: 'test-post',
      tags: ['tag1', 'tag2'],
      visit: 0,
    })

    const response = await request(app).get('/api/posts?tags=tag1,tag2')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts).toHaveLength(1)
    expect(response.body.posts[0].title).toBe('Test Post')
  })

  it('should return an empty array when no posts match the search', async () => {
    const response = await request(app).get('/api/posts?search=test')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts).toEqual([])
  })

  it('should return posts that match the search', async () => {
    const samplePost = await Post.create({
      title: 'Test Post',
      desc: 'This is a test description',
      creator: new mongoose.Types.ObjectId(),
      content: 'This is a test post',
      slug: 'test-post',
      visit: 0,
    })

    const response = await request(app).get('/api/posts?search=test')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts).toHaveLength(1)
    expect(response.body.posts[0].title).toBe('Test Post')
  })

  it('should return paginated results when using page and limit', async () => {
    await Post.create({
      title: 'First Post',
      desc: 'First post description',
      creator: new mongoose.Types.ObjectId(),
      content: 'First post content',
      slug: 'first-post',
      visit: 0,
    })

    await Post.create({
      title: 'Second Post',
      desc: 'Second post description',
      creator: new mongoose.Types.ObjectId(),
      content: 'Second post content',
      slug: 'second-post',
      visit: 0,
    })

    await Post.create({
      title: 'Third Post',
      desc: 'Third post description',
      creator: new mongoose.Types.ObjectId(),
      content: 'Third post content',
      slug: 'third-post',
      visit: 0,
    })

    const response = await request(app).get('/api/posts?page=1&limit=2')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts).toHaveLength(2)
    expect(response.body.posts[0].title).toBe('Third Post') // Newest post first
  })

  it('should return posts sorted by visits in descending order', async () => {
    await Post.create([
      {
        title: 'Popular Post',
        visit: 10,
        slug: 'popular-post',
        creator: new mongoose.Types.ObjectId(),
        desc: 'Popular post description',
        content: 'Popular post content',
      },
      {
        title: 'Less Popular Post',
        visit: 5,
        slug: 'less-popular-post',
        creator: new mongoose.Types.ObjectId(),
        desc: 'Less popular post description',
        content: 'Less popular post content',
      },
    ])

    const response = await request(app).get('/api/posts?sort=popular')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts[0].title).toBe('Popular Post')
  })
})

describe('POST /api/posts', () => {
  let mongoServer
  let user
  let token

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await User.deleteMany()
    await Post.deleteMany()

    user = await User.create({
      name: 'Test User',
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password',
    })

    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
  })

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post' })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Not authenticated, no token')
  })

  it('should return 401 if an invalid token is provided', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Cookie', 'jwt=invalidtoken')
      .send({ title: 'Test Post' })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Not authorized, invalid token')
  })

  it('should create a new post when a valid token is provided', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Cookie', `jwt=${token}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        desc: 'This is a test description',
      })
    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe('Test Post')
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('slug')
    expect(response.body).toHaveProperty('creator', user._id.toString())
  })

  it('should generate a unique slug for the post', async () => {
    await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      desc: 'This is a test description',
      creator: user._id,
      slug: 'test-post',
      visit: 0,
    })

    const response = await request(app)
      .post('/api/posts')
      .set('Cookie', `jwt=${token}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        desc: 'This is a test description',
      })
    expect(response.statusCode).toBe(201)
    expect(response.body.slug).not.toBe('test-post')
  })
})

describe('GET /api/posts/:slug', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await Post.deleteMany()
  })

  it('should return 404 if the post does not exist', async () => {
    const response = await request(app).get('/api/posts/nonexistent-post')
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Post not found')
  })

  it('should return the post if it exists', async () => {
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      desc: 'This is a test description',
      creator: new mongoose.Types.ObjectId(),
      slug: 'test-post',
      visit: 0,
    })

    const response = await request(app).get(`/api/posts/${post.slug}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe('Test Post')
  })

  it('should increase the visit count when the post is visited', async () => {
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      desc: 'This is a test description',
      creator: new mongoose.Types.ObjectId(),
      slug: 'test-post',
      visit: 0,
    })

    const response = await request(app).get(`/api/posts/${post.slug}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.visit).toBe(1)
  })
})

describe('DELETE /api/posts/:id', () => {
  let mongoServer
  let user
  let token

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await User.deleteMany()
    await Post.deleteMany()

    user = await User.create({
      name: 'Test User',
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password',
    })
  })

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).delete('/api/posts/1')
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Not authenticated, no token')
  })

  it('should return 401 if an invalid token is provided', async () => {
    const response = await request(app)
      .delete('/api/posts/1')
      .set('Cookie', 'jwt=invalidtoken')
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Not authorized, invalid token')
  })

  it('should return 400 if the post ID is invalid', async () => {
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .delete('/api/posts/1')
      .set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Invalid post ID')
  })

  it('should return 404 if the post does not exist', async () => {
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .delete(`/api/posts/${new mongoose.Types.ObjectId()}`)
      .set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Post not found')
  })

  it('should return 403 if the user is not the creator of the post', async () => {
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      desc: 'This is a test description',
      creator: new mongoose.Types.ObjectId(),
      slug: 'test-post',
      visit: 0,
    })

    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe('Not authorized')
  })

  it('should delete the post if the user is the creator', async () => {
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      desc: 'This is a test description',
      creator: user._id,
      slug: 'test-post',
      visit: 0,
    })

    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Post deleted')
  })
})

describe('PUT /api/posts/:id', () => {
  let mongoServer
  let user
  let token

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await User.deleteMany()
    await Post.deleteMany()

    user = await User.create({
      name: 'Test User',
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password',
    })
  })

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).put('/api/posts/1')
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Not authenticated, no token')
  })

  it('should return 401 if an invalid token is provided', async () => {
    const response = await request(app)
      .put('/api/posts/1')
      .set('Cookie', 'jwt=invalidtoken')
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Not authorized, invalid token')
  })

  it('should return 400 if the post ID is invalid', async () => {
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .put('/api/posts/1')
      .set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Invalid post ID')
  })

  it('should return 404 if the post does not exist', async () => {
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .put(`/api/posts/${new mongoose.Types.ObjectId()}`)
      .set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Post not found')
  })

  it('should return 403 if the user is not the creator of the post', async () => {
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      desc: 'This is a test description',
      creator: new mongoose.Types.ObjectId(),
      slug: 'test-post',
      visit: 0,
    })

    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Cookie', `jwt=${token}`)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe('Not authorized')
  })

  it('should update the post if the user is the creator', async () => {
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post',
      desc: 'This is a test description',
      creator: user._id,
      slug: 'test-post',
      visit: 0,
    })

    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Cookie', `jwt=${token}`)
      .send({
        title: 'Updated Post',
        content: 'This is an updated post',
        desc: 'This is an updated description',
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe('Updated Post')
    expect(response.body.content).toBe('This is an updated post')
  })

  it('should not update the post if the user is the creator but the post ID is invalid', async () => {
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    const response = await request(app)
      .put(`/api/posts/${new mongoose.Types.ObjectId()}`)
      .set('Cookie', `jwt=${token}`)
      .send({
        title: 'Updated Post',
        content: 'This is an updated post',
        desc: 'This is an updated description',
      })
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Post not found')
  })
})
