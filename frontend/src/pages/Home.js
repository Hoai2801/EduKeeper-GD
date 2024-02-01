import React from 'react'
import Hero from '../components/Hero'
import Post from '../components/Post'

const Home = () => {
  return (
    <div>
        <Hero />
        {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfOjCiVe8eY0jvXueGf7lGOgOEd5xr2bHbrz7LYqa-6w5KRLw/viewform?embedded=true" width="640" height="1118" frameborder="0" marginheight="0" marginwidth="0">Đang tải…</iframe> */}
        <div className='bg-white rounded-lg w-[1280px] h-fit shadow-lg pt-5 mt-10 flex flex-col p-10'>
          <h2 className='font-bold text-[28px] mb-5'>Tải nhiều nhất</h2>
            <div className='ml-5 flex flex-col gap-5'>
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <div className='flex justify-center'>
                  <button onClick={null} className='text-white bg-blue-300 rounded-md p-4'>Xem thêm</button>
              </div>
            </div>
          <h2 className='font-bold text-[28px]'>Xem nhiều nhất</h2>
          <div className='ml-5 flex flex-col gap-5 mt-5'>
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <div className='flex justify-center'>
                  <button onClick={null} className='text-white bg-blue-300 rounded-md p-4'>Xem thêm</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home