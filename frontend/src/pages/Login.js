import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    const [staffCode, setStaffCode] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://103.241.43.206:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                staffCode,
                password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    setError("Sai mật khẩu")
                } else {
                    response.json()
                        .then(data => {
                            console.log(data);
                            if (data.token !== undefined) {
                                localStorage.setItem("token", data.token);
                                if (localStorage.getItem("token") === data.token) {
                                    window.location.href = "/";
                                }
                            }
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
            });

    };

    return (
        <div className="min-h-[60vh] flex flex-col py-12 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Đăng nhập
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="staffCode" className="block text-sm font-medium text-gray-700">
                                Mã sinh viên/giáo viên
                            </label>
                            <div className="mt-1">
                                <input
                                    id="staffCode"
                                    name="staffCode"
                                    type="text"
                                    autoComplete="staffCode"
                                    required
                                    value={staffCode}
                                    onChange={(e) => setStaffCode(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Nhập mã giáo viên"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                        </div>

                        {error ? <p className='text-red-500'>{error}</p> : null}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link to={`/forgot-password`}
                                        className="font-medium text-blue-600 hover:text-blue-500">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                        <div className={`w-full flex gap-2 justify-center`}>
                            <p>Chưa có tài khoản? </p>
                            <Link to={`/register`} className={`text-blue-500`}>Đăng ký</Link>
                        </div>

                        <div>
                            <button
                                type='submit'
                                onClick={(e) => handleSubmit(e)}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
