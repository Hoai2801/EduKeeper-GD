import React, { useEffect, useState } from "react";

export default function AcceptDocs(params) {
  const [documents, setDocuments] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const prev = () => {
    if (activePage == 1) {
      alert("ko the prev nua");
    } else {
      const newPage = activePage - 1;
      setActivePage(newPage);
    }
  };
  const [checkedDocuments, setCheckedDocuments] = useState([]);

  const handleCheckboxChange = (index) => {
    if (checkedDocuments.includes(index)) {
      setCheckedDocuments(checkedDocuments.filter((item) => item !== index));
    } else {
      setCheckedDocuments([...checkedDocuments, index]);
    }
  };

  const handleAccpet = () => {
    if (checkedDocuments.length === 0) {
      alert("Duyet thai bai ban khong co chon tia lieu nao");
    } else {
      alert("Duyet thanh cong" + checkedDocuments);
    }
  };
  const next = () => {
    if (activePage == 3) {
      alert("ko the prev nua");
    } else {
      const newPage = activePage + 1;
      setActivePage(newPage);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/documents/draft`)
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
      });
  }, []);
  return (
    <div>
      <div className="text-center text-gray-500 text-2xl font-bold">
        Danh sach tai lieu chua duyet
      </div>
      <div className="mt-4  ">
        <div class="relative overflow-x-auto border rounded-xl shadow-md sm:rounded-lg">
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
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {documents &&
                documents.map((document, index) => {
                  return (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {document.title}
                      </th>
                      <td class="px-6 py-4">{document.document_type}</td>
                      <td class="px-6 py-4 min-w-32"> {document.author} </td>
                      <td class="px-6 py-4 capitalize">{document.status}</td>
                      <td class="px-6 py-4">
                        {" "}
                        {document.category.categoryName}{" "}
                      </td>
                      <td class="px-6 py-4 min-w-32">
                        {" "}
                        {document.upload_date}{" "}
                      </td>
                      <td class=" px-6 py-4 flex items-center  gap-3 ">
                        <input
                          className=" w-4 h-4"
                          type="checkbox"
                          onChange={() => handleCheckboxChange(document.id)}
                          checked={checkedDocuments.includes(document.id)}
                        />
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Detail
                        </a>
                        <a
                          href="#"
                          class="font-medium text-red-600 dark:text-red-500 hover:underline "
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="flex mt-2 justify-end ">
          <button
            onClick={handleAccpet}
            className="px-4 pt-2 bg-blue-400 rounded-lg hover:cursor-pointer"
          >
            Dueyt
          </button>
        </div>
        <div className="mt-2 flex w-full justify-end py-2 ">
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
              </li>
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
        </div>
      </div>
    </div>
  );
}
