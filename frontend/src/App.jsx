import { Routes, Route } from 'react-router-dom'
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
        {/* <Route path="/" element={userInfo ? <HomePage /> : <LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} /> */}

        {!userInfo ? (
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        ) : (
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/your-posts" element={<YourPosts />} />
            <Route path="/saved-posts" element={<SavedPosts />} />
          </Route>
        )}
      </Routes>
    </div>
  )
}

export default App
