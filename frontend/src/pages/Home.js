import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { JWTContext } from "../App";
import ListDocuments from "../components/homepages/ListDocuments";
const Home = () => {
  const [mostViewed, setMostViewed] = useState([]);

  const [mostDownloaded, setMostDownloaded] = useState([]);

  const [lastedDocuments, setLastedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(JWTContext);
  const staffCode = context?.user?.staff_code;

  useEffect(() => {
    setIsLoading(true);

    const fetchMostViewed = fetch(
      "http://103.241.43.206:8080/api/v1/view-history/top-documents/12",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res?.json())
      .then((data) => setMostViewed(data));

    const fetchMostDownloaded = fetch(
      "http://103.241.43.206:8080/api/v1/documents/most-downloaded?limit=12",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res?.json())
      .then((data) => setMostDownloaded(data));

    const fetchLastedDocuments = fetch(
      "http://103.241.43.206:8080/api/v1/documents/latest?limit=12",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((res) => res?.json())
      .then((data) => {
          setLastedDocuments(data)
      });
    Promise.all([fetchMostViewed, fetchMostDownloaded, fetchLastedDocuments])
      .then(() => setIsLoading(false)) // Stop loading after all requests are done
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Stop loading even if there’s an error
      });
  }, []);

  return (
    <div className="w-screen h-full">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className={`w-full h-fit relative`}>
            <Banner />
          </div>
          <div className="p-2 w-full pt-5 mt-10 flex flex-col md:p-10 gap-10 pb-10">
            <h2 className="font-bold text-[28px]">Tài liệu mới</h2>
            {lastedDocuments && (
              <ListDocuments
                listDocuments={lastedDocuments}
                maximumElements={12}
                staffCode={staffCode}
              />
            )}
              <h2 className="font-bold text-[28px]">
                Tải nhiều nhất tháng này
              </h2>
              {mostDownloaded && (
                <ListDocuments
                  listDocuments={mostDownloaded}
                  maximumElements={12}
                  staffCode={staffCode}
                />
              )}
              <h2 className="font-bold text-[28px]">
                Xem nhiều nhất tháng này
              </h2>
                {mostViewed && (
                  <ListDocuments
                    listDocuments={mostViewed}
                    maximumElements={12}
                    staffCode={staffCode}
                  />
                )}
            {/*<div className="flex justify-end mt-5">*/}
            {/*  <Link*/}
            {/*    to={`/search?order=mostViewed&searchTerm=`}*/}
            {/*    className="text-blue-500 underline underline-offset-2 hover:cursor-pointer hover:opacity-70  p-4"*/}
            {/*  >*/}
            {/*    Xem thêm*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
