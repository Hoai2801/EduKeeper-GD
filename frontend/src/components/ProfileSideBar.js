import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import change from '../assets/change.png'
import ChangePassword from "./ChangePassword";

const ProfileSideBar = ({isTrueLegit, jwt}) => {
    const [documentMenuShow, setDocumentMenuShow] = useState(false);
    const [documentMobileShow, setDocumentMobileShow] = useState(false);
    const [user, setUser] = useState(null);

    const [avatar, setAvatar] = useState(null);

    const [isChangePassword, setIsChangePassword] = useState(false);

    useEffect(() => {
        if (avatar) {
            const formData = new FormData();
            formData.append('avatar', avatar);
            let isTrue = window.confirm("Bạn có muốn thay đổi ảnh đại diện?");
            if (isTrue) {
                fetch("http://localhost:8080/api/v1/users/avatar/" + user.staffCode, {
                    method: "POST",
                    body: formData
                })
                    .then((res) => res.text())
                    .then((data) => {
                        console.log(data)
                        alert(data)
                    })
            }
        }
    }, [avatar]);

    const out = () => {
        fetch('http://localhost:8080/api/v1/auth/logout', {
            method: 'POST',
            credentials: 'include',
        }).then((data) => {
            if (data.status === 200) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        })
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    const location = useParams().valueOf("staff_code");
    useEffect(() => {
        console.log(jwt)
        if (location.staff_code !== jwt?.staff_code) {
            fetch('http://localhost:8080/api/v1/users/' + location.staff_code)
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                })
        }
    }, [location]);

    return (
        <div
            className='xl:w-fit w-full h-fit p-10 bg-white rounded-lg shadow-lg flex flex-col gap-5 items-center align-middle lg:mx-5'>
            <div className='justify-center items-center flex flex-col md:flex-row gap-5 w-full mt-5 relative'>
                <button className={`border border-gray-500 p-2 rounded-lg w-fit absolute top-0 right-0 lg:hidden z-20`}
                        onClick={() => {
                            setDocumentMobileShow(!documentMobileShow)
                        }}>
                    ...
                </button>
                <div
                    className={`absolute top-10 right-0 bg-white shadow-lg rounded-lg p-5 z-50 flex flex-col lg:hidden ${documentMobileShow ? "" : "hidden"}`}>
                    <Link
                        to={`/profile/${location.staff_code}`}
                        className='hover:rounded-xl hover:bg-[#C5D6F8] p-5'
                        onClick={() => setDocumentMobileShow(!documentMobileShow)}
                    >
                        Tổng quan
                    </Link>
                    <button onClick={() => setDocumentMenuShow(!documentMenuShow)}
                            className='hover:rounded-xl hover:bg-[#C5D6F8] p-5 text-left'>
                        Quản lý tài liệu
                    </button>
                    <div className={`${documentMenuShow ? "block" : "hidden"} flex flex-col`}>
                        <Link to="document/upload"
                              className={`hover:rounded-xl hover:bg-[#C5D6F8] p-5 ml-10`}
                              onClick={() => setDocumentMobileShow(!documentMobileShow)}
                        >
                            Tài liệu đã đăng</Link>
                        <Link
                            to="document/favorite"
                            className='hover:rounded-xl hover:bg-[#C5D6F8] p-5 ml-10'
                            onClick={() => setDocumentMobileShow(!documentMobileShow)}
                        >
                            Tài liệu ưu thích
                        </Link>
                    </div>
                    <button
                            onClick={() => setIsChangePassword(!isChangePassword)}
                          className={`hover:rounded-xl text-left hover:bg-[#C5D6F8] p-5 ${!isTrueLegit ? "hidden" : ""}`}
                    >
                        Đổi mật khẩu
                    </button>
                    <Link to="information"
                          className={`hover:rounded-xl hover:bg-[#C5D6F8] p-5 ${!isTrueLegit ? "hidden" : ""}`}
                          onClick={() => setDocumentMobileShow(!documentMobileShow)}
                    >
                        Thông tin tài khoản
                    </Link>
                    <button onClick={() => out()}
                            className={`hover:rounded-xl hover:bg-[#C5D6F8] text-left p-5 ${!isTrueLegit ? "hidden" : ""}`}>
                        Đăng xuất
                    </button>
                </div>
                <div className='flex flex-col items-center justify-center relative w-[160px] mx-auto'>
                    <div className='lg:w-[150px] lg:h-[150px] w-[150px] h-[150px] rounded-full overflow-hidden'>
                        <img
                            src={user && user?.avatar ? "http://localhost:8080/api/v1/images/avatar/" + user?.avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s"}
                            alt="" className='w-full h-full object-cover'/>
                        <div className={`${!isTrueLegit && 'hidden'} z-50`}>
                            <label htmlFor="avatar"
                                   className='absolute lg:bottom-0 lg:right-0 right-[90px] bottom-0 bg-green-300 rounded-lg p-2 cursor-pointer border-white border-4'>
                                <img src={change} alt="" className='w-5 h-5'/>
                            </label>
                            <input id="avatar" type="file" className='hidden'
                                   onChange={(e) => setAvatar(e.target.files[0])}/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center mt-5'>
                    <div className='flex flex-col gap-2 w-full text-center md:text-left'>
                        <p className='sm:text-3xl font-semibold items-center text-xl'>
                            {user?.username}
                        </p>
                        <p className='text-gray-500 sm:text-xl hidden md:block'>
                            {user?.email}
                        </p>
                        <p className='text-gray-500'>Mã số: {user?.staffCode}</p>
                    </div>
                </div>
            </div>
            <div className='lg:flex flex-col text-lg w-full hidden'>
                <Link to={`/profile/${location.staff_code}`} className='hover:rounded-xl hover:bg-[#C5D6F8] p-5'>
                    Tổng quan
                </Link>
                <button onClick={() => setDocumentMenuShow(!documentMenuShow)}
                        className='hover:rounded-xl hover:bg-[#C5D6F8] p-5 text-left'>
                    Quản lý tài liệu
                </button>
                <div className={`${documentMenuShow ? "block" : "hidden"} flex flex-col`}>
                    <Link to="document/upload"
                          className={`hover:rounded-xl hover:bg-[#C5D6F8] p-5 ml-10 ${user}`}>
                        Tài liệu đã đăng
                    </Link>
                    <Link to="document/favorite" className='hover:rounded-xl hover:bg-[#C5D6F8] p-5 ml-10'>
                        Tài liệu ưu thích
                    </Link>
                </div>
                <button onClick={() => setIsChangePassword(prevState => !prevState)}
                      className={`hover:rounded-xl hover:bg-[#C5D6F8] text-left p-5 ${!isTrueLegit ? "hidden" : ""}`}>
                    Đổi mật khẩu
                </button>
                <Link to="information"
                      className={`hover:rounded-xl hover:bg-[#C5D6F8] p-5 ${!isTrueLegit ? "hidden" : ""}`}>
                    Thông tin tài khoản
                </Link>
                <button onClick={() => out()}
                        className={`hover:rounded-xl hover:bg-[#C5D6F8] text-left p-5 ${!isTrueLegit ? "hidden" : ""}`}>
                    Đăng xuất
                </button>
            </div>
            <div className={`w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center bg-gray-500/50 ${isChangePassword ? "block" : "hidden"}`}>
                <ChangePassword setIsChangePassword={setIsChangePassword} staffCode={user?.staffCode}/>
            </div>
        </div>
    )
}

export default ProfileSideBar
