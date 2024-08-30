import React, {useContext, useState} from 'react';
import {JWTContext} from "../../App";
import toast from "react-hot-toast";

const Comment = ({comment, fetchComment}) => {
    const [showSetting, setShowSetting] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);

    const [showReply, setShowReply] = useState(false);

    const [content, setContent] = useState('');

    const context = useContext(JWTContext);
    const staffCode = context?.jwtDecoded?.staff_code;

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

    const createReply = () => {
        if (content === '' || !staffCode) {
            toast.error('Bạn chưa nhập nội dung');
            return;
        }
        const data = {
            "content": content,
            "parentId": comment?.id,
            "staffCode": staffCode
        }

        if (context?.token) {
            fetch('http://localhost:8080/api/v1/comments/reply/' + comment?.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context?.token
                },
                body: JSON.stringify(data),
            })
            .then((res) => {
                if (res.status === 200) {
                    setContent('')
                    setShowReplyInput(false)
                    fetchComment()
                }
            })
        }
    }

    return (
        <article className="p-6 text-base rounded-lg w-full bg-white">
            <footer className="flex justify-between items-center mb-2 relative w-full">
                <div className="flex items-cente w-full">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={'http://localhost:8080/api/v1/images/avatar/' + comment?.user?.avatar}
                            alt="Michael Gough"/>{comment?.user.name}</p>
                    <p className="text-sm text-gray-600 min-w-[500px]">
                        <time>{comment?.createdAt}
                        </time>
                    </p>
                </div>
                <button onClick={() => setShowSetting(!showSetting)}
                        className={`absolute right-0 inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 ${staffCode === comment?.user?.staffCode ? "block" : "hidden"}`}
                        type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 16 3">
                        <path
                            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                </button>
                <div onMouseLeave={() => setShowSetting(false)}
                     className={`${showSetting ? "absolute" : "hidden"} ${staffCode === comment?.user?.staffCode ? "block" : "hidden"} right-0 z-10 w-36 bg-white rounded-2 border-black divide-y divide-gray-100 shadow`}>
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton">
                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*       className="block py-2 px-4 text-red-400">Xóa</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a href="#"*/}
                        {/*       className="block py-2 px-4 hover:bg-gray-100 text-gray-500">Report</a>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </footer>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">{comment?.content}</p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                        onClick={() => setShowReplyInput(!showReplyInput)}
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    Phản hồi
                </button>
            </div>
            <div
                className={`mt-4 p-4 text-end border border-gray-300 rounded-lg lg:w-[400px] w-[80vw] ml-4 ${showReplyInput ? "block" : "hidden"}`}>
                <textarea type="text" className={`w-full p-2 border border-gray-300 rounded-lg`}
                          placeholder={`Nhập phản hồi`}
                          onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={() => createReply()}
                    className={`w-[80px] mt-3 p-2 border border-gray-300 rounded-lg bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer`}>Đăng
                </button>
            </div>
            <div>
                <button className={`text-blue-600 hover:cursor-pointer text-lg font-semibold mt-2 ml-4 ${showReply ? "hidden" : "block"} ${countComments(comment?.replies) < 3 ? "hidden" : ""}`} onClick={() => setShowReply(!showReply)}>Hiện {countComments(comment?.replies)} phản hồi</button>
            </div>
            <div className={`${showReply || countComments(comment?.replies) < 3 ? "block" : "hidden"} w-[800px] text-justify`}>
                {
                    comment?.replies?.map((reply, index) => {
                        return (
                            <div className={`flex border-l-2 border-gray-300 pl-2 w-full`}>
                                <Comment isReply={true} key={index} comment={reply} fetchComment={fetchComment} countComments={countComments}/>
                            </div>
                        )
                    })
                }
            </div>
        </article>
    );
};

export default Comment;
