import React, { useState } from 'react';
import { Container, Logo, LogOutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const activeNavItems = navItems.filter(item => item.active);

  return (
    <header className="fixed top-0 left-0 w-full py-3 shadow text-white z-50 bg-red-800/800 backdrop-blur-sm">

      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70" className="w-12 md:w-16 lg:w-20" />
            </Link>
          </div>

          <div className="md:hidden mr-2">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none" aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex ml-auto items-center">
            {activeNavItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <li className="relative group">
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`px-6 py-2 text-base duration-200 ${
                      activeItem === item.name
                        ? 'text-blue-400'
                        : 'text-white hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </button>
                  <div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-400 transition-all duration-300 ${
                      activeItem === item.name
                        ? 'w-4/5 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-100'
                    }`}
                  ></div>
                </li>
                {index < activeNavItems.length - 1 && (
                  <li className="h-6 w-px bg-gray-600 mx-1"></li>
                )}
              </React.Fragment>
            ))}
            {authStatus && (
              <>
                <li className="h-6 w-px bg-gray-600 mx-1"></li>
                <li className="relative group">
                  <LogOutBtn className="hover:text-red-400" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-400 transition-all duration-300 w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-100"></div>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 rounded-2xl bg-gray-800/50 border border-amber-50 backdrop-blur-3xl py-2 px-6 shadow-lg">
              <ul className="flex flex-col divide-y ">
                {activeNavItems.map((item) => (
                  <li key={item.name} className="relative group">
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`w-full text-left px-4 py-4 ${
                        activeItem === item.name
                          ? 'text-blue-400'
                          : 'text-white hover:text-blue-400 active:text-amber-300'
                      }`}
                    >
                      {item.name}
                    </button>
                    <div
                      className={`absolute bottom-2 left-4 h-0.5 bg-blue-400 transition-all duration-300 ${
                        activeItem === item.name
                          ? 'w-[calc(100%-2rem)] opacity-100'
                          : 'w-0 opacity-0 group-hover:w-[calc(100%-2rem)] group-hover:opacity-100'
                      }`}
                    ></div>
                  </li>
                ))}
                {authStatus && (
                  <li className="relative group">
                    <LogOutBtn className="w-full text-left px-4 py-4 hover:text-red-400" />
                    <div className="absolute bottom-2 left-4 h-0.5 bg-red-400 transition-all duration-300 w-0 opacity-0 group-hover:w-[calc(100%-2rem)] group-hover:opacity-100"></div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
