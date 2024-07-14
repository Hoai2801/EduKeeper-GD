import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [staffCode, setStaffCode] = useState("");
    const [classroom, setClassroom] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');

    const [listDepartment, setListDepartment] = useState(null);
    const [listSpecialized, setListSpecialized] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedspecialized, setSelectedSpecialized] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/departments')
            .then(response => response.json())
            .then(data => {
                setListDepartment(data)
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            fetch(`http://localhost:8080/api/v1/specializes/department/${selectedDepartment.id}`)
                .then(response => response.json())
                .then(data => {
                    setListSpecialized(data)
                })
                .catch(error => console.error(error));
        }
    }, [selectedDepartment]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Xác nhận mật khẩu không đúng');
            return;
        }
        // const formData = new FormData();
        // formData.append('username', fullName);
        // formData.append('email', email);
        // formData.append('staffCode', staffCode);
        // formData.append('classroom', classroom);
        // formData.append("roles", "STUDENT");
        // formData.append('password', password);
        // formData.append('department', selectedDepartment.id);
        // formData.append('specialized', selectedspecialized);
        // console.log(formData)
        fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: fullName,
                email: email,
                staffCode: staffCode,
                classroom: classroom,
                roles: "ROLE_USER",
                password: password,
                department: selectedDepartment.id,
                specialized: selectedspecialized
            }),
        })
            .then(response => response.text())
            .then((data) => {
                if (data === "registered") {
                    alert("Đăng ký thành công");
                    window.location.href = "/login";
                } else setError(data)
            })
            .catch(error => console.error(error));

    };
    return (
        <div className="flex flex-col py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Đăng ký tài khoản
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 max-w">
                    Hoặc  <Link to={"/login"} className="font-medium text-blue-600 hover:text-blue-500">
                        Đăng nhập
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:w-[400px]">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Họ và tên <span className={`text-red-500`}>*</span>
                            </label>
                            <div className="mt-1">
                                <input id="fullName" name="fullName" type="text" autoComplete="name" required
                                       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Nhập họ và tên"
                                       value={fullName}
                                       onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Mã số sinh viên <span className={`text-red-500`}>*</span>
                            </label>
                            <div className="mt-1">
                                <input id="fullName" name="fullName" type="text" autoComplete="name" required
                                       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Nhập mã số sinh viên"
                                       value={staffCode}
                                       onChange={(e) => setStaffCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Địa chỉ Gmail sinh viên <span className={`text-red-500`}>*</span>
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Nhập địa chỉ gmail"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="max-w-sm mx-auto mb-3">
                            <label htmlFor="department"
                                   className="block mb-2 text-sm text-gray-700">Khoa <span
                                className={`text-red-500`}>*</span></label>
                            <select id="department"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={event => {
                                        const selectedDepartment = JSON.parse(event.target.value);
                                        setSelectedDepartment(selectedDepartment)
                                        setListSpecialized(selectedDepartment.specializeds)
                                    }}
                                    value={JSON.stringify(selectedDepartment)}
                            >
                                <option>Chọn khoa</option>
                                {
                                    listDepartment?.map(dep => (
                                        // hidden the 'tất cả' department
                                        <option value={JSON.stringify(dep)} key={dep.id} className={`${dep.id === 18 ? 'hidden' : ''}`}>{dep.departmentName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="max-w-sm mx-auto mb-3">
                            <label htmlFor="department"
                                   className="block mb-2 text-sm text-gray-700">Ngành <span
                                className={`text-red-500`}>*</span></label>
                            <select id="department"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={e => setSelectedSpecialized(e.target.value)}>
                                <option>Chọn ngành</option>
                                {
                                    Array.isArray(listSpecialized) && listSpecialized.map(specialized => (
                                        <option value={specialized.id}
                                                key={specialized.id}>
                                            {specialized.specializedName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Lớp <span className={`text-red-500`}>*</span>
                            </label>
                            <div className="mt-1">
                                <input id="fullName" name="fullName" type="text" autoComplete="name" required
                                       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Nhập mã số lớp"
                                       value={classroom}
                                       onChange={(e) => setClassroom(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mật khẩu <span className={`text-red-500`}>*</span>
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="new-password"
                                       required
                                       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Nhập mật khẩu"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Nhập lại mật khẩu <span className={`text-red-500`}>*</span>
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="new-password"
                                       required
                                       className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Nhập mật khẩu"
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <button type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
