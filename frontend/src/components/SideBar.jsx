import { useLocation } from 'react-router-dom'
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
import { Link } from 'react-router-dom'

const SideBar = () => {
  const location = useLocation()

  return (
    
      <nav className="h-full flex flex-col bg-white shadow-sm items-center">
        {/* Sidebar Content */}
        <ul className="flex-1 px-4 py-4 items-center flex flex-col gap-12">
          {/* Home Icon */}
          <li className="relative group">
            <Link to="/">
              {location.pathname === '/' ? (
                <HomeSolid className="size-8 cursor-pointer" />
              ) : (
                <HomeOutline className="size-8 cursor-pointer" />
              )}
              {/* <HomeIcon className="size-8 cursor-pointer" /> */}
              <span className="absolute left-10 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Home
              </span>
            </Link>
          </li>

          {/* Create Icon */}
          <li className="relative group">
            {location.pathname === '/create' ? (
              <PlusSolid className="size-8 cursor-pointer" />
            ) : (
              <PlusOutline className="size-8 cursor-pointer" />
            )}
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
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </nav>
    
  )
}

export default SideBar
