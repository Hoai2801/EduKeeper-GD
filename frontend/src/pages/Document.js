import "./dashboard.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostDocs from "../components/PostDocs";
import { toast } from "react-hot-toast";
import { useHandleDetailDocs } from "../components/HandleEvent";
import DocumentDeleter from "../hook/useDeleteDocs";
import EditDocs from "../components/PostDocs";
import usePagination from "../hook/usePagination";
import EditDocument from "../components/EditDocument";
export default function Document(params) {
  const navigation = useNavigate();
  const [isPostDocs, setIsPostDocs] = useState(false);
  const [isShowEditDocs, setIsShowEditDocs] = useState(false);
  const [documentEdit, setDocumentEdit] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [countDocuments, setCountDocuments] = useState(0);
  // Variable docs use render
  const [docs, setDocs] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // Set docs by status
  const draftDocument =
      documents.filter((document) => document.status === "draft") || [];
  const publishedDocument =
      documents.filter((document) => document.status === "published") || [];

  const totalPage = Math.round(90 / 10);
  const pagination = usePagination(totalPage, activePage, 1);

  const handleEditDocument = (document) => {
    setIsShowEditDocs(true);
    setDocumentEdit(document);
  };

  const handleDisplayPostDocs = () => {
    setIsPostDocs(true);
  };
  const handleHiddenPostDocs = () => {
    setIsPostDocs(false);
  };
  const handleAccpetDocs = () => {
    navigation("/dashboard/accept");
  };
  const handleDetailDocs = useHandleDetailDocs();

  const prev = () => {
    if (activePage == 1) {
      toast.error("Đã ở trang đầu");
    } else {
      const newPage = activePage - 1;
      setActivePage(newPage);
    }
  };

  const next = () => {
    if (activePage >= totalPage) {
      toast.error("Đã ở trang cuối");
    } else {
      const newPage = activePage + 1;
      setActivePage(newPage);
    }
  };

  const hanldeDisplayDrafDocs = () => {
    setActiveButton(3);
    setDocs(draftDocument);
  };

  const hanldeDisplayPublishedDocs = () => {
    setActiveButton(2);
    setDocs(publishedDocument);
  };

  const hanldeDisplayDocs = () => {
    setActiveButton(1);
    setDocs(documents);
  };

  const handleFillDocs = () => {
    // Function to compare titles case-insensitively
    const compareTitlesA_Z = (a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    };

    const compareTitlesZ_A = (a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    };

    // Check if docs array is already sorted
    const isSorted = docs.every((document, index, array) => {
      return index === 0 || compareTitlesA_Z(array[index - 1], document) <= 0;
    });

    if (isSorted) {
      const sortedDocuments = [...docs].sort(compareTitlesZ_A);
      setDocs(sortedDocuments);
      toast.success("Documents sorted by title Z-A");
    } else {
      const sortedDocuments = [...docs].sort(compareTitlesA_Z);
      setDocs(sortedDocuments);
      toast.success("Documents sorted by title A-Z");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/documents/page/${activePage}`)
        .then((res) => res.json())
        .then((data) => {
          setDocuments(data);
          setDocs(data);
        });

    navigation(`/dashboard/document/${activePage}`);
  }, [activePage]);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/documents/count`)
        .then((res) => res.json())
        .then((data) => {
          setCountDocuments(data);
        });
  }, []);

  return (
      <div className="  py-4">
        <div className="mx-4  mt-2">
          <div className="flex justify-between">
            <div className="flex  gap-x-2">
              <button
                  onClick={hanldeDisplayDocs}
                  className={`px-3 h-9 rounded-3xl border-solid border border-gray-500 text-gray-500 text-sm font-medium ${
                      activeButton == 1 ? "active-check" : ""
                  }`}
                  type="button"
              >
                <span>All documents({countDocuments})</span>
              </button>
              <button
                  onClick={hanldeDisplayPublishedDocs}
                  className={`px-3 h-9 rounded-3xl border-solid border border-gray-500 text-gray-500 text-sm font-medium ${
                      activeButton === 2 ? "active-check" : ""
                  }`}
                  type="submit"
              >
              <span>
                Published document(
                {
                  documents.filter(
                      (document) => document.status === "published"
                  ).length
                }
                )
              </span>
              </button>
              <button
                  onClick={hanldeDisplayDrafDocs}
                  className={`px-3 h-9 rounded-3xl border-solid border border-gray-500 text-gray-500 text-sm font-medium ${
                      activeButton === 3 ? "active-check" : ""
                  }`}
                  type="submit"
              >
              <span>
                Draft document (
                {
                  documents.filter((document) => document.status === "draft")
                      .length
                }
                )
              </span>
              </button>
            </div>
            <div className="flex gap-2">
              <button
                  onClick={handleDisplayPostDocs}
                  className="px-4 py-2 rounded-lg border-solid	bg-blue-500 text-white text-sm font-medium"
                  type="submit"
              >
                <span>Thêm tài liệu</span>
              </button>
              <button
                  onClick={handleAccpetDocs}
                  className="px-4 py-2 rounded-lg border-solid	bg-blue-500 text-white text-sm font-medium"
                  type="submit"
              >
                <span>Duyệt tài liệu</span>
              </button>
              <button
                  onClick={handleFillDocs}
                  className=" p-2 w-20 rounded-lg border-solid flex border border-gray-500 text-gray-500 text-sm"
                  type="submit"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512 "
                    className="w-8 h-6 "
                    fill="currentColor"
                    aria-hidden="true"
                >
                  <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
                </svg>{" "}
                <span>Filter</span>
              </button>
            </div>
          </div>
          <div className="mt-4  ">
            <div class="relative overflow-x-auto border rounded-xl shadow-md sm:rounded-lg">
              {documents && (
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Type
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Author
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" class="px-6 py-3">
                        CreateAt
                      </th>
                      <th scope="col" class="px-6 py-3"></th>
                    </tr>
                    </thead>
                    {docs.map((document, index) => {
                      return (
                          <tbody>
                          <tr
                              key={index}
                              class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 overflow-visible 	 dark:text-white"
                            >
                              {document.title}
                            </th>
                            <td class="px-6 py-4">{document.document_type}</td>
                            <td class="px-6 py-4 ">
                              {" "}
                              {document.user_upload.username}{" "}
                            </td>
                            <td class="px-6 py-4 capitalize">
                              {" "}
                              {document.status}{" "}
                            </td>
                            <td class="px-6 py-4 ">
                              {" "}
                              {document.category.categoryName}{" "}
                            </td>
                            <td class="px-6 py-4"> {document.upload_date} </td>
                            <td class=" px-6 py-4  ">
                              <a
                                  onClick={() => handleDetailDocs(document.slug)}
                                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer "
                              >
                                Detail
                              </a>
                              <a
                                  onClick={() => handleEditDocument(document)}
                                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline  ms-3 hover:cursor-pointer"
                              >
                                Edit
                              </a>
                              <a
                                  onClick={() => {
                                    DocumentDeleter(document.id);
                                  }}
                                  class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 hover:cursor-pointer"
                              >
                                Remove
                              </a>
                            </td>
                          </tr>
                          </tbody>
                      );
                    })}
                    {isShowEditDocs && (
                        <EditDocument
                            isShowEdit={isShowEditDocs}
                            setIsShowEdit={setIsShowEditDocs}
                            documentEdit={documentEdit}
                        />
                    )}
                    ;
                  </table>
              )}
            </div>

            <div className="mt-2 flex w-full justify-end py-2 ">
              {
                <nav>
                  <ul className="list-style-none flex">
                    <li onClick={prev}>
                      <div
                          href="#"
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512 "
                            fill="currentColor"
                            aria-hidden="true"
                            className="text-gray-400 min-w-4  max-h-4 "
                        >
                          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>{" "}
                      </div>
                    </li>
                    {totalPage > 0 ? (
                        pagination?.map((el, index) => {
                          return (
                              <li>
                                <div
                                    onClick={() => {
                                      if (el === "...") {
                                        toast.error("error");
                                      } else {
                                        setActivePage(el);
                                      }
                                    }}
                                    href="http://localhost:3000/dashboard/document/1"
                                    className={` flex  items-center ${
                                        activePage == el ? "active-check" : ""
                                    } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                                >
                                  {el}
                                </div>
                              </li>
                          );
                        })
                    ) : (
                        <li>
                          <div
                              href="http://localhost:3000/dashboard/document/1"
                              className={` flex  items-center ${
                                  activePage == 1 ? "active-check" : ""
                              } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                          >
                            1
                          </div>
                        </li>
                    )}
                    {/* <li>
                  <div
                    href="http://localhost:3000/dashboard/document/1"
                    className={` flex  items-center ${
                      activePage == 1 ? "active-check" : ""
                    } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                  >
                    1
                  </div>
                </li>
                <li>
                  <div
                    href="http://localhost:3000/dashboard/document/2"
                    className={` flex  items-center ${
                      activePage == 2 ? "active-check" : ""
                    } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                  >
                    2
                  </div>
                </li>
                <li>
                  <a
                    href=""
                    className={` flex  items-center ${
                      activePage == 3 ? "active-check" : ""
                    } justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
                  >
                    3
                  </a>
                </li> */}
                    <li onClick={next}>
                      <div
                          href="#"
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512 "
                            fill="currentColor"
                            aria-hidden="true"
                            className="text-gray-400 min-w-4  max-h-4 "
                        >
                          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                        </svg>{" "}
                      </div>
                    </li>
                  </ul>
                </nav>
              }
            </div>
          </div>
          {isPostDocs && <PostDocs onClose={handleHiddenPostDocs} />}
        </div>
      </div>
  );
}