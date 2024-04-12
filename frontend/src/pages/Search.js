import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // lasted, most download or most views
  const hightlight = searchParams.get('highlight');
  const slugSpecialized = searchParams.get('specialized');
  const slugSubject = searchParams.get('subject');
  const publishYear = searchParams.get('publishYear');
  const category = searchParams.get('category');
  // pdf, word, ppt
  const documentType = searchParams.get('documentType');

  const [documents, setDocument] = useState(null)

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/v1/specialized/documents/" + slugSpecialized)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDocument(data)
  //     });
  // }, [slugSpecialized])
  const [title, setTitle] = useState('');
  switch(hightlight) {
    case 'mostViewed': {
      setTitle('Tải nhất nhất')
      break;
    }
    case 'mostDownloaded': {
      setTitle('Tải nhiều nhất')
      break;
    }
    default: {
      setTitle('Tìm kiếm')
    }
  }
  return (
    <div>
      <h2 className='text-[28px] font-bold'>{title} trong tháng</h2>
      <div className='my-5'>
        {documents && documents.map((item, index) =>
          <DocumentCard slug={item.slug} title={item.title} author={item.author} views={item.views} download={item.download} upload_date={item.upload_date} key={index} />
        )}
      </div>
    </div>
  )
}

export default Search