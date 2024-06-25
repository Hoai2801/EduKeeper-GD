import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import DocumentCard from "./DocumentCard";
import edit from '../assets/edit-246.png';
import {Link, useParams} from "react-router-dom";

const UserUploadDocument = () => {
    const [jwt, setJwt] = useState(null);
    const location = useParams();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== "undefined" && token !== null) {
            setJwt(jwtDecode(token));
        }
    }, []);

    const [documentList, setDocumentList] = useState([]);
    if (jwt) {
        if (location.valueOf("staff_code").staff_code !== jwt?.staff_code) {
            window.location.href = `/profile/${jwt?.staff_code}/document/upload`;
        }
    } else {
       
    }
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/documents/author/" + location.valueOf("staff_code").staff_code)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDocumentList(data);
            });
    }, [location])
    return (
        <div className={`flex gap-5 justify-center flex-wrap`}>
            {documentList?.map((item, index) => (
                <div className={`relative`}>
                    <div
                        className={`absolute top-0 right-0 rounded-lg p-2 m-4 text-white ${item.status !== "Draft" ? "hidden" : "bg-red-500"}`}>
                        Chưa duyệt
                    </div>
                    <DocumentCard key={index} document={item}/>
                    <div
                        className={`absolute bottom-[20%] right-0 rounded-lg p-2 m-4 text-white w-10 h-10 overflow-hidden cursor-pointer`}>
                        <Link to={`/edit/${item.slug}`}>
                            <img src={edit} alt="" className={`w-full h-full`}/>
                        </Link>
                    </div>
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

export default UserUploadDocument;
