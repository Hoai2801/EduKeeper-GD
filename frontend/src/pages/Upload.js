import React, { useEffect, useState } from 'react'
import DragDropFile from '../components/DragDropFile'
import { jwtDecode } from 'jwt-decode';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Document, Page } from 'react-pdf';

export const Upload = () => {
  // file upload
  const [selectedFile, setFile] = useState(null);

  const [department, setDepartment] = useState(null);
  const [listCategory, setListCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [specialized, setSpecialized] = useState(null);
  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [listSpecialized, setListSpecialized] = useState(null);

  const token = localStorage.getItem("token");
  let jwt = null;
  if (token !== "undefined" && token !== null) {
    jwt = jwtDecode(token);
  }

  if (!jwt) {
    window.location.href = "/";
  }

  const handleFiles = (updatedFile) => {
    setFile(updatedFile[0]);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/department').then(response => response.json())
      .then(data => {
        console.log(data)
        setDepartment(data)
      })
      .catch(error => console.error(error));

    fetch('http://localhost:8080/api/v1/categories').then(response => response.json())
      .then(data => {
        console.log(data)
        setListCategory(data)
      })
      .catch(error => console.error(error));
  }, [])

  const uploadDocument = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('document', selectedFile);
    formData.append('title', title);
    // formData.append('department', selectedDepartment);
    // category is long type
    formData.append('category', 1);
    formData.append('description', description);
    formData.append('subject', 1);
    formData.append('specialized', specialized);
    formData.append('author', jwt.staff_code);
    fetch('http://localhost:8080/api/v1/document', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        console.log(response)
          if (response.status === 200) {
            alert("Đăng tài liệu thành công")
          }
          setFile(null)
          setCategory('')
          setSelectedDepartment('')
          setDescription('')
          setSpecialized(null)
          setSubject('')
          setTitle('')
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <h2 className='text-3xl font-bold mb-5 mt-10'>Đăng tài liệu</h2>
      <DragDropFile handleFiles={handleFiles} />
      <div>
        {selectedFile && (
          <div className='bg-white p-5 rounded-2xl flex gap-3 max-w-md mt-2'>
          <Document file={selectedFile} >
            <div className='max-h-[50px] overflow-hidden'>
            <Page pageNumber={1} width={40} height={50}/>
            </div>
          </Document>
          <div className='max-w-md overflow-hidden flex flex-col gap-2'>
              
          <p className='w-full'>{selectedFile.name}</p>
          <p>{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
          </div>
          </div>
        )}
      </div>
      <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md mt-5">
        <h2 className="text-2xl font-semibold mb-6">Thông tin tài liệu</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Tên tài liệu</label>
            <input type="text" id="name" name="name" placeholder="Báo cáo môn học ..." required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
              onChange={event => setTitle(event.target.value)}
              value={title}
              />
          </div>

          <div className="max-w-sm mx-auto mb-3">
            <label htmlFor="department" className="block mb-2 text-sm font-semibold text-gray-900">Khoa</label>
            <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={event => {
              const selectedDepartment = JSON.parse(event.target.value);
              console.log(selectedDepartment)
              setSelectedDepartment(selectedDepartment)
              setListSpecialized(selectedDepartment.specializeds)
            }}
            value={JSON.stringify(selectedDepartment)}
              >
              <option>Chọn khoa</option>
              {
                department && department.map(dep => (
                  <option value={JSON.stringify(dep)} key={dep.id}>{dep.departmentName}</option>
                ))
              }
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label htmlFor="department" className="block mb-2 text-sm font-semibold text-gray-900">Ngành</label>
            <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setSpecialized(e.target.value)}>
              <option>Chọn ngành</option>
              {
                Array.isArray(listSpecialized) && listSpecialized.map(specialized => (
                  <option value={specialized.id} key={specialized.id}>{specialized.specializedName}</option>
                ))
              }
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label htmlFor="department" className="block mb-2 text-sm font-semibold text-gray-900">Thể loại</label>
            <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setCategory(e.target.value)}>
              <option>Chọn thể loại</option>
              {
                Array.isArray(listCategory) && listCategory.map(category => (
                  <option value={category.id} key={category.id}>{category.categoryName}</option>
                ))
              }
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Môn học</label>
            <input type="text" id="subject" name="subject" placeholder="" required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
              value={subject}
              />
          </div>
          <div className="mb-4">
            <label htmlFor="teacher" className="block text-gray-700 text-sm font-bold mb-2">Giáo viên</label>
            <input type="text" id="teacher" name="teacher" placeholder="" required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" disabled value={jwt.user_name} />
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
            onClick={uploadDocument}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
            Đăng
          </button>
        </form>
      </div>
    </div>
  )
}
