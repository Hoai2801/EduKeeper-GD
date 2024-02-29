import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = 1;

  const [isShowProfile, setIsShownProfile] = useState(false);
  const [isShowDepartment, setIsShownDepartment] = useState(false);
  const [isShowBook, setIsShownBook] = useState(false);
  const [isShowCategory, setIsShownCategory] = useState(false);
  const [isSubMenShow, setIsSubMenuShown] = useState(false);

  return (
    <div className="sticky top-0 bg-white z-50">
      <div class="h-[85px] w-full p-5 text-black flex justify-center gap-10 shadow-lg">
        <div class="flex gap-4 w-[250px] h-full">
          <Link to="/">
            <div className="min-w-[135px]">
              <img
                src="https://giadinh.edu.vn/upload/photo/logofooter-8814.png"
                alt=""
                className="h-[50px]"
              />
            </div>
          </Link>
        </div>
        <div class="lg:gap-4 text-[12px] w-[700px] hidden lg:flex ">
          <Link
            to="/"
            class="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5 "
            onMouseEnter={() => setIsShownDepartment(false)}
          >
            Trang chủ
          </Link>
          <Link
            to="/nganh"
            class="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
          >
            <div className="" onMouseEnter={() => {
              setIsShownDepartment(true)
              setIsShownCategory(false)
              setIsShownBook(false)
              }}>
              <p className="group-hover/department:text-blue-700">
                Ngành
              </p>
              <div className={`w-[500px] h-full absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border ${isShowDepartment ? "" : "hidden"}`} onMouseLeave={() => setIsShownDepartment(false)}>
                <p>IT</p>
                <p>CNTT</p>
              </div>
            </div>
          </Link>
          <Link
            to="/book"
            class="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
          >
            <div className="" onMouseEnter={() => {
              setIsShownBook(true)
              setIsShownDepartment(false)
              setIsShownCategory(false)}
              }>
              <p className="group-hover/department:text-blue-700">
            Sách/Giáo trình
              </p>
              <div className={`w-[500px] h-full absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border ${isShowBook ? "" : "hidden"}`} onMouseLeave={() => setIsShownDepartment(false)}>
                <p>IT</p>
                <p>CNTT</p>
              </div>
            </div>
          </Link>
          <Link
            to="/category"
            class="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
          >
            <div className="" onMouseEnter={() => {
              setIsShownCategory(true)
              setIsShownDepartment(false)
              setIsShownBook(false)}
            }>
              <p className="group-hover/department:text-blue-700">
            Thể Loại
              </p>
              <div className={`w-[500px] h-full absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border ${isShowCategory ? "" : "hidden"}`} onMouseLeave={() => setIsShownDepartment(false)}>
                <p>IT</p>
                <p>CNTT</p>
              </div>
            </div>
          </Link>
          <Link
            to="/upload"
            class="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5"
            onMouseEnter={() => setIsShownCategory(false)}
          >
            Upload tài liệu
          </Link>
        </div>
        <div className="w-[500px] min-w-[300px] lg:block hidden">
          <div className="">
            <input
              type="text"
              name=""
              id=""
              placeholder="Nhập tên tài liệu hoặc giáo viên cần tìm"
              className="border border-gray-600 p-4 rounded-3xl h-10 w-full"
            />
          </div>
        </div>
        {user ? (
          <>
            <div
              class="pt-1 relative group mr-0 w-[500px] justify-end lg:flex hidden"
              onMouseEnter={() => setIsShownProfile(true)}
            >
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
                <Link>Profile</Link>
                <Link>Dang xuat</Link>
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
                  <Link>Profile</Link>
                  <Link>Dang xuat</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div class="flex gap-5 justify-end w-full">
              <button
                onClick={null}
                className="bg-blue-400 px-5 py-1 rounded-3xl h-[45px] w-[150px] hover:bg-blue-300"
              >
                Đăng nhập
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
