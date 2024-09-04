import React, { useState } from "react";
import { toast } from "react-hot-toast";

const DocumentDeleter = ({ id, setDocs, docs}) => {
    const deleteDocument = async () => {
        try {
            const response = await fetch(`http://103.241.43.206:8080/api/v1/documents/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setDocs(docs.filter((doc) => doc.id !== id));
                toast.success(`Xóa document ${id} thành công`);
                return true;
            } else {
                toast.error("Xóa thất bại, vui lòng thử lại sau");
                return false;
            }
        } catch (error) {
            console.error(error);
            toast.error("Xóa thất bại, vui lòng thử lại sau");
            return false;
        }
    };

    const handleDelete = () => {
        toast.custom((t) => (
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
                            toast.remove(t.id);
                            await deleteDocument();
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Đồng ý
                    </button>
                </div>
                <div className="flex border-l border-gray-300">
                    <button
                        onClick={() => toast.remove(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <button onClick={handleDelete} className="delete-button text-red-500 hover:underline">
            Xóa
        </button>
    );
};

export default DocumentDeleter;
