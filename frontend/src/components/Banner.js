import React, {useEffect, useState} from 'react';

const Banner = () => {

    const [banner, setBanner] = useState([])
    const [indexBanner, setIndexBanner] = useState(0)
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/banners')
            .then((res) => res.json())
            .then((data) => {
                setBanner(data)
            })
    }, [])

    const handleNextBanner = () => {
        if (indexBanner < banner?.length - 1) {
            setIndexBanner(indexBanner + 1)
        } else {
            setIndexBanner(0)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleNextBanner();
        }, 5000);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timeout);
    }, [indexBanner]);

    return (
        <div>
            <div className={`${banner?.length > 0 ? "block" : "hidden"}`}>
                {banner?.map((banner, index) => (
                    <a href={banner?.url?.trim()?.length > 0
                        ? banner?.url?.includes('http') || banner?.url?.includes('https')
                            ? banner?.url
                            : banner?.url === "null" ? "localhost:3000" : `https://${banner?.url.trim()}`
                        : ''}
                       className={`relative`}
                    >
                        <img src={`http://localhost:8080/api/v1/images/banner/${banner?.image}`} alt=""
                             className={`w-full object-cover max-h-[300px] md:max-h-[600px] md:w-[1200px] mt-5 md:rounded-lg ${index === indexBanner ? "block" : "hidden"}`}
                        />
                    </a>
                ))}
                <button className={`absolute top-[45%] left-5 bg-gray-300 hover:bg-gray-400 md:p-3 rounded-full text-white text-2xl w-10 h-10 md:w-16 md:h-16 ${banner?.length === 0 || banner?.length === 1 ? "hidden" : "block"}`}
                        onClick={() => setIndexBanner(indexBanner === 0 ? banner?.length - 1 : indexBanner - 1)}
                >
                    &lt;
                </button>
                <button className={`absolute top-[45%] right-5 bg-gray-300 hover:bg-gray-400 md:p-3 rounded-full text-white text-2xl w-10 h-10 md:w-16 md:h-16 ${banner?.length === 0 || banner?.length === 1 ? "hidden" : "block"}`}
                        onClick={() => setIndexBanner(indexBanner === banner?.length - 1 ? 0 : indexBanner + 1)}
                >    &gt;</button>
                <div
                    className={`w-full flex justify-center ${banner?.length === 0 || banner?.length === 1 ? "hidden" : "block"} flex gap-2 absolute bottom-5 right-0`}>
                    {banner?.map((ban, index) => (
                        // set index banner when click
                        <button onClick={() => setIndexBanner(index)}
                                className={`${index === indexBanner ? "bg-gray-700" : "bg-gray-400"} w-4 h-4 rounded-full mt-5`}></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
