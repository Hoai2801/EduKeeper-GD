import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'

const Search = () => {
  const url = window.location.href;
  const [searchParams, setSearchParams] = useSearchParams();

  // lasted, most download or most views
  const order = searchParams.get('order');
  const slugSpecialized = searchParams.get('specialized')
  const slugDepartment = searchParams.get('department')
  const slugSubject = searchParams.get('subject')
  const publishYear = searchParams.get('publishYear')
  const category = searchParams.get('category')

  const [documents, setDocument] = useState([])

  const search = localStorage.getItem('search') || '';

  useEffect(() => {

    const dataSearch = {
      searchTerm: search || '',
      subjectName: slugSubject || '',
      categoryName: category || '',
      departmentSlug: slugDepartment || '',
      specializedSlug: slugSpecialized || '',
      order: order
    };

    console.log(dataSearch)


    const api = "http://localhost:8080/api/v1/documents/filter"
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataSearch),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data) {
          setDocument(data)
          setTimeout(() => {
            localStorage.removeItem('search')
          }, 3000)
        }
      });
  }, [url, order, slugSpecialized, slugSubject, publishYear, category])

  const [limit, setLimit] = useState(30)

  return (
    <div>
      <h2 className='text-[28px] font-bold text-center mt-10 mb-5'>Tài liệu ({documents && documents.length})</h2>
      <div className='my-5 flex gap-5 h-fit flex-wrap justify-center'>
        {documents && documents.map((item, index) => {
          if (index < limit) {
            return (
              <DocumentCard slug={item.slug} pages={item.pages} title={item.title} author={item.author} views={item.views} download={item.download} upload_date={item.upload_date} key={index} thumbnail={item.thumbnail} />
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