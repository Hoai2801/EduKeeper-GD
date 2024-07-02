import React, {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <div className='bg-slate-200'>
        <Navbar />
        <div className=' flex justify-center min-h-[100vh] mb-5'>
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout