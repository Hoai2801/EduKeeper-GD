import React, { useEffect, useState } from 'react'
import DragDropFile from '../components/DragDropFile'

export const Upload = () => {
  // file upload
  const [selectedFile, setFile] = useState(null);

  const [department, setDepartment] = useState(null);
  // const [category, setCategory] = useState(null);
  // const [specialized, setSpecialized] = useState(null);
  // const [object, setObject] = useState(null);
  // const [teacher, setTeacher] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // const department = [
  //   {
  //     id: 1,
  //     name: 'Khoa học máy tính'
  //   },
  //   {
  //     id: 2,
  //     name: 'Khoa học điện tử'
  //   },
  //   {
  //     id: 3,
  //     name: 'Hệ thống thông tin'
  //   },
  //   {
  //     id: 4,
  //     name: 'Khoa học dữ liệu'
  //   },
  //   {
  //     id: 5,
  //     name: 'Quản trị kinh doanh'
  //   }
  // ]

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
    // const category = fetch('https://giadinh.edu.vn/api/category')
    // const specialized = fetch('https://giadinh.edu.vn/api/specialized')
    // const object = fetch('https://giadinh.edu.vn/api/object')
    // const teacher = fetch('https://giadinh.edu.vn/api/teacher')

    // setDepartment(department)
    // setCategory(category)
    // setSpecialized(specialized)
    // setObject(object)
    // setTeacher(teacher)
  }, [])

  // department.map(department => {
  //   console.log(department.departmentName)
  // })
  console.log(selectedDepartment)
  return (
    <div>
      <h2 className='text-3xl font-bold mb-5'>Đăng tài liệu</h2>
      <DragDropFile handleFiles={handleFiles} />
      <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md mt-5">
        <h2 className="text-2xl font-semibold mb-6">Thông tin tài liệu</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Tên tài liệu</label>
            <input type="text" id="name" name="name" placeholder="Báo cáo môn học ..." required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>

          <div className="max-w-sm mx-auto mb-3">
            <label htmlFor="department" className="block mb-2 text-sm font-semibold text-gray-900">Khoa</label>
            <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  onChange={e => setSelectedDepartment(e.target.value)}>
              <option>Chọn khoa</option>
              {
                Array.isArray(department) && department.map(dep => (
                  <option value={dep.id} key={dep.id}>{dep.departmentName}</option>
                ))
              }
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Chuyên ngành</label>
            <input type="email" id="email" name="email" placeholder="" required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Môn học</label>
            <input type="email" id="email" name="email" placeholder="" required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Giáo viên</label>
            <input type="email" id="email" name="email" placeholder="" required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Your Message</label>
            <textarea id="message" name="message" rows="4" placeholder="How can we help you?"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
