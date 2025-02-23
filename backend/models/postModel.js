import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    desc: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    visit: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    generatedByAI: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
