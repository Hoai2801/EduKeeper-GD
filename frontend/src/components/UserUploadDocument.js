import React, {useContext, useEffect, useState} from 'react';
import DocumentCard from "./DocumentCard";
import edit from '../assets/edit-246.png';
import {Link, useParams} from "react-router-dom";
import {JWTContext} from "../App";

const UserUploadDocument = () => {
    const context = useContext(JWTContext);
    const location = useParams();
    const [documentList, setDocumentList] = useState([]);

    // if user login, check if user is the same

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/documents/author/" + location.valueOf("staff_code").staff_code)
            .then((res) => res.json())
            .then((data) => {
                setDocumentList(data);
            });
    }, [location])
    return (
        <div>
            <h2 className={`text-3xl font-semibold `}>Tài liệu đã đăng</h2>
            <div className={`flex flex-wrap gap-5 mt-5`}>
                {documentList.length === 0 ?
                    <p className={`text-xl font-semibold mb-5 text-gray-500`}>
                        Không có tài liệu nào được đăng </p> : null}
                {documentList?.map((item, index) => {
                    return (
                        // if document is soft deleted, hidden it
                        <div className={`relative ${item._delete ? "hidden" : ""} 
                            ${item.status === "draft" && item.user_upload.staffCode !== context?.user?.staff_code ? "hidden" : ""}
                            ${item.scope === "private" && item.user_upload.staffCode !== context?.user?.staff_code ? "hidden" : ""}
                            ${item.scope === "student-only" && !context?.user?.staff_code ? "hidden" : ""}
                            `}
                        >
                            <div
                                className={`absolute top-0 right-0 rounded-lg p-2 m-4 text-white ${item.status !== "draft" ? "hidden" : "bg-red-500"}`}>
                                Chưa duyệt
                            </div>
                            <DocumentCard key={index} document={item}/>
                            <div
                                className={`absolute bottom-[10%] right-0 px-5 py-2 rounded-3xl m-4 w-fit bg-gray-500 text-white h-10 overflow-hidden cursor-pointer
                                ${context?.user?.staff_code === item.user_upload.staffCode ? "block" : "hidden"}
                            `}>
                                <Link to={`/edit/${item.slug}`}
                                >
                                    {/*<img src={edit} alt="" className={`w-full h-full`}/>*/}
                                    Sửa
                                </Link>
                            </div>
                            {/*<div*/}
                            {/*    className={`absolute bottom-0 right-0 rounded-lg p-2 m-4 text-white */}
                            {/*${item.user_upload.staffCode !== context?.user?.staff_code ? "hidden" : ""}*/}
                            {/*${item.scope !== "public" ?*/}
                            {/*        item.scope === "private" ? "bg-gray-500" :*/}
                            {/*            // only for student*/}
                            {/*            "bg-amber-200"*/}
                            {/*        : "bg-green-500"}`}>*/}
                            {/*    {item.scope}*/}
                            {/*</div>*/}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default UserUploadDocument;
