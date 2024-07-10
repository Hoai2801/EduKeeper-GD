import React, { useEffect, useState } from "react";
import "./editDocs.css";
import toast from "react-hot-toast";
const DepartmentItems = ({ isActive, id , dep}) => {
    const [items, setItems] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const [newName, setNewName] = useState(null);

    const hanldeClickEdit = (specialized) => {
        console.log(jwt)
        setNewName(specialized.specializedName)
        setIsEdit(true);
        setItemEdit(specialized);
    };

    const [jwt, setJwt] = useState(null);
    useEffect(() => {
        const jwt = localStorage.getItem("token");
        if (jwt) {
            setJwt(jwt);
        }
    }, [jwt]);

    console.log(jwt)

    const handleEditSpecialized = () => {
                const specializedDTO = {
                    specializedName: newName,
                    departmentId: itemEdit.department.id
                };
                console.log(specializedDTO)
                fetch(
                    "http://localhost:8080/api/v1/specializes/" + itemEdit.id,
                    {
                        method: "PUT",
                        headers: {"Content-Type": "application/json",
                            "authorization": "Bearer " + jwt
                        },
                        body: JSON.stringify({
                            specializedName: newName,
                            departmentId: itemEdit.department.id
                        }),
                    }
                ).then((res ) => res.text())
                    .then((data) => {
                        console.log(data)
                        if (data === "Update specialized successfully") {
                            toast.success("Chỉnh sửa chuyên ngành này.");
                        } else {
                            const errorResponse = data;
                            toast.error("Error: " + (errorResponse.message || "Unknown error"));
                        }
                    })
                    .catch((e) => {
                        toast.error(e);
                    });
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/specializes/department/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    }, [id]);
    return (
        <div>
            {isActive && (
                <div className=" mt-2 p-4 bg-gray-100 rounded-md">
                    {
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className="flex justify-between ">
                                    <strong>{item.specializedName}</strong>
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
                            <div className="mt-6  flex justify-end ">
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="font-medium text-slate-500 rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-white border border-1 border-slate-500"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => handleEditSpecialized()}
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

export default DepartmentItems;