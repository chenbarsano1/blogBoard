import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { useSignupMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [signUp, { isLoading }] = useSignupMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.log('Passwords do not match')
    } else {
      try {
        const res = await signUp({ name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        navigate('/')
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-green-50 to-green-100">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        {/* Left Section - Login Description */}
        <div>
          <h2 className="lg:text-5xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">
            Seamless Register for Exclusive Access
          </h2>
          <p className="text-sm mt-6 text-gray-800">
            Immerse yourself in a hassle-free login journey with our intuitively
            designed login form. Effortlessly access your account.
          </p>
          <p className="text-sm mt-12 text-gray-800">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Right Section - Login Form */}
        <form className="max-w-md md:ml-auto w-full" onSubmit={submitHandler}>
          <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
            Register
          </h3>
          <div className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <EnvelopeIcon className="h-5 w-6 text-gray-400 absolute top-3 right-2" />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              {/* Eye Icon for Toggling Password Visibility */}
              <button
                type="button"
                className="absolute cursor-pointer right-2.5 top-4 text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5"/>
                )}
              </button>
            </div>

            {/* Confrim Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4"></div>
            <div className="mt-8">
              <button className="cursor-pointer w-full inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200">
                Sign Up
              </button>
            </div>

            <div className="my-4 flex items-center gap-4">
              <hr className="w-full border-gray-300" />
              <p className="text-sm text-gray-800 text-center">or</p>
              <hr className="w-full border-gray-300" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
