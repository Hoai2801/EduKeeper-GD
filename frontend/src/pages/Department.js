import React, {useEffect, useState} from "react";
import removeIcon from "../assets/logo192.png";
import editIcon from "../assets/edit-246.png";
import DepartmentItems from "../components/DepartmentItems";
import toast from "react-hot-toast";
import "./Department.css";

const Department = () => {
    const [department, setDepartment] = useState(null);
    const [selectDepartment, setSelectDepartment] = useState(null);
    const [specialized, setSpecialized] = useState(null);
    const [isShowPostSpecialized, setIsShowPostSpecialized] = useState(false);
    const [activeDocumentId, setActiveDocumentId] = useState(null);

    const [jwt, setJwt] = useState(null);

    const handleToggleDetails = (id) => {
        setActiveDocumentId((prevId) => (prevId === id ? null : id));
    };

    const handleClickAddSpecialized = (dep) => {
        setIsShowPostSpecialized(true);
        setSelectDepartment(dep);
    };

    const hanldePostSpecialized = () => {
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
                    'authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify(specializedDTO),
            }).then((res) => res.text())
                .then((data) => {
                    console.log(data)
                    if (data === "Create new specialized successfully") {
                        toast.success(
                            "Tạo chuyên ngành mới cho khoa " +
                            selectDepartment.departmentName +
                            " thành công."
                        );
                    } else {
                        toast.error(
                            "Lỗi hệ thống!, vui lòng thử lại sao!"
                        );
                    }
                }).catch(e => {
                toast.error(e);
            })
            // Call api


            setSpecialized("");
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/departments")
            .then((res) => res.json())
            .then((data) => {
                setDepartment(data);
            });
        const token = localStorage.getItem("token");
        if (token) {
        setJwt(token);
        }
    }, []);
    return (
        <div>
            {department &&
                department.map((dep) => (
                    <div key={dep.id}>
                        <div className="flex justify-between w-full border shadow-lg rounded-xl border-black p-4 mt-5">
                            <h1 className="text-2xl">{dep.departmentName}</h1>
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
                            </div>
                        </div>
                        {activeDocumentId && (
                            <DepartmentItems
                                isActive={activeDocumentId == dep.id}
                                id={activeDocumentId}
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
                                    onClick={hanldePostSpecialized}
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