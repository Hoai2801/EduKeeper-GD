import React, { useContext, useEffect, useState } from "react";
import "./Detail.css";
import { Link } from "react-router-dom";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { JWTContext } from "../App";
import LoveButton from "../components/LoveButton";
import DownloadButton from "../components/DownloadButton";
import CommentComponent from "../components/comment/CommentComponent";
const Detail = () => {
  function extractSlugFromURL(url) {
    // Split the URL by '/'
    const parts = url.split("/");
    // Get the last part of the URL
    const lastPart = parts[parts.length - 1];
    // Return the last part as the slug
    return lastPart;
  }

  const context = useContext(JWTContext);
  const staffCode = context?.user?.staff_code;

  const url = window.location.href;
  const slug = extractSlugFromURL(url);
  const [fileDownload, setFileDownload] = useState(null);
  const [data, setData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("Đang tải tài liệu");

  useEffect(() => {
    fetch("http://103.241.43.206:8080/api/v1/documents/" + slug)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data)
      });

    fetch("http://103.241.43.206:8080/api/v1/documents/" + slug + "/html").then(
      (res) => {
        if (res.status === 200) {
          res.text().then((r) => setHtmlContent(r));
        } else {
          setHtmlContent("Đang tải tài liệu");
        }
      }
    );

    fetch("http://103.241.43.206:8080/api/v1/documents/" + slug + "/download").then(
      (res) => res.blob().then((r) => setFileDownload(r))
    );
  }, [slug]); // This effect depends only on slug

  useEffect(() => {
    if (staffCode && data?.id) {
      const increaseView = setTimeout(() => {
        fetch("http://103.241.43.206:8080/api/v1/view-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: data.id, staffCode: staffCode }),
        });
      }, 30000);

      return () => clearTimeout(increaseView);
    }
  }, [data?.id, staffCode]);

  return (
    <div className={`w-full`}>
      <h2
        className={`text-[28px] text-center mt-10 font-bold ${
          data?.scope === "public" ||
          data?.user_upload?.staffCode === staffCode ||
          data === null
            ? "hidden"
            : "block"
        }`}
      >
        Bạn không thể xem tài liệu này vì đây là tài liệu riêng tư
      </h2>
      <div
        className={`${
          data?.scope === "public" || data?.user_upload?.staffCode === staffCode
            ? ""
            : "hidden"
        }`}
      >
        <div className={`pt-[50px] px-5 max-w-[1080px] mx-auto`}>
          <p className="text-blue-500 text-lg">
            <Link to={`/search?category=${data?.category?.categorySlug}`}>
              {data?.category?.categoryName}
            </Link>{" "}
            -
            <Link to={`/search?subject=${data?.subject?.subjectSlug}`}>
              {" "}
              Môn {data?.subject?.subjectName}
            </Link>
          </p>
          {/* <Link to={`/department/${data?.specialized.departmentID.departmentSlug}`}>{data?.specialized.specializedName}</Link> - */}
          <h2 className="md:text-[52px] md:mt-5 font-bold md:max-w-[900px] leading-[50px] text-2xl">
            {data?.title}
          </h2>
          <div className="flex justify-between mt-3 md:flex-row flex-col w-full">
            <div className="flex flex-wrap gap-5 md:flex-col md:gap-1 md:mt-5 text-xl">
              <p>
                Giáo viên:{" "}
                <Link
                  to={`/profile/${data?.user_upload?.staffCode}`}
                  className="text-blue-500"
                >
                  {data?.user_upload?.username}
                </Link>
              </p>
              <p>
                Tác giả: <span className="">{data?.author}</span>
              </p>
              <p>Ngày đăng: {data?.upload_date}</p>
              <p>Trang: {data?.pages}</p>
            </div>
            <div className="flex flex-col gap-5 md:gap-2">
              <LoveButton documentId={data?.id} staffCode={staffCode} />
              <DownloadButton
                documentId={data?.id}
                fileName={data?.title}
                fileDownload={fileDownload}
                type={data?.download_file_type}
                staffCode={staffCode}
              />
              <div className="flex gap-5">
                <p>Lượt xem: {data?.views}</p>
                <p>Lượt tải về: {data?.download}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:px-8 px-5 flex flex-col gap-5 max-w-[1080px] mx-auto `}
        >
          <h3 className="text-[28px] font-bold text-blue-400">Mô tả</h3>
          <div className={`text-xl`}>
            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          </div>
        </div>
        <div
          className={`bg-white overflow-y-scroll h-screen rounded-lg flex flex-col max-w-[1080px] mt-5 mx-auto`}
        >
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          <div>
            <p className="text-center text-gray-500 text-xl font-semibold mt-3 mb-10 p-5">
              {htmlContent !== "Đang tải tài liệu"
                ? "Đã hết số trang được xem review. Để xem thêm các trang sau, vui lòng tải tài liệu để có trải nghiệm tốt nhất"
                : ""}
            </p>
          </div>
        </div>
        <CommentComponent data={data} staffCode={staffCode} />
      </div>
    </div>
  );
};

export default Detail;
