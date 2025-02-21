import { Outlet } from 'react-router-dom'
import HeaderLoggedOut from '../components/HeaderLoggedOut'

const LandingLayout = () => {
  return (
    <div>
      <HeaderLoggedOut />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default LandingLayout
