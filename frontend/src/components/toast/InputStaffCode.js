import React, {useState} from 'react';
import toast from "react-hot-toast";

const InputStaffCode = ({setIsInputStaffCodeOpen}) => {
    const [staffCode, setStaffCode] = useState('');
    const forgotPassword = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        if (staffCode === "") {
            toast.error("Vui lòng nhập mã giáo viên/sinh viên")
            return;
        }
        fetch('http://localhost:8080/api/v1/auth/forgot-password/' + staffCode, {
            method: 'POST',
        })
            .then((data) => {
                if (data.status === 200) {
                    toast.success("Email xác nhận đã được gửi đến email của bạn")
                    setIsInputStaffCodeOpen(false)
                    setStaffCode('')
                }
            })
    }
    return (
        <div className={`w-full h-full z-50 absolute top-0 left-0 bg-gray-500/50 flex justify-center items-center`}>
            <div className={`w-[400px] h-[230px] bg-white rounded-lg flex justify-center items-center flex-col z-50`}>
                <div className={`w-full h-[10px] flex justify-end pr-4`}>
                    <button
                        onClick={() => setIsInputStaffCodeOpen(false)}
                        className={`text-2xl font-sans`}>X
                    </button>
                </div>
                <div className={`flex gap-5 flex-col items-center`}>
                <h1 className={`text-[20px] font-bold`}>Mã số giáo viên/sinh viên</h1>
                <input type="text" className={`w-[300px] h-[40px] border border-black rounded-lg p-2`} value={staffCode} onChange={(e) => setStaffCode(e.target.value)} />
                <button className={`w-[200px] h-[40px] bg-blue-500 text-white rounded-lg`} onClick={forgotPassword}>Quên mật khẩu</button>
                </div>
            </div>
        </div>
    );
};

export default InputStaffCode;
