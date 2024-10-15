import React, {useContext, useEffect, useState} from "react";

import SubjectItems from "../components/SubjectItems";
import toast from "react-hot-toast";
import "./Department.css";
import {JWTContext} from "../App";

const Subject = () => {
    const [subject, setSubject] = useState(null);
    const [specialized, setSpecialized] = useState(null);
    const [isShowPostSpecialized, setIsShowPostSpecialized] = useState(false);
    const [activeSpecializedId, setActiveSpecializedtId] = useState(null);
    const [selectSpecializes, setSelectSpecializes] = useState(null);
    const [isShowSpecializes, setIsShowSpecialized] = useState(false);
    const [listSpeciaziles, setListSpeciaziles] = useState([]);

    // const context = ;
    const jwt = useContext(JWTContext)?.jwt;
    const handleToggleDetails = (id) => {
        setActiveSpecializedtId((prevId) => (prevId === id ? null : id));
    };

    const handleClickCreateSpecialized = () => {
        setIsShowPostSpecialized(true);
    };

    const hanldePostSubject = () => {
        if (!subject) {
            toast.error("Bạn đang để trống tên môn học !");
        } else if (listSpeciaziles.length <= 0) {
            toast.error("Bạn đang để trống danh sách chuyên ngành !");
        } else {
            try {
                fetch("http://localhost:8080/api/v1/subjects", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + jwt,
                    },
                    body: JSON.stringify({
                        name: subject,
                        specializedIds: listSpeciaziles.map(
                            (specialized) => specialized.id
                        ),
                    }),
                }).then((res) => {
                        if (res.status === 200) {
                            return res.text().then((data) => {
                                toast.success("Thêm môn học thành công");
                                setIsShowPostSpecialized(false)
                            });
                        } else {
                            toast.error("Lỗi hệ thống!, vui là thực hiện lại!");
                        }
                    })
                    .catch((e) => {
                        toast.error(e);
                    });
            } catch (error) {
                toast.error(error);
            }
            // const handleConfirm = () => {
            //     toast.custom((t) => (
            //         <div
            //             className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
            //             <div className="flex-1 w-0 p-4">
            //                 <div className="flex items-start">
            //                     <div className="ml-3 flex-1">
            //                         <p className="text-sm font-medium text-gray-900">
            //                             Tạo môn học mới
            //                         </p>
            //                         <p className="mt-1 text-sm text-gray-500">
            //                             Bạn có chắc muốn tạo mới môn học này không
            //                         </p>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="flex border-l border-gray-300">
            //                 <button
            //                     onClick={async () => {
            //                         toast.remove(t.id);
            //                         // await createSubject();
            //                     }}
            //                     className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            //                 >
            //                     Đồng ý
            //                 </button>
            //             </div>
            //             <div className="flex border-l border-gray-300">
            //                 <button
            //                     onClick={() => toast.remove(t.id)}
            //                     className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            //                 >
            //                     Hủy
            //                 </button>
            //             </div>
            //         </div>
            //     ));
            // };
            // setSpecialized("");
            fetchSpecialized()
        }
    };

    const handleAddSpecialized = (spe) => {
        const isCheck = listSpeciaziles.find((item) => item.id === spe.id)
            ? true
            : false || listSpeciaziles.find((item) => item.id === 40);
        if (isCheck) {
            toast.error("Chuyên ngành này đã được thêm vào danh sách trên.");
        } else {
            setListSpeciaziles((prevList) => [...prevList, spe]);
            setIsShowSpecialized(true);
        }
    };

    const handleRemoveSpecialized = async (spe) => {
        const specializedId = spe.id;
        const listIds = listSpeciaziles.filter((item) => item.id !== specializedId);
        setListSpeciaziles(listIds);
    };

    const handleClosePost = () => {
        setIsShowPostSpecialized(false);
        setListSpeciaziles([]);
        setSubject("");
    };

    const fetchSpecialized = () => {
        fetch("http://localhost:8080/api/v1/specializes")
            .then((res) => res.json())
            .then((data) => {
                setSpecialized(data);
                const objectFake = {
                    id: data[0].id,
                    name: data[0].specializedName,
                };
                setSelectSpecializes(objectFake);
            });
    };

    useEffect(() => {
        fetchSpecialized();
    }, []);

    return (
        <div>
            <div className="flex xl:flex-row md:flex-row flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold mt-5">Danh sách khoa</h1>
                    <div>
                        <p className={`text-red-500`}>Lưu ý: </p>
                        <p>- Các môn học thuộc ngành là các môn học chuyên ngành</p>
                        <p>
                            - Các môn học mà ngành nào cũng có như Triết học, tư tưởng... sẽ
                            thuộc Tất cả
                        </p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => handleClickCreateSpecialized()}
                        className="xl:p-6 md:p-6 max-w-fit p-4  rounded-lg bg-blue-500 text-white mt-5 font-semibold hover:shadow-lg h-fit"
                        type="submit"
                    >
                        <span>Thêm môn học</span>
                    </button>
                </div>
            </div>

            {specialized &&
                specialized.map((spe) => (
                    <div key={spe.id}>
                        <div
                            className="flex justify-between items-center w-full border shadow-lg rounded-xl border-black p-4 mt-5">
                            <h1 className="xl:text-2xl md:text-xl sm:text-xl text-xl xl:w-[50%] md:w-1/2 sm:w-1/2 w-2/5">
                                {spe.specializedName}
                            </h1>
                            <p>
                                {spe.locked ? (
                                    <span className={`text-red-600`}>Đã khóa</span>
                                ) : (
                                    "Hoạt động"
                                )}
                            </p>
                            <div className=" flex items-end">
                                <button
                                    onClick={() => handleToggleDetails(spe.id)}
                                    class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                                >
                                    Chi tiết
                                </button>
                            </div>
                        </div>
                        {activeSpecializedId && (
                            <SubjectItems
                                isActive={activeSpecializedId === spe.id}
                                dep={spe}
                            />
                        )}
                    </div>
                ))}
            {isShowPostSpecialized && (
                <div className="popup">
                    <div className="popup-content ">
                        <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">Thông tin môn học</h2>
                            <p className="font-semibold text-sm text-red-600">
                                Lưu ý bạn đang thêm môn học mới, bạn có thể chọn nhiều chuyên
                                ngành khác nhau cho 1 môn học{" "}
                            </p>
                            <form className="mt-4">
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên môn học
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Tên môn học ..."
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                    <div>
                                        <label
                                            htmlFor="specialized"
                                            className="block mb-2 text-sm font-semibold text-gray-900 mt-5"
                                        >
                                            Thuộc ngành
                                        </label>
                                        <div className="max-h-40 overflow-auto">
                                            {isShowSpecializes &&
                                                listSpeciaziles.map((spe, index) => {
                                                    return (
                                                        <li className={`flex flex-row justify-between`}>
                                                            <p className="text-gray-500 font-medium">
                                                                {index + 1}
                                                                {". "}{" "}
                                                                <p className="" key={index}>
                                                                    {spe.name}
                                                                </p>
                                                            </p>
                                                            <button
                                                                onClick={() => {
                                                                    handleRemoveSpecialized(spe);
                                                                }}
                                                                className="text-blue-500 font-medium hover:cursor-pointer hover:underline"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                        </div>
                                        <div className="flex flex-row gap-4 mt-2">
                                            <select
                                                id="specializes"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={selectSpecializes?.specializedName}
                                                onChange={(e) => {
                                                    setSelectSpecializes(JSON.parse(e.target.value));
                                                }}
                                            >
                                                {Array.isArray(specialized) &&
                                                    specialized.map((spe) => (
                                                        <option
                                                            value={JSON.stringify({
                                                                id: spe.id,
                                                                name: spe.specializedName,
                                                            })}
                                                            key={spe.id}
                                                        >
                                                            {spe.specializedName}
                                                        </option>
                                                    ))}
                                            </select>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddSpecialized(selectSpecializes);
                                                }}
                                                className=" font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-blue-500"
                                            >
                                                Thêm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-6  flex justify-end ">
                                <button
                                    onClick={handleClosePost}
                                    className="font-medium text-slate-500 rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-white border border-1 border-slate-500"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={hanldePostSubject}
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

export default Subject;
