import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
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