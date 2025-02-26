import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { clearCredentials } from '../slices/authSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const HeaderLoggedIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const { userInfo } = useSelector((state) => state.auth) // Get user info from Redux

  const firstLetter = userInfo?.name?.charAt(0).toUpperCase() || '?' // Default to "?" if no name

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className="h-[10vh] sticky top-0 z-10 bg-white shadow-sm flex items-center space-x-6 p-5">
      <Link to="/home">
        <h1 className="text-xl font-extrabold text-black hover:text-gray-700 transition-all">
          Blogboard
        </h1>
      </Link>
      {/* Search Bar - Grows to fill space */}
      <div className="flex-1 relative">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-2 text-black border border-gray-300 rounded-full focus:broder-black hover:border-black"
        />
      </div>

      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        className="cursor-pointer inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
      >
        Log out
      </button>
      {/* User Avatar - Clickable */}
      <Link
        to={`/profile`} // Redirect to user profile
        className="h-10 w-10 flex items-center justify-center rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all duration-200"
      >
        {firstLetter}
      </Link>
    </header>
  )
}

export default HeaderLoggedIn
