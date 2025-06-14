import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { Logout } from '../../store/authSlice';

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(Logout());
    });
  };

  return (
    <div className="relative inline-block">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="px-3 py-1 sm:px-4 sm:py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm md:text-base lg:text-lg"
          aria-label="Logout"
        >
          Log out
        </button>
      ) : (
       <div className="fixed top-0 sm:top-30 inset-0 flex items-center justify-center z-50  bg-gray-800/800 backdrop-blur-3xl  bg-opacity-50 px-2">
  <div className=" bg-gray-800/800 backdrop-blur-3xl  bg-opacity-90  text-white shadow-lg rounded-md 
                  p-4 xs:p-5 sm:p-6
                  w-full max-w-[280px] xs:max-w-[320px] sm:max-w-xs
                  text-xs xs:text-sm sm:text-base
                  mx-auto">
<div className="mt-8 xs:mt-12 sm:mt-6 md:mt-27 flex flex-col space-y-1 xs:space-y-2 sm:space-y-3">

  <button
    onClick={handleLogout}
    className="w-full p-2 flex justify-center text-center border border-red-400 xs:px-3 xs:py-2 sm:px-4 sm:py-3 
              bg-gray-800/800 backdrop-blur-3xl  rounded hover:border-red-600 
               focus:outline-none focus:ring-2 focus:ring-red-500
               text-[10px] xs:text-xs sm:text-sm md:text-base"
  >
    Yes
  </button>
  <button
    onClick={() => setShowConfirm(false)}
    className="w-full p-2 flex justify-center text-center border border-blue-400  xs:px-3 xs:py-2 sm:px-4 sm:py-3 
               bg-gray-800/800 backdrop-blur-3xl rounded  hover:border-blue-600 
               focus:outline-none focus:ring-2 focus:ring-gray-500
               text-[10px] xs:text-xs sm:text-sm md:text-base"
  >
    No
  </button>
</div>

  </div>
</div>

      )}
    </div>
  );
};

export default LogOutBtn;
