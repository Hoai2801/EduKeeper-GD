import React from 'react';

const Notification = ({notification}) => {
    function formatDate(dateString) {
        const daysOfWeek = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const date = new Date(dateString);

        if (date.toDateString() === today.toDateString()) {
            return "Hôm nay";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Hôm qua";
        } else {
            return daysOfWeek[date.getDay()];
        }
    }

    return (
        <div className={`flex flex-col w-full min-h-32 border-b border-gray-300 p-3 ${notification._check ? "bg-gray-200" : "bg-white"}`}>
            <div className={`flex justify-between`}>
                <h3 className={`${!notification._check ? "font-semibold" : "text-gray-500 font-semibold"}`}>{notification.title}</h3>
                <p>{(formatDate(notification.created_at))}</p>
            </div>
            <p className={`${!notification._check ? "" : "text-gray-500"}`}>{notification.content}</p>
        </div>
    );
};

export default Notification;
