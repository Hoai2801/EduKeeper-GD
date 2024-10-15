import React, { useEffect, useState } from "react";
import "./editDocs.css";
import toast from "react-hot-toast";
import DragDropFile from "./DragDropFile";
import { Document, Page } from "react-pdf";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const EditDocument = ({ isShowEdit, setIsShowEdit, documentEdit }) => {
  const [specialized, setSpecialized] = useState(null);
  const [selectSpecialized, setSelectSpecialized] = useState(null);
  const [users, setUsers] = useState(null);

  const [selectedFile, setFile] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [specializeds, setSpecializeds] = useState(null);
  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [selectUserUpload, setSelectUserUpload] = useState(null);
  const handleFiles = (updatedFile) => {
    setFile(updatedFile[0]);
  };
  const handleEdit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("userUpload", selectUserUpload?.staffCode);
    formData.append("author", author);
    formData.append("category", selectCategory.id);
    formData.append("subject", 1);
    formData.append("description", description);
    fetch(`http://localhost:8080/api/v1/documents/${documentEdit.id}`, {
      method: "PUT",
      body: formData,
    })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Cập nhật tài liệu thành công");
          } else {
            console.log(res);
            toast.error("Cập nhật tài liệu lỗi" + res.body);
          }
          setIsShowEdit(false);
        })
        .catch((error) => {
          toast.error(error);
        });
  };

  useEffect(() => {
    setTitle(documentEdit.title);
    setSelectUserUpload(documentEdit.author);
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
  }, [documentEdit]);

  return (
      <div className={` popup ${isShowEdit ? "" : "hidden"}`}>
        <div
            className={`popup-content overflow-auto w-[80%] h-[90%] fixed top-10 border-2 border-black rounded-2xl`}
        >
          <div className="w-full flex justify-end p-2">
            <button
                onClick={() => setIsShowEdit(false)}
                className="text-white bg-red-500 hover:bg-red-300 rounded-md p-2 w-10 h-10"
            >
              X
            </button>
          </div>
          <div className="w-full p-5 flex justify-center">
            <div className="w-[80%] flex flex-col gap-5">
              {/* <div className="flex justify-center">
              <div>
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
                        <p>
                          {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div> */}
              <label htmlFor="" className="block font-bold">
                Tên tài liệu
              </label>
              <input
                  type="text"
                  name=""
                  id=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-md p-4"
              />
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
              <label htmlFor="" className="block font-bold">
                Người đăng
              </label>
              <select
                  name=""
                  id=""
                  className="border border-gray-300 rounded-md p-4"
                  onChange={(e) => setSelectUserUpload(JSON.parse(e.target.value))}
              >
                {users &&
                    users.map((author) => (
                        <option
                            value={JSON.stringify(author)}
                            key={author.id}
                            selected={selectUserUpload?.id === author.id}
                        >{`${author.username} - ${author.staffCode}`}</option>
                    ))}
              </select>
              <label htmlFor="" className="block font-bold">
                Tác giả
              </label>
              <input
                  onChange={(e) => setAuthor(e.target.value)}
                  className="border border-gray-300 rounded-md p-4"
              />
              <label htmlFor="" className="block font-bold">
                Chuyên ngành
              </label>
              <select
                  name=""
                  id=""
                  className="border border-gray-300 rounded-md p-4"
                  onChange={(e) => setSelectSpecialized(JSON.parse(e.target.value))}
              >
                {specialized &&
                    specialized?.map((specialized) => (
                        <option
                            value={JSON.stringify(specialized)}
                            key={specialized.id}
                            selected={specialized.id === selectSpecialized?.id}
                        >
                          {specialized.specializedName}
                        </option> // {specialized.specializedName}</option>
                    ))}
              </select>
              <label htmlFor="" className="block font-bold">
                Môn học{" "}
              </label>
              <select
                  name=""
                  id=""
                  className="border border-gray-300 rounded-md p-4"
              ></select>
              <label htmlFor="" className="block font-bold">
                Thể loại
              </label>
              <select
                  name=""
                  id=""
                  className="border border-gray-300 rounded-md p-4"
                  onChange={(e) => setSelectCategory(JSON.parse(e.target.value))}
              >
                {category &&
                    category.map((category) => (
                        <option
                            value={JSON.stringify(category)}
                            key={category.id}
                            selected={category.id === documentEdit?.category?.id}
                        >
                          {category.categoryName}
                        </option> // {specialized.specializedName}</option>
                    ))}
              </select>

              <label htmlFor="" className="block font-bold">
                Ngày đăng
              </label>
              <input
                  type="text"
                  name=""
                  id=""
                  value={documentEdit?.upload_date}
                  className="border border-gray-300 rounded-md p-4"
              />
              <button
                  onClick={handleEdit}
                  className="text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditDocument;