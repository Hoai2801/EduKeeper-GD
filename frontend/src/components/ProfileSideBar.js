import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import change from '../assets/change.png'
import logout from '../assets/log-out.png'
const ProfileSideBar = () => {
  const [documentMenuShow, setDocumentMenuShow] = useState(false);
  return (
    <div className='w-fit h-fit p-10 bg-white rounded-lg shadow-lg flex flex-col gap-5 items-center align-middle lg:mx-5'>
      <div className='justify-center flex gap-5 w-full mt-5'>
        <div className='relative'>
          <div className='lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] rounded-full overflow-hidden'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" alt="" className='w-full h-full' />
          </div>
          <div className=''>
            <label htmlFor="avatar" className='absolute lg:bottom-0 lg:right-0 right-0 bottom-10 bg-green-300 rounded-lg p-2 cursor-pointer border-white border-4'>
              <img src={change} alt="" className='w-5 h-5' />
            </label>
            <input id="avatar" type="file" className='hidden' />
          </div>
        </div>
        <div className='flex flex-col items-center mt-5'>
          <div className='flex flex-col gap-2'>
            <p className='text-3xl font-semibold'>
              Tang Gia Hoai
            </p>
            <p className='text-gray-500 text-xl'>
              hoai@gmail.com
            </p>
            <p className='text-gray-500'>MSSV: 22140044</p>
          </div>
          {/* <div className='flex items-end h-full gap-2 p-2'>
            <button onClick={null} className='hover:rounded-lg hover:bg-[#C5D6F8] p-2'>
              <img src={logout} alt="" className='w-5 h-5' />
            </button>
          </div> */}
        </div>
      </div>
      <div className='lg:flex flex-col text-lg w-full hidden'>
        <Link className='hover:rounded-xl hover:bg-[#C5D6F8] p-5' to={"/profile"}>
          Tổng quan
        </Link>
        <button onClick={() => setDocumentMenuShow(!documentMenuShow)} className='hover:rounded-xl hover:bg-[#C5D6F8] p-5 text-left'>
        Quản lý tài liệu
        </button>
            <div className={`${documentMenuShow ? "block" : "hidden"} flex flex-col`}>
                <Link className='hover:rounded-xl hover:bg-[#C5D6F8] p-5 ml-10'>Tài liệu đã đăng</Link>
                <Link className='hover:rounded-xl hover:bg-[#C5D6F8] p-5 ml-10'>Tài liệu ưu thích</Link>
            </div>
        <Link to={"information"} className='hover:rounded-xl hover:bg-[#C5D6F8] p-5'>
          Thông tin tài khoản
        </Link>
        <Link to="notification" className='hover:rounded-xl hover:bg-[#C5D6F8] p-5' >
          Thông báo
        </Link>
        <Link to="notification" className='hover:rounded-xl hover:bg-[#C5D6F8] p-5' >
          Cài đặt
        </Link>
        <Link to="notification" className='hover:rounded-xl hover:bg-[#C5D6F8] p-5' >
          Đăng xuất
        </Link>
      </div>
    </div>
  )
}

export default ProfileSideBar