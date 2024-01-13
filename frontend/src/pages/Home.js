import React from 'react'
import Hero from '../components/Hero'
import Post from '../components/Post'

const Home = () => {
  return (
    <div>
        <Hero />
        <div className='bg-white rounded-lg w-[1280px] h-fit shadow-lg pt-5 mt-10 flex flex-col p-10'>
          <h2 className='font-bold text-[28px] mb-5'>Tải nhiều nhất</h2>
            <div className='ml-5 flex flex-col gap-5'>
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          <h2 className='font-bold text-[28px]'>Xem nhiều nhất</h2>
        </div>
    </div>
  )
}

export default Home