import React from 'react'
import { Link } from 'react-router-dom'

const DocumentCard = ({ document }) => {
    return (
        <div className={`p-3 rounded-lg bg-white flex flex-col border h-[580px] lg:w-[350px] min-w-[350px] gap-5 shadow-sm w-[95%]`}>
            <Link to={`/document/${document?.slug}`}>
                <div className='w-full h-[380px] border rounded-xl overflow-hidden'>
                    {document?.thumbnail ? <img src={"http://localhost:8080/api/v1/images/" + document?.thumbnail} alt="" className='w-full h-full' /> : <img src="https://via.placeholder.com/150" alt="" />}
                </div>
                <div className='h-[50px] w-full pt-2'>
                    <Link to={`/search?subject=${document?.subject.subjectSlug}`} className='text-purple-600 text-[16px] font-semibold'>{document?.subject.subjectName}</Link>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div className='min-h-[45px] h-fit'>
                        <h3 className='font-bold text-blue-500 text-[20px]'>{document?.title}</h3>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='h-10 w-10 rounded-full overflow-hidden'>
                            <img src={document?.user_upload.avatar} alt="" className='w-full h-full' />
                        </div>
                        <div>
                            <span className='text-blue-500'>{document?.user_upload.username}</span>
                            <p>{document?.upload_date}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default DocumentCard