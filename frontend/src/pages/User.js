import React, { useContext, useEffect, useState } from "react";
import UserRow from "../components/UserRow";
import { JWTContext } from "../App";
import toast from "react-hot-toast";
import ToastConfirm from "../components/toast/ToastConfirm";

const User = () => {
  // list of users
  const [users, setUsers] = useState([]);

  const [copyOfFullUsers, setCopyOfFullUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    staffCode: "",
    username: "",
    email: "",
    password: "",
    roles: "ROLE_USER", // Default role is 'user'
    "isAdminCreate": true,
  });

  const [editUser, setEditUser] = useState({
    staffCode: "",
    username: "",
    email: "",
    password: "",
    accountLocked: false,
    role: "ROLE_USER", // Default role is 'user'
  });

  function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const handleFindUsers = (e) => {
    setUsers(copyOfFullUsers);
    setUsers((user) =>
      user.filter(
        (user) =>
          removeDiacritics(user.username.toLowerCase()).includes(
            removeDiacritics(e.toLowerCase())
          ) || user.staffCode.includes(e)
      )
    );
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {
        setIsModalOpen(false);
        alert("Đăng ký thành công");
        fetchUsers();
      } else {
        res.text().then((data) => alert(data));
      }
    });
  };

  const fetchUsers = () => {
    fetch("http://localhost:8080/api/v1/users", {})
      .then((res) => res.json())
      .then((data) => {
        setCopyOfFullUsers(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const context = useContext(JWTContext);
  const jwt = context.token;

  function saveEditUser() {
    fetch(`http://localhost:8080/api/v1/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(editUser),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "success") {
          setIsEditOpen(false);
          alert("Cập nhật người dùng thành công");
          fetchUsers();
        }
      });
  }

  function blockUser(staffCode) {
    fetch(`http://localhost:8080/api/v1/users/block/${staffCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        alert("Khoá người dùng thành công");
        fetchUsers();
        editUser.accountLocked = true;
      } else {
        res.text().then((data) => alert(data));
      }
    });
  }

  function unblockUser(staffCode) {
    fetch(`http://localhost:8080/api/v1/users/unblock/${staffCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        alert("Mở khoá người dùng thành công");
        fetchUsers();
        editUser.accountLocked = false;
      } else {
        res.text().then((data) => alert(data));
      }
    });
  }

  const [confirm, setConfirm] = useState(false);

  const handleConfirm = (confirmed, staffCode) => {
    if (confirmed) {
      fetch(`http://localhost:8080/api/v1/users/reset-password/${staffCode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Đặt lại mật khẩu thành công");
        } else {
          res.text().then((data) => toast.error(data));
        }
      });
    }
  };

  const showToast = (id) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <ToastConfirm
          confirm={confirm}
          setConfirm={(value) => {
            setConfirm(value);
            handleConfirm(value, id);
            toast.dismiss(t.id);
          }}
        />
      </div>
    ));
  };

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-3xl mb-5 w-full text-center">
        Danh sách người dùng
      </h2>
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`cursor-pointer my-5 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded`}
        >
          Tạo người dùng
        </button>
      </div>
      <div
        className={`top-0 w-full h-full flex justify-center flex-col items-center right-0 ${
          isModalOpen ? "absolute" : "hidden"
        }`}
      >
        <div
          className={`absolute z-10 top-0 w-full h-full right-0 ${
            isModalOpen ? "bg-gray-600 opacity-55" : ""
          }`}
        ></div>
        <div
          className={`xl:w-1/3 md:w-1/3 sm:w-1/3 w-4/5 h-fit z-10 absolute flex-col justify-center bg-white rounded-xl shadow-md ${
            isModalOpen ? "flex absolute" : "hidden"
          }`}
        >
          <div className="flex">
            <div className="w-[99%] justify-end">
              <h2 className="font-bold text-xl text-black mt-3 text-center">
                Thông tin người dùng mới
              </h2>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="justify-end mr-5 mt-2 border-2 py-2 px-4 rounded-lg"
            >
              X
            </button>
          </div>
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="staffCode"
              >
                Mã nhân viên
              </label>
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Tên người dùng
              </label>
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="roles"
              >
                Vai trò
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="roles"
                name="roles"
                onChange={(e) => {
                  formData.roles = e.target.value;
                }}
                required
              >
                <option value="ROLE_USER">Người dùng</option>
                <option value="ROLE_TEACHER">Giáo viên</option>
                <option
                  className={`${
                    context.jwtDecoded.role === "ROLE_SUB-ADMIN" ? "hidden" : ""
                  }`}
                  value="ROLE_SUB-ADMIN"
                >
                  Quản trị (Sub)
                </option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`my-5`}>
        <label
          htmlFor="find"
          className={`block text-gray-700 text-sm font-bold mb-2`}
        >
          Tên tài khoản/mã số cần tìm
        </label>
        <input
          type="text"
          id="find"
          className={`border-2 border-gray-300 rounded-lg p-2 w-full mt-2`}
          onChange={(e) => {
            handleFindUsers(e.target.value);
          }}
        />
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
          <tbody className="h-fit mt-5 w-full">
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                setIsEditOpen={setIsEditOpen}
                setEditUser={setEditUser}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`absolute bottom-0 right-0 w-full h-full  justify-center items-center ${
          isEditOpen ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white w-[50%] h-fit py-5 rounded-2xl border">
          <div className="w-full flex justify-end p-2">
            <button
              onClick={() => setIsEditOpen(false)}
              className="bg-red-500 text-white rounded-lg w-10 p-2"
            >
              X
            </button>
          </div>
          <div>
            <div className="w-full flex justify-center gap-5">
              <button
                onClick={() => {
                  !editUser.accountLocked
                    ? blockUser(editUser.staffCode)
                    : unblockUser(editUser.staffCode);
                }}
                className="bg-red-400 text-white rounded-lg w-fit p-2"
              >
                {!editUser.accountLocked
                  ? "Khóa người dùng"
                  : "Mở khóa người dùng"}
              </button>
              {context.jwtDecoded.role === "ROLE_SUB-ADMIN" && (
                <button
                  onClick={() => showToast(editUser.staffCode)}
                  className="bg-red-400 text-white rounded-lg w-fit p-2"
                >
                  Reset mật khẩu
                </button>
              )}
            </div>
            <form className="px-8 py-6">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="staffCode"
                >
                  Mã nhân viên
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="staffCode"
                  type="text"
                  placeholder="Mã nhân viên"
                  name="staffCode"
                  value={editUser.staffCode}
                  onChange={(e) =>
                    setEditUser({ ...editUser, staffCode: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Tên người dùng
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Tên người dùng"
                  name="username"
                  value={editUser.username}
                  onChange={(e) =>
                    setEditUser({ ...editUser, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="roles"
                >
                  Vai trò
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="roles"
                  name="roles"
                  onChange={(e) => {
                    editUser.role = e.target.value;
                  }}
                  required
                >
                  <option
                    value="ROLE_USER"
                    selected={editUser.role === "ROLE_USER"}
                  >
                    Người dùng
                  </option>
                  <option
                    value="ROLE_TEACHER"
                    selected={editUser.role === "ROLE_TEACHER"}
                  >
                    Giáo viên
                  </option>
                  <option
                    value="ROLE_SUB-ADMIN"
                    className={`${
                      context.jwtDecoded?.role === "ROLE_ADMIN" ? "" : "hidden"
                    }`}
                    selected={editUser.role === "ROLE_SUB-ADMIN"}
                  >
                    Quản trị (Sub)
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div className="w-full flex justify-center p-2">
            <button
              onClick={saveEditUser}
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg w-[50%] p-2"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
