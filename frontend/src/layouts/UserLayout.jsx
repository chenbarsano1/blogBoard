import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import HeaderLoggedIn from '../components/HeaderLoggedIn'

const UserLayout = () => {
  return (
    // <div className="min-h-screen relative">
    //   <aside className="fixed top-0 left-0 h-screen z-20">
    //     <SideBar />
    //   </aside>
    //   <div className="ml-16 flex flex-col h-screen">
    //     <HeaderLoggedIn />
    //     <main className="overflow-y-auto flex-1">
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>
    <div className='h-screen flex flex-col bg-gray-100'>
        <header className=' w-full bg-black text-white fixed top-0 left-0 z-10'>
            <HeaderLoggedIn />
        </header>
        <div className='flex flex-1 pt-[calc(10vh)]'>
            <aside className='h-[90vh] fixed left-0 top-[calc(10vh)]'>
                <SideBar />
            </aside>
            <main className='flex-1 flex ml-16 items-center justify-center bg-gray-100'>
                <Outlet />
            </main>
        </div>

    </div>
  )
}

export default UserLayout
