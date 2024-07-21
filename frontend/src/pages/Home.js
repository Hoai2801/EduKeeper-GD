import React, {useContext, useEffect, useState} from 'react'
import Post from '../components/DocumentCard'
import {Link} from 'react-router-dom'
import {jwtDecode} from "jwt-decode";
import Banner from "../components/Banner";
import {JWTContext} from "../App";

const Home = () => {

    const [mostViewed, setMostViewed] = useState([])

    const [mostDownloaded, setMostDownloaded] = useState([])

    const [lastedDocuments, setLastedDocuments] = useState([])

    const context = useContext(JWTContext);
    const staffCode = context?.jwtDecoded?.staff_code;

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
            console.log(data)
            setLastedDocuments(data)
        })
    }, [])



    return (
        <div>
            <div className={`w-full h-fit relative`}>
                <Banner />
            </div>
            <div
                className='bg-white rounded-lg lg:w-[1200px] w-full h-fit shadow-2xl pt-5 mt-10 flex flex-col md:p-10 p-2 gap-10 pb-10'>
                <h2 className='font-bold text-[28px] mb-5'>Tài liệu mới</h2>
                <div className='lg:ml-5 flex gap-5 overflow-auto flex-wrap justify-center'>
                    {lastedDocuments && lastedDocuments?.map((item, index) => (
                        <div
                            className={`${item.scope === "private" && !staffCode || item.status !== "published" ? "hidden" : item.scope === "student-only" && !staffCode ? "hidden" : "block"}`}>
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