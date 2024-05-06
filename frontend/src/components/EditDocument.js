import React, { useEffect, useState } from 'react'

const EditDocument = ({ isShowEdit, setIsShowEdit, documentEdit, change, setChange }) => {
    const [specialized, setSpecialized] = useState(null);
    const [selectSpecialized, setSelectSpecialized] = useState(null);
    const [users, setUsers] = useState(null);

    const [category, setCategory] = useState(null);
    const [selectCategory, setSelectCategory] = useState(null);
    const [description, setDescription] = useState(null);
    const [specializeds, setSpecializeds] = useState(null);
    const [subject, setSubject] = useState(null);
    const [title, setTitle] = useState(null);
    const [selectAuthor, setSelectAuthor] = useState(null);

    const handleEdit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', selectAuthor?.staffCode);
        formData.append('specialized', selectSpecialized?.id);
        formData.append('category', selectCategory.id);
        formData.append('subject', 1);
        formData.append('description', description);
        fetch(`http://localhost:8080/api/v1/documents/${documentEdit.id}`, {
            method: 'PUT',
            body: formData,
        })
            .then((data) => {
                setIsShowEdit(false)
                setChange(change + 1)
            });
    }

    useEffect(() => {
        setTitle(documentEdit.title);
        setSelectAuthor(documentEdit.author);
        setSelectSpecialized(documentEdit.specialized);
        setSelectCategory(documentEdit.category);
        setSubject(documentEdit.subject);
        setDescription(documentEdit.description);
        setSpecializeds(documentEdit.specializeds);
        fetch("http://localhost:8080/api/v1/specializes")
            .then((res) => res.json())
            .then((data) => {
                setSpecialized(data);
            });

        fetch("http://localhost:8080/api/v1/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });

        fetch("http://localhost:8080/api/v1/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategory(data);
            });
    }, [documentEdit])

    return (
        <div className={`absolute bottom-0 right-0 w-full h-full flex justify-center align-middle ${isShowEdit ? '' : 'hidden'}`}>
            <div className={`bg-white w-[50%] h-[90%] fixed top-10 border-2 border-black rounded-2xl`}>
                <div className='w-full flex justify-end p-2'>
                    <button onClick={() => setIsShowEdit(false)} className='text-white bg-red-500 hover:bg-red-300 rounded-md p-2 w-10 h-10'>X</button>
                </div>
                <div className='w-full p-5 flex justify-center'>
                    <div className='w-[80%] flex flex-col gap-5'>
                        <label htmlFor="" className='block font-bold'>Tên tài liệu</label>
                        <input type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} className='border border-gray-300 rounded-md p-4' />
                        <label htmlFor="" className='block font-bold'>Tác giả</label>
                        <select name="" id="" className='border border-gray-300 rounded-md p-4' onChange={(e) => setSelectAuthor(JSON.parse(e.target.value))}>
                            {users && users.map((author) => (
                                <option value={JSON.stringify(author)} key={author.id} selected={selectAuthor?.id === author.id}>{`${author.username} - ${author.staffCode}`}</option>
                            ))}
                        </select>
                        <label htmlFor="" className='block font-bold'>Chuyên ngành</label>
                        <select name="" id="" className='border border-gray-300 rounded-md p-4' onChange={(e) => setSelectSpecialized(JSON.parse(e.target.value))}>
                            {specialized && specialized?.map((specialized) => (
                                <option value={JSON.stringify(specialized)} key={specialized.id} selected={specialized.id === selectSpecialized?.id} >{specialized.specializedName}</option> // {specialized.specializedName}</option>
                            ))}
                        </select>
                        <select name="" id="" className='border border-gray-300 rounded-md p-4' onChange={(e) => setSelectCategory(JSON.parse(e.target.value))}>
                            {category && category.map((category) => (
                                <option value={JSON.stringify(category)} key={category.id} selected={category.id === documentEdit?.category?.id} >{category.categoryName}</option> // {specialized.specializedName}</option>
                            ))}
                        </select>
                        <label htmlFor="" className='block font-bold'>Ngày đăng</label>
                        <input type="text" name="" id="" value={documentEdit?.upload_date} className='border border-gray-300 rounded-md p-4' />
                        <button onClick={handleEdit} className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDocument