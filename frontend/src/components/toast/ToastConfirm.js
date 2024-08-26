import React from 'react';

const ToastConfirm = ({setConfirm}) => {
    return (
        <div>
            <div className=" p-4">
                <div className="flex items-start w-full">
                    Bạn có chắc muốn reset mật khẩu cho tài khoản này hay không?
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => setConfirm(true)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-200"
                >
                    Đồng ý
                </button>
                <button
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 hover:bg-gray-200"

                    onClick={() => setConfirm(false)}>Hủy</button>
            </div>
        </div>
    );
};

export default ToastConfirm;
