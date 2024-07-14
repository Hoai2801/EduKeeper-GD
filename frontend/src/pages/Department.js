import React, {useContext, useEffect, useState} from "react";
import removeIcon from "../assets/logo192.png";
import editIcon from "../assets/edit-246.png";
import DepartmentItems from "../components/DepartmentItems";
import toast from "react-hot-toast";
import "./Department.css";
import {JWTContext} from "../App";

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
        setSpecialized("")
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
            fetch('http://localhost:8080/api/v1/specializes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + userJWT?.token
                },
                body: JSON.stringify(specializedDTO),
            }).then((res) => {
                if (res.status === 200) {
                    toast.success("Thêm chuyên ngành thành công!")
                    setIsShowPostSpecialized(false);
                    fetchDepartment()
                    handleToggleDetails(id)
                } else {
                    res.text().then((data) => toast.error(data));
                }
                setSpecialized("")
            })
        }
    };

    const fetchDepartment = () => {
        fetch("http://localhost:8080/api/v1/departments")
            .then((res) => res.json())
            .then((data) => {
                setDepartment(data);
            });
    };

    useEffect(() => {
        fetchDepartment()
    }, []);

    function addDepartment() {
        if (!departmentName) {
            toast.error("Tên khoa không được trống!");
        } else {
            const departmentDTO = {
                departmentName: departmentName
            };
            fetch('http://localhost:8080/api/v1/departments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + userJWT?.token
                },
                body: JSON.stringify(departmentDTO),
            }).then((res) => {
                if (res.status === 200) {
                    setIsShowAddDepartment(false);
                    fetchDepartment();
                    toast.success("Thêm khoa thành công!")
                    res.text().then((data) => toast.success(data));
                } else {
                    res.text().then((data) => toast.error(data));
                }
            })
        }
    }

    function updateSpecialized() {
        fetch("http://localhost:8080/api/v1/departments/" + selectDepartment.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + userJWT?.token
            },
            body: JSON.stringify({
                departmentName: selectDepartment.departmentName
            }),
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Thay đổi chuyên ngành thành công!")
                setIsEditDepartment(false);
                fetchDepartment()
            } else {
                res.text().then((data) => toast.error(data));
            }
        })
    }

    function lockDepartment(id) {
        fetch("http://localhost:8080/api/v1/departments/lock/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + userJWT?.token
            },
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Khoá khoa thành công!")
                fetchDepartment()
                selectDepartment.locked = !selectDepartment.locked
            } else {
                res.text().then((data) => toast.error(data));
            }
        })
    }

    function deleteDepartment(id) {
        fetch("http://localhost:8080/api/v1/departments/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + userJWT?.token
            },
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Xóa khoa thành công!")
                fetchDepartment()
                setIsEditDepartment(false);
            } else {
                res.text().then((data) => toast.error(data));
            }
        })
    }

    return (
        <div>
            <div className={`flex justify-between mt-5`}>
                <div>
                    <h1 className="text-3xl font-bold">Danh sách khoa</h1>
                    <div>
                        <p className={`text-red-500`}>Lưu ý: </p>
                        <p>- Khoa hiện đang có các chuyên ngành thì không thể bị xóa. Vui lòng thử thay đổi chuyên ngành sang các khoa khác</p>
                        <p>- Nếu khoa đang bị khoá. Các chuyên ngành thuộc khoa cũng không thể được truy cập, thêm tài liệu...</p>
                    </div>
                </div>
                <div className={`flex justify-end my-5`}>
                    <button
                        onClick={() => setIsShowAddDepartment(true)}
                        className={`bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>
                        Thêm khoa
                    </button>
                </div>
            </div>
            {department &&
                department.map((dep) => (
                    <div key={dep.id}>
                        <div className="flex justify-between w-full border shadow-lg rounded-xl border-black p-4 mt-5">
                            <h1 className="text-2xl w-[50%]">{dep.departmentName}</h1>
                            <p>{dep.locked ? <span className="text-red-600">Đã khóa</span> : "Hoạt động"}</p>
                            <div className=" flex items-end">
                                <a
                                    onClick={() => handleClickAddSpecialized(dep)}
                                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                                >
                                    Thêm ngành mới
                                </a>
                                <a
                                    onClick={() => handleToggleDetails(dep.id)}
                                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                                >
                                    Chi tiết
                                </a>
                                <a
                                    onClick={() => {
                                        setSelectDepartment(dep);
                                        setIsEditDepartment(true)
                                    }}
                                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                                >
                                    Sửa
                                </a>
                            </div>
                        </div>
                        {activeDocumentId && (
                            <DepartmentItems
                                isActive={activeDocumentId == dep.id}
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
            {
                isShowAddDepartment && (
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
                )
            }
            {
                isEditDepartment && (
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
                                            onChange={(e) => setSelectDepartment({
                                                ...selectDepartment,
                                                departmentName: e.target.value
                                            })}
                                        />
                                    </div>
                                </form>
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
                                <button
                                    className="w-full mt-3 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-red-500"
                                    onClick={() => lockDepartment(selectDepartment.id)}
                                >
                                    {selectDepartment.locked ? "Mở khóa" : "Khóa"}
                                </button>
                                <button
                                    className="w-full mt-3 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-red-500"
                                    onClick={() => deleteDepartment(selectDepartment.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Department;