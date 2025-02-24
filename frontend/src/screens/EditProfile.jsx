import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { set } from 'mongoose'

const EditProfile = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
    setUsername(userInfo.username)
  }, [userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.log('Passwords do not match')
    } else {
      try {
        const res = await updateUser({
          data: { name, username, email, password },
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated successfully!')
        navigate('/')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-54 h-54 rounded-full bg-black flex items-center justify-center text-white text-8xl font-bold">
        {userInfo?.name?.charAt(0).toUpperCase()}
      </div>
      <h1 className="text-4xl font-semibold text-center mt-8">
        Edit Your Profile
      </h1>
      <form
        onSubmit={submitHandler}
        className="max-w-md mx-auto w-full mt-8 relative"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none mb-4"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none mb-4"
        />
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none mb-4"
          />
          <button
            type="button"
            className="absolute top-1/3 right-2.5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none mb-4"
        />

        <button
          type="submit"
          className="cursor-pointer mx-auto block mt-4 px-5 py-2 border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default EditProfile
