import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
        const [showPassword, setShowPassword] = useState(false)

    const login = async(data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

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
            <div className="w-full max-w-md mx-auto bg-red-800/800 backdrop-blur-2xl rounded-xl shadow-md overflow-hidden p-6 sm:p-8 md:p-10 border border-gray-600">
          
                
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-2">
                    Login to your account
                </h2>
                
                <p className="text-center text-sm sm:text-base text-white mb-6">
                    Don't have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                    >
                        Sign Up
                    </Link>
                </p>
                
                {error && (
                    <p className="text-red-500 text-sm sm:text-base text-center mb-4 p-2 bg-red-50 rounded">
                        {error}
                    </p>
                )}
                
                <form onSubmit={handleSubmit(login)} className="space-y-4 sm:space-y-5 text-white">
                 <Input
  className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent"
  placeholder="Enter your email"
  type="email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: "Please enter a valid email address"
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
                    
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-2 bg-white text-black sm:py-3 text-sm sm:text-base"
                        >
                            Login
                        </button>
                    </div>
                    
                    <div className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                        <Link 
                            to="/forgot-password" 
                            className="text-white hover:text-gray-200"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;