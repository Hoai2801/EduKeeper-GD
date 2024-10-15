import React from "react";
import { Link } from "react-router-dom";
import docIcon from "../assets/docs.jpg";

const DocumentCardRow = ({ document }) => {
  return (
    <div
      className={`bg-white shadow-md border text-gray-500 xl:min-w-fit md:min-w-fit max-w-full  max-h-36 xl:max-h-fit ${
        document?._delete ? "hidden" : ""
      } `}
    >
      <Link to={`/document/${document?.slug}`}>
        <div className="relative flex flex-row items-center justify-center max-h-full overflow-hidden">
          <div className="absolute z-40 top-3 right-[-22px] min-w-28 transform rotate-[40deg] bg-[#6b4554] text-center text-white px-2 py-1 font-bold text-sm">
            <span>{document.scope}</span>
          </div>

          <div className=" max-h-full flex justify-center items-center">
            <div className=" overflow-hidden xl:w-[120px] md:w-[160px] h-[160px] relative group">
              {document?.thumbnail ? (
                <img
                  src={
                    "http://localhost:8080/api/v1/images/" + document?.thumbnail
                  }
                  alt=""
                  className="h-full object-fill"
                />
              ) : (
                <img
                    src={docIcon}
                  // src="data:image/png;base64,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"
                  alt=""
                  className="h-full object-fill "
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

          <div className="w-fit xl:max-w-96 xl:min-w-96 md:max-w-80 max-w-72  h-full p-4 gap-y-1 flex flex-col  text-gray-500 ">
            <div className="flex flex-col gap-2 mt-2 ">
              <div className="xl:max-h-[48px]  xl:max-w-[80%] md:max-h-[32px] md:max-w-[80%] max-w-[60%]">
                <h3 className="font-bold capitalize text-[14px] text-ellipsis overflow-hidden line-clamp-2">
                  {document?.title}
                </h3>
              </div>
              <div className="flex flex-row text-[12px] md:text-[14px] xl:text-[14px] justify-start gap-x-4 items-center">
                <div className="  max-w-24 line-clamp-1  text-ellipsis overflow-hidden font-semibold hover:underline hover:text-blue-600">
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
                <div className="hover:underline hover:text-blue-600">
                  <Link
                    to={`/search?category=${document?.category.categoryName}`}
                    className="   font-medium flex flex-row gap-x-2 justify-center items-center"
                  >
                    <svg
                      className="w-4 h-4 "
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
                        d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
                      />
                    </svg>
                    <p>{document?.category.categoryName}</p>
                  </Link>
                </div>
                <div className="hover:underline hover:text-blue-600">
                  <Link
                    to={`/profile/${document?.user_upload.staffCode}`}
                    className=" max-w-24 font-medium flex flex-row gap-x-2 justify-center items-center"
                  >
                    <svg
                      className="md:w-4 md:h-4 xl:w-4 xl:h-4 w-3 h-3 "
                      aria-hidden="true"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l293.1 0c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1l-91.4 0zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"
                      />
                    </svg>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {document?.user_upload.username}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-start gap-6 max-w-80 xl:text-sm md:text-sm text-xs ">
              {/* Page*/}
              <div className="flex flex-row xl:gap-x-2 md:gap-x-2 gap-x-1 justify-center items-center">
                <svg
                  className="xl:w-4 md:w-4 md:h-4 xl:h-4 w-3 h-3  text-gray-500"
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
                    d="M64 464c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0z"
                  />
                </svg>
                <p className="font-sans">{document.pages}</p>
              </div>
              {/* Capacity */}
              <div className="flex flex-row xl:gap-x-2 md:gap-x-2 gap-x-1 justify-center items-center">
                <svg
                  className="xl:w-4 md:w-4 md:h-4 xl:h-4 w-3 h-3  text-gray-500"
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
                    d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
                  />
                </svg>
                <p className="font-sans">
                  (
                  {Math.round(document.document_size) < 1
                    ? "1"
                    : Math.round(document.document_size)}{" "}
                  MB)
                </p>
              </div>
              {/* Upload Date */}
              <div className="flex flex-row xl:gap-x-2 md:gap-x-2 gap-x-1 justify-center items-center ">
                <svg
                  className="xl:w-4 md:w-4 md:h-4 xl:h-4 w-3 h-3  text-gray-500"
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
                <p className="font-sans"> {document.upload_date} </p>
              </div>{" "}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DocumentCardRow;
