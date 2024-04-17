import React, { useEffect, useState } from 'react'

const Department = () => {
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/department")
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
                <div className='flex justify-between w-full bg-slate-500 text-white'>
                <h1 className='text-3xl'>{dep.departmentName}</h1>
                    <div>
                        <button onClick={null}>Remove</button>
                        <button onClick={null}>Edit</button>
                    </div>
                </div>
                {dep.specializeds && dep.specializeds.map((specialized) => (
                    <div key={specialized.id}>
                        <h2>{specialized.specializedName}</h2>
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Department