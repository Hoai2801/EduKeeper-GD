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
        fetch('http://localhost:8080/api/v1/view-history/top-documents/9', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => res?.json()).then(data => {
            setMostViewed(data)
        })
        fetch('http://localhost:8080/api/v1/documents/most-downloaded?limit=9', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => res?.json()).then(data => setMostDownloaded(data))
        fetch('http://localhost:8080/api/v1/documents/latest?limit=9', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        }).then(res => res?.json()).then(data => {
            setLastedDocuments(data)
        })
        fetch('http://localhost:8080/api/v1/banners', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(res => res?.json())
            .then(data => {
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
            <div className={`w-full h-fit md:h-[600px] ${banner?.length === 0 ? "hidden" : "block"} relative`}>
                {banner?.map((banner, index) => {
                    console.log(banner.url);
                    return (
                    <a href={banner?.url?.includes('http') || banner?.url?.includes('https') ? banner?.url : banner.url !== null ? `https://${banner?.url}` : ''}>
                        <img src={`http://localhost:8080/api/v1/images/banner/${banner.image}`} alt=""
                             className={`w-full object-cover max-h-[300px] md:max-h-[600px] md:w-[1200px] mt-5 md:rounded-lg ${index === indexBanner ? "block" : "hidden"}`}
                        />
                    </a>
                )})}
                    <div className={`w-full flex justify-center ${banner?.length === 0 || banner?.length === 1 ? "hidden" : "block"} flex gap-2 absolute bottom-5 right-0`}>
                        {banner?.map((banner, index) => (
                            <button onClick={() => setIndexBanner(index)} className={`${index === indexBanner ? "bg-gray-700" : "bg-gray-400"} w-3 h-3 rounded-full mt-5`}></button>
                        ))}
                    </div>
            </div>
            <div
                className='bg-white rounded-lg lg:w-[1200px] w-full h-fit shadow-2xl pt-5 mt-10 flex flex-col md:p-10 p-2'>
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