import { Link } from 'react-router-dom'
const HeaderLoggedOut = () => {
  return (
    <header>
      <div className="flex items-center justify-between h-16 lg:h-20">
      <Link
        to="/"
        className="absolute top-6 left-6 text-xl font-extrabold text-black hover:text-gray-700 transition-all"
      >
        Blogboard
      </Link>
        {/* Mobile Menu Button */}
        <button className="cursor-pointer inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100">
          {/* Menu Open Icon */}
          <svg
            className="block w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          {/* Menu Close Icon */}
          <svg
            className="hidden w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
          <Link
            to="/something"
            className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
          >
            Something
          </Link>
          <Link
            to="/something"
            className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
          >
            Something
          </Link>
          <Link
            to="/something"
            className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
          >
            Something
          </Link>
          <Link
            to="/something"
            className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
          >
            Something
          </Link>

          <div className="w-px h-5 bg-black/20"></div>

          <Link
            to="/login"
            className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
          >
            <button className='cursor-pointer'>Sign Up</button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderLoggedOut
