import PostCard from '../components/PostCard'
import TrendingPosts from '../components/TrendingPosts'
import PostList from '../components/PostList'
import { useGetPostsQuery } from '../slices/postsApiSlice'
import { useState, useRef, useEffect } from 'react'
import Carousel from '../components/Carousel'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const HomePage = () => {
  const { posts, isFetching, isError, error, loadMoreRef } = useInfiniteScroll({
    fetchQuery: useGetPostsQuery,
    limit: 10,
    sort: 'newest',
  })

  if (isError) {
    return <p>Error: {error?.data?.message || 'Something went wrong'}</p>
  }

  return (
    <div className="p-4 w-full flex flex-col items-center bg-gray-100">
      <h1 className="mt-5 mb-15 text-8xl font-bold">For you</h1>
      <div className="w-[80vw] h-full mx-auto">
        <p className="mb-2 font-bold">Trending</p>
        <TrendingPosts />
        <div className="mt-15">
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
