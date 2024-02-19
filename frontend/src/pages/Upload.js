import React from 'react'
import DragDropFile from '../components/DragDropFile'

export const Upload = () => {
  return (
    <div>
      <h2 className='text-3xl font-bold'>Upload the document</h2>
      <DragDropFile />
      <h3>Nhập tên đề tài</h3>
      <input type="text" name="" id="" />
    </div>
  )
}
