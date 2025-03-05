import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedPosts: [],
}

const savedPostsSlice = createSlice({
  name: 'savedPosts',
  initialState,
  reducers: {
    addSavedPost(state, action) {
      const newPost = action.payload
      const postExists = state.savedPosts.find((post) => post._id === newPost._id)
      if (!postExists) {
        state.savedPosts.push(action.payload)
      }
    },
    removeSavedPost(state, action) {
      state.savedPosts = state.savedPosts.filter(
        (post) => post._id !== action.payload
      )
    },
  },
})

export const { addSavedPost, removeSavedPost } = savedPostsSlice.actions
export default savedPostsSlice.reducer
