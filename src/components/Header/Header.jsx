import React, { useState } from 'react';
import { Container, Logo, LogOutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'My posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus }
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.name);
    navigate(item.slug);
  };

  const activeNavItems = navItems.filter(item => item.active);

  return (
    <aside
      className="fixed left-0 h-full bg-red-800/800 backdrop-blur-3xl text-white shadow-lg z-50
                 w-16 sm:w-40 md:w-48 lg:w-56 xl:w-64 2xl:w-82  "
    >
      <div className="p-4 ">
        <div className='mb-20'>
        <Link to="/" >
          <Logo width='100%' />
               
        </Link>
        </div>
        <ul className="flex flex-col space-y-4">
          {activeNavItems.map((item) => (
            <li key={item.name} className="relative group">
              <button
                onClick={() => handleNavigation(item)}
                className={`w-full text-left px-2 sm:px-3 md:px-4 py-2 duration-200 
                  ${
                    activeItem === item.name
                      ? 'text-blue-400'
                      : 'text-white hover:text-blue-400'
                  }
                  text-xs sm:text-sm md:text-base lg:text-lg
                `}
              >
                {item.name}
              </button>
              {/* Blue underline */}
              <div
                className={`absolute bottom-0 left-4 right-4 h-0.5 bg-blue-400 transition-all duration-300
                  ${
                    activeItem === item.name
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }
                `}
              ></div>
            </li>
          ))}
          {authStatus && (
            <li className="relative group">
              <LogOutBtn
             
              />
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Header;
