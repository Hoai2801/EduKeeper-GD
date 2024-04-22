import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import './Detail.css'
import { Link, useParams } from 'react-router-dom';

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
  console.log(slug)
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(20);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/document/" + slug)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      });
    fetch("http://localhost:8080/api/v1/document/" + slug + "/file")
      .then((res) => res.blob())
      .then((blob) => {
        setFile(blob)
      });

    const increaseView = setTimeout(() => {
      fetch("http://localhost:8080/api/v1/document/increase-view/" + data?.id)
    }, 30000);

    return () => clearTimeout(increaseView);

  }, [slug, data?.id])

  const width = window.innerWidth > 800 ? 800 : window.innerWidth - 80;

  const onButtonClick = () => {

    // Creating new object of PDF file
    const fileURL =
      window.URL.createObjectURL(new Blob([file], { type: "application/pdf" }));

    // Setting various property values
    let alink = document.createElement("a");
    alink.href = fileURL;
    alink.download = data?.title;
    alink.click();

    // increase download value of document
    fetch("http://localhost:8080/api/v1/document/increase-download/" + data?.id)
  };

  return (
    <div>
      <div className='pt-[50px]'>
        <p className='text-blue-500'><Link to={`/category/${data?.category.slug}`}>{data?.category.categoryName}</Link> - <Link to={`/specialized/${data?.specialized.specializedSlug}`}>{data?.specialized.specializedName}</Link></p>
        {/* <Link to={`/department/${data?.specialized.departmentID.departmentSlug}`}>{data?.specialized.specializedName}</Link> - */}
        <h2 className='text-[28px] font-bold max-w-[900px] text-justify'>{data?.title}</h2>
        <div className='flex justify-between mt-3'>
          <div>
            <p>Tác giả: <span className='text-blue-500'>{data?.author}</span></p>
            <p>Ngày đăng: {data?.upload_date}</p>
            <p>Trang: {data?.pages}</p>
          </div>
          <div className='flex flex-col gap-5'>
            <button
              onClick={() => onButtonClick()}
              className='text-white bg-blue-500 hover:bg-blue-300 rounded-md p-4'>Tải tài liệu</button>
            <div className='flex gap-5'>

              <p>Lượt xem: {data?.views}</p>
              <p>Lượt tải về: {data?.download}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='overflow-y-scroll h-screen rounded-lg mt-5'>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className={'flex flex-col items-center'}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => {
              if (i <= pageNumber) {
                return (
                  <div className='lg:w-full w-[80%]'>

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
    </div>
  );
}


export default Detail