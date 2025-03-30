import PostCard from '../components/PostCard'
import TrendingPosts from '../components/TrendingPosts'
import PostList from '../components/PostList'
import { useGetPostsQuery } from '../slices/postsApiSlice'
import { useState, useRef, useEffect } from 'react'
import Carousel from '../components/Carousel'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const HomePage = () => {
  const [filter, setFilter] = useState('newest') // Default filter is 'newest'
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase().replace(' ', '')) // Normalize value to match sort parameter
  }

  const { posts, isFetching, isError, error, loadMoreRef } = useInfiniteScroll({
    fetchQuery: useGetPostsQuery,
    limit: 10,
    sort: filter,
  })

  if (isError) {
    return <p>Error: {error?.data?.message || 'Something went wrong'}</p>
  }
  // useEffect to trigger re-fetch when filter changes
  useEffect(() => {
    // You can log to check if filter is changing
    console.log('Filter changed:', filter)
  }, [filter]) // Runs only when `filter` changes
  return (
    <div className="p-4 w-full flex flex-col items-center bg-gray-100">
      <h1 className="mt-5 mb-15 text-8xl font-bold">For you</h1>
      <div className="w-[80vw] h-full mx-auto">
        <p className="mb-2 font-bold">Trending</p>
        <TrendingPosts />
        <div className="mt-15">
          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend">Filter by</legend>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="select"
            >
              <option value="newest">Recent Posts</option>
              <option value="oldest">Oldest to Newest</option>
              <option value="popular">Most visited</option>
              {/* <option>AI Generated</option> */}
            </select>
          </fieldset>
          <p className="mb-2 font-bold">Recent Posts</p>
          <PostList posts={posts} />
        </div>
        <div ref={loadMoreRef} className="h-10 mt-4 flex justify-center">
          {isFetching && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  )
}

export default HomePage
