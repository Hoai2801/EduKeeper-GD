import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DocumentCardRow from "../components/DocsCardRow";
const Search = ({ jwt }) => {
  const url = window.location.href;
  const [searchParams] = useSearchParams();

  // lasted, most download or most views
  const order = searchParams.get("order");
  const slugSpecialized = searchParams.get("specialized");
  const slugDepartment = searchParams.get("department");
  const slugSubject = searchParams.get("subject");
  const publishYear = searchParams.get("publishYear");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const [documents, setDocument] = useState([]);
  const [documentsShow, setDocumentShow] = useState([]);

  const [search] = localStorage.getItem("search") || "";

  useEffect(() => {
    const dataSearch = {
      searchTerm: search || "",
      subjectName: slugSubject || "",
      categoryName: category || "",
      departmentSlug: slugDepartment || "",
      specializedSlug: slugSpecialized || "",
      publishYear: publishYear || "",
      order: order,
    };

    const api = "http://103.241.43.206:8080/api/v1/documents/filter";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSearch),
    }).then((res) => {
      if (!res.ok) {
        setDocument([]);
      }
      return res.json().then((data) => {
        if (data) {
          setDocument(data);
          setDocumentShow(data);
          setTimeout(() => {
            localStorage.removeItem("search");
          }, 3000);
        }
      });
    });
  }, [url, order, slugSpecialized, slugSubject, publishYear, category]);

  useEffect(() => {
    if (sort) {
      const sortedDocuments = [...documents].sort((a, b) => {
        return b[sort] - a[sort];
      });
      setDocumentShow(sortedDocuments);
    }
  }, [sort, documents]);

  const [limit, setLimit] = useState(10);
  return (
    <div className="w-full pr-10">
      {/* <h2 className="text-[28px] font-bold text-center mt- mb-5">
        Tài liệu ({documents && documents.length})
      </h2> */}
      <div className="my-5 flex gap-5 h-fit flex-wrap justify-center">
        {documents &&
          documentsShow.map((item, index) => {
            if (index < limit) {
              return <DocumentCardRow key={index} document={item} />;
            }
          })}
      </div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => setLimit(limit + 30)}
          className={`text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4 ${
            documents.length <= limit ? "hidden" : ""
          }`}
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default Search;
