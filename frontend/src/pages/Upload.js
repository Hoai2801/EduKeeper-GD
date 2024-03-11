import React, { useState } from 'react'
import DragDropFile from '../components/DragDropFile'

export const Upload = () => {
  const [selectedFile, setFile] = useState(null);
  
  const handleFiles = (updatedFile) => {
    console.log(updatedFile);
  };
  return (
    <div>
      <h2 className='text-3xl font-bold'>Upload the document</h2>
      <DragDropFile handleFiles={handleFiles} />
      <h3>Nhập tên đề tài</h3>
      <input type="text" name="" id="" />
    </div>
  )
}
