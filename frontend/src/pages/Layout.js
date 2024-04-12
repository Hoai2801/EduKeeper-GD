import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div>
        <Navbar />
        <div className='bg-slate-200 flex justify-center py-5 min-h-[100vh]'>
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout