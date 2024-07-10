import React, { useEffect, useState } from "react";
import "./editDocs.css";
import toast from "react-hot-toast";
const SubjectItems = ({ isActive, dep }) => {
    const [items, setItems] = useState([]);
    const [specialized, setSpecialized] = useState([]);
    const [specializedId, setSpecializedId] = useState([]);

    const [isEdit, setIsEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const [subjectName, setSubjectName] = useState(null);
    const hanldeClickEdit = (subject) => {
        setIsEdit(true);
        setItemEdit(subject);
        setSubjectName(subject?.subjectName);
    };

    const handleEditSpecialized = (id, name, departmentId) => {
      const updateSpecialized = async () => {
        try {
          const specializedDTO = {
            subjectName: name,
            departmentId: departmentId,
          };
          console.log(specializedDTO);
          const res = await fetch(
            "http://localhost:8080/api/v1//specialized" + id,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(specializedDTO),
            }
          );
          if (res.status === 200) {
            toast.success("Chính sửa chuyên ngành thành công.");
          } else {
            const errorResponse = res.json();
            toast.error("Error: " + (errorResponse.message || "Unknown error"));
          }
        } catch (error) {
          toast.error(error);
        }
      };

      const handleConfirm = () => {
        toast.custom((t) => (
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Chỉnh sửa môn
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Bạn có chắc muốn chỉnh sửa môn này không
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-300">
              <button
                onClick={async () => {
                  toast.remove(t.id);
                  await updateSpecialized();
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Đồng ý
              </button>
            </div>
            <div className="flex border-l border-gray-300">
              <button
                onClick={() => toast.remove(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Hủy
              </button>
            </div>
          </div>
        ));
      };

      handleConfirm();
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/subjects/specialized/${dep?.id}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    }, [dep?.id]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/specializes`)
            .then((res) => res.json())
            .then((data) => {
                setSpecialized(data);
            });
    }, []);

    const [jwt, setJwt] = useState(null);
    useEffect(() => {
        const jwt = localStorage.getItem("token");
        setJwt(jwt);
    }, []);

    function removeSubjectWithId(id) {
        if (window.confirm("Bạn có xác nhận xóa môn học này không?")) {

        fetch(`http://localhost:8080/api/v1/subjects/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + jwt,
            },
        })
            .then((res) => res.text())
            .then((data) => {
                console.log(data)
                if (data === "Subject deleted successfully") {
                    setItems(items.filter((item) => item.id !== id));
                }
            });
        }
    }

    return (
        <div>
            {isActive && (
                <div className=" mt-2 p-4 bg-gray-100 rounded-md">
                    {
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className="flex justify-between ">
                                    <strong>{item.subjectName}</strong>
                                    <li className="flex gap-5">
                                        <button
                                            onClick={() => hanldeClickEdit(item)}
                                            className=" font-medium text-blue-600 hover:underline hover:cursor-pointer"
                                        >
                                            Đổi tên
                                        </button>
                                        <button
                                            onClick={() => removeSubjectWithId(item.id)}
                                            className=" font-medium text-red-600 hover:underline hover:cursor-pointer"
                                        >
                                            Gỡ
                                        </button>
                                    </li>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            )}

            {isEdit && (
                <div className="popup">
                    <div className="popup-content ">
                        <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-6">
                                Chỉnh sửa thông tin môn học
                            </h2>
                            <form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên môn học
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Tên môn học ..."
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        value={subjectName}
                                        onChange={(e) => setSubjectName(e.target.value)}
                                    />
                                </div>
                            </form>
                            <div className="mt-6  flex justify-end ">
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="font-medium text-slate-500 rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-white border border-1 border-slate-500"
                                >
                                    Hủy
                                </button>
                                <button
                                    // onClick={() =>
                                    //   handleEditSpecialized(itemEdit.id, subjectName, dep?.id)
                                    // }
                                    className="ml-4 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-blue-500"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubjectItems;