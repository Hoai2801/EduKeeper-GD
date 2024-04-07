import React from 'react'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className='flex justify-between w-full gap-5 p-5'>
            <div className='w-[25%] h-full rounded-lg shadow-lg bg-white flex justify-center'>
                Thể loại
                <div>
                </div>
            </div>
            <div className='flex justify-center w-full bg-white rounded-lg'>
                <Outlet />
            </div>
        </div>
    )
}

export default SideBar