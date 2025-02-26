import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { clearCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../components/PostCard'
import Header from '../components/Header'
import SideBar from '../components/SideBar'

const HomePage = () => {
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="p-4 w-full flex flex-col items-center bg-amber-700">
      <h1 className="mt-5 mb-5 text-8xl font-bold">For you</h1>
      <p className="mb-5">This is the homepage content.</p>
      <div className='w-full mx-auto px-4'>
        <div className="flex flex-wrap justify-start gap-4 w-full px-4">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  )
}

export default HomePage
