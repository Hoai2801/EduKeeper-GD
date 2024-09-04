import React, {useEffect, useState} from 'react';
import toast from "react-hot-toast";

const Setting = () => {
    const [setting, setSetting] = useState([]);

    const fetchSetting = () => {
        fetch('http://103.241.43.206:8080/api/v1/settings')
            .then((res) => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            setSetting(data);
                        })
                } else {
                    res.text().then((data) => alert(data))
                }
            })
    }

    useEffect(() => {
        fetchSetting();
    }, []);

    const handleUpdate = (value, id) => {
        console.log(value)
        fetch('http://103.241.43.206:8080/api/v1/settings/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
                body: value.value === "true" ? "true" : "false"
        })
            .then((res) => {
                if (res.ok) {
                    toast.success("Cập nhật thành công")
                    fetchSetting();
                } else {
                    res.text().then((data) => alert(data))
                }
            })
    }

    return (
        <div>
            {setting?.map((item) => (
                <div className={`flex gap-4 items-center my-2`}>
                    <p className={`font-semibold text-lg `}>{item.name}</p>
                    {item.value === "true" || item.value === "false" ?
                        <span>
                        <label class="inline-flex items-center cursor-pointer mt-2">
                            <input type="checkbox" checked={item.value === "true"}
                                   onClick={() => handleUpdate({value: item.value === "true" ? "false" : "true"}, item.id)} class="sr-only peer"/>
                                <div
                                    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </span>

                        :
                        <input type="text" value={item.value}/>}
                </div>
            ))}
        </div>
    );
};

export default Setting;
