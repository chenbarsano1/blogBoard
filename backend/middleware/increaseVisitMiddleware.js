import Post from '../models/postModel.js'

const increaseVisitMiddleware = async (req, res, next) => {
  try {
    const slug = req.params.slug
    await Post.findOneAndUpdate({ slug: slug }, { $inc: { visit: 1 } })
    await next()
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export default increaseVisitMiddleware