import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
// asset
import menuIcon from "../assets/menu-hamburge.png";
import bell from "../assets/free-bell-icon-860-thumb.png"
import Notification from "./Notification";
import {JWTContext} from "../App";

const Navbar = () => {

        const jwtDecoded = useContext(JWTContext);

        const [isShowSpecialized, setIsShownSpecialized] = useState(false);
        const [isShowCategory, setIsShownCategory] = useState(false);
        const [isSubMenuShow, setIsSubMenuShown] = useState(false);

        const [searchTerm, setSearch] = useState("");

        const [specialized, setSpecialized] = useState(null);

        const [category, setCategory] = useState(null);

        const [notification, setNotification] = useState([]);
        const [isHasNotification, setIsHasNotification] = useState(null);
        const [isNotificationOpen, setIsNotificationOpen] = useState(false);

        const [user, setUser] = useState(null);

        useEffect(() => {
            fetch("http://localhost:8080/api/v1/specializes/count", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    // filter the specialized that is not locked
                    setSpecialized(data.filter(item => (item.specialized.locked === false && item.specialized.department.locked === false)));
                });

            fetch("http://localhost:8080/api/v1/categories")
                .then((res) => res.json())
                .then((data) => {
                    setCategory(data);
                });
        }, [])

        useEffect(() => {
            if (jwtDecoded?.jwtDecoded) {
                fetch('http://localhost:8080/api/v1/users/' + jwtDecoded?.jwtDecoded?.staff_code)
                    .then((res) => res.json())
                    .then((data) => {
                        setUser(data);
                    });
            }
            if (jwtDecoded?.jwtDecoded && jwtDecoded?.jwtDecoded.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        }, [jwtDecoded?.jwtDecoded]);


        const out = () => {
            setIsShownSpecialized(false);
            setIsShownCategory(false);
            setIsNotificationOpen(false);
        }

        const logout = () => {
            fetch('http://localhost:8080/api/v1/auth/logout', {
                method: 'POST',
            })
                .then((data) => {
                    if (data.status === 200) {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }
                });
        }

        const search = () => {
            localStorage.setItem('search', searchTerm);
            if (localStorage.getItem('search') !== null) {
                window.location.href = `http://localhost/search?filter=&order=lasted`;
            }
        }

        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        const getNotification = () => {
            fetch('http://localhost:8080/api/v1/notifications/user/' + user.staffCode)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    setNotification(data);
                    let uncheckedCount = 0;

                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._check === false) {
                            uncheckedCount++;
                        }

                        // Stop counting if unchecked notifications reach 10
                        if (uncheckedCount >= 10) {
                            setIsHasNotification("9+");
                            break;
                        }
                    }

                    // If the loop completes and there are less than 10 unchecked notifications
                    if (uncheckedCount < 10) {
                        setIsHasNotification(uncheckedCount);
                    }
                });
        }

        const POLLING_INTERVAL = 30000; // 30 seconds
        useEffect(() => {
            if (user) {
                getNotification();
                const intervalId = setInterval(() => {
                    getNotification()

                }, POLLING_INTERVAL);
                return () => clearInterval(intervalId); // Cleanup on component unmount
            }
        }, [user]);

        const checkNotification = () => {
            if (jwtDecoded?.jwtDecoded) {
                fetch('http://localhost:8080/api/v1/notifications/user/checked/' + jwtDecoded?.jwtDecoded.staff_code);
                getNotification();
            }
        }

        function getOnlyName(user_name) {
            const name = user_name.split(" ");
            return name[name.length - 1];
        }

        return (
            <div className="sticky top-0 bg-white z-50" id="navbar" onMouseLeave={() => out()}>
                <div className="h-[85px] w-full p-5 text-black flex justify-center gap-10 shadow-lg">
                    <div className="flex gap-4 lg:w-[250px] h-full min-w-[150px] items-center pl-3">
                        <Link to={"/"} onClick={() => {
                            setIsMobileMenuOpen(false)
                            setIsNotificationOpen(false)
                        }}>
                            <div className="lg:min-w-[135px] min-w-[90px]">
                                <img
                                    src="https://giadinh.edu.vn/upload/photo/logofooter-8814.png"
                                    alt=""
                                    className="md:h-[50px] h-[30px]"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="lg:gap-4 text-[12px] lg:min-w-[450px] hidden lg:flex">
                        <Link
                            to={"/"}
                            className="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5 "
                            onMouseEnter={() => setIsShownSpecialized(false)}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            className="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
                            onMouseEnter={() => {
                                setIsShownSpecialized(true)
                                setIsShownCategory(false)
                            }}
                        >
                            <div className="">
                                <p className="group-hover/department:text-blue-700">
                                    Ngành
                                </p>
                                <div
                                    className={`w-[500px] h-[300px] overflow-y-auto no-scrollbar absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border flex flex-col ${isShowSpecialized ? "" : "hidden"}`}
                                    onMouseLeave={() => setIsShownSpecialized(false)}>
                                    {specialized && specialized.map((item, index) => (
                                        <Link to={`/search?specialized=${item.specialized.specializedSlug}&order=lastest`}
                                              key={index}
                                              className={`py-3 px-5 hover:bg-[#C5D6F8] h-[40px] flex justify-between`}>{item.specialized.specializedName}
                                            <p className="text-[10px]">({item.documentsCount})</p></Link>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        <Link
                            className="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
                            onMouseEnter={() => {
                                setIsShownCategory(true)
                                setIsShownSpecialized(false)
                            }}
                        >
                            <div className="">
                                <p className="group-hover/department:text-blue-700">
                                    Thể loại
                                </p>
                                <div
                                    className={`w-[300px] h-fit absolute top-[85px] translate-x-[-50%] bg-white shadow-lg rounded-lg border flex flex-col ${isShowCategory ? "" : "hidden"}`}
                                    onMouseLeave={() => setIsShownCategory(false)}>
                                    {category && category?.map((item, index) => (
                                        <Link to={`/search?category=${item.categorySlug}&order=lastest`} key={index}
                                              className={`py-3 px-5 hover:bg-[#C5D6F8] rounded-lg`}>{item.categoryName}</Link>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        {jwtDecoded?.jwtDecoded?.role === "ROLE_ADMIN" || jwtDecoded?.jwtDecoded?.role === "ROLE_TEACHER" || jwtDecoded?.jwtDecoded?.role === "ROLE_SUB-ADMIN" ? (
                            <Link
                                to="/upload"
                                className="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5"
                                onMouseEnter={() => setIsShownCategory(false)}
                            >
                                Upload tài liệu
                            </Link>
                        ) : " "}
                    </div>

                    <form className="max-w-md mx-auto w-full md:block hidden min-w-[300px] mt-[-7px]"
                          onKeyDown={(event) => {
                              // press enter make page reload before search
                              if (event.keyCode === 13) {
                                  search();
                                  event.preventDefault();
                              }
                          }}>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                   placeholder="Tìm sách theo tên, chủ đề..." required value={searchTerm}
                                   onChange={(e) => setSearch(e.target.value)}/>
                            <button type="reset" onClick={search}
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Tìm
                            </button>
                        </div>
                    </form>
                    <>
                        <div className="flex gap-5 justify-end w-[300px]">
                            <button onClick={() => {
                                setIsNotificationOpen(!isNotificationOpen)
                            }}
                                    className={`relative`}>
                                <div className={`md:w-8 md:h-8 h-6 w-6 flex`}>
                                    <img src={bell} alt="" className={`w-full h-full`}/>
                                </div>
                                <div
                                    className={`bg-red-500 rounded-full w-fit h-5 absolute text-white p-1 text-[10px] top-0 right-[-10px] ${isHasNotification ? "block" : "hidden"}`}>{isHasNotification}</div>
                            </button>
                            <div
                                className={`${isNotificationOpen ? "block" : "hidden"} z-50 flex flex-col gap-2 absolute top-[85px] md:right-[80px] right-0 bg-white rounded-lg shadow-lg md:w-[400px] w-[90%] h-fit max-h-[300px] overflow-scroll`}
                                onMouseLeave={() => {
                                    setIsNotificationOpen(!isNotificationOpen)
                                    checkNotification()
                                }}
                                onMouseEnter={() => setIsNotificationOpen(true)}
                            >
                                {notification && notification?.length ? notification?.map((item, index) => (
                                    <Notification notification={item}/>
                                )) : <div className={`text-center h-[80px] text-xl text-gray-500 p-5`}>Không có thông báo
                                    nào!</div>}
                            </div>
                            <div className="flex text-center">
                                {jwtDecoded?.jwtDecoded ? (
                                    <div>
                                        <button
                                            onClick={() => {
                                                setIsSubMenuShown(!isSubMenuShow);
                                            }}
                                            className="mt-2 md:flex hidden min-w-[50px]"
                                        >
                                            {/*<p className={`lg:block hidden`}>*/}

                                            {/*Chào {getOnlyName(jwtDecoded?.jwtDecoded?.user_name)}*/}
                                            {/*</p>*/}
                                            <img
                                                src={user && user?.avatar ? "http://localhost:8080/api/v1/images/avatar/" + user?.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                                alt=""
                                                className="w-8 h-8 rounded-full"/>
                                        </button>
                                        <div
                                            className={`bg-white absolute flex flex-col items-center leading-[50px] max-w-[300px] w-[300px] overflow-hidden h-fit top-[90px] right-2 rounded-lg shadow-2xl ${isSubMenuShow ? "absolute" : "hidden"}`}
                                            onMouseLeave={() => setIsSubMenuShown(!isSubMenuShow)}>
                                            <Link to={`/profile/${jwtDecoded?.jwtDecoded?.staff_code}`}
                                                  className="hover:bg-blue-300 w-full h-[50px]">
                                                Trang cá nhân
                                            </Link>
                                            {/*<Link to={`/profile/${jwtDecoded?.jwtDecoded?.staff_code}/setting`}*/}
                                            {/*      className="hover:bg-blue-300 w-full h-[50px]">Cài đặt</Link>*/}
                                            <Link to={`/dashboard/home`}
                                                  className={`${jwtDecoded?.jwtDecoded?.role === "ROLE_ADMIN" || jwtDecoded?.jwtDecoded?.role === "ROLE_SUB-ADMIN" ? "block" : "hidden"} hover:bg-blue-300 w-full h-[50px]`}>
                                                Admin
                                            </Link>
                                            <Link onClick={() => logout()} className="hover:bg-blue-300 w-full h-[50px]">
                                                Đăng xuất
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="w-[100px] text-white pt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-2 md:pl-3 md:py-3 py-1 text-center md:flex hidden"
                                    >
                                        Đăng nhập
                                    </Link>
                                )}
                            </div>
                            {/* mobile menu button */}
                            <div className="lg:hidden w-[55px]">
                                <button onClick={() => {
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                    setIsNotificationOpen(false)
                                }}
                                        className="w-[25px] mt-3">
                                    <img src={menuIcon} alt="" className="w-full"/>
                                </button>
                            </div>
                            <div
                                className={`w-full absolute top-[80px] right-0 h-[90vh] bg-slate-200 ${isMobileMenuOpen ? "flex" : "hidden"}`}>
                                <div className="flex flex-col items-center w-full mt-3 gap-3 px-4">
                                    <div className="relative w-full">
                                        <div
                                            className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search"
                                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                               placeholder="Tìm sách theo tên, chủ đề..." required value={searchTerm}
                                               onChange={(e) => setSearch(e.target.value)}/>
                                        <button type="reset" onClick={search}
                                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Tìm
                                        </button>
                                    </div>
                                    <Link
                                        to={"/"}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        onMouseEnter={() => setIsShownSpecialized(false)}
                                    >
                                        Trang chủ
                                    </Link>
                                    <Link to={`/dashboard/home`}
                                          className={`${jwtDecoded?.jwtDecoded?.role === "ROLE_ADMIN" || jwtDecoded?.jwtDecoded?.role === "ROLE_SUB-ADMIN" ? "block" : "hidden"}`}>
                                        Admin
                                    </Link>
                                    <div className="flex flex-col gap-3 items-center">
                                        <button onClick={() => setIsShownSpecialized(!isShowSpecialized)}
                                                className="group-hover/department:text-blue-700">
                                            Ngành
                                        </button>
                                        <div
                                            className={`w-[90%] h-[300px] overflow-scroll bg-white shadow-lg rounded-lg border flex flex-col ${isShowSpecialized ? "" : "hidden"}`}
                                            onMouseLeave={() => setIsShownSpecialized(false)}>
                                            {specialized && specialized.map((item, index) => (
                                                <Link
                                                    to={`/search?specialized=${item.specialized.specializedSlug}&order=lastest`}
                                                    key={index}
                                                    className={`py-3 px-5 hover:bg-[#C5D6F8] h-[40px] flex justify-between`}
                                                    onClick={() => setIsMobileMenuOpen(false)}>{item.specialized.specializedName}
                                                    <p className="text-[10px]">({item.documentsCount})</p></Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 w-full items-center">
                                        <button onClick={() => setIsShownCategory(!isShowCategory)}
                                                className="group-hover/department:text-blue-700">
                                            Thể loại
                                        </button>
                                        <div
                                            className={`w-[90%] flex flex-col items-center bg-white shadow-lg rounded-lg border ${isShowCategory ? "" : "hidden"}`}
                                            onMouseLeave={() => setIsShownCategory(false)}>
                                            {category && category?.map((item, index) => (
                                                <Link to={`/search?category=${item.categorySlug}&order=lastest`} key={index}
                                                      className={`py-3 px-2 w-full hover:bg-[#C5D6F8] rounded-xl`}
                                                      onClick={() => setIsMobileMenuOpen(false)}>{item.categoryName}</Link>
                                            ))}
                                        </div>
                                    </div>
                                    {jwtDecoded?.jwtDecoded?.role === "ADMIN" ? (
                                        <Link
                                            to="/upload"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Upload tài liệu
                                        </Link>
                                    ) : " "}
                                    {jwtDecoded?.jwtDecoded ? (
                                        <>
                                            <div className="flex flex-col items-center w-full gap-3">
                                                <Link to={`/profile/${jwtDecoded?.jwtDecoded?.staff_code}`}
                                                      onClick={() => setIsMobileMenuOpen(false)}
                                                >Trang cá nhân</Link>
                                                <button onClick={() => {
                                                    logout()
                                                    setIsMobileMenuOpen(false)
                                                }} className="text-left">Đăng xuất
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            to={"/login"}
                                            className="bg-blue-600 px-5 py-3 mt-5 rounded-3xl h-[45px] w-[150px] hover:bg-blue-300 text-white text-center pt-2"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Đăng nhập
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        );
    }
;

export default Navbar;
