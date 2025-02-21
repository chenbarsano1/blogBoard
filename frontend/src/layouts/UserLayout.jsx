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
    <div className='h-screen flex flex-col'>
        <header className='h-16 w-full bg-black text-white fixed top-0 left-0 z-10'>
            <HeaderLoggedIn />
        </header>
        <div className='flex flex-1 pt-16'>
            <aside className='h-[calc(100%-4rem)] bg-gray-200 fixed left-0 top-16'>
                <SideBar />
            </aside>
            <main className='flex-1 flex ml-17 items-center justify-center p-8 bg-amber-400'>
                <Outlet />
            </main>
        </div>

    </div>
  )
}

export default UserLayout
