import { useSelector } from 'react-redux'
import { useGetPostsByUserQuery } from '../slices/postsApiSlice'
import PostList from '../components/PostList'

const YourPosts = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const username = userInfo?.username
  console.log('Final username for API call:', username)
  // console.log('Logged-in user:', user)
  const { data, isLoading, error } = useGetPostsByUserQuery(username)
  console.log('API Response:', data)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Posts</h2>
      {data?.posts?.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <PostList posts={data?.posts || []} />
      )}
    </div>
  )
}

export default YourPosts
