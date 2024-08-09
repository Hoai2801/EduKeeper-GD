import AvatarBoy from "../../assets/avatar-boy.webp";
import { toast } from "react-hot-toast";
import InformationUser from "./PopupInformationUser";
import { useState } from "react";
export default function TableTopUser({ top10User }) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTotalView, setSelectedTotalView] = useState(null);
  const [selectedTotalDownloads, setSelectedTotalDownloads] = useState(null);

  const handleDetailUser = (user, totalDownloads, totalViews) => {
    setSelectedUser(user);
    setIsShowDetail(true);
    setSelectedTotalDownloads(totalDownloads);
    setSelectedTotalView(totalViews);
  };

  const handleClosePopup = () => {
    setIsShowDetail(false);
  };
  return (
    <div>
      <div class="relative overflow-x-auto justify-center items-center shadow-md sm:rounded-lg mb-4">
        {top10User && top10User.length > 3 ? (
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-2">
                  Rank
                </th>
                <th scope="col" class="px-4 py-2">
                  Avatar
                </th>
                <th scope="col" class="px-4 py-2">
                  Name
                </th>
                <th scope="col" class="px-2 py-2">
                  Downloads
                </th>
                <th scope="col" class="px-2 py-2"></th>
              </tr>
            </thead>
            {top10User.slice(3).map((item, index) => (
              <tbody className="group hover:cursor-pointer  ">
                <tr
                  key={index + 4}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 4}
                  </th>
                  <td className="px-4 py-2">
                    <div className="w-8 h-8 bg-blue-400 rounded-full">
                      <img
                        src={AvatarBoy}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3"> {item.user.username} </td>
                  <td className="px-4 py-3"> {item.totalDownloads} </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      onClick={() =>
                        handleDetailUser(
                          item.user,
                          item.totalDownloads,
                          item.totalViews
                        )
                      }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
                    >
                      Detail
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <div className="">
            <div className="min-h-32 w-full bg-gray-200 bg-clip-border rounded-xl shadow-md flex items-center pb-4 ">
              <div className="min-w-48 min-h-8 ">
                <div className="p-4">
                  <h4 className="text-xl font-semibold">
                    Chào mừng bạn đến với phần sinh viên tiêu biểu
                  </h4>
                  <p className="my-1 text-sm max-w-2xl text-gray-400 font-medium">
                    Có vẻ như hiện tại chưa có sinh viên nào tham gia, vui lòng
                    quay trở lại sau khi có thông báo mới! Hãy khám phá những
                    thứ thú vị khác đang đợi bạn.
                  </p>
                </div>
                <div className="ml-4 mb-2">
                  <button
                    className="px-4 py-2 border-solid border-2 border-gray-400 rounded-lg 	  text-sm font-medium"
                    type="submit"
                  >
                    <span>Khám phá ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isShowDetail && (
          <InformationUser
            user={selectedUser}
            totalDownLoads={selectedTotalDownloads}
            totalViews={selectedTotalView}
            isShowEdit={isShowDetail}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
}
