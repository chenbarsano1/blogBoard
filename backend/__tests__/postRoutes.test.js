import request from 'supertest'
import mongoose from 'mongoose'
import app from '../server.js'
import Post from '../models/postModel.js'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { it } from '@jest/globals'
// import { afterAll, beforeEach, describe, it } from '@jest/globals'

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
      { title: 'Popular Post', visit: 10, slug: 'popular-post', creator: new mongoose.Types.ObjectId(), desc: 'Popular post description', content: 'Popular post content' },
      { title: 'Less Popular Post', visit: 5, slug: 'less-popular-post', creator: new mongoose.Types.ObjectId(), desc: 'Less popular post description', content: 'Less popular post content' },
    ])

    const response = await request(app).get('/api/posts?sort=visit')
    expect(response.statusCode).toBe(200)
    expect(response.body.posts[0].title).toBe('Popular Post')
  })

  it('should return 400 for an invalid sort field', async () => {
    const response = await request(app).get('/api/posts?sort=invalidField')
    expect(response.statusCode).toBe(400)
  })
})
