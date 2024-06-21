import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import DocumentCard from "./DocumentCard";

const MyComponent = () => {
    const token = localStorage.getItem("token");
    let jwt = null;
    if (token !== "undefined" && token !== null) {
        jwt = jwtDecode(token);
    }

    const [documentList, setDocumentList] = useState([]);

    useEffect(() => {
        if (jwt) {
            fetch("http://localhost:8080/api/v1/favorites/" + jwt?.staff_code)
                .then((res) => res.json())
                .then((data) => {
                    setDocumentList(data)
                });
        }
    }, [])
    return (
        <div>
            {documentList?.map((item, index) => (
                <DocumentCard key={index} document={item} />
            ))}
        </div>
    );
};

export default MyComponent;
