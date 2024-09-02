import React, {useState} from 'react';
import toast from "react-hot-toast";

const ChangePassword = ({setIsChangePassword, staffCode}) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    console.log(staffCode)

    const changePassword = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu khác nhau! Vui lòng nhập lại");
            return;
        }
        if (newPassword.length < 8 || confirmPassword.length < 8) {
            toast.error("Mật khẩu phải bằng hoặc lớn 8 kí tự!");
        }
        if (oldPassword === newPassword) {
            toast.error("Mật không mới phải khác mật khẩu cũ");
            return;
        }
        fetch("http://localhost:8080/api/v1/auth/change-password/" + staffCode, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: oldPassword,
                confirmPassword: newPassword
            })
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Đặt mật khẩu thành công");
                setIsChangePassword(false);
            } else {
                res.text().then((data) => toast.error(data));
            }
        }).catch((err) => toast.error(err.message));
    }
    return (
        <section className="bg-gray-50">
            <div className="md:w-[400px]">
                <div
                    className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md p-8">
                    <div className={`flex justify-between`}>

                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Đổi mật khẩu
                    </h2>
                    <button
                        className={`font-mono font-bold text-xl`}
                        onClick={() => setIsChangePassword(false)}
                    >
                        X
                    </button>
                    </div>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action={changePassword}>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Mật khẩu hiện tại
                            </label>
                            <input type="password" name="email" id="email"
                                   placeholder="••••••••"
                                   value={oldPassword}
                                   onChange={(event) => setOldPassword(event.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Mật khẩu mới
                            </label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                   value={newPassword}
                                   onChange={(event) => setNewPassword(event.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   required=""/>
                        </div>
                        <div>
                            <label htmlFor="confirm-password"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Nhập lại mật khẩu
                            </label>
                            <input type="password" name="confirm-password" id="confirm-password"
                                   value={confirmPassword}
                                   onChange={(event) => setConfirmPassword(event.target.value)}
                                   placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   required=""/>
                        </div>
                        <button type="submit"
                                onClick={changePassword}
                                className="w-full text-white bg-blue-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset
                            passwod
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
