import React, { useContext, useEffect, useState } from "react";
import DepartmentItems from "../components/DepartmentItems";
import toast from "react-hot-toast";
import "./Department.css";
import { JWTContext } from "../App";

const Department = () => {
  const [department, setDepartment] = useState(null);
  const [selectDepartment, setSelectDepartment] = useState(null);
  const [specialized, setSpecialized] = useState(null);
  const [isShowPostSpecialized, setIsShowPostSpecialized] = useState(false);
  const [activeDocumentId, setActiveDocumentId] = useState(null);
  const [isShowAddDepartment, setIsShowAddDepartment] = useState(false);
  const [isEditDepartment, setIsEditDepartment] = useState(false);
  const [departmentName, setDepartmentName] = useState("");

  const userJWT = useContext(JWTContext);

  const handleToggleDetails = (id) => {
    setActiveDocumentId((prevId) => (prevId === id ? null : id));
  };

  const handleClickAddSpecialized = (dep) => {
    setIsShowPostSpecialized(true);
    setSpecialized("");
    setSelectDepartment(dep);
  };

  const hanldePostSpecialized = (id) => {
    if (!specialized) {
      toast.error("Bạn đang để trống tên chuyên ngành !");
    } else {
      const specializedDTO = {
        departmentId: selectDepartment.id,
        specializedName: specialized,
      };
      fetch("http://103.241.43.206:8080/api/v1/specializes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userJWT?.jwt,
        },
        body: JSON.stringify(specializedDTO),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Thêm chuyên ngành thành công!");
          setIsShowPostSpecialized(false);
          fetchDepartment();
          handleToggleDetails(id);
        } else {
          res.text().then((data) => toast.error(data));
        }
        setSpecialized("");
      });
    }
  };

  const fetchDepartment = () => {
    fetch("http://103.241.43.206:8080/api/v1/departments")
      .then((res) => res.json())
      .then((data) => {
        setDepartment(data);
      });
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  function addDepartment() {
    if (!departmentName) {
      toast.error("Tên khoa không được trống!");
    } else {
      const departmentDTO = {
        departmentName: departmentName,
      };
      fetch("http://103.241.43.206:8080/api/v1/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userJWT?.jwt,
        },
        body: JSON.stringify(departmentDTO),
      }).then((res) => {
        if (res.status === 200) {
          setIsShowAddDepartment(false);
          fetchDepartment();
          toast.success("Thêm khoa thành công!");
          res.text().then((data) => toast.success(data));
        } else {
          res.text().then((data) => toast.error(data));
        }
      });
    }
  }

  function updateSpecialized() {
    fetch("http://103.241.43.206:8080/api/v1/departments/" + selectDepartment.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userJWT?.jwt,
      },
      body: JSON.stringify({
        departmentName: selectDepartment.departmentName,
      }),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Thay đổi chuyên ngành thành công!");
        setIsEditDepartment(false);
        fetchDepartment();
      } else {
        res.text().then((data) => toast.error(data));
      }
    });
  }

  function lockDepartment(id) {
    fetch("http://103.241.43.206:8080/api/v1/departments/lock/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userJWT?.jwt,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Khoá khoa thành công!");
        fetchDepartment();
        selectDepartment.locked = !selectDepartment.locked;
      } else {
        res.text().then((data) => toast.error(data));
      }
    });
  }

  function deleteDepartment(id) {
    fetch("http://103.241.43.206:8080/api/v1/departments/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userJWT?.jwt,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Xóa khoa thành công!");
        fetchDepartment();
        setIsEditDepartment(false);
      } else {
        res.text().then((data) => toast.error(data));
      }
    });
  }

  return (
    <div>
      <div
        className={`flex xl:flex-row md:flex-row sm:flex-row flex-col justify-between mt-5`}
      >
        <div className="xl:w-4/5 md:w-4/5 ">
          <h1 className="text-3xl font-bold">Danh sách khoa</h1>
          <div>
            <p className={`text-red-500`}>Lưu ý: </p>
            <p>
              - Khoa hiện đang có các chuyên ngành thì không thể bị xóa. Vui
              lòng thử thay đổi chuyên ngành sang các khoa khác
            </p>
            <p>
              - Nếu khoa đang bị khoá. Các chuyên ngành thuộc khoa cũng không
              thể được truy cập, thêm tài liệu...
            </p>
          </div>
        </div>
        <div className={`flex justify-end my-5`}>
          <button
            onClick={() => setIsShowAddDepartment(true)}
            className={`bg-blue-500 text-white active:bg-blue-600 font-semibold text-base xl:px-6 px-6 py-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
          >
            Thêm khoa
          </button>
        </div>
      </div>
      {department &&
        department.map((dep) => (
          <div key={dep.id} className={`${dep.id === 18 ? "hidden" : ""}`}>
            <div className="flex justify-between items-center w-full border shadow-lg rounded-xl border-black p-4 mt-5">
              <h1 className="xl:text-2xl md:text-2xl sm:text-xl font-medium text-xl xl:w-[50%] md:w-1/2 sm:w-1/2 w-1/3">
                {dep.departmentName}
              </h1>
              <p className=" text-sm  font-medium">
                {dep.locked ? (
                  <span className="text-red-600 ">Đã khóa</span>
                ) : (
                  <span className="text-slate-500 	">Hoạt động</span>
                )}
              </p>
              <div className=" flex xl:flex-row md:flex-row sm:flex-row flex-col xl:items-end">
                <button
                  onClick={() => handleClickAddSpecialized(dep)}
                  class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                >
                  Thêm ngành mới
                </button>
                <button
                  onClick={() => handleToggleDetails(dep.id)}
                  class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => {
                    setSelectDepartment(dep);
                    setIsEditDepartment(true);
                  }}
                  class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                >
                  Sửa
                </button>
              </div>
            </div>
            {activeDocumentId && (
              <DepartmentItems
                isActive={activeDocumentId === dep.id}
                id={activeDocumentId}
                fetchDepartment={fetchDepartment}
              />
            )}
          </div>
        ))}
      {isShowPostSpecialized && (
        <div className="popup">
          <div className="popup-content ">
            <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
              <h2 className="text-xl font-semibold">Thông tin chuyên ngành</h2>
              <p className="font-semibold text-sm text-red-600">
                Lưu ý bạn đang thêm chuyên ngành mới cho khoa{" "}
                {selectDepartment.departmentName}
              </p>
              <form className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Tên chuyên ngành
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tên chuyên ngành ..."
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={specialized}
                    onChange={(e) => setSpecialized(e.target.value)}
                  />
                </div>
              </form>
              <div className="mt-6  flex justify-end ">
                <button
                  onClick={() => setIsShowPostSpecialized(false)}
                  className="font-medium text-slate-500 rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-white border border-1 border-slate-500"
                >
                  Hủy
                </button>
                <button
                  onClick={() => hanldePostSpecialized(selectDepartment.id)}
                  className="ml-4 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-blue-500"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isShowAddDepartment && (
        <div className="popup">
          <div className="popup-content ">
            <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
              <h2 className="text-xl font-semibold">Thêm khoa</h2>
              <p className="font-semibold text-sm text-red-600">
                Lưu ý bạn đang thêm khoa
              </p>
              <form className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Tên khoa
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tên khoa ..."
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                  />
                </div>
              </form>
              <div className="mt-6  flex justify-end ">
                <button
                  onClick={() => setIsShowAddDepartment(false)}
                  className="font-medium text-slate-500 rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-white border border-1 border-slate-500"
                >
                  Hủy
                </button>
                <button
                  onClick={addDepartment}
                  className="ml-4 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-blue-500"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditDepartment && (
        <div className="popup">
          <div className="popup-content ">
            <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
              <h2 className="text-xl font-semibold">Sửa khoa</h2>
              <form className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Tên khoa
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tên khoa ..."
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={selectDepartment.departmentName}
                    onChange={(e) =>
                      setSelectDepartment({
                        ...selectDepartment,
                        departmentName: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
              <div className="flex flex-col justify-between">
                <button
                  className=" mt-3 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-gray-500"
                  onClick={() => lockDepartment(selectDepartment.id)}
                >
                  {selectDepartment.locked ? (
                    <div className="flex flex-row items-center gap-x-4">
                      <svg
                        fill="currentColor"
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z" />
                      </svg>
                      <p>Mở khóa khoa này</p>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center gap-x-4">
                      <svg
                        fill="currentColor"
                        className="w-4 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                      </svg>
                      <p>Khóa khoa này</p>
                    </div>
                  )}
                </button>
                <button
                  className={` mt-3 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-red-500 ${
                    userJWT.user.role === "ROLE_SUB-ADMIN" ? "hidden" : ""
                  }`}
                  onClick={() => deleteDepartment(selectDepartment.id)}
                >
                  <div className="flex flex-row items-center gap-x-4">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                    <p>Xóa khoa này</p>
                  </div>
                </button>
              </div>
              <div className="mt-6  flex justify-between">
                <button
                  onClick={() => setIsEditDepartment(false)}
                  className="font-medium w-full text-slate-500 rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-white border border-1 border-slate-500"
                >
                  Hủy
                </button>
                <button
                  onClick={updateSpecialized}
                  className="ml-4 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-blue-500"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;
