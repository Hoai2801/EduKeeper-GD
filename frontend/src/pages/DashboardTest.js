import React, { useEffect, useState } from "react";
import ColumnChart from "../components/Chart";
import { LineChart, DoughnutChart } from "../components/Chart";
import Avatar from "../assets/avatar.webp";
import AvatarGirl from "../assets/avatar-girl.webp";
import AvatarBoy from "../assets/avatar-boy.webp";
import DevBoy from "../assets/dev-boy.webp";
import DefaultDocs from "../assets/docs.jpg";
const DashboardTest = () => {
  const [top3Docs, setTop3Docs] = useState([]);
  const [top10User, setTop10User] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/downloads/top-documents/3")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTop3Docs(data);
      });

    fetch("http://localhost:8080/api/v1/users/top-downloads")
      .then((res) => res.json())
      .then((data) => {
        setTop10User(data);
      });
  }, []);

  const hanldeContact = () => {
    window.location.href =
      "https://www.facebook.com/profile.php?id=100009283092043";
  };

  const items = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Total documents */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-3 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Documents_icon_-_noun_project_5020_-_white.svg/1200px-Documents_icon_-_noun_project_5020_-_white.svg.png"
              alt=""
              className="w-5 h-5"
            />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Tổng số tài liệu
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {100}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{9}%</strong>
              &nbsp;so với năm trước
            </p>
          </div>
        </div>
        {/* Number of published documents */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-3 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <img
              src="https://www.shareicon.net/data/2015/10/29/663772_arrows_512x512.png"
              alt=""
              className="w-6 h-6"
            />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased min-h-6 overflow-x-visible font-sans text-sm leading-normal font-normal ">
              Tài liệu chưa duyệt
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {9}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{10}%</strong>
              &nbsp;so với tháng trước
            </p>
          </div>
        </div>
        {/* Number of published documents */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-3 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <img
              src="https://www.shareicon.net/data/2015/10/29/663772_arrows_512x512.png"
              alt=""
              className="w-6 h-6"
            />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Tài liệu đã công bố
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {9}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{10}%</strong>
              &nbsp;so với tháng trước
            </p>
          </div>
        </div>
        {/* Number of documents today */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-3 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <img
              src="https://www.shareicon.net/data/2015/10/29/663772_arrows_512x512.png"
              alt=""
              className="w-6 h-6"
            />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Tài liệu hôm nay
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {9}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{10}%</strong>
              &nbsp;so với tháng trước
            </p>
          </div>
        </div>
      </div>
      {/* Top 3 Docs */}
      <div>
        <h4 className="text-xl font-bold">Top 3 Docs</h4>
        <div className="flex ">
          <div className="w-2/3 min-h-96 mr-4">
            {top3Docs &&
              top3Docs.map((docs, index) => {
                return (
                  <div
                    key={index}
                    className="my-2 min-h-32 w-full bg-white bg-clip-border rounded-xl shadow-md flex items-center "
                  >
                    <div className="max-w-32 h-32  ">
                      <img
                        src={
                          docs.thumbnail
                            ? `http://localhost:8080/api/v1/image/${docs.thumbnail}`
                            : DefaultDocs
                        }
                        alt="Thumbnail docs"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="min-w-48 min-h-8 max-w-60">
                      <div className="">
                        <p className="text-lg text-gray-600 font-semibold">
                          {docs.title}
                        </p>
                        <p className="my-1 text-sm  text-gray-400 font-medium">
                          {docs.author?.username}
                        </p>
                        <div className="flex text-sm text-gray-400 font-medium ">
                          <p className="mr-2">{docs.views} Reviews</p>
                          <p className="mx-2">-</p>
                          <p className="mx-2">{docs.download} Doawnloads</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto mr-2 hover:cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512 "
                        fill="currentColor"
                        aria-hidden="true"
                        className="text-gray-400 min-w-12 max-h-6 "
                      >
                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            {/* <div className="my-2 min-h-32 w-full bg-white bg-clip-border rounded-xl shadow-md flex items-center ">
              <div className="max-w-32 h-32  ">
                <img
                  src={
                    top3Docs[0]?.thumbnail
                      ? `http://localhost:8080/api/v1/image/${top3Docs[0]?.thumbnail}`
                      : AvatarBoy
                  }
                  alt="Thumbnail docs"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-48 min-h-8 max-w-60">
                <div className="">
                  <p className="text-lg text-gray-600 font-semibold">
                    Nodejs cho nguoi moi bat dau
                  </p>
                  <p className="my-1 text-sm  text-gray-400 font-medium">
                    Minh Dat
                  </p>
                  <div className="flex text-sm text-gray-400 font-medium ">
                    <p className="mr-2">15 Reviews</p>
                    <p className="mx-2">-</p>
                    <p className="mx-2">15 Doawnloads</p>
                  </div>
                </div>
              </div>
              <div className="ml-auto mr-2 hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512 "
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-gray-400 min-w-12 max-h-6 "
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </div>
            </div>
            <div className="my-2 min-h-32 w-full bg-white bg-clip-border rounded-xl shadow-md flex items-center ">
              <div className="max-w-32 h-32  ">
                <img
                  src={AvatarBoy}
                  alt="Thumbnail docs"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-48 min-h-8 max-w-60">
                <div className="">
                  <p className="text-lg text-gray-600 font-semibold">
                    Nodejs cho nguoi moi bat dau
                  </p>
                  <p className="my-1 text-sm  text-gray-400 font-medium">
                    Minh Dat
                  </p>
                  <div className="flex text-sm text-gray-400 font-medium ">
                    <p className="mr-2">15 Reviews</p>
                    <p className="mx-2">-</p>
                    <p className="mx-2">15 Doawnloads</p>
                  </div>
                </div>
              </div>
              <div className="ml-auto mr-2 hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512 "
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-gray-400 min-w-12 max-h-6 "
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </div>
            </div>
            <div className="my-2 min-h-32 w-full bg-white bg-clip-border rounded-xl shadow-md flex items-center ">
              <div className="max-w-32 h-32  ">
                <img
                  src={AvatarBoy}
                  alt="Thumbnail docs"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-48 min-h-8 max-w-60">
                <div className="">
                  <p className="text-lg text-gray-600 font-semibold">
                    Nodejs cho nguoi moi bat dau
                  </p>
                  <p className="my-1 text-sm  text-gray-400 font-medium">
                    Minh Dat
                  </p>
                  <div className="flex text-sm text-gray-400 font-medium ">
                    <p className="mr-2">15 Reviews</p>
                    <p className="mx-2">-</p>
                    <p className="mx-2">15 Doawnloads</p>
                  </div>
                </div>
              </div>
              <div className="ml-auto mr-2 hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512 "
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-gray-400 min-w-12 max-h-6 "
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </div>
            </div> */}
          </div>
          <div className="my-2 w-1/3 bg-white bg-clip-border rounded-xl shadow-md ">
            <div className="mx-4 my-2">
              <h4 className="text-xl font-semibold text-gray-600">
                Thông tin liên lạc
              </h4>
              <p className="text-xs font-medium text-gray-400">
                Mọi đóng góp hay thắc mắc vui lòng liên hệ codengay8h@gmail.com
                để được hổ trợ hoặc bấm vào nút bên dưới. Chúc bạn 1 ngày mới
                tốt lành !!!
              </p>
              <img
                src={DevBoy}
                alt="Dev boy"
                className="object-cover w-56 h-56"
              />
              <div className="flex justify-center mt-2">
                <button
                  onClick={hanldeContact}
                  className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="">
        <h4 className="text-xl font-bold">RANKING</h4>

        <div className="flex justify-between mt-4">
          <div className="w-1/2 mr-6  bg-white bg-clip-border rounded-xl shadow-md">
            <div className="mb-4 flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng tài liệu trong từng tháng
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="month"
                name=""
                id=""
                min=""
                max=""
              />
            </div>
            <ColumnChart />
          </div>
          <div className="w-1/2  bg-white bg-clip-border rounded-xl shadow-md">
            <div className="mb-4 flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng tài liệu trong từng tháng
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="month"
                name=""
                id=""
                min=""
                max=""
              />
            </div>
            <LineChart />
          </div>
        </div>
      </div>
      {/* Ranking */}
      <div className="mt-4">
        <h4 className="text-xl font-bold">RANKING</h4>
        <div className="mt-6 flex gap-y-10  justify-center items-center md:flex-col xl:flex-row">
          {/* Top 1-3 */}
          <div className="w-1/2 flex flex-row justify-start ">
            {/* Top 2 */}
            <div className="mt-8  mr-4 flex flex-col  items-center">
              <div className="relative ">
                <div className="w-32 h-32 bg-blue-300 rounded-full flex flex-col items-center justify-center">
                  <img
                    className="w-32 h-24 object-cover rounded-full"
                    src={Avatar}
                    alt="Top 1"
                  />
                </div>
                <div className="absolute top-24  left-1/2 transform -translate-x-1/2 min-w-max px-6 py-1 bg-violet-800 text-white rounded-lg">
                  <p className="text-base font-semibold italic">
                    {top10User[1]?.user.username}
                  </p>
                </div>
              </div>
              <div className="mt-2 w-32 rounded-lg min-h-48 bg-blue-600 text-white">
                <div className="flex justify-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0  512 512"
                    fill="currentColor"
                    aria-hidden="true"
                    className=" max-w-max max-h-12 "
                  >
                    <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
                  </svg>{" "}
                </div>
                <div className=" text-center mt-4">
                  <p className="text-4xl font-bold"> {top10User[1]?.total} </p>
                  <p className="text-sm font-medium">Lượt tải tài liệu</p>
                </div>
              </div>
            </div>
            {/* Top 1 */}
            <div className=" mx-4  flex flex-col  items-center">
              <div className="relative ">
                <div className="w-32 h-32 bg-blue-300 rounded-full flex flex-col items-center justify-center">
                  <div className="absolute top-[-34px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-32 h-16 text-yellow-400"
                    >
                      <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                    </svg>
                  </div>
                  <img
                    className="w-32 h-24 object-cover rounded-full "
                    src={AvatarBoy}
                    alt="Top 1"
                  />
                </div>
                <div className="absolute top-24  left-1/2 transform -translate-x-1/2 min-w-max px-6 py-1 bg-violet-800 text-white rounded-lg">
                  <p className="text-base font-semibold italic">
                    {" "}
                    {top10User[0]?.user.username}{" "}
                  </p>
                </div>
              </div>
              <div className="mt-2 w-32 rounded-lg min-h-56 bg-blue-600 text-white">
                <div className="mt-2 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0  512 512"
                    fill="currentColor"
                    aria-hidden="true"
                    className=" max-w-max max-h-12 "
                  >
                    <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
                  </svg>
                </div>
                <div className=" text-center mt-4 ">
                  <p className="text-4xl font-bold"> {top10User[0]?.total} </p>
                  <p className="text-sm font-medium">Lượt tải tài liệu</p>
                </div>
              </div>
            </div>{" "}
            {/* Top 3 */}
            <div className="mt-16  mx-4  flex flex-col  items-center">
              <div className="relative ">
                <div className="w-32 h-32 bg-blue-300 rounded-full flex flex-col items-center justify-center">
                  <img
                    className="w-32 h-24 object-cover rounded-full "
                    src={AvatarGirl}
                    alt="Top 1"
                  />
                </div>
                <div className="absolute top-24  left-1/2 transform -translate-x-1/2 min-w-max px-6 py-1 bg-violet-800 text-white rounded-lg">
                  <p className="text-base font-semibold italic">
                    {" "}
                    {top10User[2]?.user.username}{" "}
                  </p>
                </div>
              </div>
              <div className="mt-2 w-32 rounded-lg min-h-40 bg-blue-600 text-white">
                <div className="flex justify-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0  512 512"
                    fill="currentColor"
                    aria-hidden="true"
                    className=" max-w-max max-h-12 "
                  >
                    <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
                  </svg>{" "}
                </div>
                <div className=" text-center mt-4">
                  <p className="text-4xl font-bold"> {top10User[2]?.total} </p>
                  <p className="text-sm font-medium">Lượt tải tài liệu</p>
                </div>
              </div>
            </div>{" "}
          </div>
          {/* Top 4-10 */}
          <div className="ml-4 w-1/2">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-2">
                      Rank
                    </th>
                    <th scope="col" class="px-4 py-2">
                      Avatar
                    </th>
                    <th scope="col" class="px-4 py-2">
                      Name
                    </th>
                    <th scope="col" class="px-2 py-2">
                      Downloads
                    </th>
                    <th scope="col" class="px-2 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {top10User &&
                    top10User.slice(3).map((item, index) => (
                      <tr
                        key={index + 4}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 4}
                        </th>
                        <td className="px-4 py-2">
                          <div className="w-8 h-8 bg-blue-400 rounded-full">
                            <img
                              src={AvatarBoy}
                              alt="Avatar"
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3"> {item.user.username} </td>
                        <td className="px-4 py-3"> {item.total} </td>
                        <td className="px-4 py-3 text-right">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Detail
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Donush */}
      <div>
        <h4 className="text-xl font-bold">Pie </h4>
        <div className="flex justify-between mt-4">
          <div className="w-1/2 max-h-80 bg-white rounded-lg mr-2 ">
            <div className=" flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng tài liệu trong từng tháng
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="month"
                name=""
                id=""
                min=""
                max=""
              />
            </div>
            <p className="mt-2 w-full h-[1px] bg-gray-300"> </p>
            <div className="flex justify-center items-center ">
              <DoughnutChart />
            </div>
          </div>
          <div className="w-1/2 max-h-80 bg-white rounded-lg  ml-2">
            <div className=" flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng tài liệu trong từng tháng
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="month"
                name=""
                id=""
                min=""
                max=""
              />
            </div>
            <p className="mt-2 w-full h-[1px] bg-gray-300"> </p>
            <div className="flex justify-center items-center ">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTest;
