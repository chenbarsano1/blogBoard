import { get } from 'mongoose'
import { apiSlice } from './apiSlice'
const POSTS_URL = '/posts/'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Post'], // Refresh posts list after creating a new post
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'], // Refresh posts list after deleting a post
    }),
    getPost: builder.query({
      query: (slug) => `${POSTS_URL}${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Post', id: slug }], // Cache individual post
    }),
    getPosts: builder.query({
      query: ({ page = 1, limit = 10, sort = 'newest', search = '' }) => {
        const params = new URLSearchParams({ page, limit, sort })
        if (search) params.append('search', search)
        // if (tags) params.append('tags', tags)
        return `${POSTS_URL}?${params.toString()}`
      },
      // transformResponse: (response) => response.posts,
      providesTags: ['Post'], // Cache all posts
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `${POSTS_URL}${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }], // Refresh the post after updating
    }),
    getPostsByUser: builder.query({
      query: (username) => `${POSTS_URL}?creator=${username}`,
      providesTags: ['Posts'],
    }),
  }),
})

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useGetPostsByUserQuery,
} = postsApiSlice
