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
          className=" px-4 py-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 "
          aria-label="Logout"
        >
          Log out
        </button>
      ) : (
    <div className="relative inline-block">
  <button
    onClick={() => setShowConfirm(true)}
    className="logout-button-class"
  >
    Logout
  </button>

  {showConfirm && (
  <div className="absolute right-0 ml-5 z-50  text-white  py-3 rounded-md shadow-md text-sm">
  <div className="flex flex-col md:flex-row md:justify-start space-y-2 md:space-y-0 md:space-x-2">
    <button
      onClick={handleLogout}
      className="w-full md:w-auto flex justify-center items-center px-6 py-2 border border-red-400 bg-red-800/80 rounded hover:border-red-600 text-xs"
    >
      Yes
    </button>
    <button
      onClick={() => setShowConfirm(false)}
      className="w-full md:w-auto flex justify-center items-center px-6 py-2 border border-blue-400 bg-blue-800/80 rounded hover:border-blue-600 text-xs"
    >
      No
    </button>
  </div>
</div>

  )}
</div>


      )}
    </div>
  );
};

export default LogOutBtn;
