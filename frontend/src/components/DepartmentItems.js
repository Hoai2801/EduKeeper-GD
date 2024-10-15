import React, {useContext, useEffect, useState} from "react";
import "./editDocs.css";
import toast from "react-hot-toast";
import {JWTContext} from "../App";
const DepartmentItems = ({ isActive, id}) => {
    const [items, setItems] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const [newName, setNewName] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departments, setDepartments] = useState([]);

    const hanldeClickEdit = (specialized) => {
        setNewName(specialized.specializedName)
        setIsEdit(true);
        setItemEdit(specialized);
    };

    const jwt = useContext(JWTContext)?.jwt
    const userJWT = useContext(JWTContext).user;

    const handleEditSpecialized = () => {
        console.log(selectedDepartment.id, newName, itemEdit.id)
        fetch(
            "http://localhost:8080/api/v1/specializes/" + itemEdit.id,
            {
                method: "PUT",
                headers: {"Content-Type": "application/json",
                    "authorization": "Bearer " + jwt
                },
                body: JSON.stringify({
                    specializedName: newName,
                    departmentId: selectedDepartment
                }),
            }
        ).then((res ) => {
            if (res.status === 200) {
                toast.success("Thay đổi chuyên ngành thành công!")
                setIsEdit(false);
                fetchSpecialized()
            } else {
                toast.error("Lỗi hệ thống, vui lòng thử thay đổi chuyên ngành sau!")
                setIsEdit(false);
                res.text().then((data) => toast.error(data));
            }
        })
    }

    const handleDeleteSpecialized = (id) => {
        fetch("http://localhost:8080/api/v1/specializes/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + jwt
            },
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Xóa chuyên ngành thành công!")
                setIsEdit(false);
                fetchSpecialized()
            } else {
                res.text().then((data) => toast.error(data));
            }
        });
    };

    const fetchDepartment = () => {
        fetch("http://localhost:8080/api/v1/departments")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDepartments(data);
            });
    };

    const fetchSpecialized = () => {
        fetch("http://localhost:8080/api/v1/specializes/department/" + id)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    };

    useEffect(() => {
        fetchSpecialized();
        fetchDepartment();
    }, [id]);

    function handleLockSpecialized(id) {
        fetch("http://localhost:8080/api/v1/specializes/lock/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + jwt
            },
        }).then((res) => {
            if (res.status === 200) {
                res.text().then((data) => {
                    toast.success(data)
                    fetchSpecialized()
                    setItemEdit(itemEdit => ({...itemEdit, locked: !itemEdit.locked}))
                });
            } else {
                res.text().then((data) => toast.error(data));
            }
        });
    }

    return (
        <div>
            {isActive && (
                <div className=" mt-2 p-4 bg-gray-100 rounded-md">
                    {
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className="flex justify-between ">
                                    <strong className={`w-[50%]`}>{item.specializedName}</strong>
                                    <div className="">

                                    <div>{item.locked ? <span className="text-red-600">Đã khóa</span> : "Hoạt động"}</div>
                                    </div>
                                    <a
                                        onClick={() => hanldeClickEdit(item)}
                                        class=" font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
                                    >
                                        Chỉnh sửa
                                    </a>{" "}
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            )}

            {isEdit && (
                <div className="popup">
                    <div className="popup-content ">
                        <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
                            <h2 className="text-xl font-semibold mb-6">
                                Chỉnh sửa thông tin chuyên ngành
                            </h2>
                            <form>
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
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                </div>
                            </form>
                            <form className="mt-4">
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Chuyển ngành sang khoa
                                    </label>
                                    <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="">Chọn khoa</option>
                                        {
                                            departments.map((dep, index) => (
                                                <option selected={itemEdit.department.id === dep.id} key={index} value={dep.id}>{dep.departmentName}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </form>
                            <div className="mt-6  flex justify-center ">
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="font-medium text-slate-500 rounded-xl w-full h-10 min-w-max px-12 bg-white border border-1 border-slate-500"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => handleEditSpecialized()}
                                    className="ml-4 font-medium  text-white rounded-xl w-full text-center h-10 min-w-max px-12 bg-blue-500"
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <button onClick={() => handleLockSpecialized(itemEdit.id)}
                                    className={`w-full mt-3 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-gray-500 ${userJWT.role === "ROLE_ADMIN" ? "" : "hidden"}`}>{itemEdit.locked ? "Mở khóa" : "Khóa"}</button>
                            <button onClick={() => handleDeleteSpecialized(itemEdit.id)}
                                    className={`w-full mt-3 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-red-500`}>Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentItems;