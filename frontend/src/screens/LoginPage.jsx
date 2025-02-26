import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/', { replace: true })
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-green-50 to-green-100">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        {/* Left Section - Login Description */}
        <div>
          <h2 className="lg:text-5xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">
            Seamless Login for Exclusive Access
          </h2>
          <p className="text-sm mt-6 text-gray-800">
            Immerse yourself in a hassle-free login journey with our intuitively
            designed login form. Effortlessly access your account.
          </p>
          <p className="text-sm mt-12 text-gray-800">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Right Section - Login Form */}
        <form className="max-w-md md:ml-auto w-full" onSubmit={submitHandler}>
          <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
            Sign in
          </h3>
          <div className="space-y-6">
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
              <button
                type="button"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-500 font-semibold"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <button className="cursor-pointer w-full inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200">
                Log in
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

export default LoginPage
