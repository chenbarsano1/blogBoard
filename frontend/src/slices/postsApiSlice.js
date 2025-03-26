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
        return `${POSTS_URL}?${params.toString()}`
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search}`
      },
      merge: (currentCache = { posts: [] }, newPosts) => {
        const uniquePosts = [...currentCache.posts, ...newPosts.posts].reduce(
          (acc, post) => {
            if (!acc.some((p) => p._id === post._id)) acc.push(post)
            return acc
          },
          []
        )
        return { posts: uniquePosts, hasMore: newPosts.hasMore }
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.search !== previousArg?.search,
      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })),
              'Post',
            ]
          : ['Post'],
    }),
    getTrendingPosts: builder.query({
      query: () => `${POSTS_URL}?page=1&limit=3&sort=trending`,
      providesTags: ['TrendingPosts'],
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
      query: ({ username, page = 1, limit = 10, sort = 'newest' }) => {
        const params = new URLSearchParams({ 
          creator: username, 
          page, 
          limit, 
          sort 
        })
        return `${POSTS_URL}?${params.toString()}`
      },
      
      // Unique cache key based on username and search/sort
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.username}-${queryArgs.sort}`
      },
      
      // Merge function to combine posts
      merge: (currentCache = { posts: [] }, newPosts) => {
        const uniquePosts = [...currentCache.posts, ...newPosts.posts].reduce(
          (acc, post) => {
            if (!acc.some((p) => p._id === post._id)) acc.push(post)
            return acc
          },
          []
        )
    
        return { 
          posts: uniquePosts, 
          hasMore: newPosts.hasMore 
        }
      },
      
      // Control when to refetch
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page,
      
      // Provide tags for cache invalidation
      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })),
              'Post',
            ]
          : ['Post'],
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
  useGetTrendingPostsQuery,
} = postsApiSlice
