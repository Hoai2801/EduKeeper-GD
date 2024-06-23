import React, {useEffect, useState} from 'react'
import ProfileSideBar from '../components/ProfileSideBar'
import {Outlet, useParams} from 'react-router-dom'
import {jwtDecode} from "jwt-decode";
const Profile = () => {

    const [jwt, setJwt] = useState(null);
    const [isTrueLegit, setIsTrueLegit] = useState(false);

    const location = useParams();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== "undefined" && token !== null) {
            setJwt(jwtDecode(token));
        }
    }, []);

    useEffect(() => {
        if (jwt) {
            if (location.valueOf("staff_code").staff_code === jwt?.staff_code) {
                setIsTrueLegit(true)
            } else setIsTrueLegit(false)
        }
    }, [jwt, location]);
  return (
    <div className='w-full p-2 flex flex-col lg:flex-row'>
      <ProfileSideBar isTrueLegit={isTrueLegit} jwt={jwt} />
      <div className='p-5'>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile