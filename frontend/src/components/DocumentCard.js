import React from 'react'
import { Link } from 'react-router-dom'

const DocumentCard = ({ title, author, upload_date, slug, thumbnail, specialized }) => {
  return (
    <div className='p-3 rounded-lg bg-white flex flex-col border h-[580px] lg:w-[350px] min-w-[350px] gap-5 shadow-sm w-[95%]'>
      <div className='w-full h-[380px] border rounded-xl overflow-hidden'>
        {thumbnail ? <img src={"http://localhost:8080/api/v1/image/" + thumbnail} alt="" className='w-full h-full' /> : <img src="https://via.placeholder.com/150" alt="" />}
      </div>
      <div className='h-[25px] w-full'>
        <Link to={``} className='text-purple-600 text-[16px] font-semibold'>{specialized}</Link>
      </div>
      <Link to={`/document/${slug}`} className='w-full flex flex-col gap-2'>
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
      </Link>
    </div>
  )
}

export default DocumentCard