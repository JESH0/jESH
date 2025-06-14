import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { Login, Logout } from './store/authSlice';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(Login({ userData }));
        } else {
          dispatch(Logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')",
      }}
    >
      {/* Fixed Left Sidebar */}
      <div clas>
      <Header />
</div>
      {/* Page Content Area */}
     <div className="ml-20 sm:ml-40 md:ml-48 lg:ml-56 xl:ml-64 2xl:ml-72">
  <main>
    <Outlet />
  </main>
  <Footer />
</div>

    </div>
  ) : null;
}

export default App;
