import React, {useEffect, useState} from 'react'
import {jwtDecode} from "jwt-decode";

const UserInfor = () => {
    const [specializedList, setSpecializedList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);

    const [selectedSpecialized, setSelectedSpecialized] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // user info
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [birth, setBirth] = useState(null);
    const [staffCode, setStaffCode] = useState(null);
    const [klass, setKlass] = useState(null);

    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/departments")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDepartmentList(data)
            });

        const token = localStorage.getItem("token");
        if (token !== "undefined" && token !== null) {
            setJwt(jwtDecode(token));
        }


    }, [])


    useEffect(() => {
        console.log(jwt)
        fetch("http://localhost:8080/api/v1/users/" + jwt?.staff_code)
            .then((res) => res.json())
            .then((data) => {
                setBirth(data?.birthDay)
                setName(data?.username)
                setEmail(data?.email)
                setKlass(data?.klass)
                setStaffCode(data?.staffCode)
                setSelectedDepartment(data?.department)
                setSelectedSpecialized(data?.specialized?.id)
                setUser(data)
            });
    }, [jwt?.staff_code])

    console.log(user)

    useEffect(() => {
        if (selectedDepartment) {
            console.log(selectedDepartment)
            fetch("http://localhost:8080/api/v1/specializes/department/" + selectedDepartment?.id)
                .then((res) => res.json())
                .then((data) => {

                    setSpecializedList(data)
                });
        }
    }, [selectedDepartment])

    const updateUser = () => {
        fetch("http://localhost:8080/api/v1/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "staffCode": jwt?.staff_code,
                "username": name,
                "email": email,
                "birthDay": birth,
                "klass": klass,
                "department": selectedDepartment.id,
                "specialized": selectedSpecialized
            }),
        })
            .then((data) => {
                if (data.status === 200) {
                    alert("Cập nhật thông tin tài khoản thành công")
                }
            });
    }

    return (
        <div>
            <h2 className='text-3xl font-semibold text-center'>Thông tin tài khoản</h2>
            <div>
                <div className='md:grid md:grid-cols-2 flex flex-col justify-center gap-5 w-fit mx-auto mt-2'>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor="name" className="text-lg font-semibold text-gray-500">
                            Họ và tên
                        </label>
                        <input value={name} onChange={(event) => setName(event.target.value)} id="name" type="text" className='w-[400px] border border-gray-300 rounded-lg p-2'/>
                    </div>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor="email" className="text-lg font-semibold text-gray-500">
                            Email
                        </label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} id="email" type="text" className='w-[400px] border border-gray-300 rounded-lg p-2'/>
                    </div>
                    <div className='flex flex-col gap-2 col-span-2 '>
                        <label htmlFor="student_id" className="text-lg font-semibold text-gray-500">
                            Mã số sinh viên
                        </label>
                        <input value={staffCode} onChange={(event) => setStaffCode(event.target.value)} id="student_id" type="text" className='w-full border border-gray-300 rounded-lg p-2'/>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col gap-5 mt-5`}>
            <div className="mx-auto w-full">
                <label htmlFor="department"
                       className="block mb-2 font-semibold text-gray-500">Khoa</label>
                <select id="department"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={event => {
                            const selectedDepartment = JSON.parse(event.target.value);
                            console.log(selectedDepartment)
                            setSelectedDepartment(selectedDepartment)
                            setSpecializedList(selectedDepartment.specializeds)
                        }}
                        value={JSON.stringify(selectedDepartment)}
                >
                    <option>Chọn khoa</option>
                    {
                        departmentList?.map(dep => (
                            <option value={JSON.stringify(dep)}
                                    defaultChecked={dep.id === user?.department?.id}
                                    key={dep.id}>{dep.departmentName}</option>
                        ))
                    }
                </select>
            </div>
            <div className="w-full mx-auto">
                <label htmlFor="department"
                       className="block mb-2 font-semibold text-gray-500">Ngành</label>
                <select id="department"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={e => setSelectedSpecialized(e.target.value)}
                        value={selectedSpecialized}
                >
                    <option>Chọn ngành</option>
                    {
                        specializedList && specializedList?.map(specialized => (
                            <option value={specialized.id}
                                    className={`${specialized.id == user?.specialized?.id ? 'bg-red-400' : ''}`}
                                    defaultChecked={specialized.id === user?.specialized?.id}
                                    key={specialized.id}>{specialized.specializedName}</option>
                        ))
                    }
                </select>
            </div>
            <div className='my-3 flex flex-col gap-2'>
                <label htmlFor="class" className="text-lg font-semibold text-gray-500">
                    Lớp
                </label>
                <input id="class" value={klass} onChange={(event) => setKlass(event.target.value)} type="text" className='w-full border border-gray-300 rounded-lg p-2'/>
            </div>
            <div className='flex justify-center p-5'>
                <button onClick={updateUser}
                        className='hover:rounded-lg hover:bg-[#C5D6F8] p-2 bg-red-500 rounded-lg'>Update
                </button>
            </div>
            </div>
        </div>
    )
}

export default UserInfor