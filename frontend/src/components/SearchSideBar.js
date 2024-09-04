import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import filterIcon from "../assets/filter.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SearchSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [sortParam, setSortParam] = useState("");
  const [sort, setSort] = useState({
    name: "Mới nhất",
    value: "lastest",
  });
  const sorts = [
    {
      name: "Mới nhất",
      value: "lastest",
    },
    {
      name: "Xem nhiều",
      value: "most-viewed",
    },
    {
      name: "Tải nhiều",
      value: "most-downloaded",
    },
  ];
  const [sortResult, setSortResult] = useState({
    name: "Sắp xếp",
    value: "",
  });
  const sortsResult = [
    {
      name: "Lượt thích",
      value: "favorites",
    },
    {
      name: "Số trang",
      value: "pages",
    },
    {
      name: "Dung lượng",
      value: "document_size",
    },
  ];
  const handleSort = (value) => () => {
    setSort(value);
  };
  const handleSortResult = (value) => {
    searchParams.set("sort", value);
    setSortParam(searchParams.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const newSort = searchParams.toString();
  const [departmentList, setDepartmentList] = useState([]);
  const [specializesList, setSpecializesList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [isFilterShow, setIsFilterShow] = useState(false);
  const [isDropFilter, setIsDropFilter] = useState(false);

  const handleSearch = (event) => {
    localStorage.setItem("search", event.target.value);
  };

  const [department, setDepartment] = useState(null);
  const [isDropSort, setIsDropSort] = useState(false);
  const [isDropSortResult, setIsDropSortResult] = useState(false);
  const [specialized, setSpecialized] = useState(null);
  const [subject, setSubject] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    fetch("http://103.241.43.206:8080/api/v1/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartmentList(data.filter((item) => item.locked === false));
      });
  }, []);

  useEffect(() => {
    if (department) {
      fetch(
        `http://103.241.43.206:8080/api/v1/specializes/department/${department.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSpecializesList(data);
        });
    }
  }, [department]);

  useEffect(() => {
    if (specialized) {
      console.log(specialized.id);
      fetch(
        "http://103.241.43.206:8080/api/v1/subjects/specialized/" + specialized.id
      )
        .then((response) => response.json())
        .then((data) => {
          setSubjectList(data);
        });
    }
  }, [specialized]);

  const filter = () => {
    const redirect =
      `http://103.241.43.206/search?filter&order=${sort.value}` +
      (department ? `&department=${department.departmentSlug}` : "") +
      (specialized ? `&specialized=${specialized.specializedSlug}` : "") +
      (subject
        ? `&subject=${subject.subjectSlug}`
        : "" + (year ? `&publishYear=${year}` : ""));

    window.location.href = redirect;
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        filter();
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [sort, department, specialized]);

  useEffect(() => {
    fetch("http://103.241.43.206:8080/api/v1/subjects/specialized/40")
      .then((res) => res.json())
      .then((data) => {
        setSubjectList(data);
      });
  }, []);

  return (
    <div className="flex justify-between w-screen gap-5 px-4">
      <div className={`flex md:flex-col flex-col justify-center h-fit gap-2`}>
        <div
          className={`md:w-full flex xl:min-w-[280px] md:min-w-[280px]  w-full h-full   items-center flex-col gap-5 pr-4 `}
        >
          <p className="text-2xl font-bold my-2">Lọc</p>
          <div className="flex items-center gap-2 bg-gray-50 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ">
            <form className="xl:w-96 md:w-96 w-56 mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 xl:p-4 md:p-4 xl:ps-10 md:ps-10 ps-10 text-sm text-gray-900  focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-0"
                  placeholder="Từ khóa"
                  required
                  onChange={handleSearch}
                />
              </div>
            </form>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            <div className="relative inline-block z-50 md:w-32 xl:w-32 w-28 ">
              <button
                onClick={() => {
                  setIsDropSort(!isDropSort);
                }}
                className="inline-flex gap-2 justify-center items-center w-full px-4 py-2 xl:text-sm md:text-sm text-xs font-medium text-gray-700 focus:outline-none focus:ring-0"
              >
                {sort.name}
                <svg
                  className={` h-5 w-5 transition-transform duration-200 ease-in-out ${
                    isDropSort ? "rotate-180" : ""
                  } `}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06-.02L10 10.659l3.71-3.45a.75.75 0 111.02 1.1l-4 3.75a.75.75 0 01-1.02 0l-4-3.75a.75.75 0 01-.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <ul
                className={`${
                  isDropSort ? "absolute" : "hidden"
                } z-10 text-xs font-medium text-gray-500 -right-2 top-14 w-36 rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                {sorts.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 hover:cursor-pointer"
                    onClick={() => {
                      setSort(item);
                      setIsDropSort(!isDropSort);
                    }}
                  >
                    <div
                      className={`flex  justify-between px-4 py-2  hover:bg-gray-100 ${
                        item.name == sort.name ? "bg-gray-100 rounded-lg " : ""
                      }`}
                    >
                      <p>{item.name}</p>
                      <svg
                        className={`w-4 h-4 ${
                          item.name == sort.name ? "block " : "hidden"
                        }`}
                        fill="currentColor"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between xl:px-4 xl:mr-5 md:mr-11 gap-2 max-w-full mr-11">
          {/* Sort result */}
          <div className="xl:max-w-1/4 xl:min-w-1/4 bg-white">
            <div className="relative inline-block  w-fit min-w-32 ">
              <button
                onClick={() => {
                  setIsDropSortResult(!isDropSortResult);
                }}
                className="inline-flex gap-2 border shadow-md rounded-lg border-gray-300 justify-center items-center w-full  px-4 py-2  text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
              >
                {sortResult.name}
                <svg
                  className={` h-5 w-5 transition-transform duration-200 ease-in-out ${
                    isDropSortResult ? "rotate-180" : ""
                  } `}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06-.02L10 10.659l3.71-3.45a.75.75 0 111.02 1.1l-4 3.75a.75.75 0 01-1.02 0l-4-3.75a.75.75 0 01-.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <ul
                className={`${
                  isDropSortResult ? "absolute" : "hidden"
                } z-10 text-xs font-medium text-gray-500 -right-2 top-14 w-36 rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                {sortsResult.map((item, index) => (
                  // <Link to={`${location.pathname}?${item.value}`}>
                  <li
                    key={index}
                    className="p-2 hover:cursor-pointer"
                    onClick={() => {
                      setSortResult(item);
                      setIsDropSortResult(!isDropSortResult);
                      handleSortResult(item.value);
                    }}
                  >
                    <div
                      className={`flex  justify-between px-4 py-2  hover:bg-gray-100 ${
                        item.name == sortResult.name
                          ? "bg-gray-100 rounded-lg "
                          : ""
                      }`}
                    >
                      <p>{item.name}</p>
                      <svg
                        className={`w-4 h-4 ${
                          item.name == sortResult.name ? "block " : "hidden"
                        }`}
                        fill="currentColor"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    </div>
                  </li>
                  // </Link>
                ))}
              </ul>
            </div>
          </div>
          {/* Recomment */}
          <div className="xl:flex md:flex hidden items-center justify-center space-x-6 max-w-2/4 font-medium">
            <Link
              to={`/search?category=nguyen-cuu-khoa-hoc`}
              className="text-gray-900 hover:text-gray-500"
            >
              Nguyên cứu khoa học
            </Link>
            <Link
              to={`/search?category=giao-trinh`}
              className="text-gray-900 hover:text-gray-500"
            >
              Giáo trình
            </Link>
            <Link
              to={`/search?category=sach`}
              className="text-gray-900 hover:text-gray-500"
            >
              Sách{" "}
            </Link>
            <Link
              to={`/search?category=tai-lieu`}
              className="text-gray-900 hover:text-gray-500"
            >
              Tài liệu
            </Link>

            <svg
              className="h-5 w-5 text-gray-900 hover:text-gray-700 hover:cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          {/* Filters */}

          <div className="bg-white xl:max-w-1/4 xl:min-w-1/4">
            <div className="relative inline-block  xl:w-32 md:w-32 w-28 ">
              <button
                onClick={() => {
                  setIsDropFilter(!isDropFilter);
                }}
                className="inline-flex gap-2 border shadow-md rounded-lg border-gray-300 justify-center items-center w-full px-4 py-2  text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
              >
                <svg
                  className={` h-5 w-5 transition-transform duration-200 ease-in-out ${
                    isDropFilter ? "rotate-180" : ""
                  } `}
                  fill="currentColor"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7 96 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 301.7 32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-160 0zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L320 96z" />
                </svg>
                Bộ lọc
              </button>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col w-full mt-8 transition-transform duration-300 ease-in-out transform ${
            isDropFilter
              ? "translate-y-0 opacity-100 "
              : "-translate-y-10 opacity-0 hidden"
          }`}
        >
          <div className="flex justify-between mr-12 ml-4 gap-4">
            <div className="w-1/4">
              <label
                htmlFor="departments"
                className="block mb-2 text-sm text-gray-500 font-medium"
              >
                Khoa
              </label>
              <select
                id="departments"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                onChange={(event) => {
                  const selectedDepartment = event.target.value
                    ? JSON.parse(event.target.value)
                    : null;
                  setDepartment(selectedDepartment);
                }}
              >
                <option value="">Chọn khoa</option>
                {departmentList.map((department) => (
                  <option
                    key={department.id}
                    value={JSON.stringify(department)}
                  >
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/4">
              <label
                htmlFor="specialies"
                className="block mb-2 text-sm text-gray-500 font-medium"
              >
                Chuyên ngành
              </label>
              <select
                id="specialies"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                onChange={(event) => {
                  const selectedSpecialies = event.target.value
                    ? JSON.parse(event.target.value)
                    : null;
                  setSpecialized(selectedSpecialies);
                }}
              >
                <option value="">Chọn chuyên ngành</option>
                {specializesList.map((specialized) => (
                  <option
                    key={specialized.id}
                    value={JSON.stringify(specialized)}
                  >
                    {specialized.specializedName}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/4">
              <label
                htmlFor="specialies"
                className="block mb-2 text-sm text-gray-500 font-medium"
              >
                Môn học
              </label>
              <select
                id="specialies"
                className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                onChange={(event) => {
                  const selectedSubject = event.target.value
                    ? JSON.parse(event.target.value)
                    : null;
                  setSubject(selectedSubject);
                }}
              >
                <option value="">Chọn môn học</option>
                {subjectList.map((subject) => (
                  <option key={subject.id} value={JSON.stringify(subject)}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/4">
              <label
                htmlFor="publication-date"
                className="block mb-2 text-sm text-gray-500 font-medium"
              >
                Năm xuất bản
              </label>
              <select
                id="publication-date"
                onChange={(event) => {
                  setYear(event.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              >
                <option value="">Năm xuất bản</option>
                {Array.from(
                  { length: new Date().getFullYear() - 2020 + 1 },
                  (_, index) => (
                    <option key={2020 + index}>{2020 + index}</option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className=" flex pt-5 justify-end mr-12">
            <button
              onClick={filter}
              className="bg-blue-500 rounded-3xl w-[100px] h-[40px] text-center text-white text-sm font-semibold"
            >
              Lọc
            </button>
          </div>
        </div>
        <div className="flex justify-center w-screen rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
