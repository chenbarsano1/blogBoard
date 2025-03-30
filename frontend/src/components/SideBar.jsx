import { useLocation, useNavigate } from 'react-router-dom'
import {
  HomeIcon as HomeOutline,
  PlusCircleIcon as PlusOutline,
  BellIcon as BellOutline,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeSolid,
  PlusCircleIcon as PlusSolid,
  BellIcon as BellSolid,
} from '@heroicons/react/24/solid'
import { ArrowRightStartOnRectangleIcon as LogoutOutline } from '@heroicons/react/24/outline'
import { ArrowRightStartOnRectangleIcon as LogoutSolid } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { clearCredentials } from '../slices/authSlice'

const SideBar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    console.log('Logout button clicked!') // Debug log
      try {
        await logout().unwrap()
        dispatch(clearCredentials())
        navigate('/')
      } catch (err) {
        console.error(err)
      }
    }

  return (
    <nav className="h-full flex flex-col bg-white shadow-sm items-center max-w-16">
      {/* Sidebar Content */}
      <ul className="flex-1 px-4 py-4 items-center flex flex-col gap-12">
        {/* Home Icon */}
        <li className="relative group">
          <Link to="/home">
            {location.pathname === '/home' ? (
              <HomeSolid className="size-8 cursor-pointer" />
            ) : (
              <HomeOutline className="size-8 cursor-pointer" />
            )}
            {/* <HomeIcon className="size-8 cursor-pointer" /> */}
          </Link>
          <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </span>
        </li>

        {/* Create Icon */}
        <li className="relative group">
        <Link to="/create-post">
          {location.pathname === '/create-post' ? (
            <PlusSolid className="size-8 cursor-pointer" />
          ) : (
            <PlusOutline className="size-8 cursor-pointer" />
          )}
          </Link>
          <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Create
          </span>
        </li>

        {/* Notifications Icon */}
        <li className="relative group">
          {location.pathname === '/notifications' ? (
            <BellSolid className="size-8 cursor-pointer" />
          ) : (
            <BellOutline className="size-8 cursor-pointer" />
          )}
          <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Notifications
          </span>
        </li>
      </ul>

      {/* User Info Section */}
      <div className="border-t flex p-3 items-center">
        <div className="relative group">
          <button onClick={logoutHandler} className="w-8 h-8 cursor-pointer">
            <LogoutOutline className="w-full h-full" />
          </button>
          <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Logout
          </span>
        </div>
      </div>
    </nav>
  )
}

export default SideBar
