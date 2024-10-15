import React, { useEffect, useState } from "react";
import ColumnChart from "../components/Chart";
import {
  LineChart,
  DoughnutDocsChart,
  DoughnutUserChart,
} from "../components/Chart";
import { useHandleDetailDocs } from "../components/HandleEvent";
import DevBoy from "../assets/dev-boy.webp";
import DefaultDocs from "../assets/docs.jpg";
import Top3User from "../components/rankingUser/Top3User";
import Top2User from "../components/rankingUser/Top2User";
import Top1User from "../components/rankingUser/Top1User";
import TableTopUser from "../components/rankingUser/TableTopUser";
const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [top10Docs, setTop10Docs] = useState([]);
  const [top10User, setTop10User] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalDraftDocuments, setTotalDraftDocuments] = useState(0);
  const [totalPublishedDocuments, setTotalPublishedDocuments] = useState(0);
  const [totalTodayDocuments, setTotalTodayDocuments] = useState(0);
  const [yearColumnChart, setYearColumnChart] = useState(currentYear);
  const [yearLineChart, setYearLineChart] = useState(currentYear);
  const [departments, setDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState(0);

  const [yearDoughnutDocsChart, setYearDoughnutDocsChart] =
    useState(currentYear);
  const [yearDoughnutUserChart, setYearDoughnutUserChart] =
    useState(currentYear);
  const handleDetailDocs = useHandleDetailDocs();
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users/top-downloads")
      .then((res) => res.json())
      .then((data) => {
        setTop10User(data);
      });

    fetch("http://localhost:8080/api/v1/documents/count")
      .then((res) => res.json())
      .then((data) => {
        setTotalDocuments(data);
      });

    fetch("http://localhost:8080/api/v1/documents/count-draft")
      .then((res) => res.json())
      .then((data) => {
        setTotalDraftDocuments(data);
      });

    fetch("http://localhost:8080/api/v1/documents/count-published")
      .then((res) => res.json())
      .then((data) => {
        setTotalPublishedDocuments(data);
      });

    fetch("http://localhost:8080/api/v1/documents/today")
      .then((res) => res.json())
      .then((data) => {
        setTotalTodayDocuments(data);
      });

    fetch("http://localhost:8080/api/v1/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
        setSelectDepartment(data?.[0].id);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/downloads/top-documents/${selectDepartment}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTop10Docs(data);
      });
  }, [selectDepartment]);

  const handleDetailUser = (id) => {
    console.log(id);

    setIsShowDetail(true);
  };

  const hanldeContact = () => {
    window.location.href =
      "https://www.facebook.com/profile.php?id=100009283092043";
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-8 gap-x-4 md:grid-cols-2 xl:grid-cols-4 ">
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
              {totalDocuments}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{9}%</strong>
              &nbsp;so với năm trước
            </p> */}
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
              {totalDraftDocuments}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">
                {Math.round(
                  ((totalDraftDocuments ? totalDraftDocuments : 0) * 100) /
                    totalDocuments
                )}
                %
              </strong>
              &nbsp;so với tổng tài liệu
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
              {totalPublishedDocuments}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">
                {Math.round((totalPublishedDocuments * 100) / totalDocuments)}%
              </strong>
              &nbsp;so với tổng tài liệu
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
              {totalTodayDocuments}
            </h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            {/* <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-green-500">{10}%</strong>
              &nbsp;so với tháng trước
            </p> */}
          </div>
        </div>
      </div>
      {/* Top 10 Docs */}
      <div>
        <div className="flex gap-y-4 flex-col sm:flex-col md:flex-row xl:flex-row items-center">
          <div className="xl:w-2/3 md:w-2/3  xl:mr-4 w-screen px-4">
            <div className="flex mb-2 justify-between items-center xl:mx-4  md:mx-4">
              <h4 className="text-xl font-bold">Top 10 Docs</h4>
              <select
                value={selectDepartment}
                onChange={(event) => setSelectDepartment(event.target.value)}
                id="specialized"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {departments &&
                  departments.map((dep, index) => {
                    return (
                      <option key={index} value={dep.id}>
                        {" "}
                        {dep.departmentName}{" "}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="xl:max-h-96 md:max-h-[380px] max-h-80   overflow-auto">
              {top10Docs.length > 0 ? (
                top10Docs.map((docs, index) => {
                  return (
                    <div
                      key={index}
                      className="my-2 w-full  bg-white bg-clip-border rounded-xl shadow-md flex items-center p-2 "
                    >
                      <div className="max-w-32 h-32 overflow-hidden rounded-xl w-1/3">
                        <img
                          src={
                            docs.thumbnail
                              ? `http://localhost:8080/api/v1/images/${docs.thumbnail}`
                              : DefaultDocs
                          }
                          alt="Thumbnail docs"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="xl:min-w-48  md:max-w-72 xl:max-w-72 ml-2 sm:min-w-40 ">
                        <div className="">
                          <p className="text-lg text-gray-600 font-semibold">
                            {docs.title}
                          </p>
                          <p className="my-1 text-sm  text-gray-400 font-medium">
                            {docs.author?.username}
                          </p>
                          <div className="flex xl:flex-row md:flex-row sm:flex-row flex-col text-sm text-gray-400 font-medium gap-1">
                            <p className="">{docs.views} Views</p>
                            <p className="xl:block md:block sm:block hidden">
                              -
                            </p>
                            <p className="">{docs.download} Doawnloads</p>
                            <p className="xl:block md:block sm:block hidden">
                              -
                            </p>
                            <p className="">{docs.favorites} Likes</p>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => handleDetailDocs(docs.slug)}
                        className="ml-auto mr-2 hover:cursor-pointer "
                      >
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
                })
              ) : (
                <div className="">
                  <div className="min-h-32 w-full bg-gray-200 bg-clip-border rounded-xl shadow-md flex items-center pb-4 ">
                    <div className="min-w-48 min-h-8 ">
                      <div className="p-4">
                        <h4 className="text-xl font-semibold">
                          Chào mừng bạn đến với phần top 10 tài liệu nổi bật
                        </h4>
                        <p className="my-1 text-sm max-w-2xl text-gray-400 font-medium">
                          Có vẻ như hiện tại khoa này chưa có tài liệu nào nổi
                          bật, vui lòng quay trở lại sau khi có thông báo mới!
                          Hãy khám phá những thứ thú vị khác đang đợi bạn.
                        </p>
                      </div>
                      <div className="ml-4 mb-2">
                        <button
                          className="px-4 py-2 border-solid border-2 border-gray-400 rounded-lg 	  text-sm font-medium"
                          type="submit"
                        >
                          <span>Khám phá ngay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my-2 xl:w-1/3 md:w-1/3 bg-white bg-clip-border rounded-xl shadow-md ">
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
      <div className="mt-2">
        <h4 className="text-xl font-bold">Chart</h4>
        <div className="flex justify-between mt-4 flex-col md:flex-row md:gap-4 xl:gap-4 xl:flex-row gap-y-4">
          <div className="xl:w-1/2 md:w-1/2 bg-white bg-clip-border rounded-xl shadow-md">
            <div className="mb-4 flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng tài liệu trong từng tháng của năm
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="number"
                defaultValue={currentYear}
                onChange={(e) => {
                  setYearColumnChart(e.target.value);
                }}
                name=""
                id=""
                min="2023"
                max={currentYear}
              />
            </div>
            <ColumnChart year={yearColumnChart} />
          </div>
          <div className="xl:w-1/2  md:w-1/2 bg-white bg-clip-border rounded-xl shadow-md">
            <div className="mb-4 flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng tài liệu và người dùng trong từng tháng của năm
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="number"
                defaultValue={currentYear}
                name=""
                onChange={(e) => {
                  setYearLineChart(e.target.value);
                }}
                id=""
                min="2023"
                max={currentYear}
              />
            </div>
            <LineChart year={yearLineChart} />
          </div>
        </div>
      </div>
      {/* Ranking */}
      <div className="mt-4">
        <h4 className="text-xl font-bold">RANKING</h4>
        <div className="mt-6  flex flex-col xl:gap-y-10 md:gap-y-10 gap-y-4 gap-x-4 justify-center items-center  md:items-center r md:flex-col xl:flex-row">
          {/* Top 1-3 */}
          <div className="xl:w-1/2  flex xl:flex-row gap-x-1 justify-center items-center md:w-1/2 w-4/5">
            {/* Top 2 */}
            {top10User[1] ? (
              <Top2User
                user={top10User[1]?.user}
                totalDownloads={top10User[1]?.totalDownloads}
                totalViews={top10User[1]?.totalViews}
              />
            ) : (
              <div>Loading....</div>
            )}
            {/* Top 1 */}
            {top10User[0] ? (
              <Top1User
                user={top10User[0]?.user}
                totalDownloads={top10User[0]?.totalDownloads}
                totalViews={top10User[0]?.totalViews}
              />
            ) : (
              <div>Loading....</div>
            )}
            {/* Top 3 */}
            {top10User[2] ? (
              <Top3User
                user={top10User[2]?.user}
                totalDownloads={top10User[2]?.totalDownloads}
                totalViews={top10User[2]?.totalViews}
              />
            ) : (
              <div>Loading....</div>
            )}
          </div>
          {/* Top 4-10 */}
          <div className="xl:ml-4 xl:w-1/2 md:w-1/2">
            <TableTopUser top10User={top10User} />
          </div>
        </div>
      </div>
      {/* Donush */}
      <div>
        <h4 className="text-xl font-bold">Pie </h4>
        <div className="flex xl:flex-row md:flex-row flex-col justify-between mt-4 xl:gap-4 md:gap-4 gap-y-4">
          <div className="xl:w-1/2 md:w-1/2 max-h-80 bg-white rounded-lg ">
            <div className=" flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng tài liệu trong năm
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="number"
                defaultValue={currentYear}
                onChange={(e) => {
                  setYearDoughnutDocsChart(e.target.value);
                }}
                name=""
                id=""
                min="2023"
                max={currentYear}
              />
            </div>
            <p className="mt-2 w-full h-[1px] bg-gray-300"> </p>
            <div className="flex justify-center items-center ">
              <DoughnutDocsChart year={yearDoughnutDocsChart} />
            </div>
          </div>
          <div className="xl:w-1/2 md:w-1/2 max-h-80 bg-white rounded-lg ">
            <div className=" flex justify-between items-center mx-4">
              <p className="text-sm font-medium text-gray-700">
                Biểu đồ số lượng người tham gia trong năm
              </p>
              <input
                className="w-[80px] text-sm text-gray-500 p-2 border-solid rounded-lg border-[1px] border-gray-300 font-semibold mt-2"
                type="number"
                defaultValue={currentYear}
                onChange={(e) => {
                  setYearDoughnutUserChart(e.target.value);
                }}
                name=""
                id=""
                min="2023"
                max={currentYear}
              />
            </div>
            <p className="mt-2 w-full h-[1px] bg-gray-300"> </p>
            <div className="flex justify-center items-center ">
              <DoughnutUserChart year={yearDoughnutUserChart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
