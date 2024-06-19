import React from 'react'
import { Link } from 'react-router-dom'

const DocumentCard = ({ title, author, upload_date, slug, thumbnail, subject }) => {
  return (
    <div className='p-3 rounded-lg bg-white flex flex-col border h-[580px] lg:w-[350px] min-w-[350px] gap-5 shadow-sm w-[95%]'>
      <Link to={`/document/${slug}`}>
        <div className='w-full h-[380px] border rounded-xl overflow-hidden'>
          {thumbnail ? <img src={"http://localhost:8080/api/v1/images/" + thumbnail} alt="" className='w-full h-full' /> : <img src="https://via.placeholder.com/150" alt="" />}
        </div>
        <div className='h-[50px] w-full pt-2'>
          <Link to={`/search?subject=${subject.subjectSlug}`} className='text-purple-600 text-[16px] font-semibold'>{subject.subjectName}</Link>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <div className='min-h-[45px] h-fit'>
            <h3 className='font-bold text-blue-500 text-[20px]'>{title}</h3>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-10 w-10 rounded-full overflow-hidden'>
              <img src={author.avatar} alt="" className='w-full h-full' />
            </div>
            <div>
              <span className='text-blue-500'>{author.username}</span>
              <p>{upload_date}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DocumentCard