import React, {useEffect, useState} from 'react';
import DragDropFile from "../components/DragDropFile";

const BannerManager = ({jwt}) => {
    const [bannerList, setBannerList] = useState([]);

    const [isEditShow, setIsEditShow] = useState(false);

    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [activeBanner, setActiveBanner] = useState(null);
    const [bannerEdit, setBannerEdit] = useState(null);

    const fetchBanner = () => {
        fetch('http://localhost:8080/api/v1/banners/all')
            .then((res) => res.json())
            .then((data) => {
                setBannerList(data);
            });
    }

    useEffect(() => {
        fetchBanner();
    }, []);

    const handleDelete = (id) => {
        fetch('http://localhost:8080/api/v1/banners/' + id, {
            method: "DELETE"
        })
            .then((res) => {
                if (res.status === 200) {
                    setBannerList(bannerList.filter(banner => banner.id !== id));
                } else {
                    alert(res.text())
                }

            })
    }
    const handleEdit = () => {
        const formData = new FormData();
        formData.append('url', url);
        // formData.append('banner', file[0]);
        formData.append('enable', activeBanner);
        console.log(formData)

        fetch('http://localhost:8080/api/v1/banners/' + bannerEdit?.id, {
            method: "PUT",
            body: formData
        })
            .then((res) => {
                if (res.status === 200) {
                    fetchBanner()
                    setIsEditShow(false)
                } else {
                    alert(res.text())
                }
            });
    }

    const handleCreate = () => {
        const formData = new FormData();
        formData.append('url', url);
        formData.append('banner', file[0]);
        formData.append('enable', activeBanner);
        console.log(formData)

        fetch('http://localhost:8080/api/v1/banners', {
            method: "POST",
            body: formData
        })
            .then((res) => {
                if (res.status === 200) {
                    fetchBanner()
                    setIsEditShow(false)
                } else {
                    alert(res.text())
                }
                res.text()
            })
    }

    return (
        <div className={``}>
            <div className={`bg-white rounded-lg p-3`}>
                <p className="text-xl font-bold">Banner</p>
                {/*set all null to reset banner value*/}
                <button className={`my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                        onClick={() => {
                            setIsEditShow(true)
                            setBannerEdit(null)
                            // if set null, json will make null become to 'null'
                            setUrl("")
                            setFile(null)
                            setActiveBanner(false)
                        }}
                >
                    Thêm banner
                </button>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ảnh
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hiển thị
                            </th>
                            <th scope="col" className="px-6 py-3">
                                URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {bannerList?.map((item) => {
                            return (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <img src={`http://localhost:8080/api/v1/images/banner/${item.image}`} alt=""
                                             className={`w-32 h-32`}/>
                                    </th>
                                    <td className="px-6 py-4">
                                        <input type={`checkbox`} checked={item.enable} onClick={() => {
                                            fetch(`http://localhost:8080/api/v1/banners/active/${item.id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    enable: !item.enable
                                                })
                                            })
                                                .then(res => res.text())
                                                .then((data) => {
                                                    setBannerList(prevList => prevList.map(it =>
                                                        it.id === item.id ? {...it, enable: !it.enable} : it
                                                    ));
                                                })
                                        }}/>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={item?.url?.includes('http') ? item.url : 'https://' + item.url}
                                           className={`hover:underline hover:text-blue-600`}>{item.url}</a>
                                    </td>
                                    <td className="px-6 py-4 text-right flex gap-3">
                                        <button onClick={() => {
                                            setUrl(item?.url)
                                            setActiveBanner(item?.enable)
                                            setIsEditShow(true)
                                            setBannerEdit(item)
                                        }}
                                                className="font-medium text-blue-600 hover:underline">Sửa
                                        </button>
                                        <button onClick={() => {
                                            if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
                                                handleDelete(item.id)
                                            }
                                        }}
                                                className="font-medium text-red-600 hover:underline">Xóa
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className={`${isEditShow ? 'block' : 'hidden'}`}>
                    <div className={`bg-gray-500 opacity-65 absolute top-0 left-0 w-full h-full`}></div>
                    <div className={`w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center`}>
                        <div className={`w-[500px] h-fit bg-white rounded-lg p-2`}>
                            <div className={`w-full h-[50px] flex justify-end items-end`}>
                                <button className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                                        onClick={() => setIsEditShow(false)}>
                                    X
                                </button>
                            </div>
                            <div className={`flex flex-col justify-center items-center pt-5`}>
                                <div className={`${bannerEdit ? 'hidden' : 'block'}`}>
                                    <DragDropFile handleFiles={setFile} fileSupport={['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']}/>
                                </div>
                                <div className={`w-full px-5 mt-5 border-b-2`}>
                                    <img
                                        src={file ? URL.createObjectURL(file[0]) : `http://localhost:8080/api/v1/images/banner/${bannerEdit?.image}`}
                                        alt="" className={`w-full`}/>
                                </div>
                            </div>
                            <div className={`p-5 flex flex-col gap-3`}>
                                <div>
                                    <label htmlFor="active" className={`font-bold text-[18px] my-5 mr-5`}>
                                        Hoạt động
                                    </label>
                                    <input id="active" type="checkbox" checked={activeBanner} className={`w-4 h-4`}
                                           onChange={(e) => setActiveBanner(e.target.checked)}/>
                                </div>
                                <div>
                                    <label htmlFor="url" className={`font-bold text-[18px] my-5 mr-5`}>URL</label>
                                    <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)}
                                           className={`w-full h-[50px] border-2 border-gray-300 rounded-lg p-3`}/>
                                </div>
                            </div>
                            <div className={`w-full h-[50px] flex justify-center`}>

                                <button onClick={bannerEdit ? handleEdit : handleCreate}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BannerManager;
