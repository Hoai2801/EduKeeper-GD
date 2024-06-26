import React, { useEffect, useState } from 'react'
import UserRow from '../components/UserRow';

const User = () => {
  // list of users
  const [users, setUsers] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isEditOpen, setIsEditOpen] = useState(false)

  const [formData, setFormData] = useState({
    staffCode: '',
    username: '',
    email: '',
    password: '',
    roles: 'USER' // Default role is 'user'
  });

  const [editUser, setEditUser] = useState({
    staffCode: '',
    username: '',
    email: '',
    password: '',
    roles: 'USER' // Default role is 'user'
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    const response = fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if (response) {
      console.log(response)
      setIsModalOpen(false)
      alert("Tạo người dùng thành công")

    }
  };


  useEffect(() => {
    fetch("http://localhost:8080/api/v1/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      });
  }, [])

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-3xl mb-5 w-full text-center">Danh sách người dùng</h2>
      <div className="flex justify-center">
        <button onClick={() => setIsModalOpen(true)} className={`cursor-pointer my-5 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded`}>Tạo người dùng</button>
      </div>
      <div className={`top-0 w-full h-full flex justify-center flex-col items-center right-0 ${isModalOpen ? 'absolute' : 'hidden'}`}>
        <div className={`absolute z-10 top-0 w-full h-full right-0 ${isModalOpen ? 'bg-gray-600 opacity-55' : ''}`}>

        </div>
        <div className={`w-1/3 h-fit z-10 absolute flex-col justify-center bg-white rounded-xl shadow-md ${isModalOpen ? 'flex absolute' : 'hidden'}`}>
          <div className='flex'>
            <div className='w-[99%] justify-end'>
              <h2 className='font-bold text-xl text-black mt-3 text-center'>Thông tin người dùng mới</h2>
            </div>
            <button onClick={() => setIsModalOpen(false)} className='justify-end mr-5 mt-2 border-2 py-2 px-4 rounded-lg'>X</button>
          </div>
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="staffCode">Mã nhân viên</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="staffCode"
                type="text"
                placeholder="Mã nhân viên"
                name="staffCode"
                value={formData.staffCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Tên người dùng</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Tên người dùng"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mật khẩu</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roles">Vai trò</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="roles"
                name="roles"
                onChange={(e) => {
                  formData.roles = e.target.value;
                }}
                required
              >
                <option value="USER">Người dùng</option>
                <option value="ADMIN">Quản trị viên</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
        <div className="overflow-x-auto text-center">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Họ và tên</th>
                <th className="px-4 py-2">Mã nhân viên</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Quyền</th>
                <th className="px-4 py-2 w-[200px]">Tình trạng</th>
                <th className="px-4 py-2">Ngày khởi tạo</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className='h-fit mt-5 w-full'>
              {users.map(user => (
                <UserRow key={user.id} user={user} setIsEditOpen={setIsEditOpen} setEditUser={setEditUser} />
              ))}
            </tbody>
          </table>
        </div>
        <div className={`absolute bottom-0 right-0 w-full h-full  justify-center items-center ${isEditOpen ? 'flex' : 'hidden'}`}>
            <div className='bg-white w-[50%] h-[50%] rounded-2xl border'>
                <div className='w-full flex justify-end p-2'>
                    <button onClick={() => setIsEditOpen(false)} className='bg-red-500 text-white rounded-lg w-10 p-2'>X</button>
                </div>
                <div>
                    <div className='w-full flex justify-center gap-5'>
                        <button onClick={null} className='bg-red-400 text-white rounded-lg w-fit p-2'>Disable user</button>
                        <button onClick={null} className='bg-red-400 text-white rounded-lg w-fit p-2'>Xóa user</button>
                    </div>
                    <div className='w-full p-5'>
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Tên người dùng</label>
                        <input type="text" id="message" name="message" placeholder="" required value={editUser.username} onChange={(e) => setEditUser({...editUser, username: e.target.value})}/>
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Quyền người dùng</label>
                        <select name="message" id="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                            <option>Quyền người dùng</option>
                            <option value="USER">Người dùng</option>
                            <option value="ADMIN">Quản trị</option>
                        </select>
                    </div>
                </div>
                <div className='w-full flex justify-center p-2'>
                  <button onClick={null} className='bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-[50%] p-2'>Lưu</button>
                </div>
            </div>
        </div>
    </div>
  );

}

export default User