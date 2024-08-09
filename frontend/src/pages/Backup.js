import React, {useContext, useEffect, useState} from 'react';
import toast from "react-hot-toast";
import {JWTContext} from "../App";
import sql from '../assets/sql.png';
import zip from '../assets/zip.png';

const Backup = () => {
    const [listBackup, setListBackup] = useState([]);

    const context = useContext(JWTContext);
    const jwt = context?.token;
    const user = context?.jwtDecoded;

    const fetchBackup = () => {
        fetch('http://localhost:8080/api/v1/backups/list-backups')
            .then((res) => res.json())
            .then((data) => {
                setListBackup(data);
            })
    };

    useEffect(() => {
        fetchBackup();
    }, []);

    const createBackup = () => {
        fetch('http://localhost:8080/api/v1/backups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Tạo bản backup thành công")
                    fetchBackup();
                } else {
                    toast.error("Tạo bản backup thất bại")
                }
            })
    };

    const image = (item) => {
        if (item.endsWith('.sql')) {
            return <img src={sql} alt="" className={`w-10 h-10`}/>
        } else {
            return <img src={zip} alt="" className={`w-10 h-10`}/>
        }
    }

    const deleteBackup = (name) => {
        fetch('http://localhost:8080/api/v1/backups/' + name, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Xóa bản backup thành công")
                    fetchBackup();
                } else {
                    toast.error("Xóa bản backup thất báo")
                }
            })
    }

    const downloadBackup = (name) => {
        console.log(name);
        fetch('http://localhost:8080/api/v1/backups/download-backup/' + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then((res) => {
                if (res.ok) {
                    // Convert the response to a Blob
                    return res.blob();
                } else {
                    throw new Error('Tải bản backup thất bại');
                }
            })
            .then((blob) => {
                // Create a URL for the Blob and trigger the download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = name; // Set the file name for the download
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                toast.success("Tải bản backup thành công");
                fetchBackup();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };


    const restoreBackup = (name) => {
        if (name.endsWith('.sql')) {
            fetch('http://localhost:8080/api/v1/backups/restore-database/' + name, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            })
                .then((res) => {
                    if (res.ok) {
                        toast.success("Tải bản backup thành công")
                        fetchBackup();
                    } else {
                        toast.error("Tải bản backup thất báo")
                    }
                })
        } else {

            fetch('http://localhost:8080/api/v1/backups/restore-backup/' + name, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            })
                .then((res) => {
                    if (res.ok) {
                        toast.success("Tải bản backup thành công")
                        fetchBackup();
                    } else {
                        toast.error("Tải bản backup thất báo")
                    }
                })
        }
    }
    return (
        <div>
            <div className={`p-5 w-full flex justify-center gap-10`}>
                <button className={`bg-blue-600 text-white p-5 rounded-lg`} onClick={createBackup}>
                    Tạo backup
                </button>
            </div>
            <div className={`flex flex-col gap-5`}>

                {listBackup?.map((item) => (
                    <div className={`p-5 border border-gray-300 rounded-lg flex gap-5 lg:flex-row flex-col`}>
                        <div>
                            {image(item)}
                            <p className={`mt-2`}>{item}</p>
                        </div>
                        <div className={`flex gap-5`}>
                            <button onClick={() => deleteBackup(item)} className={`text-red-600`}>
                                Xóa
                            </button>
                            <button onClick={() => restoreBackup(item)}>
                                Khôi phục
                            </button>
                            <button onClick={() => downloadBackup(item)}>
                                Tải
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Backup;
