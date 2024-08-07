<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import DragDropFile from "../components/DragDropFile";
import { jwtDecode } from "jwt-decode";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Document, Page } from "react-pdf";
import { useLocation, useParams } from "react-router-dom";
import { JWTContext } from "../App";
=======
import React, {useContext, useEffect, useState} from 'react'
import DragDropFile from '../components/DragDropFile'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Document, Page} from 'react-pdf';
import {useLocation, useParams} from "react-router-dom";
import {JWTContext} from "../App";
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302
import toast from "react-hot-toast";

export const Upload = () => {
  const location = useLocation();
  let isEditPage = location.pathname !== "/upload";

<<<<<<< HEAD
  const path = useParams();

  // edit file
  const [documentEdit, setDocumentEdit] = useState(null);

  // file upload
  const [selectedFile, setFile] = useState(null);

  const [haveDownloadFile, setHaveDownloadFile] = useState(false);
  const [downloadFile, setDownloadFile] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState(1);
  const [description, setDescription] = useState(null);
  const [scopeList, setScopeList] = useState([
    {
      scope: "public",
      name: "Công khai",
    },
    {
      scope: "private",
      name: "Riêng tư",
    },
    {
      scope: "student-only",
      name: "Nội bộ sinh viên",
    },
  ]);
  const [scope, setScope] = useState(null);
  const [specialized, setSpecialized] = useState(null);
  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [listSpecialized, setListSpecialized] = useState([]);
  const [listSubject, setListSubject] = useState(null);
  const [author, setAuthor] = useState(null);

  const context = useContext(JWTContext);
  const jwt = context?.token;
  const user = context?.jwtDecoded;

  useEffect(() => {
    if (path && path.slug) {
      fetch("http://localhost:8080/api/v1/documents/" + path.slug)
        .then((response) => response.json())
        .then((data) => {
          setDocumentEdit(data);
        })
        .catch((error) => console.error(error));
    }
  }, [path]);

  useEffect(() => {
    if (specialized) {
      fetch(
        "http://localhost:8080/api/v1/subjects/specialized/" + specialized?.id
      )
        .then((response) => response.json())
        .then((data) => {
          setListSubject(data);
        })
        .catch((error) => console.error(error));
    }
  }, [specialized]);

  const handleFiles = (updatedFile) => {
    setFile(updatedFile[0]);
  };

  const handleFileDownload = (updatedFile) => {
    setDownloadFile(updatedFile[0]);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => console.error(error));

    fetch("http://localhost:8080/api/v1/categories")
      .then((response) => response.json())
      .then((data) => {
        setListCategory(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (path && path.slug) {
      fetch("http://localhost:8080/api/v1/documents/" + path.slug)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTitle(data.title);
          setDescription(data.description);
          setAuthor(data.author);
          setScope(data.scope);
          setSpecialized(data.specialized);
          setSelectedDepartment(data.specialized.department);
          setCategory(data.category.id);
          setSubject(data.subject?.id);
          setDocumentEdit(data);
        })
        .catch((error) => console.error(error));
      const fetchFile = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/documents/${path.slug}/file`,
            {
              method: "GET",
            }
          );

          // Check if the response is OK
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response?.blob();
          setFile(data);
        } catch (error) {
          console.error("Error fetching file:", error);
        }
      };

      fetchFile();
    }
  }, [path]);

  useEffect(() => {
    if (selectedDepartment) {
      fetch(
        "http://localhost:8080/api/v1/specializes/department/" +
          selectedDepartment?.id
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.length > 0) {
            setListSpecialized(data);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (specialized) {
      fetch(
        "http://localhost:8080/api/v1/subjects/specialized/" + specialized?.id
      )
        .then((response) => response.json())
        .then((data) => {
          setListSubject(data);
        })
        .catch((error) => console.error(error));
    }
  }, [specialized]);

  const createDocument = (event) => {
    event.preventDefault();

    // check data
    if (selectedFile === null) {
      alert("Vui lòng chọn tài liệu");
      return;
    }
    if (title === null || title === "") {
      alert("Vui lòng nhập tiêu đề");
      return;
    }
    if (category === null || category === "") {
      alert("Vui lòng chọn thể loại");
      return;
    }
    if (selectedDepartment === null || selectedDepartment === "") {
      alert("Vui lòng chọn đơn vị");
      return;
    }
    if (specialized === null || specialized === "") {
      alert("Vui lòng chọn chuyên ngành");
      return;
    }
    if (author === null || author === "") {
      alert("Vui lòng nhập tên tác giả");
      return;
    }
    if (scope === null || scope === "") {
      alert("Vui lòng chọn quyền riêng tư");
      return;
    }

    const formData = new FormData();
    console.log(user);
    formData.append("document", selectedFile);
    formData.append("title", title);
    formData.append("department", selectedDepartment.id);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("subject", subject || -1);
    formData.append("specialized", specialized?.id);
    formData.append("userUpload", user?.staff_code);
    formData.append("scope", scope || "public");
    formData.append("author", author);
    formData.append("documentDownload", downloadFile);
    console.log(formData);

    fetch("http://localhost:8080/api/v1/documents/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success("Tài liệu đã được tải lên");
          setFile(null);
          setCategory("");
          setSelectedDepartment("");
          setDescription("");
          setSpecialized(null);
          setListSpecialized(null);
          setSubject("");
          setTitle("");
          setScope(null);
          setAuthor("");
        } else {
          response.text().then((data) => toast.error(data));
        }
      })
      .catch((error) => console.error(error));
  };

  const updateDocument = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("title", title);
    formData.append("department", selectedDepartment.id);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("subject", subject || 1);
    formData.append("userUpload", jwt.staff_code);
    formData.append("scope", scope);
    formData.append("author", author);
    console.log(documentEdit);
    fetch(`http://localhost:8080/api/v1/documents/${documentEdit.id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Cập nhật tài liệu thành công");
        } else {
          response.text().then((text) => {
            console.error(`Error: ${response.status} - ${text}`);
          });
        }
      })
      .catch((error) => console.error(error));
  };

  // check is true author or not
  // if (jwt && documentEdit) {
  //     if (jwt?.staff_code !== documentEdit?.user_upload?.staffCode) {
  //         window.location.href = "/";
  //     }
  // }

  return (
    <div className={`w-full p-2`}>
      <h2
        className={`text-3xl font-bold mb-5 mt-10 pl-10 lg:pl-0 ${
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
        <p className={`text-red-500 mb-2`}>Lưu ý chỉ hỗ trợ file PDF</p>
        <div className={`${selectedFile ? "hidden" : "block"}`}>
          <DragDropFile
            handleFiles={handleFiles}
            fileSupport={`application/pdf`}
          />
=======
    const path = useParams();

    const context = useContext(JWTContext);
    const jwt = context?.token;
    const user = context?.jwtDecoded;

    const [listDepartment, setListDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [listSpecialized, setListSpecialized] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listSubject, setListSubject] = useState([]);

    const [documentEditId, setDocumentEditId] = useState(-1);

    const [uploadData, setUploadData] = useState({
        title: '',
        description: '',
        specialized: '',
        subject: '',
        category: '',
        scope: '',
        userUpload: user?.staff_code || '',
        author: '',
        document: null,
        documentDownload: null
    });

    // Handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUploadData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // true if user want to have a download file different the file which is uploaded
    const [haveDownloadFile, setHaveDownloadFile] = useState(false);

    const [scopeList, setScopeList] = useState([
        {
            scope: "public",
            name: "Công khai"
        },
        {
            scope: "private",
            name: "Riêng tư"
        },
        {
            scope: "student-only",
            name: "Nội bộ sinh viên"
        }
    ]);

    const handleListSpecialized = (departmentId) => {
        fetch('http://localhost:8080/api/v1/specializes/department/' + departmentId)
            .then(response => response.json())
            .then(data => {
                setListSpecialized(data);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        if (path && path.slug) {
            fetch('http://localhost:8080/api/v1/documents/' + path.slug)
                .then(response => response.json())
                .then(data => {
                    setDocumentEditId(data.id)
                    uploadData.title = data.title;
                    uploadData.description = data.description;
                    uploadData.specialized = data.specialized.id;
                    uploadData.subject = data.subject.id;
                    uploadData.category = data.category.id;
                    uploadData.scope = data.scope;
                    uploadData.userUpload = data.userUpload;
                    uploadData.author = data.author;

                    if (data.path !== data.file_download) {
                        setHaveDownloadFile(true);
                        fetch('http://localhost:8080/api/v1/documents/' + data.slug + "/download")
                            .then(response => response.blob())
                            .then(blob => {
                                const file = new File([blob], data.file_download, { type: blob.type });
                                setUploadData(prevState => ({
                                    ...prevState,
                                    documentDownload: file
                                }));
                            })
                            .catch(error => {
                                console.error('Download error:', error);
                            });
                    }
                        fetch('http://localhost:8080/api/v1/documents/' + data.slug + "/file")
                            .then(response => response.blob())
                            .then(blob => {
                                const file = new File([blob], data.path, { type: blob.type });
                                setUploadData(prevState => ({
                                    ...prevState,
                                    document: file,
                                }));
                                if (!haveDownloadFile) {
                                    setUploadData(prevState => ({
                                        ...prevState,
                                        documentDownload: file
                                    }));
                                }
                            })
                            .catch(error => {
                                console.error('Download error:', error);
                            });


                    setSelectedDepartment(data.department.id);
                    handleListSpecialized(data.department.id);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
    }, [path]);


    useEffect(() => {
        if (uploadData.specialized) {
            fetch('http://localhost:8080/api/v1/subjects/specialized/' + uploadData.specialized)
                .then(response => response.json())
                .then(data => {
                    setListSubject(data);
                })
                .catch(error => console.error(error));
        } else {
            setListSubject([]);
        }
    }, [uploadData.specialized]);

    const handleFiles = (updatedFile) => {
        setUploadData(prevState => ({
            ...prevState,
            document: updatedFile[0]
        }));
    };

    const handleFileDownload = (updatedFile) => {
        setUploadData(prevState => ({
            ...prevState,
            documentDownload: updatedFile[0]
        }));
    };

    // Handler to reset file inputs to null
    const resetDownloadFiles = () => {
        setUploadData(prevState => ({
            ...prevState,
            documentDownload: null
        }));
    };

    const resetUploadFiles = () => {
        setUploadData(prevState => ({
            ...prevState,
            document: null
        }));
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/departments')
            .then(response => response.json())
            .then(data => {
                setListDepartment(data);
            })
            .catch(error => console.error(error));

        fetch('http://localhost:8080/api/v1/categories')
            .then(response => response.json())
            .then(data => {
                setListCategory(data);
            })
            .catch(error => console.error(error));
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
            toast.error("Vui lòng chọn thể loại")
            return;
        }
        if (!uploadData.specialized || uploadData.specialized === -1) {
            toast.error("Vui lòng chọn chuyên ngành");
            return;
        }
        if (!uploadData.author) {
            toast.error("Vui lòng nhập tên tác giả")
            return;
        }
        if (!uploadData.scope || uploadData.scope === -1) {
            toast.error("Vui lòng chọn quyền riêng tư")
            return;
        }

        const formData = new FormData();
        formData.append('document', uploadData.document);
        formData.append('title', uploadData.title);
        formData.append('specialized', uploadData.specialized);
        formData.append('category', uploadData.category);
        formData.append('description', uploadData.description);
        formData.append('subject', uploadData.subject);
        formData.append('userUpload', user?.staff_code);
        formData.append('scope', uploadData.scope);
        formData.append('author', uploadData.author);
        formData.append('documentDownload', haveDownloadFile ? uploadData.documentDownload : uploadData.document);

        fetch('http://localhost:8080/api/v1/documents/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then(response => {
                if (response.status === 200) {
                    resetDocument()
                    toast.success("Tài liệu đã được tải lên");
                } else {
                    response.text().then(data => toast.error(data));
                }
            })
            .catch(error => console.error(error));
    };

    const resetDocument = () => {
        setSelectedDepartment(-1)
        setHaveDownloadFile(false)
        uploadData.document = null
        uploadData.title = ''
        uploadData.specialized = -1
        uploadData.category = -1
        uploadData.description = ''
        uploadData.subject = -1
        uploadData.scope = -1
        uploadData.author = ''
        uploadData.documentDownload = null
    };

    const updateDocument = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('document', uploadData.document);
        formData.append('title', uploadData.title);
        formData.append('specialized', uploadData.specialized);
        formData.append('category', uploadData.category);
        formData.append('description', uploadData.description);
        formData.append('subject', uploadData.subject);
        formData.append('userUpload', user?.staff_code);
        formData.append('scope', uploadData.scope);
        formData.append('author', uploadData.author);
        formData.append('documentDownload', uploadData.documentDownload);

        fetch('http://localhost:8080/api/v1/documents/' + documentEditId, {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then(response => {
                if (response.status === 200) {
                    toast.success("Cập nhật tài liệu thành công");
                }
            })
            .catch(error => console.error(error));
    };

    console.log(uploadData.document)
    console.log(uploadData.documentDownload)
    return (
        <div className={`w-full p-2`}>
            <h2 className={`text-3xl font-bold mb-5 mt-10 pl-10 lg:pl-0 text-center ${isEditPage ? "block" : "hidden"}`}>
                Cập nhật tài liệu
            </h2>
            <div className={`${isEditPage ? "hidden" : "block"} max-w-[450px] mx-auto`}>
                <p className='text-3xl font-bold mb-5 mt-10'>Đăng tài liệu</p>
                <p className={`text-lg`}>Tài liệu <span className='text-red-500'>*</span></p>
                <p className={`text-red-500 mb-2`}>Lưu ý chỉ hỗ trợ file PDF</p>
                <div className={`${uploadData.document ? "hidden" : "block"}`}>
                    <DragDropFile handleFiles={handleFiles} fileSupport={`application/pdf`}/>
                </div>
            </div>
            <div className={`flex justify-center p-2 ${isEditPage ? "hidden" : "block"}`}>
                {uploadData?.document && (
                    <div className='bg-white p-5 rounded-2xl flex gap-3 max-w-md mt-2'>
                        <Document file={uploadData.document} type={uploadData.document.type}>
                            <div className='max-h-[50px] overflow-hidden'>
                                <Page pageNumber={1} width={40} height={50}/>
                            </div>
                        </Document>
                        <div className={`max-w-md overflow-hidden flex flex-col gap-2`}>
                            <p className='w-full'>{uploadData?.document.name}</p>
                            <p>{(uploadData?.document.size / (1024 * 1024)).toFixed(1)} MB</p>
                        </div>
                        <button
                            onClick={() => resetUploadFiles()}
                            className='text-red-500'>Xóa
                        </button>
                    </div>
                )}
            </div>
            <div
                className={`${haveDownloadFile ? "bg-white rounded-2xl mt-2" : ""} flex flex-col items-center max-w-[450px] mx-auto`}>
                {/*toggle*/}
                <label className="inline-flex items-center cursor-pointer my-3 p-2 h-fit">
                    <input type="checkbox" value="" className="sr-only peer" checked={haveDownloadFile}
                           onChange={(e) => {
                               setHaveDownloadFile(prevState => !prevState)
                           }}/>
                    <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <p className="ml-3 w-[70%] text-gray-900 font-semibold">
                        Tôi muốn file người dùng tải về
                        là file khác (word,
                        powerpoint, excel...)
                    </p>

                </label>
                <div className={`max-w-[450px] p-4`}>
                    {
                        haveDownloadFile && !uploadData.documentDownload && (
                            <div className={`max-w-[450px]`}>
                                <DragDropFile handleFiles={handleFileDownload} fileSupport={`any`}/>
                            </div>
                        )
                    }
                    {
                        uploadData.documentDownload && haveDownloadFile && (
                            <div
                                className={` p-2 overflow-hidden flex flex-wrap justify-between gap-5 rounded-lg border border-gray-300 h-fit`}>
                                <p className={`text-gray-700 font-semibold`}>Tải lên thành công <span
                                    className={`text-gray-900 font-semibold w-[420px]`}>{uploadData.documentDownload.name}</span></p>
                                <button className={`text-white bg-red-400 px-2 py-1 rounded-lg mt-2 w-full`}
                                        onClick={() => resetDownloadFiles()}
                                >
                                    Xóa
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md mt-5">
                <h2 className="text-2xl font-semibold mb-6">Thông tin tài liệu</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Tên tài liệu <span className={`text-red-500`}>*</span>
                        </label>
                        <input type="text" id="name" name="title" placeholder="Báo cáo môn học ..." required
                               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                               onChange={handleChange}
                               value={uploadData.title}
                        />
                    </div>

                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department"
                               className="block mb-2 text-sm font-semibold text-gray-900">Khoa <span
                            className={`text-red-500`}>*</span></label>
                        <select id="department"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={event => {
                                    setSelectedDepartment(event.target.value);
                                    handleListSpecialized(event.target.value);
                                }}
                                value={selectedDepartment}
                        >
                            <option value={-1} className={`${isEditPage ? "hidden" : "block"}`}>Chọn khoa</option>
                            {
                                listDepartment && listDepartment?.map(dep => {
                                    return (
                                        <option value={dep.id}
                                                selected={dep.id === selectedDepartment}
                                                className={`${dep.locked ? "hidden" : "block"}`}
                                                key={dep.id}>{dep.departmentName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department"
                               className="block mb-2 text-sm font-semibold text-gray-900">Ngành <span
                            className={`text-red-500`}>*</span></label>
                        <select id="specialized"
                                name="specialized"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleChange}
                                value={uploadData.specialized}
                        >
                            <option value={-1}>Chọn ngành</option>
                            {
                                listSpecialized && listSpecialized?.map(specialized => {
                                    return (
                                        <option value={specialized.id}
                                                selected={specialized.id === uploadData.specialized}
                                                className={`${specialized.locked ? "hidden" : "block"}`}
                                                key={specialized.id}>{specialized.specializedName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="department" className="block mb-2 text-sm font-semibold text-gray-900">Thể
                            loại <span className={`text-red-500`}>*</span></label>
                        <select id="category"
                                name="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleChange}
                                value={uploadData.category}
                        >
                            <option value={-1}>Chọn thể loại</option>
                            {
                                Array.isArray(listCategory) && listCategory.map(category => (
                                    <option value={category.id}
                                            key={category.id}
                                            selected={category.id === uploadData.category || category.id === uploadData.category}>
                                        {category.categoryName}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="subject"
                               className="block mb-2 text-sm font-semibold text-gray-900">Môn <span
                            className={`text-red-500`}>*</span></label>
                    <select id="subject"
                            name="subject"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleChange}>
                            <option value={null}>Chọn môn</option>
                            {
                                listSubject && listSubject.map(subject => (
                                    <option selected={subject.id === uploadData.subject} value={subject.id} key={subject.id}>{subject.subjectName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="max-w-sm mx-auto mb-3">
                        <label htmlFor="scope"
                               className="block mb-2 text-sm font-semibold text-gray-900">Quyền riêng tư <span
                            className={`text-red-500`}>*</span></label>
                        <select id="scope"
                               name="scope"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={handleChange}
                                value={uploadData.scope}
                        >
                            <option value={-1} >Chọn quyền riêng tư</option>
                            {
                                scopeList.map((scope, index) => (
                                    <option selected={scope.scope === uploadData.scope} key={index} value={scope.scope}>{scope.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="teacher" className="block text-gray-700 text-sm font-bold mb-2">Giáo
                            viên <span className={`text-gray-400`}>(Người đăng tài liệu)</span></label>
                        <input type="text" id="teacher" name="teacher" placeholder="" required
                               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                               disabled
                               value={user?.user_name}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="teacher" className="block text-gray-700 text-sm font-bold mb-2">Tác giả <span
                            className={`text-red-500`}>*</span>
                            <span className={`text-gray-400 block text-xs`}>(Tác giả của tài liệu. vd: Thạc sĩ Nguyễn Văn A, Adam Freeman...)</span>
                        </label>
                        <input type="text" id="teacher" name="author" placeholder="" required
                               onChange={handleChange}
                               value={uploadData.author}
                               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={uploadData.description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setUploadData({...uploadData, description: data})
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
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302
        </div>
      </div>
      <div className={`flex justify-center p-2`}>
        {selectedFile && (
          <div className="bg-white p-5 rounded-2xl flex gap-3 max-w-md mt-2">
            <Document file={selectedFile} type={selectedFile.type}>
              <div className="max-h-[50px] overflow-hidden">
                <Page pageNumber={1} width={40} height={50} />
              </div>
            </Document>
            <div className={`max-w-md overflow-hidden flex flex-col gap-2`}>
              <p className="w-full">{selectedFile?.name}</p>
              <p>{(selectedFile?.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
            <button onClick={() => setFile(null)} className="text-red-500">
              Xóa
            </button>
          </div>
        )}
      </div>
      <div
        className={`${
          haveDownloadFile ? "bg-white rounded-2xl mt-2" : ""
        } flex flex-col items-center max-w-[450px] mx-auto`}
      >
        {/*toggle*/}
        <label className="inline-flex items-center cursor-pointer my-3 p-2">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={haveDownloadFile}
            onChange={(e) => {
              setHaveDownloadFile(e.target.checked);
              setDownloadFile(null);
            }}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <p className="ml-3 w-[70%] text-gray-900 font-semibold">
            Tôi muốn file người dùng tải về là file khác (word, powerpoint,
            excel...)
          </p>
        </label>
        <div className={`p-10 max-w-[450px]`}>
          {haveDownloadFile && !downloadFile && (
            <div className={`${isEditPage ? "hidden" : "block"} max-w-[450px]`}>
              <DragDropFile
                handleFiles={handleFileDownload}
                fileSupport={`any`}
              />
            </div>
          )}
          {downloadFile && haveDownloadFile && (
            <div
              className={`${
                isEditPage ? "hidden" : "block"
              } max-w-[450px] overflow-hidden p-2 flex justify-between gap-5 rounded-2xl border border-gray-300`}
            >
              <p className={`text-gray-700 font-semibold`}>
                Tải lên thành công{" "}
                <span className={`text-gray-900 font-semibold`}>
                  {downloadFile.name}
                </span>
              </p>
              <button
                className={`text-white bg-red-400 px-2 py-1 rounded-lg mt-2`}
                onClick={() => setDownloadFile(null)}
              >
                Xóa
              </button>
            </div>
          )}
        </div>
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
              name="name"
              placeholder="Báo cáo môn học ..."
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
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
                const selectedDepartment = JSON.parse(event.target.value);
                console.log(selectedDepartment);
                setSelectedDepartment(selectedDepartment);
                setListSpecialized(selectedDepartment.specializeds);
              }}
              value={JSON.stringify(selectedDepartment)}
            >
              <option className={`${isEditPage ? "hidden" : "block"}`}>
                Chọn khoa
              </option>
              {departments &&
                departments.map((dep) => {
                  return (
                    <option
                      value={JSON.stringify(dep)}
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
              id="department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setSpecialized(JSON.parse(e.target.value))}
              value={JSON.stringify(specialized)}
            >
              <option>Chọn ngành</option>
              {listSpecialized &&
                listSpecialized?.map((specialized) => {
                  return (
                    <option
                      value={JSON.stringify(specialized)}
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
              id="department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value={null}>Chọn thể loại</option>
              {Array.isArray(listCategory) &&
                listCategory.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.categoryName}
                  </option>
                ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Môn
            </label>
            <select
              id="department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value={null}>Chọn môn</option>
              {Array.isArray(listSubject) &&
                listSubject.map((subject) => (
                  <option value={subject.id} key={subject.id}>
                    {subject.subjectName}
                  </option>
                ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto mb-3">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-semibold text-gray-900"
            >
              Quyền riêng tư <span className={`text-red-500`}>*</span>
            </label>
            <select
              id="department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setScope(e.target.value)}
              value={scope}
            >
              <option value={""}>Chọn quyền riêng tư</option>
              {scopeList.map((scope, index) => (
                <option value={scope.scope} key={index}>
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
              name="teacher"
              placeholder=""
              required
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
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
              data={description}
              onChange={(event, editor) => {
                setDescription(editor.getData());
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
