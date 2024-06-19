import React from 'react'
import ProfileSideBar from '../components/ProfileSideBar'
import { Outlet } from 'react-router-dom'
const Profile = () => {

  return (
    <div className='w-full p-2 flex flex-col lg:flex-row'>
      <ProfileSideBar />
      <div className='p-5'>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile