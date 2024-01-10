import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div class="bg-white h-[85px] w-full p-5 text-black flex justify-center gap-10 shadow-lg sticky top-0">
        <div class="flex gap-4">
          <div class="font-bold text-[28px] leading-9">
            <Link to="/" >
                EduKeeper GD
            </Link>
          </div>
        </div>
        <div class="flex gap-4 text-[12px] w-[700px]">
          <Link to="/" class="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5 ">
            Trang chủ
          </Link>
          <Link to="/" class="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5">
            Ngành
          </Link>
          <Link to="/" class="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5">
            Sách
          </Link>
          <Link to="/" class="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5">
            Thể Loại
          </Link>
          <Link to="/" class="hover:rounded-3xl hover:text-blue-700 hover:bg-[#C5D6F8] py-3 px-5">
            Upload tài liệu
          </Link>
        </div>
        <div className="w-[500px]">
            <div className="">
                <input type="text" name="" id="" placeholder="Nhập tên tài liệu hoặc giáo viên cần tìm" className="border border-gray-600 p-4 rounded-3xl h-10 w-full"/>
            </div>
        </div>
        <div class="flex gap-5">
            <div class="w-7 pt-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt=""
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
