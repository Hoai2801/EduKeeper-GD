import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import download from '../assets/download.png';
import DocumentCard from "./DocumentCard";
const UserPostUpload = () => {
    const token = localStorage.getItem("token");
    let jwt = null;
    if (token !== "undefined" && token !== null) {
        jwt = jwtDecode(token);
    }

    const [document, setDocument] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080' +
            '/api/v1/documents/author/' + jwt?.staffCode)
            .then((res) => res.json())
            .then((data) => {
                setDocument(data);
            })
    }, []);
    return (
        <div>
            {document?.map((item) => (
                <DocumentCard document={item} key={item.id}/>
            ))}
        </div>
    );
};

export default UserPostUpload;