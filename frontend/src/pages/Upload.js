import React, { useContext, useEffect, useState } from "react";
import DragDropFile from "../components/DragDropFile";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation, useParams } from "react-router-dom";
import { JWTContext } from "../App";
import toast from "react-hot-toast";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export const Upload = () => {
  const location = useLocation();
  let isEditPage = location.pathname !== "/upload";

  const path = useParams();

  const jwt = useContext(JWTContext)?.jwt;
  const user = useContext(JWTContext)?.user;

  const [listDepartment, setListDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [listSpecialized, setListSpecialized] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listSubject, setListSubject] = useState([]);

  const [documentEditId, setDocumentEditId] = useState(-1);

  const [isLoading, setIsLoading] = useState(false);

  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    specialized: "",
    subject: "",
    category: "",
    scope: "",
    userUpload: user?.staff_code || "",
    author: "",
    document: null,
    documentDownload: null,
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUploadData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // // true if user want to have a download file different the file which is uploaded
  // const [haveDownloadFile, setHaveDownloadFile] = useState(false);

  const [scopeList] = useState([
    {
      scope: "public",
      name: "Công khai",
    },
    {
      scope: "private",
      name: "Riêng tư",
    },
    {
      scope: "student-only",
      name: "Nội bộ sinh viên",
    },
  ]);

  const handleListSpecialized = (departmentId) => {
    fetch("http://localhost:8080/api/v1/specializes/department/" + departmentId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        setListSpecialized(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (path && path.slug) {
      fetch("http://localhost:8080/api/v1/documents/" + path.slug)
        .then((response) => response.json())
        .then((data) => {
          setDocumentEditId(data.id);
          uploadData.title = data.title;
          uploadData.description = data.description;
          uploadData.specialized = data.specialized.id;
          uploadData.subject = data.subject.id;
          uploadData.category = data.category.id;
          uploadData.scope = data.scope;
          uploadData.userUpload = data.userUpload;
          uploadData.author = data.author;

          fetch("http://localhost:8080/api/v1/documents/" + data.slug + "/file")
            .then((response) => response.blob())
            .then((blob) => {
              const file = new File([blob], data.path, { type: blob.type });
              setUploadData((prevState) => ({
                ...prevState,
                document: file,
              }));
            })
            .catch((error) => {
              console.error("Download error:", error);
            });

          setSelectedDepartment(data.department.id);
          handleListSpecialized(data.department.id);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [path]);

  useEffect(() => {
    if (uploadData.specialized) {
      fetch(
        "http://localhost:8080/api/v1/subjects/specialized/" +
          uploadData.specialized
      )
        .then((response) => response.json())
        .then((data) => {
          setListSubject(data);
        })
        .catch((error) => console.error(error));
    } else {
      setListSubject([]);
    }
  }, [uploadData.specialized]);

  const handleFiles = (updatedFile) => {
    setUploadData((prevState) => ({
      ...prevState,
      document: updatedFile[0],
    }));
  };

  const resetUploadFiles = () => {
    setUploadData((prevState) => ({
      ...prevState,
      document: null,
    }));
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/departments")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => {
        setListDepartment(data);
      })
      .catch((error) => console.error(error));

    fetch("http://localhost:8080/api/v1/categories")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => {
        setListCategory(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const createDocument = (event) => {
    event.preventDefault();

    // Check data
    if (!uploadData.document) {
      toast.error("Vui lòng chọn tài liệu");
      return;
    }
    if (!uploadData.title) {
      toast.error("Vui lòng nhập tiêu đề");
      return;
    }
    if (!uploadData.category || uploadData.category === -1) {
      toast.error("Vui lòng chọn thể loại");
      return;
    }
    if (!uploadData.specialized || uploadData.specialized === -1) {
      toast.error("Vui lòng chọn chuyên ngành");
      return;
    }
    if (!uploadData.author) {
      toast.error("Vui lòng nhập tên tác giả");
      return;
    }
    if (!uploadData.scope || uploadData.scope === -1) {
      toast.error("Vui lòng chọn quyền riêng tư");
      return;
    }

    const formData = new FormData();
    formData.append("document", uploadData.document);
    formData.append("title", uploadData.title);
    formData.append("specialized", uploadData.specialized);
    formData.append("category", uploadData.category);
    formData.append("description", uploadData.description);
    formData.append("subject", uploadData.subject);
    formData.append("userUpload", user?.staff_code);
    formData.append("scope", uploadData.scope);
    formData.append("author", uploadData.author);
    // formData.append('documentDownload', haveDownloadFile ? uploadData.documentDownload : uploadData.document);

    setIsLoading(true);
    fetch("http://localhost:8080/api/v1/documents/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          resetDocument();
          toast.success("Tài liệu đã được tải lên");
        } else {
          response.text().then((data) => toast.error(data));
        }
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
  };

  const resetDocument = () => {
    setSelectedDepartment(-1);
    // setHaveDownloadFile(false)
    uploadData.document = null;
    uploadData.title = "";
    uploadData.specialized = -1;
    uploadData.category = -1;
    uploadData.description = "";
    uploadData.subject = -1;
    uploadData.scope = -1;
    uploadData.author = "";
    uploadData.documentDownload = null;
  };

  const updateDocument = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("document", uploadData.document);
    formData.append("title", uploadData.title);
    formData.append("specialized", uploadData.specialized);
    formData.append("category", uploadData.category);
    formData.append("description", uploadData.description);
    formData.append("subject", uploadData.subject);
    formData.append("userUpload", user?.staff_code);
    formData.append("scope", uploadData.scope);
    formData.append("author", uploadData.author);
    formData.append("documentDownload", uploadData.documentDownload);

    fetch("http://localhost:8080/api/v1/documents/" + documentEditId, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Cập nhật tài liệu thành công");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={`w-full p-2`}>
      <div
        className={`${
          isLoading ? "" : "hidden"
        } top-0 left-0 w-full h-[100vh] fixed bg-gray-500/50 z-50 flex justify-center items-center`}
      >
        <div
          role="status"
          className={`z-50 flex flex-col justify-center items-center`}
        >
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <h3 className={`text-xl font-bold text-white mt-5`}>
            Đang đăng tài liệu, quá trình này có thể diễn ra trong vài phút!
          </h3>
        </div>
      </div>
      <h2
        className={`text-3xl font-bold mb-5 mt-10 pl-10 lg:pl-0 text-center ${
          isEditPage ? "block" : "hidden"
        }`}
      >
        Cập nhật tài liệu
      </h2>
      <div
        className={`${isEditPage ? "hidden" : "block"} max-w-[450px] mx-auto`}
      >
        <p className="text-3xl font-bold mb-5 mt-10">Đăng tài liệu</p>
        <p className={`text-lg`}>
          Tài liệu <span className="text-red-500">*</span>
        </p>
        <p className={`text-red-500 mb-2`}>
          Lưu ý chỉ hỗ trợ file PDF, Doc, Docx, PPT và PPTX
        </p>
        <div className={`${uploadData.document ? "hidden" : "block"}`}>
          <DragDropFile
            handleFiles={handleFiles}
            fileSupport={`application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword`}
          />
        </div>
      </div>
      <div
        className={`flex justify-center p-2 ${isEditPage ? "hidden" : "block"}`}
      >
        {uploadData?.document && (
          <div className="bg-white p-5 rounded-2xl flex gap-3 max-w-md mt-2">
            {uploadData?.document.type === "application/pdf" ? (
              <Document
                file={uploadData.document}
                type={uploadData.document.type}
              >
                <div className="max-h-[50px] overflow-hidden">
                  <Page pageNumber={1} width={40} height={50} />
                </div>
              </Document>
            ) : (
              ""
            )}
            <div className={`max-w-md overflow-hidden flex flex-col gap-2`}>
              <p className="w-full">{uploadData?.document.name}</p>
              <p>{(uploadData?.document.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
            <button onClick={() => resetUploadFiles()} className="text-red-500">
              Xóa
            </button>
          </div>
        )}
      </div>
      <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md mt-5">
        <h2 className="text-2xl font-semibold mb-6">Thông tin tài liệu</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tên tài liệu <span className={`text-red-500`}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="title"
              placeholder="Báo cáo môn học ..."
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={uploadData.title}
            />
          </div>

          <div className="max-w-sm mx-auto mb-3">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Khoa <span className={`text-red-500`}>*</span>
            </label>
            <select
              id="department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(event) => {
                setSelectedDepartment(event.target.value);
                handleListSpecialized(event.target.value);
              }}
              value={selectedDepartment}
            >
              <option
                value={-1}
                className={`${isEditPage ? "hidden" : "block"}`}
              >
                Chọn khoa
              </option>
              {listDepartment &&
                listDepartment?.map((dep) => {
                  return (
                    <option
                      value={dep.id}
                      selected={dep.id === selectedDepartment}
                      className={`${dep.locked ? "hidden" : "block"}`}
                      key={dep.id}
                    >
                      {dep.departmentName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Ngành <span className={`text-red-500`}>*</span>
            </label>
            <select
              id="specialized"
              name="specialized"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
              value={uploadData.specialized}
            >
              <option value={-1}>Chọn ngành</option>
              {listSpecialized &&
                listSpecialized?.map((specialized) => {
                  return (
                    <option
                      value={specialized.id}
                      selected={specialized.id === uploadData.specialized}
                      className={`${specialized.locked ? "hidden" : "block"}`}
                      key={specialized.id}
                    >
                      {specialized.specializedName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Thể loại <span className={`text-red-500`}>*</span>
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
              value={uploadData.category}
            >
              <option value={-1}>Chọn thể loại</option>
              {Array.isArray(listCategory) &&
                listCategory.map((category) => (
                  <option
                    value={category.id}
                    key={category.id}
                    selected={
                      category.id === uploadData.category ||
                      category.id === uploadData.category
                    }
                  >
                    {category.categoryName}
                  </option>
                ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Môn <span className={`text-red-500`}>*</span>
            </label>
            <select
              id="subject"
              name="subject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
            >
              <option value={null}>Chọn môn</option>
              {listSubject &&
                listSubject.map((subject) => (
                  <option
                    selected={subject.id === uploadData.subject}
                    value={subject.id}
                    key={subject.id}
                  >
                    {subject.subjectName}
                  </option>
                ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label
              htmlFor="scope"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Quyền riêng tư <span className={`text-red-500`}>*</span>
            </label>
            <select
              id="scope"
              name="scope"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
              value={uploadData.scope}
            >
              <option value={-1}>Chọn quyền riêng tư</option>
              {scopeList.map((scope, index) => (
                <option
                  selected={scope.scope === uploadData.scope}
                  key={index}
                  value={scope.scope}
                >
                  {scope.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="teacher"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Giáo viên{" "}
              <span className={`text-gray-400`}>(Người đăng tài liệu)</span>
            </label>
            <input
              type="text"
              id="teacher"
              name="teacher"
              placeholder=""
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              disabled
              value={user?.user_name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="teacher"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tác giả <span className={`text-red-500`}>*</span>
              <span className={`text-gray-400 block text-xs`}>
                (Tác giả của tài liệu. vd: Thạc sĩ Nguyễn Văn A, Adam
                Freeman...)
              </span>
            </label>
            <input
              type="text"
              id="teacher"
              name="author"
              placeholder=""
              required
              onChange={handleChange}
              value={uploadData.author}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mô tả
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={uploadData.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setUploadData({ ...uploadData, description: data });
              }}
            />
          </div>
          <button
            onClick={createDocument}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ${
              isEditPage ? "hidden" : ""
            }`}
          >
            Đăng
          </button>
          <button
            onClick={updateDocument}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ${
              isEditPage ? "" : "hidden"
            }`}
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};
