import React from 'react'
import { Link } from 'react-router-dom'

const DocumentCard = ({title, author, upload_date, views, download, pages, slug, thumbnail}) => {
  return (
    <div className='p-2 rounded-lg bg-white flex border h-[200px] lg:w-[820px] gap-5 shadow-sm w-[95%]'>
        <div className='w-[150px] h-full border rounded-xl overflow-hidden'>
          {thumbnail ? <img src={"http://localhost:8080/api/v1/image/" + thumbnail} alt="" className='w-full h-full'/> : <img src="https://via.placeholder.com/150" alt="" />}
            {/* <img src={"http://localhost:8080/api/v1/image/" + thumbnail} alt="" /> */}
        </div>
        <Link to={`/document/${slug}`} className='w-full relative'>
            <h3 className='font-bold text-blue-500 text-[20px]'>{title}</h3>
            <div className='absolute bottom-0 left-0'>
                <span className='text-blue-500'>{author}</span>
                | {pages} trang | {upload_date} | {views} views | {download} download
            </div>
        </Link>
    </div>
  )
}

export default DocumentCard