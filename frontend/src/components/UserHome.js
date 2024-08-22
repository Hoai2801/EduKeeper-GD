import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import DocumentCard from "./DocumentCard";
import {JWTContext} from "../App";

const UserHome = () => {
    const [totalViews, setTotalViews] = useState(0);
    const [totalDownloads, setTotalDownloads] = useState(0);
    const [totalFavorites, setTotalFavorites] = useState(0);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [documentsViewed, setDocumentsViewed] = useState(0);
    const userJWT = useContext(JWTContext);

    const location = useParams();

    const staffCode = location?.staff_code;

    useEffect(() => {
        const limit = 10;
        fetch('http://localhost:8080/api/v1/view-history/' + staffCode + '/' + limit)
            .then((res) => res.json())
            .then((data) => {
                if (data?.length > 0) {
                    setDocumentsViewed(data);
                }
            });
    }, [staffCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch total favorites
                let response = await fetch(`http://localhost:8080/api/v1/favorites/author/${staffCode}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                setTotalFavorites(data);

                // Fetch total views
                await fetch(`http://localhost:8080/api/v1/documents/total-views/${staffCode}`)
                    .then(res => res.json())
                    .then(data => setTotalViews(data));


                // Fetch total downloads
                response = await fetch(`http://localhost:8080/api/v1/documents/total-downloads/${staffCode}`);
                data = await response.json();
                setTotalDownloads(data);

                // Fetch total documents
                await fetch(`http://localhost:8080/api/v1/documents/total-documents/${staffCode}`)
                    .then(res => res.text())
                    .then(data => setTotalDocuments(data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className={`p-5 h-full w-full`}>
            <div className='flex gap-5 flex-wrap md:justify-center flex-row md:w-[1050px]'>
                <div
                    className='bg-white shadow-lg py-3 text-center text-gray-500 font-bold md:w-fit w-full xl:w-fit xl:h-[100px] rounded-lg xl:p-3'>
                    <h3 className='xl:text-lg'>
                        Tổng lượt tải về
                    </h3>
                    <p className='xl:text-lg text-sm text-red-400'>{totalDownloads || 0}</p>
                </div>
                <div
                    className='bg-white shadow-lg py-3 text-center text-gray-500 font-bold md:w-fit w-full xl:h-[100px] rounded-lg p-3'>
                    <h3 className='xl:text-lg'>
                        Tổng lượt được xem
                    </h3>
                    <p className='xl:text-lg text-sm text-blue-400'>{totalViews || 0}</p>
                </div>
                <div
                    className='bg-white shadow-lg py-3 text-center text-gray-500 font-bold md:w-fit w-full xl:w-fit xl:h-[100px] rounded-lg p-3'>
                    <h3 className='xl:text-lg'>
                        Tổng được yêu thích
                    </h3>
                    <p className='xl:text-lg text-sm text-pink-400'>{totalFavorites || 0}</p>
                </div>
                <div
                    className='bg-white shadow-lg py-3 text-center text-gray-500 font-bold md:w-fit w-full xl:h-[100px] rounded-lg p-3'>
                    <h3 className='xl:text-lg'>
                        Tổng tài liệu
                    </h3>
                    <p className='xl:text-lg text-sm text-green-400'>{totalDocuments || 0}</p>
                </div>

            </div>
            <div className='lg:w-[1262px] mx-auto'>
                <h2 className='text-3xl font-semibold mt-5 mb-3 text-start'>Lịch sử xem</h2>
                <div className='flex gap-2 lg:w-[1050px] py-5 overflow-x-auto w-full'>
                    {documentsViewed && documentsViewed.length > 0 ? (
                        documentsViewed.slice(0, 10).map(document => (
                            <div className='flex-shrink-0'>
                                <DocumentCard document={document} key={document.id}/>
                            </div>
                        ))
                    ) : (
                        <p className='text-center w-full'>No documents viewed</p>
                    )}
                </div>

            </div>
        </div>
    )
}

export default UserHome
