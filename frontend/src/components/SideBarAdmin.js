import {React, useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import  backup  from "../assets/data-backup-128.png";

const SideBarAdmin = () => {
    const [documentsDraft, setDocumentsDraft] = useState([]);

    const POLLING_INTERVAL = 30000; // 30 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch('http://localhost:8080/api/v1/documents/count-draft')
                .then((res) => res.text())
                .then((data) => {
                    setDocumentsDraft(data);
                })
        }, POLLING_INTERVAL);
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/documents/count-draft')
            .then((res) => res.text())
            .then((data) => {
                setDocumentsDraft(data);
            })
    }, []);

    return (
        <aside
            className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            <div className="relative border-b border-white/20">
                <a className="flex items-center gap-4 py-6 px-8" href="/">
                    <h6 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-relaxed text-white">
                        EduKeeper
                    </h6>
                </a>
                <button
                    className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                    type="button"
                >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-white"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
                </button>
            </div>

            {/* sidebar */}

            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to={"home"}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-5 h-5 text-inherit"
                            >
                                <path
                                    d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                <path
                                    d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                dashboard
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="users"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-5 h-5 text-inherit"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Tài khoản
                            </p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="department"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-5 h-5 text-inherit"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Khoa, Ngành
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="subject"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-5 h-5 text-inherit"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Môn
                            </p>
                        </NavLink>
                    </li>
                    {/* <li>
            <a className="" href="#">
              <button
                className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  notifactions
                </p>
              </button>
            </a>
          </li> */}

                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="document"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-5 h-5 text-inherit"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>

                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Tài liệu
                                <p>{documentsDraft ? `(${documentsDraft} đang chờ duyệt)` : ''}</p>
                            </p>
                        </NavLink>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="banner"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-5 h-5 text-inherit"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>

                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Banner
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="backup"
                        >
                            <img src={backup} alt="" className={`w-6 h-6`}/>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Sao lưu dữ liệu
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="setting"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30"
                                 viewBox="0,0,300,150">
                                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1"
                                   stroke-linecap="butt"
                                   stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
                                   stroke-dashoffset="0"
                                   font-family="none" font-weight="none" font-size="none" text-anchor="none"
                                >
                                    <g transform="scale(5.12,5.12)">
                                        <path
                                            d="M22.20508,2c-0.48953,0.00026 -0.90693,0.35484 -0.98633,0.83789l-0.97266,5.95508c-1.16958,0.34023 -2.28485,0.7993 -3.33594,1.37109l-4.91406,-3.50977c-0.39728,-0.28369 -0.94131,-0.23911 -1.28711,0.10547l-3.89062,3.88672c-0.3432,0.34344 -0.39015,0.88376 -0.11133,1.28125l3.45703,4.94531c-0.58061,1.05722 -1.04985,2.17878 -1.39844,3.35938l-5.92969,0.98633c-0.4815,0.0811 -0.83404,0.49805 -0.83398,0.98633v5.5c-0.00088,0.48518 0.3466,0.901 0.82422,0.98633l5.93359,1.05078c0.3467,1.17855 0.81296,2.30088 1.39453,3.35937l-3.5,4.89648c-0.28369,0.39728 -0.23911,0.94131 0.10547,1.28711l3.88867,3.89063c0.34265,0.34275 0.88175,0.39048 1.2793,0.11328l4.95508,-3.46875c1.05419,0.57517 2.17218,1.03762 3.3457,1.38086l0.99023,5.96289c0.08025,0.48228 0.49742,0.83584 0.98633,0.83594h5.5c0.4858,0.00071 0.90184,-0.34778 0.98633,-0.82617l1.06055,-5.98633c1.16868,-0.3485 2.28142,-0.8178 3.33008,-1.39648l4.98828,3.5c0.39749,0.27882 0.93781,0.23187 1.28125,-0.11133l3.88867,-3.89258c0.34612,-0.34687 0.38995,-0.89343 0.10352,-1.29102l-3.55664,-4.9375c0.56867,-1.04364 1.02681,-2.14972 1.36719,-3.31055l6.01758,-1.05469c0.47839,-0.08448 0.82689,-0.50053 0.82617,-0.98633v-5.5c-0.00026,-0.48953 -0.35484,-0.90693 -0.83789,-0.98633l-6.00781,-0.98242c-0.34266,-1.15945 -0.80206,-2.26356 -1.37109,-3.30664l3.50781,-4.99805c0.27882,-0.39749 0.23187,-0.93781 -0.11133,-1.28125l-3.89062,-3.88867c-0.34687,-0.34612 -0.89343,-0.38995 -1.29102,-0.10352l-4.92383,3.54102c-1.04908,-0.57636 -2.16255,-1.04318 -3.33398,-1.38867l-1.04687,-5.98437c-0.08364,-0.47917 -0.49991,-0.82867 -0.98633,-0.82812zM23.05664,4h3.80859l0.99609,5.68555c0.06772,0.38959 0.35862,0.70269 0.74219,0.79883c1.46251,0.36446 2.83609,0.94217 4.08984,1.70117c0.34265,0.20761 0.77613,0.1907 1.10156,-0.04297l4.67969,-3.36328l2.69336,2.69336l-3.33203,4.74805c-0.22737,0.3236 -0.24268,0.75079 -0.03906,1.08984c0.75149,1.25092 1.32146,2.61583 1.68555,4.07031c0.0969,0.38717 0.41473,0.67966 0.80859,0.74414l5.70703,0.93359v3.80859l-5.71875,1.00391c-0.3899,0.06902 -0.70237,0.36157 -0.79687,0.74609c-0.35988,1.45263 -0.93019,2.8175 -1.68164,4.06836c-0.20617,0.34256 -0.18851,0.775 0.04492,1.09961l3.37891,4.68945l-2.69336,2.69531l-4.74023,-3.32617c-0.32527,-0.22783 -0.75452,-0.24163 -1.09375,-0.03516c-1.24752,0.75899 -2.62251,1.33943 -4.08008,1.70898c-0.38168,0.09622 -0.67142,0.40737 -0.74023,0.79492l-1.00977,5.6875h-3.81445l-0.94141,-5.66211c-0.06549,-0.39365 -0.35874,-0.7107 -0.74609,-0.80664c-1.46338,-0.36069 -2.84314,-0.93754 -4.10547,-1.69531c-0.33857,-0.20276 -0.76473,-0.18746 -1.08789,0.03906l-4.70312,3.29492l-2.69531,-2.69922l3.32422,-4.64648c0.23221,-0.3254 0.24834,-0.75782 0.04102,-1.09961c-0.76602,-1.26575 -1.34535,-2.6454 -1.71094,-4.11523c-0.09555,-0.38244 -0.40684,-0.67307 -0.79492,-0.74219l-5.63086,-1v-3.81445l5.62695,-0.93555c0.39312,-0.06519 0.71002,-0.35754 0.80664,-0.74414c0.36873,-1.4749 0.94778,-2.85432 1.71094,-4.11719c0.20562,-0.33876 0.19183,-0.76697 -0.03516,-1.0918l-3.28516,-4.69531l2.69727,-2.69531l4.66211,3.33203c0.32413,0.23112 0.75447,0.248 1.0957,0.04297c1.25566,-0.75415 2.63862,-1.32636 4.10352,-1.68555c0.38927,-0.09584 0.68369,-0.41486 0.74805,-0.81055zM25,17c-4.40643,0 -8,3.59357 -8,8c0,4.40643 3.59357,8 8,8c4.40643,0 8,-3.59357 8,-8c0,-4.40643 -3.59357,-8 -8,-8zM25,19c3.32555,0 6,2.67445 6,6c0,3.32555 -2.67445,6 -6,6c-3.32555,0 -6,-2.67445 -6,-6c0,-3.32555 2.67445,-6 6,-6z"></path>
                                    </g>
                                </g>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Cài đặt
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isPending
                                    ? "pending"
                                    : isActive
                                        ? "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                                        : "middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                            }
                            to="deleted"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                 viewBox="0,0,256,256">
                                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1"
                                   stroke-linecap="butt"
                                   stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
                                   stroke-dashoffset="0"
                                   font-family="none" font-weight="none" font-size="none" text-anchor="none"
                                   style={{"mix-blend-mode": "normal"}}>
                                    <g transform="scale(9.84615,9.84615)">
                                        <path
                                            d="M11,-0.03125c-0.83594,0 -1.65625,0.16406 -2.25,0.75c-0.59375,0.58594 -0.78125,1.41797 -0.78125,2.28125h-3.96875c-0.55078,0 -1,0.44922 -1,1h-1v2h22v-2h-1c0,-0.55078 -0.44922,-1 -1,-1h-3.96875c0,-0.86328 -0.1875,-1.69531 -0.78125,-2.28125c-0.59375,-0.58594 -1.41406,-0.75 -2.25,-0.75zM11,2.03125h4c0.54688,0 0.71875,0.12891 0.78125,0.1875c0.0625,0.05859 0.1875,0.22266 0.1875,0.78125h-5.9375c0,-0.55859 0.125,-0.72266 0.1875,-0.78125c0.0625,-0.05859 0.23438,-0.1875 0.78125,-0.1875zM4,7v16c0,1.65234 1.34766,3 3,3h12c1.65234,0 3,-1.34766 3,-3v-16zM8,10h2v12h-2zM12,10h2v12h-2zM16,10h2v12h-2z"></path>
                                    </g>
                                </g>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                Tài liệu đã xóa
                            </p>
                        </NavLink>
                    </li>
                </ul>
                {/* <ul className="mb-4 flex flex-col gap-1">
                    <li className="mx-3.5 mt-4 mb-2">
                        <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">auth pages</p>
                    </li>
                    <li>
                        <a className="" href="#">
                            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                    <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
                                </svg>
                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">sign in</p>
                            </button>
                        </a>
                    </li>
                    <li>
                        <a className="" href="#">
                            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                                </svg>
                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">sign up</p>
                            </button>
                        </a>
                    </li>
                </ul> */}
            </div>
        </aside>
    );
};

export default SideBarAdmin;