import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div>
        <Navbar />
        <div className='bg-slate-200 flex justify-center py-5'>
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout