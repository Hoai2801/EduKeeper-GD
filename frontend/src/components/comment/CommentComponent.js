import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";
import Comment from "./Comment";

const CommentComponent = ({data, staffCode}) => {

    const [commentList, setCommentList] = useState([]);

    const [limitComments, setLimitComments] = useState(5);

    const [commentContent, setcommentContent] = useState('');

    useEffect(() => {
        fetchComment()
    }, [data]);

    const fetchComment = () => {
        if (data) {
            fetch('http://103.241.43.206:8080/api/v1/comments/' + data?.id)
                .then(res => {
                    if (res.status === 200) {
                        return res.json().then(data => {
                            setCommentList(data)
                        });
                    }
                })
        }
    }

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
        fetch("http://103.241.43.206:8080/api/v1/comments/" + data?.id, {
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
                    setcommentContent("");
                    fetchComment()
                }
            })
    };

    function countComments(commentList) {
        if (commentList === undefined) return 0;
        let count = 0;
        commentList.forEach(comment => {
            count++; // count the current comment
            if (comment.replies && comment.replies.length > 0) {
                count += countComments(comment.replies); // count the nested replies
            }
        });
        return count;
    }

    return (
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
                                  onChange={(e) => setcommentContent(e.target.value)}
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
                                    countComments={countComments}
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
    );
};

export default CommentComponent;
