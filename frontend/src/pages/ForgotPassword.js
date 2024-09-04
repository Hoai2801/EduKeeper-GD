import React, {useState} from 'react';
import toast from "react-hot-toast";
import Redirect from "../components/Redirect";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    const [start, setStart] = useState('');
    const [mail, setMail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mail.includes('@student.giadinh.edu.vn')) {
            toast.error("Đây không phải mail của sinh viên");
            return;
        }
        if (mail === '') {
            toast.error("Vui lý nhập email");
            return;
        }
        if (start === '') {
            setStart(new Date().getTime().toString());
        } else {
            const now = new Date().getTime().toString();
            // check how many seconds have passed
            const diff = now - start;
            if (diff < 60000) {
                toast.error("Thao tác quá nhanh, vui lòng thử lại sau 1 phút");
                return;
            }
        }

        // send mail
        fetch('http://103.241.43.206:8080/api/v1/auth/forgot-password/' + mail, {
            method: 'POST',
        })
        .then((data) => {
            if (data.status === 200) {
                toast.success("Email xác nhận đã được gửi đến email của bạn")
                setStart(new Date().getTime().toString());
                setSent(true)
            }
        })
    }

    return (
        <section className="bg-[#F4F3F2]">
            {
                !sent ?
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <Link to={`/`}
                           className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-[220px] h-20 mr-2"
                                 src="https://giadinh.edu.vn/upload/photo/logofooter-8814.png"
                                 alt="logo"/>
                        </Link>
                        <div
                            className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
                            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Quên mật khẩu
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Đừng lo, chúng tôi sẽ gửi cho bạn mail khôi phục mật khẩu để hỗ trợ
                            </p>
                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action={handleSubmit}>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900">
                                        Địa chỉ email sinh viên
                                    </label>
                                    <input type="email" name="email" id="email"
                                           value={mail}
                                           onChange={(e) => setMail(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                           placeholder="name@student.giadinh.edu.vn" required=""/>
                                </div>
                                {/*<div className="flex items-start">*/}
                                {/*    <div className="flex items-center h-5">*/}
                                {/*        <input id="terms" aria-describedby="terms" type="checkbox"*/}
                                {/*               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
                                {/*               required=""/>*/}
                                {/*    </div>*/}
                                {/*    <div className="ml-3 text-sm">*/}
                                {/*        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept*/}
                                {/*            the <a*/}
                                {/*                className="font-medium text-primary-600 hover:underline dark:text-primary-500"*/}
                                {/*                href="#">Terms and Conditions</a></label>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <button type="submit"
                                        onClick={handleSubmit}
                                        className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Gửi
                                </button>
                            </form>
                            <p className={`text-center mt-3`}>Trở lại trang <Link to={`/login`} className={`text-blue-500 cursor-pointer hover:underline`}>đăng nhập</Link></p>
                        </div>
                    </div>
                    : (
                        <Redirect handleSubmit={handleSubmit} />
                    )
            }
        </section>
    );
};

export default ForgotPassword;
