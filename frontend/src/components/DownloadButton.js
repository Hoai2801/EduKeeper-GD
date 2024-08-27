import React from 'react';

const DownloadButton = ({documentId, fileName, fileDownload, type, staffCode}) => {

    const downloadClick = () => {
        const nameOfDocument = fileName;
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(new Blob([fileDownload], {
            type: type || 'application/pdf',
        }));

        // increase download value of document
        fetch("http://localhost:8080/api/v1/downloads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                documentId: documentId,
                staffCode: staffCode
            }),
        }).then((data) => {
            if (data.status === 200) {

                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = nameOfDocument
                alink.click();
            }
        }).catch((error) => {
            console.error('Error fetching favorite status:', error);
        })
    };
    return (
        <div>
            <button
                onClick={() => downloadClick()}
                className='w-full text-white bg-blue-500 hover:bg-blue-300 rounded-md h-20 leading-[50px] font-semibold p-4 mt-2 text-center cursor-pointer'>Tải
                tài liệu
                ({Math.round(fileDownload?.size / 1024 / 1024) < 1 ? "Nhỏ hơn 1" : Math.round(fileDownload?.size / 1024 / 1024)} MB)
            </button>
        </div>
    );
};

export default DownloadButton;
