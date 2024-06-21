import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import DocumentCard from "./DocumentCard";

const UserDocumentFavorite = () => {
    const token = localStorage.getItem("token");
    let jwt = null;
    if (token !== "undefined" && token !== null) {
        jwt = jwtDecode(token);
    }

    const [document, setDocument] = useState([]);

    useEffect(() => {
        console.log(jwt?.staff_code);
        fetch('http://localhost:8080/api/v1/favorites/' + jwt?.staffCode)
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

export default UserDocumentFavorite;