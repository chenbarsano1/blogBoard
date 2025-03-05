import express from 'express'
import {
  loginUser,
  signupUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  savePost,
  unsavePost,
  getSavedPosts,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/logout', logoutUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.post('/save-post/:id', protect, savePost)
router.delete('/unsave-post/:id', protect, unsavePost)
router.get('/saved-posts', protect, getSavedPosts)

export default router
