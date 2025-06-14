import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {Login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [showPassword, setShowPassword] = useState(false)

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(Login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

  return (
     <div 
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
     
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="w-full max-w-md bg-red-800/800 backdrop-blur-sm rounded-xl p-8 border border-gray-600 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">create account to Signup</h2>
        
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-5 text-white">
          <Input
            className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
          
          <Input
            className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
              }
            })}
          />
          
          <div className="relative">
            <Input
              className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent pr-8"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-0 h-full px-2 text-gray-400 hover:text-white focus:outline-none"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-white hover:bg-gray-200 text-black font-medium rounded-lg"
          >
            Create Account
          </button>
          
          <div className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-blue-400 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup