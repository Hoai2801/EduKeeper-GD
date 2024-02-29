import React from 'react'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className='flex justify-between w-full gap-5 p-5'>
            <div className='w-[25%] h-full rounded-lg shadow-lg bg-white'>
                <div className='w-full flex justify-center bg-gray-400 rounded-t-lg'>
                    <p className='font-bold text-xl h-10 mt-4'>Danh mục</p>
                </div>
                <div className='px-10 py-5 flex flex-col gap-3'>
                    <p>Kinh doanh</p>
                    <p>CNTT</p>
                    <p>Khoa học</p>
                    <p>Công nghệ</p>
                    <p>Địa lý</p>
                    <p>Xây dựng</p>
                </div>
            </div>
            <div className='flex justify-center w-full bg-white rounded-lg'>
                <Outlet />
            </div>
        </div>
    )
}

export default SideBar