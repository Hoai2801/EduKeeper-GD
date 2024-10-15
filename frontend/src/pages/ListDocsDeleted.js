import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useHandleDetailDocs } from "../components/HandleEvent";

export default function DeletedDocument(params) {
    const [documents, setDocuments] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const navigate = useNavigate();
    const handleDetailDocs = useHandleDetailDocs();
    const goBack = () => {
        navigate(-1);
    };
    const prev = () => {
        if (activePage == 1) {
            alert("ko the prev nua");
        } else {
            const newPage = activePage - 1;
            setActivePage(newPage);
        }
    };
    const [checkedDocuments, setCheckedDocuments] = useState([]);

    const handleCheckboxChange = (index) => {
        if (checkedDocuments.includes(index)) {
            setCheckedDocuments(checkedDocuments.filter((item) => item !== index));
        } else {
            setCheckedDocuments([...checkedDocuments, index]);
        }
    };

    const handleAccpet = () => {
        if (checkedDocuments.length === 0) {
            toast.error("Bạn phải chọn tài liệu để cập nhật");
        } else {
            const res = async () => {
                try {
                    const response = await fetch(
                        "http://localhost:8080/api/v1/documents/recovery",
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(checkedDocuments),
                        }
                    );

                    if (response.status === 200) {
                        toast.success(
                            "Bạn vừa khôi phục tài liệu thành công " + checkedDocuments
                        ); // Success message
                        setDocuments(documents.filter((doc) => !checkedDocuments.includes(doc.id)))
                        setCheckedDocuments([]); // Clear checked documents list
                    } else {
                        toast.error("Lỗi vui lòng thử lại sau! "); // Error message on API call failure
                    }
                } catch (error) {
                    toast.error("Lỗi hệ thống, vui lòng thử lại sau! "); // Generic error message
                }
            };

            const customToast = toast.custom(() => (
                <div
                    className={` max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex  ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Khôi phục tài liệu
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Bạn có chắc muốn khôi phục các tài liệu đã chọn không
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-300">
                        <button
                            onClick={async () => {
                                toast.remove(customToast);
                                await res();
                            }}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Đồng ý
                        </button>
                    </div>
                    <div className="flex border-l border-gray-300">
                        <button
                            onClick={() => toast.remove(customToast)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            ));
        }
    };
    const next = () => {
        if (activePage == 3) {
            alert("ko the prev nua");
        } else {
            const newPage = activePage + 1;
            setActivePage(newPage);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/documents/deleted`)
            .then((res) => res.json())
            .then((data) => {
                setDocuments(data);
            });
    }, []);

    return (
        <div>
            <div className="text-center ">
                <h1 className="text-gray-500 text-3xl font-bold">
                    Danh sách tài liệu đã xóa
                </h1>
                <p className="text-gray-400 text-sm font-bold">
                    Lưu ý danh sách này chỉ gồm những tài liệu đã xóa trong khoảng 30 trở
                    lại đây. Các tài liệu đã xóa quá 30 không thể khôi phục lại
                </p>
            </div>
            {documents && documents.length != 0 ? (
                <>
                    <div className="mt-4">
                        <div className="">
                            <div class="relative overflow-x-auto border rounded-xl shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Type
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            Author
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Ngày xóa{" "}
                                        </th>
                                        <th scope="col" class="px-6 py-3"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {documents.map((document, index) => (
                                        <tr
                                            key={index}
                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                {document.title}
                                            </th>
                                            <td class="px-6 py-4">{document.document_type}</td>
                                            <td class="px-6 py-4 min-w-32"> {document.author} </td>
                                            <td class="px-6 py-4 capitalize">{document.status}</td>
                                            <td class="px-6 py-4">
                                                {" "}
                                                {document.category.categoryName}{" "}
                                            </td>
                                            <td class="px-6 py-4 min-w-32">
                                                {" "}
                                                {document.deleted_at.replace("T", "-")}{" "}
                                            </td>
                                            <td class=" px-6 py-4 flex items-center  gap-3 ">
                                                <input
                                                    className=" w-4 h-4"
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(document.id)}
                                                    checked={checkedDocuments.includes(document.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mt-2 justify-end ">
                            <div className=" flex justify-center items-center">
                                <button
                                    onClick={handleAccpet}
                                    className="px-6 py-2  text-white bg-blue-400 rounded-lg hover:cursor-pointer"
                                >
                                    Khôi phục
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 flex w-full justify-end py-2 ">
                            <nav>
                                <ul className="list-style-none flex">
                                    <li onClick={prev}>
                                        <div
                                            href="#"
                                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512 "
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="text-gray-400 min-w-4  max-h-4 "
                                            >
                                                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                                            </svg>{" "}
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            href="http://localhost:3000/dashboard/document/1"
                                            className={` flex  items-center ${
                                                activePage == 1 ? "active-check" : ""
                                            } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                                        >
                                            1
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            href="http://localhost:3000/dashboard/document/2"
                                            className={` flex  items-center ${
                                                activePage == 2 ? "active-check" : ""
                                            } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                                        >
                                            2
                                        </div>
                                    </li>
                                    <li>
                                        <a
                                            href=""
                                            className={` flex  items-center ${
                                                activePage === 3 ? "active-check" : ""
                                            } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                                        >
                                            3
                                        </a>
                                    </li>
                                    <li onClick={next}>
                                        <div
                                            href="#"
                                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512 "
                                                fill="currentColor"
                                                aria-hidden="true"
                                                className="text-gray-400 min-w-4  max-h-4 "
                                            >
                                                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                            </svg>{" "}
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </>
            ) : (
                <div className="mt-4 ">
                    <div className="min-h-32 w-full bg-gray-200 bg-clip-border rounded-xl shadow-md flex items-center pb-4 ">
                        <div className="min-w-48 min-h-8 ">
                            <div className="p-4">
                                <h4 className="text-xl font-semibold">
                                    Chào mừng bạn đến với phần tài liệu đã xóa
                                </h4>
                                <p className="my-1 text-sm max-w-2xl text-gray-400 font-medium">
                                    Có vẻ như hiện tại tất cả tài liệu đã xóa không có, vui lòng
                                    quay trở lại sau khi có tài liệu nào đó cần bạn duyêt!
                                </p>
                            </div>
                            <div className="ml-4 mb-2">
                                <button
                                    onClick={goBack}
                                    className="px-4 py-2 border-solid border-2 border-gray-400 rounded-lg 	  text-sm font-medium"
                                    type="submit"
                                >
                                    <span>Quay lại</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}