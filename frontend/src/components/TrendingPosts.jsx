import { useEffect } from 'react'
import { useGetPostsQuery } from '../slices/postsApiSlice'
import Carousel from './Carousel'

const TrendingPosts = () => {
  const { data, error, isLoading } = useGetPostsQuery({
    page: 1,
    limit: 3,
    sort: 'trending',
  })

  useEffect(() => {
    console.log('Fetching trending posts with:', {
      page: 1,
      limit: 3,
      sort: 'trending',
    })
  }, [])
  console.log(data)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  // if (!data || !data.posts || data.posts.length === 0) return <div>No trending posts</div>;

  const trendingPosts = data?.posts || []

  return <Carousel posts={trendingPosts} />
}

export default TrendingPosts
