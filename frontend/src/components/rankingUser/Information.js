export default function Information({
  user,
  totalDownLoads,
  totalViews,
  display,
}) {
  return (
    <div
      className={`${display} absolute  -top-1/2 transform translate-x-[-50%] min-w-56 h-auto p-4 bg-gray-100 shadow-lg rounded-lg group-hover:block hidden`}
    >
      <div className="text-gray-600 text-sm">
        <h4 className="text-center font-semibold ">Thông tin sinh viên</h4>
        <div className="flex flex-auto min-w-[400px]">
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
      </div>
    </div>
  );
}
