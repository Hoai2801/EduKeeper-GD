import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const token = localStorage.getItem("token");
  let jwt = null;
  if (token !== "undefined" && token !== null) {
    jwt = jwtDecode(token);
  }

  const [isShowProfile, setIsShownProfile] = useState(false);
  const [isShowSpecialized, setIsShownSpecialized] = useState(false);
  const [isShowCategory, setIsShownCategory] = useState(false);
  const [isSubMenShow, setIsSubMenuShown] = useState(false);

  const [searchTerm, setSearch] = useState("");

  const [specialized, setSpecialized] = useState(null);

  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/specialized")
      .then((res) => res.json())
      .then((data) => {
        setSpecialized(data);
        // console.log(data)
      });
    
    fetch("http://localhost:8080/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        console.log(data)
      });

    if (jwt && jwt.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }, [])

  const out = () => {
    setIsShownSpecialized(false);
    setIsShownCategory(false);
    setIsSubMenuShown(false);
    setIsShownProfile(false);
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  const search = () => {
    localStorage.setItem('search', searchTerm);
    window.location.href = `http://localhost:3000/search?filter=&order=lasted`; // corrected URL
}


  return (
    <div className="sticky top-0 bg-white z-50" id="navbar" onMouseLeave={() => out()}>
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
        <div className="lg:gap-4 text-[12px] lg:min-w-[600px] hidden lg:flex">
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
            <div className="" >
              <p className="group-hover/department:text-blue-700">
                Ngành
              </p>
              <div className={`w-[500px] h-[300px] overflow-scroll absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border flex flex-col ${isShowSpecialized ? "" : "hidden"}`} onMouseLeave={() => setIsShownSpecialized(false)}>
                {specialized && specialized.map((item, index) => (
                  <Link to={`/search?specialized=${item.specializedSlug}&order=lastest`} key={index} className={`py-3 px-5 hover:bg-[#C5D6F8]`}>{item.specializedName}</Link>
                ))}
              </div>
            </div>
          </Link>
          <Link
            className="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
            onMouseEnter={() => {
              setIsShownCategory(true)
              setIsShownSpecialized(false)
            }
            }
          >
            <div className="" >
              <p className="group-hover/department:text-blue-700">
                Thể loại
              </p>
              <div className={`w-[500px] h-full absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border p-5 ${isShowCategory ? "" : "hidden"}`} onMouseLeave={() => setIsShownCategory(false)}>
                {category && category?.map((item, index) => (
                  <Link to={`/search?category=${item.categorySlug}&order=lastest`} key={index} className={`py-3 px-5 hover:bg-[#C5D6F8] rounded-xl`}>{item.categoryName}</Link>
                ))}
              </div>
            </div>
          </Link>
          {jwt?.role === "ADMIN" ? (
            <Link
              to="/upload"
              className="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5"
              onMouseEnter={() => setIsShownCategory(false)}
            >
              Upload tài liệu
            </Link>
          ) : " "}
        </div>

        <form className="max-w-md mx-auto w-full md:block hidden min-w-[400px] mt-[-7px]">
          {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label> */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Tìm sách theo tên, chủ đề..." required value={searchTerm} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}/>
            <button type="reset" onClick={search} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Tìm</button>
          </div>
        </form>

        {jwt ? (
          <>
            <div
              className="pt-1 relative group mr-0 w-[500px] justify-end lg:flex hidden"
              onMouseEnter={() => setIsShownProfile(true)}
            >
              <p className="mt-1 mr-3">Chào {jwt?.user_name}</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt=""
                className="w-10 min-w-10 mt-[-5px] h-10"
              />
              <div
                className={` ${isShowProfile ? "flex" : "hidden"
                  } absolute bg-white border rounded-lg p-5 shadow-lg w-[370px] flex-col h-20 top-[65px] right-0`}
                onMouseLeave={() => setIsShownProfile(false)}
              >
                <Link to={"/profile"}>Profile</Link>
                <button onClick={() => logout()} className="text-left">Đăng xuất</button>
              </div>
            </div>
            <div className="lg:hidden flex w-full justify-end">
              <div className="w-10 min-w-10" onClick={() => setIsSubMenuShown(true)}>
                <img
                  src="https://www.svgrepo.com/show/509382/menu.svg"
                  alt=""
                />
                <div
                  className={` ${isSubMenShow ? "flex" : "hidden"
                    } absolute bg-white border rounded-lg p-5 shadow-lg w-[370px] flex-col h-20 top-[65px] right-0`}
                  onMouseLeave={() => setIsSubMenuShown(false)}
                >
                  <Link to={"/profile"}>Profile</Link>
                  <button onClick={() => logout()} className="text-left">Đăng xuất</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-5 justify-end w-[500px]">
              <Link
                to={"/login"}
                className="bg-blue-600 px-5 py-3 rounded-3xl h-[45px] w-[150px] hover:bg-blue-300 text-white text-center pt-2"
              >
                Đăng nhập
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
