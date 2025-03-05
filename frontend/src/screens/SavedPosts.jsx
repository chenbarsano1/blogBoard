import { useGetSavedPostsQuery } from '../slices/usersApiSlice'
import PostCard from '../components/PostCard'
import PostList from '../components/PostList'

const SavedPosts = () => {
  const { data: savedPosts, isLoading, isError } = useGetSavedPostsQuery()

  if (isLoading) return <div>Loading saved posts...</div>
  if (isError) return <div>Failed to load saved posts</div>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Saved Posts</h2>
      {savedPosts.length === 0 ? (
        <p>No saved posts yet</p>
      ) : (
        <PostList posts={savedPosts}/>
      )}
    </div>
  )
}

export default SavedPosts
