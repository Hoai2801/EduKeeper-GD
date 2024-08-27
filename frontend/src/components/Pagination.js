import React, { useContext, useEffect, useState } from "react";
import usePagination from "../hook/usePagination";
import { toast } from "react-hot-toast";
export default function Pagination({ totalPage }) {
  const [activePage, setActivePage] = useState(1);
  const pagination = usePagination(totalPage, activePage, 1);
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
  return (
    <div className="mt-2 flex w-full justify-start py-2 ">
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
            {totalPage > 1 ? (
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
                        //   SetDocumentsToRender();
                      }}
                      className={` flex  items-center cursor-pointer ${
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
  );
}
