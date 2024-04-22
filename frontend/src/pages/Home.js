import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Post from '../components/DocumentCard'
import { Link } from 'react-router-dom'

const Home = () => {
  const [mostViewed, setMostViewed] = useState([])

  const [mostDownloaded, setMostDownloaded] = useState([])

  const [lastedDocuments, setLastedDocuments] = useState([])

  console.log(lastedDocuments)

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/document/most-viewed?limit=10').then(res => res.json()).then(data => setMostViewed(data))
    fetch('http://localhost:8080/api/v1/document/most-downloaded?limit=10').then(res => res.json()).then(data => setMostDownloaded(data))
    fetch('http://localhost:8080/api/v1/document/lasted?limit=10').then(res => res.json()).then(data => setLastedDocuments(data))
  }, [])

  return (
    <div>
      {/* <Hero /> */}
      {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfOjCiVe8eY0jvXueGf7lGOgOEd5xr2bHbrz7LYqa-6w5KRLw/viewform?embedded=true" width="640" height="1118" frameborder="0" marginheight="0" marginwidth="0">Đang tải…</iframe> */}
      <div className='bg-white rounded-lg lg:w-[1280px] w-full h-fit shadow-lg pt-5 mt-10 flex flex-col p-10'>
        <h2 className='font-bold text-[28px] mb-5'>Tài liệu mới</h2>
        <div className='lg:ml-5 flex flex-col gap-5 items-center'>
          {lastedDocuments.map((item, index) => (
            <Post key={index} title={item.title} author={item.author} upload_date={item.upload_date} views={item.views} download={item.download} pages={item.pages} slug={item.slug} thumbnail={item.thumbnail} />
          ))}
          <div className='flex justify-center'>
            <Link to={`/search?order=lastest&searchTerm=`} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</Link>
          </div>
        </div>
        <h2 className='font-bold text-[28px] mb-5'>Tải nhiều nhất tháng này</h2>
        <div className='ml-5 flex flex-col gap-5 items-center'>
          {mostDownloaded.map((item, index) => (
            <Post key={index} title={item.title} author={item.author} upload_date={item.upload_date} views={item.views} download={item.download} pages={item.pages} slug={item.slug} thumbnail={item.thumbnail} />
          ))}
          <div className='flex justify-center'>
            <Link to={`/search?order=mostDownloaded&searchTerm=`} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</Link>
          </div>
        </div>
        <h2 className='font-bold text-[28px]'>Xem nhiều nhất tháng này</h2>
        <div className='ml-5 flex flex-col gap-5 mt-5 items-center'>
          {mostViewed.map((item, index) => (
            <Post key={index} title={item.title} author={item.author} upload_date={item.upload_date} views={item.views} download={item.download} pages={item.pages} slug={item.slug} thumbnail={item.thumbnail} />
          ))}
          <div className='flex justify-center'>
            <button onClick={null} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home