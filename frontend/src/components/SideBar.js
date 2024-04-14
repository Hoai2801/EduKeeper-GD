import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const SideBar = () => {
    const [sort, setSort] = useState('lastest');
    const handleSort = (value) => () => {
        setSort(value);
    }
    const [departmentList, setDepartmentList] = useState([]);
    const [specialiesList, setSpecialiesList] = useState([]);

    const [department, setDepartment] = useState(null);
    const [specialized, setSpecialized] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/specialized")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setSpecialiesList(data);
            });

        fetch('http://localhost:8080/api/v1/department')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDepartmentList(data)
            })
    }, [])

    

    // useEffect(() => {
    //     if (department) {
    //         fetch("http://localhost:8080/api/v1/specialized/department/" + department.id)
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data)
    //                 setSpecialiesList(data)
    //             });
    //     }
    // }, [department])

    const handleDepartment = (event) => () => {
        console.log("first")
        setDepartment(event.target.value);
    }
    const handleSpecialized = (event) => () => {
        setSpecialized(event.target.value);
    }

    console.log(department)
    return (
        <div className='flex justify-between w-full gap-5 p-5'>
            <div className='flex justify-between w-full gap-5 p-5'>
                <div className='w-[25%] h-full rounded-lg shadow-lg bg-white flex items-center flex-col gap-5 px-5'>
                    <p className='text-2xl font-bold mt-2'>Lọc</p>

                    <form class="w-full mx-auto">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Từ khóa" required />
                            {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </form>

                    <div className='flex gap-3 mt-5'>
                        <div className={`text-center border py-2 px-3 rounded-3xl border-black hover:bg-slate-500 hover:cursor-pointer hover:text-white ${sort === 'lastest' ? 'bg-slate-500 text-white' : ''}`} onClick={handleSort('lastest')}>
                            Mới nhất
                        </div>
                        <div className={`text-center border py-2 px-3 rounded-3xl border-black hover:bg-slate-500 hover:cursor-pointer hover:text-white ${sort === 'mostViewed' ? 'bg-slate-500 text-white' : ''}`} onClick={handleSort('mostViewed')}>
                            Xem nhiều
                        </div>
                        <div className={`text-center border py-2 px-3 rounded-3xl border-black hover:bg-slate-500 hover:cursor-pointer hover:text-white ${sort === 'mostDownloaded' ? 'bg-slate-500 text-white' : ''}`} onClick={handleSort('mostDownloaded')}>
                            Tải nhiều
                        </div>
                    </div>
                    <h2>{department}</h2>
                    <form class="max-w-sm mx-auto">
                        <label for="specialies" className="block mb-2 text-xl text-gray-900 font-semibold">Chuyên khoa</label>
                        <select id="specialies" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                            onChange={handleDepartment}
                            // value={department}
                        >
                            <option value="" disabled>Chọn khoa</option>

                            {departmentList.map((department) => (
                                <option key={department.id} value={department.departmentSlug}>{department.departmentName}</option>
                            ))}
                        </select>
                    </form>
                    {/* <form class="max-w-sm mx-auto">
                        <label for="specialies" className="block mb-2 text-xl text-gray-900 font-semibold">Chuyên ngành</label>
                        <select id="specialies" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
                            onChange={handleSpecialized}
                        >
                            <option selected disabled>Chọn chuyên ngành</option>

                            {specialiesList.map((specialies) => {
                                if (department === specialies.departmentSlug) {
                                    return (
                                        <option key={specialies.id} value={specialies.specializedSlug}>
                                            {specialies.specializedName}
                                        </option>
                                    );
                                }
                                return null; // Ensure you return something if the condition is not met
                            })}
                        </select>
                    </form> */}
                    <form class="max-w-sm mx-auto">
                        <label for="specialies" className="block mb-2 text-xl text-gray-900 font-semibold">Chuyên ngành</label>
                        <select id="specialies" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full">
                            <option selected >Thể loại</option>

                            {specialiesList.map((specialies) => (
                                <option value={specialies.specializedSlug}>{specialies.specializedName}</option>
                            ))}
                        </select>
                    </form>

                    <div className='w-full'>
                        <div>
                            <label for="publication date" className="block mb-2 text-xl text-gray-900 font-semibold">Năm xuất bản</label>
                            <select id="publication date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full">
                                {Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, index) => (
                                    <option key={2020 + index}>{2020 + index}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="range" className='block mb-2 text-xl text-gray-900 font-semibold'>Số trang từ</label>
                        <div className='flex gap-2'>

                            <input type="text" id="range" className='border border-black rounded-lg w-[60px] h-[40px] p-2' />
                            <p className='text-2xl text-[50px]'>-</p>
                            <input type="text" id="range" className='border border-black rounded-lg w-[60px] h-[40px] p-2' />
                        </div>
                    </div>
                    <button onClick={null} className='bg-blue-500 rounded-3xl w-[100px] h-[40px] text-center text-white text-xl'>Lọc</button>
                </div>
                <p className='text-center'>{department}</p>
                <div className='flex justify-center w-full bg-white rounded-lg'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SideBar