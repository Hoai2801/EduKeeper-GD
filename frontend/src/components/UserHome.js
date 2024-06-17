import React from 'react'
import download from '../assets/download.png'
import view from '../assets/view.jpg'
import love from '../assets/love.png'
import document from '../assets/document.jpg'
import DocumentCard from '../components/DocumentCard';

const UserHome = () => {
  return (
    <div>
      <div className='flex gap-5 justify-center'>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-orange-500 to-orange-300 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng lượt tải về
          </h3>
          <div className='w-[40px] h-[40px] rounded-full overflow-hidden mx-auto my-3'>
            <img src={download} alt="" className='w-full h-full object-center' />
          </div>
          <p className='text-3xl'>30</p>
        </div>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-green-600 to-green-400 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng lượt xem
          </h3>
          <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
            <img src={view} alt="" className='w-full h-full' />
          </div>
          <p className='text-3xl'>30</p>
        </div>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-purple-600 to-purple-400 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng lượt yêu thích
          </h3>
          <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
            <img src={love} alt="" className='w-full h-full object-center' />
          </div>
          <p className='text-3xl'>30</p>
        </div>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-blue-600 to-blue-400 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng lượt tài liệu
          </h3>
          <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
            <img src={document} alt="" className='w-full h-full object-center' />
          </div>
          <p className='text-3xl'>30</p>
        </div>

      </div>
      <div className='w-[1262px] mx-auto'>
        <h2 className='text-3xl font-semibold mt-5 mb-3 text-start'>Tiếp tục xem</h2>
        <DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />
      </div></div>
  )
}

export default UserHome