import React, { useEffect, useState } from 'react'
import Post from '../components/DocumentCard'
import { Link } from 'react-router-dom'
import {jwtDecode} from "jwt-decode";

const Home = () => {
  const [mostViewed, setMostViewed] = useState([])

  const [mostDownloaded, setMostDownloaded] = useState([])

  const [lastedDocuments, setLastedDocuments] = useState([])

  const [staffCode, setStaffCode] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/documents/most-viewed?limit=10').then(res => res?.json()).then(data => setMostViewed(data))
    fetch('http://localhost:8080/api/v1/documents/most-downloaded?limit=10').then(res => res?.json()).then(data => setMostDownloaded(data))
    fetch('http://localhost:8080/api/v1/documents/latest?limit=10').then(res => res?.json()).then(data => {
      console.log(data)
      setLastedDocuments(data)
    })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "undefined" && token !== null) {
      const jwt = jwtDecode(token);
      setStaffCode(jwt?.staff_code);
    }
  }, []);


  return (
    <div>
      <div className='bg-white rounded-lg lg:w-[1200px] w-full h-fit shadow-2xl pt-5 mt-10 flex flex-col p-10'>
        <h2 className='font-bold text-[28px] mb-5'>Tài liệu mới</h2>
        <div className='lg:ml-5 flex gap-5 overflow-auto flex-wrap justify-center'>
          {lastedDocuments && lastedDocuments?.map((item, index) => (
              <div className={`${item.scope === "private" ? "hidden" : item.scope === "student-only" && !staffCode ? "hidden" : "block"}`}>

            <Post key={index} document={item} />
              </div>
          ))}
        </div>
          {/* button "see more" */}
          <div className='flex justify-center mt-5'>
            <Link to={`/search?order=lastest&searchTerm=`} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</Link>
          </div>
        <h2 className='font-bold text-[28px] mb-5'>Tải nhiều nhất tháng này</h2>
        <div className='ml-5 flex flex-col gap-5 items-center'>
          {mostDownloaded?.map((item, index) => (
            <Post key={index} title={item.title} author={item.author} upload_date={item.upload_date} slug={item.slug} thumbnail={item.thumbnail} 
            subject={item.subject}
            
            // specialized={item.specialized.specializedName} specializedSlug={item.specialized.specializedSlug}
             />
          ))}
          <div className='flex justify-center'>
            <Link to={`/search?order=mostDownloaded&searchTerm=`} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</Link>
          </div>
        </div>
        <h2 className='font-bold text-[28px]'>Xem nhiều nhất tháng này</h2>
        <div className='ml-5 flex flex-col gap-5 mt-5 items-center'>
          {mostViewed?.map((item, index) => (
            <Post key={index} title={item.title} author={item.author} upload_date={item.upload_date} slug={item.slug} thumbnail={item.thumbnail} 
            subject={item.subject}
            
            // specialized={item.specialized.specializedName} specializedSlug={item.specialized.specializedSlug} 
            />
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