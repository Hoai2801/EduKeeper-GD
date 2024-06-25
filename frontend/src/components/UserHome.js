import React, {useEffect, useState} from 'react'
import download from '../assets/download.png'
import view from '../assets/view.jpg'
import love from '../assets/love.png'
import document from '../assets/document.jpg'
import {jwtDecode} from "jwt-decode";
import {useLocation, useParams} from "react-router-dom";
import DocumentCard from "./DocumentCard";

const UserHome = () => {
    const [totalViews, setTotalViews] = useState(0);
    const [totalDownloads, setTotalDownloads] = useState(0);
    const [totalFavorites, setTotalFavorites] = useState(0);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [jwt, setJwt] = useState(null);
    const [staffCode, setStaffCode] = useState(null);

    const [favoriteDocuments, setFavoriteDocuments] = useState(null);

    const location = useParams();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== "undefined" && token !== null) {
            setJwt(jwtDecode(token));
        }

        fetch('http://localhost:8080/api/v1/view-history/' + location.valueOf("staff_code").staff_code + '/10')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setFavoriteDocuments(data);
            })
    }, []);

    useEffect(() => {
        if (jwt) {
            if (location.valueOf("staff_code").staff_code === jwt?.staff_code) {
                setStaffCode(jwt?.staff_code);
            } else setStaffCode(location.valueOf("staff_code").staff_code);
        }
    }, [jwt, location]);

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
                response = await fetch(`http://localhost:8080/api/v1/documents/total-views/${staffCode}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
                setTotalViews(data);

                // Fetch total downloads
                response = await fetch(`http://localhost:8080/api/v1/documents/total-downloads/${staffCode}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
                setTotalDownloads(data);

                // Fetch total documents
                response = await fetch(`http://localhost:8080/api/v1/documents/total-documents/${staffCode}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
                setTotalDocuments(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [staffCode]);
    return (
        <div>
            <div className='flex gap-5 lg:justify-center flex-wrap flex-row w-full'>
                <div
                    className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-orange-500 to-orange-300 w-[300px] h-[150px] rounded-lg p-3'>
                    <h3 className='text-xl'>
                        Tổng lượt tải về
                    </h3>
                    <div className='w-[40px] h-[40px] rounded-full overflow-hidden mx-auto my-3'>
                        <img src={download} alt="" className='w-full h-full object-center'/>
                    </div>
                    <p className='text-3xl'>{totalDownloads || 0}</p>
                </div>
                <div
                    className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-green-600 to-green-400 w-[300px] h-[150px] rounded-lg p-3'>
                    <h3 className='text-xl'>
                        Tổng lượt được xem
                    </h3>
                    <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
                        <img src={view} alt="" className='w-full h-full'/>
                    </div>
                    <p className='text-3xl'>{totalViews || 0}</p>
                </div>
                <div
                    className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-purple-600 to-purple-400 w-[300px] h-[150px] rounded-lg p-3'>
                    <h3 className='text-xl'>
                        Tổng được yêu thích
                    </h3>
                    <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
                        <img src={love} alt="" className='w-full h-full object-center'/>
                    </div>
                    <p className='text-3xl'>{totalFavorites || 0}</p>
                </div>
                <div
                    className='bg-transparent text-center text-white font-bold bg-gradient-to-r from-blue-600 to-blue-400 w-[300px] h-[150px] rounded-lg p-3'>
                    <h3 className='text-xl'>
                        Tổng tài liệu
                    </h3>
                    <div className='w-[40px] h-[40px] rounded-full mx-auto my-3 overflow-hidden'>
                        <img src={document} alt="" className='w-full h-full object-center'/>
                    </div>
                    <p className='text-3xl'>{totalDocuments || 0}</p>
                </div>

            </div>
            <div className='lg:w-[1262px] mx-auto'>
                <h2 className='text-3xl font-semibold mt-5 mb-3 text-start'>Lịch sử xem</h2>
                <div className='flex gap-5 w-full py-5 overflow-auto'>
                    {
                        favoriteDocuments?.map((document) => (
                            <DocumentCard document={document} key={document.id}/>
                        ))
                    }
                    {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
                    {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
                    {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
                    {/*<DocumentCard title="Tiêu đề" author={{ username: "Tang Gia Hoai", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s" }} upload_date="01/01/2022" slug="abc" />*/}
                </div>
            </div>
        </div>
    )
}

export default UserHome