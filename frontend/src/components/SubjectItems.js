import React, {useContext, useEffect, useState} from "react";
import "./editDocs.css";
import toast from "react-hot-toast";
import {JWTContext} from "../App";

const SubjectItems = ({isActive, dep}) => {
    const [items, setItems] = useState([]);

    const context = useContext(JWTContext);
    const userJWT = context?.token;

    const fetchData = () => {
        fetch(`http://103.241.43.206:8080/api/v1/subjects/specialized/${dep?.id}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    };

    useEffect(() => {
        fetchData();
    }, [dep?.id]);

    function removeSubjectWithId(id) {
        if (window.confirm("Bạn có xác nhận xóa môn học này không?")) {
            fetch(`http://103.241.43.206:8080/api/v1/subjects/specialized/${dep?.id}/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + userJWT
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("Xóa môn học này thành công");
                        fetchData();
                    } else {
                        toast.error("Xóa môn học này thất bại");
                    }
                })
        }
    }

    return (
        <div>
            {isActive && (
                <div className=" mt-2 p-4 bg-gray-100 rounded-md">
                    {
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className="flex justify-between ">
                                    <strong>{index + 1}. {item.subjectName}</strong>
                                    <li className="flex gap-5">
                                        <button
                                            onClick={() => removeSubjectWithId(item.id)}
                                            className=" font-medium text-red-600 hover:underline hover:cursor-pointer"
                                        >
                                            Gỡ
                                        </button>
                                    </li>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            )}
        </div>
    );
    }
;

export default SubjectItems;