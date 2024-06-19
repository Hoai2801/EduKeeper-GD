import React from 'react'

const UserInfor = () => {
    return (
        <div>
            <h2 className='text-3xl font-semibold text-center'>Thông tin tài khoản</h2>
            <div>
                
                <div className='grid grid-cols-2 justify-center gap-5 w-fit mx-auto mt-2'>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor="name" className="text-lg font-semibold text-gray-500">
                            Họ và tên
                        </label>
                        <input id="name" type="text" className='w-[400px] border border-gray-300 rounded-lg p-2' />
                    </div>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor="email" className="text-lg font-semibold text-gray-500">
                            Email
                        </label>
                        <input id="email" type="text" className='w-[400px] border border-gray-300 rounded-lg p-2' />
                    </div>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor="student_id" className="text-lg font-semibold text-gray-500">
                            Mã số sinh viên
                        </label>
                        <input id="student_id" type="text" className='w-[400px] border border-gray-300 rounded-lg p-2' />
                    </div>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor="class" className="text-lg font-semibold text-gray-500">
                            Lớp
                        </label>
                        <input id="class" type="text" className='w-[400px] border border-gray-300 rounded-lg p-2' />
                    </div>
                </div>
            </div>
            <div className='flex justify-center p-5'>
                <button onClick={null} className='hover:rounded-lg hover:bg-[#C5D6F8] p-2 bg-red-500 rounded-lg'>Update</button>
            </div>
        </div>
    )
}

export default UserInfor