import React from "react";
import { Link } from "react-router-dom";

const Notification = ({ notification }) => {
  function formatDate(dateString) {
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    const today = new Date();
    const date = new Date(dateString);

    const diffInTime = today.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    } else if (diffInDays === 1) {
      return "Hôm qua";
    } else if (diffInDays > 1 && diffInDays <= 7) {
      return `${diffInDays} ngày trước`;
    } else {
      return daysOfWeek[date.getDay()];
    }
  }

  return (
    <div className={`flex flex-col w-full max-h-24  `}>
      <div
        className={`${
          notification._check ? "bg-gray-100" : "bg-white"
        } px-3 py-1`}
      >
        <Link to={`/document/${notification.document}`}>
          <div className={`flex justify-between `}>
            <h3
              className={`${
                !notification._check ? "font-semibold" : " font-semibold"
              }`}
            >
              {notification.title}
            </h3>
            <p>{formatDate(notification.created_at)}</p>
          </div>
          <p className={`${!notification._check ? "" : ""}`}>
            {notification.content}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Notification;
