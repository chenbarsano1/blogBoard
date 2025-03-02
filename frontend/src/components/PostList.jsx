import PostCard from './PostCard'
import { useGetPostsQuery } from '../slices/postsApiSlice'

const PostList =  () => {
  const { data, isLoading, isError, error } = useGetPostsQuery({
    page: 1,
    limit: 10,
    sort: 'newest',
  })

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error: {error?.data?.message || 'Something went wrong'}</p>
  }

  const posts = data.posts || [] // Access posts correctly
  console.log('Posts data:', data)

  return (
    <div className="space-y-4">
      {posts && posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostList
