import React, { useState } from 'react'
import DragDropFile from '../components/DragDropFile'

export const Upload = () => {
  const [selectedFile, setFile] = useState(null);

  const handleFiles = (updatedFile) => {
    setFile(updatedFile[0]);
  };
  return (
    <div>
      <h2 className='text-3xl font-bold mb-5'>Đăng tài liệu</h2>
      <DragDropFile handleFiles={handleFiles} />
      <div class="max-w-md mx-auto p-8 bg-white rounded-md shadow-md mt-5">
        <h2 class="text-2xl font-semibold mb-6">Thông tin tài liệu</h2>
        <form action="#" method="POST">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Tên tài liệu</label>
            <input type="text" id="name" name="name" placeholder="Báo cáo môn học ..." required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Khoa</label>
            <input type="email" id="email" name="email" placeholder="" required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Khoa</label>
            <input type="email" id="email" name="email" placeholder="" required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Chuyên ngành</label>
            <input type="email" id="email" name="email" placeholder="" required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Môn học</label>
            <input type="email" id="email" name="email" placeholder="" required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Giáo viên</label>
            <input type="email" id="email" name="email" placeholder="" required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-6">
            <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Your Message</label>
            <textarea id="message" name="message" rows="4" placeholder="How can we help you?"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
