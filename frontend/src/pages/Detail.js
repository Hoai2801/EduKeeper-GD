import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import './Detail.css'
import { Link } from 'react-router-dom';
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const Detail = () => {
  function extractSlugFromURL(url) {
    // Split the URL by '/'
    const parts = url.split('/');
    // Get the last part of the URL
    const lastPart = parts[parts.length - 1];
    // Return the last part as the slug
    return lastPart;
  }

  const url = window.location.href;
  const slug = extractSlugFromURL(url);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(20);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/documents/" + slug)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
      });
    fetch("http://localhost:8080/api/v1/documents/" + slug + "/file")
      .then((res) => res.blob())
      .then((blob) => {
        console.log(blob)
        setFile(blob)
      });

    const increaseView = setTimeout(() => {
      fetch("http://localhost:8080/api/v1/documents/views/" + data?.id, {
        method: "PUT",
      })
    }, 30000);

    return () => clearTimeout(increaseView);

  }, [slug, data?.id])

  const width = window.innerWidth > 800 ? 800 : window.innerWidth - 80;

  const onButtonClick = () => {

    // Creating new object of PDF file
    const fileURL =
      window.URL.createObjectURL(new Blob([file], { type: data?.document_type }));

    // Setting various property values
    let alink = document.createElement("a");
    alink.href = fileURL;
    alink.download = data?.title;
    alink.click();

    console.log("id: " + data?.id);

    // increase download value of document
    fetch("http://localhost:8080/api/v1/documents/download/" + data?.id, {
      method: "PUT",
    })
  };

  return (
    <div>
      <div className='pt-[50px] md:px-5 px-2'>
        <p className='text-blue-500'><Link to={`/search?category=${data?.category.categorySlug}`}>{data?.category.categoryName}</Link> - <Link to={`/search?specialized=${data?.specialized.specializedSlug}`}>{data?.specialized.specializedName}</Link></p>
        {/* <Link to={`/department/${data?.specialized.departmentID.departmentSlug}`}>{data?.specialized.specializedName}</Link> - */}
        <h2 className='text-[28px] font-bold max-w-[900px]'>{data?.title}</h2>
        <div className='flex justify-between mt-3 md:flex-row flex-col'>
          <div>
            <p>Tác giả: <span className='text-blue-500'>{data?.author.username}</span></p>
            <p>Ngày đăng: {data?.upload_date}</p>
            <p>Trang: {data?.pages}</p>
          </div>
          <div className='flex flex-col gap-5'>
            <button
              onClick={() => onButtonClick()}
              className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4 mt-2'>Tải tài liệu ({data?.document_size} MB)</button>
            <div className='flex gap-5'>
              <p>Lượt xem: {data?.views}</p>
              <p>Lượt tải về: {data?.download}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
          <h3 className='text-[28px] font-bold text-blue-400'>Mô tả</h3>
          <div>
            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          </div>
      </div>
      <div className='mt-10'>
        {/* File pdf render */}
      </div>
        <div className='overflow-y-scroll h-screen rounded-lg mt-5'>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className={'flex flex-col items-center'}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => {
              if (i <= pageNumber) {
                return (
                  <div className='lg:w-full w-fit'>
                    <Page
                      key={i}
                      pageNumber={i + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      // renderMode="svg"
                      width={width}
                      className="mt-3"
                    />
                  </div>
                );
              }
            })
          }
        </Document>
        <div className='w-full h-[100px] flex justify-center align-middle mt-8'>
          <button onClick={() => setPageNumber(pageNumber + 10)} className='bg-blue-500 text-white px-10 py-3 h-fit rounded-lg'>Xem thêm</button>
        </div>
      </div>
      {/* </DocumentViewer> */}
      
    </div>
  );
}


export default Detail