import React from 'react'
import { Link } from 'react-router-dom'
import docIcon from '../assets/docs.jpg'

const DocumentCard = ({ document }) => {
    return (
        <div className={`p-3 rounded-lg bg-white flex flex-col border w-[330px] h-[600px] gap-5 shadow-sm ${document?._delete ? "hidden" : ""} `}>
            <Link to={`/document/${document?.slug}`}>
                <div className='h-[380px] border rounded-lg overflow-hidden w-[300px]'>
                    {document?.thumbnail ? <img src={"http://localhost:8080/api/v1/images/" + document?.thumbnail} alt="" className='w-full h-full' /> : <img src={docIcon} alt="" className={`w-full h-full`} />}
                </div>
                <div className='h-[50px] w-full pt-2'>
                    {
                        document?.subject ?
                    <Link to={`/search?subject=${document?.subject?.subjectSlug}`} className='text-purple-600 text-[16px] font-semibold'>{document?.subject?.subjectName}</Link>
                    :
                    <Link to={`/search?specialized=${document?.specialized?.specializedSlug}`} className='text-purple-600 text-[16px] font-semibold'>{document?.specialized?.specializedName}</Link>

                    }
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div className='min-h-[45px] h-fit'>
                        <h3 className='font-bold text-blue-500 text-[20px]'>{document?.title}</h3>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='h-10 w-10 rounded-full overflow-hidden'>
                            <img src={"http://localhost:8080/api/v1/images/avatar/" + document?.user_upload.avatar} alt="" className='w-full h-full' />
                        </div>
                        <div>
                            <Link  to={`/profile/${document?.user_upload.staffCode}`} className='text-blue-500'>{document?.user_upload.username}</Link>
                            <p>{document?.upload_date}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default DocumentCard
