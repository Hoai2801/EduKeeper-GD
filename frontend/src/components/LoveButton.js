import React, {useEffect, useState} from 'react';
import love from "../assets/love.png";
import unlove from "../assets/unlove.png";

const LoveButton = ({staffCode, documentId}) => {
    const [isFavorite, setIsFavorite] = useState(false);

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
                        "documentId": documentId
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
                        "documentId": documentId
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

    useEffect(() => {
        if (staffCode && documentId) {
            fetch("http://localhost:8080/api/v1/favorites/is-favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userId": staffCode,
                    "documentId": documentId
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
    }, [staffCode, documentId]);

    return (
        <div>
            <button className={`w-full hover:shadow-lg rounded-md bg-white p-4 mt-5 border border-black`}
                    onClick={() => favorite()}>
                <div className={`w-full min-w-[220px] flex items-center gap-2 h-10 justify-center`}>
                    <p className="font-bold text-lg">{isFavorite ? "Đã lưu" : "Lưu vào yêu thích"}</p>
                    <div
                        className={`hover:shadow-lg rounded-md w-5 mt-1 h-5 overflow-hidden bg-white ${isFavorite ? "p-1" : ""}`}>
                        <img src={isFavorite ? love : unlove} alt="love button" className={`w-full h-full`}/>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default LoveButton;
