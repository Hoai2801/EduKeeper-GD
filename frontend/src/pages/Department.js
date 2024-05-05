import React, { useEffect, useState } from 'react'
import removeIcon from '../assets/logo192.png'
import editIcon from '../assets/edit-246.png'

const Department = () => {
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/departments")
          .then((res) => res.json())
          .then((data) => {
            setDepartment(data);
            console.log(data)
          });
      }, [])
  return (
    <div>
        {department && department.map((dep) => (
            <div key={dep.id}>
                <div className='flex justify-between w-full border shadow-lg rounded-xl border-black p-4 mt-5'>
                <h1 className='text-3xl'>{dep.departmentName}</h1>
                    <div>
                        <button onClick={null}>
                            <img src={removeIcon} alt="" className='w-10 h-10'/>
                        </button>
                        <button onClick={null}>
                            <img src={editIcon} alt="" className='w-10 h-10'/>
                        </button>
                    </div>
                </div>
                
                {dep.specializeds && dep.specializeds.map((specialized) => (
                    <div key={specialized.id} className='flex pl-10 gap-2'>
                        <span className='text-3xl'>
                            L
                        </span>
                        <h2 className='mt-3 text-xl'>{specialized.specializedName}</h2>
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Department