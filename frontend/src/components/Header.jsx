import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HeaderLoggedIn from './HeaderLoggedIn'
import HeaderLoggedOut from './HeaderLoggedOut'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <header >
      {/* <Link to="/" className="text-xl font-bold">
        Blogboard ♥
      </Link> */}
      {/* <nav> */}
        {userInfo ? (
          <HeaderLoggedIn />
        ) : (
          <HeaderLoggedOut />
        )}
      {/* </nav> */}
    </header>
  )
}

export default Header
