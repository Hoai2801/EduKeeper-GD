import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'

const Specialized = () => {
  const slugSpecialized = useParams().slug
  const [documents, setDocument] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/specialized/documents/" + slugSpecialized)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data)
      });
  }, [slugSpecialized])
  return (
    <div>
      <h2 className='text-[28px] font-bold'>Tải nhiều trong tháng</h2>
      <div className='my-5'>
        {documents && documents.map((item, index) =>
          <DocumentCard slug={item.slug} title={item.title} author={item.author} views={item.views} download={item.download} upload_date={item.upload_date} key={index} />
        )}
      </div>
    </div>
  )
}

export default Specialized