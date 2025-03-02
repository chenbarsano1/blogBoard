import PostCard from '../components/PostCard'
import TrendingPosts from '../components/TrendingPosts'
import PostList from '../components/PostList'

const HomePage = () => {
  return (
    <div className="p-4 w-full flex flex-col items-center bg-gray-100">
      <h1 className="mt-5 mb-5 text-8xl font-bold">For you</h1>
      <div className="w-[80vw] h-full mx-auto">
        <p className="mb-2 font-bold">Trending</p>
        <TrendingPosts />
        <div className='mt-8'>
          <p className="mb-2 font-bold">Recent Posts</p>
          <PostList />
        </div>
      </div>
    </div>
  )
}

export default HomePage
