import React from 'react'
import DragDropFile from '../components/DragDropFile'

export const Upload = () => {
  return (
    <div>
      <h2 className='text-3xl font-bold'>Upload the document</h2>
      <DragDropFile />
      <input type="text" name="" id="" />
    </div>
  )
}
