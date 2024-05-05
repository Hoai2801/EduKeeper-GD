import React, { useEffect, useState } from 'react'

const EditDocument = ({ isShowEdit, setIsShowEdit, documentEdit }) => {
    const [department, setDepartment] = useState(null);
    const [specialized, setSpecialized] = useState(null);
    const [authors, setAuthors] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/departments")
            .then((res) => res.json())
            .then((data) => {
                setDepartment(data);
                console.log(data)
            });

        fetch("http://localhost:8080/api/v1/users")
            .then((res) => res.json())
            .then((data) => {
                setAuthors(data);
                console.log(data)
            });
    }, [])


    return (
        <div className={`absolute bottom-0 right-0 w-full h-full flex justify-center align-middle ${isShowEdit ? '' : 'hidden'}`}>
            <div className={`bg-white w-[50%] h-[90%] fixed top-10 border-2 border-black rounded-2xl`}>
                <div className='w-full flex justify-end p-2'>
                    <button onClick={() => setIsShowEdit(false)} className='text-white bg-red-500 hover:bg-red-300 rounded-md p-2 w-10 h-10'>X</button>
                </div>
                <div className='w-full p-5 flex justify-center'>
                    <div className='w-[80%] flex flex-col gap-5'>
                        <label htmlFor="" className='block font-bold'>Tên tài liệu</label>
                        <input type="text" name="" id="" value={documentEdit?.title} className='border border-gray-300 rounded-md p-4' />
                        <label htmlFor="" className='block font-bold'>Tác giả</label>
                        <select name="" id="" className='border border-gray-300 rounded-md p-4'>
                            {authors && authors.map((author) => (
                                <option value={author.staffCode} key={author.id} defaultChecked={documentEdit?.author?.staffCode === author.staffCode}>{`${author.username} - ${author.staffCode}`}</option>
                            ))}
                        </select>
                        <label htmlFor="" className='block font-bold'>Khoa</label>
                        <select name="" id="" className='border border-gray-300 rounded-md p-4' value={JSON.stringify(selectedDepartment)}
                            onChange={(e) => {
                                const selectedDepartment = JSON.parse(e.target.value);
                                setSelectedDepartment(selectedDepartment);
                                setSpecialized(selectedDepartment.specializeds)
                            }
                            }>
                            {department && department.map((department) => (
                                <option value={JSON.stringify(department)} key={department.id} defaultValue={JSON.stringify(documentEdit?.department)} defaultChecked={documentEdit?.department?.id === department.id}>{department.departmentName}</option>
                            ))}
                        </select>
                        <label htmlFor="" className='block font-bold'>Chuyên ngành</label>
                        <select name="" id="" className='border border-gray-300 rounded-md p-4'>
                            {specialized && specialized.map((specialized) => (
                                <option value={JSON.stringify(specialized)} key={specialized.id} defaultChecked={documentEdit?.specialized?.id === specialized.id}>{specialized.specializedName}</option>
                            ))}
                        </select>
                        {/* <input type="text" name="" id="" value={`${documentEdit?.author?.username} - ${documentEdit?.author?.staffCode}`} className='border border-gray-300 rounded-md p-4' /> */}
                        <input type="text" name="" id="" value={documentEdit?.specialized?.specializedName} className='border border-gray-300 rounded-md p-4' />
                        <label htmlFor="" className='block font-bold'>Danh mục</label>
                        <input type="text" name="" id="" value={documentEdit?.category?.categoryName} className='border border-gray-300 rounded-md p-4' />
                        <label htmlFor="" className='block font-bold'>Ngày đăng</label>
                        <input type="text" name="" id="" value={documentEdit?.upload_date} className='border border-gray-300 rounded-md p-4' />
                        <button onClick={null} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Luu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDocument