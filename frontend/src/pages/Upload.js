import React, {useEffect, useState} from 'react'
import DragDropFile from '../components/DragDropFile'
import {jwtDecode} from 'jwt-decode';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Document, Page} from 'react-pdf';
import {useLocation, useParams} from "react-router-dom";

export const Upload = () => {
    const location = useLocation();
    let isEditPage = location.pathname !== '/upload';

    const path = useParams()

    // edit file
    const [documentEdit, setDocumentEdit] = useState(null);

    // file upload
    const [selectedFile, setFile] = useState(null);

    const [departments, setDepartments] = useState([]);
    const [listCategory, setListCategory] = useState(null);
    const [category, setCategory] = useState(1);
    const [description, setDescription] = useState(null);
    const [scopeList, setScopeList] = useState([
        {
            scope: "public",
            name: "Công khai"
        },
        {
            scope: "private",
            name: "Riêng tư"
        },
        {
            scope: "student-only",
            name: "Nội bộ sinh viên"
        }
    ]);
    const [scope, setScope] = useState(null);
    const [specialized, setSpecialized] = useState(null);
    const [subject, setSubject] = useState(null);
    const [title, setTitle] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [listSpecialized, setListSpecialized] = useState([]);
    const [listSubject, setListSubject] = useState(null);
    const [author, setAuthor] = useState(null);

    const [bearToken, setBearToken] = useState(null);
    const [jwt, setJwt] = useState(null);


    useEffect(() => {
        if (specialized) {
            fetch('http://localhost:8080/api/v1/subjects/' + specialized?.id).then(response => response.json())
                .then(data => {
                    console.log(data)
                    setListSubject(data)
                })
                .catch(error => console.error(error));
        }
    }, [specialized])

    const handleFiles = (updatedFile) => {
        setFile(updatedFile[0]);
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/departments').then(response => response.json())
            .then(data => {
                setDepartments(data)
            })
            .catch(error => console.error(error));

        fetch('http://localhost:8080/api/v1/categories').then(response => response.json())
            .then(data => {
                setListCategory(data)
            })
            .catch(error => console.error(error));
        const token = localStorage.getItem("token");
        setBearToken(token)
        if (token !== "undefined" && token !== null) {
            setJwt(jwtDecode(token));
        } else window.location.href = "/";
        if (path) {
            fetch('http://localhost:8080/api/v1/documents/' + path.slug).then(response => response.json())
                .then(data => {
                    console.log(data)
                    setTitle(data.title)
                    setDescription(data.description)
                    setAuthor(data.author)
                    setScope(data.scope)
                    setSpecialized(data.specialized)
                    setSelectedDepartment(data.specialized.department)
                    setCategory(data.category.id)
                    setSubject(data.subject.id)
                    setDocumentEdit(data)
                })
                .catch(error => console.error(error));
            const fetchFile = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/v1/documents/${path.slug}/file`, {
                        method: 'GET',
                    });

                    // Check if the response is OK
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response?.blob();
                    setFile(data)
                } catch (error) {
                    console.error('Error fetching file:', error);
                }
            };

            fetchFile();
        }
    }, [])

    useEffect(() => {
        if (selectedDepartment) {
        fetch('http://localhost:8080/api/v1/specializes/department/' + selectedDepartment?.id).then(data => data.json())
            .then(data => {
                console.log(data)
                if (data.length > 0) {
                    setListSpecialized(data)
                }
            })
            .catch(error => console.error(error));
        }
    }, [selectedDepartment])

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/subjects/' + specialized?.id).then(response => response.json())
            .then(data => {
                setListSubject(data)
            })
            .catch(error => console.error(error));
    }, [specialized])

    const createDocument = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('title', title);
        formData.append('department', selectedDepartment.id);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('subject', subject);
        formData.append('specialized', specialized);
        formData.append('userUpload', jwt.staff_code);
        formData.append('scope', scope);
        formData.append('author', author);

        console.log(formData)
        fetch('http://localhost:8080/api/v1/documents/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + bearToken
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    alert("Đăng tài liệu thành công")
                    setFile(null)
                    setCategory('')
                    setSelectedDepartment('')
                    setDescription('')
                    setSpecialized(null)
                    setListSpecialized(null)
                    setSubject('')
                    setTitle('')
                    setScope(null)
                    setAuthor(null)
                }
            })
            .catch(error => console.error(error));
    }

    const updateDocument = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('title', title);
        formData.append('department', selectedDepartment.id);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('subject', subject);
        formData.append('userUpload', jwt.staff_code);
        formData.append('scope', scope);
        formData.append('author', author);
        console.log(formData)
        console.log(bearToken)
        fetch('http://localhost:8080/api/v1/documents/' + documentEdit?.id, {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${bearToken}`,
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    alert("Cập nhật tài liệu thành công")
                }
            })
            .catch(error => console.error(error));
    }

    // check is true author or not
    if (jwt && documentEdit) {
        if (jwt?.staff_code !== documentEdit?.user_upload?.staffCode) {
            window.location.href = "/";
        }
    }

    return (
        <div>
            <h2 className={`text-3xl font-bold mb-5 mt-10 pl-10 lg:pl-0 ${isEditPage ? "block" : "hidden"}`}>Cập nhật
                tài liệu</h2>
            <div className={`${isEditPage ? "hidden" : "block"}`}>
                <p className='text-3xl font-bold mb-5 mt-10 pl-10 lg:pl-0'>Đăng tài liệu</p>
                <DragDropFile handleFiles={handleFiles} fileSupport={`application/pdf`}/>
            </div>
            <div>
                {selectedFile && (
                    <div className='bg-white p-5 rounded-2xl flex gap-3 max-w-md mt-2'>
                        <Document file={selectedFile} type={selectedFile.type}>
                            <div className='max-h-[50px] overflow-hidden'>
                                <Page pageNumber={1} width={40} height={50}/>
                            </div>
                        </Document>
                        <div className={`max-w-md overflow-hidden flex flex-col gap-2`}>
                            <p className='w-full'>{selectedFile?.name}</p>
                            <p>{(selectedFile?.size / (1024 * 1024)).toFixed(1)} MB</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md mt-5">
                <h2 className="text-2xl font-semibold mb-6">Thông tin tài liệu</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Tên tài liệu
                        </label>
                        <input type="text" id="name" name="name" placeholder="Báo cáo môn học ..." required
                               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                               onChange={event => setTitle(event.target.value)}
                               value={title}
                        />
                    </div>

                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department"
                               className="block mb-2 text-sm font-semibold text-gray-900">Khoa</label>
                        <select id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={event => {
                                    const selectedDepartment = JSON.parse(event.target.value);
                                    console.log(selectedDepartment)
                                    setSelectedDepartment(selectedDepartment)
                                    setListSpecialized(selectedDepartment.specializeds)
                                }}
                                value={JSON.stringify(selectedDepartment)}
                        >
                            <option className={`${isEditPage ? "hidden" : "block"}`}>Chọn khoa</option>
                            {
                                departments && departments.map(dep => {
                                    return (
                                        <option value={JSON.stringify(dep)}
                                                key={dep.id}>{dep.departmentName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department"
                               className="block mb-2 text-sm font-semibold text-gray-900">Ngành</label>
                        <select id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={e => setSpecialized(JSON.parse(e.target.value))}
                                value={JSON.stringify(specialized)}
                        >
                            <option>Chọn ngành</option>
                            {
                                listSpecialized && listSpecialized?.map(specialized => {
                                    return(
                                    <option value={JSON.stringify(specialized)}
                                            key={specialized.id}>{specialized.specializedName}</option>
                                )})
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department" className="block mb-2 text-sm font-semibold text-gray-900">Thể
                            loại</label>
                        <select id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={e => setCategory(e.target.value)}
                                value={category}
                        >
                            <option>Chọn thể loại</option>
                            {
                                Array.isArray(listCategory) && listCategory.map(category => (
                                    <option value={category.id} key={category.id}>{category.categoryName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department"
                               className="block mb-2 text-sm font-semibold text-gray-900">Môn</label>
                        <select id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={e => setSubject(e.target.value)}>
                            <option>Chọn môn</option>
                            {
                                Array.isArray(listSubject) && listSubject.map(subject => (
                                    <option value={subject.id} key={subject.id}>{subject.subjectName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department"
                               className="block mb-2 text-sm font-semibold text-gray-900">Quyền riêng tư</label>
                        <select id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={e => setScope(e.target.value)}
                                value={scope}
                        >
                            <option>Chọn quyền riêng tư</option>
                            {
                                scopeList.map((scope, index) => (
                                    <option value={scope.scope} key={index}>{scope.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="teacher" className="block text-gray-700 text-sm font-bold mb-2">Giáo
                            viên</label>
                        <input type="text" id="teacher" name="teacher" placeholder="" required
                               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                               disabled
                               value={jwt?.user_name}/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="teacher" className="block text-gray-700 text-sm font-bold mb-2">Tác giả</label>
                        <input type="text" id="teacher" name="teacher" placeholder="" required
                               onChange={e => setAuthor(e.target.value)}
                               value={author}
                               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {
                                setDescription(editor.getData())
                            }}
                        />
                    </div>
                    <button
                        onClick={createDocument}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ${isEditPage ? "hidden" : ""}`}>
                        Đăng
                    </button>
                    <button
                        onClick={updateDocument}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ${isEditPage ? "" : "hidden"}`}>
                        Cập nhật
                    </button>
                </form>
            </div>
        </div>
    )
}
