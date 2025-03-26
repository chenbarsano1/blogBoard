import { useSelector } from 'react-redux'
import { useGetPostsByUserQuery } from '../slices/postsApiSlice'
import PostList from '../components/PostList'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const YourPosts = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const username = userInfo?.username

  const { posts, isFetching, error, loadMoreRef } = useInfiniteScroll({
    fetchQuery: useGetPostsByUserQuery, // The query function to call
    limit: 10, // Set the limit for posts
    sort: 'newest', // Set the sort order
    username, // Pass the username dynamically to the query
  })

  // if (isFetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.toString()}</div>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Posts</h2>
      {posts?.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <PostList posts={posts || []} />
      )}
      {/* Reference the element to trigger infinite scroll */}
      {posts.length > 0 && (
        <div ref={loadMoreRef} className="h-10 mt-4 flex justify-center">
          {isFetching && <p>Loading more...</p>}
        </div>
      )}
    </div>
  )
}

export default YourPosts
