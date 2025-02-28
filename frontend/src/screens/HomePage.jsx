import PostCard from '../components/PostCard'
import TrendingPosts from '../components/TrendingPosts'

const HomePage = () => {
  return (
    <div className="p-4 w-full flex flex-col items-center bg-amber-700">
      <h1 className="mt-5 mb-5 text-8xl font-bold">For you</h1>
      <div className="w-180 mx-auto">
        <p className="mb-2 font-bold">Trending</p>
        <TrendingPosts />
      </div>
    </div>
  )
}

export default HomePage
