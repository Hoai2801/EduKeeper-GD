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
            fetch("http://localhost:8080/api/v1/documents/author/" + jwt?.staff_code)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setDocumentList(data);
                });
        }
    }, [])
    return (
        <div className={`flex gap-5 justify-center flex-wrap`}>
            {documentList?.map((item, index) => (
                <div className={`relative`}>
                    <div className={`absolute top-0 right-0 rounded-lg p-2 m-4 text-white ${item.status === "Draft" ? "hidden" : "bg-red-500"}`}>
                        Chưa duyệt
                    </div>
                <DocumentCard key={index} document={item} />
                    <div className={`absolute bottom-0 right-0 rounded-lg p-2 m-4 text-white ${item.scope !== "public" ? 
                                                                                                    item.scope === "private" ? "bg-gray-500" :  
                                                                                                        // only for student
                                                                                                        "bg-amber-200" 
                                                                                                : "bg-green-500"}`}>
                        {item.scope}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyComponent;
