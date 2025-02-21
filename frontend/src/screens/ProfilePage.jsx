import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Profile Picture (First Letter of Username) */}
      <div className="w-54 h-54 rounded-full bg-black flex items-center justify-center text-white text-8xl font-bold">
        {userInfo?.name?.charAt(0).toUpperCase()}
      </div>

      {/* User Email */}
      <p className="mt-4 text-lg text-gray-700">{userInfo?.email}</p>

      {/* Edit Profile Button */}
      <Link to="/profile/edit">
        <button className="cursor-pointer mt-4 px-5 py-2 border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all">
          Edit Profile
        </button>
      </Link>

      {/* Navigation Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link
          to="/saved-posts"
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Your Saved Posts
        </Link>
        <Link
          to="/your-posts"
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Created By You
        </Link>
        <Link
          to="/create-post"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create New Post
        </Link>
      </div>
    </div>
  )
}

export default ProfilePage
