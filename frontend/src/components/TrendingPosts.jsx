import { useEffect } from 'react'
// import { useGetPostsQuery } from '../slices/postsApiSlice'
import { useGetTrendingPostsQuery } from '@/slices/postsApiSlice'
import Carousel from './Carousel'

const TrendingPosts = () => {
  const { data, error, isLoading } = useGetTrendingPostsQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  // if (!data || !data.posts || data.posts.length === 0) return <div>No trending posts</div>;

  const trendingPosts = data?.posts || []

  return <Carousel posts={trendingPosts} />
}

export default TrendingPosts
