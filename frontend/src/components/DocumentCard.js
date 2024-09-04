import React from "react";
import { Link } from "react-router-dom";
import docIcon from "../assets/docs.jpg";

const DocumentCard = ({ document }) => {
  return (
    <div
      className={`flex justify-center shadow-md border items-center text-gray-500 overflow-hidden relative ${
        document?._delete ? "hidden" : ""
      } `}
    >
      <div class="absolute z-40 top-3 right-[-22px] min-w-28 transform rotate-[40deg] bg-[#6b4554] text-center text-white px-2 py-1 font-bold text-sm">
        <span>{document.scope}</span>
      </div>
      <Link to={`/document/${document?.slug}`}>
        <div className="w-72 h-64 flex justify-center items-center">
          <div className="h-[220px] flex justify-center items-center overflow-hidden w-[220px] relative group">
            {document?.thumbnail ? (
              <img
                src={
                  "http://103.241.43.206:8080/api/v1/images/" + document?.thumbnail
                }
                alt=""
                className="h-full object-cover"
              />
            ) : (
              <img
                src={docIcon}
                alt=""
                className="w-full h-full object-fill "
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 ease-in-out"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <button className="px-4 py-1 rounded-xl bg-white text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 ease-in-out">
                Xem ngay
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-72 h-fit p-4 flex flex-col  text-gray-500 ">
          <div className="flex flex-row justify-between items-center">
            <div className="px-8 py-1 w-fit max-w-56 max-h-24 bg-lime-500 flex justify-center items-center rounded-3xl">
              <h3 className="font-medium font-mono text-gray-700 text-sm text-ellipsis overflow-hidden line-clamp-2">
                {document.category.categoryName !== "Nghiên cứu khoa học" ? document.category.categoryName : "NCKH"}
              </h3>
            </div>
            <div className="flex flex-row gap-x-2 justify-center items-center ">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                />
              </svg>
              <p className="font-sans text-sm"> {document.upload_date} </p>
            </div>{" "}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="h-[48px] max-w-full ">
              <h3 className="font-bold uppercase  text-[16px] text-ellipsis overflow-hidden line-clamp-2">
                {document?.title}
              </h3>
            </div>
            <div className="  text-[14px] text-purple-500 font-semibold hover:underline">
              {document?.subject ? (
                <Link
                  to={`/search?subject=${document?.subject?.subjectSlug}`}
                  className=""
                >
                  {document?.subject?.subjectName}
                </Link>
              ) : (
                <Link
                  to={`/search?specialized=${document?.specialized?.specializedSlug}`}
                  className=""
                >
                  {document?.specialized?.specializedName}
                </Link>
              )}
            </div>
            <div>
              <Link
                to={`/profile/${document?.user_upload.staffCode}`}
                className=" hover:underline text-[14px] font-medium"
              >
                {document?.user_upload.username}
              </Link>
            </div>
          </div>
          <div className="mt-4 flex w-3/4 justify-between text-sm ">
            {/* Viewss */}
            <div className="flex flex-row gap-x-2 justify-center items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="none"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                />
              </svg>
              <p className="font-sans">{document.views}</p>
            </div>
            {/* Favorites */}
            <div className="flex flex-row gap-x-2 justify-center items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z"
                />
              </svg>
              <p className="font-sans"> {document.favorites} </p>
            </div>
            {/* Downloads */}
            <div className="flex flex-row gap-x-2 justify-center items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM128 256l0 32L256 416 384 288l0-32-80 0 0-128-96 0 0 128-80 0z"
                />
              </svg>
              <p className="font-sans"> {document.download} </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DocumentCard;
