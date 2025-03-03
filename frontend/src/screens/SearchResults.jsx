import { useSearchParams } from 'react-router-dom'
import { useGetPostsQuery } from '../slices/postsApiSlice'
import PostList from '../components/PostList'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  const { data, isLoading, isError, error } = useGetPostsQuery({
    page: 1,
    limit: 10,
    sort: 'newest',
    search: searchTerm,
  })
  console.log('API Response:', data)
  return (
    <div>
      <h2 className="text-xl font-bold">Search Results for: "{searchTerm}"</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading posts</p>}
      {data?.posts.length ? (
        <PostList posts={data.posts} />
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}

export default SearchResults
