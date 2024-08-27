import React from "react";
import { Link } from "react-router-dom";
import docIcon from "../assets/docs.jpg";

const DocumentCard = ({ document }) => {
  return (
    <div
      className={`flex justify-center items-center  ${
        document?._delete ? "hidden" : ""
      } `}
    >
      <Link to={`/document/${document?.slug}`}>
        <div className="h-[160px] border rounded-lg overflow-hidden w-[260px] shadow-md relative group ">
          {document?.thumbnail ? (
            <img
              src={"http://localhost:8080/api/v1/images/" + document?.thumbnail}
              alt=""
              className="w-full h-full object-cover "
            />
          ) : (
            <img src={docIcon} alt="" className="w-full h-full object-cover " />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 ease-in-out"></div>
          <div className="absolute inset-0 flex justify-center items-center">
            <button className="px-4 py-1 rounded-xl bg-white text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 ease-in-out">
              Xem ngay
            </button>
          </div>
        </div>

        <div className="mt-2 w-full flex flex-col text-slate-600 ">
          <div className="max-h-[48px] max-w-[240px] ">
            <h3 className="font-bold  text-[18px] text-ellipsis overflow-hidden line-clamp-2">
              {document?.title}
            </h3>
          </div>
          <div className="  text-[14px] font-semibold hover:underline">
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
      </Link>
    </div>
  );
};

export default DocumentCard;
