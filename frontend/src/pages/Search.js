import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'

const Search = () => {
  const url = window.location.href;
  const [searchParams, setSearchParams] = useSearchParams();

  // lasted, most download or most views
  const order = searchParams.get('order') || 'lasted';
  const slugSpecialized = searchParams.get('specialized')
  const slugDepartment = searchParams.get('department')
  const slugSubject = searchParams.get('subject')
  const publishYear = searchParams.get('publishYear')
  const category = searchParams.get('category')

  const [documents, setDocument] = useState(null)

  const search = localStorage.getItem('search') || '';

  useEffect(() => {
    
    const data = new FormData()
    data.append('searchTerm', search)

    const api = "http://localhost:8080/api/v1/document/filter?order=" + order
      + (slugSpecialized ? `&specialized=${slugSpecialized}` : '')
      + (slugDepartment ? `&department=${slugDepartment}` : '')
      + (publishYear ? `&publishYear=${publishYear}` : '')
      + (category ? `&category=${category}` : '')
      + (slugSubject ? `&subject=${slugSubject}` : '')
    console.log(api)
    fetch(api, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDocument(data)
        localStorage.removeItem('search')
      });
  }, [url, order, slugSpecialized, slugSubject, publishYear, category])

  const [limit, setLimit] = useState(30)
  const [page, setPage] = useState(1)

  return (
    <div>
      <h2 className='text-[28px] font-bold text-center mt-10 mb-5'>Tài liệu ({documents && documents.length})</h2>
      <div className='my-5 flex flex-col gap-5 h-fit'>
        {documents && documents.map((item, index) => {
          if (index < limit) {
            return (
              <DocumentCard slug={item.slug} title={item.title} author={item.author} views={item.views} download={item.download} upload_date={item.upload_date} key={index} />
            )
          }
        }
        )}
        <button onClick={() => setLimit(limit + 30)} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</button>
      </div>
    </div>
  )
}

export default Search