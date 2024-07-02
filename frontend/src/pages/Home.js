import React, {useEffect, useState} from 'react'
import Post from '../components/DocumentCard'
import {Link} from 'react-router-dom'
import {jwtDecode} from "jwt-decode";

const Home = () => {

    const [mostViewed, setMostViewed] = useState([])

    const [mostDownloaded, setMostDownloaded] = useState([])

    const [lastedDocuments, setLastedDocuments] = useState([])

    const [staffCode, setStaffCode] = useState(null)

    const [banner, setBanner] = useState([])

    const [indexBanner, setIndexBanner] = useState(0)


    const handleNextBanner = () => {
        if (indexBanner < banner?.length - 1) {
            setIndexBanner(indexBanner + 1)
        } else {
            setIndexBanner(0)
        }
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/view-history/top-documents/9').then(res => res?.json()).then(data => {
            setMostViewed(data)
        })
        fetch('http://localhost:8080/api/v1/documents/most-downloaded?limit=9').then(res => res?.json()).then(data => setMostDownloaded(data))
        fetch('http://localhost:8080/api/v1/documents/latest?limit=9').then(res => res?.json()).then(data => {
            setLastedDocuments(data)
        })
        fetch('http://localhost:8080/api/v1/banner')
            .then(res => res?.json())
            .then(data => {
                console.log(data)
                setBanner(data)
            })
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleNextBanner();
        }, 5000);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timeout);
    }, [indexBanner, banner]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== "undefined" && token !== null) {
            const jwt = jwtDecode(token);
            setStaffCode(jwt?.staff_code);
        }
    }, []);

    return (
        <div>
                <div className={`w-full h-[300px] h-[600px]`}>
                    {banner?.map((banner, index) => (
                        <img src={`http://localhost:8080/api/v1/images/banner/${banner.path}`} alt=""
                        className={`w-full object-cover max-h-[300px] md:max-h-[600px] md:w-[1200px] mt-5 rounded-lg ${index === indexBanner ? "block" : "hidden"}`}
                        />
                    ))}
                </div>
            <div className='bg-white rounded-lg lg:w-[1200px] w-full h-fit shadow-2xl pt-5 mt-10 flex flex-col md:p-10 p-2'>
                <h2 className='font-bold text-[28px] mb-5'>Tài liệu mới</h2>
                <div className='lg:ml-5 flex gap-5 overflow-auto flex-wrap justify-center'>
                    {lastedDocuments && lastedDocuments?.map((item, index) => (
                        <div
                            className={`${item.scope === "private" || item.status !== "published" ? "hidden" : item.scope === "student-only" && !staffCode ? "hidden" : "block"}`}>
                            <Post key={index} document={item}/>
                        </div>
                    ))}
                </div>
                {/* button "see more" */}
                <div className='flex justify-center mt-5'>
                    <Link to={`/search?order=lastest&searchTerm=`}
                          className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</Link>
                </div>
                <h2 className='font-bold text-[28px] mb-5'>Tải nhiều nhất tháng này</h2>
                <div className='lg:ml-5 flex gap-5 overflow-auto flex-wrap justify-center'>
                    {mostDownloaded?.map((item, index) => (
                        <div
                            className={`${item.scope === "private" || item.status !== "published" ? "hidden" : item.scope === "student-only" && !staffCode ? "hidden" : "block"}`}>
                            <Post key={index} document={item}/>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center mt-5'>
                    <Link to={`/search?order=mostDownloaded&searchTerm=`}
                          className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</Link>
                </div>
                <h2 className='font-bold text-[28px]'>Xem nhiều nhất tháng này</h2>
                <div className='lg:ml-5 flex gap-5 overflow-auto flex-wrap justify-center'>
                    {mostViewed?.map((item, index) => (
                        <div
                            className={`${item.scope === "private" || item.status !== "published" ? "hidden" : item.scope === "student-only" && !staffCode ? "hidden" : "block"}`}>
                            <Post key={index} document={item}/>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center mt-5'>
                    <Link to={`/search?order=mostViewed&searchTerm=`}
                          className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Xem thêm</Link>
                </div>
            </div>

        </div>
    )
}

export default Home