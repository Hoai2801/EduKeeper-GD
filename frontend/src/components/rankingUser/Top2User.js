import { toast } from "react-hot-toast";
import Avatar from "../../assets/avatar.webp";
import Information from "./Information";
export default function Top2User({ user, totalDownloads, totalViews }) {
  // const handleDetailUser = (id) => {
  //   toast.error(
  //     "Hiện tại bạn không thể xem thông tin của người dùng có id là " + id
  //   );
  // };
  return (
    <div className="group mt-8  flex flex-col  items-center hover:cursor-pointer w-1/3 ">
      <div className="relative">
        <div className="relative ">
          <div className="w-32 h-32 bg-blue-300 rounded-full flex flex-col items-center justify-center ">
            <img
              className="w-32 h-24 object-cover rounded-full"
              src={Avatar}
              alt="Top 1"
            />
          </div>
          <div className="absolute  top-24  left-1/2 transform -translate-x-1/2 min-w-max px-6 py-1 bg-violet-800 text-white rounded-lg">
            <p className="text-base font-semibold italic">{user.username}</p>
          </div>
        </div>
        <div className="mt-2 w-32 rounded-lg min-h-48 bg-blue-600 text-white">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0  512 512"
              fill="currentColor"
              aria-hidden="true"
              className=" max-w-max max-h-12 mt-2"
            >
              <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
            </svg>{" "}
          </div>
          <div className=" text-center mt-4">
            <p className="text-4xl font-bold"> {totalDownloads} </p>
            <p className="text-sm font-medium ">Lượt tải tài liệu</p>
          </div>
        </div>
        {user && (
          <Information
            user={user}
            totalDownLoads={totalDownloads}
            totalViews={totalViews}
            display={"start-48"}
          />
        )}
      </div>
    </div>
  );
}
