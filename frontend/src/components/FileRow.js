import React, { useEffect, useState } from 'react'
import pdfIcon from '../assets/pdf-icon.jpg'
import wordicon from '../assets/word.png'
const FileRow = () => {
    const [document, setDocument] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/document/lasted?limit=10")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDocument(data)
            });
    }, []);
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg border">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Tài liệu
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Giáo viên
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Mã giáo viên
                        </th>
                        {/* <th scope="col" class="px-6 py-3">
                            Ngày đăng
                        </th> */}
                        <th scope="col" class="px-6 py-3">
                            Ngành
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Thể loại
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ngày đăng
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {document && document?.map((document) => (
                        <tr class="bg-white border-b  hover:bg-gray-50 0">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-3 text-center">
                                {document.document_type === "application/pdf" ? <img src={pdfIcon} alt="" className='w-10 h-10' /> : <img src={wordicon} alt="" className='w-10 h-10' />}
                                <p className='text-lg mt-2'>{document.title}</p>
                            </th>
                            <td class="px-6 py-4">
                                {document.author.username}
                            </td>
                            <td class="px-6 py-4">
                                {document.author.staffCode}
                            </td>
                            <td class="px-6 py-4">
                                {document.specialized.specializedName}
                            </td>
                            <td class="px-6 py-4">
                                {document.category.categoryName}
                            </td>
                            <td class="px-6 py-4">
                                {document.upload_date}
                            </td>
                            {/* <td class="px-6 py-4">
                                $2999
                            </td> */}
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}

export default FileRow