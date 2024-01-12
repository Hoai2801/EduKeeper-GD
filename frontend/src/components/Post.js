import React from 'react'

const Post = () => {
  return (
    <div className='p-2 rounded-lg bg-white flex border h-[200px] w-[800px] gap-5'>
        <div className='w-[150px] h-full border'>
            <img src="https://static.vecteezy.com/system/resources/previews/006/692/271/non_2x/document-icon-template-black-color-editable-document-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg" alt="" />
        </div>
        <div className='border w-full relative'>
            <h3 className='font-bold text-blue-500'>Đồ án Nghiên cứu IP trên nền các mạng quang WDM và kỹ thuật lưu lượng IP-WDM</h3>
            <p className='text-[12px]'>Xu hướng giao thức IP trở thành tầng hội tụ cho các dịch vụ viễn thông ngày càng trở nên rõ ràng. Phía trên tầng IP, vẫn đang xuất hiện ngày càng nhiều các ứng dụng và dịch vụ dựa trên nền IP. Những ưu thế nổi trội của lưu lượng IP đang đặt ra vấn đề là các ...</p>
            <div className='absolute bottom-0 left-0'>
              <div className='w-fit p-2 border rounded-md'>
                  hello
              </div>
                126 trang | 07-01-2004 | 808 views | 4 download
            </div>
        </div>
    </div>
  )
}

export default Post