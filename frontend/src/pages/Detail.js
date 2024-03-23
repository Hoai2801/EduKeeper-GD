import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import './Detail.css'
import { useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const Detail = () => {
  const slug = useParams().slug
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
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

  }, [slug])

  return (
    <div>
      <h2 className='text-[28px] font-bold'>{data?.title}</h2>
      <p>{file?.name}</p>
      <Document file={`http://localhost:8080/api/v1/document/giao-trinh-mon-cong-nghe-thong-tin-1710943699142/file`} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => {
            return (
                <Page
                  key={i}
                  pageNumber={i + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  // renderMode="canvas"
                  width={900}
                />
            );
          })
        }
      </Document>
    </div>
  );
}


export default Detail