import { Outlet } from 'react-router-dom'
import HeaderLoggedOut from '../components/HeaderLoggedOut'

const LandingLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <HeaderLoggedOut />

      <Outlet />
    </div>
  )
}

export default LandingLayout
