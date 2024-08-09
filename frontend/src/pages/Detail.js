import React, { useContext, useEffect, useRef, useState } from "react";
import "./Detail.css";
import { Link } from "react-router-dom";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import unlove from "../assets/unlove.png";
import love from "../assets/love.png";
import Comment from "../components/Comment";
<<<<<<< HEAD
import { Document, Page, pdfjs } from "react-pdf";
import { JWTContext } from "../App";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
=======
import {JWTContext} from "../App";
import toast from "react-hot-toast";
import {Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302

const Detail = () => {
  function extractSlugFromURL(url) {
    // Split the URL by '/'
    const parts = url.split("/");
    // Get the last part of the URL
    const lastPart = parts[parts.length - 1];
    // Return the last part as the slug
    return lastPart;
  }

<<<<<<< HEAD
  const staffCode = useContext(JWTContext)?.jwtDecoded?.staff_code;
=======
    const context = useContext(JWTContext);
    const jwt = context?.token;
    const staffCode = context?.jwtDecoded?.staff_code;
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302

  const [isFavorite, setIsFavorite] = useState(false);

<<<<<<< HEAD
  const url = window.location.href;
  const slug = extractSlugFromURL(url);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(20);
  const [file, setFile] = useState(null);
  const [fileDownload, setFileDownload] = useState(null);
  const [data, setData] = useState(null);

  const [commentList, setCommentList] = useState([]);
=======
    const url = window.location.href;
    const slug = extractSlugFromURL(url);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(20);
    const [file, setFile] = useState(null);
    const [fileDownload, setFileDownload] = useState(null);
    const [data, setData] = useState(null);
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302

  const [commentContent, setCommentContent] = useState("");

  const [limitComments, setLimitComments] = useState(5);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/documents/" + slug)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

<<<<<<< HEAD
    fetch("http://localhost:8080/api/v1/documents/" + slug + "/file").then(
      (res) => {
        res.blob().then((r) => {
          setFile(r);
        });
      }
=======
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/documents/" + slug)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            });

        fetch("http://localhost:8080/api/v1/documents/" + slug + "/file")
            .then((res) => {
                res.blob().then(r => {
                    setFile(r)
                })
            })


        fetch("http://localhost:8080/api/v1/documents/" + slug + "/download")
            .then((res) => {
                res.blob().then(r => {
                    setFileDownload(r)
                })
            })

        // make view history
        const increaseView = setTimeout(() => {
            if (staffCode) {
                fetch("http://localhost:8080/api/v1/view-history", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentId: data?.id,
                        staffCode: staffCode
                    }),
                })
            }
        }, 30000);

        return () => clearTimeout(increaseView);

    }, [slug, data?.id])

    useEffect(() => {
        fetchComment()
    }, [data]);

    const fetchComment = () => {
        if (data) {
            fetch('http://localhost:8080/api/v1/comments/' + data?.id)
                .then(res => {
                    if (res.status === 200) {
                        return res.json().then(data => {
                            setCommentList(data)
                        });
                    }
                })
        }
    }

    const width = window.innerWidth > 1050 ? 1050 : window.innerWidth - 30;

    const downloadClick = () => {
        const nameOfDocument = data?.title;
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(new Blob([fileDownload], {
            type: data?.download_file_type || 'application/pdf',
        }));

        // increase download value of document
        fetch("http://localhost:8080/api/v1/downloads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                documentId: data?.id,
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

    useEffect(() => {
        if (staffCode && data?.id) { // Ensure staffCode is not null before making the request
            fetch("http://localhost:8080/api/v1/favorites/is-favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userId": staffCode,
                    "documentId": data?.id
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setIsFavorite(data);
                })
                .catch((error) => {
                    console.error('Error fetching favorite status:', error);
                });
        }
    }, [staffCode, data?.id]);

    const createComment = (event) => {
        event.preventDefault();
        if (!staffCode) {
            // redirect to login
            window.location.href = "/login";
        }

        if (commentContent === "") {
            toast.error("Bạn chưa nhập nội dung");
            return;
        }
        fetch("http://localhost:8080/api/v1/comments/" + data?.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": commentContent,
                "documentId": data?.id,
                "staffCode": staffCode
            }),
        })
            .then((res) => res.text())
            .then((data) => {
                if (data === "success") {
                    setCommentContent("");
                    fetchComment()
                }
            })
    };

    function countComments(commentList) {
        let count = 0;
        commentList.forEach(comment => {
            count++; // count the current comment
            if (comment.replies && comment.replies.length > 0) {
                count += countComments(comment.replies); // count the nested replies
            }
        });
        return count;
    }

    function favorite() {
        if (staffCode) {
            if (isFavorite) {
                fetch("http://localhost:8080/api/v1/favorites", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "userId": staffCode,
                        "documentId": data?.id
                    }),
                })
                    .then((data) => {
                        if (data.status === 200) {
                            console.log(data)
                            setIsFavorite(!isFavorite)
                        }
                    })
            } else {
                fetch("http://localhost:8080/api/v1/favorites", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "userId": staffCode,
                        "documentId": data?.id
                    }),
                })
                    .then((data) => {
                        if (data.status === 200) {
                            setIsFavorite(!isFavorite)
                        }
                    })
            }
        } else window.location.href = "/login";
    }

    return (
        <div className={`w-full`}>
            <h2 className={`text-[28px] text-center mt-10 font-bold ${data?.scope === "public" || data?.user_upload?.staffCode === staffCode ? "hidden" : "block"}`}>
                Bạn không thể xem tài liệu này vì đây là tài liệu riêng tư</h2>
            <div
                className={`${data?.scope === "public" || data?.user_upload?.staffCode === staffCode ? "" : "hidden"}`}>
                <div className={`pt-[50px] px-5 max-w-[1080px] mx-auto`}>
                    <p className='text-blue-500 text-lg'><Link
                        to={`/search?category=${data?.category?.categorySlug}`}>{data?.category?.categoryName}</Link> -
                        <Link
                            to={`/search?subject=${data?.subject?.subjectSlug}`}> Môn {data?.subject?.subjectName}</Link>
                    </p>
                    {/* <Link to={`/department/${data?.specialized.departmentID.departmentSlug}`}>{data?.specialized.specializedName}</Link> - */}
                    <h2 className='md:text-[52px] md:mt-5 font-bold md:max-w-[900px] leading-[50px] text-2xl'>{data?.title}</h2>
                    <div className='flex justify-between mt-3 md:flex-row flex-col w-full'>
                        <div className="flex flex-wrap gap-5 md:flex-col md:gap-1 md:mt-5 text-xl">
                            <p>Giáo viên: <Link to={`/profile/${data?.user_upload?.staffCode}`}
                                                className='text-blue-500'>{data?.user_upload?.username}</Link></p>
                            <p>Tác giả: <span className=''>{data?.author}</span></p>
                            <p>Ngày đăng: {data?.upload_date}</p>
                            <p>Trang: {data?.pages}</p>
                        </div>
                        <div className='flex flex-col gap-5 md:gap-2'>
                            <button className={`w-full hover:shadow-lg rounded-md bg-white p-4 mt-5`}
                                    onClick={() => favorite()}>
                                <div className={`w-full min-w-[220px] flex items-center gap-2 h-10 justify-center`}>
                                    <p className="font-bold text-lg">{isFavorite ? "Đã lưu" : "Lưu vào yêu thích"}</p>
                                    <div
                                        className={`hover:shadow-lg rounded-md w-5 mt-1 h-5 overflow-hidden bg-white ${isFavorite ? "p-1" : ""}`}>
                                        <img src={isFavorite ? love : unlove} className={`w-full h-full`}/>
                                    </div>
                                </div>
                            </button>
                            <buttonN
                                onClick={() => downloadClick()}
                                className='text-white bg-blue-500 hover:bg-blue-300 rounded-md h-20 leading-[50px] font-semibold p-4 mt-2 text-center cursor-pointer'>Tải
                                tài liệu
                                ({Math.round(fileDownload?.size / 1024 / 1024) < 1 ? "Nhỏ hơn 1" : Math.round(fileDownload?.size / 1024 / 1024)} MB)
                            </buttonN>
                            <div className='flex gap-5'>
                                <p>Lượt xem: {data?.views}</p>
                                <p>Lượt tải về: {data?.download}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`md:px-8 px-5 flex flex-col gap-5 max-w-[1080px] mx-auto `}>
                    <h3 className='text-[28px] font-bold text-blue-400'>Mô tả</h3>
                    <div className={`text-xl`}>
                        <div dangerouslySetInnerHTML={{__html: data?.description}}></div>
                    </div>
                </div>
                <div className={`overflow-y-scroll h-screen rounded-lg flex flex-col max-w-[1080px] mt-5 mx-auto`}>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}
                              className={'flex flex-col items-center'}>
                        {Array.apply(null, Array(numPages))
                            .map((x, i) => {
                                if (i <= pageNumber) {
                                    return (
                                        // <div className='max-w-[1080px] p-2'>
                                        <Page
                                            key={i}
                                            pageNumber={i + 1}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            renderMode="svg"
                                            width={width}
                                        />
                                        // </div>
                                    );
                                }
                            })
                        }
                    </Document>
                    <div className='w-full h-[100px] flex justify-center align-middle mt-8'>
                        <button onClick={() => setPageNumber(pageNumber + 10)}
                                className='bg-blue-500 text-white px-10 py-3 h-fit rounded-lg'>Xem thêm
                        </button>
                    </div>
                </div>
                <section className="bg-white py-8 lg:py-16 antialiased mt-3 rounded-lg">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Bình luận
                                ({countComments(commentList)})</h2>
                        </div>
                        <div className="mb-6">
                            <div
                                className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                <textarea id="comment" rows="6"
                                          value={commentContent}
                                          onChange={(e) => setCommentContent(e.target.value)}
                                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                          placeholder="Write a comment..." required></textarea>
                            </div>
                            <button
                                onClick={createComment}
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 bg-blue-600">
                                Đăng bình luận
                            </button>
                        </div>
                        <div className={`w-[800px]`}>
                            {commentList && commentList?.map((comment, index) => {
                                if (index < limitComments) {
                                    return (
                                        <Comment
                                            key={index}
                                            isReply={false}
                                            comment={comment}
                                            countReply={countComments}
                                            fetchComment={fetchComment}
                                        />
                                    )
                                }
                            })}
                        </div>
                        <div
                            className={`w-full flex justify-center ${commentList?.length > limitComments ? "" : "hidden"}`}>
                            <button onClick={() => setLimitComments(limitComments + 5)}>Tải thêm bình luận</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
