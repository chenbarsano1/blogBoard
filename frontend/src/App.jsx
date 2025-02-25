import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './screens/HomePage'
import LandingPage from './screens/LandingPage'
import SignUpPage from './screens/SignUpPage'
import LoginPage from './screens/LoginPage'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LandingLayout from './layouts/LandingLayout'
import UserLayout from './layouts/UserLayout'
import ProfilePage from './screens/ProfilePage'
import EditProfile from './screens/EditProfile'
import CreatePost from './screens/CreatePost'
import YourPosts from './screens/YourPosts'
import SavedPosts from './screens/SavedPosts'

const App = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={!userInfo ? <LandingPage /> : <Navigate to="/home" />} />
          <Route path="/login" element={!userInfo ? <LoginPage /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!userInfo ? <SignUpPage /> : <Navigate to="/home" />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/home" element={userInfo ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={userInfo ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/profile/edit" element={userInfo ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/create-post" element={userInfo ? <CreatePost /> : <Navigate to="/login" />} />
          <Route path="/your-posts" element={userInfo ? <YourPosts /> : <Navigate to="/login" />} />
          <Route path="/saved-posts" element={userInfo ? <SavedPosts /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
