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
  useEffect(() => {

    // fetch("http://localhost:8080/api/v1/document/search/" + hightlight + "/" + slugSpecialized + "/" + slugSubject + "/" + publishYear + "/" + category + "/" + documentType)
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data)
    //   setDocument(data)
    // });

    switch(hightlight) {
    case 'mostViewed': {
      setTitle('Xem nhiều nhất')
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
  }, [])
  
  const [title, setTitle] = useState('');
  
  return (
    <div>
      <h2 className='text-[28px] font-bold'>{title} {slugSpecialized}</h2>
      <div className='my-5'>
        {documents && documents.map((item, index) =>
          <DocumentCard slug={item.slug} title={item.title} author={item.author} views={item.views} download={item.download} upload_date={item.upload_date} key={index} />
        )}
      </div>
    </div>
  )
}

export default Search