import { useSearchParams } from 'react-router-dom'
import { useGetPostsQuery } from '../slices/postsApiSlice'
import PostList from '../components/PostList'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
//   const tag = searchParams.get('tag') || ''

  const { data, isLoading, isError, error } = useGetPostsQuery({
    page: 1,
    limit: 10,
    sort: 'newest',
    search: searchTerm, // Only search title if not tag
    // tags: tag, // Only search tags if it's a tag search
  })

  return (
    <div>
      <h2 className="text-xl font-bold mb-10">
        Search Results for: "{searchTerm}"
      </h2>
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
