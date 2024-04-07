import React from 'react'
import { Link } from 'react-router-dom'

const DocumentCard = ({title, author, upload_date, views, download, pages, slug}) => {
  return (
    <div className='p-2 rounded-lg bg-white flex border h-[200px] w-[820px] gap-5 shadow-sm'>
        <div className='w-[150px] h-full border rounded-xl pt-2'>
            <img src="https://static.vecteezy.com/system/resources/previews/006/692/271/non_2x/document-icon-template-black-color-editable-document-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg" alt="" />
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