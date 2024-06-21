import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// asset
import menuIcon from "../assets/menu-hamburge.png";

const Navbar = () => {
  // const token = localStorage.getItem("token");
  // let jwt = null;
  // if (token !== "undefined" && token !== null) {
  //   jwt = jwtDecode(token);
  // }
  // console.log(jwt)

  // const [isShowProfile, setIsShownProfile] = useState(false);
  const [isShowSpecialized, setIsShownSpecialized] = useState(false);
  const [isShowCategory, setIsShownCategory] = useState(false);
  const [isSubMenuShow, setIsSubMenuShown] = useState(false);

  const [searchTerm, setSearch] = useState("");

  const [specialized, setSpecialized] = useState(null);

  const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/v1/specializes/count")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSpecialized(data);
  //     });

  //   fetch("http://localhost:8080/api/v1/categories")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCategory(data);
  //     });

  //   if (jwt && jwt.exp < Date.now() / 1000) {
  //     localStorage.removeItem("token");
  //     window.location.href = "/";
  //   }
  // }, []);

  const out = () => {
    setIsShownSpecialized(false);
    setIsShownCategory(false);
    // setIsSubMenuShown(false);
    // setIsShownProfile(false);
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  // };

  const search = () => {
    localStorage.setItem("search", searchTerm);
    if (localStorage.getItem("search") !== null) {
      window.location.href = `http://localhost:3000/search?filter=&order=lasted`;
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className="sticky top-0 bg-white z-50"
      id="navbar"
      onMouseLeave={() => out()}
    >
      <div className="h-[85px] w-full p-5 text-black flex justify-center gap-10 shadow-lg">
        <div className="flex gap-4 w-[250px] h-full">
          <Link to={"/"}>
            <div className="min-w-[135px]">
              <img
                src="https://giadinh.edu.vn/upload/photo/logofooter-8814.png"
                alt=""
                className="h-[50px]"
              />
            </div>
          </Link>
        </div>
        <div className="lg:gap-4 text-[12px] lg:min-w-[400px] hidden lg:flex">
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
              setIsShownSpecialized(true);
              setIsShownCategory(false);
            }}
          >
            <div className="">
              <p className="group-hover/department:text-blue-700">Ngành</p>
              <div
                className={`w-[500px] h-[300px] overflow-scroll absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border flex flex-col ${
                  isShowSpecialized ? "" : "hidden"
                }`}
                onMouseLeave={() => setIsShownSpecialized(false)}
              >
                {specialized &&
                  specialized.map((item, index) => (
                    <Link
                      to={`/search?specialized=${item.specialized.specializedSlug}&order=lastest`}
                      key={index}
                      className={`py-3 px-5 hover:bg-[#C5D6F8] h-[40px] flex justify-between`}
                    >
                      {item.specialized.specializedName}{" "}
                      <p className="text-[10px]">({item.documentsCount})</p>
                    </Link>
                  ))}
              </div>
            </div>
          </Link>
          <Link
            className="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
            onMouseEnter={() => {
              setIsShownCategory(true);
              setIsShownSpecialized(false);
            }}
          >
            <div className="">
              <p className="group-hover/department:text-blue-700">Thể loại</p>
              <div
                className={`w-fit p-5 absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border ${
                  isShowCategory ? "" : "hidden"
                }`}
                onMouseLeave={() => setIsShownCategory(false)}
              >
                {category &&
                  category?.map((item, index) => (
                    <Link
                      to={`/search?category=${item.categorySlug}&order=lastest`}
                      key={index}
                      className={`py-3 px-5 hover:bg-[#C5D6F8] rounded-xl`}
                    >
                      {item.categoryName}
                    </Link>
                  ))}
              </div>
            </div>
          </Link>
          {/* {jwt?.role === "ADMIN" ? (
            <Link
              to="/upload"
              className="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5"
              onMouseEnter={() => setIsShownCategory(false)}
            >
              Upload tài liệu
            </Link>
          ) : (
            " "
          )} */}
        </div>

        <form
          className="max-w-md mx-auto w-full md:block hidden min-w-[400px] mt-[-7px]"
          onKeyDown={(event) => {
            // press enter make page reload before search
            if (event.keyCode === 13) {
              search();
              event.preventDefault();
            }
          }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tìm sách theo tên, chủ đề..."
              required
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="reset"
              onClick={search}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Tìm
            </button>
          </div>
        </form>

        <>
          <div className="flex gap-5 justify-end w-[500px]">
            <div className="flex text-center">
              {/* {jwt ? (
                <div>
                  <button
                    onClick={() => {
                      setIsSubMenuShown(!isSubMenuShow);
                    }}
                    className="lg:mt-2 mt-3 lg:text-xl md:flex gap-3 hidden"
                  >
                    Chào {jwt.user_name}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  <div
                    className={`bg-white absolute flex flex-col max-w-[300px] w-[300px] overflow-hidden h-[300px] top-[90px] right-2 rounded-lg shadow-2xl ${
                      isSubMenuShow ? "absolute" : "hidden"
                    }`}
                    onMouseLeave={() => setIsSubMenuShown(!isSubMenuShow)}
                  >
                    <Link
                      to="/profile"
                      className="hover:bg-blue-300 w-full h-[50px]"
                    >
                      Trang cá nhân
                    </Link>
                    <Link
                      to="/profile"
                      className="hover:bg-blue-300 w-full h-[50px]"
                    >
                      Cài đặt
                    </Link>
                    <Link
                      to="/profile"
                      className="hover:bg-blue-300 w-full h-[50px]"
                    >
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-white pt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
                >
                  Đăng nhập
                </Link>
              )} */}
            </div>
            {/* mobile menu button */}
            <div className="lg:hidden w-[50px]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-[50px] pr-5 mt-3"
              >
                <img src={menuIcon} alt="" className="w-full" />
              </button>
            </div>
            <div
              className={`w-full absolute top-[80px] right-0 h-[90vh] bg-slate-200 ${
                isMobileMenuOpen ? "flex" : "hidden"
              }`}
            >
              <div className="flex flex-col items-center w-full mt-3 gap-3">
                <Link
                  to={"/"}
                  onMouseEnter={() => setIsShownSpecialized(false)}
                >
                  Trang chủ
                </Link>
                <div className="flex flex-col gap-3 items-center">
                  <button
                    onClick={() => setIsShownSpecialized(!isShowSpecialized)}
                    className="group-hover/department:text-blue-700"
                  >
                    Ngành
                  </button>
                  {/* <div className={`w-[90%] h-[300px] overflow-scroll bg-white shadow-lg rounded-lg border flex flex-col ${isShowSpecialized ? "" : "hidden"}`} onMouseLeave={() => setIsShownSpecialized(false)}>
                    {specialized && specialized.map((item, index) => (
                      <Link to={`/search?specialized=${item.specialized.specializedSlug}&order=lastest`} key={index} className={`py-3 px-5 hover:bg-[#C5D6F8] h-[40px] flex justify-between`} onClick={() => setIsMobileMenuOpen(false)}>{item.specialized.specializedName} <p className="text-[10px]">({item.documentsCount})</p></Link>
                    ))}
                  </div> */}
                </div>
                <div className="flex flex-col gap-3 w-full items-center">
                  <button
                    onClick={() => setIsShownCategory(!isShowCategory)}
                    className="group-hover/department:text-blue-700"
                  >
                    Thể loại
                  </button>
                  <div
                    className={`w-[90%] flex flex-col items-center bg-white shadow-lg rounded-lg border ${
                      isShowCategory ? "" : "hidden"
                    }`}
                    onMouseLeave={() => setIsShownCategory(false)}
                  >
                    {category &&
                      category?.map((item, index) => (
                        <Link
                          to={`/search?category=${item.categorySlug}&order=lastest`}
                          key={index}
                          className={`py-3 px-2 w-full hover:bg-[#C5D6F8] rounded-xl`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.categoryName}
                        </Link>
                      ))}
                  </div>
                </div>
                {/* {jwt?.role === "ADMIN" ? (
                  <Link to="/upload" onClick={() => setIsMobileMenuOpen(false)}>
                    Upload tài liệu
                  </Link>
                ) : (
                  " "
                )}
                {jwt ? (
                  <>
                    <div className="flex flex-col items-center w-full gap-3">
                      <Link to={"/profile"}>Profile</Link>
                      <button onClick={() => logout()} className="text-left">
                        Đăng xuất
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
                )} */}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Navbar;