>>>>>>> 857f3cd23cccdad73188e82016ffec4026385302
    );

    fetch("http://localhost:8080/api/v1/documents/" + slug + "/download").then(
      (res) => {
        res.blob().then((r) => {
          console.log(r);
          setFileDownload(r);
        });
      }
    );

    // make view history
    const increaseView = setTimeout(() => {
      if (staffCode) {
        fetch("http://localhost:8080/api/v1/view-history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentId: data?.id,
            staffCode: staffCode,
          }),
        });
      }
    }, 1000);

    return () => clearTimeout(increaseView);
  }, [slug, data?.id]);

  // useEffect(() => {
  //     fetchComment()
  // }, [data]);

  // const fetchComment = () => {
  //     if (data) {
  //         fetch('http://localhost:8080/api/v1/comments/' + data?.id)
  //             .then(res => res.json())
  //             .then(data => {
  //                 setCommentList(data)
  //             })
  //     }
  // }

  const width = window.innerWidth > 1050 ? 1050 : window.innerWidth - 30;
  console.log(window.screen.width);

  const downloadClick = () => {
    console.log(data);
    // Creating new object of PDF file
    const fileURL = window.URL.createObjectURL(
      new Blob([fileDownload], {
        type: data?.download_file_type || "application/pdf",
        name: data?.title,
      })
    );

    // increase download value of document
    fetch("http://localhost:8080/api/v1/downloads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentId: data?.id,
        staffCode: staffCode,
      }),
    })
      .then((data) => {
        if (data.status === 200) {
          // Setting various property values
          let alink = document.createElement("a");
          alink.href = fileURL;
          alink.download = data?.title;
          alink.click();
        }
      })
      .catch((error) => {
        console.error("Error fetching favorite status:", error);
      });
  };

  useEffect(() => {
    if (staffCode && data?.id) {
      // Ensure staffCode is not null before making the request
      fetch("http://localhost:8080/api/v1/favorites/is-favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: staffCode,
          documentId: data?.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsFavorite(data);
        })
        .catch((error) => {
          console.error("Error fetching favorite status:", error);
        });
    }
  }, [staffCode, data?.id]);

  const createComment = (event) => {
    event.preventDefault();
    if (staffCode === null) {
      // redirect to login
      window.location.href = "/login";
    }

    if (commentContent === "") {
      return;
    }
    fetch("http://localhost:8080/api/v1/comments/" + data?.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: commentContent,
        documentId: data?.id,
        staffCode: staffCode,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "success") {
          setCommentContent("");
          //   fetchComment();
        }
      });
  };

  function favorite() {
    if (staffCode) {
      if (isFavorite) {
        fetch("http://localhost:8080/api/v1/favorites", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: staffCode,
            documentId: data?.id,
          }),
        })
          // .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              console.log(data);
              setIsFavorite(!isFavorite);
            }
          });
      } else {
        fetch("http://localhost:8080/api/v1/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: staffCode,
            documentId: data?.id,
          }),
        }).then((data) => {
          if (data.status === 200) {
            console.log(data);
            setIsFavorite(!isFavorite);
          }
        });
      }
    } else window.location.href = "/login";
  }

  return (
    <div className={`w-full`}>
      <h2
        className={`text-[28px] mt-10 font-bold ${
          data?.scope === "public" || data?.user_upload?.staffCode === staffCode
            ? "hidden"
            : "block"
        }`}
      >
        Bạn không thể xem tài liệu này vì đây là tài liệu riêng tư
      </h2>
      <div
        className={`${
          data?.scope === "public" || data?.user_upload?.staffCode === staffCode
            ? ""
            : "hidden"
        }`}
      >
        <div className={`pt-[50px] px-5 max-w-[1080px] mx-auto`}>
          <p className="text-blue-500 text-lg">
            <Link to={`/search?category=${data?.category?.categorySlug}`}>
              {data?.category?.categoryName}
            </Link>{" "}
            -
            <Link to={`/search?subject=${data?.subject?.subjectSlug}`}>
              {" "}
              Môn {data?.subject?.subjectName}
            </Link>
          </p>
          {/* <Link to={`/department/${data?.specialized.departmentID.departmentSlug}`}>{data?.specialized.specializedName}</Link> - */}
          <h2 className="md:text-[52px] md:mt-5 font-bold md:max-w-[900px] leading-[50px] text-2xl">
            {data?.title}
          </h2>
          <div className="flex justify-between mt-3 md:flex-row flex-col w-full">
            <div className="flex flex-wrap gap-5 md:flex-col md:gap-1 md:mt-5 text-xl">
              <p>
                Giáo viên:{" "}
                <Link
                  to={`/profile/${data?.user_upload?.staffCode}`}
                  className="text-blue-500"
                >
                  {data?.user_upload?.username}
                </Link>
              </p>
              <p>
                Tác giả: <span className="">{data?.author}</span>
              </p>
              <p>Ngày đăng: {data?.upload_date}</p>
              <p>Trang: {data?.pages}</p>
            </div>
            <div className="flex flex-col gap-5 md:gap-2">
              <button
                className={`w-full hover:shadow-lg rounded-md bg-white p-4 mt-5`}
                onClick={() => favorite()}
              >
                <div
                  className={`w-full min-w-[220px] flex items-center gap-2 h-10 justify-center`}
                >
                  <p className="font-bold text-lg">
                    {isFavorite ? "Đã lưu" : "Lưu vào yêu thích"}
                  </p>
                  <div
                    className={`hover:shadow-lg rounded-md w-5 mt-1 h-5 overflow-hidden bg-white ${
                      isFavorite ? "p-1" : ""
                    }`}
                  >
                    <img
                      src={isFavorite ? love : unlove}
                      className={`w-full h-full`}
                    />
                  </div>
                </div>
              </button>
              <buttonN
                onClick={() => downloadClick()}
                className="text-white bg-blue-500 hover:bg-blue-300 rounded-md h-20 leading-[50px] font-semibold p-4 mt-2 text-center cursor-pointer"
              >
                Tải tài liệu (
                {Math.round(fileDownload?.size / 1024 / 1024) < 1
                  ? "Nhỏ hơn 1"
                  : Math.round(fileDownload?.size / 1024 / 1024)}{" "}
                MB)
              </buttonN>
              <div className="flex gap-5">
                <p>Lượt xem: {data?.views}</p>
                <p>Lượt tải về: {data?.download}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:px-8 px-5 flex flex-col gap-5 max-w-[1080px] mx-auto `}
        >
          <h3 className="text-[28px] font-bold text-blue-400">Mô tả</h3>
          <div className={`text-xl`}>
            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          </div>
        </div>
        <div
          className={`overflow-y-scroll h-screen rounded-lg flex flex-col max-w-[1080px] mt-5 mx-auto`}
        >
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className={"flex flex-col items-center"}
          >
            {Array.apply(null, Array(numPages)).map((x, i) => {
              if (i <= pageNumber) {
                return (
                  // <div className='max-w-[1080px] p-2'>
                  <Page
                    key={i}
                    pageNumber={i + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    // renderMode="svg"
                    width={width}
                  />
                  // </div>
                );
              }
            })}
          </Document>
          {/*<iframe src={"http://localhost:8080/api/v1/documents/" + slug + "/file"} frameborder="0"></iframe>*/}
          <div className="w-full h-[100px] flex justify-center align-middle mt-8">
            <button
              onClick={() => setPageNumber(pageNumber + 10)}
              className="bg-blue-500 text-white px-10 py-3 h-fit rounded-lg"
            >
              Xem thêm
            </button>
          </div>
        </div>
        <section className="bg-white py-8 lg:py-16 antialiased mt-3 rounded-lg">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                Bình luận ({commentList.length})
              </h2>
            </div>
            <div className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="6"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                onClick={createComment}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 bg-blue-600"
              >
                Đăng bình luận
              </button>
            </div>
            <div>
              {commentList &&
                commentList?.map((comment, index) => {
                  if (index < limitComments) {
                    return <Comment comment={comment} />;
                  }
                })}
            </div>
            <div
              className={`w-full flex justify-center ${
                commentList?.length > limitComments ? "" : "hidden"
              }`}
            >
              <button onClick={() => setLimitComments(limitComments + 5)}>
                Tải thêm bình luận
              </button>
            </div>
          </div>
        </section>
        {/* </DocumentViewer> */}
      </div>
    </div>
  );
};

export default Detail;
