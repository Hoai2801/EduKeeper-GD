import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white w-screen">
      <hr className="my-1 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-1" />
      <div className="w-full p-8 md:py-8 text-[#174D89]">
        <div className="sm:flex-row sm:items-start sm:justify-between gap-5 flex flex-col">
          <div className="w-60">
            <Link
              href="/"
              className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center md:text-2xl text-lg font-extrabold whitespace-nowrap ">
                TRƯỜNG ĐẠI HỌC GIA ĐỊNH
              </span>
            </Link>
            <p className="font-medium text-xs mt-4">
              Cơ sở Tân Sơn Nhất: 371 Nguyễn Kiệm, P.3, Q.Gò Vấp, TP.HCM
            </p>
          </div>
          <div className="w-1/3 flex flex-wrap items-center gap-12 text-sm font-medium sm:mb-0 ">
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-bold uppercase">
                Liên hệ
              </h3>
              <div className="flex flex-row gap-2">
                <p className="font-normal ">Hotline: 0961 12 10 18 - 0962 12 10 18 - 0862 12 10 18</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-normal ">Điện thoại: (028) 7301 3456</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-normal ">Email: tuyensinh@giadinh.edu.vn</p>
              </div>
            </div>
          </div>

          <div className="">
            <h3 className="text-[16px] font-bold uppercase">
              Địa chỉ
            </h3>
            <div class="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9300823358094!2d106.67287377301786!3d10.816662654363435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752918602fcba5%3A0x2599dd3bc2b48244!2zR0RVIC0gVFLGr-G7nE5HIMSQ4bqgSSBI4buMQyBHSUEgxJDhu4pOSCBUUEhDTQ!5e0!3m2!1svi!2s!4v1724732113187!5m2!1svi!2s"
                width="360"
                height="320"
                allowFullscreen=""
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
