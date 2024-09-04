import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const AccountAction = () => {
    const { action, token } = useParams();

    const [content, setContent] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    useEffect(() => {
        if (action === "activate") {
            axios.post("http://103.241.43.206:8080/api/v1/auth/" + action + "/" + token)
                .then((data) => {
                    window.location.href = "/";
                })
                .catch((err) => {
                    setContent('Mã xác thực đã quá hạn');
                })
        }
    }, [action, token]);

    const forgotToken = (event) => {
        event.preventDefault();
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        if (password.length < 8) {
            setError('Mật khẩu phải lớn hơn 8 kí tự');
            return;
        }
        fetch('http://103.241.43.206:8080/api/v1/auth/reset-password/' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                confirmPassword
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    window.location.href = "/";
                } else {
                    setError("Sai mật khẩu")
                }
            })
    };

    return (
        <div className='flex justify-center'>
            {action === "activate" && content}
            {action === "forgot-password" && (
                <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 h-fit">
                    <h1 className="text-4xl font-medium">Đặt lại mật khẩu</h1>
                    <form onSubmit={forgotToken} className="my-10">
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="password" className="font-medium text-slate-700 pb-2">Nhập mật khẩu</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                            <label htmlFor="confirmPassword" className="font-medium text-slate-700 pb-2">Nhập lại mật khẩu</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                            {error ? <p className='text-red-500'>{error}</p> : null}
                            <button
                                type="submit"
                                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                                <span>Reset password</span>
                            </button>
                        </div>
                    </form>
                    <p className="text-center">Cần hỗ trợ? <a href="#" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">gdu@gmail.com <span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></span></a></p>
                </div>
            )}
        </div>
    )
}

export default AccountAction