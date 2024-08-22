import toast from "react-hot-toast";
import "./popup.css";

export default function InformationUser({
  user,
  totalDownLoads,
  totalViews,
  isShowEdit,
  onClose,
}) {
  return (
    <div className={` popup ${isShowEdit ? "" : "hidden"}`}>
      <div
        className={`popup-content transform translate-x-[-50%] h-auto p-4 bg-gray-100 shadow-lg rounded-lg group-hover:block `}
      >
        <div className="text-gray-600 text-sm flex flex-col items-center justify-center">
          <h4 className="text-center font-semibold ">Thông tin sinh viên</h4>
          <div className="mt-4 flex xl:flex-row md:flex-row sm:flex-row flex-col md:min-w-[400px] sm:min-w-[400px] xl:min-w-[400px] px-4">
            <div>
              <p>Ho va ten: {user.username} </p>
              <p>Mssv: {user.staffCode}</p>
              <p>Lop: {user.klass}</p>
              <p>Khoa: {user.department}</p>
              <p>Email: {user.email}</p>
            </div>
            <div>
              <p>Tổng lượt tải: {totalDownLoads}</p>
              <p>Tổng lượt xem trong tháng: {totalViews} </p>
              <p>Trung bình lượt xem trong tháng: {totalViews}</p>
            </div>
          </div>
          <div className="mt-4 text-white text-sm font-semibold  flex flex-row gap-4">
            <button
              className="bg-red-500 hover:bg-red-300 rounded-lg px-4 py-2 min-w-max"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
