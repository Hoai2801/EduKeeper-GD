import React from "react";
import { Link } from "react-router-dom";
import MiniMap from "./MiniMap";
const Footer = () => {
  return (
    <footer className="bg-white w-screen">
      <hr className="my-1 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-1" />

      <div className="w-full p-8 md:py-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div className="w-60 text-gray-500 ">
            <Link
              href="/"
              className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-extrabold whitespace-nowrap ">
                EduKeeper GD
              </span>
            </Link>
            <p className="font-medium text-xs mt-4">
              Chào mừng bạn đến với hệ thống upload tài liệu trực tuyến của GDU.
              Đây là nền tảng hỗ trợ việc chia sẻ và lưu trữ tài liệu học tập,
              nghiên cứu khoa học và các tài nguyên học thuật khác dành cho sinh
              viên, giảng viên và nhân viên của trường.
            </p>
          </div>
          <div className="w-1/3 flex flex-wrap items-center gap-12 text-sm font-medium text-gray-500 sm:mb-0 ">
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-bold text-gray-600 uppercase">
                Contact US
              </h3>
              <div className="flex flex-row gap-2">
                <p className="font-normal ">Hotline: </p>
                <Link href="#" className="font-bold  hover:underline">
                  0123456789
                </Link>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-normal ">Email: </p>
                <Link href="#" className="font-bold  hover:underline">
                  codengay1h@gmail.com
                </Link>
              </div>
            </div>
            <div className="">
              <h3 className="text-[16px] font-bold text-gray-600 uppercase">
                subscribes{" "}
              </h3>
              <p className=" font-light text-xs mb-2">
                Vui lòng nhâp gmail để nhận những thông tin mới nhất một cách
                nhanh chống.
              </p>
              <div className="flex flex-row mt-1 mr-2">
                <input
                  className="h-8	border text-black rounded-l placeholder:font-sans placeholder:text-xs"
                  type="email"
                  placeholder="
              Enter your email"
                />
                <button className=" bg-red-500 px-8 py-1 rounded-r	 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-white w-4 h-4"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376l0 103.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
                    />
                  </svg>{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="">
            <h3 className="text-[16px] font-bold text-gray-600 uppercase">
              Mini Map
            </h3>
            <div class="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9300823358094!2d106.67287377301786!3d10.816662654363435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752918602fcba5%3A0x2599dd3bc2b48244!2zR0RVIC0gVFLGr-G7nE5HIMSQ4bqgSSBI4buMQyBHSUEgxJDhu4pOSCBUUEhDTQ!5e0!3m2!1svi!2s!4v1724732113187!5m2!1svi!2s"
                width="460"
                height="320"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <span className="block text-sm text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <Link href="#" className="hover:underline">
            EduKeeper GD™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
