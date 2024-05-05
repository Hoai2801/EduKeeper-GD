import React, { useEffect, useState } from 'react'
import pdfIcon from '../assets/pdf-icon.jpg'
import wordicon from '../assets/word.png'
import { Link } from 'react-router-dom';
const FileRow = ({ limit, title, editDocument }) => {
    const [document, setDocument] = useState([]);

    const [change, setChange] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/documents/latest?limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDocument(data)
            });
    }, [limit, change]);


    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/v1/documents/${id}`, {
            method: 'DELETE',
        }).then(() => {
            console.log("Deleted")
            setChange(change + 1)

        })
    }

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg border">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tài liệu
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Giáo viên
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mã giáo viên
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngành
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thể loại
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày đăng
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    {document && document.map((document) => {
                        if (document.title.toLowerCase().includes(title?.toLowerCase()) || title == null) {
                            return (
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <td className="px-6 py-4 whitespace-nowrap">{document.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/document/${document.slug}`} key={document.id}>
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    {document.document_type === "application/pdf" ? (
                                                        <img src={pdfIcon} alt="PDF" className="w-10 h-10" />
                                                    ) : (
                                                        <img src={wordicon} alt="Word" className="w-10 h-10" />
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-lg font-medium text-gray-900 max-w-[300px] overflow-hidden">{document.title}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{document.author.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{document.author.staffCode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{document.specialized.specializedName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{document.category.categoryName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{document.upload_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right flex gap-3">
                                        <button onClick={() => editDocument(document)} className="text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(document.id)} className="text-blue-600 hover:underline">Remove</button>
                                    </td>
                                </tbody>

                            )

                        }
                    })}
                </table>
            </table >
        </div >

    )
}

export default FileRow