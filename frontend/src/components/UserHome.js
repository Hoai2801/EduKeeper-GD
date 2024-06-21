import React, {useEffect, useState} from 'react'
import download from '../assets/download.png'
import view from '../assets/view.jpg'
import love from '../assets/love.png'
import document from '../assets/document.jpg'
import DocumentCard from '../components/DocumentCard';
import {jwtDecode} from "jwt-decode";

const UserHome = () => {
  const token = localStorage.getItem("token");
  let jwt = null;
  if (token !== "undefined" && token !== null) {
    jwt = jwtDecode(token);
  }

  const [totalDownload, setTotalDownload] = useState(0)
  const [totalView, setTotalView] = useState(0)
  const [totalDocument, setTotalDocument] = useState(0)
  const [totalFavorite, setTotalFavorite] = useState(0)

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/documents/count-total-download/' + jwt?.staffCode)
      .then((res) => res.json())
      .then((data) => {
        setTotalDownload(data);
      })
    fetch('http://localhost:8080/api/v1/documents/count-total-view/' + jwt?.staffCode)
      .then((res) => res.json())
      .then((data) => {
        setTotalView(data);
      })
    fetch('http://localhost:8080/api/v1/documents/total-documents/' + jwt?.staffCode)
      .then((res) => res.json())
      .then((data) => {
        setTotalDocument(data);
      })
    fetch('http://localhost:8080/api/v1/favorites/count-total/' + jwt?.staffCode)
        .then((res) => res.json())
        .then((data) => {
            setTotalFavorite(data)
        })
  }, []);
  return (
    <div>
      <div className='flex gap-5 justify-center flex-col lg:flex-row items-center'>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-orange-500 to-orange-300 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng lượt tải về
          </h3>
          <div className='w-[40px] h-[40px] rounded-full overflow-hidden mx-auto my-3'>
            <img src={download} alt="" className='w-full h-full object-center' />
          </div>
          <p className='text-3xl'>{totalDownload}</p>

        </div>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-green-600 to-green-400 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng lượt xem
          </h3>
          <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
            <img src={view} alt="" className='w-full h-full' />
          </div>
          <p className='text-3xl'>{totalView}</p>
        </div>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-purple-600 to-purple-400 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng lượt yêu thích
          </h3>
          <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
            <img src={love} alt="" className='w-full h-full object-center' />
          </div>
          <p className='text-3xl'>{totalFavorite}</p>
        </div>
        <div className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-blue-600 to-blue-400 w-[300px] h-[150px] rounded-lg p-3'>
          <h3 className='text-xl'>
            Tổng tài liệu đã đăng
          </h3>
          <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
            <img src={document} alt="" className='w-full h-full object-center' />
          </div>
          <p className='text-3xl'>{totalDocument}</p>
        </div>

      </div>
      <div className='lg:w-[1262px] mx-auto'>
        <h2 className='text-3xl font-semibold mt-5 mb-3 text-start'>Tiếp tục xem</h2>
        <div className='flex gap-5 w-full py-5 overflow-auto'>
            
        {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
        {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
        {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
        {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
        </div>
      </div></div>
  )
}

export default UserHome