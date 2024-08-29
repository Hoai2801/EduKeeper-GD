import React from 'react';

const Redirect = ({handleSubmit}) => {
    return (
        <div className={`w-full h-full text-center p-10`}>
            <p>Mail đã được gửi đến outlook của bạn, nếu không tìm thấy vui lòng kiểm tra hòm thư rác.
                Hoặc là <spanc
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={handleSubmit}
                >
                    gửi lại
            </spanc>
            </p>
        </div>
    );
};

export default Redirect;
