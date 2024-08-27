import Post from "../DocumentCard";
import Pagination from "../Pagination";
import React, { useEffect, useState } from "react";

export default function ListDocuments({
  listDocuments,
  maximumElements,
  staffCode,
}) {
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    setTotalPage(Math.ceil(listDocuments.length / maximumElements));
  }, [listDocuments]);

  return (
    <div>
      {listDocuments.length > 0 ? (
        <div className="lg:ml-5 flex gap-y-4 gap-x-8 overflow-auto flex-wrap justify-start">
          {listDocuments.map((item, index) => (
            <div
              key={index}
              className={`${
                (item.scope === "private" && !staffCode) ||
                item.status !== "published"
                  ? "hidden"
                  : item.scope === "student-only" && !staffCode
                  ? "hidden"
                  : "block"
              }`}
            >
              <Post document={item} />
            </div>
          ))}
          {totalPage > 1 && <Pagination totalPage={totalPage} />}
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-xl font-bold text-gray-500">
            Hiện tại chưa có tài liệu nào phù hợp vui lòng tham khảo các mục
            khác.
          </p>
        </div>
      )}
    </div>
  );
}
