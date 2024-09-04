import React, { useEffect, useState } from 'react'
import DocumentCard from './DocumentCard';

const Recommend = ({ search, category, specialized, author }) => {
    const [document, setDocument] = useState([]);

    const [recommendDto, setRecommendDto] = useState({
        title: search,
        specialized: specialized,
        category: category,
        author: author,
    });
    console.log(recommendDto)

    useEffect(() => {
        fetch(`http://103.241.43.206:8080/api/v1/documents/recommend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recommendDto)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setDocument(data)
            });
    }, [search, category, specialized, recommendDto])

    return (
        <div>
            {
                document && document.map((item, index) => {
                    if (index < 15) {
                        return (
                            <DocumentCard slug={item.slug} pages={item.pages} title={item.title} author={item.author} views={item.views} download={item.download} upload_date={item.upload_date} key={index} />
                        )
                    }
                })
            }
        </div>
    )
}

export default Recommend