import "./editDocs.css";
import React, { useEffect, useState } from "react";
import DragDropFile from "./DragDropFile";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Document, Page } from "react-pdf";
import toast from "react-hot-toast";

export default function EditDocs({ onClose }) {
  const [selectedFile, setFile] = useState(null);

  const [author, setAuthor] = useState(null);
  const [listCategory, setListCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [specialized, setSpecialized] = useState(null);
  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [department, setDepartment] = useState(null);
  const [listSpecialized, setListSpecialized] = useState(null);

  const handleFiles = (updatedFile) => {
    setFile(updatedFile[0]);
  };
  useEffect(() => {
    console.log(selectedDepartment);
    fetch(
        "http://localhost:8080/api/v1/specializes/department/" +
        selectedDepartment?.id
    )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListSpecialized(data);
        })
        .catch((error) => console.error(error));
  }, [selectedDepartment]);
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/departments")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDepartment(data);
        })
        .catch((error) => console.error(error));

    fetch("http://localhost:8080/api/v1/categories")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListCategory(data);
        })
        .catch((error) => console.error(error));
  }, []);

  const uploadDocument = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("subject", 1);
    formData.append("userUpload", "admin");
    formData.append("author", author);
    fetch("http://localhost:8080/api/v1/documents/upload", {
      method: "POST",
      body: formData,
    })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Đăng bài thành công");
          } else {
            toast.error("Đăng bài thất bái");
          }
          setFile(null);
          setCategory("");
          setSelectedDepartment("");
          setDescription("");
          setSpecialized(null);
          setListSpecialized(null);
          setSubject("");
          setTitle("");
        })
        .catch((error) => console.error(error));
  };
  return (
      <div className="popup ">
        <div className="popup-content w-5/6 h-4/5  flex flex-col items-center overflow-auto">
          <h2 className="my-2 font-bold text-xl ">Tạo bài đăng mới</h2>
          <div className="flex ">
            <div className="mx-4">
              <DragDropFile handleFiles={handleFiles} />
              <div>
                {selectedFile && (
                    <div className="bg-white p-5 rounded-2xl flex gap-3 max-w-md mt-2">
                      <Document file={selectedFile}>
                        <div className="max-h-[50px] overflow-hidden">
                          <Page pageNumber={1} width={40} height={50} />
                        </div>
                      </Document>
                      <div className="max-w-md overflow-hidden flex flex-col gap-2">
                        <p className="w-full">{selectedFile.name}</p>
                        <p>{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                      </div>
                    </div>
                )}
              </div>
            </div>
            <div className="max-w-lg p-8 bg-white rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-6">Thông tin tài liệu</h2>
              <form>
                <div className="mb-4">
                  <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Tên tài liệu
                  </label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Báo cáo môn học ..."
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      onChange={(event) => setTitle(event.target.value)}
                      value={title}
                  />
                </div>
                <div className="mb-4">
                  <label
                      htmlFor="message"
                      className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Mô tả
                  </label>
                  <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onChange={(event, editor) => {
                        setDescription(editor.getData());
                      }}
                  />
                </div>
                <div className="flex mb-3 gap-4">
                  <div className="w-1/2">
                    <label
                        htmlFor="department"
                        className="block mb-2 text-sm font-semibold text-gray-900"
                    >
                      Thể loại
                    </label>
                    <select
                        id="department"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Chọn thể loại</option>
                      {Array.isArray(listCategory) &&
                          listCategory.map((category) => (
                              <option value={category.id} key={category.id}>
                                {category.categoryName}
                              </option>
                          ))}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label
                        htmlFor="department"
                        className="block mb-2 text-sm font-semibold text-gray-900"
                    >
                      Ngành
                    </label>
                    <select
                        id="department"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setSpecialized(e.target.value)}
                    >
                      <option>Chọn ngành</option>
                      {Array.isArray(listSpecialized) &&
                          listSpecialized.map((specialized) => (
                              <option value={specialized.id} key={specialized.id}>
                                {specialized.specializedName}
                              </option>
                          ))}
                    </select>
                  </div>
                </div>
                <div className="flex mb-3 gap-4">
                  <div className="w-1/2">
                    <label
                        htmlFor="subject"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Môn học
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder=""
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        value={subject}
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                        htmlFor="department"
                        className="block mb-2 text-sm font-semibold text-gray-900"
                    >
                      Khoa
                    </label>
                    <select
                        id="department"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(event) => {
                          const selectedDepartment = JSON.parse(event.target.value);
                          console.log(selectedDepartment);
                          setSelectedDepartment(selectedDepartment);
                          setListSpecialized(selectedDepartment.specializeds);
                        }}
                        value={JSON.stringify(selectedDepartment)}
                    >
                      <option>Chọn khoa</option>
                      {department &&
                          department.map((dep) => (
                              <option value={JSON.stringify(dep)} key={dep.id}>
                                {dep.departmentName}
                              </option>
                          ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="w-1/2">
                    <label
                        htmlFor="subject"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Tác giả
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder=""
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                  </div>
                  <label
                      htmlFor="teacher"
                      className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Giáo viên
                  </label>
                  <input
                      type="text"
                      id="teacher"
                      name="teacher"
                      placeholder=""
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      disabled
                      value={"Minh Dat"}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="mt-4 mb-8 flex justify-end ">
            <button
                className="font-medium text-slate-500 rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-white border border-1 border-slate-500"
                onClick={onClose}
            >
              Dong
            </button>
            <button
                onClick={uploadDocument}
                className="ml-4 font-medium  text-white rounded-xl flex justify-center items-center h-10 min-w-max px-12 py-4 bg-slate-500"
            >
              Tao bai
            </button>
          </div>
        </div>
      </div>
  );
}