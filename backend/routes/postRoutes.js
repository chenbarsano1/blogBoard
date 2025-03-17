import express from 'express'
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
  uploadAuth
} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'
import increaseVisitMiddleware from '../middleware/increaseVisitMiddleware.js'

const router = express.Router()

router.get('/upload-auth', uploadAuth)
router.post('/', protect, createPost)
router.get('/', getPosts)
router.get('/:slug', increaseVisitMiddleware, getPost)
router.delete('/:id', protect, deletePost)
router.put('/:id', protect, updatePost)

export default router
