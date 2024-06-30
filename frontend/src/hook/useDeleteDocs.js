import React, { useState } from "react";
import { toast } from "react-hot-toast";

const DocumentDeleter = (id) => {
    console.log(id);
    const res = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/documents/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok && response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    const customToast = toast.custom(() => (
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Xóa tài liệu</p>
                        <p className="mt-1 text-sm text-gray-500">
                            Bạn có chắc muốn xóa tài liệu này không
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-300">
                <button
                    onClick={async () => {
                        toast.remove(customToast);
                        const result = await res();
                        console.log(res);
                        if (result) {
                            toast.success(`Xóa document ${id} thành công`);
                        } else {
                            toast.error("Xóa thất bại, vui lòng thử lại sau");
                        }
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
};

export default DocumentDeleter;