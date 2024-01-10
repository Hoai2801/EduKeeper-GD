import React from 'react'
import Hero from '../components/Hero'
import Post from '../components/Post'

const Home = () => {
  return (
    <div>
        <Hero />
        <div className='bg-white rounded-lg w-[1280px] h-screen shadow-lg pt-5 mt-10 flex flex-col items-center'>
            <Post />
        </div>
    </div>
  )
}

export default Home