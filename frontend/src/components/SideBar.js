import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const SideBar = () => {
  const [sort, setSort] = useState("lastest");
  const handleSort = (value) => () => {
    setSort(value);
  };
  const [departmentList, setDepartmentList] = useState([]);
  const [specializesList, setSpecializesList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [isFilterShow, setIsFilterShow] = useState(false);

  const handleSearch = (event) => {
    localStorage.setItem("search", event.target.value);
  };

  const [department, setDepartment] = useState(null);
  const [specialized, setSpecialized] = useState(null);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartmentList(data);
      });
  }, []);

  useEffect(() => {
    if (department) {
      fetch(
        `http://localhost:8080/api/v1/specializes/department/${department.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSpecializesList(data);
        });
    }
  }, [department]);

  useEffect(() => {
    if (specialized) {
      console.log(specialized.id);
      fetch("http://localhost:8080/api/v1/subjects/" + specialized.id)
        .then((response) => response.json())
        .then((data) => {
          setSubjectList(data);
        });
    }
  }, [specialized]);

  const filter = () => {
    const redirect =
      `http://localhost:3000/search?filter&order=${sort}` +
      (department ? `&department=${department.departmentSlug}` : "") +
      (specialized ? `&specialized=${specialized.specializedSlug}` : "") +
      (subject ? `&subject=${subject.subjectSlug}` : "");

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

  return (
    <div className="flex justify-between w-full gap-5 p-5">
      <div
        className={`flex md:flex-row flex-col justify-center w-full gap-5 h-fit md:px-10`}
      >
        <button
          onClick={() => setIsFilterShow(!isFilterShow)}
          className={`bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded ${
            isFilterShow ? "md:hidden" : "md:hidden"
          }`}
        >
          Lọc tài liệu
        </button>
        <div
          className={`md:w-[25%] w-full h-full rounded-lg shadow-lg bg-white items-center flex-col gap-5 px-5 ${
            isFilterShow ? "md:flex" : "md:flex hidden"
          }`}
        >
          <p className="text-2xl font-bold my-2">Lọc</p>
          <form className="w-full mx-auto">
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
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Từ khóa"
                required
                onChange={handleSearch}
              />
            </div>
          </form>

          <div className="flex gap-3 mt-5">
            <div
              className={`text-center border py-2 px-3 rounded-3xl border-black hover:bg-slate-500 hover:cursor-pointer hover:text-white ${
                sort === "latest" ? "bg-slate-500 text-white" : ""
              }`}
              onClick={handleSort("lastest")}
            >
              Mới nhất
            </div>
            <div
              className={`text-center border py-2 px-3 rounded-3xl border-black hover:bg-slate-500 hover:cursor-pointer hover:text-white ${
                sort === "most-viewed" ? "bg-slate-500 text-white" : ""
              }`}
              onClick={handleSort("most-viewed")}
            >
              Xem nhiều
            </div>
            <div
              className={`text-center border py-2 px-3 rounded-3xl border-black hover:bg-slate-500 hover:cursor-pointer hover:text-white ${
                sort === "most-downloaded" ? "bg-slate-500 text-white" : ""
              }`}
              onClick={handleSort("most-downloaded")}
            >
              Tải nhiều
            </div>
          </div>

          <form className="max-w-sm mx-auto">
            <label
              htmlFor="departments"
              className="block mb-2 text-xl text-gray-900 font-semibold"
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
                <option key={department.id} value={JSON.stringify(department)}>
                  {department.departmentName}
                </option>
              ))}
            </select>
          </form>

          <form className="max-w-sm mx-auto w-full">
            <label
              htmlFor="specialies"
              className="block mb-2 text-xl text-gray-900 font-semibold"
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
          </form>
          <form className="max-w-sm mx-auto w-full">
            <label
              htmlFor="specialies"
              className="block mb-2 text-xl text-gray-900 font-semibold"
            >
              Chuyên môn
            </label>
            <select
              id="specialies"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
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
          </form>

          <div className="w-full">
            <div>
              <label
                htmlFor="publication-date"
                className="block mb-2 text-xl text-gray-900 font-semibold"
              >
                Năm xuất bản
              </label>
              <select
                id="publication-date"
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

          <div className="w-full pt-5 flex justify-center">
            <button
              onClick={filter}
              className="bg-blue-500 rounded-3xl w-[100px] h-[40px] text-center text-white text-x mb-10"
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

export default SideBar;
