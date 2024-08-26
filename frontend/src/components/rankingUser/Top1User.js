import { toast } from "react-hot-toast";
import AvatarBoy from "../../assets/avatar-boy.webp";
import Information from "./Information";
export default function Top1User({ user, totalDownloads, totalViews }) {
  return (
    <div className="group mx-4  flex flex-col  items-center hover:cursor-pointer">
      <div className="relative">
        <div className="relative ">
          <div className="w-32 h-32 bg-blue-300 rounded-full flex flex-col items-center justify-center">
            <div className="absolute top-[-34px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
                aria-hidden="true"
                className="w-32 h-16 text-yellow-400"
              >
                <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
              </svg>
            </div>
            <img
              className="w-32 h-24 object-cover rounded-full "
              src={AvatarBoy}
              alt="Top 1"
            />
          </div>
          <div className="absolute top-24  left-1/2 transform -translate-x-1/2 min-w-max px-6 py-1 bg-violet-800 text-white rounded-lg">
            <p className="text-base font-semibold italic"> {user.username} </p>
          </div>
        </div>
        <div className="mt-2 w-32 rounded-lg min-h-56 bg-blue-600 text-white">
          <div className="mt-2 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0  512 512"
              fill="currentColor"
              aria-hidden="true"
              className=" max-w-max max-h-12 mt-2 "
            >
              <path d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0H133.9c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9L4.1 38.2zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9L350.7 15.5C356.5 5.9 366.9 0 378.1 0H487.4C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0A176 176 0 1 1 80 336zm184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1L168 298.9c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1l-22.4-45.4z" />
            </svg>
          </div>
          <div className=" text-center mt-4 ">
            <p className="text-4xl font-bold"> {totalDownloads} </p>
            <p className="text-sm font-medium">Lượt tải tài liệu</p>
          </div>
        </div>
        {/* <div className="absolute left-1/2 -top-1/2 transform translate-x-[-50%] min-w-56 h-auto p-4 bg-gray-100 shadow-lg rounded-lg  group-hover:block hidden ">
          {" "}
          <div className="text-gray-600 text-sm">
            <h4 className="text-center font-semibold ">Thông tin sinh viên</h4>
            <p>Ho va ten: {user.username} </p>
            <p>Mssv: {user.staffCode}</p>
            <p>Lop: {user.klass}</p>
            <p>Khoa: {user.department}</p>
            <p>Email: {user.email}</p>
          </div>
        </div> */}
        {user && (
          <Information
            user={user}
            totalDownLoads={totalDownloads}
            totalViews={totalViews}
            display={"left-1/2"}
          />
        )}
      </div>
    </div>
  );
}
