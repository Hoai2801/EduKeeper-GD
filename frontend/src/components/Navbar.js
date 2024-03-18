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
      <div className="h-[85px] w-full p-5 text-black flex justify-center gap-10 shadow-lg">
        <div className="flex gap-4 w-[250px] h-full">
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
        <div className="lg:gap-4 text-[12px] w-[700px] hidden lg:flex ">
          <Link
            to="/"
            className="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5 "
            onMouseEnter={() => setIsShownDepartment(false)}
          >
            Trang chủ
          </Link>
          <Link
            to="/nganh"
            className="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
            onMouseEnter={() => {
              setIsShownDepartment(true)
              setIsShownCategory(false)
              setIsShownBook(false)
            }}
          >
            <div className="" >
              <p className="group-hover/department:text-blue-700">
                Tài liệu
              </p>
              <div className={`w-[500px] h-full absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border ${isShowDepartment ? "" : "hidden"}`} onMouseLeave={() => setIsShownDepartment(false)}>
                <p>IT</p>
                <p>CNTT</p>
              </div>
            </div>
          </Link>
          <Link
            to="/book"
            className="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
            onMouseEnter={() => {
              setIsShownBook(true)
              setIsShownDepartment(false)
              setIsShownCategory(false)
            }
            }
          >
            <div className="" >
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
            className="hover:rounded-3xl hover:bg-[#C5D6F8] py-3 px-5 group/department"
            onMouseEnter={() => {
              setIsShownCategory(true)
              setIsShownDepartment(false)
              setIsShownBook(false)
            }
            }
          >
            <div className="" >
              <p className="group-hover/department:text-blue-700">
                Powerpoint
              </p>
              <div className={`w-[500px] h-full absolute mt-8 translate-x-[-50%] bg-white shadow-lg rounded-lg border ${isShowCategory ? "" : "hidden"}`} onMouseLeave={() => setIsShownDepartment(false)}>
                <p>IT</p>
                <p>CNTT</p>
              </div>
            </div>
          </Link>
          <Link
            to="/upload"
            className="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5"
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
              className="pt-1 relative group mr-0 w-[500px] justify-end lg:flex hidden"
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
                <Link to={"/profile"}>Profile</Link>
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
                  <Link to={"/profile"}>Profile</Link>
                  <Link>Dang xuat</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-5 justify-end w-full">
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
