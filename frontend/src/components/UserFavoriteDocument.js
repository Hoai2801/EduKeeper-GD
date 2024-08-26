import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import DocumentCard from "./DocumentCard";
import {useParams} from "react-router-dom";

const UserFavoriteDocument = ({isTrueLegit, jwt}) => {
    // const token = localStorage.getItem("token");
    // let jwt = null;
    // if (token !== "undefined" && token !== null) {
    //     jwt = jwtDecode(token);
    // }
    const location = useParams();

    const [documentList, setDocumentList] = useState([]);

    useEffect(() => {
            fetch("http://localhost:8080/api/v1/favorites/" + location.valueOf("staff_code").staff_code)
                .then((res) => res.json())
                .then((data) => {
                    setDocumentList(data)
                });
    }, [])
    return (
        <div>
            <h2 className={`text-3xl font-semibold mb-5`}>Danh sách tài liệu ưu thích</h2>
            {documentList?.length === 0 && <p className={`text-xl font-semibold mb-5 text-gray-500`}>Không có tài liệu nào được thích</p>}
            <div className={`flex flex-wrap gap-5`}>
                {documentList?.map((item, index) => (
                    <DocumentCard key={index} document={item}/>
                ))}
            </div>
        </div>
    );
};

export default UserFavoriteDocument;
